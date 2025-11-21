from datetime import datetime, timezone
from uuid import UUID

import config
from database import session_scope
from fastapi import Request, status
from fastapi.exceptions import HTTPException
from models.auth_models import AuthSession, RememberMe
from models.user_models import User
from passlib.hash import argon2
from sqlmodel import select
from starlette.middleware.base import BaseHTTPMiddleware


# middleware that checks if the user is authenticated
class AuthMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        authsession = request.cookies.get("authsession")
        rememberme = request.cookies.get("rememberme")
        new_authsession = authsession
        new_rememberme = rememberme

        if authsession:
            with session_scope() as db_session:
                authsession_row = db_session.exec(
                    select(AuthSession).where(AuthSession.id == UUID(authsession))
                ).first()
                # if authsession row exists and is not expired
                if (
                    authsession_row is not None
                    and authsession_row.expires > datetime.now(timezone.utc)
                ):
                    user = db_session.exec(
                        select(User).where(User.id == authsession_row.user_id)
                    ).first()
                    if user is not None:  # if user exists, extend authsession
                        authsession_row.expires = (
                            authsession_row.expires + config.auth_session_expiry
                        )
                        db_session.add(authsession_row)
                        request.state.user = user.model_dump(mode="json")
                    else:  # otherwise, delete authsession
                        db_session.delete(authsession_row)
                        new_authsession = None
                        new_rememberme = None
                else:
                    new_authsession = None
            db_session.commit()
        if (not authsession or not new_authsession) and rememberme is not None:
            with session_scope() as db_session:
                rememberme_row = db_session.exec(
                    select(RememberMe).where(RememberMe.hash == argon2.hash(rememberme))
                ).first()
                # if remember me row exists and hasn't expired
                if rememberme_row is not None and rememberme_row.expires > datetime.now(
                    timezone.utc
                ):
                    user = db_session.exec(
                        select(User).where(User.id == rememberme_row.user_id)
                    ).first()
                    if (
                        user is not None
                    ):  # if user exists, issue new authsession and rotate rememberme
                        authsession_row = AuthSession(user_id=rememberme_row.user_id)
                        new_rememberme_row = RememberMe(user_id=rememberme_row.user_id)
                        db_session.add(authsession_row)
                        db_session.add(new_rememberme_row)
                        db_session.delete(rememberme_row)
                        new_authsession = authsession_row.id
                        new_rememberme = new_rememberme_row.id
                        request.state.user = user.model_dump(mode="json")
                    else:  # otherwise, delete rememberme
                        db_session.delete(rememberme_row)
                        new_authsession = None
                        new_rememberme = None
                else:
                    new_authsession = None
                    new_rememberme = None
                db_session.commit()

        response = await call_next(request)
        if new_authsession is not None:
            response.set_cookie(
                "authsession",
                str(new_authsession),
                domain=config.cookie_domain,
                httponly=config.cookie_httponly,
                samesite=config.cookie_samesite,
                secure=config.cookie_secure,
            )
        else:
            response.delete_cookie("authsession", path="/", domain=config.cookie_domain)
        if new_rememberme is not None:
            response.set_cookie(
                "rememberme",
                str(new_rememberme),
                max_age=int(config.remember_me_expiry.total_seconds()),
                domain=config.cookie_domain,
                httponly=config.cookie_httponly,
                samesite=config.cookie_samesite,
                secure=config.cookie_secure,
            )
        else:
            response.delete_cookie("rememberme", path="/", domain=config.cookie_domain)
        return response


async def require_admin(request: Request):
    if config.override_admin:
        return True
    user = getattr(request.state, "user", None)
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED)
    if not request.state.user["admin"]:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN)
    return True

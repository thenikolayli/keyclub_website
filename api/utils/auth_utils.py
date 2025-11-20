import config
from database import session_scope
from fastapi import Request
from fastapi.responses import JSONResponse
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
                    select(AuthSession).where(AuthSession.id == authsession)
                ).first()
                if authsession_row is not None:
                    user = db_session.exec(
                        select(User).where(User.id == authsession_row.user_id)
                    ).first()
                    if user is not None:
                        authsession_row.expires = (
                            authsession_row.expires + config.auth_session_expiry
                        )
                        db_session.add(authsession_row)
                        db_session.commit()
                        request.state.user = user.model_dump(mode="json")
                    else:
                        db_session.delete(authsession_row)
                        db_session.commit()
                        new_authsession = None
                        new_rememberme = None
                else:
                    new_authsession = None
        if (not authsession or not new_authsession) and rememberme is not None:
            with session_scope() as db_session:
                rememberme_row = db_session.exec(
                    select(RememberMe).where(RememberMe.hash == argon2.hash(rememberme))
                ).first()
                if rememberme_row is not None:
                    user = db_session.exec(
                        select(User).where(User.id == rememberme_row.user_id)
                    ).first()
                    if user is not None:
                        authsession_row = AuthSession(user_id=rememberme_row.user_id)
                        new_rememberme_row = RememberMe(user_id=rememberme_row.user_id)
                        db_session.add(authsession_row)
                        db_session.add(new_rememberme_row)
                        db_session.delete(rememberme_row)
                        db_session.commit()
                        new_authsession = authsession_row.id
                        new_rememberme = new_rememberme_row.id
                        request.state.user = user.model_dump(mode="json")
                    else:
                        db_session.delete(rememberme_row)
                        db_session.commit()
                        new_authsession = None
                        new_rememberme = None
                else:
                    new_authsession = None
                    new_rememberme = None

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

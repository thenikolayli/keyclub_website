from typing import Annotated
from uuid import UUID

import config
from database import get_session
from fastapi import APIRouter, Cookie, Depends, Request, status
from fastapi.responses import JSONResponse
from models.auth_models import AuthSession, RememberMe
from models.user_models import User, UserLogin
from passlib.hash import argon2
from sqlmodel import select

router = APIRouter(prefix="/api/auth", tags=["auth"])


# logs user in, creates cookies
@router.post("/login")
async def login(credentials: UserLogin, db_session=Depends(get_session)):
    user = db_session.exec(
        select(User).where(User.username == credentials.username)
    ).first()

    if not user:
        return JSONResponse("User not found", status.HTTP_404_NOT_FOUND)
    if not user.verify_password(credentials.password):
        return JSONResponse("Incorrect password", status.HTTP_403_FORBIDDEN)

    response = JSONResponse("Logged in", status_code=status.HTTP_200_OK)
    authsession = AuthSession(user_id=user.id)
    db_session.add(authsession)
    response.set_cookie(
        "authsession",
        str(authsession.id),
        domain=config.cookie_domain,
        httponly=config.cookie_httponly,
        samesite=config.cookie_samesite,
        secure=config.cookie_secure,
    )

    if credentials.remember_me:
        rememberme = RememberMe(user_id=user.id)
        db_session.add(rememberme)
        response.set_cookie(
            "rememberme",
            str(rememberme.id),
            max_age=int(config.remember_me_expiry.total_seconds()),
            domain=config.cookie_domain,
            httponly=config.cookie_httponly,
            samesite=config.cookie_samesite,
            secure=config.cookie_secure,
        )
    db_session.commit()
    return response


# logs the user out. deletes cookie and removes sessions
@router.get("/logout")
async def logout(
    authsession: Annotated[str | None, Cookie()] = None,
    rememberme: Annotated[str | None, Cookie()] = None,
    db_session=Depends(get_session),
):
    if authsession:
        session_row = db_session.exec(
            select(AuthSession).where(AuthSession.id == UUID(authsession))
        ).first()
        if session_row:
            db_session.delete(session_row)
    if rememberme:
        rememberme_row = db_session.exec(
            select(RememberMe).where(RememberMe.hash == argon2.hash(rememberme))
        ).first()
        if rememberme_row:
            db_session.delete(rememberme_row)
    db_session.commit()
    response = JSONResponse("Logged out", status_code=status.HTTP_200_OK)
    response.delete_cookie("authsession", path="/", domain=config.cookie_domain)
    response.delete_cookie("rememberme", path="/", domain=config.cookie_domain)
    return response


@router.get("/me")
async def me(request: Request):
    # Safely access request.state.user — avoid AttributeError if middleware didn't set it
    user = getattr(request.state, "user", None)
    if not user:
        return JSONResponse("Unauthorized", status_code=status.HTTP_401_UNAUTHORIZED)
    return JSONResponse(user, status_code=status.HTTP_200_OK)


# to do: add read and delete for sessions
# read all sessions, it should be count and skip
# delete session should be username

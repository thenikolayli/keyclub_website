from typing import Annotated

import config
from database import get_session
from fastapi import APIRouter, Cookie, Depends, status
from fastapi.responses import JSONResponse
from models.auth_models import AuthSession, RememberMe
from models.user_models import User, UserLogin
from sqlmodel import Session, select

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
    auth_session = AuthSession(user_id=user.id)
    db_session.add(auth_session)
    db_session.commit()
    response.set_cookie(
        "authsession",
        str(
            auth_session.id
        ),  # pass in the id so server can perform a lookup for authorization
        domain=config.cookie_domain,
        httponly=config.cookie_httponly,
        samesite=config.cookie_samesite,
        secure=config.cookie_secure,
    )

    if credentials.remember_me:
        remember_me = RememberMe(user_id=user.id)
        db_session.add(remember_me)
        db_session.commit()
        response.set_cookie(
            "rememberme",
            str(remember_me.id),
            max_age=int(config.remember_me_expiry.total_seconds()),
            domain=config.cookie_domain,
            httponly=config.cookie_httponly,
            samesite=config.cookie_samesite,
            secure=config.cookie_secure,
        )
    return response


# logs the user out. deletes cookie and removes sessions
@router.get("/logout")
async def logout(
    authsession: Annotated[str | None, Cookie()] = None,
    rememberme: Annotated[str | None, Cookie()] = None,
    db_session=Depends(get_session),
):
    if authsession:
        session_instance = db_session.exec(
            select(AuthSession).where(AuthSession.id == authsession)
        ).first()
        if session_instance:
            db_session.delete(session_instance)
            db_session.commit()
    if rememberme:
        rememberme_instance = db_session.exec(
            select(RememberMe).where(RememberMe.hash == rememberme)
        ).first()
        if rememberme_instance:
            db_session.delete(rememberme_instance)
            db_session.commit()

    response = JSONResponse("Logged out", status_code=status.HTTP_200_OK)
    response.delete_cookie("authsession", path="/", domain=config.cookie_domain)
    response.delete_cookie("rememberme", path="/", domain=config.cookie_domain)
    return response


# returns user based on access token
@router.get("/me")
async def me(
    authsession: Annotated[str | None, Cookie()] = None,
    db_session: Session = Depends(get_session),
):
    if not authsession:
        return JSONResponse("Not logged in", status.HTTP_404_NOT_FOUND)
    authsession_row = db_session.exec(
        select(AuthSession).where(AuthSession.id == authsession)
    ).first()
    if not authsession_row:
        return JSONResponse("Not logged in", status.HTTP_404_NOT_FOUND)
    user = db_session.exec(
        select(User).where(User.id == authsession_row.user_id)
    ).first()
    if not user:
        return JSONResponse("Not logged in", status.HTTP_404_NOT_FOUND)
    user_data = user.model_dump(mode="json")
    user_data.pop("password")
    return JSONResponse(user_data, status.HTTP_200_OK)

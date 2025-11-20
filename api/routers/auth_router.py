from datetime import datetime, timedelta, timezone
from typing import Annotated

import config
from database import get_session
from fastapi import APIRouter, Cookie, Depends, status
from fastapi.responses import JSONResponse
from models.auth_models import Session as Auth_Session
from models.user_models import User, UserLogin
from sqlmodel import Session, select
from utils.auth_utils import delete_cookies, generate_token_pair

router = APIRouter(prefix="/api/auth", tags=["auth"])


# logs user in, creates cookies
@router.post("/login")
async def login(candidate: UserLogin, session=Depends(get_session)):
    user = session.exec(select(User).where(User.username == candidate.username)).first()

    if not user:
        return JSONResponse("User not found", status.HTTP_404_NOT_FOUND)
    if not user.verify_password(candidate.password):
        return JSONResponse("Incorrect password", status.HTTP_403_FORBIDDEN)

    response = JSONResponse("Logged in", status_code=status.HTTP_200_OK)
    if candidate.remember_me:
        new_session = Auth_Session(
            user=user, expires=datetime.now(timezone.utc) + timedelta(days=30)
        )
        response.set_cookie(
            "session",
            str(new_session.id),
            domain=config.cookie_domain,
            max_age=int(timedelta(days=30).total_seconds()),
            httponly=config.cookie_httponly,
            samesite=config.cookie_samesite,
            secure=config.cookie_secure,
        )
        session.add(new_session)
    else:
        new_session = Auth_Session(
            user=user, expires=datetime.now(timezone.utc) + timedelta(days=2)
        )
        response.set_cookie(
            "session",
            str(new_session.id),
            domain=config.cookie_domain,
            max_age=int(timedelta(days=2).total_seconds()),
            httponly=config.cookie_httponly,
            samesite=config.cookie_samesite,
            secure=config.cookie_secure,
        )
        session.add(new_session)
    session.commit()
    return response


# logs the user out. deletes cookie and removes session row
@router.get("/logout")
async def logout(
    session: Annotated[str | None, Cookie()] = None, db_session=Depends(get_session)
):
    # if there's a session row, remove it
    if session:
        session_instance = db_session.exec(select(Auth_Session).where(id == session))
        if session_instance:
            db_session.delete(session_instance)
            db_session.commit()

    response = JSONResponse("Logged out", status_code=status.HTTP_200_OK)
    response.delete_cookie("session", path="/", domain=config.cookie_domain)
    return response


# returns user info based on access token
@router.get("/me")
async def me(
    session: Annotated[str | None, Cookie()] = None,
    db_session: Session = Depends(get_session),
):
    if not session:
        return JSONResponse("Not logged in", status.HTTP_404_NOT_FOUND)

    user = session.exec(select(User).where(User.id == int(payload.get("sub")))).first()
    if not user:
        return delete_cookies("User not found", status.HTTP_404_NOT_FOUND)

    return JSONResponse(
        {
            "user_id": user.id,
            "username": user.username,
            "admin": user.admin,
            "created": str(user.created),
        },
        status.HTTP_200_OK,
    )

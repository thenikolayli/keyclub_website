from fastapi import APIRouter, Depends, status, Cookie
from fastapi.responses import JSONResponse
from typing import Annotated

from sqlmodel import select, Session
from api.models.user_models import UserLogin, User, RefreshJTI
from api.config import jwt_secret, cookie_secure, cookie_domain, cookie_samesite, cookie_httponly, access_maxage, refresh_maxage
from api.utils.auth_utils import generate_token_pair, delete_cookies
from api.database import get_session
import time, jwt

router = APIRouter(prefix="/api/auth", tags=["auth"])


# logs user in, creates cookies
@router.post("/login")
async def login(candidate: UserLogin, session = Depends(get_session)):
    user = session.exec(select(User).where(User.username == candidate.username)).first()

    if not user:
        return JSONResponse("User not found", status.HTTP_404_NOT_FOUND)
    if not user.verify_password(candidate.password):
        return JSONResponse("Incorrect password", status.HTTP_403_FORBIDDEN)

    access_token, refresh_token = generate_token_pair(user.id, session)
    response = JSONResponse("Logged in", status_code=status.HTTP_200_OK)
    response.set_cookie("access", access_token,
                        domain=cookie_domain,
                        max_age=access_maxage,
                        httponly=cookie_httponly,
                        samesite=cookie_samesite,
                        secure=cookie_secure
                        )
    response.set_cookie("refresh", refresh_token,
                        domain=cookie_domain,
                        max_age=access_maxage,
                        httponly=cookie_httponly,
                        samesite=cookie_samesite,
                        secure=cookie_secure
                        )
    return response

# logs the user out. validates their refresh jti, deletes cookies
@router.get("/logout")
async def logout(refresh: Annotated[str | None, Cookie()] = None, session = Depends(get_session)):
    # if there's a refresh token it needs to be invalidated
    if refresh:
        try:
            payload = jwt.decode(refresh, jwt_secret, algorithms=["HS256"])
        except jwt.InvalidTokenError:
            payload = None

        if payload:
            old_jti = session.exec(select(RefreshJTI).where(RefreshJTI.jti == payload.get("jti"))).first()
            if old_jti:
                old_jti.valid = False
                session.add(old_jti)
                session.commit()

    return delete_cookies("Logged out", status.HTTP_200_OK)

# verifies refresh token, rotates it and returns new cookies, logs user out on error
@router.get("/refresh")
async def refresh_tokens(refresh: Annotated[str | None, Cookie()] = None, session: Session = Depends(get_session)):
    if not refresh:
        return JSONResponse("No refresh token", status.HTTP_404_NOT_FOUND)

    # invalidates the old refresh jti
    try:
        payload = jwt.decode(refresh, jwt_secret, algorithms=["HS256"])
    except jwt.InvalidTokenError:
        return delete_cookies("Token is invalid", status.HTTP_403_FORBIDDEN)
    if payload:
        old_jti = session.exec(select(RefreshJTI).where(RefreshJTI.jti == payload.get("jti"))).first()

        if not old_jti:
            return delete_cookies("Token not found", status.HTTP_404_NOT_FOUND)
        if not old_jti.valid:
            return delete_cookies("Token is invalid", status.HTTP_403_FORBIDDEN)
        if old_jti.exp < int(time.time()):
            old_jti.valid = False
            session.add(old_jti)
            session.commit()

            return delete_cookies("Token is expired", status.HTTP_403_FORBIDDEN)

    user_id = payload.get("sub")
    access_token, refresh_token = generate_token_pair(user_id, session)
    response = JSONResponse("Refreshed token pair", status_code=status.HTTP_200_OK)
    response.set_cookie("access", access_token,
                        domain=cookie_domain,
                        max_age=access_maxage,
                        httponly=cookie_httponly,
                        samesite=cookie_samesite,
                        secure=cookie_secure
                        )
    response.set_cookie("refresh", refresh_token,
                        domain=cookie_domain,
                        max_age=refresh_maxage,
                        httponly=cookie_httponly,
                        samesite=cookie_samesite,
                        secure=cookie_secure
                        )
    return response

# returns user info based on access token
@router.get("/me")
async def me(access: Annotated[str | None, Cookie()] = None, session: Session = Depends(get_session)):
    if not access:
        return JSONResponse("No access token", status.HTTP_404_NOT_FOUND)

    try:
        payload = jwt.decode(access, jwt_secret, algorithms=["HS256"])
    except jwt.InvalidTokenError:
        return delete_cookies("Token is invalid", status.HTTP_403_FORBIDDEN)

    user = session.exec(select(User).where(User.id == int(payload.get("sub")))).first()
    if not user:
        return delete_cookies("User not found", status.HTTP_404_NOT_FOUND)

    return JSONResponse({
        "user_id": user.id,
        "username": user.username,
        "admin": user.admin,
        "created": str(user.created)
    }, status.HTTP_200_OK)




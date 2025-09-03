from fastapi import APIRouter, Depends, status, Cookie, HTTPException
from fastapi.responses import JSONResponse
from typing import Annotated

from sqlmodel import select, Session
from backend.models import UserLogin, User, RefreshJTI
from backend.config import jwt_secret, cookie_secure, cookie_domain, cookie_samesite, cookie_httponly, access_maxage, refresh_maxage
from backend.database import engine, get_session
import time, uuid, jwt

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



def delete_cookies(reason, code):
    response = JSONResponse(reason, status_code=code)
    response.delete_cookie("access")
    response.delete_cookie("refresh")
    return response

# generates an access and refresh jwt tokens, adds refresh jti to the db
def generate_token_pair(user_id, session):
    now = int(time.time())
    user = session.exec(select(User).where(User.id == user_id)).first()

    access_token = jwt.encode({
        "sub": str(user_id),
        "iat": now,
        "exp": now + access_maxage,
        "admin": user.admin
    }, jwt_secret, algorithm="HS256", headers={
        "Domain": cookie_domain,
        "MaxAge": access_maxage,
        "HttpOnly": cookie_httponly,
        "SameSite": cookie_samesite,
        "Secure": cookie_secure,
    })

    # creates a new JTI and adds it to the db
    jti = create_jti()
    with Session(engine) as session:
        new_refreshjti = RefreshJTI(
            jti=jti,
            user_id=user_id,
            iat=now,
            exp=now + refresh_maxage,
            valid=True
        )
        session.add(new_refreshjti)
        session.commit()

    refresh_token = jwt.encode({
        "sub": str(user_id),
        "iat": now,
        "exp": now + refresh_maxage,
        "jti": jti,
    }, jwt_secret, algorithm="HS256", headers={
        "Domain": cookie_domain,
        "MaxAge": refresh_maxage,
        "HttpOnly": cookie_httponly,
        "SameSite": cookie_samesite,
        "Secure": cookie_secure,
    })

    return access_token, refresh_token

# generates a new jti that's not in the db
def create_jti():
    with Session(engine) as session:
        while True:
            jti = str(uuid.uuid4())
            duplicates = session.exec(select(RefreshJTI).where(RefreshJTI.jti == jti)).all()

            if len(duplicates) == 0:
                return jti

# returns user if admin, otherwise httpexception
def require_admin(access: Annotated[str | None, Cookie()] = None):
    if not access:
        raise HTTPException(status.HTTP_403_FORBIDDEN, "No access token")

    try:
        payload = jwt.decode(access, jwt_secret, algorithms=["HS256"])
    except jwt.InvalidTokenError:
        raise HTTPException(status.HTTP_403_FORBIDDEN, "Token is invalid")

    if not payload.get("admin"):
        raise HTTPException(status.HTTP_403_FORBIDDEN, "Unauthorized")
    return True
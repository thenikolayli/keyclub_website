from fastapi import status, Cookie, HTTPException
from fastapi.responses import JSONResponse
from typing import Annotated

from sqlmodel import select, Session
from api.models.user_models import User, RefreshJTI
from api.config import jwt_secret, cookie_secure, cookie_domain, cookie_samesite, cookie_httponly, access_maxage, refresh_maxage
from api.database import engine
import time, uuid, jwt

def delete_cookies(reason, code):
    response = JSONResponse(reason, status_code=code)
    response.delete_cookie("access", path="/", domain=cookie_domain)
    response.delete_cookie("refresh", path="/", domain=cookie_domain)
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
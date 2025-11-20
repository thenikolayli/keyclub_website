from typing import Annotated

import config
from database import session_scope
from fastapi import Cookie, HTTPException, status
from models.auth_models import Session as Auth_Session
from sqlmodel import select


# returns user if admin, otherwise httpexception
def require_admin(session: Annotated[str | None, Cookie()] = None):
    if config.override_admin:
        return True  # override admin
    if not session:
        raise HTTPException(status.HTTP_403_FORBIDDEN, "Not logged in")
    with session_scope() as db_session:
        session_instance = db_session.exec(
            select(Auth_Session).where(Auth_Session.id == session)
        )
        if session_instance:
            return session_instance.user.admin
        raise HTTPException(status.HTTP_403_FORBIDDEN, "Not logged in")

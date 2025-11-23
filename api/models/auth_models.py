from datetime import datetime, timezone
from typing import Optional
from uuid import UUID, uuid4

import config
from passlib.hash import argon2
from pydantic import field_serializer
from sqlmodel import Field, SQLModel


class AuthSession(SQLModel, table=True):
    id: Optional[UUID] = Field(default_factory=uuid4, primary_key=True)
    created: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    expires: datetime = Field(
        default_factory=lambda: datetime.now(timezone.utc) + config.auth_session_expiry
    )
    user_id: int = Field(foreign_key="user.id")

    @field_serializer("created", "expires", "id", when_used="json")
    def to_str(self, value):
        return str(value)


class RememberMe(SQLModel, table=True):
    id: Optional[UUID] = Field(default=None, primary_key=True)
    hash: Optional[str] = None
    created: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    expires: datetime = Field(
        default_factory=lambda: datetime.now(timezone.utc) + config.remember_me_expiry
    )
    user_id: int = Field(foreign_key="user.id")

    # generates a random UUID for itself and saves a hash of it, if there isn't one
    def model_post_init(self, __context):
        if self.id is None:
            self.id = uuid4()
            self.hash = argon2.hash(str(self.id))

    @field_serializer("created", "expires", "id", when_used="json")
    def to_str(self, value):
        return str(value)

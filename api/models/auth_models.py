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
    id: Optional[int] = Field(default=None, primary_key=True)
    hash: str = Field(default_factory=lambda: argon2.hash(str(uuid4())))
    created: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    expires: datetime = Field(
        default_factory=lambda: datetime.now(timezone.utc) + config.remember_me_expiry
    )
    user_id: int = Field(foreign_key="user.id")

    @field_serializer("created", "expires", when_used="json")
    def to_str(self, value):
        return str(value)

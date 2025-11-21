from datetime import datetime, timezone
from typing import Optional

import config
from database import session_scope
from passlib.hash import argon2
from pydantic import BaseModel, field_serializer, field_validator
from sqlmodel import Field, SQLModel, select


class User(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    username: str = Field(unique=True)
    password: str
    admin: bool = Field(default=False)
    created: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

    def verify_password(self, password):
        return argon2.verify(password, self.password)

    # automatically hashes password on instance creation
    def __post_init__(self):
        self.password = argon2.hash(self.password)

    @field_serializer("created", when_used="json")
    def to_str(self, value):
        return str(value)

    @field_serializer("password", when_used="json")
    def exclude_fields(self, value):
        return None

    @field_validator("username")
    @classmethod
    def validate_username(cls, value):
        if value.strip() == "" or not value:
            raise ValueError("Username cannot be an empty string")
        for char in config.banned_usernamechars:
            print(char)
            if char in value:
                raise ValueError(f"Character `{char}` is not allowed")
        with session_scope() as session:
            result = session.exec(select(User).where(User.username == value)).first()
            if result:
                raise ValueError("Username taken")
        return value

    @field_validator("password")
    @classmethod
    def validate_password(cls, value):
        if value.strip() == "" or not value:
            raise ValueError("Password cannot be an empty string")
        return value


class UserLogin(BaseModel):
    username: str
    password: str
    remember_me: bool


class UserCreate(BaseModel):
    username: str
    password: str


class UserUpdate(BaseModel):
    username: Optional[str]
    password: Optional[str]
    admin: Optional[bool]

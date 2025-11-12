from sqlmodel import SQLModel, Field, Session, select
from pydantic import field_validator

from datetime import datetime, timezone
from passlib.hash import argon2

import config
from database import engine

class User(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    username: str = Field(unique=True, nullable=False)
    password: str = Field(nullable=False)
    admin: bool = Field(default=False, nullable=False)
    created: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

    # not class method because it needs to access self
    def hash_password(self):
        self.password = argon2.hash(self.password)

    def verify_password(self, password):
        return argon2.verify(password, self.password)

class UserLogin(SQLModel, table=False):
    username: str
    password: str

class UserCreate(SQLModel, table=False):
    username: str
    password: str
    # all validation logic is in the request schema to catch all issues before db constraints
    @field_validator("username")
    @classmethod
    def validate_username(cls, value):
        if value.strip() == "" or not value:
            raise ValueError("Username cannot be an empty string")
        for char in config.banned_usernamechars:
            print(char)
            if char in value:
                raise ValueError(f"Character `{char}` is not allowed")
        with Session(engine) as session:
            result = session.exec(select(User).where(User.username == value)).first()
            if result:
                raise ValueError(f"Username taken")
        return value

    @field_validator("password")
    @classmethod
    def validate_password(cls, value):
        if value.strip() == "" or not value:
            raise ValueError("Password cannot be an empty string")
        return value

class UserUpdate(SQLModel, table=False):
    username: str | None = None
    password: str | None = None
    admin: bool | None = None

class RefreshJTI(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    jti: str
    user_id: int
    iat: int
    exp: int
    valid: bool
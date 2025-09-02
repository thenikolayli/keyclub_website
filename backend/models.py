from sqlmodel import SQLModel, Field, Session, select
from pydantic import field_validator

from datetime import datetime
from zoneinfo import ZoneInfo
from passlib.hash import argon2

import backend.config as config
from backend.database import engine

class Message(SQLModel, table=False):
    first_name: str
    last_name: str
    email: str
    message: str

class SetBanner(SQLModel, table=False):
    message: str
    show: bool


class Event(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    timestamp: datetime = Field(default_factory=lambda: datetime.now(ZoneInfo("America/Los_Angeles")))
    title: str
    hours_total: float
    people_attended: int

class EventCreate(SQLModel, table=False):
    link: str
    hours_multiplier: float = 1

class MeetingCreate(SQLModel, table=False):
    link: str
    first_name_col: str
    last_name_col: str
    meeting_length: int
    title: str


class User(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    username: str = Field(unique=True, nullable=False)
    password: str = Field(nullable=False)
    admin: bool = Field(default=False, nullable=False)
    created: datetime = Field(default_factory=lambda: datetime.now(ZoneInfo("America/Los_Angeles")))

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
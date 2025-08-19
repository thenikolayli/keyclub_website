from sqlmodel import SQLModel, Field, select
from datetime import datetime
from zoneinfo import ZoneInfo
from sqlmodel import Session
from pydantic import field_validator, ValidationError

import backend.config as config

class Message(SQLModel, table=False):
    first_name: str
    last_name: str
    email: str
    message: str

class EventCreate(SQLModel, table=False):
    link: str
    hours_multiplier: float

class MeetingCreate(SQLModel, table=False):
    link: str
    first_name_col: str
    last_name_col: str
    meeting_length: int
    title: str

class Event(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    timestamp: datetime = Field(default_factory=lambda: datetime.now(ZoneInfo("America/Los_Angeles")))
    title: str
    hours_logged: float
    hours_not_logged: float
    people_attended: int

class User(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    username: str
    password: str
    roles: list[str]

    @field_validator("username")
    def validate_username(self, value):
        with Session(config.engine) as session:
            if len(session.exec(select(User)).all()) > 0:
                raise ValidationError("Username already exists")
        for char in config.banned_usernamechars:
            if char in value:
                raise ValidationError(f"Character `{char}` is not allowed")
        return value
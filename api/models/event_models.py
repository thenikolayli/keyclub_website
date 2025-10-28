from sqlmodel import SQLModel, Field

from datetime import datetime
from zoneinfo import ZoneInfo


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

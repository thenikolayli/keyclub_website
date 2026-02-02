from sqlmodel import SQLModel, Field
from sqlalchemy import Column, DateTime
from datetime import datetime, timezone, timedelta
from pydantic import BaseModel, field_validator
from typing import Optional, Any


# request body information that's needed to post an event
class PostEvent(BaseModel):
    url: str
    description: str
    post_type: Optional[str] = None

class CurrentEvent(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    title: str
    date: str # leaders may format event dates differently, making it hard to convert str to datetime object
    # delete date is when events are deleted from CurrentEvents
    delete_date: datetime = Field(
        sa_column=Column(DateTime(timezone=True), nullable=False),
        default_factory=lambda: datetime.now(timezone.utc) + timedelta(days=7)
    )

# class representing an event that is yet to be posted
# different from PostEvent in that this is used to easily pass info between functions
class EventInfo(BaseModel):
    post_type: Optional[str] = "Volunteers Needed"
    title: str
    description: str
    time: str
    date: str
    location: str
    priority: Optional[str] = None
    url: str

    @field_validator("post_type")
    @classmethod
    def validate_post_type(cls, value):
        return value or "Volunteers Needed"

    # removes newline characters
    def model_post_init(self, __context):
        self.title = self.title.strip(" \t\r\n")
        self.url = self.url.strip(" \t\r\n")
        self.description = self.description.strip(" \t\r\n")
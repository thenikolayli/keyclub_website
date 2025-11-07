from sqlmodel import SQLModel, Field
from datetime import datetime, timezone, timedelta
from pydantic import BaseModel
from typing import Optional

# request body information that's needed to post an event
class PostEvent(BaseModel):
    url: str
    description: str
    post_type: str = Field(default=None)

class CurrentEvent(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    title: str
    date: str # leaders may format event dates differently, making it hard to convert str to datetime object
    delete_date: datetime = Field(default_factory = lambda: datetime.now(timezone.utc) + timedelta(days=7)) # cloudinary photos are deleted a week later
    cloudinary_deleted: bool = Field(default=False)
    cloudinary_public_id: str

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
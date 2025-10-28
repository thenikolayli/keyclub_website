from sqlmodel import SQLModel, Field
from datetime import datetime, timezone, timedelta

class PostEvent(SQLModel, table=False):
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
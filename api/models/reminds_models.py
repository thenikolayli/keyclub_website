from sqlmodel import SQLModel, Field
import datetime

class PostEvent(SQLModel, table=False):
    url: str
    description: str

class CurrentEvent(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    title: str
    date: datetime
from datetime import datetime, timezone
from typing import Optional
from uuid import UUID, uuid4

from pydantic import field_serializer
from sqlmodel import Field, Relationship, SQLModel

from models.user_models import User


class Session(SQLModel, table=True):
    id: Optional[UUID] = Field(default_factory=uuid4, primary_key=True)
    created: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    expires: datetime
    user: "User" = Relationship(back_populates="active_sessions")

    @field_serializer("created", "expires", when_used="json")
    def to_str(self, value):
        return str(value)

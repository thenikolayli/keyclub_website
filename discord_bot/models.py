from pydantic import BaseModel, field_validator
from typing import Optional

# class representing an event that is yet to be posted
# same as the api model
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
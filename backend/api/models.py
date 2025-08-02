# models for how data is requested

from pydantic import BaseModel

# message request model
class Message(BaseModel):
    first_name: str
    last_name: str
    contact: str # email or phone number
    message: str

# info needed to log an event
class EventLoggedRequestModel(BaseModel):
    api_key: str
    link: str
    hours_multiplier: float

# info needed to log a meeting
class MeetingLoggedRequestModel(BaseModel):
    api_key: str
    link: str
    first_name_col: str
    last_name_col: str
    meeting_length: int
    title: str
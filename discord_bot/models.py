from pydantic import BaseModel

# class representing an event that is yet to be posted
# same as the api model
class EventInfo(BaseModel):
    post_type: str
    title: str
    description: str
    time: str
    date: str
    location: str
    priority: str
    docs_url: str
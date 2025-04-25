from pydantic import BaseModel

class Message(BaseModel):
    first_name: str
    last_name: str
    contact: str # email or phone number
    message: str
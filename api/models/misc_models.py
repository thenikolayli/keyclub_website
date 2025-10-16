from sqlmodel import SQLModel

class Message(SQLModel, table=False):
    first_name: str
    last_name: str
    email: str
    message: str

class SetBanner(SQLModel, table=False):
    message: str
    show: bool
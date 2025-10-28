from sqlmodel import SQLModel, Field

class Message(SQLModel, table=False):
    first_name: str
    last_name: str
    email: str
    message: str

class Banner(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    message: str
    show: bool
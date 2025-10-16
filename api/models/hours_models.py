from sqlmodel import SQLModel, Field

# model that represents how many hours a user has
class Hours(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    name: str
    nickname: str
    grad_year: int
    term_hours: float
    all_hours: float
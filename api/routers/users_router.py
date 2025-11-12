from fastapi import APIRouter, Depends, status
from fastapi.responses import JSONResponse
from sqlmodel import select

from models.user_models import User, UserCreate, UserUpdate
from utils.auth_utils import require_admin
import database

router = APIRouter(prefix="/api/users", tags=["users"])


@router.get("/")
async def get_users(count: int = 10, skip: int = 0, session = Depends(database.get_session)):
    users = session.exec(select(User).offset(skip).limit(count)).all()
    for i in range(len(users)):
        users[i] = users[i].model_dump()
        users[i].pop("password")
        users[i].update({"created": str(users[i].get("created"))})
    return JSONResponse(users, status_code=status.HTTP_200_OK)

@router.get("/{user_id}")
async def get_user(user_id: int, session = Depends(database.get_session)):
    user = session.exec(select(User).where(User.id == user_id)).first()
    user = user.model_dump()
    user.pop("password")
    user.update({"created": str(user.get("created"))})
    return JSONResponse(user, status_code=status.HTTP_200_OK)

@router.post("/")
async def create_user(user: UserCreate, session = Depends(database.get_session)):
    new_user = User(username=user.username, password=user.password)
    new_user.hash_password()
    session.add(new_user)
    session.commit()

    return JSONResponse("Account created", status_code=status.HTTP_201_CREATED)

@router.put("/{user_id}", dependencies=[Depends(require_admin)])
async def update_user(user_id: int, new_info: UserUpdate, session = Depends(database.get_session)):
    user = session.exec(select(User).where(User.id == user_id)).first()
    if not user:
        return JSONResponse("User not found", status_code=status.HTTP_404_NOT_FOUND)

    user.username = new_info.username or user.username
    user.admin = new_info.admin or user.admin

    # extra logic for password because it needs to be hashed
    if new_info.password:
        user.password = new_info.password
        user.hash_password()
    session.add(user)
    session.commit()

    return JSONResponse(user.model_dump(mode="json"), status_code=status.HTTP_200_OK)

@router.delete("/{user_id}", dependencies=[Depends(require_admin)])
async def delete_user(user_id: int, session = Depends(database.get_session)):
    user = session.exec(select(User).where(User.id == user_id)).first()
    session.delete(user)
    session.commit()

    return JSONResponse(user.model_dump(mode="json"), status_code=status.HTTP_200_OK)
from fastapi import APIRouter, Depends, status, HTTPException
from fastapi.responses import JSONResponse
from sqlmodel import select

from backend.models import User, UserLogin, UserCreate, UserUpdate
import backend.database as database

router = APIRouter(prefix="/api/users", tags=["users"])

@router.get("/")
async def get_users(count: int = 10, skip: int = 0, session = Depends(database.get_session)):
    users = session.exec(select(User).offset(skip).limit(count)).all()
    return JSONResponse([user.model_dump() for user in users], status_code=status.HTTP_200_OK)

@router.get("/{user_id}")
async def get_user(user_id: int, session = Depends(database.get_session)):
    user = session.exec(select(User).where(User.id == user_id)).first()
    return JSONResponse(user.model_dump(), status_code=status.HTTP_200_OK)

@router.post("/")
async def create_user(user: UserCreate, session = Depends(database.get_session)):
    new_user = User(username=user.username, password=user.password)
    new_user.hash_password()
    session.add(new_user)
    session.commit()

    return JSONResponse(new_user.model_dump(), status_code=status.HTTP_201_CREATED)

@router.put("/{user_id}")
async def update_user(user_id: int, new_info: UserUpdate, session = Depends(database.get_session)):
    user = session.exec(select(User).where(User.id == user_id)).first()
    if not user:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "User not found")

    user.username = new_info.username or user.username
    user.admin = new_info.admin or user.admin

    # extra logic for password because it needs to be hashed
    if new_info.password:
        user.password = new_info.password
        user.hash_password()
    session.add(user)
    session.commit()

    return JSONResponse(user.model_dump(), status_code=status.HTTP_200_OK)

@router.delete("/{user_id}")
async def delete_user(user_id: int, session = Depends(database.get_session)):
    user = session.exec(select(User).where(User.id == user_id)).first()
    session.delete(user)
    session.commit()

    return JSONResponse(user.model_dump(), status_code=status.HTTP_200_OK)

@router.post("/login")
async def login_user(user: UserLogin, session = Depends(database.get_session)):
    candidate = session.exec(select(User).where(User.username == user.username)).first()

    if not candidate:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "User not found")
    if not candidate.verify_password(user.password):
        raise HTTPException(status.HTTP_403_FORBIDDEN, "Incorrect password")

    return JSONResponse("Logged in", status_code=status.HTTP_200_OK)
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager

from apscheduler.schedulers.asyncio import AsyncIOScheduler
from zoneinfo import ZoneInfo

from api.routers.misc_router import router as email_router
from api.routers.gallery_router import router as gallery_router
from api.routers.gallery_router import update_photos
from api.routers.event_router import router as event_router
from api.routers.hours_router import router as hours_router
from api.routers.hours_router import update_hours
from api.routers.users_router import router as users_router
from api.routers.auth_router import router as auth_router
from api.routers.admin_router import router as admin_router

import api.database as database

@asynccontextmanager
async def lifespan(app: FastAPI):
    database.update_tables()
    database.create_admin()
    await update_hours()
    await update_photos()

    # updates hours automatically every day at 12:00 PM and 6:00 PM
    scheduler = AsyncIOScheduler(timezone=ZoneInfo('America/Los_Angeles'))
    scheduler.add_job(update_hours, "cron", hour=12)
    scheduler.add_job(update_hours, "cron", hour=18)
    scheduler.add_job(update_photos, "cron", hour=12)
    scheduler.start()

    yield

app = FastAPI(docs_url=None, redoc_url=None, openapi_url="/openapi.json", root_path="", host="0.0.0.0", port=8000, lifespan=lifespan)
app.include_router(email_router)
app.include_router(gallery_router)
app.include_router(event_router)
app.include_router(hours_router)
app.include_router(users_router)
app.include_router(auth_router)
app.include_router(admin_router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
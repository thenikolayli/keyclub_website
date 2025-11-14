from contextlib import asynccontextmanager
from zoneinfo import ZoneInfo

import config
import database
from apscheduler.schedulers.asyncio import AsyncIOScheduler
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers.admin_router import router as admin_router
from routers.auth_router import router as auth_router
from routers.event_router import router as event_router
from routers.gallery_router import router as gallery_router
from routers.gallery_router import update_photos
from routers.hours_router import router as hours_router
from routers.misc_router import router as email_router
from routers.reminds_router import router as reminds_router
from routers.users_router import router as users_router
from utils.hours_util import update_hours_list
from utils.reminds_utils import main as reminds_main


@asynccontextmanager
async def lifespan(app: FastAPI):
    database.update_tables()
    database.create_admin()
    if config.run_loop_functions:
        await update_hours_list()
        await update_photos()
        await reminds_main()

    scheduler = AsyncIOScheduler(timezone=ZoneInfo("America/Los_Angeles"))
    scheduler.add_job(update_hours_list, "cron", hour=12)
    scheduler.add_job(update_photos, "cron", hour=12)
    scheduler.add_job(reminds_main, "cron", hour=15)
    scheduler.start()

    yield


app = FastAPI(
    docs_url=None,
    redoc_url=None,
    openapi_url="/openapi.json",
    root_path="",
    lifespan=lifespan,
)
app.include_router(email_router)
app.include_router(gallery_router)
app.include_router(event_router)
app.include_router(hours_router)
app.include_router(users_router)
app.include_router(auth_router)
app.include_router(admin_router)
app.include_router(reminds_router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

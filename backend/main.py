from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from os import getenv
from backend.api.api import router as api_router

load_dotenv()
api_url = getenv('API_URL')
app = FastAPI(docs_url=None, redoc_url=api_url, openapi_url="/openapi.json", root_path="/api", host="0.0.0.0", port=8000)
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
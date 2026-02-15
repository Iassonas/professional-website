from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from pathlib import Path

from app.config import FRONTEND_URL
from app.routers import contact

app = FastAPI(title="AI Services API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[FRONTEND_URL],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(contact.router, prefix="/api")

# Serve the built React frontend in production
build_dir = Path(__file__).resolve().parent.parent.parent / "frontend" / "dist"
if build_dir.exists():
    app.mount("/", StaticFiles(directory=str(build_dir), html=True), name="frontend")

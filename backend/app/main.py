from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from pathlib import Path

from app.config import FRONTEND_URL
from app.routers import contact, chat

app = FastAPI(
    title="Iassonas Georgakopoulos · API",
    description="Backend for iassonas.com. Contact form and AI chat assistant.",
    docs_url="/api/docs",
    redoc_url=None,
    openapi_url="/api/openapi.json",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[FRONTEND_URL],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(contact.router, prefix="/api")
app.include_router(chat.router, prefix="/api")

# Serve the built React frontend in production
build_dir = Path(__file__).resolve().parent.parent.parent / "frontend" / "dist"
if build_dir.exists():
    app.mount("/", StaticFiles(directory=str(build_dir), html=True), name="frontend")

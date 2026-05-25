from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from pathlib import Path
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.errors import RateLimitExceeded
from slowapi.util import get_remote_address

from app.config import FRONTEND_URL
from app.routers import contact, chat

limiter = Limiter(key_func=get_remote_address)

app = FastAPI(
    title="Iassonas Georgakopoulos · API",
    description="Backend for iassonas.eu. Contact form and AI chat assistant.",
    docs_url="/api/docs",
    redoc_url=None,
    openapi_url="/api/openapi.json",
)

app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[FRONTEND_URL],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(contact.router, prefix="/api")
app.include_router(chat.router, prefix="/api")

# Serve the built React frontend in production.
# Mount Vite's hashed asset bundle at /assets, then a catch-all that returns
# either a real file from dist/ or the SPA shell (so React Router handles deep links).
build_dir = Path(__file__).resolve().parent.parent.parent / "frontend" / "dist"

if build_dir.exists():
    assets_dir = build_dir / "assets"
    if assets_dir.exists():
        app.mount("/assets", StaticFiles(directory=str(assets_dir)), name="assets")

    index_file = build_dir / "index.html"

    @app.get("/{full_path:path}", include_in_schema=False)
    async def serve_spa(full_path: str):
        # /api/* would be matched by router above; this catch-all only runs for
        # everything else, so we never serve the SPA shell for API requests.
        candidate = build_dir / full_path
        if full_path and candidate.is_file():
            return FileResponse(candidate)
        if index_file.exists():
            return FileResponse(index_file)
        raise HTTPException(status_code=404, detail="Not Found")

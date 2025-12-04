from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from slowapi import Limiter
from slowapi.util import get_remote_address
from slowapi.middleware import SlowAPIMiddleware

from app.core.config import settings
from app.db.session import create_db_and_tables # Use the SQLModel init
from app.api.v1.api import api_router # Import the new consolidated router


# Initialize Limiter
limiter = Limiter(key_func=get_remote_address)


def get_application() -> FastAPI:
    application = FastAPI(
        title=settings.PROJECT_NAME,
        openapi_url=f"{settings.API_V1_STR}/openapi.json",
        version="0.1.0"
    )

    # Add rate limiting middleware
    application.state.limiter = limiter
    application.add_middleware(SlowAPIMiddleware)

    # Add CORS middleware
    application.add_middleware(
        CORSMiddleware,
        allow_origins=[str(origin) for origin in settings.BACKEND_CORS_ORIGINS],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    # Include the API router
    application.include_router(api_router, prefix=settings.API_V1_STR)

    @application.on_event("startup")
    def on_startup():
        create_db_and_tables() # Create tables on startup

    @application.get("/health", tags=["health"])
    def health():
        return {"status": "ok", "message": "API is healthy!"}

    return application


app = get_application()
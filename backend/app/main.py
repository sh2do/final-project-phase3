from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from backend.app.db.database import engine, Base
from backend.app.api.endpoints import anime, jikan
from backend.app.db import models # Import models to ensure they are registered with Base.metadata
from backend.app.config import settings

load_dotenv()

# Create all database tables
# For simplicity in local development, this creates tables on app startup.
# TODO: Implement a robust database migration tool (e.g., Alembic) for production environments
# to manage schema changes and prevent data loss.
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Anime Collection Tracker API",
    description="API for tracking anime collection and integrating with Jikan API.",
    version=settings.APP_VERSION,
)

# Configure CORS for frontend interaction
# IMPORTANT: In a production environment, restrict origins to your specific frontend domain.

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API routers
app.include_router(anime.router, prefix="/api/anime", tags=["anime"])
app.include_router(jikan.router, prefix="/api/jikan", tags=["jikan"])

@app.get("/", summary="Root endpoint")
async def root():
    """
    Root endpoint for the API.
    """
    return {"message": "Welcome to the Anime Collection Tracker API!"}

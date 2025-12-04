from pydantic import BaseSettings
from typing import List


class Settings(BaseSettings):
    APP_NAME: str = "Anime Collection Tracker"
    API_VERSION: str = "1.0.0"
    DEBUG: bool = True
    SECRET_KEY: str = "change-me-in-prod"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 7
    DATABASE_URL: str = "postgresql://postgres:postgres@db:5432/anime_db"
    ALLOWED_ORIGINS: List[str] = ["http://localhost:5173", "http://localhost:3000"]

    class Config:
        env_file = ".env"


settings = Settings()

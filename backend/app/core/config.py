from typing import List, Optional
from pydantic import BaseSettings, Field, AnyHttpUrl


class Settings(BaseSettings):
    APP_NAME: str = "Anime Collection Tracker API"
    API_V1_STR: str = "/api/v1"
    SECRET_KEY: str = Field(..., env="SECRET_KEY")
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 7  # 7 days

    # Database
    DATABASE_URL: str = Field(..., env="DATABASE_URL")

    # CORS
    BACKEND_CORS_ORIGINS: List[AnyHttpUrl] = Field(
        ["http://localhost:3000", "http://127.0.0.1:3000"], env="BACKEND_CORS_ORIGINS"
    )

    # Project
    PROJECT_NAME: str = "Anime Collection Tracker"
    DEBUG_MODE: bool = False

    class Config:
        case_sensitive = True
        env_file = ".env"
        env_file_encoding = 'utf-8'


settings = Settings()
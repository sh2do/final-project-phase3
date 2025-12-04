# backend/app/config.py
from pydantic_settings import BaseSettings, SettingsConfigDict
from typing import List, Optional

class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file='.env', extra='ignore')

    APP_VERSION: str = "1.0.0"
    CORS_ORIGINS: List[str] = ["http://localhost:5173", "http://localhost:8000"] # Default values

settings = Settings()

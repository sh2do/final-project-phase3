from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class AnimeBase(BaseModel):
    title: str
    description: Optional[str] = None
    image_url: Optional[str] = None
    episodes: int
    release_year: Optional[int] = None


class AnimeCreate(AnimeBase):
    pass


class AnimeUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    image_url: Optional[str] = None
    episodes: Optional[int] = None
    release_year: Optional[int] = None


class AnimeResponse(AnimeBase):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

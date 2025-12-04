from typing import Optional
from datetime import datetime
from pydantic import BaseModel


class AnimeBase(BaseModel):
    title: str
    external_id: Optional[int] = None
    synopsis: Optional[str] = None
    episodes: Optional[int] = None
    score: Optional[float] = None
    image_url: Optional[str] = None
    release_year: Optional[int] = None
    source: Optional[str] = None


class AnimeCreate(AnimeBase):
    pass


class AnimeUpdate(BaseModel):
    title: Optional[str] = None
    external_id: Optional[int] = None
    synopsis: Optional[str] = None
    episodes: Optional[int] = None
    score: Optional[float] = None
    image_url: Optional[str] = None
    release_year: Optional[int] = None
    source: Optional[str] = None


class AnimePublic(AnimeBase):
    id: int
    created_at: datetime
    updated_at: Optional[datetime]

    class Config:
        from_attributes = True
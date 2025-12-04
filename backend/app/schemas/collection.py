from typing import Optional
from datetime import datetime
from pydantic import BaseModel
from .user import UserPublic
from .anime import AnimePublic


class CollectionItemBase(BaseModel):
    user_id: int
    anime_id: int
    episodes_watched: int = 0
    rating: Optional[float] = None
    notes: Optional[str] = None
    is_favorite: bool = False


class CollectionItemCreate(CollectionItemBase):
    pass


class CollectionItemUpdate(BaseModel):
    episodes_watched: Optional[int] = None
    rating: Optional[float] = None
    notes: Optional[str] = None
    is_favorite: Optional[bool] = None


class CollectionItemPublic(CollectionItemBase):
    id: int
    created_at: datetime
    updated_at: Optional[datetime]
    user: Optional[UserPublic] = None
    anime: Optional[AnimePublic] = None

    class Config:
        from_attributes = True

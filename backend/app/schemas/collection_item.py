from pydantic import BaseModel
from typing import Optional
from datetime import datetime
from .anime import AnimeResponse
from .user import UserResponse


class CollectionItemBase(BaseModel):
    user_id: int
    anime_id: int
    episodes_watched: int = 0
    rating: Optional[float] = None
    notes: Optional[str] = None
    is_favorite: int = 0


class CollectionItemCreate(CollectionItemBase):
    pass


class CollectionItemUpdate(BaseModel):
    episodes_watched: Optional[int] = None
    rating: Optional[float] = None
    notes: Optional[str] = None
    is_favorite: Optional[int] = None


class CollectionItemResponse(CollectionItemBase):
    id: int
    created_at: datetime
    updated_at: datetime
    user: Optional[UserResponse] = None
    anime: Optional[AnimeResponse] = None

    class Config:
        from_attributes = True

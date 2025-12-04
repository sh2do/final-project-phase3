from typing import Optional
from sqlmodel import SQLModel, Field, Relationship
from datetime import datetime


class CollectionItem(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    user_id: int
    anime_id: int
    episodes_watched: int = 0
    rating: Optional[float] = None
    notes: Optional[str] = None
    is_favorite: bool = False
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: Optional[datetime] = None

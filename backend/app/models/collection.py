from typing import Optional
from datetime import datetime
from sqlmodel import Field, Relationship, SQLModel


class CollectionItemBase(SQLModel):
    user_id: int = Field(foreign_key="user.id", index=True)
    anime_id: int = Field(foreign_key="anime.id", index=True)
    episodes_watched: int = Field(default=0, ge=0)
    rating: Optional[float] = Field(default=None, ge=0, le=10) # 0.0 - 10.0
    notes: Optional[str] = Field(default=None)
    is_favorite: bool = Field(default=False)


class CollectionItem(CollectionItemBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    created_at: datetime = Field(default_factory=datetime.utcnow, nullable=False)
    updated_at: Optional[datetime] = Field(default_factory=datetime.utcnow, sa_column_kwargs={"onupdate": datetime.utcnow})

    user: "User" = Relationship(back_populates="collection_items")
    anime: "Anime" = Relationship(back_populates="collection_items")


class CollectionItemCreate(CollectionItemBase):
    pass


class CollectionItemUpdate(SQLModel):
    episodes_watched: Optional[int] = None
    rating: Optional[float] = None
    notes: Optional[str] = None
    is_favorite: Optional[bool] = None


class CollectionItemPublic(CollectionItemBase):
    id: int
    created_at: datetime
    updated_at: Optional[datetime]
    user: Optional["UserPublic"] = None
    anime: Optional["AnimePublic"] = None
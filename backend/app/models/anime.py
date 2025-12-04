from typing import List, Optional
from datetime import datetime
from sqlmodel import Field, Relationship, SQLModel


class AnimeBase(SQLModel):
    title: str = Field(index=True)
    external_id: Optional[int] = Field(default=None, index=True, description="ID from external source like AniList or Kitsu")
    synopsis: Optional[str] = Field(default=None)
    episodes: Optional[int] = Field(default=None)
    score: Optional[float] = Field(default=None)
    image_url: Optional[str] = Field(default=None)
    release_year: Optional[int] = Field(default=None)
    source: Optional[str] = Field(default=None, description="Source API (e.g., 'anilist', 'kitsu')")


class Anime(AnimeBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    created_at: datetime = Field(default_factory=datetime.utcnow, nullable=False)
    updated_at: Optional[datetime] = Field(default_factory=datetime.utcnow, sa_column_kwargs={"onupdate": datetime.utcnow})

    collection_items: List["CollectionItem"] = Relationship(back_populates="anime")


class AnimeCreate(AnimeBase):
    pass


class AnimeUpdate(SQLModel):
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
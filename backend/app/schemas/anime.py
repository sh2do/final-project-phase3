from typing import List, Optional
from pydantic import BaseModel, Field

# Pydantic models for data validation and serialization

class GenreBase(BaseModel):
    name: str = Field(..., example="Action")

class GenreCreate(GenreBase):
    pass

class Genre(GenreBase):
    id: int

    class Config:
        from_attributes = True

class UserListBase(BaseModel):
    status: str = Field(..., example="watching") # e.g., watching, completed, plan_to_watch

class UserListCreate(UserListBase):
    pass

class UserList(UserListBase):
    id: int

    class Config:
        from_attributes = True

class AnimeBase(BaseModel):
    mal_id: int = Field(..., example=1, description="MyAnimeList ID")
    title: str = Field(..., example="Cowboy Bebop")
    image_url: Optional[str] = Field(None, example="https://myanimelist.net/anime/image/1.jpg")
    synopsis: Optional[str] = Field(None, example="A space western series...")
    episodes: Optional[int] = Field(None, example=26)
    score: Optional[float] = Field(None, example=8.78)
    # Add other fields you deem necessary from Jikan API, keep it simple for junior engineer

class AnimeCreate(AnimeBase):
    genres: List[str] = Field([], example=["Action", "Sci-Fi"])
    user_list_status: Optional[str] = Field(None, example="watching")

class AnimeUpdate(AnimeBase):
    title: Optional[str] = None
    image_url: Optional[str] = None
    synopsis: Optional[str] = None
    episodes: Optional[int] = None
    score: Optional[float] = None
    genres: Optional[List[str]] = None
    user_list_status: Optional[str] = None

class Anime(AnimeBase):
    id: int
    genres: List[Genre] = []
    user_list: Optional[UserList] = None

    class Config:
        from_attributes = True

# Jikan API specific models (for response parsing)
class JikanGenre(BaseModel):
    name: str

class JikanImageData(BaseModel):
    jpg: Optional[dict] = None
    webp: Optional[dict] = None

class JikanImages(BaseModel):
    images: JikanImageData

class JikanAnimeData(BaseModel):
    mal_id: int
    title: str
    images: JikanImages
    synopsis: Optional[str] = None
    episodes: Optional[int] = None
    score: Optional[float] = None
    genres: List[JikanGenre] = []

    # Helper to extract a single image URL
    @property
    def image_url(self):
        if self.images and self.images.images and self.images.images.jpg:
            return self.images.images.jpg.get('image_url')
        return None

class JikanSearchResponse(BaseModel):
    data: List[JikanAnimeData]

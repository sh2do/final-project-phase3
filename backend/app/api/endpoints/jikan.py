from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from backend.app.db import crud
from backend.app.db.database import get_db
from backend.app.schemas import anime as schemas
from backend.app.services import jikan as jikan_service

router = APIRouter()

@router.get("/search", response_model=List[schemas.JikanAnimeData], summary="Search anime on Jikan API")
async def search_anime(q: str):
    """
    Search for anime on the Jikan API (MyAnimeList database).
    """
    jikan_response = jikan_service.search_anime_jikan(q)
    if not jikan_response:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No anime found or Jikan API error.")
    return jikan_response.data

@router.post("/save_to_collection", response_model=schemas.Anime, status_code=status.HTTP_201_CREATED, summary="Save anime from Jikan to local collection")
async def save_anime_to_collection(
    anime_data: schemas.JikanAnimeData,
    user_list_status: str = "plan_to_watch", # Default status
    db: Session = Depends(get_db)
):
    """
    Save an anime retrieved from Jikan API to the local collection.
    If the anime already exists, it will return the existing entry.
    """
    db_anime = crud.get_anime_by_mal_id(db, mal_id=anime_data.mal_id)
    if db_anime:
        # Anime already exists, return it
        return db_anime

    # Prepare data for local AnimeCreate schema
    genres_names = [g.name for g in anime_data.genres]
    
    anime_create_schema = schemas.AnimeCreate(
        mal_id=anime_data.mal_id,
        title=anime_data.title,
        image_url=anime_data.image_url,
        synopsis=anime_data.synopsis,
        episodes=anime_data.episodes,
        score=anime_data.score,
        genres=genres_names,
        user_list_status=user_list_status
    )
    
    return crud.create_anime(db=db, anime=anime_create_schema)

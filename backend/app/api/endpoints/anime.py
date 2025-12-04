from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from backend.app.db import crud
from backend.app.db.database import get_db
from backend.app.schemas import anime as schemas

router = APIRouter()

@router.get("/", response_model=List[schemas.Anime], summary="Get all anime in local collection")
def read_animes(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    """
    Retrieve a list of all anime items currently in the local collection.
    """
    animes = crud.get_animes(db, skip=skip, limit=limit)
    return animes

@router.get("/{anime_id}", response_model=schemas.Anime, summary="Get a specific anime from local collection")
def read_anime(anime_id: int, db: Session = Depends(get_db)):
    """
    Retrieve a single anime item from the local collection by its ID.
    """
    db_anime = crud.get_anime(db, anime_id=anime_id)
    if db_anime is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Anime not found")
    return db_anime

@router.post("/", response_model=schemas.Anime, status_code=status.HTTP_201_CREATED, summary="Add a new anime to local collection")
def create_anime_item(anime: schemas.AnimeCreate, db: Session = Depends(get_db)):
    """
    Add a new anime item to the local collection. This is for manual entry or internal use
    if not coming directly from Jikan search.
    """
    db_anime = crud.get_anime_by_mal_id(db, mal_id=anime.mal_id)
    if db_anime:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Anime with this MAL ID already exists")
    return crud.create_anime(db=db, anime=anime)

@router.put("/{anime_id}", response_model=schemas.Anime, summary="Update an anime in local collection")
def update_anime_item(anime_id: int, anime: schemas.AnimeUpdate, db: Session = Depends(get_db)):
    """
    Update an existing anime item in the local collection.
    """
    db_anime = crud.update_anime(db, anime_id=anime_id, anime_update=anime)
    if db_anime is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Anime not found")
    return db_anime

@router.delete("/{anime_id}", status_code=status.HTTP_204_NO_CONTENT, summary="Delete an anime from local collection")
def delete_anime_item(anime_id: int, db: Session = Depends(get_db)):
    """
    Delete an anime item from the local collection by its ID.
    """
    db_anime = crud.delete_anime(db, anime_id=anime_id)
    if db_anime is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Anime not found")
    return

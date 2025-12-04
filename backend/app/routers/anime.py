from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.schemas.anime import AnimeCreate, AnimeUpdate, AnimeResponse
from app.crud import anime as crud_anime

router = APIRouter(prefix="/anime", tags=["anime"])


@router.get("", response_model=list[AnimeResponse])
def get_anime_list(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    """Get all anime with pagination"""
    anime = crud_anime.get_all_anime(db, skip=skip, limit=limit)
    return anime


@router.get("/{anime_id}", response_model=AnimeResponse)
def get_anime_detail(anime_id: int, db: Session = Depends(get_db)):
    """Get anime by ID"""
    anime = crud_anime.get_anime(db, anime_id)
    if not anime:
        raise HTTPException(status_code=404, detail="Anime not found")
    return anime


@router.post("", response_model=AnimeResponse)
def create_anime_endpoint(anime: AnimeCreate, db: Session = Depends(get_db)):
    """Create a new anime"""
    return crud_anime.create_anime(db, anime)


@router.patch("/{anime_id}", response_model=AnimeResponse)
def update_anime_endpoint(anime_id: int, anime_update: AnimeUpdate, db: Session = Depends(get_db)):
    """Update an anime"""
    anime = crud_anime.update_anime(db, anime_id, anime_update)
    if not anime:
        raise HTTPException(status_code=404, detail="Anime not found")
    return anime


@router.delete("/{anime_id}")
def delete_anime_endpoint(anime_id: int, db: Session = Depends(get_db)):
    """Delete an anime"""
    anime = crud_anime.delete_anime(db, anime_id)
    if not anime:
        raise HTTPException(status_code=404, detail="Anime not found")
    return {"message": "Anime deleted successfully", "id": anime_id}

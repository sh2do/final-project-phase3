from sqlalchemy.orm import Session
from app.models.anime import Anime
from app.schemas.anime import AnimeCreate, AnimeUpdate


def get_all_anime(db: Session, skip: int = 0, limit: int = 100):
    """Get all anime with pagination"""
    return db.query(Anime).offset(skip).limit(limit).all()


def get_anime(db: Session, anime_id: int):
    """Get anime by ID"""
    return db.query(Anime).filter(Anime.id == anime_id).first()


def get_anime_by_id(db: Session, anime_id: int):
    """Alias for get_anime"""
    return get_anime(db, anime_id)


def create_anime(db: Session, anime: AnimeCreate):
    """Create a new anime"""
    db_anime = Anime(**anime.model_dump())
    db.add(db_anime)
    db.commit()
    db.refresh(db_anime)
    return db_anime


def update_anime(db: Session, anime_id: int, anime_update: AnimeUpdate):
    """Update an anime"""
    db_anime = get_anime(db, anime_id)
    if db_anime:
        update_data = anime_update.model_dump(exclude_unset=True)
        for key, value in update_data.items():
            setattr(db_anime, key, value)
        db.commit()
        db.refresh(db_anime)
    return db_anime


def delete_anime(db: Session, anime_id: int):
    """Delete an anime"""
    db_anime = get_anime(db, anime_id)
    if db_anime:
        db.delete(db_anime)
        db.commit()
    return db_anime

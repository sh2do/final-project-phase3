from sqlalchemy.orm import Session
from typing import List, Optional

from backend.app.db import models
from backend.app.schemas import anime as schemas

def get_anime(db: Session, anime_id: int):
    """Retrieve an anime by its ID."""
    return db.query(models.Anime).filter(models.Anime.id == anime_id).first()

def get_anime_by_mal_id(db: Session, mal_id: int):
    """Retrieve an anime by its MyAnimeList ID."""
    return db.query(models.Anime).filter(models.Anime.mal_id == mal_id).first()

def get_animes(db: Session, skip: int = 0, limit: int = 100):
    """Retrieve multiple anime items from the collection."""
    return db.query(models.Anime).offset(skip).limit(limit).all()

def create_anime(db: Session, anime: schemas.AnimeCreate):
    """
    Create a new anime item in the collection, including its genres and user list status.
    """
    db_genres = []
    for genre_name in anime.genres:
        genre = db.query(models.Genre).filter(models.Genre.name == genre_name).first()
        if not genre:
            genre = models.Genre(name=genre_name)
            db.add(genre)
            db.commit()
            db.refresh(genre)
        db_genres.append(genre)

    db_user_list = None
    if anime.user_list_status:
        db_user_list = db.query(models.UserList).filter(models.UserList.status == anime.user_list_status).first()
        if not db_user_list:
            db_user_list = models.UserList(status=anime.user_list_status)
            db.add(db_user_list)
            db.commit()
            db.refresh(db_user_list)

    db_anime = models.Anime(
        mal_id=anime.mal_id,
        title=anime.title,
        image_url=anime.image_url,
        synopsis=anime.synopsis,
        episodes=anime.episodes,
        score=anime.score,
        genres=db_genres,
        user_list=db_user_list
    )
    db.add(db_anime)
    db.commit()
    db.refresh(db_anime)
    return db_anime

def update_anime(db: Session, anime_id: int, anime_update: schemas.AnimeUpdate):
    """
    Update an existing anime item in the collection.
    """
    db_anime = get_anime(db, anime_id)
    if not db_anime:
        return None

    # Update basic fields
    update_data = anime_update.dict(exclude_unset=True, exclude={'genres', 'user_list_status'})
    for key, value in update_data.items():
        setattr(db_anime, key, value)

    # Update genres
    if anime_update.genres is not None:
        db_anime.genres.clear() # Clear existing genres
        for genre_name in anime_update.genres:
            genre = db.query(models.Genre).filter(models.Genre.name == genre_name).first()
            if not genre:
                genre = models.Genre(name=genre_name)
                db.add(genre)
                db.commit()
                db.refresh(genre)
            db_anime.genres.append(genre)

    # Update user_list_status
    if anime_update.user_list_status is not None:
        db_user_list = db.query(models.UserList).filter(models.UserList.status == anime_update.user_list_status).first()
        if not db_user_list:
            db_user_list = models.UserList(status=anime_update.user_list_status)
            db.add(db_user_list)
            db.commit()
            db.refresh(db_user_list)
        db_anime.user_list = db_user_list
    elif anime_update.user_list_status == "": # If status is explicitly set to empty, remove from list
        db_anime.user_list = None


    db.add(db_anime)
    db.commit()
    db.refresh(db_anime)
    return db_anime

def delete_anime(db: Session, anime_id: int):
    """Delete an anime item from the collection."""
    db_anime = get_anime(db, anime_id)
    if db_anime:
        db.delete(db_anime)
        db.commit()
    return db_anime

def get_genre_by_name(db: Session, name: str) -> Optional[models.Genre]:
    """Retrieve a genre by its name."""
    return db.query(models.Genre).filter(models.Genre.name == name).first()

def get_or_create_genre(db: Session, name: str) -> models.Genre:
    """Get a genre by name or create it if it doesn't exist."""
    genre = get_genre_by_name(db, name)
    if not genre:
        genre = models.Genre(name=name)
        db.add(genre)
        db.commit()
        db.refresh(genre)
    return genre

def get_user_list_by_status(db: Session, status: str) -> Optional[models.UserList]:
    """Retrieve a user list status by its name."""
    return db.query(models.UserList).filter(models.UserList.status == status).first()

def get_or_create_user_list(db: Session, status: str) -> models.UserList:
    """Get a user list status by name or create it if it doesn't exist."""
    user_list = get_user_list_by_status(db, status)
    if not user_list:
        user_list = models.UserList(status=status)
        db.add(user_list)
        db.commit()
        db.refresh(user_list)
    return user_list

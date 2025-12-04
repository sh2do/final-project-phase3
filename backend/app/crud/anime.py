from typing import List, Optional
from sqlmodel import Session, select
from app.models.anime import Anime, AnimeCreate, AnimeUpdate


def get_anime_by_id(session: Session, anime_id: int) -> Optional[Anime]:
    return session.get(Anime, anime_id)


def get_anime_by_external_id(session: Session, external_id: int) -> Optional[Anime]:
    return session.exec(select(Anime).where(Anime.external_id == external_id)).first()


def get_anime_list(session: Session, skip: int = 0, limit: int = 100) -> List[Anime]:
    return session.exec(select(Anime).offset(skip).limit(limit)).all()


def create_anime(session: Session, anime_create: AnimeCreate) -> Anime:
    db_anime = Anime.model_validate(anime_create) # Use model_validate for SQLModel Base
    session.add(db_anime)
    session.commit()
    session.refresh(db_anime)
    return db_anime


def update_anime(session: Session, anime_id: int, anime_update: AnimeUpdate) -> Optional[Anime]:
    db_anime = session.get(Anime, anime_id)
    if not db_anime:
        return None
    
    update_data = anime_update.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_anime, key, value)
    
    session.add(db_anime)
    session.commit()
    session.refresh(db_anime)
    return db_anime


def delete_anime(session: Session, anime_id: int) -> Optional[Anime]:
    anime = session.get(Anime, anime_id)
    if anime:
        session.delete(anime)
        session.commit()
    return anime
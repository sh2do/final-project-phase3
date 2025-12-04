from typing import List, Optional
from sqlmodel import Session, select
from app.models.collection import CollectionItem, CollectionItemCreate, CollectionItemUpdate


def get_collection_item_by_id(session: Session, item_id: int) -> Optional[CollectionItem]:
    return session.get(CollectionItem, item_id)


def get_user_collection(session: Session, user_id: int, skip: int = 0, limit: int = 100) -> List[CollectionItem]:
    return session.exec(
        select(CollectionItem).where(CollectionItem.user_id == user_id).offset(skip).limit(limit)
    ).all()


def get_user_anime_collection_item(session: Session, user_id: int, anime_id: int) -> Optional[CollectionItem]:
    return session.exec(
        select(CollectionItem).where(
            CollectionItem.user_id == user_id,
            CollectionItem.anime_id == anime_id
        )
    ).first()


def create_collection_item(session: Session, item_create: CollectionItemCreate) -> CollectionItem:
    db_item = CollectionItem.model_validate(item_create)
    session.add(db_item)
    session.commit()
    session.refresh(db_item)
    return db_item


def update_collection_item(session: Session, item_id: int, item_update: CollectionItemUpdate) -> Optional[CollectionItem]:
    db_item = session.get(CollectionItem, item_id)
    if not db_item:
        return None
    
    update_data = item_update.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_item, key, value)
    
    session.add(db_item)
    session.commit()
    session.refresh(db_item)
    return db_item


def delete_collection_item(session: Session, item_id: int) -> Optional[CollectionItem]:
    item = session.get(CollectionItem, item_id)
    if item:
        session.delete(item)
        session.commit()
    return item

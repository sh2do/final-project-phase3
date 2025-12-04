from sqlalchemy.orm import Session
from app.models.collection_item import CollectionItem
from app.schemas.collection_item import CollectionItemCreate, CollectionItemUpdate


def get_user_collection(db: Session, user_id: int, skip: int = 0, limit: int = 100):
    """Get all collection items for a user"""
    return db.query(CollectionItem).filter(CollectionItem.user_id == user_id).offset(skip).limit(limit).all()


def get_collection_item(db: Session, collection_item_id: int):
    """Get collection item by ID"""
    return db.query(CollectionItem).filter(CollectionItem.id == collection_item_id).first()


def get_collection_item_by_id(db: Session, collection_item_id: int):
    """Alias for get_collection_item"""
    return get_collection_item(db, collection_item_id)


def get_user_anime(db: Session, user_id: int, anime_id: int):
    """Get a specific anime in user's collection"""
    return db.query(CollectionItem).filter(
        CollectionItem.user_id == user_id,
        CollectionItem.anime_id == anime_id
    ).first()


def create_collection_item(db: Session, item: CollectionItemCreate):
    """Add anime to user's collection"""
    db_item = CollectionItem(**item.model_dump())
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item


def update_collection_item(db: Session, collection_item_id: int, item_update: CollectionItemUpdate):
    """Update a collection item"""
    db_item = get_collection_item(db, collection_item_id)
    if db_item:
        update_data = item_update.model_dump(exclude_unset=True)
        for key, value in update_data.items():
            setattr(db_item, key, value)
        db.commit()
        db.refresh(db_item)
    return db_item


def delete_collection_item(db: Session, collection_item_id: int):
    """Remove anime from user's collection"""
    db_item = get_collection_item(db, collection_item_id)
    if db_item:
        db.delete(db_item)
        db.commit()
    return db_item

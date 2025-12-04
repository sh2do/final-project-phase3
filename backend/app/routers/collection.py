from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.schemas.collection_item import CollectionItemCreate, CollectionItemUpdate, CollectionItemResponse
from app.crud import collection_item as crud_collection

router = APIRouter(prefix="/collection", tags=["collection"])


@router.get("/{user_id}", response_model=list[CollectionItemResponse])
def get_user_collection(user_id: int, skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    """Get all anime in user's collection"""
    items = crud_collection.get_user_collection(db, user_id, skip=skip, limit=limit)
    return items


@router.get("/item/{item_id}", response_model=CollectionItemResponse)
def get_collection_item_detail(item_id: int, db: Session = Depends(get_db)):
    """Get specific collection item"""
    item = crud_collection.get_collection_item(db, item_id)
    if not item:
        raise HTTPException(status_code=404, detail="Collection item not found")
    return item


@router.post("", response_model=CollectionItemResponse)
def add_anime_to_collection(item: CollectionItemCreate, db: Session = Depends(get_db)):
    """Add anime to user's collection"""
    # Check if already in collection
    existing = crud_collection.get_user_anime(db, item.user_id, item.anime_id)
    if existing:
        raise HTTPException(status_code=400, detail="Anime already in your collection")
    
    return crud_collection.create_collection_item(db, item)


@router.patch("/{item_id}", response_model=CollectionItemResponse)
def update_collection_item(item_id: int, item_update: CollectionItemUpdate, db: Session = Depends(get_db)):
    """Update collection item (episodes watched, rating, notes, favorite)"""
    item = crud_collection.update_collection_item(db, item_id, item_update)
    if not item:
        raise HTTPException(status_code=404, detail="Collection item not found")
    return item


@router.delete("/{item_id}")
def remove_anime_from_collection(item_id: int, db: Session = Depends(get_db)):
    """Remove anime from user's collection"""
    item = crud_collection.delete_collection_item(db, item_id)
    if not item:
        raise HTTPException(status_code=404, detail="Collection item not found")
    return {"message": "Anime removed from collection", "id": item_id}

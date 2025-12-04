from fastapi import APIRouter, Depends, HTTPException, Query
from typing import List
from sqlmodel import Session, select
from app.database import get_session
from app.models.collection import CollectionItem

router = APIRouter(prefix="/anime/collection", tags=["collection"])


@router.get("/", response_model=List[dict])
def get_collection(user_id: int = Query(1), db: Session = Depends(get_session)):
    """Get all collection items for a user"""
    items = db.exec(select(CollectionItem).where(CollectionItem.user_id == user_id)).all()
    return [item.dict() for item in items]


@router.post("/add")
def add_to_collection(anime_id: int = Query(...), user_id: int = Query(1), db: Session = Depends(get_session)):
    """Add an anime to user's collection"""
    try:
        item = CollectionItem(user_id=user_id, anime_id=anime_id)
        db.add(item)
        db.commit()
        db.refresh(item)
        return {"status": "ok", "id": item.id, "data": item.dict()}
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))


@router.delete("/{item_id}")
def remove_item(item_id: int, db: Session = Depends(get_session)):
    """Remove item from collection"""
    item = db.get(CollectionItem, item_id)
    if not item:
        raise HTTPException(status_code=404, detail="Collection item not found")
    db.delete(item)
    db.commit()
    return {"status": "deleted", "id": item_id}


@router.put("/{item_id}")
def update_item(item_id: int, data: dict, db: Session = Depends(get_session)):
    """Update a collection item"""
    item = db.get(CollectionItem, item_id)
    if not item:
        raise HTTPException(status_code=404, detail="Collection item not found")
    
    for key, value in data.items():
        if hasattr(item, key):
            setattr(item, key, value)
    
    db.add(item)
    db.commit()
    db.refresh(item)
    return item.dict()

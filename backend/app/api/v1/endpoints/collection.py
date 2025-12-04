from typing import Any, List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session
from app.db.session import get_session
from app.api.deps import get_current_active_user
from app.schemas.collection import CollectionItemCreate, CollectionItemUpdate, CollectionItemPublic
from app.crud.collection import get_collection_item_by_id, get_user_collection, get_user_anime_collection_item, create_collection_item, update_collection_item, delete_collection_item
from app.models.user import User as DBUser # Avoid name clash with UserPublic

router = APIRouter()


@router.get("/{user_id}", response_model=List[CollectionItemPublic])
def read_user_collection(
    user_id: int,
    session: Session = Depends(get_session),
    skip: int = 0,
    limit: int = 100,
    current_user: DBUser = Depends(get_current_active_user), # Ensures user is authenticated
) -> Any:
    """
    Retrieve collection items for a specific user.
    """
    if user_id != current_user.id and not current_user.is_superuser:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not enough permissions to view this user's collection.",
        )
    
    items = get_user_collection(session, user_id, skip=skip, limit=limit)
    return items


@router.get("/item/{item_id}", response_model=CollectionItemPublic)
def read_collection_item_by_id(
    *,
    session: Session = Depends(get_session),
    item_id: int,
    current_user: DBUser = Depends(get_current_active_user), # Ensures user is authenticated
) -> Any:
    """
    Get a specific collection item by ID.
    """
    item = get_collection_item_by_id(session, item_id)
    if not item:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Collection item not found.",
        )
    if item.user_id != current_user.id and not current_user.is_superuser:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not enough permissions to view this collection item.",
        )
    return item


@router.post("/", response_model=CollectionItemPublic)
def create_new_collection_item(
    *,
    session: Session = Depends(get_session),
    item_in: CollectionItemCreate,
    current_user: DBUser = Depends(get_current_active_user), # Ensures user is authenticated
) -> Any:
    """
    Add a new anime to the user's collection.
    """
    if item_in.user_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Cannot create collection item for another user.",
        )

    existing_item = get_user_anime_collection_item(session, item_in.user_id, item_in.anime_id)
    if existing_item:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Anime already in your collection.",
        )
    
    item = create_collection_item(session, item_in)
    return item


@router.patch("/item/{item_id}", response_model=CollectionItemPublic)
def update_existing_collection_item(
    *,
    session: Session = Depends(get_session),
    item_id: int,
    item_in: CollectionItemUpdate,
    current_user: DBUser = Depends(get_current_active_user), # Ensures user is authenticated
) -> Any:
    """
    Update an existing collection item.
    """
    item = get_collection_item_by_id(session, item_id)
    if not item:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Collection item not found.",
        )
    if item.user_id != current_user.id and not current_user.is_superuser:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not enough permissions to update this collection item.",
        )
    
    item = update_collection_item(session, item_id, item_in)
    return item


@router.delete("/item/{item_id}", response_model=dict)
def delete_existing_collection_item(
    *,
    session: Session = Depends(get_session),
    item_id: int,
    current_user: DBUser = Depends(get_current_active_user), # Ensures user is authenticated
) -> Any:
    """
    Delete a collection item.
    """
    item = get_collection_item_by_id(session, item_id)
    if not item:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Collection item not found.",
        )
    if item.user_id != current_user.id and not current_user.is_superuser:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not enough permissions to delete this collection item.",
        )
    
    delete_collection_item(session, item_id)
    return {"message": "Collection item deleted successfully", "id": item_id}

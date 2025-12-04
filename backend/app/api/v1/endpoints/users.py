from typing import Any, List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session
from app.db.session import get_session
from app.api.deps import get_current_active_user, get_current_active_superuser
from app.schemas.user import UserPublic, UserUpdate
from app.crud.user import get_user_by_id, get_users, update_user, delete_user


router = APIRouter()


@router.get("/me", response_model=UserPublic)
def read_users_me(
    current_user: UserPublic = Depends(get_current_active_user),
) -> Any:
    """
    Get current active user.
    """
    return current_user


@router.get("/", response_model=List[UserPublic])
def read_users(
    session: Session = Depends(get_session),
    skip: int = 0,
    limit: int = 100,
    current_user: UserPublic = Depends(get_current_active_superuser), # Only superusers can list all users
) -> Any:
    """
    Retrieve users.
    """
    users = get_users(session, skip=skip, limit=limit)
    return users


@router.patch("/{user_id}", response_model=UserPublic)
def update_user_by_id(
    *,
    session: Session = Depends(get_session),
    user_id: int,
    user_in: UserUpdate,
    current_user: UserPublic = Depends(get_current_active_user),
) -> Any:
    """
    Update a user by ID. Only a superuser can update any user.
    A regular user can only update their own profile.
    """
    user = get_user_by_id(session, user_id)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="The user with this ID does not exist in the system.",
        )
    if not current_user.is_superuser and user.id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not enough permissions to update this user.",
        )
    user = update_user(session, user_id, user_in)
    return user


@router.delete("/{user_id}", response_model=dict)
def delete_user_by_id(
    *,
    session: Session = Depends(get_session),
    user_id: int,
    current_user: UserPublic = Depends(get_current_active_superuser), # Only superusers can delete users
) -> Any:
    """
    Delete a user by ID.
    """
    user = get_user_by_id(session, user_id)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="The user with this ID does not exist in the system.",
        )
    if user.id == current_user.id:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot delete your own user account.",
        )
    delete_user(session, user_id)
    return {"message": "User deleted successfully", "id": user_id}

from typing import Generator, Optional
from fastapi import Depends, HTTPException, status
from jose import jwt, JWTError
from sqlmodel import Session
from app.db.session import get_session
from app.core.config import settings
from app.core.security import decode_access_token
from app.models.user import User
from app.schemas.user import TokenPayload


def get_db() -> Generator[Session, None, None]:
    """Provides a database session for a request."""
    yield from get_session()


def get_current_user(
    session: Session = Depends(get_db), token: str = Depends(oauth2_scheme) from fastapi.security import OAuth2PasswordBearer
from app.api.v1.endpoints.auth import oauth2_scheme
) -> User:
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = decode_access_token(token)
        if not payload:
            raise credentials_exception
        token_data = TokenPayload(**payload)
    except JWTError:
        raise credentials_exception
    
    user = session.get(User, token_data.sub)
    if not user:
        raise credentials_exception
    return user


def get_current_active_user(
    current_user: User = Depends(get_current_user),
) -> User:
    if not current_user.is_active:
        raise HTTPException(status_code=400, detail="Inactive user")
    return current_user


def get_current_active_superuser(
    current_user: User = Depends(get_current_active_user),
) -> User:
    if not current_user.is_superuser:
        raise HTTPException(
            status_code=400, detail="The user doesn't have enough privileges"
        )
    return current_user

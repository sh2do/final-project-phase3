from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session, select
from passlib.context import CryptContext
from datetime import timedelta
from app.database import get_session
from app.models.user import User, UserCreate
from app.schemas.user import Token
from app.auth.jwt import create_access_token
from app.core.config import settings

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

router = APIRouter(prefix="/auth", tags=["auth"])


def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)


def get_password_hash(password):
    return pwd_context.hash(password)


@router.post("/register", response_model=Token)
def register(user_in: UserCreate, db: Session = Depends(get_session)):
    existing = db.exec(select(User).where(User.email == user_in.email)).first()
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")
    hashed = get_password_hash(user_in.password)
    user = User(email=user_in.email, username=user_in.username, hashed_password=hashed)
    db.add(user)
    db.commit()
    db.refresh(user)
    access_token = create_access_token(subject=str(user.id), expires_delta=timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES))
    return {"access_token": access_token, "token_type": "bearer"}


@router.post("/login", response_model=Token)
def login(data: dict, db: Session = Depends(get_session)):
    # expects {"username": ..., "password": ...} or {"email":..., "password":...}
    identifier = data.get("email") or data.get("username")
    user = None
    if "@" in identifier:
        user = db.exec(select(User).where(User.email == identifier)).first()
    else:
        user = db.exec(select(User).where(User.username == identifier)).first()
    if not user or not verify_password(data.get("password"), user.hashed_password):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")
    access_token = create_access_token(subject=str(user.id), expires_delta=timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES))
    return {"access_token": access_token, "token_type": "bearer"}

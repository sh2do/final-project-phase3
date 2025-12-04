from typing import List, Optional
from datetime import datetime
from sqlmodel import Field, Relationship, SQLModel

class UserBase(SQLModel):
    email: str = Field(unique=True, index=True)
    username: Optional[str] = Field(default=None, unique=True, index=True)

class User(UserBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    hashed_password: str = Field(index=True)
    is_active: bool = Field(default=True)
    is_superuser: bool = Field(default=False)
    created_at: datetime = Field(default_factory=datetime.utcnow, nullable=False)
    updated_at: Optional[datetime] = Field(default_factory=datetime.utcnow, sa_column_kwargs={"onupdate": datetime.utcnow})

    collection_items: List["CollectionItem"] = Relationship(back_populates="user")

class UserCreate(UserBase):
    password: str

class UserRegister(UserBase): # For registration, same as create but clearer
    password: str

class UserLogin(SQLModel): # For login, simple email/username and password
    email: Optional[str] = None
    username: Optional[str] = None
    password: str

class UserUpdate(SQLModel):
    email: Optional[str] = None
    username: Optional[str] = None
    password: Optional[str] = None
    is_active: Optional[bool] = None
    is_superuser: Optional[bool] = None

class UserPublic(SQLModel): # Represents user data safe to expose publicly
    id: int
    email: str
    username: Optional[str] = None
    is_active: bool
    is_superuser: bool
    created_at: datetime
    updated_at: Optional[datetime]
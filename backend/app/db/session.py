from typing import Generator
from sqlmodel import create_engine, Session
from app.core.config import settings


# Ensure the DATABASE_URL is valid for create_engine
# SQLite example: "sqlite:///./sql_app.db"
# PostgreSQL example: "postgresql://user:password@host:port/dbname"
engine = create_engine(str(settings.DATABASE_URL), echo=False)


def create_db_and_tables() -> None:
    """
    Creates all database tables defined by SQLModel.
    """
    # Import all models to ensure metadata is populated
    # from app.models.user import User # Example if needed
    # from app.models.anime import Anime
    # from app.models.collection import Collection
    
    SQLModel.metadata.create_all(engine)


def get_session() -> Generator[Session, None, None]:
    """
    Dependency to get a database session.
    Yields a session which is then closed automatically.
    """
    with Session(engine) as session:
        yield session

from sqlalchemy import Column, Integer, String, Float, ForeignKey, Table
from sqlalchemy.orm import relationship
from backend.app.db.database import Base

# Association table for many-to-many relationship between Anime and Genre
anime_genre_association = Table(
    'anime_genre_association', Base.metadata,
    Column('anime_id', Integer, ForeignKey('animes.id')),
    Column('genre_id', Integer, ForeignKey('genres.id'))
)

class Anime(Base):
    """
    SQLAlchemy model for an Anime item in the local collection.
    """
    __tablename__ = "animes"

    id = Column(Integer, primary_key=True, index=True)
    mal_id = Column(Integer, unique=True, index=True) # MyAnimeList ID for external API reference
    title = Column(String, index=True)
    image_url = Column(String, nullable=True)
    synopsis = Column(String, nullable=True)
    episodes = Column(Integer, nullable=True)
    score = Column(Float, nullable=True)

    # Relationships
    genres = relationship("Genre", secondary=anime_genre_association, back_populates="animes")
    user_list_id = Column(Integer, ForeignKey("user_lists.id"), nullable=True)
    user_list = relationship("UserList", back_populates="animes")

    def __repr__(self):
        return f"<Anime(id={self.id}, title='{self.title}')>"

class Genre(Base):
    """
    SQLAlchemy model for an Anime Genre.
    """
    __tablename__ = "genres"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True)

    # Relationships
    animes = relationship("Anime", secondary=anime_genre_association, back_populates="genres")

    def __repr__(self):
        return f"<Genre(id={self.id}, name='{self.name}')>"

class UserList(Base):
    """
    SQLAlchemy model for a User's List status (e.g., watching, completed, plan_to_watch).
    """
    __tablename__ = "user_lists"

    id = Column(Integer, primary_key=True, index=True)
    status = Column(String, unique=True, index=True) # e.g., "watching", "completed", "plan_to_watch"

    # Relationships
    animes = relationship("Anime", back_populates="user_list")

    def __repr__(self):
        return f"<UserList(id={self.id}, status='{self.status}')>"

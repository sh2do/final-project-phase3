from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey, Float
from sqlalchemy.orm import relationship
from datetime import datetime
from app.database import Base


class CollectionItem(Base):
    __tablename__ = "collection_items"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False, index=True)
    anime_id = Column(Integer, ForeignKey("anime.id"), nullable=False, index=True)
    episodes_watched = Column(Integer, default=0, nullable=False)
    rating = Column(Float, nullable=True)  # 0.0 - 10.0
    notes = Column(Text, nullable=True)
    is_favorite = Column(Integer, default=0)  # Boolean: 0 or 1
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    user = relationship("User", back_populates="collection_items")
    anime = relationship("Anime", back_populates="collection_items")

    def __repr__(self):
        return f"<CollectionItem(id={self.id}, user_id={self.user_id}, anime_id={self.anime_id})>"

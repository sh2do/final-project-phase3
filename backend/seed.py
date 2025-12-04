"""
Seed script to populate the database with sample anime data
Run with: python seed.py
"""

import sys
import os

# Add parent directory to path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from app.database import SessionLocal, engine, Base
from app.models.anime import Anime
from app.models.user import User
from app.models.collection_item import CollectionItem

# Create all tables
Base.metadata.create_all(bind=engine)

db = SessionLocal()

# Sample anime data
sample_anime = [
    {
        "title": "Attack on Titan",
        "description": "Humanity fights against giant humanoid creatures called Titans to reclaim the world",
        "image_url": "https://via.placeholder.com/300x400?text=Attack+on+Titan",
        "episodes": 75,
        "release_year": 2013,
    },
    {
        "title": "Death Note",
        "description": "A high schooler finds a supernatural notebook that kills anyone whose name is written in it",
        "image_url": "https://via.placeholder.com/300x400?text=Death+Note",
        "episodes": 37,
        "release_year": 2006,
    },
    {
        "title": "Demon Slayer",
        "description": "A young man joins a demon slayer corps to save his sister from becoming a demon",
        "image_url": "https://via.placeholder.com/300x400?text=Demon+Slayer",
        "episodes": 26,
        "release_year": 2019,
    },
    {
        "title": "My Hero Academia",
        "description": "In a superhero-filled world, a powerless teen aims to become the greatest hero",
        "image_url": "https://via.placeholder.com/300x400?text=My+Hero+Academia",
        "episodes": 138,
        "release_year": 2016,
    },
    {
        "title": "Jujutsu Kaisen",
        "description": "A high schooler joins a secret society of Jujutsu sorcerers fighting cursed spirits",
        "image_url": "https://via.placeholder.com/300x400?text=Jujutsu+Kaisen",
        "episodes": 47,
        "release_year": 2020,
    },
    {
        "title": "One Piece",
        "description": "A young pirate searches for the legendary treasure and the title of Pirate King",
        "image_url": "https://via.placeholder.com/300x400?text=One+Piece",
        "episodes": 1070,
        "release_year": 1999,
    },
    {
        "title": "Naruto",
        "description": "A young ninja with a sealed monster inside him aims to become the village leader",
        "image_url": "https://via.placeholder.com/300x400?text=Naruto",
        "episodes": 220,
        "release_year": 2002,
    },
    {
        "title": "Tokyo Ghoul",
        "description": "A college student becomes a half-ghoul and navigates the world of ghouls and humans",
        "image_url": "https://via.placeholder.com/300x400?text=Tokyo+Ghoul",
        "episodes": 48,
        "release_year": 2014,
    },
    {
        "title": "Steins;Gate",
        "description": "Friends discover how to send messages to the past, leading to unintended consequences",
        "image_url": "https://via.placeholder.com/300x400?text=Steins%3BGate",
        "episodes": 24,
        "release_year": 2011,
    },
    {
        "title": "Code Geass",
        "description": "A exiled prince gains the power to command anyone and leads a rebellion",
        "image_url": "https://via.placeholder.com/300x400?text=Code+Geass",
        "episodes": 50,
        "release_year": 2006,
    },
]

# Sample users
sample_users = [
    {"username": "anime_fan_1", "email": "fan1@example.com"},
    {"username": "manga_reader", "email": "reader@example.com"},
    {"username": "otaku_master", "email": "otaku@example.com"},
]

# Add anime
print("Adding anime...")
anime_list = []
for anime_data in sample_anime:
    anime = Anime(**anime_data)
    db.add(anime)
    anime_list.append(anime)

db.commit()
print(f"✅ Added {len(anime_list)} anime")

# Add users
print("Adding users...")
user_list = []
for user_data in sample_users:
    user = User(**user_data)
    db.add(user)
    user_list.append(user)

db.commit()
print(f"✅ Added {len(user_list)} users")

# Add sample collection items
print("Adding collection items...")
if anime_list and user_list:
    # User 1 adds some anime
    collection_items = [
        CollectionItem(
            user_id=user_list[0].id,
            anime_id=anime_list[0].id,
            episodes_watched=25,
            rating=9.0,
            notes="Amazing anime! Can't wait for the next season",
            is_favorite=1,
        ),
        CollectionItem(
            user_id=user_list[0].id,
            anime_id=anime_list[1].id,
            episodes_watched=37,
            rating=8.5,
            notes="Great psychological thriller",
            is_favorite=1,
        ),
        CollectionItem(
            user_id=user_list[0].id,
            anime_id=anime_list[2].id,
            episodes_watched=26,
            rating=8.8,
            notes="Stunning animation and great storyline",
            is_favorite=0,
        ),
        # User 2 adds some anime
        CollectionItem(
            user_id=user_list[1].id,
            anime_id=anime_list[5].id,
            episodes_watched=100,
            rating=9.2,
            notes="Still watching, one of the best anime ever",
            is_favorite=1,
        ),
        CollectionItem(
            user_id=user_list[1].id,
            anime_id=anime_list[6].id,
            episodes_watched=220,
            rating=9.0,
            notes="Completed the series, highly recommend",
            is_favorite=1,
        ),
    ]

    for item in collection_items:
        db.add(item)

    db.commit()
    print(f"✅ Added {len(collection_items)} collection items")

print("\n✨ Database seeded successfully!")
print(f"  - {len(anime_list)} anime")
print(f"  - {len(user_list)} users")
print(f"  - Sample collection items with ratings and notes")

print("  - Sample collection items with ratings and notes")

db.close()

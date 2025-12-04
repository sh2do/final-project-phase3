from fastapi import APIRouter, HTTPException, status, Depends
from typing import List
from app.services import mock_data
from app.schemas.anime import AnimeResponse
from app.schemas.collection_item import CollectionItemCreate
from app.crud import collection_item as crud_collection
from app.database import SessionLocal

router = APIRouter(prefix="/fake", tags=["fake"])


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.get("/anime/search", response_model=List[AnimeResponse])
def fake_search(q: str = "", limit: int = 10):
    """Return matching anime from the seeded mock dataset."""
    q_lower = q.lower()
    results = []
    for a in mock_data.SAMPLE_ANIME:
        title = (a.get("title", {}).get("english") or a.get("title", {}).get("romaji") or "").lower()
        if not q or q_lower in title:
            results.append(
                {
                    "id": a["id"],
                    "title": a["title"],
                    "description": a.get("description"),
                    "episodes": a.get("episodes"),
                    "seasonYear": a.get("seasonYear"),
                    "coverImage": a.get("coverImage", {}).get("large"),
                }
            )
        if len(results) >= limit:
            break
    return results


@router.get("/anime/trending", response_model=List[AnimeResponse])
def fake_trending(limit: int = 10):
    """Return the seeded dataset as trending (deterministic)."""
    out = []
    for a in mock_data.SAMPLE_ANIME[:limit]:
        out.append(
            {
                "id": a["id"],
                "title": a["title"],
                "description": a.get("description"),
                "episodes": a.get("episodes"),
                "seasonYear": a.get("seasonYear"),
                "coverImage": a.get("coverImage", {}).get("large"),
            }
        )
    return out


@router.get("/anime/{anime_id}", response_model=AnimeResponse)
def fake_get(anime_id: int):
    for a in mock_data.SAMPLE_ANIME:
        if a["id"] == anime_id:
            return {
                "id": a["id"],
                "title": a["title"],
                "description": a.get("description"),
                "episodes": a.get("episodes"),
                "seasonYear": a.get("seasonYear"),
                "coverImage": a.get("coverImage", {}).get("large"),
            }
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Anime not found in mock dataset")


@router.post("/anime/save/{anime_id}")
def fake_save(anime_id: int, db=Depends(get_db)):
    """Create a collection item for the seeded anime with a default user (user_id=1).
    This keeps the fake server simple and deterministic.
    """
    # find anime
    anime = None
    for a in mock_data.SAMPLE_ANIME:
        if a["id"] == anime_id:
            anime = a
            break
    if not anime:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Anime not found")

    # Build a minimal collection item create payload
    item = CollectionItemCreate(
        user_id=1,
        anime_id=anime["id"],
        episodes_watched=0,
        rating=None,
        notes=f"Imported from fake API: {anime.get('title', {}).get('english')}",
        is_favorite=0,
    )

    created = crud_collection.create_collection_item(db, item)
    return {"status": "saved", "item_id": created.id}

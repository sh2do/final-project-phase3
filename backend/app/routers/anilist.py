"""
AniList API Router
Endpoints for searching and fetching anime from AniList
"""

from fastapi import APIRouter, HTTPException, Query
from typing import Optional
import logging
from ..services.anilist import (
    search_anime,
    get_anime_by_id,
    get_trending_anime,
    parse_anilist_anime,
)
from ..services.kitsu import search_anime as kitsu_search, get_anime_by_id as kitsu_get, get_trending_anime as kitsu_trending, parse_kitsu_anime
from ..services.animechan import get_quotes_for_anime
from ..crud.anime import create_anime
from ..database import SessionLocal

router = APIRouter(prefix="/api/anilist", tags=["anilist"])


@router.get("/search")
async def search_anime_endpoint(
    q: str = Query(..., min_length=1, description="Anime title to search for"),
    page: int = Query(1, ge=1, description="Page number for pagination"),
    per_page: int = Query(10, ge=1, le=50, description="Results per page"),
):
    """
    Search for anime on AniList
    
    Returns paginated search results with anime information
    """
    last_error = None
    # Try AniList first
    try:
        results = await search_anime(q, page, per_page)
        return {"success": True, "data": results, "query": q, "source": "anilist"}
    except Exception as e:
        last_error = e
        logging.warning(f"AniList search failed for '{q}': {e}. Falling back to Kitsu.")

    # Try Kitsu as fallback
    try:
        results = await kitsu_search(q, page, per_page)
        # try to enrich with quotes (non-critical)
        try:
            quotes = await get_quotes_for_anime(q)
            results.setdefault("media", [])
            # attach quotes to first result if available
            if quotes and results["media"]:
                results["media"][0]["quotes"] = quotes
        except Exception:
            pass
        return {"success": True, "data": results, "query": q, "source": "kitsu"}
    except Exception as e:
        logging.error(f"Kitsu search also failed for '{q}': {e}")
        raise HTTPException(status_code=500, detail=f"Search failed: {last_error} | {e}")


@router.get("/trending")
async def get_trending_endpoint(
    page: int = Query(1, ge=1, description="Page number for pagination"),
    per_page: int = Query(10, ge=1, le=50, description="Results per page"),
):
    """
    Get trending anime from AniList
    
    Returns paginated list of currently trending anime
    """
    last_error = None
    try:
        results = await get_trending_anime(page, per_page)
        return {"success": True, "data": results, "source": "anilist"}
    except Exception as e:
        last_error = e
        logging.warning(f"AniList trending failed: {e}. Falling back to Kitsu.")

    try:
        results = await kitsu_trending(page, per_page)
        return {"success": True, "data": results, "source": "kitsu"}
    except Exception as e:
        logging.error(f"Kitsu trending failed: {e}")
        raise HTTPException(status_code=500, detail=f"Trending fetch failed: {last_error} | {e}")


@router.get("/{anime_id}")
async def get_anime_endpoint(anime_id: int):
    """
    Get detailed information about a specific anime from AniList
    
    Returns complete anime details including description, episodes, studios, etc.
    """
    last_error = None
    try:
        anime_data = await get_anime_by_id(anime_id)
        if anime_data:
            return {"success": True, "data": anime_data, "source": "anilist"}
    except Exception as e:
        last_error = e
        logging.warning(f"AniList get by id {anime_id} failed: {e}. Trying Kitsu.")

    try:
        anime_data = await kitsu_get(anime_id)
        if anime_data:
            return {"success": True, "data": anime_data, "source": "kitsu"}
        raise HTTPException(status_code=404, detail="Anime not found")
    except HTTPException:
        raise
    except Exception as e:
        logging.error(f"Both AniList and Kitsu failed for id {anime_id}: {e}")
        raise HTTPException(status_code=500, detail=f"Fetch failed: {last_error} | {e}")


@router.post("/save/{anime_id}")
async def save_anime_to_collection(anime_id: int):
    """
    Fetch anime from AniList and save it to the local database
    
    This allows the anime to be added to user collections
    """
    last_error = None
    # Try AniList first
    try:
        anime_data = await get_anime_by_id(anime_id)
        if anime_data:
            anime_create = parse_anilist_anime(anime_data)
    except Exception as e:
        last_error = e
        logging.warning(f"AniList fetch for save failed for id {anime_id}: {e}. Trying Kitsu.")
        anime_data = None

    # If AniList failed, try Kitsu
    if not anime_data:
        try:
            anime_data = await kitsu_get(anime_id)
            if anime_data:
                anime_create = parse_kitsu_anime(anime_data)
        except Exception as e:
            logging.error(f"Kitsu fetch for save failed for id {anime_id}: {e}")
            raise HTTPException(status_code=500, detail=f"Save failed: {last_error} | {e}")

    if not anime_data:
        raise HTTPException(status_code=404, detail="Anime not found on AniList or Kitsu")

    # Save to database
    db = SessionLocal()
    try:
        db_anime = create_anime(db, anime_create)
        return {
            "success": True,
            "message": "Anime saved successfully",
            "data": {
                "id": db_anime.id,
                "title": db_anime.title,
                "anilist_id": anime_id,
            }
        }
    finally:
        db.close()

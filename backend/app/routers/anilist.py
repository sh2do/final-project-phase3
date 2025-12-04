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
    try:
        results = await search_anime(q, page, per_page)
        return {
            "success": True,
            "data": results,
            "query": q,
        }
    except Exception as e:
        error_msg = str(e)
        logging.error(f"Search error for '{q}': {error_msg}")
        raise HTTPException(status_code=500, detail=f"Search failed: {error_msg}")


@router.get("/trending")
async def get_trending_endpoint(
    page: int = Query(1, ge=1, description="Page number for pagination"),
    per_page: int = Query(10, ge=1, le=50, description="Results per page"),
):
    """
    Get trending anime from AniList
    
    Returns paginated list of currently trending anime
    """
    try:
        results = await get_trending_anime(page, per_page)
        return {
            "success": True,
            "data": results,
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/{anime_id}")
async def get_anime_endpoint(anime_id: int):
    """
    Get detailed information about a specific anime from AniList
    
    Returns complete anime details including description, episodes, studios, etc.
    """
    try:
        anime_data = await get_anime_by_id(anime_id)
        if not anime_data:
            raise HTTPException(status_code=404, detail="Anime not found on AniList")
        
        return {
            "success": True,
            "data": anime_data,
        }
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/save/{anime_id}")
async def save_anime_to_collection(anime_id: int):
    """
    Fetch anime from AniList and save it to the local database
    
    This allows the anime to be added to user collections
    """
    try:
        # Get anime data from AniList
        anime_data = await get_anime_by_id(anime_id)
        if not anime_data:
            raise HTTPException(status_code=404, detail="Anime not found on AniList")
        
        # Parse to our schema
        anime_create = parse_anilist_anime(anime_data)
        
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
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

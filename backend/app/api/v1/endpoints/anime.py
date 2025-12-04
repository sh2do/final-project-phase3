from typing import Any, List, Optional
from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlmodel import Session
from app.db.session import get_session
from app.api.deps import get_current_active_user
from app.schemas.anime import AnimePublic, AnimeCreate, AnimeUpdate
from app.crud.anime import get_anime_by_id, get_anime_by_external_id, get_anime_list, create_anime, update_anime, delete_anime
from app.services.anilist import search_anime, get_anime_by_id as get_anilist_anime_by_id, parse_anilist_anime
from app.services.kitsu import search_anime as kitsu_search_anime, get_anime_by_id as get_kitsu_anime_by_id, parse_kitsu_anime

router = APIRouter()


@router.get("/", response_model=List[AnimePublic])
def read_anime_list(
    session: Session = Depends(get_session),
    skip: int = 0,
    limit: int = 100,
) -> Any:
    """
    Retrieve anime list.
    """
    anime = get_anime_list(session, skip=skip, limit=limit)
    return anime


@router.get("/{anime_id}", response_model=AnimePublic)
def read_anime_by_id(
    *,
    session: Session = Depends(get_session),
    anime_id: int,
) -> Any:
    """
    Get anime by ID.
    """
    anime = get_anime_by_id(session, anime_id)
    if not anime:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Anime not found.",
        )
    return anime


@router.post("/", response_model=AnimePublic)
def create_new_anime(
    *,
    session: Session = Depends(get_session),
    anime_in: AnimeCreate,
    current_user: UserPublic = Depends(get_current_active_user), # Requires authentication
) -> Any:
    """
    Create new anime.
    """
    anime = create_anime(session, anime_in)
    return anime


@router.patch("/{anime_id}", response_model=AnimePublic)
def update_anime_by_id(
    *,
    session: Session = Depends(get_session),
    anime_id: int,
    anime_in: AnimeUpdate,
    current_user: UserPublic = Depends(get_current_active_user), # Requires authentication
) -> Any:
    """
    Update an anime.
    """
    anime = update_anime(session, anime_id, anime_in)
    if not anime:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Anime not found.",
        )
    return anime


@router.delete("/{anime_id}", response_model=dict)
def delete_anime_by_id(
    *,
    session: Session = Depends(get_session),
    anime_id: int,
    current_user: UserPublic = Depends(get_current_active_user), # Requires authentication
) -> Any:
    """
    Delete an anime.
    """
    anime = delete_anime(session, anime_id)
    if not anime:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Anime not found.",
        )
    return {"message": "Anime deleted successfully", "id": anime_id}


@router.get("/external/search", response_model=List[AnimePublic])
async def search_external_anime(
    q: str = Query(..., min_length=1, description="Anime title to search for"),
    page: int = Query(1, ge=1, description="Page number for pagination"),
    per_page: int = Query(10, ge=1, le=50, description="Results per page"),
) -> Any:
    """
    Search for anime on external sources (AniList then Kitsu fallback).
    If found, the anime is saved to the local database.
    """
    results_list = []

    # Try AniList first
    try:
        anilist_results = await search_anime(q, page, per_page)
        for item in anilist_results.get("media", []):
            parsed_anime = parse_anilist_anime(item)
            results_list.append(parsed_anime)
    except Exception as e:
        print(f"AniList search failed for '{q}': {e}. Falling back to Kitsu.")

    # Try Kitsu as fallback if AniList failed or returned no results
    if not results_list:
        try:
            kitsu_results = await kitsu_search_anime(q, page, per_page)
            for item in kitsu_results.get("data", []): # Kitsu returns in 'data' key
                parsed_anime = parse_kitsu_anime(item)
                results_list.append(parsed_anime)
        except Exception as e:
            raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=f"Search failed: {e}")

    # Save to local database if not already present
    saved_anime_list = []
    for anime_data in results_list:
        db_anime = get_anime_by_external_id(Depends(get_session), external_id=anime_data.external_id)
        if not db_anime:
            saved_anime = create_anime(Depends(get_session), anime_create=AnimeCreate(**anime_data.model_dump()))
            saved_anime_list.append(saved_anime)
        else:
            saved_anime_list.append(db_anime) # If already exists, return the existing one
            
    return saved_anime_list


@router.post("/external/save/{external_id}", response_model=AnimePublic)
async def save_external_anime_by_id(
    external_id: int,
    session: Session = Depends(get_session),
    current_user: UserPublic = Depends(get_current_active_user), # Requires authentication
) -> Any:
    """
    Fetch anime from external source by external_id and save it to the local database.
    """
    db_anime = get_anime_by_external_id(session, external_id)
    if db_anime:
        return db_anime # Already exists

    anime_data = None
    try:
        anilist_data = await get_anilist_anime_by_id(external_id)
        if anilist_data:
            anime_data = parse_anilist_anime(anilist_data)
            anime_data.source = "anilist"
    except Exception as e:
        print(f"AniList fetch for id {external_id} failed: {e}. Trying Kitsu.")
    
    if not anime_data:
        try:
            kitsu_data = await get_kitsu_anime_by_id(external_id)
            if kitsu_data:
                anime_data = parse_kitsu_anime(kitsu_data)
                anime_data.source = "kitsu"
        except Exception as e:
            raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=f"Kitsu fetch failed: {e}")

    if not anime_data:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Anime not found on external sources.")
    
    # Create anime in local database
    created_anime = create_anime(session, AnimeCreate(**anime_data.model_dump()))
    return created_anime

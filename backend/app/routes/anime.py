from fastapi import APIRouter, Depends, HTTPException, Request
from typing import List
from app.services.jikan import search_anime, get_anime
from app.services.anilist import search_anilist, get_anilist
from app.schemas.anime import AnimeOut

router = APIRouter(prefix="/anime", tags=["anime"])


@router.get("/search", response_model=List[AnimeOut])
async def anime_search(request: Request, q: str, page: int = 1):
    """Try AniList first, fall back to Jikan."""
    # rate limit decorator can be applied via middleware if desired
    results = []
    try:
        alist = await search_anilist(q, page)
        for item in alist:
            results.append(
                {
                    "id": item.get("idMal") or item.get("id"),
                    "title": (item.get("title") or {}).get("english") or (item.get("title") or {}).get("romaji"),
                    "synopsis": item.get("description"),
                    "episodes": item.get("episodes"),
                    "score": item.get("averageScore"),
                    "image_url": (item.get("coverImage") or {}).get("large"),
                    "source": "anilist",
                }
            )
        if results:
            return results
    except Exception:
        # AniList failed or returned nothing — fall back
        pass

    jikan = await search_anime(q, page)
    for item in jikan:
        results.append(
            {
                "id": item.get("mal_id"),
                "title": item.get("title"),
                "synopsis": item.get("synopsis"),
                "episodes": item.get("episodes"),
                "score": item.get("score"),
                "image_url": item.get("images", {}).get("jpg", {}).get("image_url"),
                "source": "jikan",
            }
        )
    return results


@router.get("/{anime_id}", response_model=AnimeOut)
async def anime_detail(anime_id: int):
    # try AniList by MAL id first
    try:
        a = await get_anilist(anime_id)
        if a:
            return {
                "id": a.get("idMal") or a.get("id"),
                "title": (a.get("title") or {}).get("english") or (a.get("title") or {}).get("romaji"),
                "synopsis": a.get("description"),
                "episodes": a.get("episodes"),
                "score": a.get("averageScore"),
                "image_url": (a.get("coverImage") or {}).get("large"),
                "source": "anilist",
            }
    except Exception:
        pass

    # fallback to Jikan
    item = await get_anime(anime_id)
    if not item:
        raise HTTPException(status_code=404, detail="Anime not found")
    return {
        "id": item.get("mal_id"),
        "title": item.get("title"),
        "synopsis": item.get("synopsis"),
        "episodes": item.get("episodes"),
        "score": item.get("score"),
        "image_url": item.get("images", {}).get("jpg", {}).get("image_url"),
        "source": "jikan",
    }

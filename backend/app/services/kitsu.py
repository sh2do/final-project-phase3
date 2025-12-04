"""
Kitsu API Service
Provides search and retrieval functions using Kitsu API (hummingbird/kitsu-api)
"""

import httpx
from typing import Dict, Any
from ..schemas.anime import AnimeCreate

KITSU_API_BASE = "https://kitsu.io/api/edge"

async def search_anime(query: str, page: int = 1, per_page: int = 10) -> Dict[str, Any]:
    """Search Kitsu for anime matching `query` and return a Page-like dict"""
    # Kitsu uses offset-based paging; compute offset
    limit = per_page
    offset = (page - 1) * per_page
    params = {
        "filter[text]": query,
        "page[limit]": str(limit),
        "page[offset]": str(offset),
    }
    async with httpx.AsyncClient() as client:
        resp = await client.get(f"{KITSU_API_BASE}/anime", params=params, timeout=10.0)
        resp.raise_for_status()
        data = resp.json()

    # Normalize response into Page-like structure similar to AniList Page
    page_info = {
        "total": None,
        "perPage": limit,
        "currentPage": page,
        "lastPage": None,
        "hasNextPage": len(data.get("data", [])) == limit,
    }

    media = []
    for item in data.get("data", []):
        attr = item.get("attributes", {})
        media.append({
            "id": int(item.get("id")),
            "title": {
                "romaji": attr.get("canonicalTitle"),
                "english": attr.get("englishTitle") or attr.get("canonicalTitle"),
                "native": attr.get("subtype"),
            },
            "description": attr.get("synopsis"),
            "episodes": attr.get("episodeCount") or 0,
            "seasonYear": attr.get("startDate")[:4] if attr.get("startDate") else None,
            "format": attr.get("subtype"),
            "genres": attr.get("genres", []),
            "averageScore": attr.get("averageRating") and float(attr.get("averageRating")) or None,
            "popularity": attr.get("popularityRank"),
            "coverImage": {"large": (attr.get("posterImage") or {}).get("original")},
            "bannerImage": attr.get("coverImage") and attr.get("coverImage").get("original"),
        })

    return {"pageInfo": page_info, "media": media}


def parse_kitsu_anime(kitsu_data: Dict[str, Any]) -> AnimeCreate:
    """
    Convert Kitsu anime dict to AnimeCreate schema
    """
    title = kitsu_data.get("title", {})
    cover = kitsu_data.get("coverImage", {}) or {}
    description = kitsu_data.get("description") or ""
    # strip HTML tags if any
    import re
    description = re.sub(r'<[^>]+>', '', description)

    # try extract release year from seasonYear or startDate
    release_year = kitsu_data.get("seasonYear") or None

    return AnimeCreate(
        title=title.get("english") or title.get("romaji") or "Unknown",
        description=description,
        episodes=kitsu_data.get("episodes") or 0,
        release_year=release_year or 0,
        image_url=cover.get("large", ""),
    )


async def get_anime_by_id(anime_id: int) -> Dict[str, Any]:
    """Get anime details from Kitsu by ID"""
    async with httpx.AsyncClient() as client:
        resp = await client.get(f"{KITSU_API_BASE}/anime/{anime_id}", timeout=10.0)
        resp.raise_for_status()
        data = resp.json().get("data", {})

    if not data:
        return {}

    attr = data.get("attributes", {})
    return {
        "id": int(data.get("id")),
        "title": {
            "romaji": attr.get("canonicalTitle"),
            "english": attr.get("englishTitle") or attr.get("canonicalTitle"),
            "native": None,
        },
        "description": attr.get("synopsis"),
        "episodes": attr.get("episodeCount") or 0,
        "seasonYear": attr.get("startDate")[:4] if attr.get("startDate") else None,
        "format": attr.get("subtype"),
        "genres": attr.get("genres", []),
        "averageScore": attr.get("averageRating") and float(attr.get("averageRating")) or None,
        "popularity": attr.get("popularityRank"),
        "coverImage": {"large": (attr.get("posterImage") or {}).get("original")},
        "bannerImage": attr.get("coverImage") and attr.get("coverImage").get("original"),
    }


async def get_trending_anime(page: int = 1, per_page: int = 10) -> Dict[str, Any]:
    """Get trending anime from Kitsu (by popularityRank)"""
    limit = per_page
    offset = (page - 1) * per_page
    params = {
        "sort": "-popularityRank",
        "page[limit]": str(limit),
        "page[offset]": str(offset),
    }
    async with httpx.AsyncClient() as client:
        resp = await client.get(f"{KITSU_API_BASE}/anime", params=params, timeout=10.0)
        resp.raise_for_status()
        data = resp.json()

    media = []
    for item in data.get("data", []):
        attr = item.get("attributes", {})
        media.append({
            "id": int(item.get("id")),
            "title": {
                "romaji": attr.get("canonicalTitle"),
                "english": attr.get("englishTitle") or attr.get("canonicalTitle"),
            },
            "description": attr.get("synopsis"),
            "episodes": attr.get("episodeCount") or 0,
            "seasonYear": attr.get("startDate")[:4] if attr.get("startDate") else None,
            "coverImage": {"large": (attr.get("posterImage") or {}).get("original")},
        })

    page_info = {"perPage": limit, "currentPage": page, "hasNextPage": len(media) == limit}
    return {"pageInfo": page_info, "media": media}

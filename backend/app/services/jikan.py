"""Simple Jikan (MyAnimeList) service wrapper using httpx."""
import httpx
from typing import Optional

BASE = "https://api.jikan.moe/v4"


async def search_anime(query: str, page: int = 1):
    async with httpx.AsyncClient(timeout=10.0) as client:
        r = await client.get(f"{BASE}/anime", params={"q": query, "page": page})
        r.raise_for_status()
        data = r.json()
        return data.get("data", [])


async def get_anime(anime_id: int):
    async with httpx.AsyncClient(timeout=10.0) as client:
        r = await client.get(f"{BASE}/anime/{anime_id}/full")
        r.raise_for_status()
        return r.json().get("data")

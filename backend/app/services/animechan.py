"""
Anime-chan integration (quotes)
Provides simple quote fetching to enrich search results when available.
Repo referenced: RocktimSaikia/anime-chan (API uses https://animechan.vercel.app)
"""

import httpx
from typing import Dict, Any, List

ANIMECHAN_BASE = "https://animechan.vercel.app/api"

async def get_quotes_for_anime(query: str, limit: int = 3) -> List[Dict[str, Any]]:
    """Fetch quotes for an anime title. Returns a list of quote dicts."""
    params = {"title": query}
    try:
        async with httpx.AsyncClient() as client:
            resp = await client.get(f"{ANIMECHAN_BASE}/quotes/anime", params=params, timeout=8.0)
            resp.raise_for_status()
            data = resp.json()
            # The animechan endpoint may return a list of quotes
            if isinstance(data, list):
                return data[:limit]
            # Some variants return object with 'quotes' key
            if isinstance(data, dict) and "quotes" in data:
                return data["quotes"][:limit]
    except Exception:
        # Fail silently and return empty list (non-critical enrichment)
        return []

    return []

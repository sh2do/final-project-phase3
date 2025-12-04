import httpx
from typing import Dict, Any, Optional
import asyncio

# Kitsu API endpoint
KITSU_API_URL = "https://kitsu.io/api/edge"


async def _make_kitsu_request(endpoint: str, params: Optional[Dict[str, Any]] = None) -> Dict[str, Any]:
    """Helper function to make requests to the Kitsu API."""
    url = f"{KITSU_API_URL}/{endpoint}"
    async with httpx.AsyncClient() as client:
        response = await client.get(url, params=params)
        response.raise_for_status()
        return response.json()


async def search_anime(query: str, page: int = 1, per_page: int = 10) -> Dict[str, Any]:
    """Search for anime on Kitsu."""
    params = {
        "filter[text]": query,
        "page[limit]": per_page,
        "page[offset]": (page - 1) * per_page,
    }
    data = await _make_kitsu_request("anime", params)
    return data


async def get_anime_by_id(kitsu_id: int) -> Optional[Dict[str, Any]]:
    """Get anime details from Kitsu by its Kitsu ID."""
    data = await _make_kitsu_request(f"anime/{kitsu_id}")
    return data.get("data")


async def get_trending_anime(page: int = 1, per_page: int = 10) -> Dict[str, Any]:
    """Get trending anime from Kitsu."""
    params = {
        "sort": "-userCount", # Kitsu uses userCount for popularity/trending
        "page[limit]": per_page,
        "page[offset]": (page - 1) * per_page,
    }
    data = await _make_kitsu_request("anime", params)
    return data


def parse_kitsu_anime(anime_data: Dict[str, Any]) -> Dict[str, Any]:
    """Parses Kitsu anime data into a simplified, consistent format."""
    attributes = anime_data.get("attributes", {})
    return {
        "external_id": anime_data.get("id"),
        "title": attributes.get("titles", {{}}).get("en") or attributes.get("titles", {{}}).get("en_jp"),
        "synopsis": attributes.get("synopsis"),
        "episodes": attributes.get("episodeCount"),
        "score": attributes.get("averageRating"), # Kitsu uses averageRating as a string, might need conversion
        "image_url": attributes.get("posterImage", {{}}).get("large") or attributes.get("posterImage", {{}}).get("medium"),
        "release_year": attributes.get("startDate", "").split('-')[0] if attributes.get("startDate") else None,
        "source": "kitsu"
    }


if __name__ == "__main__":
    async def test_search():
        print("Searching for 'Naruto' on Kitsu...")
        results = await search_anime("Naruto")
        if results and results.get("data"):
            for media_item in results["data"]:
                print(f"- {parse_kitsu_anime(media_item)['title']} (ID: {media_item['id']})")
                print(parse_kitsu_anime(media_item))
        else:
            print("No results found.")

    async def test_get_by_id():
        print("\nGetting details for Kitsu ID 12 (Cowboy Bebop)...")
        anime_detail = await get_anime_by_id(12)
        if anime_detail:
            print(f"- Title: {parse_kitsu_anime(anime_detail)['title']}")
            print(parse_kitsu_anime(anime_detail))
        else:
            print("No detail found.")
    
    async def test_trending():
        print("\nGetting trending anime from Kitsu...")
        results = await get_trending_anime()
        if results and results.get("data"):
            for media_item in results["data"]:
                print(f"- {parse_kitsu_anime(media_item)['title']} (ID: {media_item['id']})")
        else:
            print("No results found.")

    asyncio.run(test_search())
    asyncio.run(test_get_by_id())
    asyncio.run(test_trending())
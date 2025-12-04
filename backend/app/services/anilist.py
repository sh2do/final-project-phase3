import httpx
from typing import Dict, Any, Optional
import asyncio

# AniList GraphQL API endpoint
ANILIST_API_URL = "https://graphql.anilist.co"

# Kitsu API endpoint (for fallback)
KITSU_API_URL = "https://kitsu.io/api/edge"

# GraphQL query for AniList anime search
ANILIST_SEARCH_QUERY = """
query ($search: String, $page: Int, $perPage: Int) {
  Page (page: $page, perPage: $perPage) {
    pageInfo {
      total
      currentPage
      lastPage
      hasNextPage
      perPage
    }
    media (search: $search, type: ANIME, sort: SEARCH_MATCH) {
      id
      idMal
      title {
        romaji
        english
        native
      }
      coverImage {
        extraLarge
        large
        medium
        color
      }
      bannerImage
      description(asHtml: false)
      episodes
      status
      seasonYear
      averageScore
      meanScore
      genres
      siteUrl
    }
  }
}
"""

ANILIST_ANIME_DETAIL_QUERY = """
query ($id: Int) {
  Media (id: $id, type: ANIME) {
    id
    idMal
    title {
      romaji
      english
      native
    }
    coverImage {
      extraLarge
      large
      medium
      color
    }
    bannerImage
    description(asHtml: false)
    episodes
    status
    seasonYear
    averageScore
    meanScore
    genres
    siteUrl
    source
    studios (isMain: true) {
      nodes {
        name
      }
    }
  }
}
"""


async def _make_anilist_request(query: str, variables: Dict[str, Any]) -> Dict[str, Any]:
    """Helper function to make requests to the AniList GraphQL API."""
    async with httpx.AsyncClient() as client:
        response = await client.post(ANILIST_API_URL, json={"query": query, "variables": variables})
        response.raise_for_status()
        return response.json()


async def search_anime(query: str, page: int = 1, per_page: int = 10) -> Dict[str, Any]:
    """Search for anime on AniList."""
    variables = {"search": query, "page": page, "perPage": per_page}
    data = await _make_anilist_request(ANILIST_SEARCH_QUERY, variables)
    return data.get("data", {}).get("Page", {})


async def get_anime_by_id(anilist_id: int) -> Optional[Dict[str, Any]]:
    """Get anime details from AniList by its AniList ID."""
    variables = {"id": anilist_id}
    data = await _make_anilist_request(ANILIST_ANIME_DETAIL_QUERY, variables)
    return data.get("data", {}).get("Media")


async def get_trending_anime(page: int = 1, per_page: int = 10) -> Dict[str, Any]:
    """Get trending anime from AniList (this might not be directly supported by a simple sort, requires careful query construction)."""
    # AniList doesn't have a direct "trending" sort. A common approach is to sort by popularity descending
    # for a recent season or overall. For simplicity, we'll use popularity here.
    TRENDING_QUERY = """
    query ($page: Int, $perPage: Int) {
      Page (page: $page, perPage: $perPage) {
        pageInfo {
          total
          currentPage
          lastPage
          hasNextPage
          perPage
        }
        media (type: ANIME, sort: POPULARITY_DESC) {
          id
          idMal
          title {
            romaji
            english
            native
          }
          coverImage {
            extraLarge
            large
            medium
            color
          }
          bannerImage
          description(asHtml: false)
          episodes
          status
          seasonYear
          averageScore
          meanScore
          genres
          siteUrl
        }
      }
    }
    """
    variables = {"page": page, "perPage": per_page}
    data = await _make_anilist_request(TRENDING_QUERY, variables)
    return data.get("data", {}).get("Page", {})


def parse_anilist_anime(anime_data: Dict[str, Any]) -> Dict[str, Any]:
    """Parses AniList anime data into a simplified, consistent format."""
    return {
        "external_id": anime_data.get("id"),
        "title": anime_data.get("title", {}).get("english") or anime_data.get("title", {}).get("romaji"),
        "synopsis": anime_data.get("description"),
        "episodes": anime_data.get("episodes"),
        "score": anime_data.get("averageScore") or anime_data.get("meanScore"),
        "image_url": anime_data.get("coverImage", {}).get("large") or anime_data.get("coverImage", {}).get("medium"),
        "release_year": anime_data.get("seasonYear"),
        "source": "anilist"
    }

if __name__ == "__main__":
    async def test_search():
        print("Searching for 'Attack on Titan' on AniList...")
        results = await search_anime("Attack on Titan")
        if results and results.get("media"):
            for media_item in results["media"]:
                print(f"- {media_item['title']['english'] or media_item['title']['romaji']} (ID: {media_item['id']})")
                print(parse_anilist_anime(media_item))
        else:
            print("No results found.")

    async def test_get_by_id():
        print("\nGetting details for AniList ID 16498 (Attack on Titan S2)...")
        anime_detail = await get_anime_by_id(16498)
        if anime_detail:
            print(f"- Title: {anime_detail['title']['english'] or anime_detail['title']['romaji']}")
            print(parse_anilist_anime(anime_detail))
        else:
            print("No detail found.")
    
    async def test_trending():
        print("\nGetting trending anime from AniList...")
        results = await get_trending_anime()
        if results and results.get("media"):
            for media_item in results["media"]:
                print(f"- {media_item['title']['english'] or media_item['title']['romaji']} (ID: {media_item['id']})")
        else:
            print("No results found.")

    asyncio.run(test_search())
    asyncio.run(test_get_by_id())
    asyncio.run(test_trending())
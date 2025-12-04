"""
AniList GraphQL API Service
Integrates with AniList API to fetch anime data
"""

import httpx
from typing import Dict, Any
from ..schemas.anime import AnimeCreate

# Import fallback mock service
from . import mock_anime

ANILIST_API_URL = "https://graphql.anilist.co"

# GraphQL Queries
SEARCH_ANIME_QUERY = """
    query SearchAnime($search: String, $page: Int, $perPage: Int) {
        Page(page: $page, perPage: $perPage) {
            pageInfo {
                total
                perPage
                currentPage
                lastPage
                hasNextPage
            }
            media(search: $search, type: ANIME) {
                id
                title {
                    romaji
                    english
                    native
                }
                description
                episodes
                status
                startDate {
                    year
                    month
                    day
                }
                endDate {
                    year
                    month
                    day
                }
                season
                seasonYear
                format
                genres
                averageScore
                popularity
                coverImage {
                    large
                    color
                }
                bannerImage
                source
                studios {
                    edges {
                        node {
                            name
                        }
                    }
                }
            }
        }
    }
"""

GET_ANIME_BY_ID_QUERY = """
    query GetAnime($id: Int) {
        Media(id: $id, type: ANIME) {
            id
            title {
                romaji
                english
                native
            }
            description
            episodes
            status
            startDate {
                year
                month
                day
            }
            endDate {
                year
                month
                day
            }
            season
            seasonYear
            format
            genres
            averageScore
            popularity
            coverImage {
                large
                color
            }
            bannerImage
            source
            studios {
                edges {
                    node {
                        name
                    }
                }
            }
        }
    }
"""

TRENDING_ANIME_QUERY = """
    query TrendingAnime($page: Int, $perPage: Int) {
        Page(page: $page, perPage: $perPage) {
            pageInfo {
                total
                perPage
                currentPage
                lastPage
                hasNextPage
            }
            media(type: ANIME, sort: TRENDING_DESC, isAdult: false) {
                id
                title {
                    romaji
                    english
                    native
                }
                description
                episodes
                status
                startDate {
                    year
                    month
                    day
                }
                endDate {
                    year
                    month
                    day
                }
                season
                seasonYear
                format
                genres
                averageScore
                popularity
                coverImage {
                    large
                    color
                }
                bannerImage
                source
                studios {
                    edges {
                        node {
                            name
                        }
                    }
                }
            }
        }
    }
"""


async def search_anime(
    search_query: str, page: int = 1, per_page: int = 10
) -> Dict[str, Any]:
    """
    Search for anime on AniList, with fallback to mock data
    
    Args:
        search_query: The anime title to search for
        page: Page number for pagination
        per_page: Number of results per page
        
    Returns:
        Dictionary containing search results and pagination info
    """
    variables = {
        "search": search_query,
        "page": page,
        "perPage": per_page,
    }
    
    try:
        async with httpx.AsyncClient(timeout=15.0) as client:
            response = await client.post(
                ANILIST_API_URL,
                json={"query": SEARCH_ANIME_QUERY, "variables": variables},
            )
            response.raise_for_status()
            data = response.json()
            
            if "errors" in data:
                error_msg = str(data.get("errors", "Unknown error"))
                raise Exception(f"AniList API Error: {error_msg}")
            
            return data.get("data", {}).get("Page", {})
    except (httpx.TimeoutException, httpx.HTTPError, Exception) as e:
        # Fallback to mock data
        print(f"AniList API error, using mock data: {str(e)}")
        return mock_anime.search_mock_anime(search_query, page, per_page)


async def get_anime_by_id(anime_id: int) -> Dict[str, Any]:
    """
    Get detailed anime information by AniList ID
    
    Args:
        anime_id: The AniList anime ID
        
    Returns:
        Dictionary containing detailed anime information
    """
    variables = {"id": anime_id}
    
    try:
        async with httpx.AsyncClient(timeout=15.0) as client:
            response = await client.post(
                ANILIST_API_URL,
                json={"query": GET_ANIME_BY_ID_QUERY, "variables": variables},
            )
            response.raise_for_status()
            data = response.json()
            
            if "errors" in data:
                error_msg = str(data.get("errors", "Unknown error"))
                raise Exception(f"AniList API Error: {error_msg}")
            
            return data.get("data", {}).get("Media", {})
    except httpx.TimeoutException as e:
        raise Exception(f"Request timeout: {str(e)}")
    except httpx.HTTPError as e:
        raise Exception(f"HTTP error: {str(e)}")


async def get_trending_anime(page: int = 1, per_page: int = 10) -> Dict[str, Any]:
    """
    Get trending anime from AniList
    
    Args:
        page: Page number for pagination
        per_page: Number of results per page
        
    Returns:
        Dictionary containing trending anime and pagination info
    """
    variables = {
        "page": page,
        "perPage": per_page,
    }
    
    try:
        async with httpx.AsyncClient(timeout=15.0) as client:
            response = await client.post(
                ANILIST_API_URL,
                json={"query": TRENDING_ANIME_QUERY, "variables": variables},
            )
            response.raise_for_status()
            data = response.json()
            
            if "errors" in data:
                error_msg = str(data.get("errors", "Unknown error"))
                raise Exception(f"AniList API Error: {error_msg}")
            
            return data.get("data", {}).get("Page", {})
    except httpx.TimeoutException as e:
        raise Exception(f"Request timeout: {str(e)}")
    except httpx.HTTPError as e:
        raise Exception(f"HTTP error: {str(e)}")


def parse_anilist_anime(anilist_data: Dict[str, Any]) -> AnimeCreate:
    """
    Convert AniList anime data to AnimeCreate schema
    
    Args:
        anilist_data: Raw data from AniList API
        
    Returns:
        AnimeCreate schema object
    """
    title = anilist_data.get("title", {})
    cover_image = anilist_data.get("coverImage", {})
    
    # Build description, fallback to empty string
    description = anilist_data.get("description", "") or ""
    
    # Remove HTML tags if present
    import re
    description = re.sub(r'<[^>]+>', '', description)
    
    return AnimeCreate(
        title=title.get("english") or title.get("romaji") or "Unknown",
        description=description,
        episodes=anilist_data.get("episodes") or 0,
        release_year=anilist_data.get("seasonYear") or 0,
        image_url=cover_image.get("large", "") if cover_image else "",
    )

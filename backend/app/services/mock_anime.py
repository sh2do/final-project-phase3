"""
Fallback/Mock Anime Database Service
Provides local anime data when AniList API is unavailable
"""

from typing import Dict, List, Any
import re

# Mock anime database with popular anime
MOCK_ANIME_DATA = {
    1: {
        "id": 1,
        "title": {"english": "Naruto", "romaji": "NARUTO", "native": "ナルト"},
        "description": "Naruto Uzumaki, a young ninja who aspires to become the Hokage, the leader of his village.",
        "episodes": 220,
        "status": "FINISHED",
        "seasonYear": 2002,
        "format": "TV",
        "genres": ["Action", "Shounen", "Adventure"],
        "averageScore": 87,
        "popularity": 9500,
        "coverImage": {"large": "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx20-QK6lCnJrv11m.jpg"},
    },
    5: {
        "id": 5,
        "title": {"english": "Cowboy Bebop", "romaji": "Cowboy Bebop", "native": "カウボーイビバップ"},
        "description": "In the year 2071, humanity has colonized several of the planets and moons of the solar system.",
        "episodes": 26,
        "status": "FINISHED",
        "seasonYear": 1998,
        "format": "TV",
        "genres": ["Sci-Fi", "Neo-Noir", "Action"],
        "averageScore": 86,
        "popularity": 8500,
        "coverImage": {"large": "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/b6-0hzlmhKM.jpg"},
    },
    6594: {
        "id": 6594,
        "title": {"english": "Demon Slayer", "romaji": "Kimetsu no Yaiba", "native": "鬼滅の刃"},
        "description": "Tanjiro's family is slaughtered by demons while he's away, and his little sister Nezuko is the only survivor.",
        "episodes": 55,
        "status": "RELEASING",
        "seasonYear": 2019,
        "format": "TV",
        "genres": ["Action", "Demons", "Shounen"],
        "averageScore": 89,
        "popularity": 10000,
        "coverImage": {"large": "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/nx6594.jpg"},
    },
    20496: {
        "id": 20496,
        "title": {"english": "Attack on Titan", "romaji": "Shingeki no Kyojin", "native": "進撃の巨人"},
        "description": "In a world where huge humanoid creatures called Titans prey on humans, the last surviving humans live within a giant walled city.",
        "episodes": 139,
        "status": "FINISHED",
        "seasonYear": 2013,
        "format": "TV",
        "genres": ["Action", "Dark", "Drama"],
        "averageScore": 85,
        "popularity": 9000,
        "coverImage": {"large": "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx20496-lW2Jr8VlsKmY.jpg"},
    },
    1535: {
        "id": 1535,
        "title": {"english": "Death Note", "romaji": "Death Note", "native": "デスノート"},
        "description": "A high school student named Light Turner finds a supernatural notebook.",
        "episodes": 37,
        "status": "FINISHED",
        "seasonYear": 2006,
        "format": "TV",
        "genres": ["Psychological", "Supernatural", "Thriller"],
        "averageScore": 84,
        "popularity": 8000,
        "coverImage": {"large": "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/b1535.jpg"},
    },
    11757: {
        "id": 11757,
        "title": {"english": "Re:ZERO", "romaji": "Re:Zero kara Hajimeru Isekai Seikatsu", "native": "Re:ゼロから始める異世界生活"},
        "description": "Subaru Natsuki is an ordinary high school student who is suddenly transported to another world.",
        "episodes": 50,
        "status": "RELEASING",
        "seasonYear": 2016,
        "format": "TV",
        "genres": ["Isekai", "Psychological", "Drama"],
        "averageScore": 82,
        "popularity": 7500,
        "coverImage": {"large": "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/b11757.jpg"},
    },
    38000: {
        "id": 38000,
        "title": {"english": "Jujutsu Kaisen", "romaji": "Jujutsu Kaisen", "native": "呪術廻戦"},
        "description": "High schooler Yuji Itadori swallows a cursed finger and becomes possessed.",
        "episodes": 47,
        "status": "RELEASING",
        "seasonYear": 2020,
        "format": "TV",
        "genres": ["Action", "Dark", "Supernatural"],
        "averageScore": 88,
        "popularity": 9800,
        "coverImage": {"large": "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx38000-I4cWzqcsxbQM.jpg"},
    },
}


def search_mock_anime(query: str, page: int = 1, per_page: int = 10) -> Dict[str, Any]:
    """
    Search mock anime database
    
    Args:
        query: Search string
        page: Page number
        per_page: Results per page
        
    Returns:
        Mock search results matching AniList format
    """
    query_lower = query.lower()
    
    # Filter anime matching query
    results = []
    for anime_id, anime_data in MOCK_ANIME_DATA.items():
        title_eng = anime_data["title"]["english"].lower()
        title_rom = anime_data["title"]["romaji"].lower()
        description = anime_data["description"].lower()
        
        if (query_lower in title_eng or 
            query_lower in title_rom or 
            query_lower in description):
            results.append(anime_data)
    
    # Pagination
    total = len(results)
    start = (page - 1) * per_page
    end = start + per_page
    paginated_results = results[start:end]
    
    return {
        "pageInfo": {
            "total": total,
            "perPage": per_page,
            "currentPage": page,
            "lastPage": (total + per_page - 1) // per_page,
            "hasNextPage": end < total,
        },
        "media": paginated_results,
    }


def get_mock_anime_by_id(anime_id: int) -> Dict[str, Any]:
    """
    Get mock anime by ID
    
    Args:
        anime_id: The anime ID
        
    Returns:
        Anime data or None if not found
    """
    return MOCK_ANIME_DATA.get(anime_id)


def get_trending_mock_anime(page: int = 1, per_page: int = 10) -> Dict[str, Any]:
    """
    Get trending mock anime
    
    Args:
        page: Page number
        per_page: Results per page
        
    Returns:
        Mock trending results sorted by popularity
    """
    # Sort by popularity/score
    sorted_anime = sorted(
        MOCK_ANIME_DATA.values(),
        key=lambda x: x.get("popularity", 0),
        reverse=True
    )
    
    total = len(sorted_anime)
    start = (page - 1) * per_page
    end = start + per_page
    paginated_results = sorted_anime[start:end]
    
    return {
        "pageInfo": {
            "total": total,
            "perPage": per_page,
            "currentPage": page,
            "lastPage": (total + per_page - 1) // per_page,
            "hasNextPage": end < total,
        },
        "media": paginated_results,
    }

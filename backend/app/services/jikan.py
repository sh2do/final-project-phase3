import requests
from typing import Optional, Dict, Any

from backend.app.schemas import anime as schemas

JIKAN_API_BASE_URL = "https://api.jikan.moe/v4"

def search_anime_jikan(query: str) -> Optional[schemas.JikanSearchResponse]:
    """
    Searches for anime using the Jikan API.
    Returns a JikanSearchResponse object if successful, None otherwise.
    """
    if not query:
        return None

    try:
        response = requests.get(f"{JIKAN_API_BASE_URL}/anime", params={"q": query})
        response.raise_for_status() # Raise an exception for HTTP errors
        data = response.json()
        return schemas.JikanSearchResponse(**data)
    except requests.exceptions.RequestException as e:
        print(f"Error fetching data from Jikan API: {e}")
        return None

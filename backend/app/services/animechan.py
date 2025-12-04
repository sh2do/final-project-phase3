import httpx
from typing import Dict, Any, List, Optional
import asyncio

ANIMECHAN_API_URL = "https://animechan.vercel.app/api"


async def get_quotes_for_anime(title: str) -> List[Dict[str, str]]:
    """
    Fetches random quotes for a given anime title from Animechan API.
    """
    try:
        async with httpx.AsyncClient() as client:
            # The API uses 'anime' parameter, so we pass the title directly
            response = await client.get(f"{ANIMECHAN_API_URL}/quotes/anime?title={title}")
            response.raise_for_status()
            quotes = response.json()
            return quotes
    except httpx.HTTPStatusError as e:
        print(f"HTTP error fetching quotes for {title}: {e}")
    except httpx.RequestError as e:
        print(f"Request error fetching quotes for {title}: {e}")
    except Exception as e:
        print(f"An unexpected error occurred fetching quotes for {title}: {e}")
    return []


if __name__ == "__main__":
    async def test_quotes():
        print("Fetching quotes for 'Naruto'...")
        quotes = await get_quotes_for_anime("Naruto")
        if quotes:
            for quote in quotes[:3]: # Print first 3 quotes
                print(f"- \"{quote.get('quote')}\" - {quote.get('character')} ({quote.get('anime')})")
        else:
            print("No quotes found.")

        print("\nFetching quotes for 'Attack on Titan'...")
        quotes = await get_quotes_for_anime("Attack on Titan")
        if quotes:
            for quote in quotes[:3]:
                print(f"- \"{quote.get('quote')}\" - {quote.get('character')} ({quote.get('anime')})")
        else:
            print("No quotes found.")

    asyncio.run(test_quotes())
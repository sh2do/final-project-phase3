import asyncio
import random
from typing import List

from app.models.item import Item
from app.utils.errors import APIException
from fastapi import status

async def fetch_data_from_repo() -> List[Item]:
    """
    Simulates fetching data from a repository.
    Includes a random delay and a chance to raise an APIException for demonstration.
    """
    # Simulate network delay
    await asyncio.sleep(random.uniform(0.5, 2.0))

    # Simulate a potential error
    if random.random() < 0.1:  # 10% chance of failure
        raise APIException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to retrieve data from external repository."
        )

    # Mock data
    mock_data = [
        Item(id=1, name="Anime A", description="A classic shonen anime."),
        Item(id=2, name="Anime B", description="A heartwarming slice-of-life."),
        Item(id=3, name="Anime C", description="An intense psychological thriller."),
        Item(id=4, name="Anime D", description="A futuristic mecha adventure."),
        Item(id=5, name="Anime E", description="A charming fantasy epic."),
    ]
    return mock_data

from fastapi import APIRouter, Depends, HTTPException, status
from typing import List

from app.models.item import Item
from app.services.fetch_repo import fetch_data_from_repo
from app.utils.errors import APIException

router = APIRouter()

@router.get("/data", response_model=List[Item], summary="Retrieve all items")
async def get_all_data():
    """
    Retrieves a list of all available items.
    Handles potential errors during data retrieval.
    """
    try:
        data = await fetch_data_from_repo()
        return data
    except APIException as e:
        # Re-raise APIException to be caught by the custom handler in main.py
        raise e
    except Exception as e:
        # Catch any other unexpected errors and return a generic 500
        raise APIException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"An unexpected error occurred: {str(e)}"
        )

from fastapi import HTTPException, status

class APIException(HTTPException):
    """
    Custom exception for consistent API error handling.
    Inherits from HTTPException to integrate with FastAPI's error handling.
    """
    def __init__(self, status_code: int, detail: str):
        super().__init__(status_code=status_code, detail=detail)

def handle_api_exception(exc: APIException):
    """
    A simple error handler for APIException.
    This function can be extended to log errors or format responses differently.
    """
    return {"message": exc.detail}, exc.status_code

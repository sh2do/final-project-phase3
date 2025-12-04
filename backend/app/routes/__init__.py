from .auth import router as auth_router
from .anime import router as anime_router
from .collection import router as collection_router

__all__ = ["auth_router", "anime_router", "collection_router"]

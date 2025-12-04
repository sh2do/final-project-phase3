from .anime import router as anime_router
from .users import router as users_router
from .collection import router as collection_router
from .anilist import router as anilist_router

__all__ = ["anime_router", "users_router", "collection_router", "anilist_router"]

from fastapi import APIRouter

from app.api.v1.endpoints import auth, users, anime, collection

api_router = APIRouter()
api_router.include_router(auth.router, prefix="/auth", tags=["auth"])
api_router.include_router(users.router, prefix="/users", tags=["users"])
api_router.include_router(anime.router, prefix="/anime", tags=["anime"])
api_router.include_router(collection.router, prefix="/collection", tags=["collection"])

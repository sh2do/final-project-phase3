from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from slowapi import Limiter
from slowapi.util import get_remote_address
from slowapi.middleware import SlowAPIMiddleware

from app.core.config import settings
from app.database import init_db
from app.routes import auth as auth_router
from app.routes import anime as anime_router
from app.routes import collection as collection_router


def create_app() -> FastAPI:
    app = FastAPI(title=settings.APP_NAME, version=settings.API_VERSION)

    # Rate limiter
    limiter = Limiter(key_func=get_remote_address)
    app.state.limiter = limiter
    app.add_middleware(SlowAPIMiddleware)

    app.add_middleware(
        CORSMiddleware,
        allow_origins=settings.ALLOWED_ORIGINS,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    # include routers
    app.include_router(auth_router.router)
    app.include_router(anime_router.router)
    app.include_router(collection_router.router)

    @app.on_event("startup")
    def on_startup():
        init_db()

    @app.get("/health")
    def health():
        return {"status": "ok"}

    return app


app = create_app()


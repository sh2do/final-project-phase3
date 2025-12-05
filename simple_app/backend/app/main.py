from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .routes.users import router as users_router
from .routes.anime import router as anime_router

app = FastAPI(title="Anime Tracker (simple JSON DB)")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(users_router, prefix="/users")
app.include_router(anime_router, prefix="/anime")


@app.get("/health")
def health():
    return {"status": "ok"}

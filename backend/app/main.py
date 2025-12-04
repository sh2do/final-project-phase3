from fastapi import FastAPI, status
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware

from app.routes import data
from app.utils.errors import APIException

app = FastAPI(
    title="Anime Collection Tracker API",
    description="A simple API for managing an anime collection.",
    version="0.1.0",
)

# Configure CORS for frontend interaction
# IMPORTANT: In a production environment, restrict origins to your specific frontend domain.
origins = [
    "http://localhost",
    "http://localhost:5173",  # Default Vite dev server port
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API routes
app.include_router(data.router, prefix="/api", tags=["data"])

# Custom exception handler for APIException
@app.exception_handler(APIException)
async def api_exception_handler(request, exc: APIException):
    return JSONResponse(
        status_code=exc.status_code,
        content={"detail": exc.detail},
    )

@app.get("/", summary="Root endpoint")
async def root():
    """
    Root endpoint for the API.
    """
    return {"message": "Welcome to the Anime Collection Tracker API!"}

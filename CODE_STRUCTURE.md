# Code Structure & Implementation Guide

## Backend Implementation

### 1. AniList Service (`backend/app/services/anilist.py`)

**Purpose**: Handle all AniList GraphQL API interactions

**Key Functions**:

```python
async def search_anime(search_query, page=1, per_page=10)
# Searches AniList for anime by title
# Returns: Page object with media array

async def get_anime_by_id(anime_id)
# Gets detailed info for a specific anime
# Returns: Media object with full details

async def get_trending_anime(page=1, per_page=10)
# Gets currently trending anime
# Returns: Page object sorted by trending

def parse_anilist_anime(anilist_data)
# Converts AniList data to local AnimeCreate schema
# Removes HTML tags, maps fields correctly
```

**GraphQL Queries Used**:

- `SearchAnime`: Full-text search with pagination
- `GetAnime`: Detailed single anime information
- `TrendingAnime`: Trending sorted results

---

### 2. AniList Router (`backend/app/routers/anilist.py`)

**Purpose**: FastAPI endpoints for AniList functionality

**Endpoints**:

#### `GET /api/anilist/search`

```python
@router.get("/search")
async def search_anime_endpoint(
    q: str = Query(...),  # Search query (required)
    page: int = Query(1),  # Page number
    per_page: int = Query(10, le=50)  # Results per page
)
```

#### `GET /api/anilist/trending`

```python
@router.get("/trending")
async def get_trending_endpoint(
    page: int = Query(1),
    per_page: int = Query(10, le=50)
)
```

#### `GET /api/anilist/{anime_id}`

```python
@router.get("/{anime_id}")
async def get_anime_endpoint(anime_id: int)
```

#### `POST /api/anilist/save/{anime_id}`

```python
@router.post("/save/{anime_id}")
async def save_anime_to_collection(anime_id: int)
# Fetches from AniList and saves to local database
```

---

### 3. Database Models (`backend/app/models/`)

#### Anime Model

```python
class Anime(Base):
    __tablename__ = "anime"

    id: int = Column(Integer, primary_key=True)
    title: str = Column(String(255), nullable=False)
    description: str = Column(Text, nullable=True)
    image_url: str = Column(String(500), nullable=True)
    episodes: int = Column(Integer, nullable=False)
    release_year: int = Column(Integer, nullable=True)
    created_at: datetime = Column(DateTime, default=datetime.utcnow)
    updated_at: datetime = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    collection_items = relationship("CollectionItem", back_populates="anime")
```

#### User Model

```python
class User(Base):
    __tablename__ = "users"

    id: int = Column(Integer, primary_key=True)
    username: str = Column(String(100), unique=True, nullable=False)
    email: str = Column(String(255), unique=True, nullable=False)
    created_at: datetime = Column(DateTime, default=datetime.utcnow)
    updated_at: datetime = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    collection_items = relationship("CollectionItem", back_populates="user")
```

#### CollectionItem Model

```python
class CollectionItem(Base):
    __tablename__ = "collection_items"

    id: int = Column(Integer, primary_key=True)
    user_id: int = Column(Integer, ForeignKey("users.id"), nullable=False)
    anime_id: int = Column(Integer, ForeignKey("anime.id"), nullable=False)
    episodes_watched: int = Column(Integer, nullable=False, default=0)
    rating: float = Column(Float, nullable=True)
    notes: str = Column(Text, nullable=True)
    is_favorite: bool = Column(Boolean, default=False)
    created_at: datetime = Column(DateTime, default=datetime.utcnow)
    updated_at: datetime = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    user = relationship("User", back_populates="collection_items")
    anime = relationship("Anime", back_populates="collection_items")
```

---

### 4. Pydantic Schemas (`backend/app/schemas/`)

#### AnimeCreate & AnimeResponse

```python
class AnimeCreate(BaseModel):
    title: str
    description: Optional[str] = None
    episodes: int = 0
    release_year: Optional[int] = None
    image_url: Optional[str] = None

class AnimeResponse(AnimeCreate):
    id: int
    created_at: datetime
    updated_at: datetime
```

#### UserCreate & UserResponse

```python
class UserCreate(BaseModel):
    username: str = Field(..., min_length=3, max_length=100)
    email: EmailStr

class UserResponse(BaseModel):
    id: int
    username: str
    email: str
```

#### CollectionItemCreate & CollectionItemResponse

```python
class CollectionItemCreate(BaseModel):
    user_id: int
    anime_id: int
    episodes_watched: int = 0
    rating: Optional[float] = Field(None, ge=0, le=10)
    notes: Optional[str] = None
    is_favorite: bool = False

class CollectionItemResponse(BaseModel):
    id: int
    user_id: int
    anime_id: int
    episodes_watched: int
    rating: Optional[float]
    notes: Optional[str]
    is_favorite: bool
```

---

### 5. CRUD Operations (`backend/app/crud/`)

#### Anime CRUD

```python
def create_anime(db: Session, anime: AnimeCreate) -> Anime
def get_anime(db: Session, anime_id: int) -> Optional[Anime]
def get_all_anime(db: Session, skip: int = 0, limit: int = 100) -> List[Anime]
def update_anime(db: Session, anime_id: int, anime_update: AnimeUpdate) -> Optional[Anime]
def delete_anime(db: Session, anime_id: int) -> bool
```

#### User CRUD

```python
def create_user(db: Session, user: UserCreate) -> User
def get_user(db: Session, user_id: int) -> Optional[User]
def get_all_users(db: Session, skip: int = 0, limit: int = 100) -> List[User]
def update_user(db: Session, user_id: int, user_update: UserUpdate) -> Optional[User]
def delete_user(db: Session, user_id: int) -> bool
```

#### CollectionItem CRUD

```python
def add_to_collection(db: Session, item: CollectionItemCreate) -> CollectionItem
def get_collection_item(db: Session, item_id: int) -> Optional[CollectionItem]
def get_user_collection(db: Session, user_id: int, skip: int = 0, limit: int = 100) -> List[CollectionItem]
def update_collection_item(db: Session, item_id: int, item_update: CollectionItemUpdate) -> Optional[CollectionItem]
def remove_from_collection(db: Session, item_id: int) -> bool
```

---

## Frontend Implementation

### 1. AniList Search Component (`frontend/src/components/AniListSearch.jsx`)

**Features**:

- Search input with form submission
- Paginated result display
- Card layout with:
  - Anime cover image
  - Title (English or Romaji)
  - Episode count
  - Release year
  - Genre tags (top 2)
  - Average score/rating
  - "Add to Collection" button
- Error handling with user feedback
- Loading states

**State Management**:

```javascript
const [searchQuery, setSearchQuery] = useState("");
const [results, setResults] = useState([]);
const [pageInfo, setPageInfo] = useState(null);
const [currentPage, setCurrentPage] = useState(1);
const [loading, setLoading] = useState(false);
const [error, setError] = useState("");
```

**Key Functions**:

```javascript
handleSearch(e, (page = 1));
// Calls API to search AniList
// Updates results and pageInfo

handleSaveAnime(anilistId, title);
// Saves selected anime to database
// Shows success/error message
```

---

### 2. Trending Page (`frontend/src/pages/TrendingPage.jsx`)

**Features**:

- Auto-loads trending anime on mount
- Same card layout as search component
- Pagination controls for browsing
- Full error handling

**Lifecycle**:

```javascript
useEffect(() => {
  fetchTrendingAnime();
}, []); // Runs once on mount
```

**Key Functions**:

```javascript
fetchTrendingAnime((page = 1));
// Gets trending anime from backend

handleSaveAnime(anilistId, title);
// Saves selected anime to database
```

---

### 3. Updated API Service (`frontend/src/services/api.js`)

**New AniList Methods**:

```javascript
animeAPI.searchAniList(query, (page = 1));
// GET /api/anilist/search?q={query}&page={page}&per_page=10

animeAPI.getTrendingAnime((page = 1));
// GET /api/anilist/trending?page={page}&per_page=10

animeAPI.getAniListAnime(anilistId);
// GET /api/anilist/{anilistId}

animeAPI.saveAniListAnime(anilistId);
// POST /api/anilist/save/{anilistId}
```

---

### 4. Updated App Router (`frontend/src/App.jsx`)

**New Routes**:

```javascript
<Route path="/search" element={<AniListSearch />} />
<Route path="/trending" element={<TrendingPage />} />
```

**Updated Navigation**:

```javascript
<Link to="/trending">Trending</Link>
<Link to="/search">Search</Link>
<Link to="/add">Add Anime</Link>
```

---

## Data Flow Diagrams

### Search Flow

```
User Input (Search Box)
    ↓
handleSearch()
    ↓
animeAPI.searchAniList(query)
    ↓
GET /api/anilist/search
    ↓
Backend: search_anime()
    ↓
AniList GraphQL API
    ↓
Backend: Parse & Return
    ↓
Frontend: Display Results
    ↓
User: Click "Add to Collection"
    ↓
animeAPI.saveAniListAnime()
    ↓
POST /api/anilist/save/{id}
    ↓
Backend: Create anime + Save
    ↓
Frontend: Show Success
```

### Database Save Flow

```
User Clicks "Add to Collection"
    ↓
POST /api/anilist/save/{anilist_id}
    ↓
get_anime_by_id(anilist_id)  [AniList API]
    ↓
parse_anilist_anime()  [Convert format]
    ↓
create_anime(db, anime_data)  [DB Insert]
    ↓
Anime saved to local database
    ↓
Return success response
    ↓
Frontend shows confirmation
```

---

## API Response Examples

### Search Response

```json
{
  "success": true,
  "data": {
    "pageInfo": {
      "total": 150,
      "perPage": 10,
      "currentPage": 1,
      "lastPage": 15,
      "hasNextPage": true
    },
    "media": [
      {
        "id": 20496,
        "title": {
          "romaji": "Naruto",
          "english": "Naruto",
          "native": "ナルト"
        },
        "description": "...",
        "episodes": 220,
        "status": "FINISHED",
        "seasonYear": 2002,
        "format": "TV",
        "genres": ["Action", "Adventure"],
        "averageScore": 87,
        "popularity": 9500,
        "coverImage": {
          "large": "https://..."
        }
      }
    ]
  },
  "query": "Naruto"
}
```

### Save Response

```json
{
  "success": true,
  "message": "Anime saved successfully",
  "data": {
    "id": 1,
    "title": "Naruto",
    "anilist_id": 20496
  }
}
```

---

## Environment Variables

### Backend (`.env`)

```
DATABASE_URL=sqlite:///./anime_tracker.db
DEBUG=True
ENVIRONMENT=development
API_TITLE=Anime Collection Tracker
API_VERSION=1.0.0
ALLOWED_ORIGINS=["http://localhost:5175","http://localhost:5174","http://localhost:5173"]
```

### Frontend (`.env`)

```
VITE_API_URL=http://localhost:8080
```

---

## Error Handling

### Backend Error Responses

```python
# 404 - Not Found
{
    "detail": "Anime not found on AniList"
}

# 500 - Server Error
{
    "detail": "AniList API Error: [error details]"
}

# 422 - Validation Error
{
    "detail": [{
        "loc": ["query", "per_page"],
        "msg": "ensure this value is less than or equal to 50",
        "type": "value_error.number.not_le"
    }]
}
```

### Frontend Error Handling

```javascript
try {
  const response = await animeAPI.searchAniList(query);
  setResults(response.data.media);
} catch (error) {
  setError("Failed to search anime. Please try again.");
  console.error(error);
}
```

---

## Performance Optimizations

1. **Async/Await**: Non-blocking operations
2. **Pagination**: Handle large datasets efficiently
3. **Lazy Loading**: Images load as needed
4. **Caching**: Browser caches static assets
5. **Connection Pooling**: Efficient DB connections
6. **Query Limits**: MAX 50 results per page

---

## Testing the Implementation

### Test Search

```bash
curl "http://localhost:8080/api/anilist/search?q=Death%20Note&page=1&per_page=5"
```

### Test Trending

```bash
curl "http://localhost:8080/api/anilist/trending?page=1&per_page=5"
```

### Test Save

```bash
curl -X POST "http://localhost:8080/api/anilist/save/1535" \
  -H "Content-Type: application/json"
```

### Get Saved Anime

```bash
curl "http://localhost:8080/anime"
```

---

This implementation provides a complete, production-ready anime collection tracker with full AniList integration.

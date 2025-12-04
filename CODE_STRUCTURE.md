def get_anime(db: Session, anime_id: int) -> Optional[Anime]
def get_all_anime(db: Session, skip: int = 0, limit: int = 100) -> List[Anime]
def update_anime(db: Session, anime_id: int, anime_update: AnimeUpdate) -> Optional[Anime]
def delete_anime(db: Session, anime_id: int) -> bool
def get_user(db: Session, user_id: int) -> Optional[User]
def get_all_users(db: Session, skip: int = 0, limit: int = 100) -> List[User]
def update_user(db: Session, user_id: int, user_update: UserUpdate) -> Optional[User]
def delete_user(db: Session, user_id: int) -> bool
def get_collection_item(db: Session, item_id: int) -> Optional[CollectionItem]
def get_user_collection(db: Session, user_id: int, skip: int = 0, limit: int = 100) -> List[CollectionItem]
def update_collection_item(db: Session, item_id: int, item_update: CollectionItemUpdate) -> Optional[CollectionItem]
def remove_from_collection(db: Session, item_id: int) -> bool
This file has been archived and moved to `docs_archive/CODE_STRUCTURE.md` for repository tidiness.

Please open `docs_archive/CODE_STRUCTURE.md` to view the full code structure and implementation guide.
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

````

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
````

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

# Anime Collection Tracker - Complete Startup Guide

## 🎯 Current Status

✅ **Backend Server**: Running on `http://localhost:8080`
✅ **Frontend Server**: Running on `http://localhost:5175`
✅ **AniList API Integration**: Fully Integrated
✅ **Database**: SQLite (auto-created)

## 🚀 Quick Start

### Option 1: Start Both Servers (Recommended)

#### Terminal 1 - Backend

```bash
cd backend
source /Users/jeffthanduru/.local/share/virtualenvs/Code-challenge-phase3-5S_wIqe_/bin/activate
python3 -m uvicorn app.main:app --reload --port 8080
```

#### Terminal 2 - Frontend

```bash
cd frontend
npm run dev
```

Then open: **http://localhost:5175**

### Option 2: Using Docker (Future)

Docker Compose configuration is available for production deployment.

---

## 📋 Available Features

### 🔍 Search AniList

- Navigate to "Search" in the navigation bar
- Enter an anime title
- Browse paginated results with:
  - Cover images
  - Episode count
  - Release year
  - Genre tags
  - Ratings
- Click "Add to Collection" to save to your database

### 🌟 Trending Anime

- Navigate to "Trending" in the navigation bar
- View currently trending anime on AniList
- Full pagination support
- Same quick-add functionality as search

### 📚 Manage Your Collection

- Add anime from AniList
- Track episodes watched
- Rate your anime (1-10)
- Mark favorites
- Add personal notes
- View your complete collection

---

## 🔌 API Endpoints

### AniList Integration Endpoints

#### Search Anime

```bash
GET http://localhost:8080/api/anilist/search?q=Naruto&page=1&per_page=10

Response:
{
  "success": true,
  "data": {
    "pageInfo": {...},
    "media": [
      {
        "id": 20496,
        "title": {...},
        "episodes": 220,
        "averageScore": 87,
        ...
      }
    ]
  }
}
```

#### Get Trending

```bash
GET http://localhost:8080/api/anilist/trending?page=1&per_page=10
```

#### Get Anime Details

```bash
GET http://localhost:8080/api/anilist/20496
```

#### Save Anime to Database

```bash
POST http://localhost:8080/api/anilist/save/20496

Response:
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

### Original API Endpoints

#### Anime Management

```bash
GET    /anime
GET    /anime/{anime_id}
POST   /anime
PATCH  /anime/{anime_id}
DELETE /anime/{anime_id}
```

#### User Management

```bash
GET    /users
GET    /users/{user_id}
POST   /users
PATCH  /users/{user_id}
DELETE /users/{user_id}
```

#### Collection Management

```bash
GET    /collection/{user_id}
GET    /collection/item/{item_id}
POST   /collection
PATCH  /collection/{item_id}
DELETE /collection/{item_id}
```

---

## 📱 Frontend Routes

| Route                  | Purpose                        |
| ---------------------- | ------------------------------ |
| `/`                    | Home page - Browse local anime |
| `/search`              | Search AniList database        |
| `/trending`            | View trending anime            |
| `/add`                 | Add new anime manually         |
| `/anime/{id}`          | View anime details             |
| `/collection/{userId}` | View user's collection         |

---

## 🛠️ Technology Stack

### Backend

- **Framework**: FastAPI 0.100+
- **Database**: SQLite with SQLAlchemy ORM
- **Async Support**: Uvicorn ASGI server
- **API Client**: httpx (for AniList GraphQL)
- **Validation**: Pydantic 2.0+
- **Migrations**: Alembic

### Frontend

- **Framework**: React 18
- **Build Tool**: Vite 5.4
- **Styling**: Tailwind CSS 3.4
- **HTTP Client**: Axios
- **Routing**: React Router 6
- **Package Manager**: npm

---

## 📊 Database Schema

### Tables

1. **anime** - Stores anime information
   - id, title, description, image_url, episodes, release_year
2. **users** - User accounts
   - id, username (unique), email (unique)
3. **collection_items** - User's anime collection
   - id, user_id (FK), anime_id (FK), episodes_watched, rating, notes, is_favorite

---

## 🔧 Configuration

### Backend (.env)

```
DATABASE_URL=sqlite:///./anime_tracker.db
DEBUG=True
ENVIRONMENT=development
API_TITLE=Anime Collection Tracker
API_VERSION=1.0.0
```

### Frontend (.env)

```
VITE_API_URL=http://localhost:8080
```

---

## 📦 Dependencies

### Python (Backend)

```
fastapi>=0.100.0
uvicorn>=0.23.0
sqlalchemy>=2.0.0
pydantic>=2.0.0
pydantic[email]>=2.0.0
python-dotenv>=1.0.0
alembic>=1.13.0
httpx>=0.24.0
email-validator>=2.0.0
```

### Node.js (Frontend)

```
react@^18.3.1
react-dom@^18.3.1
react-router-dom@^6.20.0
axios@^1.6.2
tailwindcss@^3.4.0
postcss@^8.4.32
autoprefixer@^10.4.16
vite@^5.0.0
```

---

## 🐛 Troubleshooting

### Backend Won't Start

1. Check Python virtual environment is activated
2. Verify all dependencies installed: `pip list`
3. Check port 8080 is available: `lsof -i :8080`
4. Try alternative port: `--port 8081`

### Frontend Won't Load

1. Ensure backend is running first
2. Check `.env` file has correct API URL
3. Clear node_modules: `rm -rf node_modules && npm install`
4. Check port 5175 is available

### API Requests Failing

1. Verify backend is running: `curl http://localhost:8080/`
2. Check browser console for CORS errors
3. Ensure `.env` file has correct `VITE_API_URL`
4. Try accessing API directly: `curl http://localhost:8080/api/anilist/trending`

### Database Issues

1. Delete `anime_tracker.db` to reset database
2. Tables are auto-created on first run
3. Check `backend/.env` has correct `DATABASE_URL`

---

## 📚 Documentation

- **API Documentation**: http://localhost:8080/docs (Swagger UI)
- **AniList API**: https://docs.anilist.co/
- **FastAPI**: https://fastapi.tiangolo.com/
- **React**: https://react.dev/

---

## 🚀 Next Steps

1. **Test the Application**

   - Visit http://localhost:5175
   - Search for "Naruto" in the search page
   - Add an anime to your collection
   - Check your collection on home page

2. **Create User Account**

   - Users can be created via the API
   - Anime can be saved to user collections

3. **Deploy to Production**

   - Update environment variables
   - Use Docker for containerization
   - Deploy to cloud provider (AWS, GCP, Heroku, etc.)

4. **Add Features**
   - User authentication/login
   - Advanced search filters
   - Social sharing
   - Recommendations engine

---

## 📞 Support

For issues or questions:

1. Check the logs in the terminal running the server
2. Review API response in browser DevTools
3. Consult AniList API documentation
4. Check FastAPI and React documentation

---

**Last Updated**: December 4, 2025
**Status**: ✅ Production Ready

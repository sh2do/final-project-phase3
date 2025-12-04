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

This file has been archived and moved to `docs_archive/STARTUP_GUIDE.md` for repository tidiness.

Please open `docs_archive/STARTUP_GUIDE.md` to view the full startup guide.

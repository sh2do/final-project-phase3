# Quick Start Guide

## One-Time Setup

```bash
# From the fresh-rebuild directory
bash setup.sh
```

This will:

1. Install backend dependencies (npm install)
2. Install frontend dependencies (npm install)

## Running the App

### Terminal 1 - Start the Backend

```bash
cd backend
npm run dev
```

Expected output:

```
🚀 Backend running at http://localhost:5000
📍 API: http://localhost:5000/api/anime
```

### Terminal 2 - Start the Frontend

```bash
cd frontend
npm run dev
```

Expected output:

```
VITE v5.0.0 ready in 234 ms

➜  Local:   http://localhost:5173/
```

### Open in Browser

```
http://localhost:5173
```

## How to Use

1. **Search**: Type anime name in the search bar
2. **View Results**: Cards appear with image, type, and episode count
3. **Click Card**: Opens detailed page with synopsis, genres, score, etc.
4. **Go Back**: Click "Back" button to return to search

## Troubleshooting

### "Failed to fetch anime" error

- Make sure backend is running on port 5000
- Check that `http://localhost:5000/api/anime` is accessible
- Try: `curl http://localhost:5000/health`

### "Cannot find module" error

- Run `npm install` in that directory
- Make sure you're in the right folder (backend or frontend)

### Port already in use

- Backend won't start: Something is using port 5000
  ```bash
  lsof -i :5000  # Find what's using it
  kill -9 <PID>  # Kill it
  ```
- Frontend won't start: Something is using port 5173
  ```bash
  lsof -i :5173
  kill -9 <PID>
  ```

## API Endpoints

### Search Anime

```
GET http://localhost:5000/api/anime?q=demon%20slayer
```

Response:

```json
{
  "data": [
    {
      "mal_id": 38480,
      "url": "https://myanimelist.net/anime/38480/Kimetsu_no_Yaiba",
      "images": {
        "jpg": {
          "image_url": "https://...",
          "small_image_url": "https://...",
          "large_image_url": "https://..."
        }
      },
      "title": "Kimetsu no Yaiba",
      "type": "TV",
      "episodes": 26,
      "status": "Finished Airing",
      "score": 8.68,
      "synopsis": "...",
      "genres": [...]
    }
  ]
}
```

### Get Anime Details

```
GET http://localhost:5000/api/anime/38480
```

## File Structure Overview

```
fresh-rebuild/
│
├── backend/
│   ├── server.js              # Main server file
│   ├── package.json           # Dependencies
│   ├── .env                   # Environment variables
│   ├── routes/
│   │   └── anime.js           # Route definitions
│   ├── controllers/
│   │   └── animeController.js # Business logic
│   └── utils/
│       └── jikan.js           # Jikan API calls
│
├── frontend/
│   ├── index.html             # HTML entry point
│   ├── package.json           # Dependencies
│   ├── vite.config.js         # Vite config
│   ├── tailwind.config.js     # Tailwind config
│   └── src/
│       ├── main.jsx           # React entry point
│       ├── components/
│       │   ├── AnimeCard.jsx  # Card component
│       │   └── SearchBar.jsx  # Search component
│       ├── pages/
│       │   ├── HomePage.jsx   # Search page
│       │   └── DetailPage.jsx # Detail page
│       ├── hooks/
│       │   ├── useAnimeSearch.js   # Search logic
│       │   └── useAnimeDetail.js   # Detail logic
│       └── styles/
│           └── index.css      # Global styles
│
└── README.md                  # This file
```

## Code Flow

### Search Flow

```
User types in SearchBar
    ↓
useAnimeSearch hook triggered
    ↓
Calls: fetch('http://localhost:5000/api/anime?q=...')
    ↓
Backend routes to animeController.searchAnime()
    ↓
Controller calls jikan.searchAnime()
    ↓
Returns data from Jikan API
    ↓
Results displayed as AnimeCard components
```

### Detail Flow

```
User clicks AnimeCard
    ↓
Navigate to /anime/:id
    ↓
DetailPage component loads
    ↓
useAnimeDetail hook fetches: /api/anime/:id
    ↓
Backend calls jikan.getAnimeById()
    ↓
Returns full anime details from Jikan
    ↓
Displays synopsis, genres, score, etc.
```

## What's Next?

Ideas to extend this:

- Add favorites/bookmarks (localStorage)
- Add filters (type, status, genre)
- Add pagination
- Add user ratings
- Connect to a real database

Keep it simple first, add features later! 🚀

# Anime Tracker

A clean, simple anime tracker app built with React + Express.

## Project Structure

```
fresh-rebuild/
├── frontend/          # React + Vite + Tailwind
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── hooks/         # Custom React hooks
│   │   └── styles/        # CSS files
│   └── package.json
├── backend/           # Express server
│   ├── routes/        # Route definitions
│   ├── controllers/    # Business logic
│   ├── utils/         # Helper functions
│   └── package.json
```

## Setup & Run

### Backend Setup

```bash
cd backend
npm install
npm run dev
# Server runs at http://localhost:5000
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
# Frontend runs at http://localhost:5173
```

## API Routes

- `GET /api/anime?q=<search_query>` - Search for anime
- `GET /api/anime/:id` - Get anime details by ID

## Features

✅ Search anime in real-time
✅ View detailed anime information
✅ Responsive design with Tailwind CSS
✅ Clean, maintainable code

## What's Used

**Frontend:**
- React 18
- Vite
- Tailwind CSS
- React Router

**Backend:**
- Express
- Jikan API (https://api.jikan.moe/v4/)
- CORS enabled

## How It Works

1. User searches for anime on the homepage
2. Frontend calls backend: `GET /api/anime?q=...`
3. Backend fetches from Jikan API and returns data
4. Frontend displays results as cards
5. Click a card to see full details on `/anime/:id`
6. Detail page fetches fresh data from backend

---

Built for simplicity and clarity. No over-engineering, just working code! 🚀

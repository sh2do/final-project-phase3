# 🎬 ANIME TRACKER - REBUILT FROM SCRATCH

## ✨ What You're Getting

A **complete**, **clean**, **working** anime tracker built with:

- **Frontend**: React + Vite + Tailwind CSS
- **Backend**: Express.js + Jikan Anime API
- **No over-engineering**, just simple, readable code

---

## 📁 Project Structure

```
fresh-rebuild/
├── backend/                    # Express server
│   ├── server.js              # Main entry point
│   ├── package.json           # Dependencies: express, cors, axios
│   ├── .env                   # Configuration
│   ├── routes/
│   │   └── anime.js           # GET /api/anime, /api/anime/:id
│   ├── controllers/
│   │   └── animeController.js # Search & detail logic
│   └── utils/
│       └── jikan.js           # Jikan API wrapper
│
├── frontend/                  # React app
│   ├── index.html             # HTML entry
│   ├── package.json           # Dependencies: react, vite, tailwind
│   ├── vite.config.js         # Vite configuration
│   ├── tailwind.config.js     # Tailwind configuration
│   └── src/
│       ├── main.jsx           # React DOM entry
│       ├── components/
│       │   ├── AnimeCard.jsx  # Single anime card
│       │   └── SearchBar.jsx  # Search input
│       ├── pages/
│       │   ├── HomePage.jsx   # Search & browse
│       │   └── DetailPage.jsx # Anime details
│       ├── hooks/
│       │   ├── useAnimeSearch.js   # Search logic
│       │   └── useAnimeDetail.js   # Detail logic
│       └── styles/
│           └── index.css      # Tailwind + base styles
│
├── setup.sh                   # One-command setup
├── QUICK_START.md             # How to run
└── README.md                  # Overview
```

---

## 🚀 Getting Started (3 Steps)

### Step 1: Navigate to the project

```bash
cd fresh-rebuild
```

### Step 2: Install dependencies

```bash
bash setup.sh
```

This installs npm packages for both backend and frontend.

### Step 3: Run both servers

**Terminal 1:**

```bash
cd backend && npm run dev
# Should show: 🚀 Backend running at http://localhost:5000
```

**Terminal 2:**

```bash
cd frontend && npm run dev
# Should show: Local: http://localhost:5173
```

**Then open:** `http://localhost:5173`

---

## 🔧 How It Works

### User searches for anime:

1. Types "Demon Slayer" in search bar
2. Frontend calls: `http://localhost:5000/api/anime?q=Demon%20Slayer`
3. Backend receives request → calls Jikan API
4. Returns anime list to frontend
5. Frontend displays as grid of cards

### User clicks an anime:

1. Clicks card → navigates to `/anime/38480`
2. Frontend calls: `http://localhost:5000/api/anime/38480`
3. Backend gets full details from Jikan
4. Shows: image, synopsis, genres, score, episodes, etc.

---

## 📋 API Routes (Backend)

| Method | Route                 | Purpose                     |
| ------ | --------------------- | --------------------------- |
| GET    | `/api/anime?q=search` | Search anime by name        |
| GET    | `/api/anime/:id`      | Get anime details by MAL ID |
| GET    | `/health`             | Server health check         |

### Example Requests

**Search:**

```bash
curl "http://localhost:5000/api/anime?q=attack%20on%20titan"
```

**Details:**

```bash
curl "http://localhost:5000/api/anime/16498"
```

**Health Check:**

```bash
curl http://localhost:5000/health
```

---

## 🎨 Frontend Features

✅ **Search Bar** - Real-time anime search  
✅ **Anime Grid** - Responsive card layout (1/2/4 columns)  
✅ **Anime Cards** - Shows image, title, type, episodes  
✅ **Detail Page** - Full synopsis, genres, score, status  
✅ **Navigation** - Easy back button to search  
✅ **Tailwind CSS** - Clean, modern design  
✅ **Error Handling** - Shows errors when API fails  
✅ **Loading States** - Loading spinner while fetching

---

## ⚙️ Backend Features

✅ **Express Server** - Lightweight, fast  
✅ **CORS Enabled** - Frontend can talk to backend  
✅ **Jikan API Integration** - Real anime data  
✅ **Error Handling** - Returns proper error messages  
✅ **No Database Needed** - Uses public API  
✅ **Simple Routes** - 2 endpoints only  
✅ **Clean Code** - Controllers separate from routes

---

## 🐛 Troubleshooting

### "Failed to fetch anime" error

**Problem:** Frontend can't reach backend  
**Solution:**

```bash
# Check backend is running
curl http://localhost:5000/health
# Should return: {"status":"Server is running"}
```

### "Cannot find module" errors

**Problem:** Dependencies not installed  
**Solution:**

```bash
# Reinstall in that directory
npm install
```

### Port already in use

**Problem:** Port 5000 or 5173 is taken  
**Solution:**

```bash
# Find what's using the port
lsof -i :5000  # or :5173

# Kill it
kill -9 <PID>
```

### No search results

**Problem:** Jikan API down or network issue  
**Solution:**

- Check internet connection
- Try: `curl https://api.jikan.moe/v4/anime?query=test`
- API might be temporarily down (rare)

---

## 📝 Code Examples

### Adding a new feature (e.g., favorites)

**1. Add to homepage:**

```jsx
// HomePage.jsx
import { useState } from 'react';

export function HomePage() {
  const [favorites, setFavorites] = useState([]);

  const toggleFavorite = (id) => {
    setFavorites(prev =>
      prev.includes(id)
        ? prev.filter(f => f !== id)
        : [...prev, id]
    );
  };

  return (
    // ... add onClick handlers to AnimeCard
  );
}
```

**2. Save to localStorage:**

```jsx
useEffect(() => {
  localStorage.setItem("favorites", JSON.stringify(favorites));
}, [favorites]);
```

That's it! Simple additions, clean code.

---

## 🎓 Learning Resources

**Frontend:**

- React Hooks: https://react.dev/reference/react/hooks
- Tailwind CSS: https://tailwindcss.com/docs
- Vite: https://vitejs.dev/guide/

**Backend:**

- Express: https://expressjs.com/
- Jikan API: https://docs.api.jikan.moe/

**Full Stack:**

- CORS: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
- Fetch API: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API

---

## ✅ Testing Checklist

- [ ] Backend runs without errors
- [ ] Frontend loads without errors
- [ ] Search returns results
- [ ] Click card → detail page loads
- [ ] Back button works
- [ ] Images load correctly
- [ ] No console errors (F12)
- [ ] API calls show in Network tab (F12)

---

## 🚢 Ready to Deploy?

**Frontend** (to Vercel, Netlify, etc.):

1. Build: `npm run build`
2. Deploy the `dist/` folder
3. Update `API_URL` to production backend

**Backend** (to Heroku, Railway, etc.):

1. Set `PORT` environment variable
2. Set `NODE_ENV=production`
3. Deploy the `backend/` folder

---

## 💡 Notes

- **No database needed** - Uses public Jikan API
- **No authentication** - Public data only
- **Simple architecture** - Easy to understand & modify
- **Production ready** - Error handling, CORS, proper responses
- **Expandable** - Easy to add features later

---

## 🎯 Next Steps

1. **Run it** - Follow QUICK_START.md
2. **Understand it** - Read through the code
3. **Modify it** - Change colors, add features
4. **Deploy it** - Share with friends

That's it! You have a working anime tracker. 🎉

---

## 📞 Questions?

Check these files for help:

- **Setup issues** → QUICK_START.md
- **How it works** → README.md
- **Code examples** → Look at the components
- **API docs** → https://docs.api.jikan.moe/

Happy coding! 🚀

# API Troubleshooting Guide

## Using Jikan API (Auth-Less Anime Database)

Your app uses **Jikan API** which is completely **free and requires no authentication**.

### ✅ What You Get

- 📺 Complete anime database with thousands of titles
- 🔍 Search by name, genre, year, status, etc.
- 📊 Detailed info: synopsis, episodes, ratings, genres, dates
- 🖼️ Poster images for each anime
- ✨ No API key needed, no login required

### 🚀 How It Works

**Backend Flow:**

```
1. Frontend sends: GET /api/anime?q=Demon Slayer
2. Backend receives request in routes/anime.js
3. Controller validates the query parameter
4. Utils calls Jikan API: GET https://api.jikan.moe/v4/anime?query=Demon+Slayer
5. Backend returns data to frontend
```

**Frontend Flow:**

```
1. User types in search box
2. useAnimeSearch hook calls: fetch("http://localhost:5000/api/anime?q=...")
3. Results appear as AnimeCard components
4. Click a card → DetailPage loads that anime's full info
```

---

## 🔧 Troubleshooting

### Problem: "Failed to fetch anime"

**Checklist:**

1. **Backend running?**

   ```bash
   # Terminal 1
   cd fresh-rebuild/backend
   npm run dev
   ```

   Should see: `🚀 Backend running at http://localhost:5000`

2. **Frontend running?**

   ```bash
   # Terminal 2
   cd fresh-rebuild/frontend
   npm run dev
   ```

   Should see: `Local: http://localhost:5173/`

3. **Check browser console** (F12)

   - Look for exact error message
   - Should show which API endpoint failed

4. **Check backend console**

   - Shows logs with 🔍 🎬 ✅ ❌ emojis
   - Look for error details

5. **Test manually**
   ```bash
   # In another terminal
   curl "http://localhost:5000/api/anime?q=test"
   ```
   Should return JSON with anime data.

---

### Problem: "No anime found"

This means the API worked but no results matched your search.

**Try:**

- Different anime name (e.g., "Naruto", "One Piece", "Demon Slayer")
- Shorter search terms (e.g., "anime" instead of "very specific anime")
- Check spelling

**Known working searches:**

- Demon Slayer
- Attack on Titan
- Naruto
- One Piece
- Jujutsu Kaisen
- Death Note
- Steins;Gate

---

### Problem: "Port already in use"

If you get `EADDRINUSE` error:

**Find what's using the port:**

```bash
# For backend (port 5000)
lsof -i :5000

# For frontend (port 5173)
lsof -i :5173
```

**Kill the process:**

```bash
# Replace <PID> with the number from above
kill -9 <PID>
```

---

### Problem: "CORS error" or "No Access-Control-Allow-Origin"

This shouldn't happen since CORS is configured, but if it does:

1. Check backend is running
2. Frontend should be on `http://localhost:5173` (not a different port)
3. Look at backend console for CORS error logs

---

### Problem: Backend can't connect to Jikan API

If you see `❌ Jikan API error` in backend console:

1. **Check internet connection** - Jikan API requires internet
2. **Check if Jikan is down** - Visit https://api.jikan.moe/v4/anime?query=test in browser
3. **Check timeout** - Backend has 10 second timeout, Jikan might be slow

**Backend logs show:**

```
🔍 Searching for: Demon Slayer (page 1)
❌ Jikan API error: timeout of 10000ms exceeded
```

Try waiting a moment and searching again. Jikan API is sometimes slow.

---

## 📊 Backend Logging

The backend now logs everything with emojis:

```
🔍 Searching for: [query]          ← Search started
📝 Controller: Searching for ...    ← In controller
✅ Found 25 results                  ← Jikan API succeeded
📤 Controller: Returning 25 results ← Sending to frontend
```

**Error logs:**

```
⚠️ Missing search query              ← Client forgot to send query
❌ Jikan API error: ...              ← Jikan API failed
🚨 Search error: ...                 ← Something went wrong
```

---

## 🐛 Debug Mode

To see detailed logs:

1. **Backend** - Already showing! Check terminal
2. **Frontend** - Open F12 → Console tab
   - Shows 🔍 🎬 ✅ ❌ emojis
   - Shows fetch URLs
   - Shows response status codes

**Example frontend console output:**

```
🔍 Frontend: Searching for "Demon Slayer"
📡 Fetching from: http://localhost:5000/api/anime?q=Demon%20Slayer
📥 Response status: 200
✅ Got 25 results
```

---

## 🌐 API Endpoints Reference

### Search Anime

```
GET /api/anime?q=<search_term>&page=<page_number>

Example:
http://localhost:5000/api/anime?q=Demon%20Slayer&page=1

Response:
{
  "data": [
    {
      "mal_id": 38480,
      "title": "Demon Slayer: Kimetsu no Yaiba",
      "images": { "jpg": { "image_url": "..." } },
      "synopsis": "...",
      "genres": [...],
      "episodes": 26,
      "score": 8.73,
      ...
    }
  ],
  "pagination": { "last_visible_page": 1, "has_next_page": false }
}
```

### Get Anime Details

```
GET /api/anime/<anime_id>

Example:
http://localhost:5000/api/anime/38480

Response:
{
  "data": {
    "mal_id": 38480,
    "title": "Demon Slayer: Kimetsu no Yaiba",
    "synopsis": "...",
    "genres": [...],
    "episodes": 26,
    "status": "Finished Airing",
    "aired": { "from": "2019-04-06", "to": "2019-09-28" },
    "score": 8.73,
    "images": { "jpg": { "large_image_url": "..." } },
    ...
  }
}
```

---

## 💡 Pro Tips

1. **Slow searches?** - Jikan API can be slow. Be patient on first search.

2. **Want to test offline?** - Add mock data to `backend/services/mock_anime.js`

3. **Want to cache results?** - Add localStorage in frontend hooks

4. **Want to add filters?** - Jikan API supports:

   ```
   ?status=airing
   ?type=tv
   ?genre=1  (action)
   ?order_by=score
   ?sort=desc
   ```

5. **Rate limiting** - Jikan API has rate limits (~60 req/min), but you won't hit this in normal use

---

## 📞 Still Having Issues?

1. **Read the logs** - Both frontend and backend console logs are detailed
2. **Check network tab** - F12 → Network tab → watch API requests
3. **Test the API** - Run `bash TEST_API.sh` (if you created it)
4. **Restart everything** - Sometimes Ctrl+C and restart fixes it

---

**Everything is using the Jikan API which requires NO authentication. It's completely free!** ✨

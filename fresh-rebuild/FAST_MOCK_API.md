# ⚡ Fast Mock API Setup

## 🚀 Now Your App is Super Fast!

By default, your app now uses a **mock API** that returns instant results (no waiting).

### ⚡ Performance Comparison

| Feature | Mock API | Jikan API |
|---------|----------|-----------|
| **Response Time** | ⚡ <5ms | 🐌 2-5 seconds |
| **Reliability** | ✅ 100% (local) | ✅ 99% (internet dependent) |
| **Data Size** | 📦 10 anime | 📚 30,000+ anime |
| **When to Use** | 👍 Development, demos | 👍 Production, full data |

---

## 🎯 What's Included in Mock Data

The mock API comes with 10 popular anime:

1. **Demon Slayer** - Action/Adventure
2. **Attack on Titan** - Action/Mystery
3. **Naruto** - Action/Adventure
4. **One Piece** - Action/Comedy
5. **Jujutsu Kaisen** - Action/Supernatural
6. **Death Note** - Psychological/Mystery
7. **Steins;Gate** - Sci-Fi/Supernatural
8. **Fullmetal Alchemist: Brotherhood** - Action/Fantasy
9. **Bleach** - Action/Supernatural
10. **Sword Art Online** - Action/Fantasy

Each includes:
- Title, synopsis, genres
- Episode count, score, air dates
- Poster images (from Jikan)
- Full details for detail page

---

## 🔄 How to Switch APIs

### Use Mock API (Default - FAST) ⚡

Your `.env` already has this set:
```
USE_MOCK_API=true
```

**No action needed!** It's already enabled.

### Use Jikan API (Real Data - Slow) 🌐

Edit `backend/.env`:
```
USE_MOCK_API=false
```

Then restart the backend:
```bash
cd backend
npm run dev
```

---

## 📊 How It Works

### Search Flow

**With Mock API (Default):**
```
User searches → 
  Frontend sends GET /api/anime?q=...  →
    Backend checks USE_MOCK_API=true →
      Returns instant mock results (< 5ms) →
        Display immediately ✅
```

**With Jikan API:**
```
User searches →
  Frontend sends GET /api/anime?q=... →
    Backend checks USE_MOCK_API=false →
      Calls Jikan API (2-5 seconds) →
        Returns real results →
          Display ⏳
```

---

## 🧪 Testing

### Test Mock API (Instant)
```bash
# Backend is running on port 5000

# Search
curl "http://localhost:5000/api/anime?q=demon"

# Should return instantly!
```

### Test Jikan API (Slow)
1. Edit `backend/.env` → `USE_MOCK_API=false`
2. Restart backend: `npm run dev`
3. Try searching
4. Notice it takes a few seconds

---

## 📝 Console Logs

You'll see different logs depending on which API is active:

### Mock API (Default)
```
📝 Controller: Searching for "Demon"
⚡ Using MOCK API (instant)
📤 Controller: Returning 1 results
```

### Jikan API
```
📝 Controller: Searching for "Demon"
🌐 Using JIKAN API (slower)
🔍 Searching for: Demon (page 1)
✅ Found 25 results
📤 Controller: Returning 25 results
```

---

## 💡 When to Use Which

### ✅ Use Mock API if:
- 🎨 You're designing/testing the UI
- 🚀 You want instant feedback
- 🔴 Jikan API is slow/down
- 📱 You're offline
- 🎬 You're giving a demo
- 💰 You want to avoid rate limits

### ✅ Use Jikan API if:
- 📚 You need more anime than 10
- 🌐 You want real/latest data
- 🎓 You're in production
- 📊 You need all genres/filters

---

## 🛠️ Adding More Mock Anime

Edit `backend/services/mockAnime.js`:

1. Find `MOCK_ANIME_DATABASE = [`
2. Add a new anime object:

```javascript
{
  mal_id: 999,
  title: "Your Anime Title",
  type: "TV",
  episodes: 24,
  status: "Finished Airing",
  aired: { from: "2023-01-01T00:00:00+00:00", to: "2023-03-31T00:00:00+00:00" },
  score: 8.5,
  synopsis: "Your anime description here",
  genres: [
    { mal_id: 1, type: "anime", name: "Action" },
    { mal_id: 2, type: "anime", name: "Comedy" }
  ],
  images: {
    jpg: {
      image_url: "https://...",
      large_image_url: "https://..."
    }
  }
}
```

3. Restart backend → New anime is searchable!

---

## ⚙️ Implementation Details

The mock API is implemented as:
- **File**: `backend/services/mockAnime.js`
- **Controller**: Updated `backend/controllers/animeController.js`
- **Toggle**: Environment variable `USE_MOCK_API`
- **Data**: 10 hardcoded anime with full details
- **Speed**: Instant (< 5ms), no network calls

---

## 🎉 Summary

✅ **Mock API is enabled by default** - Your app is now super fast!
✅ **Search and details work instantly** - No waiting for Jikan
✅ **Can switch to Jikan** - Just change `.env` and restart
✅ **Perfect for development/demos** - Use mock, switch to real when needed

**Just start coding!** Everything is already set up for speed. 🚀

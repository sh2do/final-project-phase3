# Project Tree - Anime Tracker Fresh Rebuild

```
fresh-rebuild/
│
├─ 📄 setup.sh                         Installation script
├─ 📄 QUICK_START.md                   How to run (start here!)
├─ 📄 README.md                        Project overview
├─ 📄 COMPLETE_GUIDE.md                Detailed documentation
├─ 📄 PROJECT_SUMMARY.sh               This summary
│
│
├─ backend/                            Express.js server
│  ├─ 📄 server.js                     Main entry point (starts server)
│  ├─ 📄 package.json                  Dependencies & scripts
│  ├─ 📄 .env                          Configuration (PORT, etc.)
│  │
│  ├─ routes/
│  │  └─ 📄 anime.js                   Route definitions
│  │                                    GET /api/anime?q=...
│  │                                    GET /api/anime/:id
│  │
│  ├─ controllers/
│  │  └─ 📄 animeController.js         Business logic
│  │                                    searchAnime()
│  │                                    getAnimeById()
│  │
│  └─ utils/
│     └─ 📄 jikan.js                   Jikan API wrapper
│                                       Calls: https://api.jikan.moe/v4
│
│
└─ frontend/                           React app (Vite + Tailwind)
   ├─ 📄 index.html                    HTML entry point
   ├─ 📄 package.json                  Dependencies & scripts
   ├─ 📄 vite.config.js                Vite configuration
   ├─ 📄 tailwind.config.js            Tailwind CSS config
   ├─ 📄 postcss.config.js             PostCSS config
   │
   └─ src/
      ├─ 📄 main.jsx                   React entry point
      │                                 Sets up Router with 2 pages
      │
      ├─ components/                   Reusable components
      │  ├─ 📄 AnimeCard.jsx           Shows one anime card
      │  │                              Props: anime, onClick
      │  │                              Displays: image, title, type, episodes
      │  │
      │  └─ 📄 SearchBar.jsx           Search input component
      │                                 Props: onSearch
      │                                 Real-time search on change
      │
      ├─ pages/                        Full pages (routes)
      │  ├─ 📄 HomePage.jsx            Search page (/)
      │  │                              Shows SearchBar + results grid
      │  │                              Uses: useAnimeSearch hook
      │  │
      │  └─ 📄 DetailPage.jsx          Detail page (/anime/:id)
      │                                 Shows full anime info
      │                                 Uses: useAnimeDetail hook
      │
      ├─ hooks/                        Custom React hooks
      │  ├─ 📄 useAnimeSearch.js       Search logic
      │  │                              Manages: results, loading, error
      │  │                              Calls: /api/anime?q=...
      │  │
      │  └─ 📄 useAnimeDetail.js       Detail page logic
      │                                 Manages: anime, loading, error
      │                                 Calls: /api/anime/:id
      │
      └─ styles/
         └─ 📄 index.css               Global styles + Tailwind imports


═══════════════════════════════════════════════════════════════════════════════

WHAT EACH FILE DOES
═══════════════════════════════════════════════════════════════════════════════

BACKEND FILES
─────────────

server.js
  • Creates Express app
  • Configures CORS
  • Sets up routes
  • Starts listening on port 5000

package.json
  • Lists dependencies (express, cors, axios, dotenv)
  • Defines scripts: "start" and "dev"

.env
  • PORT=5000
  • NODE_ENV=development
  • JIKAN_API=https://api.jikan.moe/v4

routes/anime.js
  • Router definition
  • Maps GET requests to controller methods
  • GET /api/anime → searchAnime()
  • GET /api/anime/:id → getAnimeById()

controllers/animeController.js
  • searchAnime(req, res) → searches Jikan, returns results
  • getAnimeById(req, res) → gets full details from Jikan

utils/jikan.js
  • searchAnime(query, page) → axios call to Jikan API
  • getAnimeById(id) → axios call to Jikan API
  • Error handling for API failures


FRONTEND FILES
──────────────

index.html
  • Simple HTML with one <div id="root"></div>
  • Loads main.jsx

package.json
  • Lists dependencies (react, vite, tailwind, etc.)
  • Scripts: "dev" (dev server), "build" (production build)

vite.config.js
  • Configures Vite with React plugin
  • Sets dev server port to 5173

tailwind.config.js
  • Configures Tailwind CSS
  • Scans src/ for class names

postcss.config.js
  • Configures PostCSS with autoprefixer

main.jsx
  • Renders React app to DOM
  • Sets up React Router with 2 routes:
    • / → HomePage
    • /anime/:id → DetailPage

components/AnimeCard.jsx
  • Receives anime object as prop
  • Displays card with image, title, type, episodes
  • onClick navigates to detail page

components/SearchBar.jsx
  • Text input for searching
  • onChange callback triggers search
  • Calls onSearch(value) on every keystroke

pages/HomePage.jsx
  • Renders SearchBar + anime grid
  • Uses useAnimeSearch hook
  • Shows loading spinner while fetching
  • Shows error if API fails
  • Maps results to AnimeCard components

pages/DetailPage.jsx
  • Gets anime ID from URL params
  • Uses useAnimeDetail hook
  • Shows full anime information
  • Back button returns to homepage

hooks/useAnimeSearch.js
  • Custom hook for search logic
  • Returns: { results, loading, error, search }
  • Manages state for search results
  • Handles API errors

hooks/useAnimeDetail.js
  • Custom hook for detail page
  • Returns: { anime, loading, error }
  • Fetches anime data on mount
  • Dependencies: [id]

styles/index.css
  • @tailwind directives for CSS
  • Global styles (reset, fonts, etc.)


═══════════════════════════════════════════════════════════════════════════════

DATA FLOW EXAMPLES
═══════════════════════════════════════════════════════════════════════════════

EXAMPLE 1: Search Flow
─────────────────────

User types "Demon Slayer" in SearchBar
         ↓
onChange event → onSearch("Demon Slayer")
         ↓
HomePage.search() called
         ↓
useAnimeSearch.search("Demon Slayer") called
         ↓
fetch("http://localhost:5000/api/anime?q=Demon%20Slayer")
         ↓
Backend receives: GET /api/anime?q=Demon%20Slayer
         ↓
routes/anime.js → animeController.searchAnime()
         ↓
controller calls: jikan.searchAnime("Demon Slayer", 1)
         ↓
jikan.js sends: axios.get("https://api.jikan.moe/v4/anime",
                { params: { query: "Demon Slayer", ... } })
         ↓
Jikan API returns anime array
         ↓
Backend returns to frontend
         ↓
useAnimeSearch updates state: setResults(data.data)
         ↓
HomePage rerenders with results
         ↓
Results mapped to AnimeCard components
         ↓
User sees grid of "Demon Slayer" anime


EXAMPLE 2: Detail View Flow
───────────────────────────

User clicks AnimeCard with mal_id=38480
         ↓
onClick={() => navigate(`/anime/38480`)}
         ↓
URL changes to /anime/38480
         ↓
DetailPage component mounts with id=38480
         ↓
useAnimeDetail(38480) hook runs
         ↓
useEffect fetches data on mount
         ↓
fetch("http://localhost:5000/api/anime/38480")
         ↓
Backend receives: GET /api/anime/38480
         ↓
routes/anime.js → animeController.getAnimeById()
         ↓
controller calls: jikan.getAnimeById(38480)
         ↓
jikan.js sends: axios.get("https://api.jikan.moe/v4/anime/38480")
         ↓
Jikan API returns full anime object with:
   - title, synopsis, genres
   - score, episodes, status
   - air dates, image URLs, etc.
         ↓
Backend returns full object to frontend
         ↓
useAnimeDetail updates state: setAnime(data.data)
         ↓
DetailPage rerenders with full info
         ↓
User sees anime detail page


═══════════════════════════════════════════════════════════════════════════════

DEPENDENCIES EXPLAINED
═══════════════════════════════════════════════════════════════════════════════

Backend Dependencies:
  • express (4.18.2)       → Web framework
  • cors (2.8.5)           → Enable cross-origin requests
  • axios (1.6.0)          → HTTP client for API calls
  • dotenv (16.3.1)        → Load environment variables

Frontend Dependencies:
  • react (18.2.0)         → UI library
  • react-dom (18.2.0)     → React DOM rendering
  • react-router-dom (6.20) → Page routing

Frontend Dev Dependencies:
  • @vitejs/plugin-react-swc  → Vite React plugin (fast)
  • vite (5.0.8)               → Build tool
  • tailwindcss (3.3.6)        → CSS utility framework
  • autoprefixer (10.4.16)     → CSS vendor prefixes
  • postcss (8.4.32)           → CSS processor
  • typescript (optional)      → Type checking


═══════════════════════════════════════════════════════════════════════════════

KEY DECISIONS MADE
═══════════════════════════════════════════════════════════════════════════════

✓ Used Express instead of FastAPI
  → Simpler for this use case, no database needed
  → Easier to modify and extend
  → Node.js has better frontend ecosystem

✓ Used Jikan API directly
  → No database setup required
  → Free and public
  → Rich data (lots of anime info)
  → No authentication needed

✓ Two-route backend
  → Simple, clear, easy to understand
  → No complex logic
  → Direct API passthrough with minimal processing

✓ React hooks only (no Context/Redux)
  → State is simple (just search results + detail)
  → Overkill to add complex state management now
  → Easy to add later if needed

✓ Tailwind CSS
  → Quick to style
  → Responsive by default
  → No CSS file bloat
  → Easy to customize

✓ No build step complications
  → Vite is fast (sub-second rebuilds)
  → Hot Module Replacement (HMR) for fast dev
  → Simple vite.config.js


═══════════════════════════════════════════════════════════════════════════════

TOTAL PROJECT SIZE
═══════════════════════════════════════════════════════════════════════════════

Backend code:      ~300 lines
Frontend code:     ~400 lines
Configuration:     ~100 lines
Documentation:     ~1000 lines

Total:             ~1800 lines (mostly docs)
Actual code:       ~700 lines (very lean!)


═══════════════════════════════════════════════════════════════════════════════

That's the complete project! 🎉

Everything is set up, documented, and ready to run.

Next step: bash setup.sh

═══════════════════════════════════════════════════════════════════════════════
```

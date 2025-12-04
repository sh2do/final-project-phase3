#!/bin/bash

# Display beautiful setup instructions

cat << 'EOF'

╔══════════════════════════════════════════════════════════════════════════════╗
║                                                                              ║
║                  🎬 ANIME TRACKER - LET'S GET IT RUNNING! 🎬                ║
║                                                                              ║
║                              3 Simple Steps                                  ║
║                                                                              ║
╚══════════════════════════════════════════════════════════════════════════════╝


STEP 1: NAVIGATE TO PROJECT
════════════════════════════════════════════════════════════════════════════════

  cd fresh-rebuild

This folder has everything you need - backend, frontend, and docs.


STEP 2: INSTALL DEPENDENCIES
════════════════════════════════════════════════════════════════════════════════

  bash setup.sh

This will:
  • Install npm packages for backend
  • Install npm packages for frontend
  
Expected output: ✅ Setup complete!

(Only need to do this once. Takes ~1-2 minutes.)


STEP 3: START BOTH SERVERS
════════════════════════════════════════════════════════════════════════════════

You need TWO terminals open.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Terminal 1 - START BACKEND
─────────────────────────────

  cd fresh-rebuild/backend
  npm run dev

Expected output:
  🚀 Backend running at http://localhost:5000
  📍 API: http://localhost:5000/api/anime

If you see this, backend is ready! ✅

Leave this terminal open and don't close it.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Terminal 2 - START FRONTEND
────────────────────────────

In a new terminal:

  cd fresh-rebuild/frontend
  npm run dev

Expected output:
  VITE v5.0.0 ready in 234 ms

  ➜  Local:   http://localhost:5173/
  ➜  press h + enter to show help

If you see this, frontend is ready! ✅

Leave this terminal open too.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━


STEP 4: OPEN IN BROWSER
════════════════════════════════════════════════════════════════════════════════

  http://localhost:5173

The app should load! You'll see the Anime Tracker home page.

Now you can:
  1. Type an anime name in the search bar
  2. Press Enter or wait for results
  3. Click any anime to see full details
  4. Click "Back" to return to search


🎉 YOU'RE DONE!
════════════════════════════════════════════════════════════════════════════════

Your anime tracker is running!

Both servers are now:
  ✅ Backend API running on http://localhost:5000
  ✅ Frontend app running on http://localhost:5173


📝 THINGS TO TRY
════════════════════════════════════════════════════════════════════════════════

Search suggestions:
  • Demon Slayer (action)
  • Jujutsu Kaisen (supernatural)
  • Attack on Titan (mystery)
  • One Piece (adventure)
  • Death Note (psychological)
  • Naruto (long series)
  • Steins;Gate (sci-fi)


🔍 HOW TO DEBUG
════════════════════════════════════════════════════════════════════════════════

If something goes wrong:

1. Check the browser console (F12)
   • Any error messages?
   • Look for "Failed to fetch"

2. Check backend terminal
   • Any error messages?
   • Is server still running?

3. Test API manually
   In another terminal:
   curl http://localhost:5000/api/anime?q=test
   
   Should return anime data.

4. Common fixes:
   • Backend not running? See Terminal 1 instructions above
   • Frontend not running? See Terminal 2 instructions above
   • Port in use? Kill other process on that port
   • Dependencies missing? Run: npm install in that folder


📖 DOCUMENTATION
════════════════════════════════════════════════════════════════════════════════

You have several docs to help:

  QUICK_START.md       → How to run (what you're reading now)
  README.md            → Project overview
  COMPLETE_GUIDE.md    → Detailed explanations
  PROJECT_TREE.md      → File structure & what each file does


💻 TERMINAL COMMANDS REFERENCE
════════════════════════════════════════════════════════════════════════════════

Useful commands while developing:

# Kill a server
Ctrl+C (in the terminal running it)

# Check if a port is in use
lsof -i :5000    (for backend)
lsof -i :5173    (for frontend)

# Kill a process on a port
kill -9 <PID>

# Reinstall dependencies
rm -rf node_modules && npm install

# Check Node version
node --version

# Check npm version
npm --version


🎓 NEXT STEPS TO LEARN
════════════════════════════════════════════════════════════════════════════════

Now that it's running:

1. Look at the React code
   Read: src/components/AnimeCard.jsx
   Read: src/pages/HomePage.jsx

2. Look at the Express code
   Read: backend/server.js
   Read: backend/routes/anime.js

3. Try modifying something
   Change colors in Tailwind classes
   Add a new feature (like favorites)
   Change the page title

4. Understand the data flow
   Read: PROJECT_TREE.md → Data Flow Examples


🚀 YOU'RE ALL SET!
════════════════════════════════════════════════════════════════════════════════

Enjoy your anime tracker! It's fully functional and ready to use.

Questions? Check the documentation files or look at the code.

Happy coding! 🎉

EOF

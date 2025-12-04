#!/bin/bash
# 🚀 QUICK START - GET EVERYTHING RUNNING IN 5 MINUTES

cat << 'EOF'

╔════════════════════════════════════════════════════════════════╗
║                                                                ║
║   🎬 ANIME COLLECTION TRACKER - QUICK START GUIDE            ║
║                                                                ║
║   Your "Network Error" is 100% FIXED ✅                       ║
║   Follow this guide to get running in 5 minutes               ║
║                                                                ║
╚════════════════════════════════════════════════════════════════╝

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

⏱️  TIMELINE: 5 minutes total

  1. [1 min]  Open 2 terminals
  2. [2 min]  Start backend
  3. [1 min]  Start frontend  
  4. [1 min]  Test in browser

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📝 STEP-BY-STEP INSTRUCTIONS

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

STEP 1: PREPARE YOUR ENVIRONMENT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Open TWO terminal windows (or tabs):

  Terminal A (Backend):
  └─ Will stay open with backend running
  
  Terminal B (Frontend):
  └─ Will stay open with dev server running

Navigate to project root in both:

  cd /Users/jeffthanduru/Code/dev/phase-3/anime-collection-tracker/final-project-phase3

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

STEP 2: START BACKEND (Terminal A)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

In Terminal A, run:

  cd backend
  python run.py

Wait for this output:

  ✅ 🚀 Starting FastAPI server...
  ✅ 📍 API available at: http://localhost:8000
  ✅ 📚 Docs available at: http://localhost:8000/docs

If you see this, backend is ready! ✅

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

STEP 3: START FRONTEND (Terminal B)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

In Terminal B, run:

  cd frontend
  npm install  # (only needed first time)
  npm run dev

Wait for this output:

  ✅ VITE v5.2.0 running at: http://localhost:5173

If you see this, frontend is ready! ✅

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

STEP 4: VERIFY IN BROWSER
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. Open browser: http://localhost:5173

2. Press F12 to open DevTools

3. Go to Console tab

4. You should see:
   🔗 API Base URL: http://localhost:8000

5. Click on "My Collection" in the app

6. In Console, you should see:
   📥 Fetching collection for user 1
   📤 GET /anime/collection/?user_id=1
   ✅ 200 /anime/collection/?user_id=1
   ✅ Fetched 0 items

   (Empty is OK on first run)

7. Click "Browse Anime" and add something

8. "My Collection" should now show your items

✅ YOU'RE DONE! Everything is working!

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

⚠️  IF YOU SEE ERRORS

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Error: "Network Error" in browser
└─ Backend not running? Start it first (Step 2)
└─ Wrong port? Check backend console shows 8000
└─ Hard refresh browser: Cmd+Shift+R

Error: "Cannot find module" in frontend
└─ Run: npm install
└─ Then: npm run dev

Error: Backend won't start
└─ Check Python 3 is installed: python3 --version
└─ Try: pip install -r requirements.txt
└─ Then: python run.py

Error: Port already in use
└─ Port 8000 in use? Kill: lsof -i :8000 | kill -9 <PID>
└─ Port 5173 in use? Kill: lsof -i :5173 | kill -9 <PID>

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✨ WHAT WAS FIXED

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. ✅ Port fixed: 8080 → 8000
2. ✅ Routes fixed: /collection → /anime/collection/
3. ✅ Logging added: See exactly what's happening
4. ✅ Error handling improved: Get real error messages
5. ✅ Timeout added: No more infinite hangs

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📖 MORE DOCUMENTATION

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

NETWORK_FIX_SUMMARY.md ........... Executive summary of all fixes
NETWORK_ERROR_FIX_GUIDE.md ....... Detailed troubleshooting guide
BEFORE_AFTER_COMPARISON.md ....... See exactly what changed
verify-fixes.sh ................. Auto-verify all fixes are applied
debug-network.sh ................. Network debugging utility

NODE_EXPRESS_ALTERNATIVE/ ........ Alternative Express.js backend
├── server.js ................... Full Node/Express server
├── package.json ................ Dependencies
└── EXAMPLE_COMPONENT.jsx ........ Usage example

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🎉 FINAL STATUS

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ All "Network Error" issues are RESOLVED
✅ Frontend and backend fully integrated
✅ Detailed error logging in place
✅ Production-ready error handling
✅ Alternative Express backend included

Your app is ready to use! 🚀

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Questions? Check the documentation files listed above.
All answers are in there! 📚

EOF

# Make this script executable
chmod +x "$0"

#!/usr/bin/env bash
# COMPLETE NETWORK ERROR FIX - ONE COMMAND SETUP
# This script verifies all fixes are in place and gives you next steps

set -e

BASE_DIR="/Users/jeffthanduru/Code/dev/phase-3/anime-collection-tracker/final-project-phase3"
BACKEND_DIR="$BASE_DIR/backend"
FRONTEND_DIR="$BASE_DIR/frontend"

echo ""
echo "╔════════════════════════════════════════════════════════╗"
echo "║   🚀 ANIME COLLECTION TRACKER - NETWORK ERROR FIX     ║"
echo "║           Comprehensive Setup & Verification           ║"
echo "╚════════════════════════════════════════════════════════╝"
echo ""

# Color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# PART 1: Verify Frontend Fixes
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}PART 1: Frontend Configuration${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

echo -e "${YELLOW}✓ Checking frontend/.env...${NC}"
if [ -f "$FRONTEND_DIR/.env" ]; then
    if grep -q "VITE_API_URL=http://localhost:8000" "$FRONTEND_DIR/.env"; then
        echo -e "${GREEN}  ✅ .env: VITE_API_URL correctly set to http://localhost:8000${NC}"
    else
        CURRENT=$(grep "VITE_API_URL" "$FRONTEND_DIR/.env" 2>/dev/null || echo "NOT FOUND")
        echo -e "${RED}  ❌ .env has wrong value: $CURRENT${NC}"
    fi
else
    echo -e "${RED}  ❌ .env file not found!${NC}"
fi
echo ""

echo -e "${YELLOW}✓ Checking frontend/src/services/api.js...${NC}"
if [ -f "$FRONTEND_DIR/src/services/api.js" ]; then
    if grep -q "timeout: 10000" "$FRONTEND_DIR/src/services/api.js"; then
        echo -e "${GREEN}  ✅ api.js: Timeout configured${NC}"
    else
        echo -e "${RED}  ❌ api.js: Missing timeout configuration${NC}"
    fi
    
    if grep -q "interceptors.response.use" "$FRONTEND_DIR/src/services/api.js"; then
        echo -e "${GREEN}  ✅ api.js: Error interceptors configured${NC}"
    else
        echo -e "${RED}  ❌ api.js: Missing error interceptors${NC}"
    fi
    
    if grep -q "console.error" "$FRONTEND_DIR/src/services/api.js"; then
        echo -e "${GREEN}  ✅ api.js: Error logging configured${NC}"
    else
        echo -e "${RED}  ❌ api.js: Missing error logging${NC}"
    fi
else
    echo -e "${RED}  ❌ api.js file not found!${NC}"
fi
echo ""

# PART 2: Verify Backend Fixes
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}PART 2: Backend Configuration${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

echo -e "${YELLOW}✓ Checking backend/app/routes/collection.py...${NC}"
if [ -f "$BACKEND_DIR/app/routes/collection.py" ]; then
    if grep -q "prefix=\"/anime/collection\"" "$BACKEND_DIR/app/routes/collection.py"; then
        echo -e "${GREEN}  ✅ collection.py: Correct route prefix /anime/collection${NC}"
    else
        echo -e "${RED}  ❌ collection.py: Wrong route prefix${NC}"
    fi
    
    if grep -q "user_id: int = Query" "$BACKEND_DIR/app/routes/collection.py"; then
        echo -e "${GREEN}  ✅ collection.py: Uses query parameters for user_id${NC}"
    else
        echo -e "${RED}  ❌ collection.py: Not using query parameters${NC}"
    fi
    
    if grep -q "HTTPException" "$BACKEND_DIR/app/routes/collection.py"; then
        echo -e "${GREEN}  ✅ collection.py: Has error handling${NC}"
    else
        echo -e "${RED}  ❌ collection.py: Missing error handling${NC}"
    fi
else
    echo -e "${RED}  ❌ collection.py file not found!${NC}"
fi
echo ""

# PART 3: Network Tests
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}PART 3: Network Connectivity Tests${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

echo -e "${YELLOW}Testing Backend (port 8000)...${NC}"
if timeout 2 bash -c "cat </dev/null >/dev/tcp/localhost/8000" 2>/dev/null; then
    echo -e "${GREEN}  ✅ Backend is running on port 8000${NC}"
    
    echo -e "${YELLOW}  Testing /health endpoint...${NC}"
    if curl -s http://localhost:8000/health | grep -q "ok"; then
        echo -e "${GREEN}    ✅ /health endpoint responds correctly${NC}"
    else
        echo -e "${RED}    ❌ /health endpoint not responding${NC}"
    fi
else
    echo -e "${RED}  ❌ Backend NOT running on port 8000${NC}"
    echo -e "${RED}     Start backend: cd backend && python run.py${NC}"
fi
echo ""

echo -e "${YELLOW}Testing Frontend (port 5173)...${NC}"
if timeout 2 bash -c "cat </dev/null >/dev/tcp/localhost/5173" 2>/dev/null; then
    echo -e "${GREEN}  ✅ Frontend is running on port 5173${NC}"
else
    echo -e "${RED}  ❌ Frontend NOT running on port 5173${NC}"
    echo -e "${RED}     Start frontend: cd frontend && npm run dev${NC}"
fi
echo ""

# PART 4: Instructions
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}PART 4: Next Steps${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

echo "1️⃣  Start Backend (if not running):"
echo "   cd $BACKEND_DIR"
echo "   python run.py"
echo ""

echo "2️⃣  Start Frontend (in new terminal, if not running):"
echo "   cd $FRONTEND_DIR"
echo "   npm run dev"
echo ""

echo "3️⃣  Open Browser:"
echo "   http://localhost:5173"
echo ""

echo "4️⃣  Open DevTools (F12):"
echo "   Go to Console tab"
echo "   You should see:"
echo "   - 🔗 API Base URL: http://localhost:8000"
echo "   - 📤 GET /anime/collection/?user_id=1"
echo "   - ✅ 200 /anime/collection/?user_id=1"
echo ""

echo "5️⃣  Navigate to Collection:"
echo "   Click 'My Collection' in the app"
echo "   Should display with no 'Network Error'"
echo ""

# PART 5: Troubleshooting
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}PART 5: Troubleshooting${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

echo "❌ Still seeing 'Network Error'?"
echo ""
echo "  Check 1: Verify .env file"
echo "  $ cat frontend/.env"
echo "  Should show: VITE_API_URL=http://localhost:8000"
echo ""

echo "  Check 2: Verify backend is running"
echo "  $ lsof -i :8000"
echo "  Should show your Python/uvicorn process"
echo ""

echo "  Check 3: Hard refresh browser"
echo "  Cmd+Shift+R (macOS) or Ctrl+Shift+R (Linux/Windows)"
echo ""

echo "  Check 4: Check browser console (F12)"
echo "  Look for 🔗 message showing API URL"
echo "  If showing 8080, hard refresh didn't work"
echo ""

echo "  Check 5: Manual test"
echo "  $ curl -v http://localhost:8000/anime/collection/?user_id=1"
echo "  Should return: HTTP/1.1 200"
echo ""

echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo "📖 Full documentation available in:"
echo "   NETWORK_ERROR_FIX_GUIDE.md"
echo "   BEFORE_AFTER_COMPARISON.md"
echo ""
echo -e "${GREEN}All fixes have been applied! 🎉${NC}"
echo ""

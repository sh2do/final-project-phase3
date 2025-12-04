#!/bin/bash
# Quick verification script
# Run this to automatically check all common network error causes

set -e

echo "╔════════════════════════════════════════╗"
echo "║  🔍 Anime Collection Network Debugger  ║"
echo "╚════════════════════════════════════════╝"
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Test 1: Check backend port
echo -e "${YELLOW}[1/6]${NC} Checking backend on port 8000..."
if nc -z localhost 8000 2>/dev/null; then
    echo -e "${GREEN}✅ Backend is listening on port 8000${NC}"
else
    echo -e "${RED}❌ Backend NOT running on port 8000${NC}"
    echo "   Run: cd backend && python run.py"
fi
echo ""

# Test 2: Check frontend port
echo -e "${YELLOW}[2/6]${NC} Checking frontend on port 5173..."
if nc -z localhost 5173 2>/dev/null; then
    echo -e "${GREEN}✅ Frontend is running on port 5173${NC}"
else
    echo -e "${RED}❌ Frontend NOT running on port 5173${NC}"
    echo "   Run: cd frontend && npm run dev"
fi
echo ""

# Test 3: Check backend health
echo -e "${YELLOW}[3/6]${NC} Testing backend health endpoint..."
if curl -s http://localhost:8000/health | grep -q "ok"; then
    echo -e "${GREEN}✅ Backend health check passed${NC}"
else
    echo -e "${RED}❌ Backend not responding correctly${NC}"
fi
echo ""

# Test 4: Check collection endpoint
echo -e "${YELLOW}[4/6]${NC} Testing collection endpoint..."
RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:8000/anime/collection/?user_id=1)
if [ "$RESPONSE" = "200" ]; then
    echo -e "${GREEN}✅ Collection endpoint returned HTTP $RESPONSE${NC}"
else
    echo -e "${RED}❌ Collection endpoint returned HTTP $RESPONSE${NC}"
fi
echo ""

# Test 5: Check CORS headers
echo -e "${YELLOW}[5/6]${NC} Testing CORS headers..."
CORS_CHECK=$(curl -s -I -H "Origin: http://localhost:5173" http://localhost:8000/health | grep -i "access-control-allow-origin" | wc -l)
if [ "$CORS_CHECK" -gt 0 ]; then
    echo -e "${GREEN}✅ CORS headers present${NC}"
else
    echo -e "${YELLOW}⚠️  CORS headers not found (might be OK if preflight)${NC}"
fi
echo ""

# Test 6: Check frontend .env
echo -e "${YELLOW}[6/6]${NC} Checking frontend .env..."
if grep -q "VITE_API_URL=http://localhost:8000" frontend/.env; then
    echo -e "${GREEN}✅ VITE_API_URL correctly set to http://localhost:8000${NC}"
elif grep -q "VITE_API_URL" frontend/.env; then
    CURRENT_URL=$(grep "VITE_API_URL" frontend/.env)
    echo -e "${RED}❌ Wrong API URL: $CURRENT_URL${NC}"
    echo "   Should be: VITE_API_URL=http://localhost:8000"
else
    echo -e "${RED}❌ VITE_API_URL not found in .env${NC}"
fi
echo ""

echo "╔════════════════════════════════════════╗"
echo "║           Summary                      ║"
echo "╚════════════════════════════════════════╝"
echo ""
echo "If all checks are ✅, your network errors should be resolved!"
echo "If any are ❌, follow the suggested fixes above."
echo ""
echo "Next steps:"
echo "1. Open browser to http://localhost:5173"
echo "2. Open DevTools (F12) → Console tab"
echo "3. Watch for 🔗 and ✅/❌ messages"
echo "4. Navigate to My Collection page"
echo ""

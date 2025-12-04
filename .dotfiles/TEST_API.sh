#!/bin/bash

# Test the anime API locally

echo "╔═══════════════════════════════════════════════════════════════╗"
echo "║            Testing Anime Tracker API                         ║"
echo "╚═══════════════════════════════════════════════════════════════╝"
echo ""

BACKEND_URL="http://localhost:5000"

# Check if backend is running
echo "1️⃣  Checking if backend is running..."
if ! curl -s "$BACKEND_URL/health" > /dev/null; then
  echo "❌ Backend is not running!"
  echo "   Start it with: cd backend && npm run dev"
  exit 1
fi
echo "✅ Backend is running at $BACKEND_URL"
echo ""

# Test health endpoint
echo "2️⃣  Testing health endpoint..."
curl -s "$BACKEND_URL/health" | python3 -m json.tool
echo ""

# Test search endpoint
echo "3️⃣  Testing search endpoint..."
echo "   Searching for 'Demon Slayer'..."
curl -s "$BACKEND_URL/api/anime?q=Demon%20Slayer" | python3 -m json.tool | head -50
echo ""
echo "   (Truncated output, full response is longer)"
echo ""

# Test detail endpoint
echo "4️⃣  Testing detail endpoint..."
echo "   Fetching anime with ID 38480 (Demon Slayer)..."
curl -s "$BACKEND_URL/api/anime/38480" | python3 -m json.tool | head -80
echo ""
echo "   (Truncated output, full response is longer)"
echo ""

echo "╔═══════════════════════════════════════════════════════════════╗"
echo "✅ All tests completed!                                         ║"
echo "╚═══════════════════════════════════════════════════════════════╝"

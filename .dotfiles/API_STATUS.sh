#!/bin/bash

# Show current API configuration

echo ""
echo "╔═══════════════════════════════════════════════════════════════╗"
echo "║              🚀 ANIME TRACKER - API STATUS 🚀                ║"
echo "╚═══════════════════════════════════════════════════════════════╝"
echo ""

# Read .env
MOCK_API=$(grep "USE_MOCK_API" backend/.env | cut -d '=' -f 2 | tr -d ' ')

if [ "$MOCK_API" = "true" ]; then
  echo "⚡ CURRENT: MOCK API (FAST - Instant Results)"
  echo ""
  echo "  Features:"
  echo "    ✅ Response time: < 5ms"
  echo "    ✅ 10 popular anime included"
  echo "    ✅ Perfect for development/demos"
  echo "    ✅ No network delays"
  echo ""
  echo "  Anime available:"
  echo "    • Demon Slayer"
  echo "    • Attack on Titan"
  echo "    • Naruto"
  echo "    • One Piece"
  echo "    • Jujutsu Kaisen"
  echo "    • Death Note"
  echo "    • Steins;Gate"
  echo "    • Fullmetal Alchemist"
  echo "    • Bleach"
  echo "    • Sword Art Online"
  echo ""
  echo "  To switch to Jikan API:"
  echo "    1. Edit: backend/.env"
  echo "    2. Change: USE_MOCK_API=false"
  echo "    3. Restart: cd backend && npm run dev"
  echo ""
else
  echo "🌐 CURRENT: JIKAN API (REAL DATA - Slower)"
  echo ""
  echo "  Features:"
  echo "    ✅ Response time: 2-5 seconds"
  echo "    ✅ 30,000+ anime available"
  echo "    ✅ Real, up-to-date data"
  echo "    ✅ Full database access"
  echo ""
  echo "  To switch to Mock API:"
  echo "    1. Edit: backend/.env"
  echo "    2. Change: USE_MOCK_API=true"
  echo "    3. Restart: cd backend && npm run dev"
  echo ""
fi

echo "═══════════════════════════════════════════════════════════════"
echo ""
echo "📖 For more info:"
echo "   Read: FAST_MOCK_API.md"
echo ""

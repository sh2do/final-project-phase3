#!/bin/bash

# Easy API switcher - Toggle between Mock and Jikan API

echo ""
echo "╔═══════════════════════════════════════════════════════════════╗"
echo "║              🔄 API SWITCHER - Mock vs Jikan                 ║"
echo "╚═══════════════════════════════════════════════════════════════╝"
echo ""

cd "$(dirname "$0")/backend" || exit 1

# Show current setting
CURRENT=$(grep "USE_MOCK_API" .env | cut -d '=' -f 2 | tr -d ' ')

echo "Current API: USE_MOCK_API=$CURRENT"
echo ""
echo "Choose which API to use:"
echo ""
echo "  1️⃣  Mock API (FAST - Instant, 10 anime)"
echo "  2️⃣  Jikan API (SLOW - Real data, 30,000+ anime)"
echo "  3️⃣  Show status"
echo "  q) Exit"
echo ""
read -p "Enter choice (1, 2, 3, or q): " choice

case $choice in
  1)
    echo ""
    echo "Setting USE_MOCK_API=true..."
    sed -i '' 's/USE_MOCK_API=.*/USE_MOCK_API=true/' .env
    echo "✅ Switched to Mock API"
    echo ""
    echo "Now restart backend:"
    echo "  cd backend"
    echo "  npm run dev"
    echo ""
    ;;
  2)
    echo ""
    echo "Setting USE_MOCK_API=false..."
    sed -i '' 's/USE_MOCK_API=.*/USE_MOCK_API=false/' .env
    echo "✅ Switched to Jikan API"
    echo ""
    echo "Now restart backend:"
    echo "  cd backend"
    echo "  npm run dev"
    echo ""
    ;;
  3)
    SETTING=$(grep "USE_MOCK_API" .env | cut -d '=' -f 2 | tr -d ' ')
    echo ""
    if [ "$SETTING" = "true" ]; then
      echo "📊 API Status:"
      echo "  Mode: ⚡ Mock API (FAST)"
      echo "  Response: < 5ms"
      echo "  Anime: 10 popular titles"
      echo "  Perfect for: Development, demos, offline"
    else
      echo "📊 API Status:"
      echo "  Mode: 🌐 Jikan API (REAL)"
      echo "  Response: 2-5 seconds"
      echo "  Anime: 30,000+ titles"
      echo "  Perfect for: Production, full data"
    fi
    echo ""
    ;;
  q)
    echo "Goodbye! 👋"
    exit 0
    ;;
  *)
    echo "❌ Invalid choice"
    exit 1
    ;;
esac

echo "═══════════════════════════════════════════════════════════════"

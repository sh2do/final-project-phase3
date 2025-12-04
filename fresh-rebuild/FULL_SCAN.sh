#!/bin/bash

# Comprehensive file scan and verification report

echo "╔═══════════════════════════════════════════════════════════════════════════════╗"
echo "║                                                                               ║"
echo "║                   📋 FULL PROJECT SCAN & VERIFICATION REPORT 📋             ║"
echo "║                                                                               ║"
echo "╚═══════════════════════════════════════════════════════════════════════════════╝"
echo ""

PROJECT_DIR="$(cd "$(dirname "$0")" && pwd)"
BACKEND_DIR="$PROJECT_DIR/backend"
FRONTEND_DIR="$PROJECT_DIR/frontend"

# Counter variables
ERRORS=0
WARNINGS=0
CHECKS_PASSED=0

echo "═══════════════════════════════════════════════════════════════════════════════"
echo "1️⃣  BACKEND FILE STRUCTURE CHECK"
echo "═══════════════════════════════════════════════════════════════════════════════"

# Check backend files exist
backend_files=(
  "server.js"
  "package.json"
  ".env"
  "routes/anime.js"
  "controllers/animeController.js"
  "utils/jikan.js"
  "services/mockAnime.js"
)

for file in "${backend_files[@]}"; do
  if [ -f "$BACKEND_DIR/$file" ]; then
    echo "✅ $file"
    ((CHECKS_PASSED++))
  else
    echo "❌ $file (MISSING)"
    ((ERRORS++))
  fi
done

echo ""
echo "═══════════════════════════════════════════════════════════════════════════════"
echo "2️⃣  FRONTEND FILE STRUCTURE CHECK"
echo "═══════════════════════════════════════════════════════════════════════════════"

# Check frontend files exist
frontend_files=(
  "index.html"
  "package.json"
  "vite.config.js"
  "tailwind.config.js"
  "postcss.config.js"
  "src/main.jsx"
  "src/styles/index.css"
  "src/pages/HomePage.jsx"
  "src/pages/DetailPage.jsx"
  "src/components/AnimeCard.jsx"
  "src/components/SearchBar.jsx"
  "src/hooks/useAnimeSearch.js"
  "src/hooks/useAnimeDetail.js"
)

for file in "${frontend_files[@]}"; do
  if [ -f "$FRONTEND_DIR/$file" ]; then
    echo "✅ $file"
    ((CHECKS_PASSED++))
  else
    echo "❌ $file (MISSING)"
    ((ERRORS++))
  fi
done

echo ""
echo "═══════════════════════════════════════════════════════════════════════════════"
echo "3️⃣  BACKEND CONFIGURATION CHECK"
echo "═══════════════════════════════════════════════════════════════════════════════"

# Check .env file content
if [ -f "$BACKEND_DIR/.env" ]; then
  echo "✅ .env file exists"
  ((CHECKS_PASSED++))
  
  if grep -q "PORT=5000" "$BACKEND_DIR/.env"; then
    echo "✅ PORT=5000 configured"
    ((CHECKS_PASSED++))
  else
    echo "⚠️  PORT not set to 5000"
    ((WARNINGS++))
  fi
  
  if grep -q "USE_MOCK_API=true" "$BACKEND_DIR/.env"; then
    echo "✅ Mock API enabled"
    ((CHECKS_PASSED++))
  else
    echo "⚠️  Mock API might not be enabled"
    ((WARNINGS++))
  fi
else
  echo "❌ .env file missing"
  ((ERRORS++))
fi

echo ""
echo "═══════════════════════════════════════════════════════════════════════════════"
echo "4️⃣  CRITICAL IMPORTS/EXPORTS CHECK"
echo "═══════════════════════════════════════════════════════════════════════════════"

# Check backend imports
if grep -q "require.*jikan" "$BACKEND_DIR/controllers/animeController.js"; then
  echo "✅ animeController imports jikan utils"
  ((CHECKS_PASSED++))
else
  echo "❌ Missing jikan import in animeController"
  ((ERRORS++))
fi

if grep -q "require.*mockAnime" "$BACKEND_DIR/controllers/animeController.js"; then
  echo "✅ animeController imports mockAnime service"
  ((CHECKS_PASSED++))
else
  echo "❌ Missing mockAnime import in animeController"
  ((ERRORS++))
fi

if grep -q "module.exports" "$BACKEND_DIR/utils/jikan.js"; then
  echo "✅ jikan.js exports functions"
  ((CHECKS_PASSED++))
else
  echo "❌ jikan.js missing exports"
  ((ERRORS++))
fi

if grep -q "module.exports" "$BACKEND_DIR/services/mockAnime.js"; then
  echo "✅ mockAnime.js exports functions"
  ((CHECKS_PASSED++))
else
  echo "❌ mockAnime.js missing exports"
  ((ERRORS++))
fi

# Check frontend imports
if grep -q "import.*HomePage" "$FRONTEND_DIR/src/main.jsx"; then
  echo "✅ main.jsx imports HomePage"
  ((CHECKS_PASSED++))
else
  echo "❌ main.jsx missing HomePage import"
  ((ERRORS++))
fi

if grep -q "import.*DetailPage" "$FRONTEND_DIR/src/main.jsx"; then
  echo "✅ main.jsx imports DetailPage"
  ((CHECKS_PASSED++))
else
  echo "❌ main.jsx missing DetailPage import"
  ((ERRORS++))
fi

if grep -q "export function HomePage" "$FRONTEND_DIR/src/pages/HomePage.jsx"; then
  echo "✅ HomePage exports correctly"
  ((CHECKS_PASSED++))
else
  echo "❌ HomePage missing export"
  ((ERRORS++))
fi

echo ""
echo "═══════════════════════════════════════════════════════════════════════════════"
echo "5️⃣  MOCK API DATA CHECK"
echo "═══════════════════════════════════════════════════════════════════════════════"

if grep -q "Demon Slayer" "$BACKEND_DIR/services/mockAnime.js"; then
  echo "✅ Mock data includes Demon Slayer"
  ((CHECKS_PASSED++))
else
  echo "❌ Mock data missing Demon Slayer"
  ((ERRORS++))
fi

if grep -q "MOCK_ANIME_DATABASE" "$BACKEND_DIR/services/mockAnime.js"; then
  echo "✅ Mock database defined"
  ((CHECKS_PASSED++))
else
  echo "❌ Mock database not found"
  ((ERRORS++))
fi

echo ""
echo "═══════════════════════════════════════════════════════════════════════════════"
echo "6️⃣  API ENDPOINT ROUTES CHECK"
echo "═══════════════════════════════════════════════════════════════════════════════"

if grep -q '/api/anime' "$BACKEND_DIR/routes/anime.js"; then
  echo "✅ /api/anime route defined"
  ((CHECKS_PASSED++))
else
  echo "❌ /api/anime route missing"
  ((ERRORS++))
fi

if grep -q '/api/anime/:id' "$BACKEND_DIR/routes/anime.js"; then
  echo "✅ /api/anime/:id route defined"
  ((CHECKS_PASSED++))
else
  echo "❌ /api/anime/:id route missing"
  ((ERRORS++))
fi

echo ""
echo "═══════════════════════════════════════════════════════════════════════════════"
echo "7️⃣  FRONTEND API CONNECTIONS CHECK"
echo "═══════════════════════════════════════════════════════════════════════════════"

if grep -q "http://localhost:5000" "$FRONTEND_DIR/src/hooks/useAnimeSearch.js"; then
  echo "✅ useAnimeSearch connects to backend"
  ((CHECKS_PASSED++))
else
  echo "❌ useAnimeSearch missing backend connection"
  ((ERRORS++))
fi

if grep -q "http://localhost:5000" "$FRONTEND_DIR/src/hooks/useAnimeDetail.js"; then
  echo "✅ useAnimeDetail connects to backend"
  ((CHECKS_PASSED++))
else
  echo "❌ useAnimeDetail missing backend connection"
  ((ERRORS++))
fi

echo ""
echo "═══════════════════════════════════════════════════════════════════════════════"
echo "📊 SUMMARY"
echo "═══════════════════════════════════════════════════════════════════════════════"

echo ""
echo "  ✅ Checks Passed: $CHECKS_PASSED"
echo "  ⚠️  Warnings: $WARNINGS"
echo "  ❌ Errors: $ERRORS"
echo ""

if [ $ERRORS -eq 0 ]; then
  echo "✨ ALL CHECKS PASSED! Your project is ready to run! ✨"
  echo ""
  echo "To start:"
  echo "  Terminal 1: cd backend && npm run dev"
  echo "  Terminal 2: cd frontend && npm run dev"
  echo "  Browser: http://localhost:5173"
  exit 0
else
  echo "⚠️  There are $ERRORS error(s) that need to be fixed!"
  exit 1
fi


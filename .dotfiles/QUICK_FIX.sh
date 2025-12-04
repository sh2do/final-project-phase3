#!/bin/bash

# Quick fixes for common issues

echo "╔═══════════════════════════════════════════════════════════════╗"
echo "║            Quick Fixes for Anime Tracker                     ║"
echo "╚═══════════════════════════════════════════════════════════════╝"
echo ""

# Function to run from project root
cd "$(dirname "$0")" || exit 1

# Fix 1: Clear and reinstall dependencies
fix_dependencies() {
  echo "🔧 Fixing dependencies..."
  
  echo "  Backend..."
  cd backend
  rm -rf node_modules package-lock.json
  npm install
  cd ..
  
  echo "  Frontend..."
  cd frontend
  rm -rf node_modules package-lock.json
  npm install
  cd ..
  
  echo "✅ Dependencies reinstalled!"
}

# Fix 2: Kill ports
fix_ports() {
  echo "🔧 Killing processes on ports 5000 and 5173..."
  
  lsof -ti:5000 | xargs kill -9 2>/dev/null || true
  lsof -ti:5173 | xargs kill -9 2>/dev/null || true
  
  echo "✅ Ports cleared!"
  sleep 2
}

# Fix 3: Check environment variables
fix_env() {
  echo "🔧 Checking environment variables..."
  
  if [ ! -f backend/.env ]; then
    echo "  Creating backend/.env..."
    cat > backend/.env << 'EOF'
PORT=5000
NODE_ENV=development
JIKAN_API=https://api.jikan.moe/v4
EOF
    echo "✅ Created backend/.env"
  fi
  
  echo "✅ Environment files checked!"
}

# Fix 4: Test connectivity
test_api() {
  echo "🔧 Testing API connectivity..."
  
  echo "  Health check..."
  if curl -s http://localhost:5000/health > /dev/null; then
    echo "  ✅ Backend is running"
  else
    echo "  ❌ Backend is NOT running"
    echo "     Start it: cd backend && npm run dev"
    return 1
  fi
  
  echo "  Anime API check..."
  if curl -s "http://localhost:5000/api/anime?q=test" > /dev/null; then
    echo "  ✅ API endpoint works"
  else
    echo "  ❌ API endpoint failed"
    return 1
  fi
  
  echo "✅ All connectivity tests passed!"
}

# Show menu
echo "Choose a fix:"
echo ""
echo "  1) Reinstall all dependencies (npm install)"
echo "  2) Kill ports 5000 and 5173"
echo "  3) Check/create environment files"
echo "  4) Test API connectivity"
echo "  5) Do all fixes (1, 2, 3, 4)"
echo "  q) Quit"
echo ""
read -p "Choose (1-5, q): " choice

case $choice in
  1) fix_dependencies ;;
  2) fix_ports ;;
  3) fix_env ;;
  4) test_api ;;
  5)
    fix_dependencies
    fix_ports
    fix_env
    test_api
    ;;
  q) echo "Goodbye!"; exit 0 ;;
  *) echo "Invalid choice"; exit 1 ;;
esac

echo ""
echo "╔═══════════════════════════════════════════════════════════════╗"
echo "Done! If you need more help, see JIKAN_API_GUIDE.md            ║"
echo "╚═══════════════════════════════════════════════════════════════╝"

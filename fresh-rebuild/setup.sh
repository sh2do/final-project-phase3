#!/bin/bash

# ============================================
# ANIME TRACKER - SETUP SCRIPT
# ============================================

echo "🎬 Setting up Anime Tracker..."
echo ""

# Check if we're in the right directory
if [ ! -d "backend" ] || [ ! -d "frontend" ]; then
    echo "❌ Error: Run this script from the fresh-rebuild directory"
    echo "cd fresh-rebuild && bash setup.sh"
    exit 1
fi

# Backend setup
echo "📦 Setting up backend..."
cd backend
npm install

if [ $? -eq 0 ]; then
    echo "✅ Backend dependencies installed"
else
    echo "❌ Backend setup failed"
    exit 1
fi
cd ..

# Frontend setup
echo ""
echo "🎨 Setting up frontend..."
cd frontend
npm install

if [ $? -eq 0 ]; then
    echo "✅ Frontend dependencies installed"
else
    echo "❌ Frontend setup failed"
    exit 1
fi
cd ..

echo ""
echo "======================================"
echo "✨ Setup complete!"
echo "======================================"
echo ""
echo "Next steps:"
echo ""
echo "Terminal 1 - Start backend:"
echo "  cd backend && npm run dev"
echo ""
echo "Terminal 2 - Start frontend:"
echo "  cd frontend && npm run dev"
echo ""
echo "Then open: http://localhost:5173"
echo ""

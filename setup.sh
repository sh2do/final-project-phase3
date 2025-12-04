#!/bin/bash

# Setup script for Anime Collection Tracker

echo "🎌 Anime Collection Tracker Setup Script"
echo "========================================"

# Backend Setup
echo ""
echo "📦 Setting up Backend..."
cd backend

# Create virtual environment
if [ ! -d "venv" ]; then
    echo "Creating virtual environment..."
    python3 -m venv venv
fi

# Activate virtual environment
source venv/bin/activate

# Install dependencies
echo "Installing Python dependencies..."
pip install -r requirements.txt

# Create database
echo "Initializing database..."
alembic upgrade head

echo "✅ Backend setup complete!"
echo "To start backend: cd backend && source venv/bin/activate && python -m uvicorn app.main:app --reload"

# Frontend Setup
echo ""
echo "📦 Setting up Frontend..."
cd ../frontend

# Install npm dependencies
echo "Installing npm dependencies..."
npm install

echo "✅ Frontend setup complete!"
echo "To start frontend: cd frontend && npm run dev"

echo ""
echo "🚀 Setup Complete!"
echo ""
echo "Quick Start Commands:"
echo "  Backend:  cd backend && source venv/bin/activate && python -m uvicorn app.main:app --reload"
echo "  Frontend: cd frontend && npm run dev"
echo ""
echo "Access the app:"
echo "  Frontend: http://localhost:5173"
echo "  API:      http://localhost:8000"
echo "  Docs:     http://localhost:8000/docs"

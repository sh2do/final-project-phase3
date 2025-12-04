#!/bin/bash

# Kill any existing processes on ports 5000 and 5173
echo "Cleaning up old processes..."
lsof -ti :5000 | xargs kill -9 2>/dev/null || true
lsof -ti :5173 | xargs kill -9 2>/dev/null || true
sleep 2

# Start backend in background
echo "Starting backend server on port 5000..."
cd /Users/jeffthanduru/Code/dev/phase-3/anime-collection-tracker/final-project-phase3/fresh-rebuild/backend
npm run dev > backend.log 2>&1 &
BACKEND_PID=$!
echo "Backend PID: $BACKEND_PID"

sleep 3

# Start frontend in background
echo "Starting frontend server on port 5173..."
cd /Users/jeffthanduru/Code/dev/phase-3/anime-collection-tracker/final-project-phase3/fresh-rebuild/frontend
npm run dev > frontend.log 2>&1 &
FRONTEND_PID=$!
echo "Frontend PID: $FRONTEND_PID"

echo ""
echo "✅ App started!"
echo "🌐 Frontend: http://localhost:5173"
echo "🔌 Backend: http://localhost:5000"
echo ""
echo "Press Ctrl+C to stop all services"
echo ""

# Wait for all background processes
wait

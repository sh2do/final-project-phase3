# Anime Collection Tracker - Setup Instructions

## 🚀 Quick Start (macOS/Linux)

### One-Command Setup

```bash
chmod +x setup.sh
./setup.sh
```

## 📝 Manual Setup

### Backend Setup

1. Navigate to backend directory:

```bash
cd backend
```

2. Create virtual environment:

```bash
python3 -m venv venv
source venv/bin/activate
```

3. Install dependencies:

```bash
pip install -r requirements.txt
```

4. Initialize database:

```bash
alembic upgrade head
```

5. Start the server:

```bash
python -m uvicorn app.main:app --reload
```

Backend will run on: **http://localhost:8000**

### Frontend Setup

1. Navigate to frontend directory:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Start development server:

```bash
npm run dev
```

Frontend will run on: **http://localhost:5173**

## 📖 Usage

### Create a User

```bash
curl -X POST "http://localhost:8000/users" \
  -H "Content-Type: application/json" \
  -d '{"username": "anime_fan", "email": "fan@example.com"}'
```

### Add Anime

```bash
curl -X POST "http://localhost:8000/anime" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Attack on Titan",
    "episodes": 75,
    "release_year": 2013
  }'
```

### Add to Collection

```bash
curl -X POST "http://localhost:8000/collection" \
  -H "Content-Type: application/json" \
  -d '{
    "user_id": 1,
    "anime_id": 1,
    "episodes_watched": 0
  }'
```

### View API Docs

Visit: **http://localhost:8000/docs**

## 🔧 Troubleshooting

### Port Already in Use

```bash
# Kill process on port 8000
lsof -i :8000 | grep LISTEN | awk '{print $2}' | xargs kill -9

# Kill process on port 5173
lsof -i :5173 | grep LISTEN | awk '{print $2}' | xargs kill -9
```

### Database Issues

```bash
# Reset database
rm backend/anime_tracker.db
cd backend
alembic upgrade head
```

## 📚 Project Structure

See `README.md` for full documentation and API endpoints.

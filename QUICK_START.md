# 🎌 Anime Collection Tracker - Complete Guide

## 🎯 What You Have

A **production-ready full-stack web application** with:
- ✅ FastAPI backend with SQLAlchemy ORM
- ✅ React frontend with Vite and Tailwind CSS
- ✅ Complete CRUD API endpoints
- ✅ Database migrations with Alembic
- ✅ Docker support
- ✅ Comprehensive documentation
- ✅ Automated setup script

---

## 🚀 Get Started in 30 Seconds

### Option 1: Automated Setup (Recommended)
```bash
chmod +x setup.sh
./setup.sh
```

### Option 2: Manual Setup

**Terminal 1 - Backend:**
```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
alembic upgrade head
python -m uvicorn app.main:app --reload
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm install
npm run dev
```

### Option 3: Docker
```bash
docker-compose up
```

---

## 📍 Access Points

| Component | URL |
|-----------|-----|
| Frontend App | http://localhost:5173 |
| Backend API | http://localhost:8000 |
| API Docs | http://localhost:8000/docs |
| API ReDoc | http://localhost:8000/redoc |

---

## 🧪 Test the API

### 1. Create a User
```bash
curl -X POST "http://localhost:8000/users" \
  -H "Content-Type: application/json" \
  -d '{"username": "my_anime_fan", "email": "fan@example.com"}'
```

### 2. Create Anime
```bash
curl -X POST "http://localhost:8000/anime" \
  -H "Content-Type: application/json" \
  -d '{"title": "Death Note", "episodes": 37, "release_year": 2006}'
```

### 3. Add to Collection
```bash
curl -X POST "http://localhost:8000/collection" \
  -H "Content-Type: application/json" \
  -d '{"user_id": 1, "anime_id": 1, "episodes_watched": 0}'
```

### 4. View Collection
```bash
curl "http://localhost:8000/collection/1"
```

### 5. Update Progress
```bash
curl -X PATCH "http://localhost:8000/collection/1" \
  -H "Content-Type: application/json" \
  -d '{"episodes_watched": 10, "rating": 8.5, "is_favorite": 1}'
```

---

## 📱 Frontend Navigation

### HomePage (`/`)
- Browse all anime
- Select your user ID
- Quick-add anime to collection
- Link to "View My Collection"

### AnimeDetailsPage (`/anime/:animeId`)
- Full anime information
- Cover image
- Episode count and year
- Add to collection form

### MyCollectionPage (`/collection/:userId`)
- View all your anime
- Track episodes watched
- Rate anime
- Mark favorites
- Update notes
- Remove anime

### AddToCollectionPage (`/add`)
- Add new anime to database
- Fill in title, episodes, year
- Optional description and image

---

## 🗄️ Database Structure

### Three Main Tables:

**Anime**
```
- id (primary key)
- title (required, string)
- description (text)
- image_url (string)
- episodes (required, integer)
- release_year (integer)
```

**Users**
```
- id (primary key)
- username (required, unique)
- email (required, unique)
```

**CollectionItems** (Links Users to Anime)
```
- id (primary key)
- user_id (foreign key → Users)
- anime_id (foreign key → Anime)
- episodes_watched (integer)
- rating (float, 0-10)
- notes (text)
- is_favorite (0 or 1)
```

---

## 📁 File Structure Overview

```
project/
├── backend/                # Python/FastAPI
│   ├── app/
│   │   ├── models/        # Database models
│   │   ├── schemas/       # Validation models
│   │   ├── crud/          # Database operations
│   │   ├── routers/       # API endpoints
│   │   ├── main.py        # App start
│   │   ├── database.py    # DB config
│   │   └── config.py      # Settings
│   ├── alembic/           # Migrations
│   ├── seed.py            # Sample data
│   └── requirements.txt
│
├── frontend/              # React/Vite
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── pages/         # Page components
│   │   ├── services/      # API client
│   │   ├── hooks/         # Custom hooks
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── package.json
│
├── README.md              # Full documentation
├── SETUP.md              # Setup guide
└── docker-compose.yml    # Docker config
```

---

## 🔧 Common Tasks

### Add Sample Data
```bash
cd backend && python seed.py
```

### Reset Database
```bash
rm backend/anime_tracker.db
cd backend && alembic upgrade head
```

### View API Documentation
Visit: http://localhost:8000/docs

### Build Frontend for Production
```bash
cd frontend && npm run build
```

### Kill Process on Port
```bash
lsof -i :8000 | grep LISTEN | awk '{print $2}' | xargs kill -9
```

---

## 💡 How It Works

### API Flow
1. **Frontend** sends request → 
2. **Axios API service** calls endpoint → 
3. **FastAPI router** processes request → 
4. **CRUD operation** queries database → 
5. **Pydantic schema** validates response → 
6. **Response** returns to frontend

### Frontend Flow
1. **React page** mounted
2. **useAnime/useCollection hook** fetches data
3. **Component renders** with data
4. **User interaction** triggers API call
5. **Data updates** and UI refreshes

---

## 🎨 Customization Guide

### Change API URL (Frontend)
Edit `frontend/.env`:
```
VITE_API_URL=http://your-api.com
```

### Change Database (Backend)
Edit `backend/.env`:
```bash
# SQLite (default)
DATABASE_URL=sqlite:///./anime_tracker.db

# PostgreSQL
DATABASE_URL=postgresql://user:password@localhost/anime_tracker
```

### Add New Model
1. Create `app/models/new_model.py`
2. Create `app/schemas/new_schema.py`
3. Create `app/crud/new_crud.py`
4. Create `app/routers/new_router.py`
5. Include router in `app/main.py`
6. Create Alembic migration: `alembic revision --autogenerate -m "Add new model"`

### Styling
- Edit `frontend/src/index.css` for global styles
- Tailwind classes available in all components
- Modify `frontend/tailwind.config.js` for customization

---

## 🐛 Troubleshooting

### Backend Issues

**"Port 8000 already in use"**
```bash
lsof -i :8000 | grep LISTEN | awk '{print $2}' | xargs kill -9
```

**"ModuleNotFoundError"**
```bash
cd backend
source venv/bin/activate
pip install -r requirements.txt
```

**"Database locked"**
```bash
rm backend/anime_tracker.db
alembic upgrade head
```

### Frontend Issues

**"Can't connect to API"**
- Check `VITE_API_URL` in `frontend/.env`
- Verify backend is running: `http://localhost:8000`
- Check browser console for CORS errors

**"Port 5173 already in use"**
```bash
lsof -i :5173 | grep LISTEN | awk '{print $2}' | xargs kill -9
```

**"npm install fails"**
```bash
rm -rf node_modules package-lock.json
npm install
```

---

## 📚 Documentation Files

- **README.md** - Main project documentation
- **SETUP.md** - Detailed setup instructions
- **PROJECT_SUMMARY.md** - Complete specification
- **FILE_INVENTORY.md** - All files created

---

## 🚀 Deployment

### Local Deployment (Done!)

### Docker Deployment
```bash
docker-compose up
```

### Cloud Deployment (Heroku, AWS, etc.)
1. Backend: Deploy `backend/` folder
2. Frontend: Run `npm run build`, deploy `dist/` folder
3. Update `VITE_API_URL` to point to deployed API

---

## 🎓 Learning Resources

- **FastAPI Docs**: https://fastapi.tiangolo.com/
- **React Docs**: https://react.dev/
- **SQLAlchemy**: https://www.sqlalchemy.org/
- **Tailwind CSS**: https://tailwindcss.com/
- **Vite**: https://vitejs.dev/

---

## 📞 Project Support

### Getting Help
1. Check troubleshooting section above
2. Review API docs at http://localhost:8000/docs
3. Check README.md for detailed information
4. Review source code in `backend/app/` and `frontend/src/`

---

## ✅ Pre-Launch Checklist

Before production:
- [ ] Update database credentials
- [ ] Set `DEBUG=False` in backend `.env`
- [ ] Update CORS origins
- [ ] Build frontend: `npm run build`
- [ ] Test all API endpoints
- [ ] Backup database
- [ ] Set up error logging
- [ ] Test with real data

---

## 🎉 You're All Set!

Your anime collection tracker is ready to use. Start with:

```bash
./setup.sh
```

Then visit:
- **App**: http://localhost:5173
- **API**: http://localhost:8000/docs

**Happy anime tracking! 🎌**

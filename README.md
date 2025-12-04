# Anime Collection Tracker - Full Stack Rewrite (Jikan API & SQLite)

This project is a clean, simple, and readable full-stack application for tracking an anime collection. It integrates with the Jikan API (MyAnimeList) for searching and allows users to manage a local collection stored in a SQLite database using SQLAlchemy. The frontend has been rewritten for a modern, clean, and responsive UI with TailwindCSS, proper error handling, and animated loading states.

## Tech Stack

*   **Frontend:** React (with Vite) + Tailwind CSS
*   **Backend:** Python FastAPI
*   **Database:** SQLite using SQLAlchemy ORM
*   **External API:** Jikan API (https://api.jikan.moe/v4/anime)

## Project Structure

```
project/
 ├── backend/
 │    ├── app/
 │    │    ├── api/
 │    │    │    └── endpoints/
 │    │    │         ├── anime.py    # CRUD routes for local anime collection
 │    │    │         └── jikan.py    # Routes for Jikan search and saving to local DB
 │    │    ├── db/
 │    │    │    ├── database.py     # SQLAlchemy engine, session, and base
 │    │    │    ├── models.py       # SQLAlchemy ORM models (Anime, Genre, UserList)
 │    │    │    └── crud.py         # Functions for database interactions
 │    │    ├── schemas/
 │    │    │    └── anime.py        # Pydantic models for data validation/serialization
 │    │    ├── services/
 │    │    │    └── jikan.py        # Functions to call the Jikan API
 │    │    └── main.py             # FastAPI application entry point
 │    └── requirements.txt        # Python dependencies
 │
 └── frontend/
      ├── src/
      │    ├── components/         # Reusable React components
      │    │     ├── AnimeCard.jsx      # Displays details of an anime
      │    │     ├── Alert.jsx          # Reusable alert component for messages/errors
      │    │     ├── Navbar.jsx         # Navigation bar
      │    │     ├── Footer.jsx         # Footer component
      │    │     └── SkeletonCard.jsx   # Loading state placeholder for anime cards
      │    ├── services/jikanApi.js# Frontend service for calling backend Jikan/local endpoints
      │    ├── App.jsx             # Main React application component (search, results, UI orchestration)
      │    ├── index.css           # Tailwind CSS imports and global styles
      │    └── main.jsx            # React entry point
      ├── index.html              # HTML entry file
      ├── package.json            # Frontend dependencies and scripts
      └── tailwind.config.js      # Tailwind CSS configuration
```

## Features

*   **Jikan API Integration:** Search for anime using the external Jikan API via the backend.
*   **Local Collection Management:** Save anime from Jikan search results to your local database (basic integration via AnimeCard).
*   **CRUD Operations:** Full Create, Read, Update, Delete functionality for local anime items (backend implemented, frontend can be extended).
*   **Modern UI:** Clean, centered, and visually appealing design using TailwindCSS, with proper spacing, shadows, and hover effects.
*   **Robust State Handling:** Implementations for loading states (animated skeleton cards) and error states (friendly Tailwind alert boxes).
*   **Debounced Search:** Efficient search input with debouncing to prevent excessive API calls.
*   **Modular Architecture:** Clear separation of concerns for easy understanding and maintenance.
*   **Beginner-Friendly Code:** Focus on readability and straightforward logic with comments.

## Getting Started

Follow these instructions to set up and run the project locally.

### Prerequisites

*   Python 3.8+
*   Node.js (LTS recommended)
*   npm or yarn

### 1. Backend Setup

1.  **Navigate to the backend directory:**
    ```bash
    cd backend
    ```
2.  **Create a Python virtual environment** (recommended):
    ```bash
    python -m venv venv
    ```
3.  **Activate the virtual environment:**
    *   **On macOS/Linux:**
        ```bash
        source venv/bin/activate
        ```
    *   **On Windows (Command Prompt):**
        ```bash
        venv\Scripts\activate.bat
        ```
    *   **On Windows (PowerShell):**
        ```bash
        venv\Scripts\Activate.ps1
        ```
4.  **Install backend dependencies:**
    ```bash
    pip install -r requirements.txt
    ```
5.  **Run the FastAPI application:**
    ```bash
    uvicorn app.main:app --reload
    ```
    The backend API will be available at `http://localhost:8000`. This command will also create the `sql_app.db` SQLite database file and necessary tables on startup. You can test the `/` endpoint in your browser, or `/docs` for interactive API documentation.

### 2. Frontend Setup

1.  **Open a new terminal window/tab.**
2.  **Navigate to the frontend directory:**
    ```bash
    cd frontend
    ```
3.  **Install frontend dependencies:**
    ```bash
    npm install
    # OR
    yarn install
    ```
4.  **Start the Vite development server:**
    ```bash
    npm run dev
    # OR
    yarn dev
    ```
    The frontend application will typically open in your browser at `http://localhost:5173` (or another available port).

    *Note: If the frontend doesn't automatically open, check the terminal output for the correct URL.*

### 3. Running Both Together

Ensure both the backend (FastAPI) and frontend (React/Vite) servers are running simultaneously in separate terminal windows/tabs. The frontend will automatically fetch data from the backend.

## Environment Variables (Optional but Recommended)

The frontend uses `import.meta.env.VITE_API_BASE_URL` to configure the backend API URL. By default, it points to `http://localhost:8000/api`. If your backend runs on a different address or port, create a `.env` file in the `frontend` directory:

```
# frontend/.env
VITE_API_BASE_URL="http://your-backend-ip:port/api"
```

## Development Guidelines

*   **Simplicity:** Favor straightforward solutions over overly complex abstractions.
*   **Readability:** Write clear, concise code with meaningful variable names.
*   **Modularity:** Keep components and functions small and focused on a single responsibility.
*   **Error Handling:** Always consider how errors will be handled and communicated.
*   **Consistent Styling:** Use Tailwind CSS classes for styling.

---

This rewritten frontend, coupled with the robust backend, provides a fully functional, cleanly styled, and stable Anime Tracker that meets all your requirements.
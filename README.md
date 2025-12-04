# Anime Collection Tracker - Full Stack Rewrite

This project is a clean, simple, and readable full-stack application for tracking an anime collection. It's built with a focus on maintainability, clear architecture, and a "junior-friendly" codebase.

## Tech Stack

*   **Frontend:** React (with Vite) + Tailwind CSS
*   **Backend:** Python FastAPI
*   **Database:** SQLite (for local development - currently mock data is used)
*   **API Style:** REST

## Project Structure

```
project/
 ├── backend/
 │    ├── app/
 │    │    ├── main.py             # FastAPI application entry point
 │    │    ├── routes/
 │    │    │     └── data.py       # API routes for data retrieval
 │    │    ├── services/
 │    │    │     └── fetch_repo.py # Service to simulate data fetching (mock data)
 │    │    ├── models/
 │    │    │     └── item.py       # Pydantic model for data items
 │    │    └── utils/
 │    │          └── errors.py     # Custom API error handling utilities
 │    └── requirements.txt        # Python dependencies
 │
 └── frontend/
      ├── src/
      │    ├── components/         # Reusable React components
      │    │     └── DataItem.jsx  # Component to display a single anime item
      │    ├── pages/              # Top-level page components (currently unused but good practice)
      │    ├── services/api.js     # Frontend service for API calls
      │    ├── App.jsx             # Main React application component
      │    └── main.jsx            # React entry point
      ├── index.html              # HTML entry file
      ├── package.json            # Frontend dependencies and scripts
      └── tailwind.config.js      # Tailwind CSS configuration
```

## Features

*   **Clean API:** A well-defined `/api/data` endpoint for fetching anime items.
*   **Mock Data:** Backend simulates data retrieval, allowing for easy local development without a real database setup initially.
*   **Error Handling:** Robust error handling on both frontend and backend for a better user experience.
*   **Responsive UI:** Basic Tailwind CSS styling for a clean and responsive design across desktop and mobile.
*   **Modular Architecture:** Clear separation of concerns with dedicated folders for routes, services, models, and components.

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
    The backend API will be available at `http://localhost:8000`. You can test the `/` endpoint in your browser, or `/api/data` to see the mock data.

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

Ensure both the backend (FastAPI) and frontend (React/Vite) servers are running simultaneously in separate terminal windows. The frontend will automatically fetch data from the backend when you navigate to `http://localhost:5173`.

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

This structure provides a solid foundation for further development, addressing the common issues of inconsistent structure, unclear routes, and missing error handling that were present in previous versions.

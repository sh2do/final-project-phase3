#!/usr/bin/env python3
"""
Standalone backend server - Run without venv issues
"""
import sys
import subprocess
import os
from app.main import app
import uvicorn

# Get Python version
python_version = f"{sys.version_info.major}.{sys.version_info.minor}"
print(f"🐍 Using Python {python_version}")

# Install dependencies globally if needed
print("📦 Installing dependencies...")
deps = [
    "fastapi",
    "uvicorn[standard]",
    "sqlalchemy",
    "pydantic[email]",
    "python-dotenv",
    "alembic"
]

for dep in deps:
    print(f"  Installing {dep}...")
    subprocess.run([sys.executable, "-m", "pip", "install", "-q", dep], check=False)

# Add current directory to path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

# Setup database
print("\n🗄️  Setting up database...")
os.chdir(os.path.dirname(os.path.abspath(__file__)))
subprocess.run([sys.executable, "-m", "alembic", "upgrade", "head"], check=False)

# Start server
print("\n🚀 Starting FastAPI server...")
print("📍 API available at: http://localhost:8000")
print("📚 Docs available at: http://localhost:8000/docs\n")

if __name__ == "__main__":
    uvicorn.run(
        app,
        host="0.0.0.0",
        port=8000,
        reload=True,
        log_level="info"
    )

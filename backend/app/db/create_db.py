from backend.app.db.database import Base, engine
from backend.app.db import models # noqa: F401, to ensure models are imported and registered

def create_db_tables():
    print("Attempting to create database tables...")
    Base.metadata.create_all(bind=engine)
    print("Database tables creation attempt finished.")

if __name__ == "__main__":
    create_db_tables()

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

# SQLite database URL
SQLALCHEMY_DATABASE_URL = "sqlite:///./sql_app.db"

# Create the SQLAlchemy engine
# connect_args={"check_same_thread": False} is needed for SQLite to allow multiple threads
# to interact with the database, which is common in web applications.
engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)

# Create a SessionLocal class
# Each instance of SessionLocal will be a database session.
# The session object itself is the actual "talker" to the database.
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Declare a Base class for declarative models
# We will inherit from this Base class to create each of our database models (ORM models).
Base = declarative_base()

# Dependency to get a database session
# This function will be used with FastAPI's Depends system to manage database sessions.
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

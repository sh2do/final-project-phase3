import pytest
from sqlmodel import SQLModel, create_engine, Session
from fastapi.testclient import TestClient

from app.main import app
from app.database import get_session


TEST_DATABASE_URL = "sqlite:///:memory:"


engine = create_engine(TEST_DATABASE_URL, connect_args={"check_same_thread": False})


def create_tables():
    SQLModel.metadata.create_all(engine)


def get_test_session():
    with Session(engine) as session:
        yield session


@pytest.fixture(scope="session", autouse=True)
def initialize_db():
    create_tables()


@pytest.fixture
def client():
    # override the dependency
    app.dependency_overrides[get_session] = get_test_session
    with TestClient(app) as c:
        yield c
    app.dependency_overrides.clear()

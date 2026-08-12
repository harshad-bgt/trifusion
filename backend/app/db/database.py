import os
import logging
from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker

from dotenv import load_dotenv
env_path = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))), ".env")
load_dotenv(env_path)

logger = logging.getLogger(__name__)

DATABASE_URL = os.getenv("DATABASE_URL")

if DATABASE_URL:
    # Force use of standard postgresql:// (which defaults to psycopg2 sync driver)
    if DATABASE_URL.startswith("postgresql+asyncpg://") or DATABASE_URL.startswith("postgresql+psycopg://"):
        DATABASE_URL = DATABASE_URL.replace("postgresql+asyncpg://", "postgresql://", 1)
        DATABASE_URL = DATABASE_URL.replace("postgresql+psycopg://", "postgresql://", 1)
    elif DATABASE_URL.startswith("postgres://"):
        DATABASE_URL = DATABASE_URL.replace("postgres://", "postgresql://", 1)
    
    # psycopg2 uses 'sslmode=require'
    if "ssl=" in DATABASE_URL and "sslmode=" not in DATABASE_URL:
        DATABASE_URL = DATABASE_URL.replace("ssl=require", "sslmode=require")

if not DATABASE_URL:
    logger.warning("DATABASE_URL is not set. Using in-memory SQLite.")
    DATABASE_URL = "sqlite:///:memory:"

try:
    engine = create_engine(
        DATABASE_URL,
        echo=False,
        pool_pre_ping=True,
        pool_size=5,
        max_overflow=10
    )
except Exception as e:
    logger.error(f"Failed to create engine: {e}")
    engine = create_engine("sqlite:///:memory:")

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

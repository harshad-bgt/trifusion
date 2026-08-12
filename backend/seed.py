import asyncio
import os
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession, async_sessionmaker
from dotenv import load_dotenv
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from app.models.models import Service, Industry

async def seed_db():
    load_dotenv()
    db_url = os.getenv("DATABASE_URL")
    
    if not db_url:
        print("DATABASE_URL is not set.")
        return
        
    if db_url.startswith("postgresql://"):
        db_url = db_url.replace("postgresql://", "postgresql+psycopg://", 1)
    elif db_url.startswith("postgres://"):
        db_url = db_url.replace("postgres://", "postgresql+psycopg://", 1)
        
    engine = create_async_engine(db_url)
    async_session_factory = async_sessionmaker(engine, expire_on_commit=False, class_=AsyncSession)
    
    async with async_session_factory() as session:
        try:
            print("Seeding basic initial data...")
            # You can add default rows here if you'd like
            # e.g., default Services, Industries, etc.
            
            await session.commit()
            print("Seeding complete.")
        except Exception as e:
            print(f"Failed to seed: {e}")
            await session.rollback()
        finally:
            await session.close()
            
if __name__ == "__main__":
    asyncio.run(seed_db())

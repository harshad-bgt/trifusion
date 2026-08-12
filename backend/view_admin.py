import asyncio
import os
import sys
from dotenv import load_dotenv

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from app.repositories.postgres import pg_repo
from app.db.database import engine

async def view_admin():
    load_dotenv()
    try:
        users = await pg_repo.get_all("AdminUsers")
        for u in users:
            print(f"ID: {u.get('id')}")
            print(f"Email: {u.get('email')}")
            print(f"Hash: {u.get('password_hash')}")
            print("-" * 20)
    except Exception as e:
        print(f"Failed to get users: {e}")
    finally:
        await engine.dispose()

if __name__ == "__main__":
    asyncio.run(view_admin())

import asyncio
import os
import uuid
import sys
from dotenv import load_dotenv

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from app.core.security import get_password_hash
from app.repositories.postgres import pg_repo
from app.db.database import engine

async def create_admin():
    load_dotenv()
    bootstrap_email = os.getenv("ADMIN_BOOTSTRAP_EMAIL")
    bootstrap_password = os.getenv("ADMIN_BOOTSTRAP_PASSWORD")
    
    if not bootstrap_email or not bootstrap_password:
        print("Missing ADMIN_BOOTSTRAP_EMAIL or ADMIN_BOOTSTRAP_PASSWORD in .env")
        return
        
    try:
        users = await pg_repo.get_all("AdminUsers")
        if any(u.get("email") == bootstrap_email for u in users):
            print("Admin user exists! Updating password...")
            hashed = get_password_hash(bootstrap_password)
            await pg_repo.update("AdminUsers", "email", bootstrap_email, {"password_hash": hashed})
            print(f"Admin user {bootstrap_email} password updated successfully!")
            return
            
        hashed = get_password_hash(bootstrap_password)
        await pg_repo.insert("AdminUsers", {
            "id": str(uuid.uuid4()),
            "email": bootstrap_email,
            "password_hash": hashed,
            "role": "admin"
        })
        print(f"Admin user {bootstrap_email} created successfully!")
    except Exception as e:
        print(f"Failed to create admin: {e}")
    finally:
        await engine.dispose()

if __name__ == "__main__":
    asyncio.run(create_admin())

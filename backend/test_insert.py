import asyncio
import uuid
from datetime import datetime
from app.repositories.postgres import pg_repo
from app.db.database import get_db_session, engine

async def test_insert():
    lead_id = str(uuid.uuid4())
    lead_ref = f"L-{lead_id[:8].upper()}"
    now = datetime.utcnow()
    
    lead_data = {
        "id": lead_id,
        "leadRef": lead_ref,
        "name": "Rahul Patil",
        "email": "admin@secureattend.ai",
        "phone": "5797791209",
        "company": None,
        "serviceInterest": None,
        "message": "gisej ntrsitendn rn5hje",
        "status": "NEW",
        "createdAt": now
    }
    
    try:
        # We need to test the actual exception by bypassing the try-except in pg_repo,
        # or by reading what it throws (it raises Exception("DATABASE_ERROR"))
        # But we want the real error. Let's do it manually just like pg_repo
        from app.models.models import Lead
        async for session in get_db_session():
            try:
                new_record = Lead(**lead_data)
                session.add(new_record)
                await session.commit()
                print("Insert successful!")
            except Exception as e:
                import traceback
                traceback.print_exc()
    finally:
        await engine.dispose()

if __name__ == "__main__":
    asyncio.run(test_insert())

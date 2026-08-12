import logging
from sqlalchemy import select
from fastapi.concurrency import run_in_threadpool
from app.db.database import SessionLocal
from app.models.models import (
    User, Lead, Service, Industry, Product,
    CaseStudy, Testimonial, FAQ, BlogPost, Job
)

logger = logging.getLogger(__name__)

class PostgresRepository:
    def __init__(self):
        self.models = {
            "Leads": Lead,
            "Services": Service,
            "Industries": Industry,
            "Products": Product,
            "CaseStudies": CaseStudy,
            "Testimonials": Testimonial,
            "FAQs": FAQ,
            "Blog": BlogPost,
            "Jobs": Job,
            "AdminUsers": User
        }

    def _get_model(self, dataset: str):
        model = self.models.get(dataset)
        if not model:
            raise ValueError(f"Dataset {dataset} not found in models.")
        return model
        
    def _to_dict(self, obj):
        if not obj:
            return None
        return {c.name: getattr(obj, c.name) for c in obj.__table__.columns}

    async def get_all(self, dataset: str):
        model = self._get_model(dataset)
        def _get():
            with SessionLocal() as session:
                result = session.execute(select(model))
                return [self._to_dict(record) for record in result.scalars().all()]
        return await run_in_threadpool(_get)

    async def get_by_id(self, dataset: str, id_field: str, id_value: str):
        model = self._get_model(dataset)
        def _get():
            with SessionLocal() as session:
                result = session.execute(select(model).where(getattr(model, id_field) == id_value))
                return self._to_dict(result.scalars().first())
        return await run_in_threadpool(_get)

    async def insert(self, dataset: str, data: dict):
        model = self._get_model(dataset)
        def _create():
            with SessionLocal() as session:
                valid_keys = {c.name for c in model.__table__.columns}
                filtered_data = {k: v for k, v in data.items() if k in valid_keys}
                new_record = model(**filtered_data)
                session.add(new_record)
                session.commit()
                session.refresh(new_record)
                return self._to_dict(new_record)
        return await run_in_threadpool(_create)

    async def update(self, dataset: str, id_field: str, id_value: str, data: dict):
        model = self._get_model(dataset)
        def _update():
            with SessionLocal() as session:
                result = session.execute(select(model).where(getattr(model, id_field) == id_value))
                record = result.scalars().first()
                if not record:
                    raise ValueError(f"Record with {id_field}={id_value} not found")
                
                valid_keys = {c.name for c in model.__table__.columns}
                filtered_data = {k: v for k, v in data.items() if k in valid_keys}
                for k, v in filtered_data.items():
                    setattr(record, k, v)
                session.commit()
                session.refresh(record)
                return self._to_dict(record)
        return await run_in_threadpool(_update)

pg_repo = PostgresRepository()

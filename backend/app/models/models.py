import uuid
from datetime import datetime
from typing import List, Optional
from sqlalchemy import String, Boolean, Text, Integer, ForeignKey, DateTime, Float
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.db.database import Base

def generate_uuid():
    return str(uuid.uuid4())

class User(Base):
    __tablename__ = "users"
    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=generate_uuid)
    email: Mapped[str] = mapped_column(String(255), unique=True, index=True)
    password_hash: Mapped[str] = mapped_column(String(255))
    name: Mapped[Optional[str]] = mapped_column(String(255))
    role: Mapped[str] = mapped_column(String(50), default="admin")
    is_active: Mapped[bool] = mapped_column(Boolean, default=True)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
    updated_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

class Lead(Base):
    __tablename__ = "leads"
    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=generate_uuid)
    leadRef: Mapped[str] = mapped_column(String(50), unique=True, index=True)
    name: Mapped[str] = mapped_column(String(255))
    email: Mapped[str] = mapped_column(String(255), index=True)
    phone: Mapped[Optional[str]] = mapped_column(String(50))
    company: Mapped[Optional[str]] = mapped_column(String(255))
    serviceInterest: Mapped[Optional[str]] = mapped_column(String(255))
    message: Mapped[str] = mapped_column(Text)
    status: Mapped[str] = mapped_column(String(50), default="NEW", index=True)
    createdAt: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow, index=True)

class Service(Base):
    __tablename__ = "services"
    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=generate_uuid)
    slug: Mapped[str] = mapped_column(String(255), unique=True, index=True)
    title: Mapped[str] = mapped_column(String(255))
    shortDesc: Mapped[str] = mapped_column(Text)
    description: Mapped[str] = mapped_column(Text)
    icon: Mapped[Optional[str]] = mapped_column(String(255))
    heroImage: Mapped[Optional[str]] = mapped_column(String(255))
    problemStatement: Mapped[Optional[str]] = mapped_column(Text)
    published: Mapped[bool] = mapped_column(Boolean, default=True)
    featured: Mapped[bool] = mapped_column(Boolean, default=False)
    sortOrder: Mapped[int] = mapped_column(Integer, default=0)
    seoTitle: Mapped[Optional[str]] = mapped_column(String(255))
    seoDesc: Mapped[Optional[str]] = mapped_column(Text)

class Industry(Base):
    __tablename__ = "industries"
    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=generate_uuid)
    slug: Mapped[str] = mapped_column(String(255), unique=True, index=True)
    title: Mapped[str] = mapped_column(String(255))
    shortDesc: Mapped[str] = mapped_column(Text)
    description: Mapped[Optional[str]] = mapped_column(Text)
    icon: Mapped[Optional[str]] = mapped_column(String(255))
    challenges: Mapped[Optional[str]] = mapped_column(Text)
    outcomes: Mapped[Optional[str]] = mapped_column(Text)
    published: Mapped[bool] = mapped_column(Boolean, default=True)

class CaseStudy(Base):
    __tablename__ = "case_studies"
    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=generate_uuid)
    slug: Mapped[str] = mapped_column(String(255), unique=True, index=True)
    title: Mapped[str] = mapped_column(String(255))
    clientName: Mapped[Optional[str]] = mapped_column(String(255))
    overview: Mapped[Optional[str]] = mapped_column(Text)
    challenge: Mapped[Optional[str]] = mapped_column(Text)
    solution: Mapped[Optional[str]] = mapped_column(Text)
    architecture: Mapped[Optional[str]] = mapped_column(Text)
    published: Mapped[bool] = mapped_column(Boolean, default=True)
    featured: Mapped[bool] = mapped_column(Boolean, default=False)
    heroImage: Mapped[Optional[str]] = mapped_column(String(255))
    seoTitle: Mapped[Optional[str]] = mapped_column(String(255))
    seoDesc: Mapped[Optional[str]] = mapped_column(Text)

class Product(Base):
    __tablename__ = "products"
    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=generate_uuid)
    slug: Mapped[str] = mapped_column(String(255), unique=True, index=True)
    name: Mapped[str] = mapped_column(String(255))
    tagline: Mapped[Optional[str]] = mapped_column(String(255))
    description: Mapped[str] = mapped_column(Text)
    logo: Mapped[Optional[str]] = mapped_column(String(255))
    heroImage: Mapped[Optional[str]] = mapped_column(String(255))
    category: Mapped[Optional[str]] = mapped_column(String(255))
    status: Mapped[str] = mapped_column(String(50), default="ACTIVE")
    externalUrl: Mapped[Optional[str]] = mapped_column(String(255))
    published: Mapped[bool] = mapped_column(Boolean, default=True)
    featured: Mapped[bool] = mapped_column(Boolean, default=False)

class Testimonial(Base):
    __tablename__ = "testimonials"
    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=generate_uuid)
    name: Mapped[str] = mapped_column(String(255))
    title: Mapped[Optional[str]] = mapped_column(String(255))
    company: Mapped[Optional[str]] = mapped_column(String(255))
    avatar: Mapped[Optional[str]] = mapped_column(String(255))
    quote: Mapped[str] = mapped_column(Text)
    rating: Mapped[Optional[float]] = mapped_column(Float, default=5.0)
    published: Mapped[bool] = mapped_column(Boolean, default=True)

class FAQ(Base):
    __tablename__ = "faqs"
    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=generate_uuid)
    question: Mapped[str] = mapped_column(Text)
    answer: Mapped[str] = mapped_column(Text)
    category_name: Mapped[Optional[str]] = mapped_column(String(255))
    category_slug: Mapped[Optional[str]] = mapped_column(String(255))
    published: Mapped[bool] = mapped_column(Boolean, default=True)

class BlogPost(Base):
    __tablename__ = "blog_posts"
    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=generate_uuid)
    slug: Mapped[str] = mapped_column(String(255), unique=True, index=True)
    title: Mapped[str] = mapped_column(String(255))
    excerpt: Mapped[Optional[str]] = mapped_column(Text)
    content: Mapped[str] = mapped_column(Text)
    featuredImage: Mapped[Optional[str]] = mapped_column(String(255))
    author: Mapped[Optional[str]] = mapped_column(String(255))
    category_name: Mapped[Optional[str]] = mapped_column(String(255))
    category_slug: Mapped[Optional[str]] = mapped_column(String(255))
    tags: Mapped[Optional[str]] = mapped_column(String(255))
    readingTime: Mapped[Optional[int]] = mapped_column(Integer)
    published: Mapped[bool] = mapped_column(Boolean, default=True)
    publishedAt: Mapped[Optional[str]] = mapped_column(String(255))

class Job(Base):
    __tablename__ = "jobs"
    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=generate_uuid)
    slug: Mapped[str] = mapped_column(String(255), unique=True, index=True)
    title: Mapped[str] = mapped_column(String(255))
    department: Mapped[Optional[str]] = mapped_column(String(255))
    location: Mapped[Optional[str]] = mapped_column(String(255))
    employmentType: Mapped[Optional[str]] = mapped_column(String(255))
    experience: Mapped[Optional[str]] = mapped_column(String(255))
    description: Mapped[Optional[str]] = mapped_column(Text)
    responsibilities: Mapped[Optional[str]] = mapped_column(Text)
    requirements: Mapped[Optional[str]] = mapped_column(Text)
    benefits: Mapped[Optional[str]] = mapped_column(Text)
    published: Mapped[bool] = mapped_column(Boolean, default=True)

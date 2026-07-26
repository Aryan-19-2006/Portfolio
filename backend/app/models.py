"""
models.py
------------------------------------------------------------------
SQLAlchemy ORM models — these define the actual PostgreSQL tables
(Base.metadata.create_all in main.py turns these classes into
CREATE TABLE statements automatically on first run).
No personal data lives here — this is schema only. Real content
is inserted separately by seed.py.
------------------------------------------------------------------
"""

from sqlalchemy import Column, Integer, String, Text, Boolean, DateTime, func
from sqlalchemy.dialects.postgresql import ARRAY

from app.database import Base


class Project(Base):
    """One row per portfolio project (CareerSync, CrisisMatch, ...)."""

    __tablename__ = "projects"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(120), nullable=False)
    description = Column(Text, nullable=False)
    features = Column(ARRAY(String), default=list)      # e.g. ["Authentication", "Resume Upload"]
    tech_stack = Column(ARRAY(String), default=list)    # e.g. ["Django", "MySQL"]
    github_link = Column(String(255), nullable=True)
    live_demo_link = Column(String(255), nullable=True)
    featured = Column(Boolean, default=False)  # shows a "FEATURED" badge on the card
    order = Column(Integer, default=0)         # lower number = shown first


class Skill(Base):
    """One row per individual skill; `category` groups them in the UI."""

    __tablename__ = "skills"

    id = Column(Integer, primary_key=True, index=True)
    category = Column(String(50), nullable=False)  # Languages / Frontend / Backend / Database / Tools
    name = Column(String(50), nullable=False)
    order = Column(Integer, default=0)


class Achievement(Base):
    """One row per certificate/milestone shown in the Achievements section."""

    __tablename__ = "achievements"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(150), nullable=False)
    description = Column(Text, nullable=True)
    icon = Column(String(50), nullable=True)  # must match a key in Achievements.tsx's iconMap
    order = Column(Integer, default=0)


class ContactMessage(Base):
    """One row per contact-form submission — the only table written to at runtime."""

    __tablename__ = "contact_messages"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    email = Column(String(150), nullable=False)
    message = Column(Text, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())  # set by PostgreSQL, not Python

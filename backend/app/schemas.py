"""
schemas.py
------------------------------------------------------------------
Pydantic schemas — these define the exact JSON shape each API
endpoint returns or accepts, and validate incoming data (e.g.
ContactIn rejects a malformed email before it ever touches the DB).
Keep these in sync with models.py and with the TypeScript types in
frontend/src/lib/api.ts — the three should always describe the same shape.
------------------------------------------------------------------
"""

from typing import Optional
from datetime import datetime

from pydantic import BaseModel, EmailStr


class ProjectOut(BaseModel):
    """Shape returned by GET /api/projects/ — mirrors the Project model."""

    id: int
    title: str
    description: str
    features: list[str] = []
    tech_stack: list[str] = []
    github_link: Optional[str] = None
    live_demo_link: Optional[str] = None
    featured: bool = False

    class Config:
        from_attributes = True


class SkillOut(BaseModel):
    """Shape returned by GET /api/skills/ (the flat, ungrouped list)."""

    id: int
    category: str
    name: str

    class Config:
        from_attributes = True


class AchievementOut(BaseModel):
    """Shape returned by GET /api/achievements/."""

    id: int
    title: str
    description: Optional[str] = None
    icon: Optional[str] = None

    class Config:
        from_attributes = True


class ContactIn(BaseModel):
    """Shape the frontend must send to POST /api/contact/.
    EmailStr rejects invalid email formats automatically."""

    name: str
    email: EmailStr
    message: str


class ContactOut(BaseModel):
    """Shape returned after a contact message is saved
    (includes the server-generated id and created_at timestamp)."""

    id: int
    name: str
    email: str
    message: str
    created_at: datetime

    class Config:
        from_attributes = True

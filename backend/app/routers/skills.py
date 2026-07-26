"""
routers/skills.py
------------------------------------------------------------------
Serves the Skills section (src/components/Skills.tsx). The frontend
only calls /grouped — /  (flat list) exists for completeness/debugging.
------------------------------------------------------------------
"""

from collections import defaultdict

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import Skill
from app.schemas import SkillOut

router = APIRouter(prefix="/api/skills", tags=["skills"])


@router.get("/", response_model=list[SkillOut])
def list_skills(db: Session = Depends(get_db)):
    return db.query(Skill).order_by(Skill.category, Skill.order).all()


@router.get("/grouped")
def grouped_skills(db: Session = Depends(get_db)):
    """Returns skills grouped by category, e.g. { "Languages": ["C++","Python",...] }"""
    skills = db.query(Skill).order_by(Skill.category, Skill.order).all()
    # defaultdict(list) means grouped["NewCategory"] auto-creates an empty
    # list instead of raising a KeyError — avoids a manual "if not in dict" check.
    grouped: dict[str, list[str]] = defaultdict(list)
    for s in skills:
        grouped[s.category].append(s.name)
    return grouped

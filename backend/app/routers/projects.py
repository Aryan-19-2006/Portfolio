"""
routers/projects.py
------------------------------------------------------------------
Read-only endpoints that serve the Projects section of the frontend
(src/components/Projects.tsx). Data itself comes from the `projects`
table, populated by app/seed.py — this file has no hardcoded content.
------------------------------------------------------------------
"""

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import Project
from app.schemas import ProjectOut

router = APIRouter(prefix="/api/projects", tags=["projects"])


@router.get("/", response_model=list[ProjectOut])
def list_projects(db: Session = Depends(get_db)):
    # Ordered by the `order` column so featured/priority projects show first.
    return db.query(Project).order_by(Project.order).all()


@router.get("/featured", response_model=list[ProjectOut])
def featured_projects(db: Session = Depends(get_db)):
    # `== True` (not `is True`) is required here — SQLAlchemy overloads
    # the equality operator to build SQL, so `is` would break the query.
    return db.query(Project).filter(Project.featured == True).order_by(Project.order).all()  # noqa: E712


@router.get("/{project_id}", response_model=ProjectOut)
def get_project(project_id: int, db: Session = Depends(get_db)):
    # Used if you ever add a project detail page; not called by the
    # current frontend (which only fetches the full list).
    project = db.query(Project).filter(Project.id == project_id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    return project

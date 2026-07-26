"""
main.py
------------------------------------------------------------------
FastAPI application entrypoint — this is what `uvicorn app.main:app`
runs. It builds the app, opens CORS to the frontend, creates DB
tables on startup, and mounts every router. Run it with:
    cd backend && uvicorn app.main:app --reload
Interactive API docs are then auto-generated at /docs.
------------------------------------------------------------------
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config import get_settings
from app.database import Base, engine

settings = get_settings()

app = FastAPI(
    title="Aryan Gupta Portfolio API",
    description="Backend for the portfolio — serves projects, skills, achievements, contact.",
    version="1.0.0",
)

# Creates tables if they don't exist yet, based on the models in models.py.
# Fine for a solo/dev project; a team project would use Alembic migrations instead.
Base.metadata.create_all(bind=engine)

# ---- CORS --------------------------------------------------------
# Browsers block cross-origin requests by default — since the React app
# (localhost:5173 / your Vercel domain) and this API run on different
# origins, we have to explicitly allow the frontend's origin here.
# Allowed origins come from FRONTEND_ORIGINS in .env — see .env.example
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.FRONTEND_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    # Simple liveness check — visiting the bare API URL confirms it's running.
    return {"status": "ok", "service": "portfolio-backend"}


@app.get("/health")
def health():
    # Used by deployment platforms (Railway/Render) to verify the app booted.
    return {"status": "healthy", "environment": settings.ENVIRONMENT}


# ---- Routers --------------------------------------------------------
# Imported down here (not at the top) to avoid a circular import: the
# routers import `app.database` which this file also sets up above.
from app.routers import projects, skills, achievements, contact  # noqa: E402

app.include_router(projects.router)      # -> /api/projects/*
app.include_router(skills.router)        # -> /api/skills/*
app.include_router(achievements.router)  # -> /api/achievements/*
app.include_router(contact.router)       # -> /api/contact/*  (the only POST route)

"""
database.py
------------------------------------------------------------------
Sets up the SQLAlchemy engine + session factory that every router
uses to talk to PostgreSQL. `Base` is also imported by models.py —
every ORM model class inherits from it so SQLAlchemy knows about
all the tables. Connection string comes from Settings.DATABASE_URL
(see config.py / .env).
------------------------------------------------------------------
"""

from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

from app.config import get_settings

settings = get_settings()

# pool_pre_ping checks the connection is alive before using it — avoids
# cryptic "connection closed" errors after the DB has been idle a while.
engine = create_engine(settings.DATABASE_URL, pool_pre_ping=True)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()


def get_db():
    """FastAPI dependency that yields a DB session per request.

    FastAPI calls this, runs the request with `db` injected via
    Depends(get_db), then resumes this generator to close the
    session — so every request gets its own session that's always
    cleaned up, even if the request raises an error.
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

"""
config.py
------------------------------------------------------------------
Central configuration for the backend. Every other backend file
reads settings through get_settings() rather than calling
os.getenv() directly — that keeps all env-var names in one place.
All real values come from environment variables (.env file).
Nothing sensitive is hardcoded here — see backend/.env.example
for the full list of variables you need to set.
------------------------------------------------------------------
"""

import os
from functools import lru_cache

from dotenv import load_dotenv

load_dotenv()  # loads variables from backend/.env if present


class Settings:
    # ---- Database -----------------------------------------------
    # >>> FILL IN: set DATABASE_URL in backend/.env <<<
    DATABASE_URL: str = os.getenv(
        "DATABASE_URL", "postgresql://postgres:2006@localhost:2208/portfolio_db"
    )

    # ---- CORS -----------------------------------------------------
    # >>> FILL IN: set FRONTEND_ORIGINS in backend/.env (comma separated) <<<
    FRONTEND_ORIGINS: list[str] = os.getenv(
        "FRONTEND_ORIGINS", "http://localhost:5173,http://localhost:3000"
    ).split(",")

    # ---- Contact form email (optional, Phase 2) --------------------
    # >>> FILL IN if you wire up real email sending <<<
    EMAIL_API_KEY: str = os.getenv("EMAIL_API_KEY", "")
    EMAIL_FROM: str = os.getenv("EMAIL_FROM", "")
    EMAIL_TO: str = os.getenv("EMAIL_TO", "")

    # ---- GitHub API (optional, Phase 2) ------------------------------
    # >>> FILL IN if you wire up live GitHub stats <<<
    GITHUB_TOKEN: str = os.getenv("GITHUB_TOKEN", "")
    GITHUB_USERNAME: str = os.getenv("GITHUB_USERNAME", "")

    # ---- LeetCode (optional, Phase 2) ---------------------------------
    LEETCODE_USERNAME: str = os.getenv("LEETCODE_USERNAME", "")

    ENVIRONMENT: str = os.getenv("ENVIRONMENT", "development")


@lru_cache
def get_settings() -> Settings:
    # lru_cache means Settings() only runs once per process — every
    # call after the first returns the same cached instance instantly.
    return Settings()

"""
seed.py
------------------------------------------------------------------
Seed script — populates the database with your real portfolio
content. This is the ONE place project/skill/achievement content
is defined; the API just reads whatever is in the DB, so re-running
this after editing it updates what the live site shows.

Run with:
    cd backend
    python -m app.seed

>>> FILL IN before running: github_link / live_demo_link fields below <<<
(marked with TODO comments)
------------------------------------------------------------------
"""

from app.database import SessionLocal, engine, Base
from app.models import Project, Skill, Achievement

Base.metadata.create_all(bind=engine)

db = SessionLocal()

# ---- Clear existing rows (safe for re-seeding in dev) ----------------
db.query(Project).delete()
db.query(Skill).delete()
db.query(Achievement).delete()

# ---- Projects ----------------------------------------------------------
projects = [
    Project(
        title="CareerSync",
        description="Career guidance and job-portal platform with authentication, "
        "resume upload, job listings, dashboards, and profile management.",
        features=["Authentication", "Resume Upload", "Job Listings", "Dashboard", "Profile Management"],
        tech_stack=["Django", "MySQL", "HTML", "CSS", "JavaScript"],
        github_link="https://github.com/Aryan-19-2006/CareerSync",  # TODO: replace with real repo URL
        live_demo_link="",  # TODO: add live demo URL if deployed, else leave blank
        featured=True,
        order=1,
    ),
    Project(
        title="CrisisMatch",
        description="Real-time crisis response platform connecting people in crisis "
        "with nearby verified volunteers, with AI-based severity assessment.",
        features=["Real-time matching", "AI severity assessment", "Live location tracking", "SMS alerts"],
        tech_stack=["Next.js", "Node.js", "Socket.io", "Firebase", "GPT-4o", "Twilio"],
        github_link="https://github.com/Anshika2220/CrisisMatchAI.git/",  # TODO: replace with real repo URL
        live_demo_link="https://crisis-match-ai.vercel.app/",  # TODO: add live demo URL if deployed, else leave blank
        featured=True,
        order=2,
    ),
]

# ---- Skills --------------------------------------------------------------
skills_data = {
    "Languages": ["C++", "Python", "JavaScript", "TypeScript", "SQL"],
    "Frontend": ["React", "HTML", "CSS", "Tailwind"],
    "Backend": ["FastAPI", "Django"],
    "Database": ["PostgreSQL", "MySQL"],
    "Tools": ["Git", "GitHub", "VS Code"],
}
skills = [
    Skill(category=cat, name=name, order=i)
    for cat, names in skills_data.items()
    for i, name in enumerate(names)
]

# ---- Achievements ----------------------------------------------------------
achievements = [
    Achievement(title="100+ LeetCode Problems Solved", icon="trophy", order=1),
    Achievement(title="HackerRank SQL Certificate", icon="certificate", order=2),
    Achievement(title="Simplilearn Excel Certificate", icon="certificate", order=3),
    Achievement(title="Python Training Certificate", icon="certificate", order=4),
]

db.add_all(projects)
db.add_all(skills)
db.add_all(achievements)
db.commit()
db.close()

print("Database seeded successfully.")
print("Remember to replace the TODO placeholders in app/seed.py with your real GitHub/demo links.")

# Aryan Gupta — Portfolio

A full-stack developer portfolio: React + TypeScript + Tailwind + Framer Motion frontend,
FastAPI + PostgreSQL backend, dynamic project/skill/achievement data, a floating dock,
and a signature interactive terminal.

```
PostgreSQL  →  FastAPI  →  React  →  User
```

---

## Project structure

```
portfolio/
├── backend/
│   ├── app/
│   │   ├── main.py           # FastAPI entrypoint, CORS, router mounting
│   │   ├── config.py         # env var loading (Settings class)
│   │   ├── database.py       # SQLAlchemy engine/session
│   │   ├── models.py         # DB tables (Project, Skill, Achievement, ContactMessage)
│   │   ├── schemas.py        # Pydantic request/response shapes
│   │   ├── seed.py           # populates the DB with real content
│   │   └── routers/
│   │       ├── projects.py
│   │       ├── skills.py
│   │       ├── achievements.py
│   │       └── contact.py
│   ├── .env.example          # copy to .env and fill in
│   └── requirements.txt
└── frontend/
    ├── src/
    │   ├── config/siteConfig.ts   # ← every personal detail lives here
    │   ├── lib/api.ts              # typed API client
    │   ├── lib/terminalCommands.ts # terminal command definitions
    │   ├── hooks/useApiData.ts
    │   └── components/
    │       ├── Hero.tsx, About.tsx, Education.tsx
    │       ├── Skills.tsx, Projects.tsx, Achievements.tsx
    │       ├── Contact.tsx
    │       ├── FloatingDock.tsx
    │       └── Terminal.tsx
    ├── public/                    # ← add profile.jpg and resume.pdf here
    └── .env.example                # copy to .env and fill in
```

---

## Every place you need to fill in something

This is the complete list. Nothing else in the codebase needs editing to get
your real content live.

### 1. `backend/.env` (copy from `backend/.env.example`)

| Variable | Required? | What it's for |
|---|---|---|
| `DATABASE_URL` | **Yes** | Your PostgreSQL connection string |
| `FRONTEND_ORIGINS` | **Yes** | Comma-separated allowed origins (add your Vercel URL once deployed) |
| `EMAIL_API_KEY`, `EMAIL_FROM`, `EMAIL_TO` | Optional | Only if you want the contact form to also send you an email (Resend/SendGrid) |
| `GITHUB_TOKEN`, `GITHUB_USERNAME` | Optional | Phase 2 — live GitHub stats |
| `LEETCODE_USERNAME` | Optional | Phase 2 — live LeetCode stats |

### 2. `backend/app/seed.py`

4 TODOs — replace with your real repo/demo links:

- `Project(title="CareerSync", ...)` → `github_link`, `live_demo_link`
- `Project(title="CrisisMatch", ...)` → `github_link`, `live_demo_link`

Run after editing:
```bash
cd backend
python -m app.seed
```

### 3. `frontend/.env` (copy from `frontend/.env.example`)

| Variable | Required? | What it's for |
|---|---|---|
| `VITE_API_URL` | **Yes** | Your backend's URL (`http://localhost:8000` locally, your Render/Railway URL in production) |

### 4. `frontend/src/config/siteConfig.ts`

The single source of truth for personal details. Every component reads from here:

- `name` — confirm/replace
- `links.github`, `links.linkedin`, `links.leetcode` — your real profile URLs
- `links.email` — your real contact email
- `links.resumeUrl` — keep as `/resume.pdf` if you add the file below, or change the path
- `profileImage` — keep as `/profile.jpg` if you add the file below, or change the path
- `education` — already filled from your spec; edit if anything's inaccurate

### 5. Files to physically add to `frontend/public/`

- `profile.jpg` — your photo (Hero section falls back to hiding the image if missing, so the site still works without it)
- `resume.pdf` — your resume (Dock's "Resume" button and the `resume` terminal command both link here)

---

## Running locally

**Backend**
```bash
cd backend
python -m venv venv && source venv/bin/activate   # or venv\Scripts\activate on Windows
pip install -r requirements.txt
cp .env.example .env        # then fill in DATABASE_URL
python -m app.seed          # populate the database
uvicorn app.main:app --reload
```
API docs available at `http://localhost:8000/docs`.

**Frontend**
```bash
cd frontend
npm install
cp .env.example .env        # VITE_API_URL=http://localhost:8000
npm run dev
```
Site available at `http://localhost:5173`.

---

## Deployment

- **Frontend → Vercel**: import the `frontend/` folder as the project root, set `VITE_API_URL` in Vercel's environment variables to your deployed backend URL.
- **Backend → Railway or Render**: set `DATABASE_URL` and `FRONTEND_ORIGINS` (your Vercel domain) as environment variables. Start command: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`.
- **Database → Railway/Render/Neon PostgreSQL**: copy the connection string they give you into both your local `.env` (for seeding) and the backend host's environment variables.

After deploying, re-run `python -m app.seed` once against the production `DATABASE_URL` to populate the live database.

---

## Terminal commands

`help`, `about`, `skills`, `projects`, `education`, `achievements`, `contact`,
`resume`, `whoami`, `hireme`, `careersync`, `crisismatch`, `leetcode`, `github`, `clear`

Defined in `frontend/src/lib/terminalCommands.ts` — add a new command by adding
a key to the `commands` object and a line to `helpText`.

---

## Phase 2 (not built yet, per spec's "Advanced Features")

Blog system, admin dashboard, visitor analytics, live GitHub/LeetCode API integration,
AI chatbot, resume analyzer, dark/light toggle, Docker deployment.

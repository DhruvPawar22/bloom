# Bloom — Project Spec

## What is Bloom?
A period tracking PWA for a single user. React (TypeScript) + Vite frontend, FastAPI backend, PostgreSQL DB.

**Core features:**
- Period / cycle tracking
- Cycle phase prediction (simple average-based)
- Daily flow intensity logging (none / spotting / light / medium / heavy)
- Sexual activity tracking
- Contraception tracking
- Partner calendar sharing

---

## Tech Stack

| Layer | Choice |
|---|---|
| Frontend | React 19 + TypeScript, Vite 8 |
| Styling | Tailwind CSS v4 (via `@tailwindcss/vite` plugin) |
| Icons | Lucide React |
| Routing | react-router-dom v7 |
| HTTP client | Axios |
| Backend | FastAPI (Python 3.12) |
| ORM | SQLAlchemy (fully async, asyncpg driver) |
| Migrations | Alembic (async via `run_sync` pattern) |
| Auth | JWT (python-jose), bcrypt password hashing (passlib + bcrypt==4.0.1) |
| DB | PostgreSQL 16 (Docker container) |
| Python env | Poetry (pyproject.toml, no requirements.txt) |

---
cd C:\Users\dhruv\penpot\mcp
pnpm run bootstrap
## Design System

- **Primary accent:** `#e85d75` (rose)
- **Text primary:** `#1a1a2e`
- **Text secondary:** `#6b6b8a`
- **Input background:** `#fafafc`
- **Border:** `#e8e8f0`
- **Font:** Inter
- **Style:** Soft / minimal, white background, rounded inputs (radius 10px), rounded buttons (radius 12px)
- **Mobile-first:** 390×844px frames (iPhone-sized)

CSS variables are defined in `frontend/src/index.css`:
```css
--rose: #e85d75;
--text-primary: #1a1a2e;
--text-secondary: #6b6b8a;
--border: #e8e8f0;
--input-bg: #fafafc;
```

Login and Register screens have been designed in Figma (file: "Bloom — UI Design", key: `CQS1sJ2R6qfimDrKLmBPq7`).

---

## Repository Structure

```
bloom/
├── docker-compose.yml          # PostgreSQL 16 container
├── backend/
│   ├── pyproject.toml          # Poetry deps
│   ├── .env                    # DATABASE_URL, SECRET_KEY
│   ├── alembic/
│   │   ├── env.py              # Async alembic setup
│   │   └── versions/
│   │       └── 85842d2e9538_create_users_table.py
│   └── server/
│       ├── main.py             # FastAPI app + CORS
│       ├── database.py         # Async engine + get_db
│       ├── dependencies.py     # get_current_user dependency
│       ├── models/
│       │   ├── __init__.py
│       │   └── user.py
│       ├── schemas/
│       │   └── user.py
│       ├── crud/
│       │   └── user.py
│       ├── service/
│       │   └── user.py
│       ├── routers/
│       │   ├── __init__.py     # api_router aggregator
│       │   └── auth.py
│       └── utils/
│           ├── auth.py         # JWT + bcrypt helpers
│           └── dependencies.py # OAuth2 dependency
└── frontend/
    ├── package.json
    ├── vite.config.ts          # Tailwind plugin wired
    └── src/
        ├── index.css           # Tailwind import + CSS vars
        └── App.tsx
```

---

## Backend — Key Patterns

### Layer order
`router → service → crud → DB`

### Database
```python
# backend/.env
DATABASE_URL=postgresql+asyncpg://dhruv:dhruv@localhost:5432/bloom_db
SECRET_KEY=bloom_auth123
```
Docker Compose runs Postgres on port 5432 (user/pass/db = dhruv/dhruv/bloom_db).

### Auth flow
- `POST /auth/register` → creates user, returns `UserOutput`
- `POST /auth/login` → validates credentials, returns JWT `Token`
- `GET /auth/me` → protected, returns current user

### Protected routes pattern
```python
# In routers/__init__.py — add dependency to protect a whole router:
api_router.include_router(some_router, dependencies=[Depends(get_current_user)])
```

### Pydantic v2
- Use `model_config = {"from_attributes": True}` (not `orm_mode`)
- Use actual types: `id: uuid.UUID`, `created_at: datetime` (not `str`)

### User model columns
| Column | Type | Notes |
|---|---|---|
| id | UUID PK | default uuid4 |
| email | String | unique, indexed, not null |
| hashed_password | String | nullable (for future Google OAuth) |
| google_id | String | nullable, unique |
| display_name | String | nullable |
| created_at | DateTime | default utcnow |

---

## What's Done

| Ticket | Description | Status |
|---|---|---|
| #1 | FastAPI health endpoint + CORS | ✅ Done |
| #2 | Frontend scaffold (Vite + React + TS) | ✅ Done |
| #3 | PostgreSQL via Docker Compose | ✅ Done |
| #4 | SQLAlchemy async setup | ✅ Done |
| #5 | Alembic migrations (users table) | ✅ Done |
| #6 | User model + register endpoint | ✅ Done |
| #7 | Login endpoint + JWT | ✅ Done |
| #8 | Auth dependency (`get_current_user`) | ✅ Done |
| #9 | Frontend Login/Register pages | 🔄 In progress |

---

## What's Next

### Ticket #9 — Frontend Login/Register pages
Still needs to be coded. Designs exist in Figma.

**Files to create:**
- `frontend/src/pages/Login.tsx`
- `frontend/src/pages/Register.tsx`

**Requirements:**
- Tailwind CSS for styling (already configured)
- Lucide React icons: `Mail`, `Lock`, `User`, `Eye`, `EyeOff`
- Controlled inputs (useState)
- `react-router-dom` `<Link>` between pages
- Wire routes in `App.tsx` (`/login` → Login, `/register` → Register)
- Call backend API via Axios on submit (ticket #10 will add auth context)

**Input field pattern with icon:**
```tsx
<div className="relative flex items-center">
  <Mail size={16} className="absolute left-4 text-[#6b6b8a]" />
  <input
    className="w-full pl-11 pr-4 h-12 rounded-[10px] bg-[#fafafc] border border-[#e8e8f0] text-sm placeholder:text-[#b3b3c0] focus:outline-none focus:border-[#e85d75]"
    placeholder="you@example.com"
    type="email"
  />
</div>
```

### Ticket #10 — Auth context + token storage
- React context (`AuthContext`) with `user`, `login()`, `logout()`
- Store JWT in `localStorage`
- Axios interceptor to attach `Authorization: Bearer <token>` header
- Redirect to `/login` when unauthenticated

### Upcoming tickets
- #11 DailyLog model & migration
- #12 CRUD API for daily logs
- #13 Frontend log entry form
- #14 Frontend calendar view
- #15 Cycle calculation logic
- #16 Prediction API endpoint
- #17 Frontend dashboard
- #18–20 Contraception tracking (model, API, frontend)
- #21–25 Partner sharing (model, API, frontend)
- #26–28 PWA (manifest, icons, iOS)
- #31–33 Google OAuth (backend, model update, frontend)

---

## Running the Project

```bash
# Start Postgres
docker compose up -d

# Start backend (from /backend)
poetry run uvicorn server.main:app --reload

# Start frontend (from /frontend)
npm run dev
```

---

## Working Agreements

- **This is a learning project** — Claude acts as PM/reviewer, not code writer. The developer writes all code themselves. Claude writes code only when explicitly asked.
- **GitHub Issues** are used for ticket tracking (labels: epic, auth, tracking, frontend, backend, pwa, sharing)
- **Branch:** currently on `feat/auth_page`
- **Penpot MCP** is configured for design generation (server runs locally on `http://localhost:4401/mcp` — must be started before use with `pnpm run bootstrap` from the cloned `penpot/mcp` directory)

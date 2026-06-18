# Bloom — CLAUDE.md

## Project Overview

Bloom is a period-tracking PWA for a single user. React 19 + TypeScript frontend, FastAPI backend, PostgreSQL database. Mobile-first (390×844px, iPhone-sized).

---

## Working Agreement

- **This is a learning project.** Claude acts as PM and reviewer. The developer writes all code themselves.
- **Claude writes code only when explicitly asked.**
- Tickets are tracked via GitHub Issues (labels: `epic`, `auth`, `tracking`, `frontend`, `backend`, `pwa`, `sharing`).
---

## Tech Stack

| Layer | Choice |
|---|---|
| Frontend | React 19, TypeScript, Vite 8 |
| Styling | Tailwind CSS v4 via `@tailwindcss/vite` |
| Icons | Lucide React |
| Routing | react-router-dom v7 |
| HTTP | Axios |
| Backend | FastAPI (Python 3.12) |
| ORM | SQLAlchemy (fully async, asyncpg driver) |
| Migrations | Alembic (async via `run_sync` pattern) |
| Auth | JWT (python-jose) + bcrypt (passlib + bcrypt==4.0.1) |
| DB | PostgreSQL 16 (Docker) |
| Python env | Poetry (pyproject.toml — no requirements.txt) |

---

## Running the Project

```bash
# Postgres
docker compose up -d

# Backend (from /backend)
poetry run uvicorn server.main:app --reload

# Frontend (from /frontend)
npm run dev

# Penpot MCP server (from C:\Users\dhruv\penpot\mcp)
pnpm run bootstrap
```

The Penpot MCP server must be running **before** starting Claude Code for the tools to appear. It listens at `http://localhost:4401/mcp`.

---

## Repository Structure

```
bloom/
├── docker-compose.yml
├── SPEC.md                          # Full product spec — source of truth
├── backend/
│   ├── pyproject.toml
│   ├── .env                         # DATABASE_URL, SECRET_KEY
│   ├── alembic/
│   │   ├── env.py                   # Async Alembic setup
│   │   └── versions/
│   └── server/
│       ├── main.py                  # FastAPI app + CORS
│       ├── database.py              # Async engine + get_db
│       ├── dependencies.py
│       ├── models/user.py
│       ├── schemas/user.py
│       ├── crud/user.py
│       ├── service/user.py
│       ├── routers/
│       │   ├── __init__.py          # api_router aggregator
│       │   └── auth.py
│       └── utils/
│           ├── auth.py              # JWT + bcrypt helpers
│           └── dependencies.py     # get_current_user OAuth2 dep
└── frontend/
    ├── package.json
    ├── vite.config.ts
    └── src/
        ├── index.css                # Tailwind import + CSS vars
        ├── App.tsx                  # Routes go here
        └── main.tsx
```

Pages go in `frontend/src/pages/`. No pages exist yet — they are being built on `feat/auth_page`.

---

## Design System

CSS variables are defined in `frontend/src/index.css`.

| Token | Value | Usage |
|---|---|---|
| `--rose` | `#e85d75` | Primary accent, buttons, active states |
| `--text-primary` | `#1a1a2e` | Body text |
| `--text-secondary` | `#6b6b8a` | Labels, hints |
| `--input-bg` | `#fafafc` | Input field backgrounds |
| `--border` | `#e8e8f0` | Input/card borders |
| Page bg | `#f8f8fc` | App-level background |
| Font | Inter | All text |
| Input radius | 10px | `rounded-[10px]` |
| Button radius | 12px | `rounded-[12px]` |

### Flow intensity color scale

| Level | Hex | Text color |
|---|---|---|
| Spotting | `#FDDDE6` | dark |
| Light | `#F9A8BF` | dark |
| Medium | `#E85D75` | white |
| Heavy | `#9B1B35` | white |
| Predicted | `#FFE8EC` | dark |
| Activity dot | `#8B5CF6` (violet) | — |
| Medication dot | `#10B981` (emerald) | — |

### Reusable input pattern (from SPEC.md)

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

---

## Backend Patterns

### Layer order
`router → service → crud → DB`

### Auth endpoints
| Method | Path | Auth | Description |
|---|---|---|---|
| POST | `/auth/register` | public | Creates user, returns `UserOutput` |
| POST | `/auth/login` | public | Returns JWT `Token` |
| GET | `/auth/me` | protected | Returns current user |

### Protecting a whole router
```python
api_router.include_router(some_router, dependencies=[Depends(get_current_user)])
```

### Pydantic v2
- Use `model_config = {"from_attributes": True}` (not `orm_mode`)
- Use actual types: `id: uuid.UUID`, `created_at: datetime`

### User model columns
| Column | Type | Notes |
|---|---|---|
| id | UUID PK | default uuid4 |
| email | String | unique, indexed, not null |
| hashed_password | String | nullable (Google OAuth later) |
| google_id | String | nullable, unique |
| display_name | String | nullable |
| created_at | DateTime | default utcnow |

### DB credentials (local dev)
```
DATABASE_URL=postgresql+asyncpg://dhruv:dhruv@localhost:5432/bloom_db
SECRET_KEY=bloom_auth123
```

---

## Penpot (Design)

High-fidelity wireframes for all 5 screens live in Penpot ("Screens" page):

| Frame | x offset | Nav active |
|---|---|---|
| Login | 0 | — |
| Register | 430 | — |
| Dashboard | 860 | Home |
| Calendar | 1290 | Calendar |
| Daily Log | 1720 | Log |

**To use Penpot MCP tools:** start the server first (`pnpm run bootstrap` from `C:\Users\dhruv\penpot\mcp`), then start Claude Code. Tools appear as `mcp__penpot__*`.

---

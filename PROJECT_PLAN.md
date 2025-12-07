# E‑Commerce MVP — Project Plan

## Overview

This repository contains a 5‑day plan to build an e‑commerce MVP (catalog, cart, checkout (mock payments), admin CRUD & dashboard) using:
- Frontend: React + TypeScript + TanStack Query + react-router
- Backend: ASP.NET Core (Clean Architecture) + EF Core + Npgsql (Postgres)

The goal: a working demo deployable to Render with seeded demo data and a seeded admin user for QA.

---

## Quick Start (Day 1 smoke test)

1. Ensure Docker is running.
2. From repo root run:

```pwsh
docker-compose -f docker-compose.dev.yml up --build
```

3. Smoke test: `GET http://localhost:5000/api/products` should return seeded products (see seed data).

---

## 5‑Day Checklist (short)

- Day 1: Scaffold & Dev Environment — repo files, `docker-compose.dev.yml`, seed admin user.
- Day 2: Domain & Backend API — domain models, EF Core, migrations, product API endpoints, auth.
- Day 3: Frontend Core — product list/detail pages, TanStack Query hooks, routing, Cart Context.
- Day 4: Checkout & Admin — order endpoints, mock payment gateway, admin CRUD and UI.
- Day 5: QA & Deploy — tests, Dockerfiles, CI, Render deploy, README and demo runbook.

---

## Seeded Demo Credentials (Day 1)

- Admin email: `admin@example.com`
- Admin password: `Passw0rd!`  (demo only — change before production)

The admin user is created by `server/src/Infrastructure/Initialiser/SeedData.cs` (see file). Do NOT commit production secrets.

---

## Secrets Handling

- Do NOT commit real secrets. Use environment variables for DB connection string, JWT secret, and any API keys.
- Local dev: create a `.env.local` (ignored by git) with values and reference them in `docker-compose.dev.yml`.

---

## Files to know for Day 1

- `docker-compose.dev.yml` — brings up Postgres, API, and client for local development.
- `server/src/Infrastructure/Initialiser/SeedData.cs` — seed logic that creates roles, admin user, and demo products.
- `client/README_DEV.md` — simple dev instructions for the frontend.

---

## OpenAPI & Types

- We will expose OpenAPI/Swagger from the API and (optionally) generate TypeScript types into `client/src/types/` using openapi-generator or NSwag in CI. If generator time is limited, maintain `client/src/types/` manually.

---

## Stop / Resume Checklist (what to do when reopening the project)

1. Start Docker and run `docker-compose -f docker-compose.dev.yml up --build`.
2. Check API at `http://localhost:5000/swagger` (if Swagger is enabled).
3. Use seeded admin credentials to sign in to admin dashboard.
4. Run frontend dev server (`cd client && npm install && npm run dev`) if you prefer running client separately.

---

## Next immediate tasks (short)

1. Implement and test `GET /api/products` and `GET /api/products/{id}`.
2. Add TanStack Query hooks `useProducts` and `useProduct` on the client.
3. Implement Cart Context and product list page.

---

## Notes & Hints

- If you need to re-seed the database, run the initializer or drop the Postgres volume under `docker-compose`.
- Keep `PROJECT_PLAN.md` current — update it as you move features between MVP and stretch goals.

---

Authored: 2025-12-07

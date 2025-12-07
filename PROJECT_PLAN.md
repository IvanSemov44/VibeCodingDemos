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

---

## Expanded 5‑Day Plan (detailed)

**Day 1 — Scaffold & Dev Environment**
- **Goal:** Reproducible local dev environment with Docker, seeded DB, and working client + API.
- **Tasks:**
	- Add/verify `docker-compose.dev.yml` contains Postgres, API, and client services.
	- Ensure `server/Api/Program.cs` runs seeder (`server/src/Infrastructure/Initialiser/SeedData.cs`) at startup.
	- Verify `client/README_DEV.md` has start instructions.
	- Start stack and confirm `GET /api/products` returns seeded data.
- **Acceptance:** `curl http://localhost:5000/api/products` returns seed items; client served at vite dev server or container.
- **Time:** 2–4 hours.

**Day 2 — Domain & Backend API**
- **Goal:** Solid domain model, EF Core DB setup, migrations, and product endpoints with OpenAPI.
- **Tasks:**
	- Verify `Api.Domain.Entities` models (e.g., `Product`) include required fields.
	- Add/verify EF Core migrations and ability to apply them (or ensure seeder creates DB).
	- Implement API endpoints: `GET /api/products`, `GET /api/products/{id}`, plus add `POST/PUT/DELETE` for admin CRUD if required.
	- Add Swagger/OpenAPI (`AddSwaggerGen`) and ensure docs accessible at `/swagger`.
	- Add basic request/response DTOs if you want to avoid returning EF entities directly.
- **Acceptance:** Endpoints return correct payloads; Swagger displays schema for `Product`. Migrations can be created/applied.
- **Time:** 1–2 days.

**Day 3 — Frontend Core (Product pages, hooks, Cart)**
- **Goal:** Product listing & detail pages, TanStack Query hooks, cart UX ready for checkout integration.
- **Tasks:**
	- Add TanStack Query hooks: `client/src/api/useProducts.ts` and `client/src/api/useProduct.ts`.
	- Implement `ProductList` and `ProductDetail` pages with routes.
	- Implement `CartContext` (or adapt existing Redux `cartSlice`) with `add`, `remove`, `clear`, and persistence in `localStorage`.
	- Add `Cart` page/component showing items, totals, and ability to change quantities.
	- Add header cart-count indicator and nav.
	- Ensure accessibility and basic styling.
- **Acceptance:** User can browse products, view details, add/remove items to/from cart, and cart survives page reload.
- **Time:** 1 day.

**Day 4 — Checkout & Admin**
- **Goal:** Mock checkout flow and admin CRUD/dashboard.
- **Tasks:**
	- Add checkout flow (review order, mock payment step that returns success/failure).
	- Add server endpoints for orders (store order records in DB if desired).
	- Implement admin auth (seeded `admin@example.com`) and admin CRUD UI for `Product` (create/edit/delete).
	- Add role-based protection on API admin endpoints (`[Authorize(Roles="Admin")]`).
- **Acceptance:** Admin user can log in and perform product CRUD; checkout flow completes end-to-end (mock).
- **Time:** 1–2 days.

**Day 5 — QA & Deploy**
- **Goal:** Tests, CI, container images, and deploy to target (Render).
- **Tasks:**
	- Add basic tests:
		- Backend: integration tests for `GET /api/products` and admin endpoints (local DB or in-memory).
		- Frontend: smoke tests for components/hooks (Jest + React Testing Library).
	- Add CI pipeline (GitHub Actions) to run tests and build/publish images.
	- Prepare production Dockerfiles and Render deploy settings, environment variables, and secrets guidance.
	- Create `README` runbook with deployment and rollback steps.
- **Acceptance:** CI passes, deployable images available, and README contains clear deploy/run steps.
- **Time:** 1 day.

**Cross‑cutting concerns & extras**
- Logging & error handling: structured logs on the API (`ILogger`).
- Secrets: environment variables for DB connection and JWT — never commit secrets.
- Type generation: optional OpenAPI -> TypeScript generation for precise client types into `client/src/types/`.
- Performance: set caching/HTTP headers as needed later.

---

Authored: 2025-12-07

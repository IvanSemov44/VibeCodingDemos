# Getting Started

This page covers quick local setup to run the dev stack and inspect seeded data.

Prerequisites
- Docker & Docker Compose
- Node.js + npm (optional if you prefer to run the client locally)

Start the dev stack

```powershell
docker compose -f docker-compose.dev.yml up -d --build
docker compose -f docker-compose.dev.yml ps
```

API
- Host: `http://localhost:5000`
- Swagger: `http://localhost:5000/swagger`

Client
- Host (Vite proxy): `http://localhost:5173`

Database
- Host (container): `postgres`
- Host (host port): `localhost:5433` (if you used the default compose mapping)
- DB name: `VibeCodingDemoE`
- User: `postgres`
- Password: (see `docker-compose.dev.yml`)

Seeded demo admin credentials (development only)
- Email: `admin@example.com`
- Password: `Passw0rd!`

Inspect DB (psql inside container)

```powershell
docker compose -f docker-compose.dev.yml exec postgres psql -U postgres -d VibeCodingDemoE
\dt
SELECT "Id", "Name", "Price" FROM "Products" LIMIT 10;
\q
```

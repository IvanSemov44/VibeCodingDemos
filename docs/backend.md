# Backend

Overview

The backend is an ASP.NET Core Web API using EF Core and PostgreSQL. Identity is used for authentication. During development we use `EnsureCreated()` and seed demo data; for production you should use EF Migrations instead.

Key files
- `server/Api/Program.cs` — startup, DI, DB readiness + seeding.
- `server/Infrastructure/Persistence/ApplicationDbContext.cs` — EF DbContext and `DbSet<Product>`.
- `server/Domain/Entities/Product.cs` — Product entity.
- `server/Api/Controllers/ProductController.cs` — product endpoints.

Running locally

Start the stack with Docker Compose (see Getting Started). The API listens on container port `8080` and is mapped to host `5000` by default in `docker-compose.dev.yml`.

OpenAPI / Swagger

Swagger UI is available at `http://localhost:5000/swagger` in development and describes all public endpoints. You can use this to generate TypeScript types with OpenAPI tools (NSwag or openapi-generator).

Seeding and data

Seeding occurs during startup (for the MVP) and inserts demo products and an admin user. For production replace `EnsureCreated` with EF Migrations and a controlled seeding process.

Notes
- DataProtection keys are persisted inside the container by default — mount a volume for persistence in prod.
- Align EF Core and Npgsql versions to avoid package downgrades.

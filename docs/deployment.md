# Deployment

This project targets simple deployments and the MVP is intended to be hosted on a platform such as Render. The documentation here covers important environment and deployment considerations.

Environment variables
- `ConnectionStrings__DefaultConnection` — PostgreSQL connection string (set by your host)
- `ASPNETCORE_ENVIRONMENT` — set to `Production` on deploy

Render notes
- Add a Postgres instance in Render and configure the `ConnectionStrings__DefaultConnection` environment variable with the connection string provided by Render.
- Build & start: for the API use `dotnet publish`/`dotnet Api.dll`. For the client you can either serve static built files (`vite build` and a static host) or use a separate static site service.

CI and docs

Documentation publishing is currently disabled in this repository. The previous automated workflow that built and published the MkDocs site has been removed. See `../docs/DOCS_REMOVAL.md` for details and instructions to re-enable docs publishing.

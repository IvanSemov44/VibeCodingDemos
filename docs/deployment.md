# Deployment

This project targets simple deployments and the MVP is intended to be hosted on a platform such as Render. The documentation here covers important environment and deployment considerations.

Environment variables
- `ConnectionStrings__DefaultConnection` — PostgreSQL connection string (set by your host)
- `ASPNETCORE_ENVIRONMENT` — set to `Production` on deploy

Render notes
- Add a Postgres instance in Render and configure the `ConnectionStrings__DefaultConnection` environment variable with the connection string provided by Render.
- Build & start: for the API use `dotnet publish`/`dotnet Api.dll`. For the client you can either serve static built files (`vite build` and a static host) or use a separate static site service.

CI and docs

You can publish documentation automatically using a CI workflow (GitHub Actions) that runs `mkdocs build` and deploys the static site to GitHub Pages or another host. Example workflow snippet is in the docs folder if you want to enable it.

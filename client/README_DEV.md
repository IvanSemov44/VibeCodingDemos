# Frontend — Dev Instructions

Simple steps to run the frontend during development:

1. Install dependencies:

```pwsh
cd client
npm install
```

2. Start dev server (Vite):

```pwsh
npm run dev
```

3. The app will usually be available at `http://localhost:3000` (or the port shown by Vite).

Notes:
- If running via `docker-compose.dev.yml`, the `client` service maps port `3000` on the host.
- Type definitions generated from OpenAPI should live in `client/src/types/`. See `client/src/types/README.md` for details.

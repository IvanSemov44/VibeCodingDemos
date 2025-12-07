# Frontend

Overview

The frontend is a Vite + React + TypeScript app. We use TanStack Query for server state and React Router for navigation.

Key files
- `client/src/main.tsx` — app entry; wraps with `QueryClientProvider`.
- `client/src/pages/ProductList.tsx` — product list page using `useProducts` hook.
- `client/src/api/useProducts.ts` — TanStack Query hook for fetching products.

Running locally

You can either run the client in Docker (the dev compose) or run Vite locally:

```powershell
# Run inside repository root (Docker)
docker compose -f docker-compose.dev.yml up -d client

# OR run locally
cd client
npm install
npm run dev
```

API proxy

During dev the Vite server proxies `/api` to the `api` container (configured in `client/vite.config.ts`). This avoids CORS config changes and makes local development convenient.

Adding TanStack Query

We added `@tanstack/react-query` and a small `useProducts` hook that provides loading/error states and caching.

# API & OpenAPI

This page explains how to inspect the OpenAPI (Swagger) spec and generate TypeScript client types from it.

Swagger endpoint (development)
- Run the dev stack: `docker compose -f docker-compose.dev.yml up -d --build`
- Open the Swagger UI: `http://localhost:5000/swagger`
- Raw OpenAPI JSON: `http://localhost:5000/swagger/v1/swagger.json`

Generate TypeScript types & client code (example using OpenAPI Generator CLI)

1) Using the openapi-generator Docker image (no local install):

```powershell
# generate a TypeScript Fetch-based client into client/src/api/generated
docker run --rm -v ${PWD}:/local openapitools/openapi-generator-cli generate `
  -i http://host.docker.internal:5000/swagger/v1/swagger.json `
  -g typescript-fetch `
  -o /local/client/src/api/generated `
  --additional-properties=supportsES6=true,useSingleRequestParameter=true
```

Notes:
- If you run the generator from the host and the API runs in Docker, use `host.docker.internal` (Windows/Mac) or adjust the URL accordingly. If you run the generator *inside* a container on the same compose network, use `http://api:8080/swagger/v1/swagger.json`.
- You can also generate Axios or other client styles by changing `-g` (e.g., `typescript-axios`).

2) Using NSwag (dotnet tool)

```powershell
# Install NSwag Console (one-time):
dotnet tool install --global NSwag.Console
# Generate TypeScript client
nswag openapi2tsclient /input:http://localhost:5000/swagger/v1/swagger.json /output:client/src/api/generated/apiClient.ts
```

3) Use generated types in the client

- Import generated types or clients from `client/src/api/generated` and adapt `useProducts` to call the generated client where appropriate.

Advice
- Commit generated types only if you prefer reproducible builds and smaller friction for consumers, otherwise add them to `.gitignore` and generate in CI.
- Consider adding a `scripts/generate-api.ps1` file or npm script to standardize generation.

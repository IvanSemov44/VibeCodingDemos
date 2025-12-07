# OpenAPI → TypeScript types

This folder is intended to contain generated TypeScript types from the backend OpenAPI spec.

If time permits, we'll generate types in CI using `openapi-generator` or `nswag` and commit the output to this folder. For the MVP you can maintain a small set of types manually here.

Example generator command (CI):

```pwsh
openapi-generator-cli generate -i http://localhost:5000/swagger/v1/swagger.json -g typescript-fetch -o client/src/types
```

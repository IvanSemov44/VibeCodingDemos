Docs Removal Notice

Date: 2025-12-07

What changed
- The generated `site/` build artifacts were removed from the repository and `site/` was added to `.gitignore` to avoid committing generated output.
- The GitHub Actions workflow that automatically built/published MkDocs (`.github/workflows/docs.yml`) and the repository-level `mkdocs.yml` config have been removed to stop CI from attempting doc builds.

Why
- Storing generated documentation artifacts inflates the repository and causes noisy CI failures. Removing them keeps the repo small and prevents unintended CI runs.

How to restore docs publishing
1. Re-add a `mkdocs.yml` at the repository root describing the docs site.
2. Re-create a GitHub Actions workflow (e.g., `.github/workflows/docs.yml`) that installs `mkdocs` and runs `mkdocs build` and a deploy step.
3. Optionally commit the static `site/` output to a branch dedicated to GitHub Pages, or configure Actions to publish the `site/` output directly.

Contact
- If you want me to re-enable docs publishing with a minimal workflow, say the word and I will create the files and a small, tested workflow.

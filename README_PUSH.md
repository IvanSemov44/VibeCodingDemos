# How to create the GitHub repository and publish

Use the GitHub CLI (`gh`) to create a repository from this local folder, push the code, and enable GitHub Pages for the docs workflow to publish.

Prerequisites
- Install Git: https://git-scm.com/
- Install GitHub CLI: https://cli.github.com/

Steps (example):

```powershell
# Configure your git identity (one-time)
git config --global user.name "Your Name"
git config --global user.email "you@example.com"

# Initialize (if not already a git repo)
git init
git add .
git commit -m "Initial commit: MVP scaffold and docs"

# Create repo on GitHub and push (replace <owner/repo> or omit owner to create in your account)
gh repo create yourusername/VibeCodingDemos --public --source=. --remote=origin --push

# On the GitHub repo page enable GitHub Pages (or the workflow will publish to gh-pages branch automatically).

# After pushing, documentation publishing is currently disabled. See `docs/DOCS_REMOVAL.md` for details.
```

If you prefer to create the repo through the web UI, create a new repository and then run:

```powershell
git remote add origin git@github.com:yourusername/VibeCodingDemos.git
git branch -M main
git push -u origin main
```

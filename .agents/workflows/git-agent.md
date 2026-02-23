---
description: Automatically test, commit, changelog, and push code to GitHub using Conventional Commits.
---

# Git Automation Agent Workflow

This workflow is designed to be run at the end of a completed task. It automates testing, semantic version bumping, changelog generation, smart commit messaging (Conventional Commits), and pushing to the remote GitHub repository.

## Prerequisites
- The `gh` CLI should be authenticated.
- All code changes for the feature/bugfix should be complete.
- This workflow must strictly follow the steps below without bypassing tests.

## Steps

1. **Pre-push Testing (Mandatory)**
   Ensure the application builds correctly before committing any code. If this fails, STOP the workflow and fix the bugs.
   ```bash
   cd app && npm run build
   ```

2. **Analyze Changes**
   Use `git diff --cached` and `git status` to analyze what files were changed. Determine the correct **Conventional Commit** prefix based on the changes:
   - `feat:` for new features
   - `fix:` for bug fixes
   - `docs:` for documentation changes (e.g., README updates)
   - `style:` for formatting/UI changes
   - `refactor:` for code restructuring without changing behavior
   - `chore:` for updating tasks, plans, or dependencies

3. **Version Bumping (Semantic Versioning)**
   Determine if the changes require a version bump. Use `npm version <patch|minor|major> --no-git-tag-version` in the `app/` directory to bump the version in `package.json`.
   - **Patch**: Bug fixes.
   - **Minor**: New backward-compatible features.
   - **Major**: Breaking changes.
   *Note: Extract the newly generated version number for the next steps.*

4. **Update Changelog**
   Open or create `CHANGELOG.md` in the root directory. Add a new version header (e.g., `## [vX.Y.Z] - YYYY-MM-DD`) and detail the additions, fixes, and changes clearly for end-users. Add a bullet point to the `README.md` "Changelog" section as well.

5. **Stage and Smart Commit**
   Stage all changes. Write a concise, descriptive commit message using the Conventional Commits format, referencing the version if bumped.
   ```bash
   git add .
   git commit -m "feat: implement global visualizers (vX.Y.Z)" -m "Detailed bullet points of what changed."
   ```

6. **Synchronize Project History**
   Copy the latest `task.md` and `implementation_plan.md` from the hidden agent directory to the local project `.project_history` folder to ensure transparency and history syncing.

7. **Push to Remote**
   Push the committed changes to your GitHub repository.
   ```bash
   git push origin main
   ```

8. **Report Success**
   Notify the user that the code has been successfully pushed. Briefly summarize the CI checks passed, the new version number, the commit message used, and the changelog entries added.

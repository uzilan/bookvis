# Git Hooks

This directory contains git hooks that should be installed for this project.

## Setup

To install the git hooks, run:

```bash
git config core.hooksPath .githooks
```

This will make git use the hooks in this directory instead of the default `.git/hooks/` location.

## Available Hooks

### pre-commit
Runs before each commit and performs:
- TypeScript type checking
- ESLint code quality checks
- Build verification

This ensures that only code that passes all checks and builds successfully can be committed.

## Manual Installation

If you prefer to install hooks manually, copy the files from `.githooks/` to `.git/hooks/`:

```bash
cp .githooks/* .git/hooks/
chmod +x .git/hooks/*
``` 
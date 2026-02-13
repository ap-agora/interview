#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
TEMPLATES="$ROOT_DIR/setup/templates"

echo "=========================================="
echo "  Setting up interview challenges..."
echo "=========================================="

export GIT_AUTHOR_NAME="Setup Script"
export GIT_AUTHOR_EMAIL="setup@interview.local"
export GIT_COMMITTER_NAME="Setup Script"
export GIT_COMMITTER_EMAIL="setup@interview.local"

# CHALLENGE 1
echo ""
echo "[1/5] Setting up: Git Recovery..."
CH1="$ROOT_DIR/01-git-recovery"
mkdir -p "$CH1/src"
cd "$CH1"
git init --initial-branch=main
cp "$TEMPLATES/01-git-recovery/package.json" .
cp "$TEMPLATES/01-git-recovery/tsconfig.json" .
cp "$TEMPLATES/01-git-recovery/jest.config.js" .
cp "$TEMPLATES/01-git-recovery/README.md" .
git add -A
GIT_AUTHOR_DATE="2024-01-10T09:00:00" GIT_COMMITTER_DATE="2024-01-10T09:00:00" git commit -m "Initial project setup"
cp "$TEMPLATES/01-git-recovery/src/transform.working.ts" src/transform.ts
git add -A
GIT_AUTHOR_DATE="2024-01-10T10:00:00" GIT_COMMITTER_DATE="2024-01-10T10:00:00" git commit -m "Implement data transformation utilities

Add parseCSV, transformRecords, validateSchema, and formatOutput
functions with full implementations."
cp "$TEMPLATES/01-git-recovery/src/transform.test.ts" src/transform.test.ts
git add -A
GIT_AUTHOR_DATE="2024-01-11T09:00:00" GIT_COMMITTER_DATE="2024-01-11T09:00:00" git commit -m "Add unit tests for data transformation utilities"
cp "$TEMPLATES/01-git-recovery/src/transform.broken.ts" src/transform.ts
git add -A
GIT_AUTHOR_NAME="Junior Developer" GIT_AUTHOR_EMAIL="junior@company.com" \
GIT_COMMITTER_NAME="Junior Developer" GIT_COMMITTER_EMAIL="junior@company.com" \
GIT_AUTHOR_DATE="2024-01-12T14:00:00" GIT_COMMITTER_DATE="2024-01-12T14:00:00" \
git commit -m "Refactor: clean up unused code

Simplified function signatures and removed old implementations
that were causing linting warnings."
cp "$TEMPLATES/01-git-recovery/notes.txt" notes.txt
git add notes.txt
npm install --silent 2>/dev/null || npm install
echo "  [OK] 01-git-recovery ready"

# CHALLENGE 2
echo ""
echo "[2/5] Setting up: Merge Conflicts..."
CH2="$ROOT_DIR/02-merge-conflicts"
mkdir -p "$CH2/src"
cd "$CH2"
git init --initial-branch=main
export GIT_AUTHOR_NAME="Setup Script"
export GIT_AUTHOR_EMAIL="setup@interview.local"
export GIT_COMMITTER_NAME="Setup Script"
export GIT_COMMITTER_EMAIL="setup@interview.local"
cp "$TEMPLATES/02-merge-conflicts/package.json" .
cp "$TEMPLATES/02-merge-conflicts/tsconfig.json" .
cp "$TEMPLATES/02-merge-conflicts/jest.config.js" .
cp "$TEMPLATES/02-merge-conflicts/README.md" .
git add -A
GIT_AUTHOR_DATE="2024-01-15T09:00:00" GIT_COMMITTER_DATE="2024-01-15T09:00:00" git commit -m "Initial project setup"
cp "$TEMPLATES/02-merge-conflicts/src/user-service.base.ts" src/user-service.ts
cp "$TEMPLATES/02-merge-conflicts/src/user-service.test.ts" src/user-service.test.ts
git add -A
GIT_AUTHOR_DATE="2024-01-15T10:00:00" GIT_COMMITTER_DATE="2024-01-15T10:00:00" git commit -m "Implement UserService with basic CRUD operations"
git branch feature/add-caching
cp "$TEMPLATES/02-merge-conflicts/src/user-service.main.ts" src/user-service.ts
git add -A
GIT_AUTHOR_DATE="2024-01-16T10:00:00" GIT_COMMITTER_DATE="2024-01-16T10:00:00" git commit -m "Add error handling and retry logic to UserService

- Add UserNotFoundError and ServiceError classes
- Wrap operations in try/catch with retry logic
- Add withRetry utility for transient failure resilience"
git checkout feature/add-caching
cp "$TEMPLATES/02-merge-conflicts/src/user-service.feature.ts" src/user-service.ts
git add -A
GIT_AUTHOR_DATE="2024-01-16T11:00:00" GIT_COMMITTER_DATE="2024-01-16T11:00:00" git commit -m "Add in-memory caching layer to UserService

- Add CacheEntry interface with TTL support
- Cache getUser and listUsers results
- Invalidate cache on deleteUser
- Add clearCache method"
npm install --silent 2>/dev/null || npm install
echo "  [OK] 02-merge-conflicts ready"

# CHALLENGE 3
echo ""
echo "[3/5] Setting up: Type/Lint Fix..."
CH3="$ROOT_DIR/03-type-lint-fix"
mkdir -p "$CH3/src"
cd "$CH3"
git init --initial-branch=main
export GIT_AUTHOR_NAME="Setup Script"
export GIT_AUTHOR_EMAIL="setup@interview.local"
export GIT_COMMITTER_NAME="Setup Script"
export GIT_COMMITTER_EMAIL="setup@interview.local"
cp "$TEMPLATES/03-type-lint-fix/package.json" .
cp "$TEMPLATES/03-type-lint-fix/tsconfig.json" .
cp "$TEMPLATES/03-type-lint-fix/.eslintrc.json" .
cp "$TEMPLATES/03-type-lint-fix/README.md" .
cp "$TEMPLATES/03-type-lint-fix/src/models.ts" src/models.ts
cp "$TEMPLATES/03-type-lint-fix/src/inventory.ts" src/inventory.ts
cp "$TEMPLATES/03-type-lint-fix/src/cart.ts" src/cart.ts
git add -A
GIT_AUTHOR_DATE="2024-01-20T09:00:00" GIT_COMMITTER_DATE="2024-01-20T09:00:00" git commit -m "Add inventory management module (needs type fixes)"
mkdir -p .git/hooks
cp "$TEMPLATES/03-type-lint-fix/pre-commit-hook.sh" .git/hooks/pre-commit
chmod +x .git/hooks/pre-commit
cp "$TEMPLATES/03-type-lint-fix/src/cart.staged-wrong.ts" src/cart.ts
git add src/cart.ts
cp "$TEMPLATES/03-type-lint-fix/src/cart.ts" src/cart.ts
npm install --silent 2>/dev/null || npm install
echo "  [OK] 03-type-lint-fix ready"

# CHALLENGE 4
echo ""
echo "[4/5] Setting up: Docker Optimization..."
CH4="$ROOT_DIR/04-docker-optimization"
mkdir -p "$CH4/src"
cd "$CH4"
git init --initial-branch=main
export GIT_AUTHOR_NAME="Setup Script"
export GIT_AUTHOR_EMAIL="setup@interview.local"
export GIT_COMMITTER_NAME="Setup Script"
export GIT_COMMITTER_EMAIL="setup@interview.local"
cp "$TEMPLATES/04-docker-optimization/package.json" .
cp "$TEMPLATES/04-docker-optimization/tsconfig.json" .
cp "$TEMPLATES/04-docker-optimization/Dockerfile" .
cp "$TEMPLATES/04-docker-optimization/README.md" .
cp "$TEMPLATES/04-docker-optimization/src/index.ts" src/index.ts
git add -A
GIT_AUTHOR_DATE="2024-02-01T09:00:00" GIT_COMMITTER_DATE="2024-02-01T09:00:00" git commit -m "Add Express API with Dockerfile"
npm install --silent 2>/dev/null || npm install
echo "  [OK] 04-docker-optimization ready"

# CHALLENGE 5
echo ""
echo "[5/5] Setting up: LRU Cache..."
CH5="$ROOT_DIR/05-algorithm"
mkdir -p "$CH5/src"
cd "$CH5"
git init --initial-branch=main
export GIT_AUTHOR_NAME="Setup Script"
export GIT_AUTHOR_EMAIL="setup@interview.local"
export GIT_COMMITTER_NAME="Setup Script"
export GIT_COMMITTER_EMAIL="setup@interview.local"
cp "$TEMPLATES/05-algorithm/package.json" .
cp "$TEMPLATES/05-algorithm/tsconfig.json" .
cp "$TEMPLATES/05-algorithm/jest.config.js" .
cp "$TEMPLATES/05-algorithm/README.md" .
cp "$TEMPLATES/05-algorithm/src/lru-cache.ts" src/lru-cache.ts
cp "$TEMPLATES/05-algorithm/src/lru-cache.test.ts" src/lru-cache.test.ts
git add -A
GIT_AUTHOR_DATE="2024-02-05T09:00:00" GIT_COMMITTER_DATE="2024-02-05T09:00:00" git commit -m "Add LRU Cache skeleton with test suite"
npm install --silent 2>/dev/null || npm install
echo "  [OK] 05-algorithm ready"

# FINALIZE
echo ""
echo "Copying main README..."
cp "$TEMPLATES/README.main.md" "$ROOT_DIR/README.md"
echo "Cleaning up setup files..."
rm -rf "$ROOT_DIR/setup"
unset GIT_AUTHOR_NAME GIT_AUTHOR_EMAIL GIT_COMMITTER_NAME GIT_COMMITTER_EMAIL
echo ""
echo "=========================================="
echo "  All 5 challenges are ready!"
echo "  Open README.md for an overview."
echo "=========================================="

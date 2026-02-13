# Challenge 1: Junior Broke Production

## Scenario

This project is a CSV data transformation library. It was working perfectly —
all tests were passing. Then a junior developer committed a "refactor" that
gutted the implementation. Every function now throws `Not implemented`.

Your job: **restore the working code so that all tests pass again.**

## Goals

1. Run `npm test` to see the current failures.
2. Use git history to find the working implementation.
3. Restore the code.
4. Run `npm test` again — all 8 tests should pass.

## Hints

- `git log` shows the commit history.
- `git diff HEAD~1` shows what the last commit changed.
- `git show <commit>:<file>` displays a file at a specific commit.
- Be aware of the current `git status` — there may be staged changes you should leave alone.

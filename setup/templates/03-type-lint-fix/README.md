# Challenge 3: Fix the Types

## Scenario

This is an inventory management module with **strict TypeScript** and **ESLint**
enabled. The code has ~15-20 type errors and lint violations across 3 files.

A pre-commit hook blocks commits until all errors are resolved.

## Goals

1. Run `npm run check` to see all errors.
2. Fix every TypeScript and ESLint error in `src/`.
3. Check `git status` — some files have incorrect staged changes that you should
   unstage first (`git reset` or `git restore --staged`).
4. Stage your fixes and commit. The pre-commit hook will verify everything passes.

## Hints

- Start with `npm run build` (TypeScript errors) and `npm run lint` (ESLint errors) separately.
- Common fixes: add return types, replace `any` with proper types, use `const` instead of `let`, add null checks, remove unused imports.
- The `ProductCatalog` type alias in `models.ts` has its generic arguments swapped.
- In `cart.ts`, `getItemQuantity` can crash on undefined — add a null check.

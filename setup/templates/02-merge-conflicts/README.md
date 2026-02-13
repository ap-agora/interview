# Challenge 2: Conflicting Feature Branches

## Scenario

You're on the `feature/add-caching` branch. You added an in-memory cache with
TTL to the `UserService`. Meanwhile, another developer added error handling and
retry logic to `main`.

Both changes are correct and need to coexist in the final code.

## Goals

1. Merge `main` into your current branch: `git merge main`
2. Resolve the merge conflicts — **you need BOTH caching AND error handling.**
3. Run `npm test` to verify the merged result works correctly.

## Hints

- Don't just pick one side — combine both changes logically.
- The caching layer should wrap the error-handling/retry logic, or vice versa.
- After resolving, `git add` the files and `git merge --continue`.
- The test suite checks for both caching behavior and error classes.

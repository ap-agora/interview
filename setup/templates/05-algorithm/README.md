# Challenge 5: LRU Cache

## Scenario

Implement a generic `LRUCache<K, V>` class with **O(1)** `get` and `put` operations.

The test suite and type signatures are already provided in `src/lru-cache.ts`.
Fill in the `TODO` sections to make all tests pass.

## Goals

1. Tests are running in watch mode — you'll see them update as you code.
2. Implement `get(key)` — returns the value or `undefined`. Marks the key as recently used.
3. Implement `put(key, value)` — inserts or updates. Evicts the least recently used item if at capacity.
4. Implement the `size` getter and `keys()` method.
5. All 11 tests should pass.

## Hints

- JavaScript's `Map` iterates in insertion order. You can exploit this:
  deleting and re-inserting a key moves it to the end.
- Alternatively, build a classic doubly-linked list + Map.
- The `keys()` method should return keys from least recently used to most recently used.

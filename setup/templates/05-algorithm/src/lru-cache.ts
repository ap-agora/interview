/**
 * Implement an LRU (Least Recently Used) Cache.
 *
 * Requirements:
 * - get(key) should return the value if it exists, or undefined if not.
 *   Accessing a key makes it the most recently used.
 * - put(key, value) should insert or update the value.
 *   If the cache exceeds capacity, evict the LEAST recently used item.
 * - Both operations must be O(1) time complexity.
 *
 * HINT: Consider using a Map (which maintains insertion order in JS)
 * combined with a strategy to move accessed keys to the "end" (most recent).
 * Alternatively, implement a doubly-linked list + Map for a classic approach.
 */

export class LRUCache<K, V> {
  private readonly capacity: number;

  // HINT: You'll need a data structure that supports:
  //   - O(1) lookup by key
  //   - O(1) insertion/deletion
  //   - O(1) access to the least recently used item
  // A Map + doubly-linked list is the classic approach.
  // JavaScript's Map iterates in insertion order — you can exploit this.

  constructor(capacity: number) {
    if (capacity <= 0) {
      throw new Error('Capacity must be greater than 0');
    }
    this.capacity = capacity;

    // TODO: Initialize your data structure(s) here
  }

  /**
   * Get the value for a key. Returns undefined if key doesn't exist.
   * This operation marks the key as most recently used.
   */
  get(key: K): V | undefined {
    // TODO: Implement me
    return undefined;
  }

  /**
   * Insert or update a key-value pair.
   * If cache is at capacity, evict the least recently used item first.
   */
  put(key: K, value: V): void {
    // TODO: Implement me
  }

  /**
   * Return the current number of items in the cache.
   */
  get size(): number {
    // TODO: Implement me
    return 0;
  }

  /**
   * Return the keys in order from least recently used to most recently used.
   * (Useful for debugging)
   */
  keys(): K[] {
    // TODO: Implement me
    return [];
  }
}

import { LRUCache } from './lru-cache';

describe('LRUCache', () => {
  it('should store and retrieve a value', () => {
    const cache = new LRUCache<string, number>(3);
    cache.put('a', 1);
    expect(cache.get('a')).toBe(1);
  });

  it('should return undefined for missing keys', () => {
    const cache = new LRUCache<string, number>(3);
    expect(cache.get('missing')).toBeUndefined();
  });

  it('should track the size correctly', () => {
    const cache = new LRUCache<string, number>(3);
    expect(cache.size).toBe(0);
    cache.put('a', 1);
    expect(cache.size).toBe(1);
    cache.put('b', 2);
    expect(cache.size).toBe(2);
  });

  it('should evict the least recently used item when at capacity', () => {
    const cache = new LRUCache<string, number>(2);
    cache.put('a', 1);
    cache.put('b', 2);
    cache.put('c', 3); // should evict 'a'
    expect(cache.get('a')).toBeUndefined();
    expect(cache.get('b')).toBe(2);
    expect(cache.get('c')).toBe(3);
  });

  it('should not exceed capacity', () => {
    const cache = new LRUCache<string, number>(2);
    cache.put('a', 1);
    cache.put('b', 2);
    cache.put('c', 3);
    expect(cache.size).toBe(2);
  });

  it('should update existing keys without changing capacity', () => {
    const cache = new LRUCache<string, number>(2);
    cache.put('a', 1);
    cache.put('b', 2);
    cache.put('a', 10); // update, not insert
    expect(cache.size).toBe(2);
    expect(cache.get('a')).toBe(10);
  });

  it('should make accessed keys most recently used (get refreshes)', () => {
    const cache = new LRUCache<string, number>(2);
    cache.put('a', 1);
    cache.put('b', 2);
    cache.get('a'); // 'a' is now most recently used
    cache.put('c', 3); // should evict 'b', not 'a'
    expect(cache.get('a')).toBe(1);
    expect(cache.get('b')).toBeUndefined();
    expect(cache.get('c')).toBe(3);
  });

  it('should make updated keys most recently used (put refreshes)', () => {
    const cache = new LRUCache<string, number>(2);
    cache.put('a', 1);
    cache.put('b', 2);
    cache.put('a', 10); // 'a' is now most recently used
    cache.put('c', 3); // should evict 'b', not 'a'
    expect(cache.get('a')).toBe(10);
    expect(cache.get('b')).toBeUndefined();
  });

  it('should work with different key/value types', () => {
    const cache = new LRUCache<number, string>(2);
    cache.put(1, 'one');
    cache.put(2, 'two');
    expect(cache.get(1)).toBe('one');
    expect(cache.get(2)).toBe('two');
  });

  it('should return keys in LRU order (least recent first)', () => {
    const cache = new LRUCache<string, number>(3);
    cache.put('a', 1);
    cache.put('b', 2);
    cache.put('c', 3);
    cache.get('a'); // refresh 'a'
    // Order should be: b (least recent), c, a (most recent)
    expect(cache.keys()).toEqual(['b', 'c', 'a']);
  });

  it('should throw on invalid capacity', () => {
    expect(() => new LRUCache<string, number>(0)).toThrow();
    expect(() => new LRUCache<string, number>(-1)).toThrow();
  });
});

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user' | 'guest';
}

export interface UserFilters {
  role?: User['role'];
  search?: string;
}

interface CacheEntry<T> {
  data: T;
  expiresAt: number;
}

// Simulated database
const users: Map<string, User> = new Map([
  ['1', { id: '1', name: 'Alice Johnson', email: 'alice@example.com', role: 'admin' }],
  ['2', { id: '2', name: 'Bob Smith', email: 'bob@example.com', role: 'user' }],
  ['3', { id: '3', name: 'Charlie Brown', email: 'charlie@example.com', role: 'guest' }],
]);

const DEFAULT_TTL = 60_000; // 60 seconds

export class UserService {
  private userCache = new Map<string, CacheEntry<User>>();
  private listCache = new Map<string, CacheEntry<User[]>>();

  private getCacheKey(filters?: UserFilters): string {
    return JSON.stringify(filters ?? {});
  }

  private isExpired<T>(entry: CacheEntry<T>): boolean {
    return Date.now() > entry.expiresAt;
  }

  async getUser(id: string): Promise<User | null> {
    const cached = this.userCache.get(id);
    if (cached && !this.isExpired(cached)) {
      return cached.data;
    }

    const user = users.get(id);
    if (user) {
      this.userCache.set(id, {
        data: user,
        expiresAt: Date.now() + DEFAULT_TTL,
      });
    }
    return user ?? null;
  }

  async listUsers(filters?: UserFilters): Promise<User[]> {
    const cacheKey = this.getCacheKey(filters);
    const cached = this.listCache.get(cacheKey);
    if (cached && !this.isExpired(cached)) {
      return cached.data;
    }

    let result = Array.from(users.values());

    if (filters?.role) {
      result = result.filter((u) => u.role === filters.role);
    }

    if (filters?.search) {
      const term = filters.search.toLowerCase();
      result = result.filter(
        (u) =>
          u.name.toLowerCase().includes(term) ||
          u.email.toLowerCase().includes(term)
      );
    }

    this.listCache.set(cacheKey, {
      data: result,
      expiresAt: Date.now() + DEFAULT_TTL,
    });

    return result;
  }

  async deleteUser(id: string): Promise<boolean> {
    this.userCache.delete(id);
    this.listCache.clear();
    return users.delete(id);
  }

  clearCache(): void {
    this.userCache.clear();
    this.listCache.clear();
  }
}

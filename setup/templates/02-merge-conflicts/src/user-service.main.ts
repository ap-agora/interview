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

export class UserNotFoundError extends Error {
  constructor(public readonly userId: string) {
    super(`User not found: ${userId}`);
    this.name = 'UserNotFoundError';
  }
}

export class ServiceError extends Error {
  constructor(message: string, public readonly cause?: Error) {
    super(message);
    this.name = 'ServiceError';
  }
}

// Simulated database
const users: Map<string, User> = new Map([
  ['1', { id: '1', name: 'Alice Johnson', email: 'alice@example.com', role: 'admin' }],
  ['2', { id: '2', name: 'Bob Smith', email: 'bob@example.com', role: 'user' }],
  ['3', { id: '3', name: 'Charlie Brown', email: 'charlie@example.com', role: 'guest' }],
]);

async function withRetry<T>(fn: () => Promise<T>, retries = 3): Promise<T> {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      return await fn();
    } catch (err) {
      if (attempt === retries) throw err;
      await new Promise((resolve) => setTimeout(resolve, 100 * attempt));
    }
  }
  throw new Error('Unreachable');
}

export class UserService {
  async getUser(id: string): Promise<User> {
    return withRetry(async () => {
      try {
        const user = users.get(id);
        if (!user) {
          throw new UserNotFoundError(id);
        }
        return user;
      } catch (err) {
        if (err instanceof UserNotFoundError) throw err;
        throw new ServiceError('Failed to fetch user', err as Error);
      }
    });
  }

  async listUsers(filters?: UserFilters): Promise<User[]> {
    return withRetry(async () => {
      try {
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

        return result;
      } catch (err) {
        throw new ServiceError('Failed to list users', err as Error);
      }
    });
  }

  async deleteUser(id: string): Promise<boolean> {
    return users.delete(id);
  }
}

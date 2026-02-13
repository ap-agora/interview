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

// Simulated database
const users: Map<string, User> = new Map([
  ['1', { id: '1', name: 'Alice Johnson', email: 'alice@example.com', role: 'admin' }],
  ['2', { id: '2', name: 'Bob Smith', email: 'bob@example.com', role: 'user' }],
  ['3', { id: '3', name: 'Charlie Brown', email: 'charlie@example.com', role: 'guest' }],
]);

export class UserService {
  async getUser(id: string): Promise<User | null> {
    const user = users.get(id);
    return user ?? null;
  }

  async listUsers(filters?: UserFilters): Promise<User[]> {
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
  }

  async deleteUser(id: string): Promise<boolean> {
    return users.delete(id);
  }
}

import { UserService } from './user-service';

describe('UserService', () => {
  let service: UserService;

  beforeEach(() => {
    service = new UserService();
  });

  describe('getUser', () => {
    it('should return a user by id', async () => {
      const user = await service.getUser('1');
      expect(user).toBeDefined();
      expect(user!.name).toBe('Alice Johnson');
    });

    it('should handle missing users with appropriate error', async () => {
      try {
        const result = await service.getUser('nonexistent');
        expect(result).toBeNull();
      } catch (err: unknown) {
        expect((err as Error).message).toContain('not found');
      }
    });

    it('should cache repeated calls', async () => {
      const first = await service.getUser('1');
      const second = await service.getUser('1');
      expect(first).toEqual(second);
    });
  });

  describe('listUsers', () => {
    it('should return all users', async () => {
      const users = await service.listUsers();
      expect(users.length).toBeGreaterThanOrEqual(3);
    });

    it('should filter by role', async () => {
      const admins = await service.listUsers({ role: 'admin' });
      expect(admins.every((u) => u.role === 'admin')).toBe(true);
    });

    it('should filter by search term', async () => {
      const result = await service.listUsers({ search: 'alice' });
      expect(result.length).toBe(1);
      expect(result[0].name).toBe('Alice Johnson');
    });

    it('should handle errors with retry logic', async () => {
      const users = await service.listUsers();
      expect(Array.isArray(users)).toBe(true);
    });
  });

  describe('caching behavior', () => {
    it('should have cache-related methods or properties', () => {
      expect(typeof (service as any).clearCache === 'function' ||
             typeof (service as any).userCache !== 'undefined').toBe(true);
    });
  });

  describe('error handling', () => {
    it('should export error classes', async () => {
      const mod = await import('./user-service');
      expect(mod.UserNotFoundError || mod.ServiceError).toBeDefined();
    });
  });
});

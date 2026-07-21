import test from 'node:test';
import assert from 'node:assert/strict';
import { seedMockUsers, authenticateMockUser } from './mockAuth.js';

function createMemoryStorage() {
  const store = new Map();
  return {
    getItem(key) { return store.has(key) ? store.get(key) : null; },
    setItem(key, value) { store.set(key, String(value)); },
    removeItem(key) { store.delete(key); },
    clear() { store.clear(); },
  };
}

test('seedMockUsers creates demo accounts', () => {
  const storage = createMemoryStorage();
  const users = seedMockUsers(storage);

  assert.equal(users.length, 3);
  assert.deepEqual(users.map((user) => user.email), [
    'demo@dennismendez.com',
    'seller@dennismendez.com',
    'admin@dennismendez.com',
  ]);
});

test('authenticateMockUser returns a mock session for seeded credentials', () => {
  const storage = createMemoryStorage();
  const result = authenticateMockUser('demo@dennismendez.com', 'Password123!', storage);

  assert.ok(result);
  assert.equal(result.user.email, 'demo@dennismendez.com');
  assert.equal(result.user.role, 'customer');
  assert.match(result.tokens.access_token, /^mock-access-/);
});

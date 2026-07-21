import test from 'node:test';
import assert from 'node:assert/strict';
import { shouldUseMockAuth } from './authService.js';

test('shouldUseMockAuth enables mock auth in production by default', () => {
  assert.equal(shouldUseMockAuth({ PROD: true, VITE_USE_MOCK_AUTH: 'true' }), true);
  assert.equal(shouldUseMockAuth({ PROD: true, VITE_USE_MOCK_AUTH: 'false' }), false);
  assert.equal(shouldUseMockAuth({ PROD: false, VITE_USE_MOCK_AUTH: undefined }), false);
  assert.equal(shouldUseMockAuth({ PROD: true }), true);
});

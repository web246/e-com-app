const STORAGE_KEY = 'dm_mock_users';

const demoUsers = [
  {
    id: 'demo-customer',
    email: 'demo@dennismendez.com',
    password: 'Password123!',
    full_name: 'Demo Customer',
    phone: '+254700000001',
    role: 'customer',
    verified: true,
  },
  {
    id: 'demo-seller',
    email: 'seller@dennismendez.com',
    password: 'Password123!',
    full_name: 'Demo Seller',
    phone: '+254700000002',
    role: 'seller',
    verified: true,
  },
  {
    id: 'demo-admin',
    email: 'admin@dennismendez.com',
    password: 'Password123!',
    full_name: 'Demo Admin',
    phone: '+254700000003',
    role: 'admin',
    verified: true,
  },
];

function getStorage(storage = window?.localStorage) {
  return storage;
}

export function seedMockUsers(storage = window?.localStorage) {
  const source = getStorage(storage);
  const existing = source?.getItem(STORAGE_KEY);

  if (existing) {
    try {
      return JSON.parse(existing);
    } catch {
      source?.removeItem(STORAGE_KEY);
    }
  }

  source?.setItem(STORAGE_KEY, JSON.stringify(demoUsers));
  return demoUsers;
}

export function authenticateMockUser(email, password, storage = window?.localStorage) {
  const source = getStorage(storage);
  const seededUsers = seedMockUsers(source);
  const user = seededUsers.find((entry) => entry.email.toLowerCase() === String(email).toLowerCase());

  if (!user || user.password !== password) {
    throw Object.assign(new Error('Invalid email or password'), {
      code: 'INVALID_CREDENTIALS',
      status: 401,
    });
  }

  const tokens = {
    access_token: `mock-access-${user.id}`,
    refresh_token: `mock-refresh-${user.id}`,
    expires_in: 3600,
    token_type: 'Bearer',
  };

  return {
    user: {
      id: user.id,
      email: user.email,
      full_name: user.full_name,
      phone: user.phone,
      role: user.role,
      verified: user.verified,
      avatar_url: null,
    },
    tokens,
  };
}

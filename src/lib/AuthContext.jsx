import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext(null);
const USERS_KEY = 'dm_users';
const SESSION_KEY = 'dm_session';

function readUsers() {
  try { return JSON.parse(localStorage.getItem(USERS_KEY)) || []; } catch { return []; }
}
function writeUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}
function seedDemoUsers() {
  const existingUsers = readUsers();
  if (existingUsers.length > 0) return existingUsers;

  const demoUsers = [
    { id: 'u_demo_admin', email: 'admin@example.com', password: 'admin123', full_name: 'Admin Demo', role: 'admin' },
    { id: 'u_demo_buyer', email: 'buyer@example.com', password: 'buyer123', full_name: 'Buyer Demo', role: 'user' },
    { id: 'u_demo_seller', email: 'seller@example.com', password: 'seller123', full_name: 'Seller Demo', role: 'seller' },
  ];

  writeUsers(demoUsers);
  return demoUsers;
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);

  useEffect(() => {
    try {
      const users = seedDemoUsers();
      const session = JSON.parse(localStorage.getItem(SESSION_KEY));
      if (session?.email) {
        const found = users.find(u => u.email === session.email);
        if (found) setUser({ id: found.id, email: found.email, full_name: found.full_name, role: found.role || 'user' });
      }
    } catch {}
    setAuthChecked(true);
    setIsLoadingAuth(false);
  }, []);

  const login = async (email, password) => {
    const users = readUsers();
    const found = users.find(u => u.email === email && u.password === password);
    if (!found) throw new Error('Invalid email or password');
    localStorage.setItem(SESSION_KEY, JSON.stringify({ email }));
    setUser({ id: found.id, email: found.email, full_name: found.full_name, role: found.role || 'user' });
    return found;
  };

  const register = async ({ email, password, full_name }) => {
    const users = readUsers();
    if (users.find(u => u.email === email)) throw new Error('An account with this email already exists');
    const newUser = { id: 'u_' + Date.now(), email, password, full_name: full_name || email.split('@')[0], role: 'user' };
    users.push(newUser);
    writeUsers(users);
    return newUser;
  };

  const completeLogin = (email) => {
    localStorage.setItem(SESSION_KEY, JSON.stringify({ email }));
    const users = readUsers();
    const found = users.find(u => u.email === email);
    if (found) setUser({ id: found.id, email: found.email, full_name: found.full_name, role: found.role || 'user' });
  };

  const logout = () => {
    localStorage.removeItem(SESSION_KEY);
    setUser(null);
    window.location.href = '/login';
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{
      user, isAuthenticated, authChecked, isLoadingAuth,
      isLoadingPublicSettings: false, authError: null,
      login, register, completeLogin, logout,
      navigateToLogin: () => { window.location.href = '/login'; },
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}

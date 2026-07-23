import { apiGet, apiPost } from './apiClient';
import { setTokens, clearTokens } from './tokenStorage';
import { mapUser, splitFullName } from '../mappers/userMapper';

export function shouldUseMockAuth(env = import.meta.env) {
  if (env.VITE_USE_MOCK_AUTH === 'false') return false;
  return env.PROD || env.VITE_USE_MOCK_AUTH === 'true';
}

export async function login(email, password) {
  const data = await apiPost('/auth/login', { email, password }, { skipAuth: true });
  // server may return tokens at top-level or under `tokens` key
  if (data?.tokens) {
    setTokens(data.tokens);
  } else if (data?.access_token) {
    setTokens(data);
  }
  return { user: mapUser(data.user), tokens: data };
}

export async function register({ email, password, full_name, phone }) {
  const { first_name, last_name } = splitFullName(full_name);
  const data = await apiPost('/auth/register', {
    email,
    password,
    first_name,
    last_name,
    phone: phone || undefined,
    role: 'customer',
  }, { skipAuth: true });
  // If server returned tokens on registration, persist them
  if (data?.tokens) setTokens(data.tokens);
  else if (data?.access_token) setTokens(data);
  return mapUser(data);
}

export async function getMe() {
  const data = await apiGet('/auth/me');
  return mapUser(data);
}

export async function logout() {
  try {
    await apiPost('/auth/logout', {});
  } catch {
    // ignore logout errors
  } finally {
    clearTokens();
  }
}

export async function sendOtp(email) {
  return apiPost('/auth/send-otp', { email }, { skipAuth: true });
}

export async function verifyOtp(email, otp) {
  const data = await apiPost('/auth/verify-otp', { email, otp }, { skipAuth: true });
  return data;
}

export async function forgotPassword(email) {
  return apiPost('/auth/forgot-password', { email }, { skipAuth: true });
}

export async function resetPassword(token, new_password) {
  return apiPost('/auth/reset-password', { token, new_password }, { skipAuth: true });
}

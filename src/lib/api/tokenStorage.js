const ACCESS_KEY = 'dm_access_token';
const REFRESH_KEY = 'dm_refresh_token';
const EXPIRES_KEY = 'dm_token_expires_at';

export function getAccessToken() {
  return sessionStorage.getItem(ACCESS_KEY);
}

export function getRefreshToken() {
  return sessionStorage.getItem(REFRESH_KEY);
}

export function getTokenExpiresAt() {
  const raw = sessionStorage.getItem(EXPIRES_KEY);
  return raw ? Number(raw) : 0;
}

export function setTokens({ access_token, refresh_token, expires_in }) {
  if (access_token) sessionStorage.setItem(ACCESS_KEY, access_token);
  if (refresh_token) sessionStorage.setItem(REFRESH_KEY, refresh_token);
  if (expires_in) {
    sessionStorage.setItem(EXPIRES_KEY, String(Date.now() + expires_in * 1000));
  }
}

export function clearTokens() {
  sessionStorage.removeItem(ACCESS_KEY);
  sessionStorage.removeItem(REFRESH_KEY);
  sessionStorage.removeItem(EXPIRES_KEY);
}

export function hasTokens() {
  return !!getAccessToken();
}

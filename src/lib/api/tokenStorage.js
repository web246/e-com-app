const ACCESS_KEY = 'dm_access_token';
const REFRESH_KEY = 'dm_refresh_token';
const EXPIRES_KEY = 'dm_token_expires_at';

function storage() {
  // Prefer localStorage so tokens persist across tabs/sessions; fall back to sessionStorage if unavailable
  try {
    return window?.localStorage || window?.sessionStorage;
  } catch {
    return null;
  }
}

export function getAccessToken() {
  const s = storage();
  return s ? s.getItem(ACCESS_KEY) : null;
}

export function getRefreshToken() {
  const s = storage();
  return s ? s.getItem(REFRESH_KEY) : null;
}

export function getTokenExpiresAt() {
  const s = storage();
  if (!s) return 0;
  const raw = s.getItem(EXPIRES_KEY);
  return raw ? Number(raw) : 0;
}

export function setTokens(payload = {}) {
  const { access_token, refresh_token, expires_in } = payload;
  const s = storage();
  if (!s) return;
  if (access_token) s.setItem(ACCESS_KEY, access_token);
  if (refresh_token) s.setItem(REFRESH_KEY, refresh_token);
  if (expires_in) s.setItem(EXPIRES_KEY, String(Date.now() + expires_in * 1000));
}

export function clearTokens() {
  const s = storage();
  if (!s) return;
  s.removeItem(ACCESS_KEY);
  s.removeItem(REFRESH_KEY);
  s.removeItem(EXPIRES_KEY);
}

export function hasTokens() {
  return !!getAccessToken();
}

import { API_BASE_URL } from './config';
import { ApiError } from './errors';
import { clearTokens, getAccessToken, getRefreshToken, setTokens } from './tokenStorage';

let refreshPromise = null;

async function refreshAccessToken() {
  const refreshToken = getRefreshToken();
  if (!refreshToken) throw new ApiError('Session expired', { code: 'UNAUTHORIZED', status: 401 });

  const res = await fetch(`${API_BASE_URL}/auth/refresh`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({ refresh_token: refreshToken }),
  });

  const body = await res.json().catch(() => ({}));
  if (!res.ok || body.success === false) {
    clearTokens();
    throw new ApiError(body.error?.message || 'Session expired', {
      code: body.error?.code || 'UNAUTHORIZED',
      status: res.status,
    });
  }

  setTokens(body.data);
  return body.data.access_token;
}

async function doFetch(path, options = {}, meta = {}) {
  const { skipAuth = false, retried = false } = meta;
  const { skipAuth: _skip, ...fetchOptions } = options;
  const effectiveSkipAuth = skipAuth || _skip;

  const headers = {
    Accept: 'application/json',
    ...(fetchOptions.body ? { 'Content-Type': 'application/json' } : {}),
    ...fetchOptions.headers,
  };

  if (!effectiveSkipAuth) {
    const token = getAccessToken();
    if (token) headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(`${API_BASE_URL}${path}`, { ...fetchOptions, headers });
  const body = await res.json().catch(() => ({}));

  if (res.status === 401 && !effectiveSkipAuth && !retried && getRefreshToken()) {
    if (!refreshPromise) {
      refreshPromise = refreshAccessToken().finally(() => {
        refreshPromise = null;
      });
    }
    await refreshPromise;
    return doFetch(path, fetchOptions, { skipAuth: effectiveSkipAuth, retried: true });
  }

  if (!res.ok || body.success === false) {
    throw new ApiError(body.error?.message || `Request failed (${res.status})`, {
      code: body.error?.code,
      status: res.status,
      fieldErrors: body.errors,
    });
  }

  return body.data;
}

export function apiGet(path, options = {}) {
  const { skipAuth, ...rest } = options;
  return doFetch(path, { method: 'GET', ...rest }, { skipAuth });
}

export function apiPost(path, body, options = {}) {
  const { skipAuth, ...rest } = options;
  return doFetch(path, {
    method: 'POST',
    body: body != null ? JSON.stringify(body) : undefined,
    ...rest,
  }, { skipAuth });
}

export function apiPut(path, body, options = {}) {
  const { skipAuth, ...rest } = options;
  return doFetch(path, {
    method: 'PUT',
    body: body != null ? JSON.stringify(body) : undefined,
    ...rest,
  }, { skipAuth });
}

export function apiDelete(path, options = {}) {
  const { skipAuth, ...rest } = options;
  return doFetch(path, { method: 'DELETE', ...rest }, { skipAuth });
}

export function apiPostPublic(path, body) {
  return apiPost(path, body, { skipAuth: true });
}

export function apiGetPublic(path) {
  return apiGet(path, { skipAuth: true });
}

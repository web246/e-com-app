export class ApiError extends Error {
  constructor(message, { code, status, fieldErrors } = {}) {
    super(message);
    this.name = 'ApiError';
    this.code = code;
    this.status = status;
    this.fieldErrors = fieldErrors || {};
  }
}

export function getErrorMessage(err, fallback = 'Something went wrong') {
  const raw = err instanceof ApiError ? (err.message || fallback) : (err?.message || fallback);
  const lower = String(raw).toLowerCase();
  if (
    lower.includes('missing authorization token')
    || lower.includes('authorization token')
    || (err instanceof ApiError && err.code === 'UNAUTHORIZED' && err.status === 401)
  ) {
    return 'Your session expired. Please log in again.';
  }
  return raw;
}

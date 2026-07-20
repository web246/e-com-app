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
  if (err instanceof ApiError) return err.message || fallback;
  if (err?.message) return err.message;
  return fallback;
}

export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  (import.meta.env.DEV ? '/api/v1' : 'https://salamexporters.com/api/v1');

/** Marketplace tenant (Dennis Mendez / tenant 4). */
export const TENANT_ID = import.meta.env.VITE_TENANT_ID || '4';

/** Static assets (online_store catalog images) served from site root. */
export const ASSET_BASE_URL = (import.meta.env.VITE_ASSET_BASE_URL || 'https://salamexporters.com').replace(/\/$/, '');

/** User uploads from Go backend. */
export const BACKEND_UPLOADS_URL = (import.meta.env.VITE_BACKEND_UPLOADS_URL || 'https://salamexporters.com/shinazugawa-api').replace(/\/$/, '');

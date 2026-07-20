import { ASSET_BASE_URL, BACKEND_UPLOADS_URL } from './api/config';

/**
 * Resolve backend asset paths to fully-qualified URLs.
 * Mirrors dennis-menez useBackendUrl.resolveUrl — API returns paths like
 * /online_store/shoes/11.png which must be loaded from salamexporters.com.
 */
export function resolveImageUrl(url) {
  if (!url) return '';

  if (/^https?:\/\//.test(url)) {
    if (/^https?:\/\/localhost(:\d+)?/.test(url)) {
      try {
        return `${ASSET_BASE_URL}${new URL(url).pathname}`;
      } catch {
        return url;
      }
    }
    return url;
  }

  const path = url.startsWith('/') ? url : `/${url}`;

  if (path.startsWith('/uploads/')) {
    return `${BACKEND_UPLOADS_URL}${path}`;
  }

  return `${ASSET_BASE_URL}${path}`;
}

export function resolveImageUrls(urls) {
  if (!Array.isArray(urls)) return [];
  return urls.map(resolveImageUrl).filter(Boolean);
}

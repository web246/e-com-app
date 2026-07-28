import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Capacitor } from '@capacitor/core';

/**
 * Routes Capacitor App Links / custom-scheme opens into React Router paths.
 * Handles https://salamexporters.com/... and com.dennismendez.app://...
 */
export default function DeepLinkHandler() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!Capacitor.isNativePlatform()) return undefined;

    let handle;
    let cancelled = false;

    (async () => {
      try {
        // dynamic import via eval to avoid Vite/Rollup resolving this on web builds
        const { App } = await eval('import("@capacitor/app")');
        if (cancelled) return;

        const routeFromUrl = (url) => {
          if (!url) return;
          try {
            const parsed = new URL(url);
            const path = parsed.pathname || '/';
            const search = parsed.search || '';
            if (
              path.startsWith('/reset-password')
              || path.startsWith('/verify-otp')
              || path.startsWith('/login')
              || path.startsWith('/forgot-password')
            ) {
              navigate(`${path}${search}`, { replace: true });
            }
          } catch {
            // custom scheme: com.dennismendez.app://reset-password?token=...
            const match = String(url).match(/\/\/([^?]+)(\?.*)?$/);
            if (match) {
              const path = `/${match[1].replace(/^\/+/, '')}`;
              navigate(`${path}${match[2] || ''}`, { replace: true });
            }
          }
        };

        handle = await App.addListener('appUrlOpen', ({ url }) => routeFromUrl(url));

        const launch = await App.getLaunchUrl();
        if (launch?.url) routeFromUrl(launch.url);
      } catch {
        // Plugin missing in web builds — ignore
      }
    })();

    return () => {
      cancelled = true;
      handle?.remove?.();
    };
  }, [navigate]);

  return null;
}

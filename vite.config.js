import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    host: true,
    port: 5173,
    proxy: {
      '/api/v1': {
        target: 'https://salamexporters.com',
        changeOrigin: true,
        secure: true,
        // Production nginx returns 403 when Origin is localhost.
        configure: (proxy) => {
          proxy.on('proxyReq', (proxyReq) => {
            proxyReq.removeHeader('origin');
            proxyReq.removeHeader('referer');
            if (!proxyReq.getHeader('x-tenant-id')) {
              proxyReq.setHeader('X-Tenant-ID', '4');
            }
          });
        },
      },
    },
  },
  build: {
    outDir: 'dist',
  },
})

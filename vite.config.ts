// vite.config.ts
import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { SvelteKitPWA } from '@vite-pwa/sveltekit';

const isProduction = process.env.NODE_ENV === 'production';
const basePath = isProduction ? '/admin/' : '/';

export default defineConfig({
  base: basePath,
  plugins: [
    tailwindcss(), 
    sveltekit(),
    SvelteKitPWA({
      strategies: 'generateSW',
      registerType: 'autoUpdate',
      scope: basePath,
      base: basePath,
      manifest: {
        display: 'standalone',
        name: 'Sandys Admin',
        short_name: 'Sandys Admin',
        description: 'Sandys Cafe Admin Dashboard',
        theme_color: '#3b82f6',
        background_color: '#0f172a',
        start_url: basePath,
        scope: basePath,
        icons: [
          {
            src: basePath + 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: basePath + 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,webp}'],
        navigateFallback: basePath + 'index.html',
        cleanupOutdatedCaches: true,
        clientsClaim: true,
        skipWaiting: true,
        // Explicitly include icons.svg
        // additionalManifestEntries: [
        //   { url: basePath + 'icons.svg', revision: null }
        // ],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          }
        ]
      },
      devOptions: {
        enabled: true,
        type: 'module',
        navigateFallback: basePath
      }
    })
  ]
});
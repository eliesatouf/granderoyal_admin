// Simple service worker for /admin/
const CACHE_NAME = 'granderoyale-admin-v1';
const ADMIN_PATH = '/admin/';

self.addEventListener('install', (event) => {
  console.log('Service Worker installing for:', ADMIN_PATH);
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll([
        ADMIN_PATH,
        ADMIN_PATH + 'index.html'
      ]);
    })
  );
});

self.addEventListener('fetch', (event) => {
  // Only handle /admin/ requests
  if (!event.request.url.includes(ADMIN_PATH)) {
    return;
  }

  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
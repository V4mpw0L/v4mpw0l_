// V4MPW0L // TIAGO CARDOSO — Stealth PWA Core Service Worker
const APP_VERSION = '2.2.0';
const CACHE_NAME = `v4mpw0l-core-v${APP_VERSION}`;

const PRECACHE_ASSETS = [
  '.' + /,
  '.' + /index.html,
  `./style.css?v=${APP_VERSION}`,
  `./script.js?v=${APP_VERSION}`,
  `./devlog.js?v=${APP_VERSION}`,
  `./manifest.json?v=${APP_VERSION}`,
  '.' + /assets/icon-192.png,
  '.' + /assets/icon-512.png,
  '.' + /assets/icon-maskable-192.png,
  '.' + /assets/icon-maskable-512.png,
  '.' + /assets/apple-touch-icon.png,
  '.' + /assets/tiago-blue.png,
  '.' + /favicon.png,
  '.' + /favicon-32x32.png,
  '.' + /favicon.ico
];

// Install: Pre-cache shell & activate immediately
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(PRECACHE_ASSETS);
    }).catch(err => {
      console.warn('[SW] Pre-cache warning:', err);
    })
  );
  self.skipWaiting();
});

// Activate: Purge old caches and claim all clients
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            console.log('[SW] Purging old cache:', cache);
            return caches.delete(cache);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch: Network-First for core application files with Cache Fallback
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  const url = new URL(event.request.url);

  if (url.origin === self.location.origin) {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          if (response && response.status === 200) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
          }
          return response;
        })
        .catch(() => {
          return caches.match(event.request).then(cached => {
            if (cached) return cached;
            if (event.request.mode === 'navigate') return caches.match('./index.html');
          });
        })
    );
    return;
  }

  // External resources: Stale-while-revalidate
  event.respondWith(
    caches.match(event.request).then(cached => {
      const networked = fetch(event.request).then(response => {
        if (response && response.status === 200) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        }
        return response;
      }).catch(() => null);
      return cached || networked;
    })
  );
});

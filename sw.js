// Service Worker for Tiago Cardoso (v4mpw0l) Portal PWA
const CACHE_NAME = 'v4mpw0l-portal-v2.0.0';
const urlsToCache = [
  './',
  './index.html',
  './style.css',
  './script.js',
  './devlog.js',
  './manifest.json',
  'https://i.postimg.cc/dqLLj7KL/file-0000000040e86230b2fb6a71cedf9375.png'
];

// Install event
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
      .catch(error => {
        console.warn('Cache addAll warning:', error);
      })
  );
  self.skipWaiting();
});

// Fetch event
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
      .catch(() => {
        if (event.request.destination === 'document') {
          return caches.match('./index.html');
        }
      })
  );
});

// Activate event
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

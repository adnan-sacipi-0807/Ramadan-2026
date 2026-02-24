const CACHE_NAME = 'ramadan-2026-v2';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&display=swap'
];

// Install: Cache all assets and force waiting service worker to become active
self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSETS))
  );
});

// Activate: Clean old caches and claim clients immediately
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

// Fetch: Network First for HTML, Cache First for assets
self.addEventListener('fetch', event => {
  // Check if request is for navigation (HTML)
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          // Update cache with new version
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
          return response;
        })
        .catch(() => {
          // Network failed, fall back to cache
          return caches.match(event.request).then(cached => {
             return cached || caches.match('./index.html');
          });
        })
    );
  } else {
    // Cache First for other assets (images, fonts, etc.)
    event.respondWith(
      caches.match(event.request)
        .then(cached => cached || fetch(event.request)
          .then(response => {
            // Cache new requests dynamically
            if (response.ok && event.request.url.startsWith('http')) {
              const clone = response.clone();
              caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
            }
            return response;
          })
        )
    );
  }
});
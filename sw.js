/* =====================================================================
   PRASHANT JHA PORTFOLIO - SERVICE WORKER (PWA ENGINE)
   Enables offline capability, instant load & native app installation
===================================================================== */
const CACHE_NAME = 'prashant-jha-pwa-v1';

const STATIC_ASSETS = [
  './',
  './index.html',
  './about.html',
  './skills.html',
  './projects.html',
  './manifest.json',
  './img/app-icon.svg',
  './css/bootstrap.css',
  './css/style.css',
  './css/responsive.css',
  './css/modern-design.css',
  './js/theme-toggle.js'
];

// Install: cache essential assets and take control immediately
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS).catch((err) => {
        console.warn('[SW] Non-critical precache skipped asset:', err);
      });
    }).then(() => self.skipWaiting())
  );
});

// Activate: cleanup old cache stores
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch: Network-first strategy with cache fallback for maximum freshness
self.addEventListener('fetch', (event) => {
  // Only handle GET requests and http/https schemes
  if (event.request.method !== 'GET' || !event.request.url.startsWith('http')) {
    return;
  }

  event.respondWith(
    fetch(event.request)
      .then((networkResponse) => {
        // Clone and store valid responses in cache
        if (networkResponse && networkResponse.status === 200) {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
        }
        return networkResponse;
      })
      .catch(() => {
        // Fallback to cache if network fails (offline support)
        return caches.match(event.request).then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse;
          }
          if (event.request.mode === 'navigate') {
            return caches.match('./index.html');
          }
        });
      })
  );
});

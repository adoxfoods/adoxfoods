// Adox Foods Service Worker
// Version: bump this string whenever you make site changes to force cache refresh
const CACHE_NAME = 'adox-foods-v1';

// Core pages and assets to cache immediately when SW installs
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/shop.html',
  '/checkout.html',
  '/reviews.html',
  '/privacy.html',
  '/refund.html',
  '/images/adox-logo.png',
  '/manifest.json'
];

// ── INSTALL: pre-cache all static assets ──────────────────────────────────────
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('[Adox SW] Pre-caching static assets');
      return cache.addAll(STATIC_ASSETS);
    })
  );
  // Take over immediately without waiting for old SW to die
  self.skipWaiting();
});

// ── ACTIVATE: delete old caches ───────────────────────────────────────────────
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => {
            console.log('[Adox SW] Deleting old cache:', key);
            return caches.delete(key);
          })
      )
    )
  );
  // Claim all open tabs immediately
  self.clients.claim();
});

// ── FETCH: Network-first for HTML, Cache-first for assets ─────────────────────
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET and cross-origin requests (e.g. WhatsApp links, external APIs)
  if (request.method !== 'GET' || url.origin !== location.origin) return;

  // HTML pages → Network first, fall back to cache, then offline page
  if (request.headers.get('accept')?.includes('text/html')) {
    event.respondWith(
      fetch(request)
        .then(response => {
          // Clone and store fresh copy in cache
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(request, clone));
          return response;
        })
        .catch(() =>
          caches.match(request).then(cached => {
            if (cached) return cached;
            // Ultimate fallback — return cached homepage
            return caches.match('/index.html');
          })
        )
    );
    return;
  }

  // Images & static assets → Cache first, fall back to network
  if (
    url.pathname.match(/\.(png|jpg|jpeg|gif|webp|svg|ico|css|js|woff2?)$/)
  ) {
    event.respondWith(
      caches.match(request).then(cached => {
        if (cached) return cached;
        return fetch(request).then(response => {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(request, clone));
          return response;
        });
      })
    );
    return;
  }

  // Everything else → Network with cache fallback
  event.respondWith(
    fetch(request).catch(() => caches.match(request))
  );
});

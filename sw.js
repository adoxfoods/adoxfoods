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
    '/images/adoxfoods.jpg',
    '/manifest.json'
];

// ── INSTALL: pre-cache all static assets ──────────────────────────────────────
self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(function(cache) {
            console.log('[Adox SW] Pre-caching static assets');
            return cache.addAll(STATIC_ASSETS);
        })
    );
    self.skipWaiting();
});

// ── ACTIVATE: delete old caches ───────────────────────────────────────────────
self.addEventListener('activate', function(event) {
    event.waitUntil(
        caches.keys().then(function(keys) {
            return Promise.all(
                keys
                .filter(function(key) { return key !== CACHE_NAME; })
                .map(function(key) {
                    console.log('[Adox SW] Deleting old cache:', key);
                    return caches.delete(key);
                })
            );
        })
    );
    self.clients.claim();
});

// ── FETCH: Network-first for HTML, Cache-first for assets ─────────────────────
self.addEventListener('fetch', function(event) {
    var request = event.request;
    var url = new URL(request.url);

    // Skip non-GET and cross-origin requests
    if (request.method !== 'GET' || url.origin !== location.origin) return;

    // HTML pages → Network first, fall back to cache
    var acceptHeader = request.headers.get('accept');
    if (acceptHeader && acceptHeader.indexOf('text/html') !== -1) {
        event.respondWith(
            fetch(request)
            .then(function(response) {
                var clone = response.clone();
                caches.open(CACHE_NAME).then(function(cache) { cache.put(request, clone); });
                return response;
            })
            .catch(function() {
                return caches.match(request).then(function(cached) {
                    if (cached) return cached;
                    return caches.match('/index.html');
                });
            })
        );
        return;
    }

    // Images & static assets → Cache first, fall back to network
    if (url.pathname.match(/\.(png|jpg|jpeg|gif|webp|svg|ico|css|js|woff2?)$/)) {
        event.respondWith(
            caches.match(request).then(function(cached) {
                if (cached) return cached;
                return fetch(request).then(function(response) {
                    var clone = response.clone();
                    caches.open(CACHE_NAME).then(function(cache) { cache.put(request, clone); });
                    return response;
                });
            })
        );
        return;
    }

    // Everything else → Network with cache fallback
    event.respondWith(
        fetch(request).catch(function() { return caches.match(request); })
    );
});
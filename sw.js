const CACHE_NAME = 'adox-foods-v1';

// Only cache files that actually exist on your server
const urlsToCache = [
    '/',
    '/index.html',
    '/shop.html',
    '/checkout.html',
    '/reviews.html',
    '/privacy.html',
    '/refund.html',
    '/style.css',
    '/script.js',
    '/manifest.json',
    '/images/adx192.png',
    '/images/adoxfoods.png'
];

// Install event - CATCH ERRORS properly
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then(cache => {
            console.log('Cache opened, adding files...');
            return cache.addAll(urlsToCache).catch(err => {
                console.error('Cache addAll failed:', err);
                // Don't fail the whole installation if one file fails
                return Promise.resolve();
            });
        })
        .catch(err => console.error('Cache open failed:', err))
    );
    // Force the waiting service worker to become active
    self.skipWaiting();
});

// Fetch event - graceful fallback
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
        .then(response => {
            // Return cached response if found
            if (response) {
                return response;
            }
            // Otherwise fetch from network
            return fetch(event.request).catch(() => {
                // If both fail, return a fallback response
                return new Response('Offline - Adox Foods', {
                    status: 200,
                    headers: new Headers({ 'Content-Type': 'text/html' })
                });
            });
        })
    );
});

// Activate event - clean old caches
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if (cache !== CACHE_NAME) {
                        console.log('Deleting old cache:', cache);
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
    self.clients.claim();
});
const CACHE_NAME = 'adox-foods-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/shop.html',
    '/checkout.html',
    '/styles.css', // Update with your actual CSS file
    '/script.js' // Update with your actual JS file
];

// Install event
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then(cache => cache.addAll(urlsToCache))
        .catch(err => console.error('Cache add failed:', err))
    );
});

// Fetch event - FIXED VERSION
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
        .then(response => {
            // Return cached response if found
            if (response) {
                return response;
            }
            // Otherwise fetch from network
            return fetch(event.request);
        })
        .catch(() => {
            // Optional: Return offline page when both cache and network fail
            return caches.match('/index.html');
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
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});
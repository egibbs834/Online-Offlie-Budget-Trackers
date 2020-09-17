const FILES_TO_CACHE = [
    "/",
    "/index.html",
    "/index.js",
    "/style.css",
    "/icons/icon-192x192.png",
    "/icons/icon-512x512.png"
];

    const CACHE_NAME = 'static-cache-v13';
    const DATA_CACHE_NAME = 'data-cache-v8';

console.log("if you see me service worker exists")

// installs and regiesters service-worker
self.addEventListener('install', function(evt) {
    evt.waitUntil(
      caches.open(CACHE_NAME).then(cache => {
        console.log("Your files were pre-cached successfully!");
        return cache.addAll(FILES_TO_CACHE);
      })
    );

    self.skipWaiting();
  });
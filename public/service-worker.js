const FILES_TO_CACHE = [
  "/",
  "/index.html",
  "/index.js",
  "/style.css",
  "/icons/icon-192x192.png",
  "/icons/icon-512x512.png",
];

const CACHE_NAME = "static-cache-v13";
const DATA_CACHE_NAME = "data-cache-v8";

console.log("if you see me service worker exists");

// installs and regiesters service-worker
self.addEventListener("install", function (evt) {
  evt.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Your files were pre-cached successfully!");
      return cache.addAll(FILES_TO_CACHE);
    })
  );

  self.skipWaiting();
});

//   activate service-worker and remove old data from the cache
self.addEventListener("activate", function (evt) {
  evt.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (key !== CACHE_NAME && key !== DATA_CACHE_NAME) {
            console.log("Removing old cache data", key);
            return caches.delete(key);
          }
        })
      );
    })
  );

  self.clients.claim();
});

// enable service-worker to intercept network requests
self.addEventListener("fetch", function (evt) {
  // code to handle requests goes here
});

// serve static files from cache
evt.respondWith(
  caches.open(CACHE_NAME).then((cache) => {
    return cache.match(evt.request).then((response) => {
      return response || fetch(evt.request);
    });
  })
);

const cacheName = "pages-cache-v1";

const filesToCache = [
  "./",
  "./index.html",
  "./style.css",
  "https://diflores.pythonanywhere.com/song_list",
  "https://kit.fontawesome.com/ecab1c0a7a.js"
];
self.addEventListener("install", function (e) {
  e.waitUntil(
    caches.open(cacheName).then(function (cache) {
      return cache.addAll(filesToCache);
    })
  );
});
self.addEventListener("activate", event => {
  event.waitUntil(self.clients.claim());
});
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request, { ignoreSearch: true }).then(response => {
      return response || fetch(event.request);
    })
  );
});

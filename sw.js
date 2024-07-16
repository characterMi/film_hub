const assets = [
  "/film_hub",
  "/film_hub/icons/filmhub-192.png",
  "/film_hub/static/css/main.fe667282.css",
  "/film_hub/static/css/main.fe667282.css.map",
  "/film_hub/static/js/main.5310856b.js",
  "/film_hub/static/js/main.5310856b.js.map",
  "/film_hub/static/media/bg_01_blue.c471dfd35912a7bb95d4.png",
  "/film_hub/static/media/bg_01_red.ce403a095f68664d92d7.png",
  "/film_hub/static/media/LOGO_DARKTHEME.c424e3ad8e51d35c87fc.png",
  "/film_hub/static/media/LOGO_LIGHTTHEME.49910c385f71c2ed0f17.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open("assets").then((cache) => {
      cache.addAll(assets);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Even if the response is in the cache, we fetch it
      // and update the cache for future usage
      const fetchPromise = fetch(event.request)
        .then((networkResponse) => {
          if (!networkResponse.ok) return;

          if (networkResponse) {
            caches.open("assets").then((cache) => {
              cache.put(event.request, networkResponse.clone());
            });
          }

          return networkResponse;
        })
        .catch((e) => console.error("Error fetching the data: ", e));
      // We use the currently cached version if it's there
      return response || fetchPromise; // cached or a network fetch
    })
  );
});

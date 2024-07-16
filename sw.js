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
    caches
      .match(event.request) // searching in the cache
      .then((response) => {
        if (response) {
          // The request is in the cache
          return response; // cache hit
        } else {
          // We need to go to the network
          return fetch(event.request); // cache miss
        }
      })
  );
});

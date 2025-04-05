const assets = [
  "/film_hub",
  "/film_hub/icons/filmhub-192.png",
  "/film_hub/static/css/main.0da0beba.css",
  "/film_hub/static/js/main.b9c70a24.js",
  "/film_hub/static/js/527.55e956df.chunk.js",
  "/film_hub/static/js/544.745ec9cc.chunk.js",
  "/film_hub/static/js/174.ead94faa.chunk.js",
  "/film_hub/static/js/670.e882abaa.chunk.js",
  "/film_hub/static/js/240.8b104f0b.chunk.js",
  "/film_hub/static/media/bg_01_blue.c471dfd35912a7bb95d4.png",
  "/film_hub/static/media/bg_01_red.ce403a095f68664d92d7.png",
  "/film_hub/static/media/LOGO_DARKTHEME.c424e3ad8e51d35c87fc.png",
  "/film_hub/static/media/LOGO_LIGHTTHEME.49910c385f71c2ed0f17.png",
  "/film_hub/static/media/talk.fdb2ad80a1752591d96c.png",
  "/film_hub/static/media/kids.6edf58c08e3829731c43.png",
  "/film_hub/static/media/reality.5d5f84e93142db9e2199.png",
  "/film_hub/static/css/main.0da0beba.css.map",
  "/film_hub/static/js/main.b9c70a24.js.map",
  "/film_hub/static/js/527.55e956df.chunk.js.map",
  "/film_hub/static/js/544.745ec9cc.chunk.js.map",
  "/film_hub/static/js/174.ead94faa.chunk.js.map",
  "/film_hub/static/js/670.e882abaa.chunk.js.map",
  "/film_hub/static/js/240.8b104f0b.chunk.js.map",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open("filmhub").then((cache) => {
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
          // if we cache our resources with the event.request, api keys is going to expose.
          const requestUrl = new URL(event.request.url);

          requestUrl.searchParams.delete("api_key");

          return caches.open("filmhub").then((cache) => {
            cache.put(requestUrl.toString(), networkResponse.clone());
            return networkResponse;
          });
        })
        .catch((e) => {
          console.error(e);

          return new Response(
            "Network error and no cached data available. see the browser's console for more information",
            {
              status: 503,
              statusText: "Service Unavailable.",
            }
          );
        });
      // We use the currently cached version if it's there
      return response || fetchPromise; // cached or a network fetch
    })
  );
});

const assets = [
  "/film_hub",
  "/film_hub/icons/filmhub-192.png",
  "/film_hub/static/css/main.c1188d57.css",
  "/film_hub/static/css/main.c1188d57.css.map",
  "/film_hub/static/js/main.429a2dfd.js",
  "/film_hub/static/js/main.429a2dfd.js.map",
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
          // if we cache our resources with the event.request, api keys is going to expose.
          const requestUrl = new URL(event.request.url);

          requestUrl.searchParams.delete(
            "api_key",
            "1860ce01e35b0b38c2133645f5f7847e"
          );

          return caches.open("assets").then((cache) => {
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

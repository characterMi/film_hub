const assets = [
  "/film_hub",
  "/film_hub/icons/filmhub-192.png",
  "https://dummyimage.com/200x300",
  "https://placehold.co/500x750/ececec/black?text=Error%20while%20loading%20the%20image",
  "https://placehold.co/500x750/1a1a1a/white?text=Error%20while%20loading%20the%20image",
  "/film_hub/favicon.ico",
  "/film_hub/icons/filmhub-192.png",
  "/film_hub/app.webmanifest",
  "/film_hub/static/css/main.7fbe36c9.css",
  "/film_hub/static/js/main.cb59e71d.js",
  "/film_hub/static/js/527.a224fa0c.chunk.js",
  "/film_hub/static/js/544.bb143285.chunk.js",
  "/film_hub/static/js/174.3ab521de.chunk.js",
  "/film_hub/static/js/670.07f4d258.chunk.js",
  "/film_hub/static/js/240.8b104f0b.chunk.js",
  "/film_hub/static/media/bg_01_blue.c471dfd35912a7bb95d4.png",
  "/film_hub/static/media/bg_01_red.ce403a095f68664d92d7.png",
  "/film_hub/static/media/LOGO_DARKTHEME.c424e3ad8e51d35c87fc.png",
  "/film_hub/static/media/LOGO_LIGHTTHEME.49910c385f71c2ed0f17.png",
  "/film_hub/static/media/talk.fdb2ad80a1752591d96c.png",
  "/film_hub/static/media/kids.6edf58c08e3829731c43.png",
  "/film_hub/static/media/reality.5d5f84e93142db9e2199.png",
  "/film_hub/static/css/main.7fbe36c9.css.map",
  "/film_hub/static/js/main.cb59e71d.js.map",
  "/film_hub/static/js/527.a224fa0c.chunk.js.map",
  "/film_hub/static/js/544.bb143285.chunk.js.map",
  "/film_hub/static/js/174.3ab521de.chunk.js.map",
  "/film_hub/static/js/670.07f4d258.chunk.js.map",
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
  const { request } = event;

  if (request.method !== "GET") {
    return;
  }

  event.respondWith(
    (async () => {
      if (request.url.startsWith("https://image.tmdb.org")) {
        return fetch(request);
      }

      const cache = await caches.open("filmhub");

      try {
        const networkResponse = await fetch(request);
        cache.put(request, networkResponse.clone());
        return networkResponse;
      } catch {
        const cachedResponse = await cache.match(request);

        return (
          cachedResponse ||
          new Response(
            "Network error and no cached data available. See the browser's console for more information.",
            {
              status: 503,
              statusText: "Service Unavailable.",
            }
          )
        );
      }
    })()
  );
});

const assets = [
  "/film_hub",
  "/film_hub/icons/filmhub-192.png",
  "https://dummyimage.com/200x300",
  "https://placehold.co/500x750/ececec/black?text=Error%20while%20loading%20the%20image",
  "https://placehold.co/500x750/1a1a1a/white?text=Error%20while%20loading%20the%20image",
  // Add the js, css files after build + images in media folder.
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

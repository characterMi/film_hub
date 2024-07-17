const assets = [
  "/film_hub",
  "/film_hub/icons/filmhub-192.png",
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
            process.env.REACT_APP_TMDB_API_KEY
          );

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

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

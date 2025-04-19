const assets = [
  "/film_hub",
  "/film_hub/icons/filmhub-192.png",
  "https://dummyimage.com/200x300",
  "https://placehold.co/500x750/ececec/black?text=Error%20while%20loading%20the%20image",
  "https://placehold.co/500x750/1a1a1a/white?text=Error%20while%20loading%20the%20image",
  "/film_hub/static/css/main.5d15cde1.css",
  "/film_hub/static/js/main.1ea20615.js",
  "/film_hub/static/js/527.283f6bb3.chunk.js",
  "/film_hub/static/js/544.135b52d0.chunk.js",
  "/film_hub/static/js/174.0766b503.chunk.js",
  "/film_hub/static/js/670.cd0ed564.chunk.js",
  "/film_hub/static/js/240.8b104f0b.chunk.js",
  "/film_hub/static/media/bg_01_blue.c471dfd35912a7bb95d4.png",
  "/film_hub/static/media/bg_01_red.ce403a095f68664d92d7.png",
  "/film_hub/static/media/LOGO_DARKTHEME.c424e3ad8e51d35c87fc.png",
  "/film_hub/static/media/LOGO_LIGHTTHEME.49910c385f71c2ed0f17.png",
  "/film_hub/static/media/talk.fdb2ad80a1752591d96c.png",
  "/film_hub/static/media/kids.6edf58c08e3829731c43.png",
  "/film_hub/static/media/reality.5d5f84e93142db9e2199.png",
  "/film_hub/static/css/main.5d15cde1.css.map",
  "/film_hub/static/js/main.1ea20615.js.map",
  "/film_hub/static/js/527.283f6bb3.chunk.js.map",
  "/film_hub/static/js/544.135b52d0.chunk.js.map",
  "/film_hub/static/js/174.0766b503.chunk.js.map",
  "/film_hub/static/js/670.cd0ed564.chunk.js.map",
  "/film_hub/static/js/240.8b104f0b.chunk.js.map",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open("filmhub").then((cache) => {
      cache.addAll(assets);
    })
  );
});

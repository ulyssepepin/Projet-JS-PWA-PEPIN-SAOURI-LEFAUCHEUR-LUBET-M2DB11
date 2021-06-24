const staticChestCode = "chest-code-v1"
const assets = [
  "/",
  "/index.html",
  "/css/style.css",
  "/js/app.js",
  "/images/cadena.png",
]

// Si l'application est installé alors on met les assets en memoire cache
self.addEventListener("install", installEvent => {
  installEvent.waitUntil(
    caches.open(staticChestCode).then(cache => {
      cache.addAll(assets)
    })
  )
})

self.addEventListener("fetch", fetchEvent => {
  fetchEvent.respondWith(
    caches.match(fetchEvent.request).then(res => {
      return res || fetch(fetchEvent.request)
    })
  )
})

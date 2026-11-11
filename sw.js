// GENERADO por vite.config.ts. No editar a mano.
const CACHE = "englishquest-mwc2ubec";
const FILES = ["./","./assets/index-DH5F1In-.css","./assets/index-DhCVKLLE.js","./manifest.webmanifest","./favicon.svg","./icon-192.png","./icon-512.png","./icon-maskable-512.png","./apple-touch-icon.png"];
self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(FILES)));
  self.skipWaiting();
});
// Solo borra sus cachés antiguas: en github.io comparte el almacén con las otras apps
self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then((k) => Promise.all(k.filter((x) => x.startsWith('englishquest-') && x !== CACHE).map((x) => caches.delete(x)))));
  self.clients.claim();
});
self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== location.origin) return;
  // La página: primero la red (para recibir versiones nuevas) y, sin conexión, la guardada
  if (req.mode === 'navigate') {
    e.respondWith(fetch(req).catch(() => caches.match('./', { ignoreVary: true })));
    return;
  }
  // El resto lleva un hash en el nombre: si está guardado, no cambia nunca.
  // ignoreVary: si el servidor responde con «Vary: Origin», la copia guardada no coincidiría
  e.respondWith(caches.match(req, { ignoreVary: true }).then((hit) => hit || fetch(req)));
});

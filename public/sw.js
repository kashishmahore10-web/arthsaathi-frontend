const CACHE_NAME = "arthsaathi-v2";
const AI_CACHE = "arthsaathi-ai-v1";

const STATIC_ASSETS = [
  "/",
  "/offline",
  "/manifest.json",
  "/favicon.ico",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(async (cache) => {
      for (const url of STATIC_ASSETS) {
        try {
          const res = await fetch(url);
          if (res.ok) await cache.put(url, res.clone());
        } catch (e) {
          console.warn("skip:", url);
        }
      }
    })
  );

  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((k) => {
          if (k !== CACHE_NAME && k !== AI_CACHE) {
            return caches.delete(k);
          }
        })
      )
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  if (
    url.pathname.startsWith("/api/ai") ||
    url.pathname.startsWith("/api/agents")
  ) {
    event.respondWith(aiCache(request));
    return;
  }

  event.respondWith(networkFirst(request));
});

async function aiCache(request) {
  const cache = await caches.open(AI_CACHE);

  try {
    const res = await fetch(request);
    if (res.ok) cache.put(request.url, res.clone());
    return res;
  } catch {
    const cached = await cache.match(request.url);
    if (cached) return cached;

    return new Response(
      JSON.stringify({
        reply: "You are offline. Reconnect for full AI response.",
        offline: true,
      }),
      { headers: { "Content-Type": "application/json" } }
    );
  }
}

async function networkFirst(request) {
  try {
    const res = await fetch(request);
    if (request.method === "GET" && res.ok) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, res.clone());
    }
    return res;
  } catch {
    return caches.match(request) || caches.match("/offline");
  }
}
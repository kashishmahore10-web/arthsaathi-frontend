// ArthSaathi Service Worker — Production Safe Offline AI PWA

const CACHE_NAME = "arthsaathi-v2";
const AI_CACHE = "arthsaathi-ai-v1";

// ONLY static shell (VERY IMPORTANT for Next.js/Vercel)
const STATIC_ASSETS = [
  "/",
  "/offline",
  "/manifest.json",
  "/favicon.ico",
];

// ─── Install ───────────────────────────────────────────────
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(async (cache) => {
      for (const url of STATIC_ASSETS) {
        try {
          const res = await fetch(url, { credentials: "same-origin" });
          if (res.ok && res.status === 200) {
            await cache.put(url, res.clone());
          }
        } catch (err) {
          console.warn("Cache skip:", url);
        }
      }
    })
  );

  self.skipWaiting();
});

// ─── Activate ──────────────────────────────────────────────
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

// ─── Fetch Router ───────────────────────────────────────────
self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);

  if (url.pathname === "/ussd") {
    event.respondWith(
      fetch(event.request)
        .then((res) => {
          const cache = caches.open(CACHE_NAME);
          cache.then((c) => c.put("/ussd", res.clone()));
          return res;
        })
        .catch(() => caches.match("/ussd"))
    );
    return;
  }
});
// ─── AI Strategy ───────────────────────────────────────────
async function aiCacheStrategy(request) {
  const cache = await caches.open(AI_CACHE);
  const cacheKey = request.url;

  try {
    const networkRes = await fetch(request);

    if (networkRes.ok) {
      cache.put(cacheKey, networkRes.clone());
    }

    return networkRes;
  } catch (err) {
    const cached = await cache.match(cacheKey);
    if (cached) return cached;

    // Offline fallback AI
    try {
      const body = await request.clone().json();
      const query =
        (body?.message || body?.query || "")
          .toLowerCase()
          .trim();

      return new Response(
        JSON.stringify({
          reply: findOfflineAnswer(query),
          offline: true,
        }),
        { headers: { "Content-Type": "application/json" } }
      );
    } catch {
      return new Response(
        JSON.stringify({
          reply:
            "You are offline. Please reconnect for full AI experience.",
          offline: true,
        }),
        { headers: { "Content-Type": "application/json" } }
      );
    }
  }
}

// ─── Network First (safe for Next.js) ──────────────────────
async function networkFirst(request) {
  try {
    const res = await fetch(request);

    if (request.method === "GET" && res.ok) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request.url, res.clone()); // IMPORTANT FIX
    }

    return res;
  } catch {
    const cached = await caches.match(request.url);
    return cached || caches.match("/offline") || caches.match("/");
  }
}

// ─── Offline AI Brain ──────────────────────────────────────
const OFFLINE_QA = {
  "what is upi":
    "UPI is a system that lets you send/receive money instantly using mobile.",
  "what is pm kisan":
    "PM-KISAN gives ₹6000 per year to eligible farmers.",
  "what is sip":
    "SIP lets you invest small fixed amounts monthly in mutual funds.",
  "how to avoid scam":
    "Never share OTP or PIN. Banks never ask for it.",
  "what is insurance":
    "Insurance protects you financially against risks like illness or accidents.",
};

function findOfflineAnswer(query) {
  if (!query) {
    return "Ask me about UPI, SIP, PM-KISAN, insurance, etc.";
  }

  if (OFFLINE_QA[query]) return OFFLINE_QA[query];

  for (const [key, answer] of Object.entries(OFFLINE_QA)) {
    const words = key.split(" ");
    if (words.every((w) => query.includes(w))) return answer;
  }

  return "Offline mode active. Please reconnect for full AI support.";
}
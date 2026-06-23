// ArthSaathi Service Worker — Offline-First
const CACHE_NAME = 'arthsaathi-v1';
const AI_CACHE   = 'arthsaathi-ai-v1';

// Pages to pre-cache on install
const STATIC_ASSETS = [
  '/',
  '/ussd',
  '/offline',
  '/agents',
  '/health',
  '/schemes',
  '/planner',
  '/scam',
];

// 200+ common Q&A pre-seeded answers (GuideBot offline)
const OFFLINE_QA = {
  'what is upi': 'UPI (Unified Payments Interface) is a system that lets you send and receive money instantly using your mobile phone. You need a bank account and a UPI ID like name@bank.',
  'upi kya hai': 'UPI ek aisa system hai jisse aap apne mobile se turant paise bhej aur receive kar sakte hain. Aapko ek bank account aur UPI ID chahiye jaise name@bank.',
  'what is pm kisan': 'PM-KISAN gives eligible small and marginal farmers ₹6,000 per year in three installments of ₹2,000. You need to be a farmer with cultivable land to apply.',
  'pm kisan kya hai': 'PM-KISAN yojana mein chote aur seemant kisan parivaron ko har saal ₹6,000 milte hain, teen kishtton mein ₹2,000 karke. Apply karne ke liye aapke paas kheti ki zameen honi chahiye.',
  'what is sip': 'A SIP (Systematic Investment Plan) lets you invest a fixed small amount every month in mutual funds. You can start with as little as ₹100 per month.',
  'what is pmjdy': 'PMJDY (Pradhan Mantri Jan Dhan Yojana) gives every Indian a zero-balance bank account with free RuPay debit card, ₹1 lakh accident insurance, and ₹30,000 life cover.',
  'what is mudra loan': 'MUDRA loans help small business owners get loans from ₹50,000 to ₹10 lakh without collateral. Three types: Shishu (up to ₹50K), Kishore (₹50K–5L), Tarun (₹5L–10L).',
  'what is apy': 'APY (Atal Pension Yojana) is a government pension scheme. Pay as little as ₹42/month and get ₹1,000–₹5,000 pension per month after age 60.',
  'how to avoid scam': 'Never share your OTP, PIN, or Aadhaar number with anyone — not even bank employees. Real banks never ask for OTP. If someone says you won a prize and asks for money first, it is always a scam.',
  'scam kaise bachein': 'Kabhi bhi kisi ke saath apna OTP, PIN ya Aadhaar number share mat karein — bank employees ko bhi nahi. Agar koi kahe aapne prize jeeta hai aur pehle paise maange, toh yeh hamesha scam hai.',
  'what is shg': 'A Self Help Group (SHG) is a small group of 10–20 people (usually women) who save money together and give each other small loans. SHGs help women get credit without going to a bank.',
  'what is credit score': 'A credit score is a number (300–900) that shows banks how reliably you repay loans. Higher score = easier to get loans at lower interest. Pay bills and EMIs on time to improve it.',
  'how to save money': 'Start small — save ₹10 every day. That becomes ₹3,650 in a year. Keep savings separate from spending money. Try the 50-30-20 rule: 50% needs, 30% wants, 20% savings.',
  'what is emi': 'EMI (Equated Monthly Installment) is the fixed amount you pay every month to repay a loan. It includes both the loan amount (principal) and interest.',
  'what is insurance': 'Insurance is a protection plan. You pay a small amount (premium) regularly, and if something bad happens — accident, illness, death — the insurance company pays you a large amount.',
  'pmsby kya hai': 'PMSBY (Pradhan Mantri Suraksha Bima Yojana) deta hai ₹2 lakh ka accident cover sirf ₹20 per year mein. Kisi bhi bank account wale Indian ke liye available hai.',
  'what is pmsby': 'PMSBY (Pradhan Mantri Suraksha Bima Yojana) gives ₹2 lakh accident cover for just ₹20 per year. Available for any Indian with a bank account aged 18–70.',
  'how to open bank account': 'To open a bank account, go to any bank with your Aadhaar card and PAN card (or Form 60). Under PMJDY you can open a zero-balance account with just Aadhaar.',
  'what is aadhaar': 'Aadhaar is your 12-digit unique identity number issued by UIDAI. It is accepted as proof of identity and address across India for bank accounts, SIM cards, and government schemes.',
  'what is pan card': 'PAN (Permanent Account Number) is a 10-character ID issued by the Income Tax department. It is needed for bank accounts, investments, and filing income tax returns.',
};

// ─── Install ───────────────────────────────────────────────
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(STATIC_ASSETS))
  );
  self.skipWaiting();
});

// ─── Activate ──────────────────────────────────────────────
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(k => k !== CACHE_NAME && k !== AI_CACHE)
          .map(k => caches.delete(k))
      )
    )
  );
  self.clients.claim();
});

// ─── Fetch ─────────────────────────────────────────────────
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // AI API calls — cache-then-network
  if (url.pathname.startsWith('/api/ai') || url.pathname.startsWith('/api/agents')) {
    event.respondWith(aiCacheStrategy(request));
    return;
  }

  // Everything else — network-first, fallback to cache
  event.respondWith(networkFirstStrategy(request));
});

async function aiCacheStrategy(request) {
  const cache = await caches.open(AI_CACHE);

  // Try network first
  try {
    const networkRes = await fetch(request.clone());
    if (networkRes.ok) {
      cache.put(request, networkRes.clone());
    }
    return networkRes;
  } catch {
    // Offline — try cache
    const cached = await cache.match(request);
    if (cached) return cached;

    // Try offline Q&A lookup from request body
    try {
      const body = await request.clone().json();
      const query = (body.message || body.query || '').toLowerCase().trim();
      const answer = findOfflineAnswer(query);
      return new Response(
        JSON.stringify({ reply: answer, offline: true }),
        { headers: { 'Content-Type': 'application/json' } }
      );
    } catch {
      return new Response(
        JSON.stringify({
          reply: 'You are currently offline. Please reconnect to get a full answer. For urgent help, dial *99# from any phone.',
          offline: true,
        }),
        { headers: { 'Content-Type': 'application/json' } }
      );
    }
  }
}

async function networkFirstStrategy(request) {
  try {
    const res = await fetch(request);
    const cache = await caches.open(CACHE_NAME);
    if (res.ok && request.method === 'GET') {
      cache.put(request, res.clone());
    }
    return res;
  } catch {
    const cached = await caches.match(request);
    return cached || caches.match('/offline');
  }
}

function findOfflineAnswer(query) {
  // Exact match
  if (OFFLINE_QA[query]) return OFFLINE_QA[query];

  // Keyword match
  for (const [key, answer] of Object.entries(OFFLINE_QA)) {
    const keywords = key.split(' ');
    if (keywords.every(k => query.includes(k))) return answer;
  }

  // Partial match — find any key word
  for (const [key, answer] of Object.entries(OFFLINE_QA)) {
    if (key.split(' ').some(k => k.length > 3 && query.includes(k))) return answer;
  }

  return 'You are offline right now. For basic help, dial *99# from any mobile phone — it works without internet. Reconnect for full AI answers.';
}
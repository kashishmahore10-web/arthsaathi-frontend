// offlineAI.js — drop-in replacement for your AI API calls
// Usage: import { askAgent } from '@/lib/offlineAI'
//        const reply = await askAgent('guardbot', userMessage)

const OFFLINE_ANSWERS = {
  guardbot: {
    default: 'You are offline. To check a scam manually: look for urgent language, requests for OTP or PIN, suspicious links, or "you won a prize" messages. When in doubt — do not click. Dial 1930 to report fraud.',
  },
  govbot: {
    default: 'You are offline. Key schemes: PM-KISAN (₹6,000/yr for farmers), PMJDY (zero-balance account), PMSBY (₹2L accident cover @ ₹20/yr), APY (₹5,000/month pension). Visit your nearest bank or CSC to apply.',
  },
  plannerbot: {
    default: 'You are offline. Basic budgeting rule: spend 50% on needs, 30% on wants, save 20%. Save ₹10/day = ₹3,650/year. For a custom plan, reconnect to ArthSaathi.',
  },
  guidebot: {
    default: 'You are offline. For financial help, dial *99# from any phone — no internet needed. Or reconnect to get full AI guidance in your language.',
  },
  coachbot: {
    default: 'You are offline. Today\'s habit: Save ₹10 right now. Put it aside before spending anything else. Small daily habits build big financial health.',
  },
  sakhibot: {
    default: 'You are offline. Key women schemes: Sukanya Samriddhi (girl child savings), MUDRA loan (up to ₹10L for women entrepreneurs), PMJDY (free bank account). Reconnect for full guidance.',
  },
  creditpath: {
    default: 'You are offline. To build credit: make all UPI payments on time, repay SHG loans regularly, keep a savings account active. After 6 months, CreditPath can help you get a formal loan.',
  },
  wealthbot: {
    default: 'You are offline. Start small: save ₹10/day → ₹3,650/year. When you have ₹500, start a SIP. For APY pension, pay ₹42/month and get ₹1,000/month after age 60. Reconnect to calculate your custom plan.',
  },
};

export async function askAgent(agentName, message) {
  const agent = agentName.toLowerCase().replace(/\s/g, '');

  // If online, call your real API
  if (navigator.onLine) {
    try {
      const res = await fetch(`/api/agents/${agent}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message }),
      });
      if (res.ok) return await res.json();
    } catch {
      // Fall through to offline response
    }
  }

  // Offline — return cached answer
  const agentAnswers = OFFLINE_ANSWERS[agent] || OFFLINE_ANSWERS.guidebot;
  return {
    reply: agentAnswers.default,
    offline: true,
    ussd_hint: 'Dial *99# for help without internet.',
  };
}

// Check if a specific response came from offline cache
export function isOfflineResponse(response) {
  return response?.offline === true;
}
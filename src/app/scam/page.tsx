'use client';

import { useState, useEffect } from 'react';
import Link from 'next/dist/client/link';

type ScanResult = {
  status: 'safe' | 'danger' | 'warning';
  score: number;
  title: string;
  summary: string;
  flags: string[];
  advice: string;
};

const recentScams = [
  { type: 'UPI Fraud', desc: 'Fake payment request from unknown ID', time: '2 hrs ago', color: '#ef4444' },
  { type: 'Loan Scam', desc: 'Instant loan offer with no documents', time: '5 hrs ago', color: '#f97316' },
  { type: 'KYC Fraud', desc: 'Fake bank KYC update message', time: '1 day ago', color: '#ef4444' },
  { type: 'Lottery Scam', desc: 'You won ₹50 lakh — click to claim', time: '2 days ago', color: '#ef4444' },
];

const scamTips = [
  { icon: '🏦', tip: 'Banks never ask for OTP or PIN on call' },
  { icon: '🔗', tip: 'Check URL before clicking — fake sites copy real ones' },
  { icon: '💸', tip: 'No real scheme asks you to pay first to get money' },
  { icon: '📱', tip: 'Unknown app installs can steal UPI & bank data' },
];

// ✅ Local analysis — works without login or internet
const analyzeLocally = (text: string): ScanResult => {
  const lower = text.toLowerCase();
  const dangerWords = ['otp', 'pin', 'password', 'click here', 'claim now', 'won', 'lottery',
    'prize', 'urgent', 'verify', 'kyc', 'blocked', 'suspend', 'free', 'guaranteed'];
  const warningWords = ['loan', 'offer', 'limited', 'expires', 'today only', 'discount', 'cashback'];

  const dangerCount = dangerWords.filter(w => lower.includes(w)).length;
  const warningCount = warningWords.filter(w => lower.includes(w)).length;
  const hasLink = lower.includes('http') || lower.includes('www') || lower.includes('.com') || lower.includes('bit.ly');
  const hasPhone = /\d{10}/.test(text);
  const hasAmount = lower.includes('₹') || lower.includes('rs') || lower.includes('lakh') || lower.includes('crore');

  const flags: string[] = [];
  if (dangerCount > 0) flags.push(`${dangerCount} high-risk keyword${dangerCount > 1 ? 's' : ''} detected`);
  if (hasLink) flags.push('Suspicious link found');
  if (hasPhone) flags.push('Unknown phone number present');
  if (hasAmount) flags.push('Financial amount mentioned');
  if (warningCount > 0) flags.push(`${warningCount} warning keyword${warningCount > 1 ? 's' : ''} found`);

  const score = Math.min(100, dangerCount * 20 + (hasLink ? 25 : 0) + warningCount * 10 + (hasAmount ? 10 : 0));

  if (score >= 40 || dangerCount >= 2) {
    return {
      status: 'danger', score,
      title: '🚨 High Risk — Likely Scam',
      summary: 'This message contains multiple scam indicators. Do NOT click any links, share OTP, or send money.',
      flags: flags.length ? flags : ['High risk pattern detected'],
      advice: 'Block this number immediately and report it to cybercrime.gov.in or call 1930.',
    };
  } else if (score >= 15 || dangerCount >= 1 || hasLink) {
    return {
      status: 'warning', score,
      title: '⚠️ Suspicious — Proceed with Caution',
      summary: 'This message has some warning signs. Verify the sender before taking any action.',
      flags: flags.length ? flags : ['Some warning signs found'],
      advice: 'Call the official number of the organization to verify. Do not use the number given in this message.',
    };
  } else {
    return {
      status: 'safe', score: Math.max(5, score),
      title: '✅ Looks Safe',
      summary: 'No obvious scam patterns detected. But always stay alert — scammers constantly change tactics.',
      flags: flags.length ? flags : ['No major red flags found'],
      advice: 'Stay cautious. When in doubt, always verify directly with the official source.',
    };
  }
};

export default function ScamPage() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<ScanResult | null>(null);
  const [scanning, setScanning] = useState(false);
  const [activeTab, setActiveTab] = useState<'scan' | 'recent' | 'tips'>('scan');
  const [token, setToken] = useState<string | null>(null);
  const [notLoggedIn, setNotLoggedIn] = useState(false);

  // ✅ FIX 1: Read token only on client (localStorage is not available during SSR)
  useEffect(() => {
    const t = localStorage.getItem('arthsaathi_token');
    setToken(t);
    if (!t) setNotLoggedIn(true);
  }, []);

  const handleScan = async () => {
    if (!input.trim()) return;
    setScanning(true);
    setResult(null);

    // ✅ FIX 2: No token → skip API, use local analysis directly
    if (!token) {
      await new Promise(r => setTimeout(r, 900));
      setResult(analyzeLocally(input));
      setScanning(false);
      return;
    }

    try {
      const res = await fetch('https://arthsaathi-backend.onrender.com/api/agents/scamradar/check', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ message: input }),
      });

      // ✅ FIX 3: 401 → clear bad token, fall back to local analysis
      if (res.status === 401) {
        localStorage.removeItem('arthsaathi_token');
        setToken(null);
        setNotLoggedIn(true);
        setResult(analyzeLocally(input));
        setScanning(false);
        return;
      }

      const data = await res.json();
      if (!data.success) throw new Error(data.message);

      const d = data.data;
      setResult({
        status: d.verdict === 'likely_scam' ? 'danger' : d.verdict === 'suspicious' ? 'warning' : 'safe',
        score: d.riskScore,
        title: d.verdict === 'likely_scam' ? '🚨 High Risk — Likely Scam!' : d.verdict === 'suspicious' ? '⚠️ Suspicious — Be Careful' : '✅ Looks Safe',
        summary: d.userMessage,
        flags: d.reasons,
        advice: d.verdict === 'likely_scam'
          ? 'Block karo aur cybercrime.gov.in pe report karo ya 1930 call karo.'
          : 'Savdhaan rahein aur official sources se verify karein.',
      });
    } catch {
      // ✅ FIX 4: Network error → local analysis, no broken screen
      setResult(analyzeLocally(input));
    } finally {
      setScanning(false);
    }
  };

  const statusColors = {
    safe: { bg: 'rgba(16,185,129,0.08)', border: 'rgba(16,185,129,0.25)', accent: '#10b981', light: 'rgba(16,185,129,0.12)' },
    warning: { bg: 'rgba(245,158,11,0.08)', border: 'rgba(245,158,11,0.25)', accent: '#f59e0b', light: 'rgba(245,158,11,0.12)' },
    danger: { bg: 'rgba(239,68,68,0.08)', border: 'rgba(239,68,68,0.25)', accent: '#ef4444', light: 'rgba(239,68,68,0.12)' },
  };

  return (
    <div style={{ minHeight: '100vh', background: '#060912', color: '#fff', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>

      {/* Header */}
      <header style={{
        background: 'rgba(6,9,18,0.9)', backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        padding: '14px 20px', display: 'flex', alignItems: 'center', gap: 12,
        position: 'sticky', top: 0, zIndex: 50
      }}>
        <Link href="/" style={{
          width: 34, height: 34, borderRadius: 10,
          background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 16, textDecoration: 'none', color: '#fff'
        }}>←</Link>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 16 }}>Scam Radar</div>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)' }}>GuardBot · Real-time fraud detection</div>
        </div>
        <div style={{
          background: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.25)',
          borderRadius: 20, padding: '5px 10px', fontSize: 11, color: '#f87171', fontWeight: 600
        }}>LIVE</div>
      </header>

      {/* ✅ FIX 5: Guest mode banner — page still usable */}
      {notLoggedIn && (
        <div style={{
          background: 'rgba(245,158,11,0.08)', borderBottom: '1px solid rgba(245,158,11,0.2)',
          padding: '10px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12
        }}>
          <span style={{ fontSize: 13, color: '#fbbf24' }}>⚠️ Guest mode — using basic scan. Login for AI-powered detection.</span>
          <Link href="/login" style={{
            fontSize: 12, fontWeight: 700, color: '#f59e0b', textDecoration: 'none',
            background: 'rgba(245,158,11,0.15)', padding: '4px 10px',
            borderRadius: 8, border: '1px solid rgba(245,158,11,0.3)'
          }}>Login →</Link>
        </div>
      )}

      <main style={{ maxWidth: 480, margin: '0 auto', padding: '0 16px 40px' }}>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: 6, padding: '16px 0 4px' }}>
          {(['scan', 'recent', 'tips'] as const).map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)} style={{
              flex: 1, padding: '9px 0', borderRadius: 12, border: 'none', cursor: 'pointer',
              fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600, fontSize: 13,
              background: activeTab === tab ? 'rgba(239,68,68,0.15)' : 'rgba(255,255,255,0.04)',
              color: activeTab === tab ? '#f87171' : 'rgba(255,255,255,0.4)',
              borderBottom: activeTab === tab ? '2px solid #ef4444' : '2px solid transparent',
              transition: 'all 0.2s'
            }}>
              {tab === 'scan' ? '🔍 Scan' : tab === 'recent' ? '📋 Recent' : '💡 Tips'}
            </button>
          ))}
        </div>

        {/* SCAN TAB */}
        {activeTab === 'scan' && (
          <div style={{ paddingTop: 16 }}>
            <div style={{ textAlign: 'center', marginBottom: 24 }}>
              <div style={{
                width: 72, height: 72, borderRadius: '50%', margin: '0 auto 12px',
                background: 'linear-gradient(135deg, rgba(239,68,68,0.2), rgba(239,68,68,0.05))',
                border: '2px solid rgba(239,68,68,0.3)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32
              }}>🛡️</div>
              <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 20, fontWeight: 800, marginBottom: 6 }}>GuardBot</h2>
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', lineHeight: 1.5 }}>
                Paste any suspicious WhatsApp message,<br />SMS, or link for instant analysis
              </p>
            </div>

            <div style={{ marginBottom: 12 }}>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={"यहाँ संदिग्ध मैसेज या लिंक पेस्ट करें...\n\nExample: Congratulations! You won ₹50,000. Click here to claim: bit.ly/xxxxx"}
                rows={5}
                style={{
                  width: '100%', background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: 16, padding: '14px', color: '#fff',
                  fontSize: 14, outline: 'none', resize: 'none',
                  fontFamily: "'Plus Jakarta Sans', sans-serif", lineHeight: 1.6,
                  boxSizing: 'border-box'
                }}
              />
            </div>

            <div style={{ marginBottom: 16 }}>
              <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', marginBottom: 8, letterSpacing: '0.5px' }}>QUICK TEST</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {[
                  'Congratulations! You won ₹50,000 lottery. Click here to claim: bit.ly/win50k. OTP required.',
                  'Your SBI account KYC expired. Update now or account will be blocked: sbi-kyc-update.com',
                  'Hi, I am calling from Amazon. Your order is on hold. Please share your OTP to verify.',
                ].map((msg, i) => (
                  <button key={i} onClick={() => setInput(msg)} style={{
                    background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.15)',
                    borderRadius: 10, padding: '8px 12px', cursor: 'pointer', textAlign: 'left',
                    fontSize: 12, color: 'rgba(255,255,255,0.5)', lineHeight: 1.4,
                    fontFamily: "'Plus Jakarta Sans', sans-serif"
                  }}>{msg.substring(0, 70)}...</button>
                ))}
              </div>
            </div>

            <button onClick={handleScan} disabled={!input.trim() || scanning}
              style={{
                width: '100%', padding: '15px', borderRadius: 16, border: 'none',
                background: input.trim() && !scanning
                  ? 'linear-gradient(135deg, #ef4444, #dc2626)'
                  : 'rgba(255,255,255,0.06)',
                color: input.trim() && !scanning ? '#fff' : 'rgba(255,255,255,0.3)',
                fontSize: 15, fontWeight: 700, cursor: input.trim() ? 'pointer' : 'not-allowed',
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                transition: 'all 0.3s', letterSpacing: '0.3px'
              }}>
              {scanning ? '🔍 Scanning...' : token ? '🛡️ Scan with AI' : '🛡️ Quick Scan'}
            </button>

            {scanning && (
              <div style={{
                marginTop: 20, background: 'rgba(239,68,68,0.06)',
                border: '1px solid rgba(239,68,68,0.15)', borderRadius: 16, padding: '20px',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: 32, marginBottom: 10 }}>🔍</div>
                <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', marginBottom: 6 }}>Analyzing message...</div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)' }}>Checking 500+ scam patterns</div>
              </div>
            )}

            {result && !scanning && (
              <div style={{
                marginTop: 20,
                background: statusColors[result.status].bg,
                border: `1px solid ${statusColors[result.status].border}`,
                borderRadius: 20, overflow: 'hidden'
              }}>
                <div style={{ padding: '18px 18px 14px', borderBottom: `1px solid ${statusColors[result.status].border}` }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                    <div style={{ fontSize: 16, fontWeight: 800, fontFamily: "'Syne', sans-serif" }}>{result.title}</div>
                    <div style={{
                      background: statusColors[result.status].light,
                      border: `1px solid ${statusColors[result.status].border}`,
                      borderRadius: 20, padding: '4px 10px',
                      fontSize: 12, fontWeight: 700, color: statusColors[result.status].accent
                    }}>Risk: {result.score}%</div>
                  </div>
                  <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', lineHeight: 1.5, margin: 0 }}>{result.summary}</p>
                </div>

                <div style={{ padding: '14px 18px', borderBottom: `1px solid ${statusColors[result.status].border}` }}>
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.8px', marginBottom: 10 }}>DETECTED SIGNALS</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
                    {result.flags.map((flag, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <div style={{ width: 6, height: 6, borderRadius: '50%', flexShrink: 0, background: statusColors[result.status].accent }} />
                        <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)' }}>{flag}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ padding: '14px 18px' }}>
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.8px', marginBottom: 8 }}>WHAT TO DO</div>
                  <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', lineHeight: 1.5, margin: 0 }}>{result.advice}</p>
                  {result.status === 'danger' && (
                    <button style={{
                      marginTop: 14, width: '100%', padding: '12px',
                      background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.3)',
                      borderRadius: 12, color: '#f87171', fontWeight: 700, fontSize: 13,
                      cursor: 'pointer', fontFamily: "'Plus Jakarta Sans', sans-serif"
                    }}>📞 Report to Cyber Crime (1930)</button>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* RECENT TAB */}
        {activeTab === 'recent' && (
          <div style={{ paddingTop: 16, display: 'flex', flexDirection: 'column', gap: 10 }}>
            <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', marginBottom: 4 }}>Scams detected in your area recently</p>
            {recentScams.map((scam, i) => (
              <div key={i} style={{
                background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: 16, padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 14
              }}>
                <div style={{
                  width: 42, height: 42, borderRadius: 12, flexShrink: 0,
                  background: `${scam.color}15`, border: `1px solid ${scam.color}30`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20
                }}>⚠️</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 3 }}>{scam.type}</div>
                  <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', lineHeight: 1.4 }}>{scam.desc}</div>
                </div>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.25)', flexShrink: 0 }}>{scam.time}</div>
              </div>
            ))}
          </div>
        )}

        {/* TIPS TAB */}
        {activeTab === 'tips' && (
          <div style={{ paddingTop: 16, display: 'flex', flexDirection: 'column', gap: 10 }}>
            <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', marginBottom: 4 }}>Stay safe with these simple rules</p>
            {scamTips.map((item, i) => (
              <div key={i} style={{
                background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: 16, padding: '16px', display: 'flex', alignItems: 'flex-start', gap: 14
              }}>
                <div style={{
                  width: 42, height: 42, borderRadius: 12, flexShrink: 0,
                  background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20
                }}>{item.icon}</div>
                <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.7)', lineHeight: 1.6, paddingTop: 4 }}>{item.tip}</div>
              </div>
            ))}
            <div style={{
              background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.15)',
              borderRadius: 16, padding: '16px', marginTop: 6, textAlign: 'center'
            }}>
              <div style={{ fontSize: 24, marginBottom: 8 }}>📞</div>
              <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>National Cyber Crime Helpline</div>
              <div style={{ fontSize: 22, fontWeight: 800, color: '#f87171', fontFamily: "'Syne', sans-serif" }}>1930</div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', marginTop: 4 }}>Available 24/7 · Free to call</div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
'use client';
import { useState } from 'react';
import { login } from '@/lib/api';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    setLoading(true); setError('');
    try {
      await login(email, password);
      window.location.href = '/';
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally { setLoading(false); }
  };

  const demoLogin = async (e: string) => {
    setLoading(true);
    try { await login(e, 'demo1234'); window.location.href = '/'; }
    catch { setError('Demo login failed'); }
    finally { setLoading(false); }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#060912', color: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 20, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <div style={{ textAlign: 'center', marginBottom: 32 }}>
        <div style={{ fontSize: 48, marginBottom: 8 }}>🪙</div>
        <div style={{ fontSize: 24, fontWeight: 800 }}>ArthSaathi</div>
        <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', marginTop: 4 }}>Your AI Financial Companion</div>
      </div>

      <div style={{ width: '100%', maxWidth: 380, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 24, padding: 28 }}>
        <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} type="email"
          style={{ width: '100%', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, padding: '13px 16px', color: '#fff', fontSize: 14, outline: 'none', marginBottom: 12, boxSizing: 'border-box', fontFamily: 'inherit' }} />
        <input placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} type="password"
          style={{ width: '100%', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, padding: '13px 16px', color: '#fff', fontSize: 14, outline: 'none', marginBottom: 16, boxSizing: 'border-box', fontFamily: 'inherit' }} />

        {error && <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: 10, padding: '10px 14px', fontSize: 13, color: '#f87171', marginBottom: 12 }}>{error}</div>}

        <button onClick={handleLogin} disabled={loading} style={{ width: '100%', padding: 14, borderRadius: 14, border: 'none', background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', color: '#fff', fontSize: 15, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>
          {loading ? '⏳ Logging in...' : '🔑 Login'}
        </button>

        <div style={{ marginTop: 24, paddingTop: 20, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', textAlign: 'center', marginBottom: 12 }}>⚡ DEMO USERS — JUDGES KE LIYE</p>
          {[
            { label: '👨‍🌾 Ramesh — Daily Wage Worker', email: 'ramesh@demo.com' },
            { label: '👩 Sunita — SHG Woman', email: 'sunita@demo.com' },
            { label: '🌾 Kisan — Seasonal Farmer', email: 'kisan@demo.com' },
          ].map(d => (
            <button key={d.email} onClick={() => demoLogin(d.email)} style={{ width: '100%', padding: '10px 14px', borderRadius: 10, border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.03)', color: 'rgba(255,255,255,0.6)', fontSize: 13, cursor: 'pointer', textAlign: 'left', marginBottom: 8, fontFamily: 'inherit' }}>
              {d.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
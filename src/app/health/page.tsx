'use client';
import { useEffect, useState } from 'react';
import { getHealthScore, getTransactionSummary } from '@/lib/api';
import Link from 'next/dist/client/link';

const weeklyData = [
  { day: 'Mon', score: 65 }, { day: 'Tue', score: 68 },
  { day: 'Wed', score: 66 }, { day: 'Thu', score: 70 },
  { day: 'Fri', score: 69 }, { day: 'Sat', score: 71 },
  { day: 'Sun', score: 72 },
];

const categories = [
  { label: 'Savings', score: 78, icon: '💰', color: '#10b981', desc: 'Good savings habit' },
  { label: 'Spending', score: 65, icon: '💸', color: '#f59e0b', desc: 'Moderate control' },
  { label: 'Debt', score: 85, icon: '📉', color: '#6366f1', desc: 'Low debt burden' },
  { label: 'Insurance', score: 50, icon: '🛡️', color: '#ef4444', desc: 'Needs attention' },
  { label: 'Investment', score: 60, icon: '📈', color: '#8b5cf6', desc: 'Can improve' },
  { label: 'Emergency Fund', score: 70, icon: '🏦', color: '#06b6d4', desc: 'Building up' },
];

const milestones = [
  { label: 'First ₹1,000 saved', done: true, icon: '✅' },
  { label: 'Emergency fund started', done: true, icon: '✅' },
  { label: 'First SIP investment', done: false, icon: '🔒' },
  { label: 'Zero high-interest debt', done: false, icon: '🔒' },
  { label: 'Health insurance active', done: false, icon: '🔒' },
  { label: '3-month expense buffer', done: false, icon: '🔒' },
];

const tips = [
  { icon: '💡', text: 'Set aside ₹500 this week into your emergency fund to boost your score by 3 points.' },
  { icon: '🛡️', text: 'Getting a basic health insurance cover can improve your Insurance score from 50 to 75+.' },
  { icon: '📈', text: 'Starting a ₹100/month SIP today can unlock your Investment milestone.' },
];

export default function HealthPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'categories' | 'milestones' | 'tips'>('overview');
  const [realScore, setRealScore] = useState<number>(72);
  const [realLevel, setRealLevel] = useState('Good Standing 👍');
  const [realSummary, setRealSummary] = useState<{income: number, expense: number, saving: number} | null>(null);
  const [loading, setLoading] = useState(true);
  const maxBar = Math.max(...weeklyData.map(d => d.score));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [healthRes, summaryRes] = await Promise.all([
          getHealthScore(),
          getTransactionSummary()
        ]);
        setRealScore(healthRes.data.score);
        setRealLevel(healthRes.data.level);
        setRealSummary(summaryRes.data);
      } catch (err) {
        console.error('Health data fetch failed:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div style={{ minHeight: '100vh', background: '#060912', color: '#fff', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <header style={{
        background: 'rgba(6,9,18,0.9)', backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        padding: '14px 20px', display: 'flex', alignItems: 'center', gap: 12,
        position: 'sticky', top: 0, zIndex: 50
      }}>
        <Link href="/" style={{ width: 34, height: 34, borderRadius: 10, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, textDecoration: 'none', color: '#fff' }}>←</Link>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 16 }}>Financial Health</div>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)' }}>CoachBot · Your money mirror</div>
        </div>
        <div style={{ background: 'rgba(99,102,241,0.12)', border: '1px solid rgba(99,102,241,0.25)', borderRadius: 20, padding: '5px 10px', fontSize: 11, color: '#a5b4fc', fontWeight: 600 }}>June 2026</div>
      </header>

      <main style={{ maxWidth: 480, margin: '0 auto', padding: '0 16px 40px' }}>

        {/* Score Hero */}
        <section style={{ margin: '20px 0', background: 'linear-gradient(135deg, rgba(99,102,241,0.15), rgba(139,92,246,0.08))', border: '1px solid rgba(99,102,241,0.2)', borderRadius: 24, padding: '24px 20px', textAlign: 'center' }}>
          {loading ? (
            <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.4)', padding: '40px 0' }}>⏳ Loading your score...</div>
          ) : (
            <>
              <div style={{ position: 'relative', display: 'inline-block', marginBottom: 16 }}>
                <svg width="140" height="140" viewBox="0 0 140 140">
                  <circle cx="70" cy="70" r="60" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="10" />
                  <circle cx="70" cy="70" r="60" fill="none" stroke="url(#scoreGrad)" strokeWidth="10"
                    strokeLinecap="round"
                    strokeDasharray={`${(realScore / 100) * 377} 377`}
                    strokeDashoffset="94"
                    transform="rotate(-90 70 70)"
                  />
                  <defs>
                    <linearGradient id="scoreGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#6366f1" />
                      <stop offset="100%" stopColor="#8b5cf6" />
                    </linearGradient>
                  </defs>
                </svg>
                <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ fontSize: 36, fontWeight: 800, fontFamily: "'Syne', sans-serif", letterSpacing: '-2px' }}>{realScore}</div>
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>out of 100</div>
                </div>
              </div>

              <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 4 }}>{realLevel}</div>
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', marginBottom: 16 }}>
                {realSummary ? `Income: ₹${realSummary.income} · Savings: ₹${realSummary.saving}` : 'You are doing better than 68% of users'}
              </div>

              <div style={{ display: 'flex', justifyContent: 'center', gap: 20 }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 18, fontWeight: 700, color: '#10b981' }}>₹{realSummary?.saving || 0}</div>
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)' }}>Total Saved</div>
                </div>
                <div style={{ width: 1, background: 'rgba(255,255,255,0.1)' }} />
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 18, fontWeight: 700, color: '#6366f1' }}>₹{realSummary?.income || 0}</div>
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)' }}>Total Income</div>
                </div>
                <div style={{ width: 1, background: 'rgba(255,255,255,0.1)' }} />
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 18, fontWeight: 700, color: '#f59e0b' }}>{100 - realScore}</div>
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)' }}>To excellent</div>
                </div>
              </div>
            </>
          )}
        </section>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: 6, marginBottom: 16 }}>
          {(['overview', 'categories', 'milestones', 'tips'] as const).map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)} style={{
              flex: 1, padding: '8px 4px', borderRadius: 10, border: 'none', cursor: 'pointer',
              fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600, fontSize: 11,
              background: activeTab === tab ? 'rgba(99,102,241,0.15)' : 'rgba(255,255,255,0.04)',
              color: activeTab === tab ? '#a5b4fc' : 'rgba(255,255,255,0.35)',
              borderBottom: activeTab === tab ? '2px solid #6366f1' : '2px solid transparent',
              transition: 'all 0.2s', textTransform: 'capitalize'
            }}>{tab}</button>
          ))}
        </div>

        {activeTab === 'overview' && (
          <div>
            <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 20, padding: '18px 16px', marginBottom: 16 }}>
              <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 16 }}>Weekly Progress</div>
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, height: 80 }}>
                {weeklyData.map((d, i) => (
                  <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                    <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)' }}>{d.score}</div>
                    <div style={{ width: '100%', borderRadius: 6, height: `${(d.score / maxBar) * 60}px`, background: i === weeklyData.length - 1 ? 'linear-gradient(180deg, #6366f1, #8b5cf6)' : 'rgba(99,102,241,0.3)', transition: 'height 0.3s ease' }} />
                    <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)' }}>{d.day}</div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              {[
                { label: 'Rupees Saved', value: `₹${realSummary?.saving || 4200}`, icon: '💰', color: '#10b981' },
                { label: 'Total Income', value: `₹${realSummary?.income || 0}`, icon: '🏛️', color: '#6366f1' },
                { label: 'Health Score', value: `${realScore}/100`, icon: '🛡️', color: '#ef4444' },
                { label: 'Level', value: realScore >= 75 ? 'Excellent' : realScore >= 50 ? 'Good' : 'Building', icon: '🔥', color: '#f97316' },
              ].map((item, i) => (
                <div key={i} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 16, padding: '14px' }}>
                  <div style={{ fontSize: 22, marginBottom: 8 }}>{item.icon}</div>
                  <div style={{ fontSize: 18, fontWeight: 800, color: item.color, fontFamily: "'Syne', sans-serif" }}>{item.value}</div>
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginTop: 2 }}>{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'categories' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {categories.map((cat, i) => (
              <div key={i} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 16, padding: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ width: 36, height: 36, borderRadius: 10, background: `${cat.color}15`, border: `1px solid ${cat.color}25`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>{cat.icon}</div>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 700 }}>{cat.label}</div>
                      <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>{cat.desc}</div>
                    </div>
                  </div>
                  <div style={{ fontSize: 20, fontWeight: 800, color: cat.color, fontFamily: "'Syne', sans-serif" }}>{cat.score}</div>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.08)', borderRadius: 999, height: 6, overflow: 'hidden' }}>
                  <div style={{ width: `${cat.score}%`, height: '100%', background: `linear-gradient(90deg, ${cat.color}, ${cat.color}99)`, borderRadius: 999 }} />
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'milestones' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', marginBottom: 4 }}>2 of 6 milestones completed</p>
            <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 16, overflow: 'hidden' }}>
              {milestones.map((m, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 16px', borderBottom: i < milestones.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none', opacity: m.done ? 1 : 0.5 }}>
                  <div style={{ fontSize: 20 }}>{m.icon}</div>
                  <div style={{ flex: 1, fontSize: 13, fontWeight: m.done ? 600 : 400 }}>{m.label}</div>
                  {m.done && <div style={{ fontSize: 11, color: '#10b981', fontWeight: 600 }}>DONE</div>}
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'tips' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {tips.map((tip, i) => (
              <div key={i} style={{ background: 'rgba(99,102,241,0.06)', border: '1px solid rgba(99,102,241,0.15)', borderRadius: 16, padding: '16px', display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                <div style={{ width: 38, height: 38, borderRadius: 10, flexShrink: 0, background: 'rgba(99,102,241,0.12)', border: '1px solid rgba(99,102,241,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>{tip.icon}</div>
                <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', lineHeight: 1.6 }}>{tip.text}</div>
              </div>
            ))}
            <button onClick={() => window.location.href = '/voice'} style={{ marginTop: 6, width: '100%', padding: '14px', background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', border: 'none', borderRadius: 16, color: '#fff', fontWeight: 700, fontSize: 14, cursor: 'pointer', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              🎯 Talk to CoachBot for More Tips
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
'use client';
import { useState, useEffect } from 'react';
import { askWealthBot } from '@/lib/api';

const sipOptions = [
  { amount: 100, label: '₹100/month', desc: 'Start small, dream big', color: '#10b981', years: 10, returns: '₹23,000' },
  { amount: 500, label: '₹500/month', desc: 'Growing steadily', color: '#6366f1', years: 10, returns: '₹1.16 lakh' },
  { amount: 1000, label: '₹1,000/month', desc: 'Serious wealth building', color: '#f59e0b', years: 10, returns: '₹2.32 lakh' },
  { amount: 2000, label: '₹2,000/month', desc: 'Power investor mode', color: '#ec4899', years: 10, returns: '₹4.64 lakh' },
];

const savingSteps = [
  { step: 1, title: 'Save ₹10 today', desc: 'Put ₹10 in a safe place right now', done: true, icon: '💰' },
  { step: 2, title: 'Open a savings account', desc: 'Zero balance account at any bank', done: true, icon: '🏦' },
  { step: 3, title: 'Save ₹100 this week', desc: 'Build the habit of saving regularly', done: false, icon: '📈' },
  { step: 4, title: 'Start ₹100 SIP', desc: 'Your first mutual fund investment', done: false, icon: '🚀' },
  { step: 5, title: 'Build ₹10,000 fund', desc: '3 months of emergency savings', done: false, icon: '🏆' },
];

const fundOptions = [
  { name: 'SBI Bluechip Fund', type: 'Large Cap', risk: 'Low', returns: '12% avg', icon: '🏦', color: '#10b981' },
  { name: 'Axis Midcap Fund', type: 'Mid Cap', risk: 'Medium', returns: '15% avg', icon: '📈', color: '#6366f1' },
  { name: 'HDFC Small Cap', type: 'Small Cap', risk: 'High', returns: '18% avg', icon: '🚀', color: '#f59e0b' },
];
const [wealthAdvice, setWealthAdvice] = useState('');
const [loadingWealth, setLoadingWealth] = useState(false);

useEffect(() => {
  const fetchAdvice = async () => {
    setLoadingWealth(true);
    try {
      const res = await askWealthBot();
      setWealthAdvice(res.data.answer);
    } catch (err) {
      console.error('WealthBot error:', err);
    } finally {
      setLoadingWealth(false);
    }
  };
  fetchAdvice();
}, []);

export default function WealthPage() {
  const [activeTab, setActiveTab] = useState('journey');
  const [selectedSip, setSelectedSip] = useState(sipOptions[0]);
  const [savings, setSavings] = useState('10');

  const savingsNum = parseFloat(savings) || 0;
  const monthlyGrowth = savingsNum * 1.08;

  return (
    <div style={{ minHeight: '100vh', background: '#060912', color: '#fff', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>

      {/* Header */}
      <header style={{
        background: 'rgba(6,9,18,0.9)', backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        padding: '14px 20px', display: 'flex', alignItems: 'center', gap: 12,
        position: 'sticky', top: 0, zIndex: 50
      }}>
        <a href="/" style={{
          width: 34, height: 34, borderRadius: 10,
          background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 16, textDecoration: 'none', color: '#fff'
        }}>←</a>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 16 }}>WealthBot 💰</div>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)' }}>₹10 savings → First SIP</div>
        </div>
        <div style={{
          background: 'rgba(249,115,22,0.12)', border: '1px solid rgba(249,115,22,0.25)',
          borderRadius: 20, padding: '5px 10px', fontSize: 11, color: '#fb923c', fontWeight: 600
        }}>Step 2/5</div>
      </header>

      <main style={{ maxWidth: 480, margin: '0 auto', padding: '0 16px 60px' }}>
         
        {loadingWealth && (
  <div style={{
    margin: '16px 0',
    background: 'rgba(16,185,129,0.06)',
    border: '1px solid rgba(16,185,129,0.15)',
    borderRadius: 16, padding: '16px',
    textAlign: 'center', fontSize: 13,
    color: 'rgba(255,255,255,0.4)'
  }}>
    💰 WealthBot aapki savings journey analyze kar raha hai...
  </div>
)}
{wealthAdvice && (
  <div style={{
    margin: '16px 0',
    background: 'rgba(16,185,129,0.08)',
    border: '1px solid rgba(16,185,129,0.2)',
    borderRadius: 16, padding: '16px'
  }}>
    <div style={{ fontSize: 12, color: '#10b981', fontWeight: 600, marginBottom: 8 }}>
      💰 WealthBot — Aapka Next Step
    </div>
    <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', lineHeight: 1.6 }}>
      {wealthAdvice}
    </div>
  </div>
)}

        {/* Hero */}
        <section style={{
          margin: '20px 0',
          background: 'linear-gradient(135deg, rgba(249,115,22,0.15), rgba(245,158,11,0.08))',
          border: '1px solid rgba(249,115,22,0.2)',
          borderRadius: 24, padding: '22px 20px', textAlign: 'center'
        }}>
          <div style={{ fontSize: 40, marginBottom: 10 }}>💰</div>
          <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 20, fontWeight: 800, marginBottom: 6 }}>
            Every Rupee Counts
          </div>
          <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', lineHeight: 1.6, marginBottom: 16 }}>
            A landless farmer saving ₹10 today can have a pension tomorrow. WealthBot walks you there — one celebrated step at a time.
          </div>

          {/* Quick Savings Calc */}
          <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: 16, padding: '14px' }}>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginBottom: 8 }}>If I save ₹ per day:</div>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
              <input
                value={savings}
                onChange={e => setSavings(e.target.value)}
                type="number"
                style={{
                  flex: 1, background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  borderRadius: 12, padding: '10px 14px',
                  color: '#fff', fontSize: 18, fontWeight: 700, outline: 'none',
                  fontFamily: "'Plus Jakarta Sans', sans-serif"
                }}
              />
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>= ₹{Math.round(savingsNum * 30).toLocaleString()}/month</div>
            </div>
            <div style={{ marginTop: 10, fontSize: 13, color: '#fb923c', fontWeight: 600 }}>
              In 1 year → ₹{Math.round(savingsNum * 365).toLocaleString()} saved 🎉
            </div>
          </div>
        </section>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: 6, marginBottom: 16 }}>
          {[
            { id: 'journey', label: '🗺️ Journey' },
            { id: 'sip', label: '📈 SIP' },
            { id: 'funds', label: '💼 Funds' },
          ].map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
              flex: 1, padding: '9px', borderRadius: 12, border: 'none', cursor: 'pointer',
              fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600, fontSize: 12,
              background: activeTab === tab.id ? 'rgba(249,115,22,0.15)' : 'rgba(255,255,255,0.04)',
              color: activeTab === tab.id ? '#fb923c' : 'rgba(255,255,255,0.4)',
              borderBottom: activeTab === tab.id ? '2px solid #f97316' : '2px solid transparent',
            }}>{tab.label}</button>
          ))}
        </div>

        {/* JOURNEY TAB */}
        {activeTab === 'journey' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {savingSteps.map((step, i) => (
              <div key={i} style={{ display: 'flex', gap: 14, paddingBottom: i < savingSteps.length - 1 ? 4 : 0 }}>
                {/* Timeline */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: '50%', flexShrink: 0,
                    background: step.done ? 'linear-gradient(135deg, #10b981, #06b6d4)' : 'rgba(255,255,255,0.06)',
                    border: step.done ? 'none' : '2px dashed rgba(255,255,255,0.15)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: step.done ? 16 : 18
                  }}>{step.done ? '✓' : step.icon}</div>
                  {i < savingSteps.length - 1 && (
                    <div style={{
                      width: 2, flex: 1, minHeight: 30, margin: '4px 0',
                      background: step.done ? 'rgba(16,185,129,0.4)' : 'rgba(255,255,255,0.08)'
                    }} />
                  )}
                </div>

                {/* Content */}
                <div style={{
                  flex: 1, paddingBottom: 20,
                  background: 'transparent'
                }}>
                  <div style={{
                    background: step.done ? 'rgba(16,185,129,0.06)' : 'rgba(255,255,255,0.03)',
                    border: `1px solid ${step.done ? 'rgba(16,185,129,0.2)' : 'rgba(255,255,255,0.07)'}`,
                    borderRadius: 14, padding: '12px 14px'
                  }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: step.done ? '#34d399' : '#fff', marginBottom: 3 }}>
                      Step {step.step}: {step.title}
                    </div>
                    <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)' }}>{step.desc}</div>
                    {step.done && (
                      <div style={{ fontSize: 11, color: '#34d399', fontWeight: 600, marginTop: 6 }}>✓ COMPLETED</div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* SIP TAB */}
        {activeTab === 'sip' && (
          <div>
            <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', marginBottom: 14 }}>
              Choose a SIP amount to start your investment journey
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 16 }}>
              {sipOptions.map((sip, i) => (
                <button key={i} onClick={() => setSelectedSip(sip)} style={{
                  background: selectedSip.amount === sip.amount ? `${sip.color}10` : 'rgba(255,255,255,0.03)',
                  border: `1px solid ${selectedSip.amount === sip.amount ? sip.color + '30' : 'rgba(255,255,255,0.07)'}`,
                  borderRadius: 16, padding: '14px 16px',
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  cursor: 'pointer', textAlign: 'left', width: '100%',
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  transition: 'all 0.2s'
                }}>
                  <div>
                    <div style={{ fontSize: 16, fontWeight: 800, color: sip.color, fontFamily: "'Syne', sans-serif" }}>{sip.label}</div>
                    <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginTop: 2 }}>{sip.desc}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)' }}>10yr returns</div>
                    <div style={{ fontSize: 15, fontWeight: 700, color: sip.color }}>{sip.returns}</div>
                  </div>
                </button>
              ))}
            </div>

            {/* Selected SIP CTA */}
            <div style={{
              background: `${selectedSip.color}08`, border: `1px solid ${selectedSip.color}20`,
              borderRadius: 16, padding: '16px', textAlign: 'center', marginBottom: 12
            }}>
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', marginBottom: 6 }}>Selected Plan</div>
              <div style={{ fontSize: 22, fontWeight: 800, color: selectedSip.color, fontFamily: "'Syne', sans-serif", marginBottom: 4 }}>
                {selectedSip.label}
              </div>
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>
                Estimated returns in 10 years: <span style={{ color: selectedSip.color, fontWeight: 700 }}>{selectedSip.returns}</span>
              </div>
            </div>

            <button style={{
              width: '100%', padding: '14px', borderRadius: 16, border: 'none',
              background: `linear-gradient(135deg, ${selectedSip.color}, ${selectedSip.color}cc)`,
              color: '#fff', fontWeight: 700, fontSize: 14, cursor: 'pointer',
              fontFamily: "'Plus Jakarta Sans', sans-serif"
            }}>🚀 Start My {selectedSip.label} SIP</button>
          </div>
        )}

        {/* FUNDS TAB */}
        {activeTab === 'funds' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', marginBottom: 4 }}>
              Beginner-friendly mutual funds
            </p>
            {fundOptions.map((fund, i) => (
              <div key={i} style={{
                background: `${fund.color}06`, border: `1px solid ${fund.color}20`,
                borderRadius: 16, padding: '16px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{
                      width: 42, height: 42, borderRadius: 12,
                      background: `${fund.color}15`, border: `1px solid ${fund.color}25`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20
                    }}>{fund.icon}</div>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 700 }}>{fund.name}</div>
                      <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>{fund.type}</div>
                    </div>
                  </div>
                  <div style={{
                    fontSize: 14, fontWeight: 800, color: fund.color,
                    fontFamily: "'Syne', sans-serif"
                  }}>{fund.returns}</div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{
                    fontSize: 11, fontWeight: 600, padding: '3px 10px', borderRadius: 20,
                    background: fund.risk === 'Low' ? 'rgba(16,185,129,0.12)' : fund.risk === 'Medium' ? 'rgba(245,158,11,0.12)' : 'rgba(239,68,68,0.12)',
                    color: fund.risk === 'Low' ? '#34d399' : fund.risk === 'Medium' ? '#fbbf24' : '#f87171',
                  }}>{fund.risk} Risk</div>
                  <button style={{
                    fontSize: 12, fontWeight: 600, padding: '6px 14px', borderRadius: 20,
                    background: `${fund.color}15`, border: `1px solid ${fund.color}30`,
                    color: fund.color, cursor: 'pointer',
                    fontFamily: "'Plus Jakarta Sans', sans-serif"
                  }}>Invest Now →</button>
                </div>
              </div>
            ))}

            <div style={{
              background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: 14, padding: '14px', fontSize: 12,
              color: 'rgba(255,255,255,0.4)', lineHeight: 1.6, textAlign: 'center'
            }}>
              ⚠️ Mutual fund investments are subject to market risks. Start small and invest regularly for best results.
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
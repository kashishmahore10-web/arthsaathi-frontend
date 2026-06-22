'use client';

import Link from 'next/dist/client/link';
import { useState } from 'react';

const schemes = [
  { name: 'PM Mahila Shakti', benefit: '₹1 lakh loan at 4%', icon: '💼', color: '#ec4899', eligible: true },
  { name: 'Sukanya Samriddhi', benefit: '8.2% interest for girl child', icon: '👧', color: '#8b5cf6', eligible: true },
  { name: 'Mahila Udyam Nidhi', benefit: 'Business loan up to ₹10 lakh', icon: '🏭', color: '#f97316', eligible: false },
  { name: 'MUDRA Yojana (Women)', benefit: 'Loan ₹50K–₹10 lakh', icon: '🌸', color: '#ec4899', eligible: true },
  { name: 'PM Matru Vandana', benefit: '₹5,000 maternity benefit', icon: '👶', color: '#06b6d4', eligible: false },
];

const shgMembers = [
  { name: 'Sunita Devi', role: 'Leader', saved: '₹2,400', avatar: 'S' },
  { name: 'Meena Bai', role: 'Member', saved: '₹1,800', avatar: 'M' },
  { name: 'Kamla Rani', role: 'Member', saved: '₹2,100', avatar: 'K' },
  { name: 'Parvati', role: 'Member', saved: '₹1,500', avatar: 'P' },
  { name: 'Rani Solanki', role: 'You', saved: '₹2,000', avatar: 'R' },
];

const tips = [
  { icon: '💡', text: 'Open a bank account in your own name — financial independence starts here.' },
  { icon: '🛡️', text: 'Never share your UPI PIN or OTP with anyone, even family members.' },
  { icon: '💰', text: 'SHG savings can help you get loans at much lower interest rates than moneylenders.' },
  { icon: '📱', text: 'Use UPI for all transactions — it builds your credit history automatically.' },
];

export default function SakhiPage() {
  const [activeTab, setActiveTab] = useState('shg');
  const [safeMode, setSafeMode] = useState(false);

  const totalSaved = shgMembers.reduce((sum, m) => sum + parseInt(m.saved.replace(/[₹,]/g, '')), 0);

  return (
    <div style={{ minHeight: '100vh', background: safeMode ? '#1a0a0f' : '#060912', color: '#fff', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>

      {/* Header */}
      <header style={{
        background: safeMode ? 'rgba(26,10,15,0.9)' : 'rgba(6,9,18,0.9)', backdropFilter: 'blur(20px)',
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
          <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 16 }}>SakhiBot 🌸</div>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)' }}>Women & SHG empowerment</div>
        </div>
        <button onClick={() => setSafeMode(!safeMode)} style={{
          background: safeMode ? 'rgba(236,72,153,0.2)' : 'rgba(255,255,255,0.06)',
          border: `1px solid ${safeMode ? 'rgba(236,72,153,0.4)' : 'rgba(255,255,255,0.1)'}`,
          borderRadius: 20, padding: '5px 10px', color: safeMode ? '#f9a8d4' : 'rgba(255,255,255,0.5)',
          fontSize: 11, fontWeight: 600, cursor: 'pointer',
          fontFamily: "'Plus Jakarta Sans', sans-serif"
        }}>{safeMode ? '🔒 Safe ON' : '🔒 Safe Mode'}</button>
      </header>

      <main style={{ maxWidth: 480, margin: '0 auto', padding: '0 16px 60px' }}>

        {/* Hero */}
        <section style={{
          margin: '20px 0',
          background: 'linear-gradient(135deg, rgba(236,72,153,0.15), rgba(139,92,246,0.08))',
          border: '1px solid rgba(236,72,153,0.2)',
          borderRadius: 24, padding: '22px 20px', textAlign: 'center'
        }}>
          <div style={{ fontSize: 40, marginBottom: 10 }}>🌸</div>
          <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 20, fontWeight: 800, marginBottom: 6 }}>
            Aapka Swagat Hai, Rani!
          </div>
          <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', lineHeight: 1.6 }}>
            Your financial independence journey starts here. SakhiBot is your trusted companion — private, safe, and always on your side.
          </div>
          {safeMode && (
            <div style={{
              marginTop: 12, background: 'rgba(236,72,153,0.1)', border: '1px solid rgba(236,72,153,0.2)',
              borderRadius: 12, padding: '8px 14px', fontSize: 12, color: '#f9a8d4'
            }}>
              🔒 Safe Mode ON — Your data is private. Tap once to erase all.
            </div>
          )}
        </section>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: 6, marginBottom: 16 }}>
          {[
            { id: 'shg', label: '👥 My SHG' },
            { id: 'schemes', label: '🌸 Schemes' },
            { id: 'tips', label: '💡 Tips' },
          ].map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
              flex: 1, padding: '9px', borderRadius: 12, border: 'none', cursor: 'pointer',
              fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600, fontSize: 11,
              background: activeTab === tab.id ? 'rgba(236,72,153,0.15)' : 'rgba(255,255,255,0.04)',
              color: activeTab === tab.id ? '#f9a8d4' : 'rgba(255,255,255,0.4)',
              borderBottom: activeTab === tab.id ? '2px solid #ec4899' : '2px solid transparent',
            }}>{tab.label}</button>
          ))}
        </div>

        {/* SHG TAB */}
        {activeTab === 'shg' && (
          <div>
            {/* Group Summary */}
            <div style={{
              background: 'rgba(236,72,153,0.06)', border: '1px solid rgba(236,72,153,0.15)',
              borderRadius: 20, padding: '16px', marginBottom: 14
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                <div>
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.8px', marginBottom: 4 }}>GROUP TOTAL SAVINGS</div>
                  <div style={{ fontSize: 28, fontWeight: 800, fontFamily: "'Syne', sans-serif", color: '#f9a8d4' }}>
                    ₹{totalSaved.toLocaleString()}
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginBottom: 4 }}>Members</div>
                  <div style={{ fontSize: 24, fontWeight: 800, color: '#ec4899' }}>{shgMembers.length}</div>
                </div>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.08)', borderRadius: 999, height: 6, overflow: 'hidden' }}>
                <div style={{ width: '65%', height: '100%', background: 'linear-gradient(90deg, #ec4899, #8b5cf6)', borderRadius: 999 }} />
              </div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', marginTop: 6 }}>65% of monthly goal reached</div>
            </div>

            {/* Members */}
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', marginBottom: 10, letterSpacing: '0.5px' }}>GROUP MEMBERS</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {shgMembers.map((m, i) => (
                <div key={i} style={{
                  background: m.role === 'You' ? 'rgba(236,72,153,0.08)' : 'rgba(255,255,255,0.03)',
                  border: `1px solid ${m.role === 'You' ? 'rgba(236,72,153,0.2)' : 'rgba(255,255,255,0.07)'}`,
                  borderRadius: 14, padding: '12px 16px',
                  display: 'flex', alignItems: 'center', gap: 12
                }}>
                  <div style={{
                    width: 38, height: 38, borderRadius: '50%', flexShrink: 0,
                    background: m.role === 'You' ? 'linear-gradient(135deg, #ec4899, #8b5cf6)' : 'rgba(255,255,255,0.1)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 14, fontWeight: 700
                  }}>{m.avatar}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 700 }}>{m.name}</div>
                    <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>{m.role}</div>
                  </div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: '#f9a8d4' }}>{m.saved}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SCHEMES TAB */}
        {activeTab === 'schemes' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', marginBottom: 4 }}>Schemes especially for women</p>
            {schemes.map((s, i) => (
              <div key={i} style={{
                background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: 16, padding: '14px 16px',
                display: 'flex', alignItems: 'center', gap: 14
              }}>
                <div style={{
                  width: 44, height: 44, borderRadius: 12, flexShrink: 0,
                  background: `${s.color}15`, border: `1px solid ${s.color}25`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22
                }}>{s.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 3 }}>{s.name}</div>
                  <div style={{ fontSize: 12, color: s.color, fontWeight: 600 }}>{s.benefit}</div>
                </div>
                <div style={{
                  fontSize: 10, fontWeight: 600, padding: '3px 8px', borderRadius: 20,
                  background: s.eligible ? 'rgba(16,185,129,0.12)' : 'rgba(255,255,255,0.06)',
                  color: s.eligible ? '#34d399' : 'rgba(255,255,255,0.3)',
                  border: s.eligible ? '1px solid rgba(16,185,129,0.2)' : '1px solid rgba(255,255,255,0.08)',
                }}>{s.eligible ? 'ELIGIBLE' : 'CHECK'}</div>
              </div>
            ))}
          </div>
        )}

        {/* TIPS TAB */}
        {activeTab === 'tips' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {tips.map((t, i) => (
              <div key={i} style={{
                background: 'rgba(236,72,153,0.06)', border: '1px solid rgba(236,72,153,0.12)',
                borderRadius: 14, padding: '14px 16px',
                display: 'flex', gap: 12, alignItems: 'flex-start'
              }}>
                <div style={{
                  width: 36, height: 36, borderRadius: 10, flexShrink: 0,
                  background: 'rgba(236,72,153,0.12)', border: '1px solid rgba(236,72,153,0.2)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18
                }}>{t.icon}</div>
                <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', lineHeight: 1.6 }}>{t.text}</div>
              </div>
            ))}
            <button onClick={() => window.location.href = '/voice'} style={{
              marginTop: 6, width: '100%', padding: '14px', borderRadius: 16, border: 'none',
              background: 'linear-gradient(135deg, #ec4899, #8b5cf6)',
              color: '#fff', fontWeight: 700, fontSize: 14, cursor: 'pointer',
              fontFamily: "'Plus Jakarta Sans', sans-serif"
            }}>🌸 Talk to SakhiBot in Hindi</button>
          </div>
        )}

      </main>
    </div>
  );
}
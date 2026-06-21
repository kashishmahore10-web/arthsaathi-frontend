'use client';

import { useState } from 'react';

const agents = [
  { id: 'guide', name: 'GuideBot', emoji: '📚', desc: 'Finance in your language', accent: '#6366f1', bg: 'rgba(99,102,241,0.08)', border: 'rgba(99,102,241,0.2)', href: '/voice' },
  { id: 'planner', name: 'PlannerBot', emoji: '📊', desc: 'Budget for irregular income', accent: '#8b5cf6', bg: 'rgba(139,92,246,0.08)', border: 'rgba(139,92,246,0.2)', href: '/planner' },
  { id: 'scam', name: 'GuardBot', emoji: '🛡️', desc: 'Real-time scam detection', accent: '#ef4444', bg: 'rgba(239,68,68,0.08)', border: 'rgba(239,68,68,0.2)', href: '/scam' },
  { id: 'gov', name: 'GovBot', emoji: '🏛️', desc: 'Government schemes for you', accent: '#10b981', bg: 'rgba(16,185,129,0.08)', border: 'rgba(16,185,129,0.2)', href: '/schemes' },
  { id: 'coach', name: 'CoachBot', emoji: '🎯', desc: 'Daily financial nudges', accent: '#f59e0b', bg: 'rgba(245,158,11,0.08)', border: 'rgba(245,158,11,0.2)', href: '/coach' },
  { id: 'sakhi', name: 'SakhiBot', emoji: '🌸', desc: 'Women & SHG empowerment', accent: '#ec4899', bg: 'rgba(236,72,153,0.08)', border: 'rgba(236,72,153,0.2)', href: '/sakhi' },
  { id: 'credit', name: 'CreditPath', emoji: '💳', desc: 'UPI history → credit score', accent: '#06b6d4', bg: 'rgba(6,182,212,0.08)', border: 'rgba(6,182,212,0.2)', href: '/credit' },
  { id: 'wealth', name: 'WealthBot', emoji: '💰', desc: '₹10 savings → first SIP', accent: '#f97316', bg: 'rgba(249,115,22,0.08)', border: 'rgba(249,115,22,0.2)', href: '/wealth' },
];

const stats = [
  { label: 'Scams Blocked', value: '1,284', icon: '🛡️', color: '#ef4444' },
  { label: 'Schemes Found', value: '3,921', icon: '🏛️', color: '#10b981' },
  { label: 'Users Helped', value: '52K+', icon: '👥', color: '#6366f1' },
  { label: 'Money Saved', value: '₹2.4Cr', icon: '💰', color: '#f59e0b' },
];

const quickActions = [
  { icon: '🚨', title: 'Check Suspicious Message', desc: 'Paste any WhatsApp scam link for instant analysis', color: '#ef4444', bg: 'rgba(239,68,68,0.06)', border: 'rgba(239,68,68,0.15)', href: '/scam' },
  { icon: '🏛️', title: 'Find My Schemes', desc: 'PM-KISAN, PMJDY, Kisan Credit Card & 50+ more', color: '#10b981', bg: 'rgba(16,185,129,0.06)', border: 'rgba(16,185,129,0.15)', href: '/schemes' },
  { icon: '📊', title: 'Plan My Budget', desc: 'Smart budgeting for gig & irregular income', color: '#6366f1', bg: 'rgba(99,102,241,0.06)', border: 'rgba(99,102,241,0.15)', href: '/planner' },
];

const navItems = [
  { id: 'home', icon: '⊞', label: 'Home', href: '/' },
  { id: 'agents', icon: '◈', label: 'Agents', href: '/voice' },
  { id: 'health', icon: '◎', label: 'Health', href: '/health' },
  { id: 'community', icon: '⬡', label: 'Community', href: '/community' },
  { id: 'profile', icon: '◉', label: 'Profile', href: '/profile' },
];

export default function Dashboard() {
  const [activeNav, setActiveNav] = useState('home');

  return (
    <div style={{ minHeight: '100vh', background: '#060912', color: '#fff', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>

      {/* Header */}
      <header style={{
        position: 'sticky', top: 0, zIndex: 50,
        background: 'rgba(6,9,18,0.85)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        padding: '14px 20px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 36, height: 36, borderRadius: 10,
            background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 18
          }}>🪙</div>
          <div>
            <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 17, letterSpacing: '-0.3px' }}>ArthSaathi</div>
            <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.5px', marginTop: -2 }}>SAKSHAM AI</div>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <button style={{
            fontSize: 12, fontWeight: 500,
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.1)',
            color: 'rgba(255,255,255,0.7)',
            padding: '6px 12px', borderRadius: 20, cursor: 'pointer',
            fontFamily: "'Plus Jakarta Sans', sans-serif"
          }}>🇮🇳 Hindi</button>
          <div style={{
            width: 34, height: 34, borderRadius: '50%',
            background: 'linear-gradient(135deg, #6366f1, #ec4899)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 13, fontWeight: 700, cursor: 'pointer'
          }}>R</div>
        </div>
      </header>

      <main style={{ maxWidth: 480, margin: '0 auto', padding: '0 16px 100px' }}>

        {/* Hero */}
        <section style={{ padding: '28px 0 20px', textAlign: 'center' }}>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', marginBottom: 6, letterSpacing: '0.3px' }}>Namaste, Rani 👋</p>
          <h1 style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: 30, fontWeight: 800,
            lineHeight: 1.15, letterSpacing: '-0.5px',
            marginBottom: 8
          }}>
            Your Financial<br />
            <span style={{ background: 'linear-gradient(90deg, #6366f1, #8b5cf6, #ec4899)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Companion
            </span>
          </h1>
          <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.2px' }}>Trusted by 52,000+ Indians · 12 languages</p>
        </section>

        {/* Voice Button */}
        <section style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 28 }}>
          <button
            onClick={() => window.location.href = '/voice'}
            style={{
              width: 80, height: 80, borderRadius: '50%', border: 'none', cursor: 'pointer',
              background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 30,
              boxShadow: '0 0 0 12px rgba(99,102,241,0.12), 0 0 0 24px rgba(99,102,241,0.06)',
              transition: 'all 0.3s ease',
              marginBottom: 10
            }}>
            🎤
          </button>
          <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)' }}>Tap to speak in your language</span>
        </section>

        {/* Stats */}
        <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 24 }}>
          {stats.map((s) => (
            <div key={s.label} style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: 16, padding: '14px 16px',
              display: 'flex', alignItems: 'center', gap: 12
            }}>
              <div style={{
                width: 40, height: 40, borderRadius: 12,
                background: `${s.color}18`,
                border: `1px solid ${s.color}30`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 18, flexShrink: 0
              }}>{s.icon}</div>
              <div>
                <div style={{ fontSize: 17, fontWeight: 700, letterSpacing: '-0.3px' }}>{s.value}</div>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginTop: 1 }}>{s.label}</div>
              </div>
            </div>
          ))}
        </section>

        {/* Health Score */}
        <section style={{
          background: 'linear-gradient(135deg, rgba(99,102,241,0.12), rgba(139,92,246,0.08))',
          border: '1px solid rgba(99,102,241,0.2)',
          borderRadius: 20, padding: '18px 20px', marginBottom: 24,
          cursor: 'pointer'
        }} onClick={() => window.location.href = '/health'}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
            <div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.8px', textTransform: 'uppercase', marginBottom: 4 }}>Financial Health Score</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                <span style={{ fontSize: 36, fontWeight: 800, fontFamily: "'Syne', sans-serif", letterSpacing: '-1px' }}>72</span>
                <span style={{ fontSize: 12, color: '#10b981', fontWeight: 600 }}>↑ +5 this week</span>
              </div>
            </div>
            <div style={{
              width: 56, height: 56, borderRadius: '50%',
              border: '3px solid #6366f1',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 16, fontWeight: 800, color: '#6366f1',
              fontFamily: "'Syne', sans-serif"
            }}>72</div>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.08)', borderRadius: 999, height: 6, overflow: 'hidden' }}>
            <div style={{
              width: '72%', height: '100%',
              background: 'linear-gradient(90deg, #6366f1, #8b5cf6)',
              borderRadius: 999
            }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
            <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.25)' }}>Poor</span>
            <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.25)' }}>Excellent</span>
          </div>
        </section>

        {/* AI Agents */}
        <section style={{ marginBottom: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
            <h2 style={{ fontSize: 15, fontWeight: 700, letterSpacing: '-0.2px' }}>AI Agents</h2>
            <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', cursor: 'pointer' }}>See all →</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {agents.map((agent) => (
              <button key={agent.id}
                onClick={() => window.location.href = agent.href}
                style={{
                  background: agent.bg,
                  border: `1px solid ${agent.border}`,
                  borderRadius: 18, padding: '16px 14px',
                  textAlign: 'left', cursor: 'pointer',
                  transition: 'transform 0.15s ease',
                  fontFamily: "'Plus Jakarta Sans', sans-serif"
                }}
                onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.02)')}
                onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
              >
                <div style={{
                  width: 38, height: 38, borderRadius: 10,
                  background: `${agent.accent}20`,
                  border: `1px solid ${agent.accent}30`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 18, marginBottom: 10
                }}>{agent.emoji}</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#fff', marginBottom: 3, letterSpacing: '-0.1px' }}>{agent.name}</div>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', lineHeight: 1.4 }}>{agent.desc}</div>
                <div style={{ marginTop: 10, fontSize: 10, color: agent.accent, fontWeight: 600, letterSpacing: '0.3px' }}>OPEN →</div>
              </button>
            ))}
          </div>
        </section>

        {/* Quick Actions */}
        <section style={{ marginBottom: 24 }}>
          <h2 style={{ fontSize: 15, fontWeight: 700, letterSpacing: '-0.2px', marginBottom: 14 }}>Quick Actions</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {quickActions.map((action) => (
              <button key={action.title}
                onClick={() => window.location.href = action.href}
                style={{
                  background: action.bg,
                  border: `1px solid ${action.border}`,
                  borderRadius: 18, padding: '16px 18px',
                  display: 'flex', alignItems: 'center', gap: 14,
                  cursor: 'pointer', textAlign: 'left', width: '100%',
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  transition: 'transform 0.15s ease'
                }}
                onMouseEnter={e => (e.currentTarget.style.transform = 'translateX(4px)')}
                onMouseLeave={e => (e.currentTarget.style.transform = 'translateX(0)')}
              >
                <div style={{
                  width: 46, height: 46, borderRadius: 14, flexShrink: 0,
                  background: `${action.color}15`,
                  border: `1px solid ${action.color}25`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 22
                }}>{action.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: '#fff', marginBottom: 3, letterSpacing: '-0.1px' }}>{action.title}</div>
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', lineHeight: 1.4 }}>{action.desc}</div>
                </div>
                <div style={{ fontSize: 16, color: action.color, flexShrink: 0 }}>›</div>
              </button>
            ))}
          </div>
        </section>

        {/* Offline Banner */}
        <section style={{
          background: 'rgba(16,185,129,0.06)',
          border: '1px solid rgba(16,185,129,0.15)',
          borderRadius: 16, padding: '14px 16px',
          display: 'flex', alignItems: 'center', gap: 12
        }}>
          <div style={{
            width: 36, height: 36, borderRadius: 10,
            background: 'rgba(16,185,129,0.12)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 18, flexShrink: 0
          }}>📡</div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#10b981', marginBottom: 2 }}>Works Offline Too</div>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', lineHeight: 1.4 }}>Available via USSD/SMS even without internet</div>
          </div>
        </section>

      </main>

      {/* Bottom Nav */}
      <nav style={{
        position: 'fixed', bottom: 0, left: 0, right: 0,
        background: 'rgba(6,9,18,0.95)',
        backdropFilter: 'blur(20px)',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        display: 'flex', justifyContent: 'space-around',
        padding: '10px 0 16px'
      }}>
        {navItems.map((item) => (
          <button key={item.id}
            onClick={() => { setActiveNav(item.id); window.location.href = item.href; }}
            style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
              background: 'none', border: 'none', cursor: 'pointer',
              color: activeNav === item.id ? '#6366f1' : 'rgba(255,255,255,0.3)',
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              transition: 'color 0.2s ease', padding: '0 12px'
            }}>
            <span style={{ fontSize: 20 }}>{item.icon}</span>
            <span style={{ fontSize: 10, fontWeight: activeNav === item.id ? 600 : 400 }}>{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}
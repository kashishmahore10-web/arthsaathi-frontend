'use client';

import Link from 'next/dist/client/link';
import { useState } from 'react';

const transactions = [
  { type: 'UPI Send', amount: '₹500', to: 'Ramesh Kumar', date: '20 Jun', icon: '📤', color: '#ef4444' },
  { type: 'UPI Receive', amount: '₹2,000', to: 'Daily Wage', date: '19 Jun', icon: '📥', color: '#10b981' },
  { type: 'SHG Repayment', amount: '₹300', to: 'Group Fund', date: '18 Jun', icon: '👥', color: '#6366f1' },
  { type: 'UPI Send', amount: '₹150', to: 'Kirana Shop', date: '17 Jun', icon: '📤', color: '#ef4444' },
  { type: 'UPI Receive', amount: '₹1,500', to: 'Farm Income', date: '15 Jun', icon: '📥', color: '#10b981' },
  { type: 'SHG Repayment', amount: '₹300', to: 'Group Fund', date: '10 Jun', icon: '👥', color: '#6366f1' },
];

const creditFactors = [
  { label: 'UPI Consistency', score: 82, icon: '📱', color: '#6366f1', desc: 'Regular UPI usage' },
  { label: 'SHG Repayments', score: 95, icon: '👥', color: '#10b981', desc: 'On-time group payments' },
  { label: 'Income Regularity', score: 68, icon: '💰', color: '#f59e0b', desc: 'Moderate consistency' },
  { label: 'Savings Habit', score: 74, icon: '🏦', color: '#8b5cf6', desc: 'Good saving pattern' },
];

const loanOffers = [
  { bank: 'SBI', amount: '₹25,000', rate: '10.5%', term: '12 months', icon: '🏦', color: '#10b981', eligible: true },
  { bank: 'Bank of Baroda', amount: '₹15,000', rate: '11%', term: '6 months', icon: '🏛️', color: '#6366f1', eligible: true },
  { bank: 'Microfinance MFI', amount: '₹50,000', rate: '18%', term: '24 months', icon: '💼', color: '#f59e0b', eligible: false },
];

export default function CreditPage() {
  const [activeTab, setActiveTab] = useState('score');

  const creditScore = 72;

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
          <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 16 }}>CreditPath 💳</div>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)' }}>UPI history → Credit identity</div>
        </div>
        <div style={{
          background: 'rgba(6,182,212,0.12)', border: '1px solid rgba(6,182,212,0.25)',
          borderRadius: 20, padding: '5px 10px', fontSize: 11, color: '#67e8f9', fontWeight: 600
        }}>AA Linked</div>
      </header>

      <main style={{ maxWidth: 480, margin: '0 auto', padding: '0 16px 60px' }}>

        {/* Credit Score Hero */}
        <section style={{
          margin: '20px 0',
          background: 'linear-gradient(135deg, rgba(6,182,212,0.12), rgba(99,102,241,0.08))',
          border: '1px solid rgba(6,182,212,0.2)',
          borderRadius: 24, padding: '24px 20px', textAlign: 'center'
        }}>
          <div style={{ position: 'relative', display: 'inline-block', marginBottom: 16 }}>
            <svg width="130" height="130" viewBox="0 0 130 130">
              <circle cx="65" cy="65" r="55" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="10" />
              <circle cx="65" cy="65" r="55" fill="none"
                stroke="url(#creditGrad)" strokeWidth="10"
                strokeLinecap="round"
                strokeDasharray={`${(creditScore / 100) * 345} 345`}
                strokeDashoffset="86"
                transform="rotate(-90 65 65)"
              />
              <defs>
                <linearGradient id="creditGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#06b6d4" />
                  <stop offset="100%" stopColor="#6366f1" />
                </linearGradient>
              </defs>
            </svg>
            <div style={{
              position: 'absolute', inset: 0,
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'
            }}>
              <div style={{ fontSize: 32, fontWeight: 800, fontFamily: "'Syne', sans-serif" }}>{creditScore}</div>
              <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)' }}>Credit Score</div>
            </div>
          </div>

          <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 4 }}>Building Credit Identity 📈</div>
          <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', marginBottom: 16 }}>
            Based on your UPI history & SHG repayments
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: 20 }}>
            {[
              { label: 'UPI Txns', value: '47', color: '#06b6d4' },
              { label: 'SHG Payments', value: '12', color: '#6366f1' },
              { label: 'On-time', value: '94%', color: '#10b981' },
            ].map((item, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 18, fontWeight: 800, color: item.color }}>{item.value}</div>
                <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)' }}>{item.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: 6, marginBottom: 16 }}>
          {[
            { id: 'score', label: '📊 Score' },
            { id: 'history', label: '📋 History' },
            { id: 'loans', label: '🏦 Loans' },
          ].map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
              flex: 1, padding: '9px', borderRadius: 12, border: 'none', cursor: 'pointer',
              fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600, fontSize: 12,
              background: activeTab === tab.id ? 'rgba(6,182,212,0.15)' : 'rgba(255,255,255,0.04)',
              color: activeTab === tab.id ? '#67e8f9' : 'rgba(255,255,255,0.4)',
              borderBottom: activeTab === tab.id ? '2px solid #06b6d4' : '2px solid transparent',
            }}>{tab.label}</button>
          ))}
        </div>

        {/* SCORE TAB */}
        {activeTab === 'score' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {creditFactors.map((f, i) => (
              <div key={i} style={{
                background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: 16, padding: '14px 16px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{
                      width: 36, height: 36, borderRadius: 10,
                      background: `${f.color}15`, border: `1px solid ${f.color}25`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18
                    }}>{f.icon}</div>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 700 }}>{f.label}</div>
                      <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>{f.desc}</div>
                    </div>
                  </div>
                  <div style={{ fontSize: 18, fontWeight: 800, color: f.color }}>{f.score}</div>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.08)', borderRadius: 999, height: 5, overflow: 'hidden' }}>
                  <div style={{
                    width: `${f.score}%`, height: '100%',
                    background: `linear-gradient(90deg, ${f.color}, ${f.color}99)`,
                    borderRadius: 999
                  }} />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* HISTORY TAB */}
        {activeTab === 'history' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', marginBottom: 4 }}>
              Recent transactions building your credit
            </p>
            {transactions.map((t, i) => (
              <div key={i} style={{
                background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: 14, padding: '12px 14px',
                display: 'flex', alignItems: 'center', gap: 12
              }}>
                <div style={{
                  width: 38, height: 38, borderRadius: 10, flexShrink: 0,
                  background: `${t.color}15`, border: `1px solid ${t.color}25`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18
                }}>{t.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>{t.to}</div>
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)' }}>{t.type} · {t.date}</div>
                </div>
                <div style={{ fontSize: 14, fontWeight: 700, color: t.color }}>{t.amount}</div>
              </div>
            ))}
          </div>
        )}

        {/* LOANS TAB */}
        {activeTab === 'loans' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', marginBottom: 4 }}>
              Loan offers based on your credit score
            </p>
            {loanOffers.map((loan, i) => (
              <div key={i} style={{
                background: loan.eligible ? `${loan.color}06` : 'rgba(255,255,255,0.02)',
                border: `1px solid ${loan.eligible ? loan.color + '20' : 'rgba(255,255,255,0.06)'}`,
                borderRadius: 16, padding: '16px', opacity: loan.eligible ? 1 : 0.6
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{
                      width: 40, height: 40, borderRadius: 12,
                      background: `${loan.color}15`, border: `1px solid ${loan.color}25`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20
                    }}>{loan.icon}</div>
                    <div style={{ fontSize: 15, fontWeight: 700 }}>{loan.bank}</div>
                  </div>
                  <div style={{
                    fontSize: 10, fontWeight: 600, padding: '3px 8px', borderRadius: 20,
                    background: loan.eligible ? 'rgba(16,185,129,0.12)' : 'rgba(255,255,255,0.06)',
                    color: loan.eligible ? '#34d399' : 'rgba(255,255,255,0.3)',
                    border: loan.eligible ? '1px solid rgba(16,185,129,0.2)' : '1px solid rgba(255,255,255,0.08)',
                  }}>{loan.eligible ? 'ELIGIBLE' : 'IMPROVE SCORE'}</div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
                  {[
                    { label: 'Amount', value: loan.amount },
                    { label: 'Rate', value: loan.rate },
                    { label: 'Term', value: loan.term },
                  ].map((item, j) => (
                    <div key={j} style={{ textAlign: 'center', background: 'rgba(255,255,255,0.04)', borderRadius: 10, padding: '8px' }}>
                      <div style={{ fontSize: 13, fontWeight: 700, color: loan.color }}>{item.value}</div>
                      <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)', marginTop: 2 }}>{item.label}</div>
                    </div>
                  ))}
                </div>
                {loan.eligible && (
                  <button style={{
                    marginTop: 12, width: '100%', padding: '10px', borderRadius: 12,
                    background: `${loan.color}20`, color: loan.color,
                    fontWeight: 700, fontSize: 13, cursor: 'pointer',
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    border: `1px solid ${loan.color}30` 
                  }}>Apply via CreditPath →</button>
                )}
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
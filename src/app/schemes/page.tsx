'use client';
import { useState, useEffect } from 'react';
import { askGovBot } from '@/lib/api';
import Link from 'next/dist/client/link';
const schemes = [
  {
    id: 1,
    name: 'PM-KISAN',
    fullName: 'Pradhan Mantri Kisan Samman Nidhi',
    icon: '🌾',
    color: '#10b981',
    benefit: '₹6,000/year',
    category: 'Agriculture',
    eligible: true,
    desc: 'Direct income support of ₹6,000 per year to small and marginal farmer families.',
    steps: ['Aadhaar card', 'Land records', 'Bank account linked', 'Apply at PM-KISAN portal'],
  },
  {
    id: 2,
    name: 'PMJDY',
    fullName: 'Pradhan Mantri Jan Dhan Yojana',
    icon: '🏦',
    color: '#6366f1',
    benefit: 'Zero balance account',
    category: 'Banking',
    eligible: true,
    desc: 'Free bank account with RuPay debit card, ₹2 lakh accident insurance & ₹30,000 life cover.',
    steps: ['Visit nearest bank', 'Fill account opening form', 'Submit Aadhaar & photo', 'Get RuPay card'],
  },
  {
    id: 3,
    name: 'Kisan Credit Card',
    fullName: 'Kisan Credit Card Scheme',
    icon: '💳',
    color: '#f59e0b',
    benefit: 'Credit up to ₹3 lakh',
    category: 'Agriculture',
    eligible: true,
    desc: 'Short-term credit for farmers at subsidised interest rates for agricultural needs.',
    steps: ['Visit bank with land papers', 'Fill KCC application', 'Submit crop details', 'Get credit card'],
  },
  {
    id: 4,
    name: 'PMSBY',
    fullName: 'Pradhan Mantri Suraksha Bima Yojana',
    icon: '🛡️',
    color: '#ef4444',
    benefit: '₹2 lakh accident cover',
    category: 'Insurance',
    eligible: true,
    desc: 'Accidental death and disability cover of ₹2 lakh at just ₹20/year premium.',
    steps: ['Have a bank account', 'Visit bank or net banking', 'Fill PMSBY form', 'Pay ₹20 premium'],
  },
  {
    id: 5,
    name: 'PMJJBY',
    fullName: 'Pradhan Mantri Jeevan Jyoti Bima Yojana',
    icon: '❤️',
    color: '#ec4899',
    benefit: '₹2 lakh life cover',
    category: 'Insurance',
    eligible: false,
    desc: 'Life insurance cover of ₹2 lakh at ₹436/year for ages 18-50.',
    steps: ['Age must be 18-50', 'Have savings bank account', 'Submit consent form', 'Auto-debit ₹436/year'],
  },
  {
    id: 6,
    name: 'APY',
    fullName: 'Atal Pension Yojana',
    icon: '👴',
    color: '#8b5cf6',
    benefit: '₹1,000–5,000/month pension',
    category: 'Pension',
    eligible: true,
    desc: 'Guaranteed pension of ₹1,000 to ₹5,000/month after age 60 for unorganised sector workers.',
    steps: ['Age 18-40 years', 'Have savings bank account', 'Visit bank', 'Choose pension amount'],
  },
  {
    id: 7,
    name: 'PMAY',
    fullName: 'Pradhan Mantri Awas Yojana',
    icon: '🏠',
    color: '#f97316',
    benefit: 'Subsidy up to ₹2.67 lakh',
    category: 'Housing',
    eligible: false,
    desc: 'Housing for All — interest subsidy on home loans for economically weaker sections.',
    steps: ['EWS/LIG income group', 'No pucca house in family', 'Apply at CSC or bank', 'Submit income proof'],
  },
  {
    id: 8,
    name: 'EPF',
    fullName: 'Employees Provident Fund',
    icon: '💼',
    color: '#06b6d4',
    benefit: 'Retirement savings',
    category: 'Savings',
    eligible: false,
    desc: 'Mandatory savings scheme for salaried employees with employer contribution matching.',
    steps: ['Be a salaried employee', 'Employer registers with EPFO', 'UAN generated automatically', 'Contribute monthly'],
  },
];

const categories = ['All', 'Agriculture', 'Banking', 'Insurance', 'Pension', 'Housing', 'Savings'];
  


export default function SchemesPage() {
  const [govBotAnswer, setGovBotAnswer] = useState("");
  const [loadingGov, setLoadingGov] = useState(false); 
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [selectedScheme, setSelectedScheme] = useState<typeof schemes[0] | null>(null);
  const [activeTab, setActiveTab] = useState<'all' | 'eligible'>('eligible');
 
  useEffect(() => {
  const fetchGovSchemes = async () => {
    setLoadingGov(true);
    try {
      const res = await askGovBot('Which government schemes am I eligible for?');
      setGovBotAnswer(res.data.answer);
    } catch (err) {
      console.error('GovBot error:', err);
    } finally {
      setLoadingGov(false);
    }
  };
  fetchGovSchemes();
}, []);
  

  const filtered = schemes.filter(s => {
    const matchCat = activeCategory === 'All' || s.category === activeCategory;
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.fullName.toLowerCase().includes(search.toLowerCase());
    const matchTab = activeTab === 'all' || s.eligible;
    return matchCat && matchSearch && matchTab;
  });

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
          <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 16 }}>Government Schemes</div>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)' }}>GovBot · 8 schemes available</div>
        </div>
        <div style={{
          background: 'rgba(16,185,129,0.12)', border: '1px solid rgba(16,185,129,0.25)',
          borderRadius: 20, padding: '5px 10px', fontSize: 11, color: '#34d399', fontWeight: 600
        }}>5 Eligible</div>
      </header>

      <main style={{ maxWidth: 480, margin: '0 auto', padding: '0 16px 40px' }}>

        {/* Search */}
        <div style={{ padding: '16px 0 12px' }}>
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search schemes..."
            style={{
              width: '100%', background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 14, padding: '12px 14px',
              color: '#fff', fontSize: 14, outline: 'none',
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              boxSizing: 'border-box'
            }}
          />
        </div>

        {/* Eligible / All Toggle */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
          {(['eligible', 'all'] as const).map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} style={{
              flex: 1, padding: '10px', borderRadius: 12, border: 'none', cursor: 'pointer',
              fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600, fontSize: 13,
              background: activeTab === tab ? 'rgba(16,185,129,0.15)' : 'rgba(255,255,255,0.04)',
              color: activeTab === tab ? '#34d399' : 'rgba(255,255,255,0.4)',
              borderBottom: activeTab === tab ? '2px solid #10b981' : '2px solid transparent',
            }}>
              {tab === 'eligible' ? '✅ Eligible for Me' : '📋 All Schemes'}
            </button>
          ))}
        </div>

        {/* Category Pills */}
        <div style={{ display: 'flex', gap: 8, overflowX: 'auto', marginBottom: 16, paddingBottom: 4 }}>
          {categories.map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)} style={{
              flexShrink: 0, padding: '6px 14px', borderRadius: 20, cursor: 'pointer',
              fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600, fontSize: 12,
              background: activeCategory === cat ? 'rgba(99,102,241,0.2)' : 'rgba(255,255,255,0.05)',
              color: activeCategory === cat ? '#a5b4fc' : 'rgba(255,255,255,0.4)',
              border: activeCategory === cat ? '1px solid rgba(99,102,241,0.4)' : '1px solid rgba(255,255,255,0.08)',
            }}>{cat}</button>
          ))}
        </div>

        {/* Schemes List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {filtered.length === 0 && (
            <div style={{ textAlign: 'center', padding: '40px 0', color: 'rgba(255,255,255,0.3)', fontSize: 14 }}>
              No schemes found. Try a different filter.
            </div>
          )}
          {filtered.map(scheme => (
            <button key={scheme.id}
              onClick={() => setSelectedScheme(scheme)}
              style={{
                background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: 18, padding: '16px', textAlign: 'left', cursor: 'pointer', width: '100%',
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                transition: 'border-color 0.2s'
              }}
              onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'}
              onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
                <div style={{
                  width: 46, height: 46, borderRadius: 14, flexShrink: 0,
                  background: `${scheme.color}15`, border: `1px solid ${scheme.color}25`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22
                }}>{scheme.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 }}>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 700, color: '#fff' }}>{scheme.name}</div>
                      <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', marginTop: 1 }}>{scheme.fullName}</div>
                    </div>
                    <div style={{
                      fontSize: 10, fontWeight: 600, padding: '3px 8px', borderRadius: 20, flexShrink: 0, marginLeft: 8,
                      background: scheme.eligible ? 'rgba(16,185,129,0.12)' : 'rgba(255,255,255,0.06)',
                      color: scheme.eligible ? '#34d399' : 'rgba(255,255,255,0.3)',
                      border: scheme.eligible ? '1px solid rgba(16,185,129,0.2)' : '1px solid rgba(255,255,255,0.08)',
                    }}>{scheme.eligible ? 'ELIGIBLE' : 'CHECK'}</div>
                  </div>
                  <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', lineHeight: 1.4, marginBottom: 10 }}>{scheme.desc}</div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{
                      fontSize: 13, fontWeight: 700, color: scheme.color,
                      background: `${scheme.color}10`, border: `1px solid ${scheme.color}20`,
                      borderRadius: 8, padding: '3px 10px'
                    }}>{scheme.benefit}</div>
                    <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)' }}>{scheme.category} →</div>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </main>

      {/* Scheme Detail Modal */}
      {selectedScheme && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 100,
          background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)',
          display: 'flex', alignItems: 'flex-end'
        }} onClick={() => setSelectedScheme(null)}>
          <div style={{
            width: '100%', maxWidth: 480, margin: '0 auto',
            background: '#0f1629', borderRadius: '24px 24px 0 0',
            border: '1px solid rgba(255,255,255,0.08)',
            padding: '20px 20px 40px'
          }} onClick={e => e.stopPropagation()}>

            {/* Handle */}
            <div style={{ width: 36, height: 4, background: 'rgba(255,255,255,0.15)', borderRadius: 99, margin: '0 auto 20px' }} />

            {/* Scheme Header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
              <div style={{
                width: 54, height: 54, borderRadius: 16,
                background: `${selectedScheme.color}15`, border: `1px solid ${selectedScheme.color}30`,
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26
              }}>{selectedScheme.icon}</div>
              <div>
                <div style={{ fontSize: 18, fontWeight: 800, fontFamily: "'Syne', sans-serif" }}>{selectedScheme.name}</div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>{selectedScheme.fullName}</div>
              </div>
            </div>

            {/* Benefit */}
            <div style={{
              background: `${selectedScheme.color}10`, border: `1px solid ${selectedScheme.color}20`,
              borderRadius: 14, padding: '12px 16px', marginBottom: 16,
              display: 'flex', justifyContent: 'space-between', alignItems: 'center'
            }}>
              <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>Benefit</span>
              <span style={{ fontSize: 15, fontWeight: 700, color: selectedScheme.color }}>{selectedScheme.benefit}</span>
            </div>

            {/* Description */}
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', lineHeight: 1.6, marginBottom: 16 }}>{selectedScheme.desc}</p>

            {/* Steps */}
            <div style={{ marginBottom: 20 }}>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.8px', marginBottom: 10 }}>HOW TO APPLY</div>
              {selectedScheme.steps.map((step, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
                  <div style={{
                    width: 24, height: 24, borderRadius: '50%', flexShrink: 0,
                    background: `${selectedScheme.color}20`, border: `1px solid ${selectedScheme.color}30`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 11, fontWeight: 700, color: selectedScheme.color
                  }}>{i + 1}</div>
                  <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)' }}>{step}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <button style={{
              width: '100%', padding: '14px', borderRadius: 16, border: 'none',
              background: `linear-gradient(135deg, ${selectedScheme.color}, ${selectedScheme.color}cc)`,
              color: '#fff', fontWeight: 700, fontSize: 14, cursor: 'pointer',
              fontFamily: "'Plus Jakarta Sans', sans-serif"
            }}>
              Apply Now via GovBot 🏛️
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
'use client';

import Link from 'next/dist/client/link';
import { useState } from 'react';

type Expense = {
  id: number;
  category: string;
  icon: string;
  color: string;
  amount: number;
  note: string;
};

const CATEGORIES = [
  { id: 'food', label: 'Food', icon: '🍱', color: '#f59e0b' },
  { id: 'rent', label: 'Rent', icon: '🏠', color: '#6366f1' },
  { id: 'transport', label: 'Transport', icon: '🚌', color: '#06b6d4' },
  { id: 'health', label: 'Health', icon: '💊', color: '#ef4444' },
  { id: 'education', label: 'Education', icon: '📚', color: '#8b5cf6' },
  { id: 'savings', label: 'Savings', icon: '💰', color: '#10b981' },
  { id: 'other', label: 'Other', icon: '📦', color: '#f97316' },
];

const TIPS = [
  { icon: '💡', text: 'Try the 50/30/20 rule: 50% needs, 30% wants, 20% savings.' },
  { icon: '💰', text: 'Save first, spend later. Set aside savings on day 1 of income.' },
  { icon: '📱', text: 'Track every small expense — even ₹10 chai adds up to ₹300/month.' },
  { icon: '🏦', text: 'Keep 3 months of expenses as emergency fund before investing.' },
  { icon: '🍱', text: 'Cooking at home instead of eating out can save up to 40% on food.' },
];

export default function PlannerPage() {
  const [income, setIncome] = useState('');
  const [incomeSet, setIncomeSet] = useState(false);
  const [expenses, setExpenses] = useState<Expense[]>([
    { id: 1, category: 'food', icon: '🍱', color: '#f59e0b', amount: 3000, note: 'Monthly groceries' },
    { id: 2, category: 'rent', icon: '🏠', color: '#6366f1', amount: 4000, note: 'House rent' },
    { id: 3, category: 'transport', icon: '🚌', color: '#06b6d4', amount: 1000, note: 'Auto and bus' },
  ]);
  const [newCat, setNewCat] = useState('food');
  const [newAmount, setNewAmount] = useState('');
  const [newNote, setNewNote] = useState('');
  const [activeTab, setActiveTab] = useState('budget');
  const [showAdd, setShowAdd] = useState(false);

  const incomeNum = parseFloat(income) || 0;
  const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);
  const remaining = incomeNum - totalExpenses;
  const savingsPercent = incomeNum > 0 ? Math.round((remaining / incomeNum) * 100) : 0;
  const spentPercent = incomeNum > 0 ? Math.min(100, Math.round((totalExpenses / incomeNum) * 100)) : 0;

  const statusColor = !incomeNum ? '#6366f1' : totalExpenses > incomeNum ? '#ef4444' : totalExpenses / incomeNum > 0.8 ? '#f59e0b' : '#10b981';
  const statusLabel = !incomeNum ? 'Set your income first' : totalExpenses > incomeNum ? 'Over budget! Cut expenses' : totalExpenses / incomeNum > 0.8 ? 'Tight budget — be careful' : 'Good budget balance!';

  const getCat = (id: string) => CATEGORIES.find(c => c.id === id) || CATEGORIES[6];

  const addExpense = () => {
    if (!newAmount) return;
    const cat = getCat(newCat);
    setExpenses(prev => [...prev, {
      id: Date.now(),
      category: newCat,
      icon: cat.icon,
      color: cat.color,
      amount: parseFloat(newAmount),
      note: newNote || cat.label,
    }]);
    setNewAmount('');
    setNewNote('');
    setShowAdd(false);
  };

  const removeExpense = (id: number) => {
    setExpenses(prev => prev.filter(e => e.id !== id));
  };

  const categoryTotals = CATEGORIES.map(cat => ({
    ...cat,
    total: expenses.filter(e => e.category === cat.id).reduce((s, e) => s + e.amount, 0),
  })).filter(c => c.total > 0);

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
          <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 16 }}>Budget Planner</div>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)' }}>PlannerBot · Flexible income planning</div>
        </div>
        <button onClick={() => setShowAdd(true)} style={{
          background: 'rgba(99,102,241,0.15)', border: '1px solid rgba(99,102,241,0.3)',
          borderRadius: 20, padding: '6px 14px', color: '#a5b4fc',
          fontSize: 12, fontWeight: 600, cursor: 'pointer',
          fontFamily: "'Plus Jakarta Sans', sans-serif"
        }}>+ Add</button>
      </header>

      <main style={{ maxWidth: 480, margin: '0 auto', padding: '0 16px 60px' }}>

        {/* Income Setup */}
        {!incomeSet && (
          <section style={{
            margin: '20px 0',
            background: 'linear-gradient(135deg, rgba(99,102,241,0.12), rgba(139,92,246,0.08))',
            border: '1px solid rgba(99,102,241,0.2)',
            borderRadius: 24, padding: '24px 20px', textAlign: 'center'
          }}>
            <div style={{ fontSize: 36, marginBottom: 12 }}>📊</div>
            <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 18, fontWeight: 800, marginBottom: 6 }}>
              What is your income this month?
            </div>
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', marginBottom: 20 }}>
              Daily wage, gig work, farming — any amount works
            </div>
            <div style={{ display: 'flex', gap: 10, marginBottom: 12 }}>
              <input
                value={income}
                onChange={e => setIncome(e.target.value)}
                placeholder="Enter amount in ₹"
                type="number"
                style={{
                  flex: 1, background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  borderRadius: 14, padding: '12px 14px',
                  color: '#fff', fontSize: 16, outline: 'none',
                  fontFamily: "'Plus Jakarta Sans', sans-serif"
                }}
              />
              <button onClick={() => { if (income) setIncomeSet(true); }} style={{
                background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                border: 'none', borderRadius: 14, padding: '12px 20px',
                color: '#fff', fontWeight: 700, fontSize: 14,
                cursor: 'pointer', fontFamily: "'Plus Jakarta Sans', sans-serif"
              }}>Set</button>
            </div>
            <div style={{ display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap' }}>
              {['5000', '10000', '15000', '20000'].map(amt => (
                <button key={amt} onClick={() => { setIncome(amt); setIncomeSet(true); }} style={{
                  background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: 20, padding: '6px 14px', color: 'rgba(255,255,255,0.6)',
                  fontSize: 12, cursor: 'pointer', fontFamily: "'Plus Jakarta Sans', sans-serif"
                }}>₹{Number(amt).toLocaleString()}</button>
              ))}
            </div>
          </section>
        )}

        {/* Budget Dashboard */}
        {incomeSet && (
          <div>
            {/* Summary Card */}
            <section style={{
              margin: '20px 0',
              background: `linear-gradient(135deg, ${statusColor}15, ${statusColor}08)`,
              border: `1px solid ${statusColor}30`,
              borderRadius: 24, padding: '20px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <div>
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.8px', marginBottom: 4 }}>MONTHLY INCOME</div>
                  <div style={{ fontSize: 30, fontWeight: 800, fontFamily: "'Syne', sans-serif" }}>₹{incomeNum.toLocaleString()}</div>
                </div>
                <button onClick={() => setIncomeSet(false)} style={{
                  background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: 10, padding: '6px 12px', color: 'rgba(255,255,255,0.5)',
                  fontSize: 11, cursor: 'pointer', fontFamily: "'Plus Jakarta Sans', sans-serif"
                }}>Edit</button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, marginBottom: 16 }}>
                {[
                  { label: 'Spent', value: `₹${totalExpenses.toLocaleString()}`, color: '#ef4444' },
                  { label: 'Remaining', value: `₹${Math.abs(remaining).toLocaleString()}`, color: remaining >= 0 ? '#10b981' : '#ef4444' },
                  { label: 'Savings', value: `${savingsPercent}%`, color: savingsPercent >= 20 ? '#10b981' : '#f59e0b' },
                ].map((item, i) => (
                  <div key={i} style={{
                    background: 'rgba(255,255,255,0.05)', borderRadius: 12, padding: '10px', textAlign: 'center'
                  }}>
                    <div style={{ fontSize: 15, fontWeight: 800, color: item.color }}>{item.value}</div>
                    <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)', marginTop: 2 }}>{item.label}</div>
                  </div>
                ))}
              </div>

              <div style={{ background: 'rgba(255,255,255,0.08)', borderRadius: 999, height: 8, overflow: 'hidden', marginBottom: 8 }}>
                <div style={{
                  width: `${spentPercent}%`, height: '100%',
                  background: `linear-gradient(90deg, ${statusColor}, ${statusColor}99)`,
                  borderRadius: 999, transition: 'width 0.5s ease'
                }} />
              </div>
              <div style={{ fontSize: 12, color: statusColor, fontWeight: 600 }}>{statusLabel}</div>
            </section>

            {/* Tabs */}
            <div style={{ display: 'flex', gap: 6, marginBottom: 16 }}>
              {[
                { id: 'budget', label: '📊 Budget' },
                { id: 'expenses', label: '📋 Expenses' },
                { id: 'tips', label: '💡 Tips' },
              ].map(tab => (
                <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
                  flex: 1, padding: '9px', borderRadius: 12, border: 'none', cursor: 'pointer',
                  fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600, fontSize: 12,
                  background: activeTab === tab.id ? 'rgba(99,102,241,0.15)' : 'rgba(255,255,255,0.04)',
                  color: activeTab === tab.id ? '#a5b4fc' : 'rgba(255,255,255,0.4)',
                  borderBottom: activeTab === tab.id ? '2px solid #6366f1' : '2px solid transparent',
                }}>{tab.label}</button>
              ))}
            </div>

            {/* Budget Tab */}
            {activeTab === 'budget' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {categoryTotals.length === 0 && (
                  <div style={{ textAlign: 'center', padding: '40px 0', color: 'rgba(255,255,255,0.3)', fontSize: 14 }}>
                    No expenses yet. Tap + Add to start.
                  </div>
                )}
                {categoryTotals.map(cat => (
                  <div key={cat.id} style={{
                    background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)',
                    borderRadius: 16, padding: '14px 16px'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <div style={{
                          width: 36, height: 36, borderRadius: 10,
                          background: `${cat.color}15`, border: `1px solid ${cat.color}25`,
                          display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18
                        }}>{cat.icon}</div>
                        <div style={{ fontSize: 14, fontWeight: 600 }}>{cat.label}</div>
                      </div>
                      <div style={{ fontSize: 15, fontWeight: 700, color: cat.color }}>₹{cat.total.toLocaleString()}</div>
                    </div>
                    <div style={{ background: 'rgba(255,255,255,0.08)', borderRadius: 999, height: 5, overflow: 'hidden' }}>
                      <div style={{
                        width: `${incomeNum > 0 ? Math.min(100, (cat.total / incomeNum) * 100) : 0}%`,
                        height: '100%', background: cat.color, borderRadius: 999
                      }} />
                    </div>
                    <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', marginTop: 4 }}>
                      {incomeNum > 0 ? Math.round((cat.total / incomeNum) * 100) : 0}% of income
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Expenses Tab */}
            {activeTab === 'expenses' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {expenses.length === 0 && (
                  <div style={{ textAlign: 'center', padding: '40px 0', color: 'rgba(255,255,255,0.3)', fontSize: 14 }}>
                    No expenses added yet.
                  </div>
                )}
                {expenses.map(exp => (
                  <div key={exp.id} style={{
                    background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)',
                    borderRadius: 14, padding: '12px 14px',
                    display: 'flex', alignItems: 'center', gap: 12
                  }}>
                    <div style={{
                      width: 38, height: 38, borderRadius: 10, flexShrink: 0,
                      background: `${exp.color}15`, border: `1px solid ${exp.color}25`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18
                    }}>{exp.icon}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 13, fontWeight: 600 }}>{exp.note}</div>
                      <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)' }}>{getCat(exp.category).label}</div>
                    </div>
                    <div style={{ fontSize: 15, fontWeight: 700, color: exp.color }}>₹{exp.amount.toLocaleString()}</div>
                    <button onClick={() => removeExpense(exp.id)} style={{
                      background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)',
                      borderRadius: 8, width: 28, height: 28, cursor: 'pointer',
                      color: '#f87171', fontSize: 16, display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontFamily: "'Plus Jakarta Sans', sans-serif"
                    }}>×</button>
                  </div>
                ))}
              </div>
            )}

            {/* Tips Tab */}
            {activeTab === 'tips' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {TIPS.map((t, i) => (
                  <div key={i} style={{
                    background: 'rgba(99,102,241,0.06)', border: '1px solid rgba(99,102,241,0.12)',
                    borderRadius: 14, padding: '14px 16px',
                    display: 'flex', gap: 12, alignItems: 'flex-start'
                  }}>
                    <div style={{
                      width: 36, height: 36, borderRadius: 10, flexShrink: 0,
                      background: 'rgba(99,102,241,0.12)', border: '1px solid rgba(99,102,241,0.2)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18
                    }}>{t.icon}</div>
                    <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', lineHeight: 1.6 }}>{t.text}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      {/* Add Expense Modal */}
      {showAdd && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 100,
          background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)',
          display: 'flex', alignItems: 'flex-end'
        }} onClick={() => setShowAdd(false)}>
          <div style={{
            width: '100%', maxWidth: 480, margin: '0 auto',
            background: '#0f1629', borderRadius: '24px 24px 0 0',
            border: '1px solid rgba(255,255,255,0.08)',
            padding: '20px 20px 40px'
          }} onClick={e => e.stopPropagation()}>

            <div style={{ width: 36, height: 4, background: 'rgba(255,255,255,0.15)', borderRadius: 99, margin: '0 auto 20px' }} />
            <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 16, marginBottom: 16 }}>Add Expense</div>

            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.8px', marginBottom: 8 }}>CATEGORY</div>
            <div style={{ display: 'flex', gap: 8, overflowX: 'auto', marginBottom: 16, paddingBottom: 4 }}>
              {CATEGORIES.map(cat => (
                <button key={cat.id} onClick={() => setNewCat(cat.id)} style={{
                  flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
                  padding: '8px 12px', borderRadius: 12, cursor: 'pointer',
                  background: newCat === cat.id ? `${cat.color}20` : 'rgba(255,255,255,0.04)',
                  border: newCat === cat.id ? `1px solid ${cat.color}40` : '1px solid rgba(255,255,255,0.08)',
                  fontFamily: "'Plus Jakarta Sans', sans-serif"
                }}>
                  <span style={{ fontSize: 20 }}>{cat.icon}</span>
                  <span style={{ fontSize: 10, color: newCat === cat.id ? cat.color : 'rgba(255,255,255,0.4)', fontWeight: 600 }}>{cat.label}</span>
                </button>
              ))}
            </div>

            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.8px', marginBottom: 8 }}>AMOUNT (₹)</div>
            <input
              value={newAmount}
              onChange={e => setNewAmount(e.target.value)}
              placeholder="0"
              type="number"
              style={{
                width: '100%', background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 14, padding: '12px 14px',
                color: '#fff', fontSize: 20, fontWeight: 700, outline: 'none',
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                marginBottom: 12, boxSizing: 'border-box'
              }}
            />

            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.8px', marginBottom: 8 }}>NOTE (optional)</div>
            <input
              value={newNote}
              onChange={e => setNewNote(e.target.value)}
              placeholder="e.g. Monthly groceries"
              style={{
                width: '100%', background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 14, padding: '12px 14px',
                color: '#fff', fontSize: 14, outline: 'none',
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                marginBottom: 20, boxSizing: 'border-box'
              }}
            />

            <button onClick={addExpense} style={{
              width: '100%', padding: '14px', borderRadius: 16, border: 'none',
              background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
              color: '#fff', fontWeight: 700, fontSize: 14, cursor: 'pointer',
              fontFamily: "'Plus Jakarta Sans', sans-serif"
            }}>Add Expense</button>
          </div>
        </div>
      )}
    </div>
  );
}
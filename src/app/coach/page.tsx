'use client';

import { useState } from 'react';

const habits = [
  { id: 1, title: 'Save ₹50 today', desc: 'Put ₹50 aside right now — even small steps count', icon: '💰', color: '#10b981', points: 10, done: false },
  { id: 2, title: 'Check your balance', desc: 'Know exactly how much you have in your account', icon: '🏦', color: '#6366f1', points: 5, done: false },
  { id: 3, title: 'Avoid one impulse buy', desc: 'Skip one unnecessary purchase today', icon: '🛑', color: '#ef4444', points: 15, done: false },
  { id: 4, title: 'Track 3 expenses', desc: 'Write down 3 things you spent money on today', icon: '📝', color: '#f59e0b', points: 10, done: false },
  { id: 5, title: 'Read one finance tip', desc: 'Learn one new thing about saving or investing', icon: '📚', color: '#8b5cf6', points: 5, done: false },
];

const weekDays = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
const streakData = [true, true, true, false, true, true, false];

const nudges = [
  { time: 'Morning', icon: '🌅', msg: 'Good morning! Start the day by setting a spending limit.', color: '#f59e0b' },
  { time: 'Afternoon', icon: '☀️', msg: 'Midday check-in: Have you tracked your expenses today?', color: '#6366f1' },
  { time: 'Evening', icon: '🌙', msg: 'End of day: Did you save anything today? Even ₹10 counts!', color: '#8b5cf6' },
];

const achievements = [
  { title: '7-Day Streak', icon: '🔥', desc: 'Completed habits 7 days in a row', unlocked: true },
  { title: 'First Saver', icon: '💰', desc: 'Saved money for the first time', unlocked: true },
  { title: 'Scam Buster', icon: '🛡️', desc: 'Identified and avoided a scam', unlocked: true },
  { title: 'Budget Master', icon: '📊', desc: 'Stayed within budget for a full month', unlocked: false },
  { title: 'Scheme Hunter', icon: '🏛️', desc: 'Applied for 3 government schemes', unlocked: false },
  { title: 'Investor', icon: '📈', desc: 'Started your first SIP investment', unlocked: false },
];

export default function CoachPage() {
  const [habitList, setHabitList] = useState(habits);
  const [activeTab, setActiveTab] = useState('today');
  const [points, setPoints] = useState(45);

  const toggleHabit = (id: number) => {
    setHabitList(prev => prev.map(h => {
      if (h.id === id) {
        if (!h.done) setPoints(p => p + h.points);
        else setPoints(p => p - h.points);
        return { ...h, done: !h.done };
      }
      return h;
    }));
  };

  const doneCount = habitList.filter(h => h.done).length;
  const progressPercent = Math.round((doneCount / habitList.length) * 100);

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
          <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 16 }}>CoachBot</div>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)' }}>Daily financial habit nudges</div>
        </div>
        <div style={{
          background: 'rgba(245,158,11,0.12)', border: '1px solid rgba(245,158,11,0.25)',
          borderRadius: 20, padding: '5px 12px',
          display: 'flex', alignItems: 'center', gap: 6
        }}>
          <span style={{ fontSize: 14 }}>⭐</span>
          <span style={{ fontSize: 13, fontWeight: 700, color: '#fbbf24' }}>{points} pts</span>
        </div>
      </header>

      <main style={{ maxWidth: 480, margin: '0 auto', padding: '0 16px 60px' }}>

        {/* Streak Banner */}
        <section style={{
          margin: '20px 0',
          background: 'linear-gradient(135deg, rgba(245,158,11,0.15), rgba(249,115,22,0.08))',
          border: '1px solid rgba(245,158,11,0.2)',
          borderRadius: 24, padding: '20px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.8px', marginBottom: 4 }}>CURRENT STREAK</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                <span style={{ fontSize: 36, fontWeight: 800, fontFamily: "'Syne', sans-serif" }}>5</span>
                <span style={{ fontSize: 14, color: '#fbbf24' }}>days 🔥</span>
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginBottom: 4 }}>Best streak</div>
              <div style={{ fontSize: 20, fontWeight: 700, color: '#f97316' }}>12 days</div>
            </div>
          </div>

          {/* Week View */}
          <div style={{ display: 'flex', gap: 6 }}>
            {weekDays.map((day, i) => (
              <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                <div style={{
                  width: '100%', aspectRatio: '1', borderRadius: 10,
                  background: streakData[i] ? 'linear-gradient(135deg, #f59e0b, #f97316)' : 'rgba(255,255,255,0.06)',
                  border: streakData[i] ? 'none' : '1px solid rgba(255,255,255,0.08)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 14
                }}>{streakData[i] ? '✓' : ''}</div>
                <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)' }}>{day}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: 6, marginBottom: 16 }}>
          {[
            { id: 'today', label: '📋 Today' },
            { id: 'nudges', label: '🔔 Nudges' },
            { id: 'achievements', label: '🏆 Badges' },
          ].map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
              flex: 1, padding: '9px', borderRadius: 12, border: 'none', cursor: 'pointer',
              fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600, fontSize: 11,
              background: activeTab === tab.id ? 'rgba(245,158,11,0.15)' : 'rgba(255,255,255,0.04)',
              color: activeTab === tab.id ? '#fbbf24' : 'rgba(255,255,255,0.4)',
              borderBottom: activeTab === tab.id ? '2px solid #f59e0b' : '2px solid transparent',
            }}>{tab.label}</button>
          ))}
        </div>

        {/* TODAY TAB */}
        {activeTab === 'today' && (
          <div>
            {/* Progress */}
            <div style={{
              background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: 16, padding: '14px 16px', marginBottom: 14
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <span style={{ fontSize: 13, fontWeight: 600 }}>Today's Progress</span>
                <span style={{ fontSize: 13, color: '#fbbf24', fontWeight: 700 }}>{doneCount}/{habitList.length} done</span>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.08)', borderRadius: 999, height: 8, overflow: 'hidden' }}>
                <div style={{
                  width: `${progressPercent}%`, height: '100%',
                  background: 'linear-gradient(90deg, #f59e0b, #f97316)',
                  borderRadius: 999, transition: 'width 0.4s ease'
                }} />
              </div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', marginTop: 6 }}>
                {progressPercent === 100 ? '🎉 All habits completed! Amazing!' : `${100 - progressPercent}% left to complete today`}
              </div>
            </div>

            {/* Habit List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {habitList.map(habit => (
                <button key={habit.id} onClick={() => toggleHabit(habit.id)} style={{
                  background: habit.done ? `${habit.color}10` : 'rgba(255,255,255,0.03)',
                  border: `1px solid ${habit.done ? habit.color + '30' : 'rgba(255,255,255,0.07)'}`,
                  borderRadius: 16, padding: '14px 16px',
                  display: 'flex', alignItems: 'center', gap: 14,
                  cursor: 'pointer', textAlign: 'left', width: '100%',
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  transition: 'all 0.2s ease'
                }}>
                  <div style={{
                    width: 42, height: 42, borderRadius: 12, flexShrink: 0,
                    background: habit.done ? `${habit.color}20` : 'rgba(255,255,255,0.06)',
                    border: `1px solid ${habit.done ? habit.color + '40' : 'rgba(255,255,255,0.1)'}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20
                  }}>{habit.done ? '✅' : habit.icon}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{
                      fontSize: 14, fontWeight: 700, color: habit.done ? habit.color : '#fff',
                      textDecoration: habit.done ? 'line-through' : 'none', marginBottom: 3
                    }}>{habit.title}</div>
                    <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', lineHeight: 1.4 }}>{habit.desc}</div>
                  </div>
                  <div style={{
                    fontSize: 11, fontWeight: 700, color: habit.done ? habit.color : 'rgba(255,255,255,0.3)',
                    background: habit.done ? `${habit.color}15` : 'rgba(255,255,255,0.05)',
                    border: `1px solid ${habit.done ? habit.color + '30' : 'rgba(255,255,255,0.08)'}`,
                    borderRadius: 20, padding: '3px 8px', flexShrink: 0
                  }}>+{habit.points}pts</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* NUDGES TAB */}
        {activeTab === 'nudges' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', marginBottom: 4 }}>
              Personalized reminders throughout your day
            </p>
            {nudges.map((nudge, i) => (
              <div key={i} style={{
                background: `${nudge.color}08`, border: `1px solid ${nudge.color}20`,
                borderRadius: 16, padding: '16px',
                display: 'flex', gap: 14, alignItems: 'flex-start'
              }}>
                <div style={{
                  width: 44, height: 44, borderRadius: 12, flexShrink: 0,
                  background: `${nudge.color}15`, border: `1px solid ${nudge.color}25`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22
                }}>{nudge.icon}</div>
                <div>
                  <div style={{ fontSize: 11, color: nudge.color, fontWeight: 700, letterSpacing: '0.5px', marginBottom: 4 }}>{nudge.time.toUpperCase()}</div>
                  <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', lineHeight: 1.5 }}>{nudge.msg}</div>
                </div>
              </div>
            ))}

            {/* Motivational Quote */}
            <div style={{
              background: 'linear-gradient(135deg, rgba(99,102,241,0.12), rgba(139,92,246,0.08))',
              border: '1px solid rgba(99,102,241,0.2)',
              borderRadius: 16, padding: '18px', marginTop: 6, textAlign: 'center'
            }}>
              <div style={{ fontSize: 24, marginBottom: 10 }}>💬</div>
              <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.8)', lineHeight: 1.6, fontStyle: 'italic' }}>
                "A small saving every day is a big fortune someday."
              </div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', marginTop: 8 }}>— ArthSaathi CoachBot</div>
            </div>
          </div>
        )}

        {/* ACHIEVEMENTS TAB */}
        {activeTab === 'achievements' && (
          <div>
            <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', marginBottom: 14 }}>
              {achievements.filter(a => a.unlocked).length} of {achievements.length} badges unlocked
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              {achievements.map((ach, i) => (
                <div key={i} style={{
                  background: ach.unlocked ? 'rgba(245,158,11,0.08)' : 'rgba(255,255,255,0.02)',
                  border: `1px solid ${ach.unlocked ? 'rgba(245,158,11,0.2)' : 'rgba(255,255,255,0.06)'}`,
                  borderRadius: 16, padding: '16px', textAlign: 'center',
                  opacity: ach.unlocked ? 1 : 0.5
                }}>
                  <div style={{ fontSize: 32, marginBottom: 8, filter: ach.unlocked ? 'none' : 'grayscale(1)' }}>{ach.icon}</div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: ach.unlocked ? '#fbbf24' : 'rgba(255,255,255,0.5)', marginBottom: 4 }}>{ach.title}</div>
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', lineHeight: 1.4 }}>{ach.desc}</div>
                  {ach.unlocked && (
                    <div style={{
                      marginTop: 8, fontSize: 10, color: '#fbbf24', fontWeight: 700,
                      background: 'rgba(245,158,11,0.1)', borderRadius: 20, padding: '2px 8px',
                      display: 'inline-block'
                    }}>UNLOCKED</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
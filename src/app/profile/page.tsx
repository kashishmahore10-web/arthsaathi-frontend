'use client';

import { useState } from 'react';

const notifications = [
  { id: 1, icon: '🛡️', title: 'Scam Alert', desc: 'New UPI fraud reported in your area', time: '2 min ago', color: '#ef4444', unread: true },
  { id: 2, icon: '🏛️', title: 'Scheme Update', desc: 'PM-KISAN next installment due in 5 days', time: '1 hr ago', color: '#10b981', unread: true },
  { id: 3, icon: '🎯', title: 'CoachBot Nudge', desc: 'You have 3 habits pending today', time: '3 hrs ago', color: '#f59e0b', unread: true },
  { id: 4, icon: '💰', title: 'WealthBot', desc: 'Your SIP of ₹100 is due tomorrow', time: '5 hrs ago', color: '#f97316', unread: false },
  { id: 5, icon: '📈', title: 'Health Score', desc: 'Your score improved by 5 points!', time: '1 day ago', color: '#6366f1', unread: false },
  { id: 6, icon: '🌸', title: 'SakhiBot', desc: 'Group meeting reminder for tomorrow', time: '1 day ago', color: '#ec4899', unread: false },
];

const helpTopics = [
  { icon: '🎤', title: 'How to use Voice Mode', desc: 'Speak in any Indian language', color: '#6366f1', href: '/voice' },
  { icon: '🛡️', title: 'How to check scams', desc: 'Paste suspicious messages', color: '#ef4444', href: '/scam' },
  { icon: '🏛️', title: 'Finding government schemes', desc: 'Check your eligibility', color: '#10b981', href: '/schemes' },
  { icon: '📊', title: 'Setting up your budget', desc: 'Plan for irregular income', color: '#8b5cf6', href: '/planner' },
  { icon: '💳', title: 'Building credit score', desc: 'Use UPI to build identity', color: '#06b6d4', href: '/credit' },
  { icon: '💰', title: 'Starting investments', desc: 'SIP from just ₹100/month', color: '#f97316', href: '/wealth' },
];

const menuItems = [
  { icon: '👤', label: 'Edit Profile', color: '#6366f1', action: 'edit' },
  { icon: '🔒', label: 'Privacy & Security', color: '#10b981', action: 'privacy' },
  { icon: '🌐', label: 'Language Settings', color: '#f59e0b', action: 'language' },
  { icon: '📴', label: 'Offline Mode Settings', color: '#06b6d4', action: 'offline' },
  { icon: '🔔', label: 'Notification Settings', color: '#ec4899', action: 'notifications' },
  { icon: '📞', label: 'Contact Support', color: '#8b5cf6', action: 'support' },
  { icon: '⭐', label: 'Rate ArthSaathi', color: '#f97316', action: 'rate' },
  { icon: '📋', label: 'Terms & Privacy Policy', color: '#64748b', action: 'terms' },
];

const languages = ['Hindi', 'English', 'Tamil', 'Telugu', 'Bengali', 'Marathi', 'Gujarati', 'Kannada'];

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('profile');
  const [notifList, setNotifList] = useState(notifications);
  const [selectedLang, setSelectedLang] = useState('Hindi');
  const [darkMode, setDarkMode] = useState(true);
  const [offlineMode, setOfflineMode] = useState(true);
  const [notifEnabled, setNotifEnabled] = useState(true);
  const [showEditModal, setShowEditModal] = useState(false);
  const [name, setName] = useState('Rani Solanki');
  const [phone, setPhone] = useState('+91 98765 43210');
  const [location, setLocation] = useState('Bhopal, Madhya Pradesh');
  const [editName, setEditName] = useState(name);
  const [editPhone, setEditPhone] = useState(phone);
  const [editLocation, setEditLocation] = useState(location);

  const unreadCount = notifList.filter(n => n.unread).length;

  const markAllRead = () => {
    setNotifList(prev => prev.map(n => ({ ...n, unread: false })));
  };

  const markRead = (id: number) => {
    setNotifList(prev => prev.map(n => n.id === id ? { ...n, unread: false } : n));
  };

  const saveProfile = () => {
    setName(editName);
    setPhone(editPhone);
    setLocation(editLocation);
    setShowEditModal(false);
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
        <a href="/" style={{
          width: 34, height: 34, borderRadius: 10,
          background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 16, textDecoration: 'none', color: '#fff'
        }}>←</a>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 16 }}>My Profile</div>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)' }}>ArthSaathi · SAKSHAM AI</div>
        </div>
        {unreadCount > 0 && (
          <div style={{
            background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.3)',
            borderRadius: 20, padding: '5px 10px',
            display: 'flex', alignItems: 'center', gap: 6
          }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#ef4444' }} />
            <span style={{ fontSize: 12, fontWeight: 700, color: '#f87171' }}>{unreadCount} new</span>
          </div>
        )}
      </header>

      <main style={{ maxWidth: 480, margin: '0 auto', padding: '0 16px 60px' }}>

        {/* Profile Card */}
        <section style={{
          margin: '20px 0',
          background: 'linear-gradient(135deg, rgba(99,102,241,0.15), rgba(236,72,153,0.08))',
          border: '1px solid rgba(99,102,241,0.2)',
          borderRadius: 24, padding: '24px 20px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
            <div style={{
              width: 70, height: 70, borderRadius: '50%',
              background: 'linear-gradient(135deg, #6366f1, #ec4899)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 28, fontWeight: 800, flexShrink: 0
            }}>R</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 20, fontWeight: 800, marginBottom: 4 }}>{name}</div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', marginBottom: 2 }}>{phone}</div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)' }}>📍 {location}</div>
            </div>
            <button onClick={() => { setEditName(name); setEditPhone(phone); setEditLocation(location); setShowEditModal(true); }} style={{
              background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: 10, padding: '7px 12px', color: 'rgba(255,255,255,0.6)',
              fontSize: 12, fontWeight: 600, cursor: 'pointer',
              fontFamily: "'Plus Jakarta Sans', sans-serif"
            }}>Edit</button>
          </div>

          {/* Stats Row */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
            {[
              { label: 'Health Score', value: '72', icon: '📈', color: '#6366f1' },
              { label: 'Streak', value: '5d 🔥', icon: '', color: '#f59e0b' },
              { label: 'Points', value: '45 ⭐', icon: '', color: '#10b981' },
            ].map((s, i) => (
              <div key={i} style={{
                background: 'rgba(255,255,255,0.06)', borderRadius: 14, padding: '10px', textAlign: 'center'
              }}>
                <div style={{ fontSize: 16, fontWeight: 800, color: s.color }}>{s.value}</div>
                <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)', marginTop: 2 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: 6, marginBottom: 16 }}>
          {[
            { id: 'profile', label: '👤 Profile' },
            { id: 'notifications', label: `🔔 Alerts${unreadCount > 0 ? ` (${unreadCount})` : ''}` },
            { id: 'help', label: '❓ Help' },
            { id: 'settings', label: '⚙️ Settings' },
          ].map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
              flex: 1, padding: '8px 4px', borderRadius: 10, border: 'none', cursor: 'pointer',
              fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600, fontSize: 10,
              background: activeTab === tab.id ? 'rgba(99,102,241,0.15)' : 'rgba(255,255,255,0.04)',
              color: activeTab === tab.id ? '#a5b4fc' : 'rgba(255,255,255,0.4)',
              borderBottom: activeTab === tab.id ? '2px solid #6366f1' : '2px solid transparent',
            }}>{tab.label}</button>
          ))}
        </div>

        {/* PROFILE TAB */}
        {activeTab === 'profile' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>

            {/* Account Info */}
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.8px', marginBottom: 4 }}>ACCOUNT</div>
            <div style={{
              background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: 16, overflow: 'hidden', marginBottom: 10
            }}>
              {[
                { label: 'Name', value: name },
                { label: 'Phone', value: phone },
                { label: 'Location', value: location },
                { label: 'Language', value: selectedLang },
                { label: 'Member Since', value: 'June 2026' },
              ].map((item, i, arr) => (
                <div key={i} style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  padding: '13px 16px',
                  borderBottom: i < arr.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none'
                }}>
                  <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)' }}>{item.label}</span>
                  <span style={{ fontSize: 13, fontWeight: 600 }}>{item.value}</span>
                </div>
              ))}
            </div>

            {/* Menu Items */}
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.8px', marginBottom: 4 }}>SETTINGS & MORE</div>
            <div style={{
              background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: 16, overflow: 'hidden', marginBottom: 10
            }}>
              {menuItems.map((item, i) => (
                <button key={i} onClick={() => {
                  if (item.action === 'edit') { setEditName(name); setEditPhone(phone); setEditLocation(location); setShowEditModal(true); }
                  if (item.action === 'notifications') setActiveTab('notifications');
                  if (item.action === 'support') setActiveTab('help');
                }} style={{
                  width: '100%', display: 'flex', alignItems: 'center', gap: 14,
                  padding: '13px 16px', background: 'none', border: 'none', cursor: 'pointer',
                  borderBottom: i < menuItems.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                  textAlign: 'left', fontFamily: "'Plus Jakarta Sans', sans-serif"
                }}>
                  <div style={{
                    width: 34, height: 34, borderRadius: 10, flexShrink: 0,
                    background: `${item.color}15`, border: `1px solid ${item.color}25`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16
                  }}>{item.icon}</div>
                  <span style={{ flex: 1, fontSize: 13, fontWeight: 500, color: '#fff' }}>{item.label}</span>
                  <span style={{ fontSize: 16, color: 'rgba(255,255,255,0.2)' }}>›</span>
                </button>
              ))}
            </div>

            {/* Danger Zone */}
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.8px', marginBottom: 4 }}>DANGER ZONE</div>
            <div style={{
              background: 'rgba(239,68,68,0.04)', border: '1px solid rgba(239,68,68,0.12)',
              borderRadius: 16, overflow: 'hidden'
            }}>
              {[
                { icon: '🗑️', label: 'Delete All My Data', color: '#ef4444' },
                { icon: '🚪', label: 'Log Out', color: '#f87171' },
              ].map((item, i) => (
                <button key={i} style={{
                  width: '100%', display: 'flex', alignItems: 'center', gap: 14,
                  padding: '13px 16px', background: 'none', border: 'none', cursor: 'pointer',
                  borderBottom: i === 0 ? '1px solid rgba(239,68,68,0.08)' : 'none',
                  textAlign: 'left', fontFamily: "'Plus Jakarta Sans', sans-serif"
                }}>
                  <span style={{ fontSize: 18 }}>{item.icon}</span>
                  <span style={{ fontSize: 13, fontWeight: 600, color: item.color }}>{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* NOTIFICATIONS TAB */}
        {activeTab === 'notifications' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
              <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>{unreadCount} unread alerts</span>
              {unreadCount > 0 && (
                <button onClick={markAllRead} style={{
                  background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)',
                  borderRadius: 20, padding: '5px 12px', color: '#a5b4fc',
                  fontSize: 11, fontWeight: 600, cursor: 'pointer',
                  fontFamily: "'Plus Jakarta Sans', sans-serif"
                }}>Mark all read</button>
              )}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {notifList.map(notif => (
                <button key={notif.id} onClick={() => markRead(notif.id)} style={{
                  background: notif.unread ? `${notif.color}08` : 'rgba(255,255,255,0.02)',
                  border: `1px solid ${notif.unread ? notif.color + '20' : 'rgba(255,255,255,0.06)'}`,
                  borderRadius: 14, padding: '13px 14px',
                  display: 'flex', alignItems: 'flex-start', gap: 12,
                  cursor: 'pointer', textAlign: 'left', width: '100%',
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  transition: 'all 0.2s'
                }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: 12, flexShrink: 0,
                    background: `${notif.color}15`, border: `1px solid ${notif.color}25`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18
                  }}>{notif.icon}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 3 }}>
                      <div style={{ fontSize: 13, fontWeight: 700, color: notif.unread ? '#fff' : 'rgba(255,255,255,0.6)' }}>{notif.title}</div>
                      {notif.unread && <div style={{ width: 8, height: 8, borderRadius: '50%', background: notif.color, flexShrink: 0 }} />}
                    </div>
                    <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', lineHeight: 1.4, marginBottom: 4 }}>{notif.desc}</div>
                    <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.25)' }}>{notif.time}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* HELP TAB */}
        {activeTab === 'help' && (
          <div>
            {/* Search */}
            <input placeholder="Search help topics..."
              style={{
                width: '100%', background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 14, padding: '12px 14px', marginBottom: 16,
                color: '#fff', fontSize: 14, outline: 'none',
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                boxSizing: 'border-box'
              }} />

            {/* Help Topics */}
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.8px', marginBottom: 10 }}>GUIDES</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 20 }}>
              {helpTopics.map((topic, i) => (
                <button key={i} onClick={() => window.location.href = topic.href} style={{
                  background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)',
                  borderRadius: 14, padding: '13px 16px',
                  display: 'flex', alignItems: 'center', gap: 14,
                  cursor: 'pointer', textAlign: 'left', width: '100%',
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  transition: 'border-color 0.2s'
                }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'}
                  onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'}
                >
                  <div style={{
                    width: 40, height: 40, borderRadius: 12, flexShrink: 0,
                    background: `${topic.color}15`, border: `1px solid ${topic.color}25`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20
                  }}>{topic.icon}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 2 }}>{topic.title}</div>
                    <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>{topic.desc}</div>
                  </div>
                  <span style={{ fontSize: 16, color: 'rgba(255,255,255,0.2)' }}>›</span>
                </button>
              ))}
            </div>

            {/* Emergency Help */}
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.8px', marginBottom: 10 }}>EMERGENCY CONTACTS</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 20 }}>
              {[
                { icon: '📞', label: 'Cyber Crime Helpline', number: '1930', color: '#ef4444' },
                { icon: '🏦', label: 'RBI Ombudsman', number: '14448', color: '#6366f1' },
                { icon: '👮', label: 'National Police', number: '112', color: '#f59e0b' },
              ].map((contact, i) => (
                <div key={i} style={{
                  background: `${contact.color}06`, border: `1px solid ${contact.color}15`,
                  borderRadius: 14, padding: '13px 16px',
                  display: 'flex', alignItems: 'center', gap: 14
                }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: 12, flexShrink: 0,
                    background: `${contact.color}15`, border: `1px solid ${contact.color}25`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20
                  }}>{contact.icon}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 700 }}>{contact.label}</div>
                    <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>Available 24/7</div>
                  </div>
                  <div style={{ fontSize: 18, fontWeight: 800, color: contact.color, fontFamily: "'Syne', sans-serif" }}>{contact.number}</div>
                </div>
              ))}
            </div>

            {/* FAQ */}
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.8px', marginBottom: 10 }}>FREQUENTLY ASKED</div>
            <div style={{
              background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: 16, overflow: 'hidden'
            }}>
              {[
                { q: 'Is my data safe with ArthSaathi?', a: 'Yes — all data is processed on your device. We sell nothing.' },
                { q: 'Does it work without internet?', a: 'Yes! Use USSD/SMS mode when offline. Cached AI works too.' },
                { q: 'Can I use it in my language?', a: 'Yes — Hindi, Tamil, Telugu, Bengali and 8 more languages.' },
                { q: 'How do I report a scam?', a: 'Go to Scam Radar → paste the message → GuardBot analyzes it.' },
              ].map((faq, i, arr) => (
                <div key={i} style={{
                  padding: '13px 16px',
                  borderBottom: i < arr.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none'
                }}>
                  <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 4, color: '#a5b4fc' }}>Q: {faq.q}</div>
                  <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', lineHeight: 1.5 }}>A: {faq.a}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SETTINGS TAB */}
        {activeTab === 'settings' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>

            {/* Language */}
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.8px', marginBottom: 4 }}>LANGUAGE</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 6 }}>
              {languages.map(lang => (
                <button key={lang} onClick={() => setSelectedLang(lang)} style={{
                  padding: '7px 14px', borderRadius: 20, border: 'none', cursor: 'pointer',
                  fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600, fontSize: 12,
                  background: selectedLang === lang ? 'rgba(99,102,241,0.2)' : 'rgba(255,255,255,0.05)',
                  color: selectedLang === lang ? '#a5b4fc' : 'rgba(255,255,255,0.4)',
                  border: selectedLang === lang ? '1px solid rgba(99,102,241,0.4)' : '1px solid rgba(255,255,255,0.08)',
                }}>{lang}</button>
              ))}
            </div>

            {/* Toggles */}
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.8px', marginBottom: 4 }}>PREFERENCES</div>
            <div style={{
              background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: 16, overflow: 'hidden'
            }}>
              {[
                { label: 'Dark Mode', desc: 'Dark background for low light', value: darkMode, setValue: setDarkMode, color: '#6366f1' },
                { label: 'Offline Mode', desc: 'Cache data for no-internet use', value: offlineMode, setValue: setOfflineMode, color: '#10b981' },
                { label: 'Notifications', desc: 'Alerts, nudges & scheme updates', value: notifEnabled, setValue: setNotifEnabled, color: '#f59e0b' },
              ].map((toggle, i) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '14px 16px',
                  borderBottom: i < 2 ? '1px solid rgba(255,255,255,0.05)' : 'none'
                }}>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600 }}>{toggle.label}</div>
                    <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', marginTop: 2 }}>{toggle.desc}</div>
                  </div>
                  <button onClick={() => toggle.setValue(!toggle.value)} style={{
                    width: 48, height: 26, borderRadius: 13, border: 'none', cursor: 'pointer',
                    background: toggle.value ? toggle.color : 'rgba(255,255,255,0.12)',
                    position: 'relative', transition: 'background 0.3s', flexShrink: 0
                  }}>
                    <div style={{
                      position: 'absolute', top: 3,
                      left: toggle.value ? 25 : 3,
                      width: 20, height: 20, borderRadius: '50%', background: '#fff',
                      transition: 'left 0.3s', boxShadow: '0 1px 4px rgba(0,0,0,0.3)'
                    }} />
                  </button>
                </div>
              ))}
            </div>

            {/* App Info */}
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.8px', marginBottom: 4 }}>APP INFO</div>
            <div style={{
              background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: 16, overflow: 'hidden'
            }}>
              {[
                { label: 'App Version', value: '1.0.0' },
                { label: 'Build', value: 'SAKSHAM AI 2026' },
                { label: 'Last Updated', value: 'June 2026' },
                { label: 'Data Used', value: '2.4 MB' },
              ].map((item, i, arr) => (
                <div key={i} style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  padding: '12px 16px',
                  borderBottom: i < arr.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none'
                }}>
                  <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)' }}>{item.label}</span>
                  <span style={{ fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.7)' }}>{item.value}</span>
                </div>
              ))}
            </div>

            {/* Grievance */}
            <div style={{
              background: 'rgba(99,102,241,0.06)', border: '1px solid rgba(99,102,241,0.15)',
              borderRadius: 16, padding: '16px', textAlign: 'center'
            }}>
              <div style={{ fontSize: 20, marginBottom: 8 }}>🏛️</div>
              <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 4 }}>Grievance & Escalation</div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', lineHeight: 1.5, marginBottom: 12 }}>
                If our AI gave wrong advice, we escalate directly to a human BC agent or RBI Ombudsman.
              </div>
              <button style={{
                width: '100%', padding: '11px', borderRadius: 12, border: 'none',
                background: 'rgba(99,102,241,0.15)', border: '1px solid rgba(99,102,241,0.3)' as any,
                color: '#a5b4fc', fontWeight: 700, fontSize: 13, cursor: 'pointer',
                fontFamily: "'Plus Jakarta Sans', sans-serif"
              }}>📞 Raise a Grievance</button>
            </div>
          </div>
        )}
      </main>

      {/* Edit Profile Modal */}
      {showEditModal && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 100,
          background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)',
          display: 'flex', alignItems: 'flex-end'
        }} onClick={() => setShowEditModal(false)}>
          <div style={{
            width: '100%', maxWidth: 480, margin: '0 auto',
            background: '#0f1629', borderRadius: '24px 24px 0 0',
            border: '1px solid rgba(255,255,255,0.08)',
            padding: '20px 20px 40px'
          }} onClick={e => e.stopPropagation()}>
            <div style={{ width: 36, height: 4, background: 'rgba(255,255,255,0.15)', borderRadius: 99, margin: '0 auto 20px' }} />
            <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 16, marginBottom: 20 }}>Edit Profile</div>

            {[
              { label: 'Full Name', value: editName, setValue: setEditName, placeholder: 'Your name' },
              { label: 'Phone Number', value: editPhone, setValue: setEditPhone, placeholder: '+91 XXXXX XXXXX' },
              { label: 'Location', value: editLocation, setValue: setEditLocation, placeholder: 'City, State' },
            ].map((field, i) => (
              <div key={i} style={{ marginBottom: 14 }}>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.8px', marginBottom: 6 }}>{field.label.toUpperCase()}</div>
                <input
                  value={field.value}
                  onChange={e => field.setValue(e.target.value)}
                  placeholder={field.placeholder}
                  style={{
                    width: '100%', background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: 14, padding: '12px 14px',
                    color: '#fff', fontSize: 14, outline: 'none',
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    boxSizing: 'border-box'
                  }}
                />
              </div>
            ))}

            <div style={{ display: 'flex', gap: 10, marginTop: 6 }}>
              <button onClick={() => setShowEditModal(false)} style={{
                flex: 1, padding: '13px', borderRadius: 14, border: '1px solid rgba(255,255,255,0.1)',
                background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.6)',
                fontWeight: 600, fontSize: 14, cursor: 'pointer',
                fontFamily: "'Plus Jakarta Sans', sans-serif"
              }}>Cancel</button>
              <button onClick={saveProfile} style={{
                flex: 2, padding: '13px', borderRadius: 14, border: 'none',
                background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                color: '#fff', fontWeight: 700, fontSize: 14, cursor: 'pointer',
                fontFamily: "'Plus Jakarta Sans', sans-serif"
              }}>Save Changes</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
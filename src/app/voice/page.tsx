'use client';

import { useState, useEffect } from 'react';

const languages = [
  { code: 'hi', label: 'हिंदी', name: 'Hindi', flag: '🇮🇳' },
  { code: 'en', label: 'English', name: 'English', flag: '🇬🇧' },
  { code: 'ta', label: 'தமிழ்', name: 'Tamil', flag: '🇮🇳' },
  { code: 'te', label: 'తెలుగు', name: 'Telugu', flag: '🇮🇳' },
  { code: 'bn', label: 'বাংলা', name: 'Bengali', flag: '🇮🇳' },
  { code: 'mr', label: 'मराठी', name: 'Marathi', flag: '🇮🇳' },
  { code: 'gu', label: 'ગુજરાતી', name: 'Gujarati', flag: '🇮🇳' },
  { code: 'kn', label: 'ಕನ್ನಡ', name: 'Kannada', flag: '🇮🇳' },
  { code: 'ml', label: 'മലയാളം', name: 'Malayalam', flag: '🇮🇳' },
  { code: 'pa', label: 'ਪੰਜਾਬੀ', name: 'Punjabi', flag: '🇮🇳' },
  { code: 'or', label: 'ଓଡ଼ିଆ', name: 'Odia', flag: '🇮🇳' },
  { code: 'ur', label: 'اردو', name: 'Urdu', flag: '🇮🇳' },
];

const suggestions = [
  { hi: 'मेरा बजट बनाओ', en: 'Make my budget' },
  { hi: 'सरकारी योजनाएं दिखाओ', en: 'Show government schemes' },
  { hi: 'यह मैसेज स्कैम है?', en: 'Is this message a scam?' },
  { hi: 'मेरा हेल्थ स्कोर क्या है?', en: 'What is my health score?' },
];

const agentReplies: Record<string, string> = {
  budget: 'PlannerBot: आपकी अनियमित आय के लिए मैं एक लचीला बजट बना सकता हूँ। पहले बताइए — इस महीने आपकी अनुमानित आय क्या है?',
  scheme: 'GovBot: आपके लिए PM-KISAN, PMJDY और Kisan Credit Card जैसी योजनाएं उपलब्ध हैं। क्या आप पात्रता जांचना चाहते हैं?',
  scam: 'GuardBot: 🛡️ यह संदेश संदिग्ध लग रहा है। इसमें फर्जी लिंक और पैसे मांगने के संकेत हैं। कृपया इस पर क्लिक न करें।',
  health: 'CoachBot: आपका वर्तमान Financial Health Score 72/100 है। इस हफ्ते 5 अंक की वृद्धि हुई है। शाबाश! 🎉',
  default: 'GuideBot: नमस्ते! मैं आपकी किस तरह मदद कर सकता हूँ? बजट, योजनाएं, स्कैम जांच या बचत — बस बोलिए।',
};

type Message = {
  role: 'user' | 'agent';
  text: string;
  time: string;
};

export default function VoicePage() {
  const [selectedLang, setSelectedLang] = useState(languages[0]);
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'agent',
      text: 'नमस्ते! मैं ArthSaathi हूँ। आप हिंदी, English या किसी भी भारतीय भाषा में बात कर सकते हैं।',
      time: 'अभी',
    },
  ]);
  const [showLangPicker, setShowLangPicker] = useState(false);
  const [dots, setDots] = useState('');

  useEffect(() => {
    if (!listening) return;
    const interval = setInterval(() => {
      setDots((d) => (d.length >= 3 ? '' : d + '.'));
    }, 400);
    return () => clearInterval(interval);
  }, [listening]);

  const getReply = async (text: string): Promise<string> => {
    try {
      const lower = text.toLowerCase();
      if (lower.includes('scam') || lower.includes('स्कैम') || lower.includes('fraud')) {
        const res = await fetch('http://localhost:5000/api/agents/scamradar/check', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('arthsaathi_token')}` },
          body: JSON.stringify({ message: text, language: selectedLang.code }),
        });
        const data = await res.json();
        return `GuardBot: ${data.data?.userMessage || 'Yeh scam lag raha hai — dhyan rakhein!'}`;
      }
      if (lower.includes('budget') || lower.includes('बजट') || lower.includes('plan')) {
        const res = await fetch('http://localhost:5000/api/agents/plannerbot/ask', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('arthsaathi_token')}` },
          body: JSON.stringify({ context: text }),
        });
        const data = await res.json();
        return `PlannerBot: ${data.data?.answer || 'Aapka budget plan taiyar kar raha hun...'}`;
      }
      if (lower.includes('scheme') || lower.includes('योजना') || lower.includes('yojana') || lower.includes('government')) {
        const res = await fetch('http://localhost:5000/api/agents/govbot/ask', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('arthsaathi_token')}` },
          body: JSON.stringify({ question: text }),
        });
        const data = await res.json();
        return `GovBot: ${data.data?.answer || 'Aapke liye sarkari yojanaen dhundh raha hun...'}`;
      }
      if (lower.includes('health') || lower.includes('score') || lower.includes('स्कोर')) {
        const res = await fetch('http://localhost:5000/api/agents/health-score', {
          method: 'GET',
          headers: { 'Authorization': `Bearer ${localStorage.getItem('arthsaathi_token')}` },
        });
        const data = await res.json();
        return `CoachBot: Aapka Financial Health Score ${data.data?.score || 72}/100 hai. ${data.data?.message || 'Bahut achha!'}`;
      }
      // Default — GuideBot
      const res = await fetch('http://localhost:5000/api/agents/guidebot/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('arthsaathi_token')}` },
        body: JSON.stringify({ question: text, language: selectedLang.code }),
      });
      const data = await res.json();
      return `GuideBot: ${data.data?.answer || 'Mujhe samajh nahi aaya — kripya dobara poochhen.'}`;
    } catch {
      return 'GuideBot: Server se connect nahi ho paya. Kripya internet check karein.';
    }
  };

  const speak = (text: string, langCode: string) => {
  window.speechSynthesis.cancel();
  const cleanText = text.replace(/\*\*/g, '').replace(/\*/g, '').replace(/#+/g, '');
  const utterance = new SpeechSynthesisUtterance(cleanText);
  utterance.lang = langCode === 'hi' ? 'hi-IN'
    : langCode === 'en' ? 'en-IN'
    : langCode === 'ta' ? 'ta-IN'
    : langCode === 'te' ? 'te-IN'
    : langCode === 'bn' ? 'bn-IN'
    : langCode === 'mr' ? 'mr-IN'
    : langCode === 'gu' ? 'gu-IN'
    : langCode === 'kn' ? 'kn-IN'
    : 'hi-IN';
  utterance.rate = 1.15;
  utterance.pitch = 1;
  utterance.volume = 1;
  window.speechSynthesis.speak(utterance);
};

const sendMessage = async (text: string) => {
  if (!text.trim()) return;
  const now = new Date().toLocaleTimeString('hi-IN', { hour: '2-digit', minute: '2-digit' });
  setMessages((prev) => [...prev, { role: 'user', text, time: now }]);
  setTranscript('');
  const reply = await getReply(text);
  setMessages((prev) => [...prev, { role: 'agent', text: reply, time: now }]);
  // AI bolke jawab dega!
  speak(reply, selectedLang.code);
};

 const toggleListen = () => {
  if (listening) {
    setListening(false);
    return;
  }

  const SpeechRecognition =
    (window as any).SpeechRecognition ||
    (window as any).webkitSpeechRecognition;

  if (!SpeechRecognition) {
    alert('Aapka browser voice support nahi karta. Chrome use karein!');
    return;
  }

  const recognition = new SpeechRecognition();
  recognition.lang = selectedLang.code === 'hi' ? 'hi-IN'
    : selectedLang.code === 'en' ? 'en-IN'
    : selectedLang.code === 'ta' ? 'ta-IN'
    : selectedLang.code === 'te' ? 'te-IN'
    : selectedLang.code === 'bn' ? 'bn-IN'
    : selectedLang.code === 'mr' ? 'mr-IN'
    : selectedLang.code === 'gu' ? 'gu-IN'
    : selectedLang.code === 'kn' ? 'kn-IN'
    : selectedLang.code === 'pa' ? 'pa-IN'
    : 'hi-IN';

  recognition.continuous = false;
  recognition.interimResults = true;

  setListening(true);
  setTranscript('');

  recognition.onresult = (event: any) => {
    let finalTranscript = '';
    let interimTranscript = '';
    for (let i = event.resultIndex; i < event.results.length; i++) {
      if (event.results[i].isFinal) {
        finalTranscript += event.results[i][0].transcript;
      } else {
        interimTranscript += event.results[i][0].transcript;
      }
    }
    setTranscript(finalTranscript || interimTranscript);
    if (finalTranscript) {
      setListening(false);
      sendMessage(finalTranscript);
    }
  };

  recognition.onerror = (event: any) => {
    console.error('Speech error:', event.error);
    setListening(false);
    if (event.error === 'not-allowed') {
      alert('Mic permission do! Browser settings mein mic allow karein.');
    }
  };

  recognition.onend = () => {
    setListening(false);
  };

  recognition.start();
};

  return (
    <div style={{ minHeight: '100vh', background: '#060912', color: '#fff', fontFamily: "'Plus Jakarta Sans', sans-serif", display: 'flex', flexDirection: 'column' }}>

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
          fontSize: 16, textDecoration: 'none', color: '#fff', cursor: 'pointer'
        }}>←</a>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 16 }}>Voice Assistant</div>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)' }}>ArthSaathi · 12 भाषाएं</div>
        </div>
        <button
          onClick={() => setShowLangPicker(!showLangPicker)}
          style={{
            background: 'rgba(99,102,241,0.12)', border: '1px solid rgba(99,102,241,0.25)',
            borderRadius: 20, padding: '6px 12px', color: '#a5b4fc',
            fontSize: 12, fontWeight: 600, cursor: 'pointer',
            fontFamily: "'Plus Jakarta Sans', sans-serif"
          }}>
          {selectedLang.flag} {selectedLang.label}
        </button>
      </header>

      {/* Language Picker */}
      {showLangPicker && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 100,
          background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)',
          display: 'flex', alignItems: 'flex-end'
        }} onClick={() => setShowLangPicker(false)}>
          <div style={{
            width: '100%', background: '#0f1629',
            borderRadius: '24px 24px 0 0',
            border: '1px solid rgba(255,255,255,0.08)',
            padding: '20px 16px 40px'
          }} onClick={(e) => e.stopPropagation()}>
            <div style={{ textAlign: 'center', marginBottom: 16 }}>
              <div style={{ width: 36, height: 4, background: 'rgba(255,255,255,0.15)', borderRadius: 99, margin: '0 auto 16px' }} />
              <div style={{ fontWeight: 700, fontSize: 15 }}>भाषा चुनें · Choose Language</div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
              {languages.map((lang) => (
                <button key={lang.code} onClick={() => { setSelectedLang(lang); setShowLangPicker(false); }}
                  style={{
                    background: selectedLang.code === lang.code ? 'rgba(99,102,241,0.15)' : 'rgba(255,255,255,0.04)',
                    border: `1px solid ${selectedLang.code === lang.code ? 'rgba(99,102,241,0.4)' : 'rgba(255,255,255,0.08)'}`,
                    borderRadius: 12, padding: '10px 8px', cursor: 'pointer',
                    fontFamily: "'Plus Jakarta Sans', sans-serif", textAlign: 'center'
                  }}>
                  <div style={{ fontSize: 18, marginBottom: 4 }}>{lang.flag}</div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: selectedLang.code === lang.code ? '#a5b4fc' : '#fff' }}>{lang.label}</div>
                  <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)', marginTop: 2 }}>{lang.name}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Chat Messages */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '16px', display: 'flex', flexDirection: 'column', gap: 12, paddingBottom: 220 }}>
        {messages.map((msg, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start', gap: 8, alignItems: 'flex-end' }}>
            {msg.role === 'agent' && (
              <div style={{
                width: 30, height: 30, borderRadius: '50%', flexShrink: 0,
                background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14
              }}>🪙</div>
            )}
            <div style={{ maxWidth: '75%' }}>
              <div style={{
                background: msg.role === 'user'
                  ? 'linear-gradient(135deg, #6366f1, #8b5cf6)'
                  : 'rgba(255,255,255,0.05)',
                border: msg.role === 'user' ? 'none' : '1px solid rgba(255,255,255,0.08)',
                borderRadius: msg.role === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                padding: '12px 14px',
              }}>
                <p style={{ fontSize: 14, lineHeight: 1.5, margin: 0, color: '#fff' }}>{msg.text}</p>
              </div>
              <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.25)', marginTop: 4, textAlign: msg.role === 'user' ? 'right' : 'left', paddingLeft: 4 }}>{msg.time}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Voice Panel */}
      <div style={{
        position: 'fixed', bottom: 0, left: 0, right: 0,
        background: 'rgba(6,9,18,0.97)', backdropFilter: 'blur(20px)',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        padding: '16px 16px 32px'
      }}>

        {/* Suggestions */}
        <div style={{ display: 'flex', gap: 8, overflowX: 'auto', marginBottom: 16, paddingBottom: 4 }}>
          {suggestions.map((s, i) => (
            <button key={i} onClick={() => sendMessage(s.hi)}
              style={{
                flexShrink: 0, background: 'rgba(99,102,241,0.08)',
                border: '1px solid rgba(99,102,241,0.2)',
                borderRadius: 20, padding: '6px 12px',
                fontSize: 12, color: '#a5b4fc', cursor: 'pointer', whiteSpace: 'nowrap',
                fontFamily: "'Plus Jakarta Sans', sans-serif"
              }}>{s.hi}</button>
          ))}
        </div>

        {/* Transcript Box */}
        {(transcript || listening) && (
          <div style={{
            background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.2)',
            borderRadius: 14, padding: '10px 14px', marginBottom: 12,
            fontSize: 14, color: listening ? '#a5b4fc' : '#fff', minHeight: 40
          }}>
            {listening ? `सुन रहा हूँ${dots}` : transcript}
          </div>
        )}

        {/* Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {/* Text Input */}
          <input
            value={transcript}
            onChange={(e) => setTranscript(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage(transcript)}
            placeholder="यहाँ टाइप करें या माइक दबाएं..."
            style={{
              flex: 1, background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 14, padding: '12px 14px',
              color: '#fff', fontSize: 14, outline: 'none',
              fontFamily: "'Plus Jakarta Sans', sans-serif"
            }}
          />
          {/* Send */}
          <button onClick={() => sendMessage(transcript)}
            style={{
              width: 46, height: 46, borderRadius: 14, border: 'none',
              background: 'rgba(99,102,241,0.2)', cursor: 'pointer',
              fontSize: 20, display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>➤</button>
          {/* Mic */}
          <button onClick={toggleListen}
            style={{
              width: 56, height: 56, borderRadius: '50%', border: 'none', cursor: 'pointer',
              background: listening
                ? 'linear-gradient(135deg, #ef4444, #f97316)'
                : 'linear-gradient(135deg, #6366f1, #8b5cf6)',
              fontSize: 22, display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: listening
                ? '0 0 0 8px rgba(239,68,68,0.15)'
                : '0 0 0 8px rgba(99,102,241,0.12)',
              transition: 'all 0.3s ease'
            }}>
            {listening ? '⏹' : '🎤'}
          </button>
        </div>
      </div>
    </div>
  );
}
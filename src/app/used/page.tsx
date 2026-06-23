'use client';
import { useState } from 'react';
import style from 'styled-jsx/style';

// USSD menu tree — mirrors real *99# flow
const MENU = {
  root: {
    title: 'ArthSaathi\nWelcome',
    options: [
      { label: '1. Financial Guide', next: 'guide' },
      { label: '2. Check Scam',      next: 'scam'  },
      { label: '3. Govt Schemes',    next: 'schemes'},
      { label: '4. Budget Planner',  next: 'budget' },
      { label: '5. Women / SHG',     next: 'sakhi'  },
      { label: '0. Exit',            next: 'exit'   },
    ],
  },
  guide: {
    title: 'Financial Guide',
    options: [
      { label: '1. What is UPI?',       next: 'ans_upi'    },
      { label: '2. What is SIP?',       next: 'ans_sip'    },
      { label: '3. How to save money?', next: 'ans_save'   },
      { label: '4. What is insurance?', next: 'ans_ins'    },
      { label: '9. Back',               next: 'root'       },
    ],
  },
  scam: {
    title: 'Scam Check',
    options: [
      { label: '1. Signs of a scam',   next: 'ans_scam1' },
      { label: '2. OTP fraud warning', next: 'ans_scam2' },
      { label: '3. Report: dial 1930', next: 'ans_scam3' },
      { label: '9. Back',              next: 'root'      },
    ],
  },
  schemes: {
    title: 'Govt Schemes',
    options: [
      { label: '1. PM-KISAN',  next: 'ans_kisan' },
      { label: '2. PMJDY',     next: 'ans_pmjdy' },
      { label: '3. PMSBY',     next: 'ans_pmsby' },
      { label: '4. MUDRA Loan',next: 'ans_mudra' },
      { label: '5. APY Pension',next:'ans_apy'   },
      { label: '9. Back',      next: 'root'      },
    ],
  },
  budget: {
    title: 'Budget Planner',
    options: [
      { label: '1. 50-30-20 rule', next: 'ans_503020' },
      { label: '2. Save ₹10/day', next: 'ans_10day'  },
      { label: '3. Irregular income', next: 'ans_irreg'},
      { label: '9. Back',          next: 'root'       },
    ],
  },
  sakhi: {
    title: 'Women & SHG',
    options: [
      { label: '1. What is SHG?',       next: 'ans_shg'   },
      { label: '2. Women schemes',      next: 'ans_wsch'  },
      { label: '3. Build credit (UPI)', next: 'ans_credit'},
      { label: '9. Back',               next: 'root'      },
    ],
  },
  // Answer screens
  ans_upi:    { title: 'UPI', answer: 'UPI lets you send/receive money instantly using your phone. You need a bank account and a UPI ID like yourname@bank.\n\nTo setup: open any banking app → Add bank account → Create UPI PIN.', options: [{ label: '9. Back', next: 'guide' }] },
  ans_sip:    { title: 'SIP', answer: 'A SIP lets you invest a fixed small amount every month in mutual funds. Start with just ₹100/month.\n\nOver 10 years at 12% return:\n₹500/month → ₹1.16 lakh\n₹1000/month → ₹2.32 lakh', options: [{ label: '9. Back', next: 'guide' }] },
  ans_save:   { title: 'How to save', answer: 'Save ₹10 every day = ₹3,650/year.\n\nTry the 50-30-20 rule:\n50% → needs (food, rent)\n30% → wants\n20% → savings\n\nKeep savings in a separate account so you don\'t spend it.', options: [{ label: '9. Back', next: 'guide' }] },
  ans_ins:    { title: 'Insurance', answer: 'Insurance protects you from big losses.\n\nFor ₹20/year — PMSBY gives ₹2 lakh accident cover.\nFor ₹330/year — PMJJBY gives ₹2 lakh life cover.\n\nBoth available at any bank branch.', options: [{ label: '9. Back', next: 'guide' }] },
  ans_scam1:  { title: 'Scam signs', answer: 'Warning signs of a scam:\n\n• Someone asks for your OTP\n• "You won a prize" messages\n• Urgent call from "bank"\n• Links like bit.ly/win50k\n• Requests to install remote apps\n\nWhen in doubt — HANG UP.', options: [{ label: '9. Back', next: 'scam' }] },
  ans_scam2:  { title: 'OTP Fraud', answer: 'NEVER share OTP with anyone.\n\nReal banks NEVER ask for your OTP, PIN, or password — not on call, not on WhatsApp, not ever.\n\nIf you shared OTP:\n1. Call your bank immediately\n2. Block your card\n3. Report to 1930', options: [{ label: '9. Back', next: 'scam' }] },
  ans_scam3:  { title: 'Report Fraud', answer: 'To report cyber fraud:\n\nCall: 1930 (Cyber Crime)\n\nOnline: cybercrime.gov.in\n\nFor UPI fraud:\nCall your bank helpline immediately and say "UPI fraud — block my account"\n\nAct within 30 minutes for best chance of recovery.', options: [{ label: '9. Back', next: 'scam' }] },
  ans_kisan:  { title: 'PM-KISAN', answer: 'PM-KISAN gives ₹6,000/year to small farmers — in 3 installments of ₹2,000.\n\nWho can apply:\n• Small/marginal farmers\n• Must have cultivable land\n• Aadhaar-linked bank account\n\nApply at: pmkisan.gov.in or nearest CSC.', options: [{ label: '9. Back', next: 'schemes' }] },
  ans_pmjdy:  { title: 'PMJDY', answer: 'PMJDY gives you:\n• Zero balance bank account\n• Free RuPay debit card\n• ₹1 lakh accident insurance\n• ₹30,000 life cover\n• Overdraft up to ₹10,000\n\nHow: Visit any bank with Aadhaar card. No minimum balance needed.', options: [{ label: '9. Back', next: 'schemes' }] },
  ans_pmsby:  { title: 'PMSBY', answer: 'PMSBY gives ₹2 lakh accident insurance for just ₹20/year.\n\nAge: 18–70 years\nNeed: Bank account with Aadhaar\n\nHow to join:\nGo to your bank and say "I want PMSBY" — they will deduct ₹20 from your account automatically each year.', options: [{ label: '9. Back', next: 'schemes' }] },
  ans_mudra:  { title: 'MUDRA Loan', answer: 'MUDRA loans for small businesses — no collateral needed.\n\nShishu: up to ₹50,000\nKishore: ₹50,000–₹5 lakh\nTarun: ₹5 lakh–₹10 lakh\n\nApply at any bank or NBFC. Need: Aadhaar, PAN, business proof.', options: [{ label: '9. Back', next: 'schemes' }] },
  ans_apy:    { title: 'APY Pension', answer: 'APY gives you ₹1,000–₹5,000/month pension after age 60.\n\nPay just ₹42–₹210/month (depending on age and pension amount).\n\nYounger you start, lower the monthly payment.\n\nJoin at any bank or post office with Aadhaar.', options: [{ label: '9. Back', next: 'schemes' }] },
  ans_503020: { title: '50-30-20 Rule', answer: 'Split your income into 3 parts:\n\n50% → Needs\n(food, rent, medicine, transport)\n\n30% → Wants\n(clothes, entertainment)\n\n20% → Savings\n(emergency fund, investment)\n\nExample: ₹10,000 income\nNeeds ₹5,000 | Wants ₹3,000 | Save ₹2,000', options: [{ label: '9. Back', next: 'budget' }] },
  ans_10day:  { title: 'Save ₹10/day', answer: '₹10 saved every day:\n\n1 month → ₹300\n1 year  → ₹3,650\n5 years → ₹18,250\n10 years (with interest) → ₹45,000+\n\nTip: Set aside ₹10 every morning before spending anything. Small habits build big wealth.', options: [{ label: '9. Back', next: 'budget' }] },
  ans_irreg:  { title: 'Irregular Income', answer: 'For daily wages or seasonal income:\n\n1. Track every payment you receive\n2. Budget based on your LOWEST monthly income\n3. Save extra during good months\n4. Keep 3 months expenses as emergency fund\n\nUse ArthSaathi PlannerBot when online for a custom plan.', options: [{ label: '9. Back', next: 'budget' }] },
  ans_shg:    { title: 'Self Help Group', answer: 'A SHG is a group of 10–20 women who:\n• Save a small amount every week\n• Give loans to members at low interest\n• Support each other financially\n\nBenefits:\n• Access credit without bank\n• Build savings together\n• Get MUDRA loans as a group', options: [{ label: '9. Back', next: 'sakhi' }] },
  ans_wsch:   { title: 'Women Schemes', answer: 'Key schemes for women:\n\n• Sukanya Samriddhi: savings for girl child — 8.2% interest\n• PM Mahila Shakti: business loans for women\n• MUDRA Yojana: up to ₹10L for women entrepreneurs\n• PMJDY: zero-balance account for all women\n\nVisit nearest bank or CSC to apply.', options: [{ label: '9. Back', next: 'sakhi' }] },
  ans_credit: { title: 'Build Credit', answer: 'If you have no credit score:\n\n1. Make all UPI payments on time\n2. Repay SHG loans regularly\n3. Open a savings account (PMJDY)\n4. Pay utility bills via UPI\n\nAfter 6 months of this history, ArthSaathi CreditPath can help you get a formal loan. Use the app when online.', options: [{ label: '9. Back', next: 'sakhi' }] },
  exit: { title: 'Goodbye', answer: 'Thank you for using ArthSaathi.\n\nFor any help:\nDial *99# anytime\nCall 1930 for fraud\n\nStay safe. Save smart.', options: [{ label: '0. Home', next: 'root' }] },
};

export default function UssdPage() {
  type ScreenKey = keyof typeof MENU;

    const [screen, setScreen] = useState<ScreenKey>('root');
    const [history, setHistory] = useState<ScreenKey[]>([]);

    const current = MENU[screen];
  
  
  const isAnswer = "answer" in current;

  function navigate(next: ScreenKey) {
  if (next === 'root') {
    setHistory([]);
    setScreen('root');
    return;
  }

  setHistory((h) => [...h, screen]);
  setScreen(next);
}
  function goBack() {
    if (history.length === 0) return;
    const prev = history[history.length - 1];
    setHistory(h => h.slice(0, -1));
    setScreen(prev);
  }

  return (
    <div style={{
      minHeight: '100vh', background: '#0d0d1a',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      padding: '1rem', fontFamily: 'monospace',
    }}>
      {/* Phone frame */}
      <div style={{
        width: '100%', maxWidth: 360,
        background: '#1a1a2e', borderRadius: 20,
        border: '2px solid #333', overflow: 'hidden',
        boxShadow: '0 0 40px rgba(0,0,0,0.5)',
      }}>
        {/* Status bar */}
        <div style={{
          background: '#111', padding: '8px 16px',
          display: 'flex', justifyContent: 'space-between',
          fontSize: 11, color: '#888',
        }}>
          <span>ArthSaathi USSD</span>
          <span>*99# Mode 📴</span>
        </div>

        {/* USSD Screen */}
        <div style={{
          background: '#0a0a1a', minHeight: 280,
          padding: '20px 16px', color: '#00ff88',
          fontSize: 14, lineHeight: 1.7,
          borderBottom: '1px solid #222',
        }}>
          <div style={{ color: '#888', fontSize: 11, marginBottom: 8 }}>
            USSD SESSION ACTIVE — *99#
          </div>
          <div style={{
            color: '#00ff88', fontWeight: 700, fontSize: 15,
            marginBottom: 12, whiteSpace: 'pre-line',
          }}>
            {current.title}
          </div>

          {isAnswer && (
            <div style={{
              color: '#ccc', fontSize: 13, whiteSpace: 'pre-line',
              marginBottom: 16, lineHeight: 1.65,
            }}>
              {current.answer}
            </div>
          )}

          {!isAnswer && current.options.map((opt, i) => (
            <div key={i} style={{ color: '#aaa', padding: '2px 0', fontSize: 13 }}>
              {opt.label}
            </div>
          ))}
        </div>

        {/* Keypad area */}
        <div style={{ padding: '16px', background: '#111' }}>
          <div style={{ fontSize: 11, color: '#555', marginBottom: 10, textAlign: 'center' }}>
            ENTER OPTION NUMBER
          </div>
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8,
          }}>
            {current.options.map((opt, i) => {
              const num = opt.label.split('.')[0];
              return (
                <button
                  key={i}
                  onClick={() => navigate(opt.next as ScreenKey)}
                  style={{
                    background: '#1a1a2e', border: '1px solid #333',
                    color: '#00ff88', borderRadius: 8,
                    padding: '10px 4px', fontSize: 13, fontWeight: 600,
                    cursor: 'pointer', fontFamily: 'monospace',
                  }}
                >
                  {num}
                </button>
              );
            })}
          </div>

          {history.length > 0 && (
            <button
              onClick={goBack}
              style={{
                width: '100%', marginTop: 10,
                background: '#222', border: '1px solid #333',
                color: '#888', borderRadius: 8,
                padding: '8px', fontSize: 12, cursor: 'pointer',
                fontFamily: 'monospace',
              }}
            >
              ← Back
            </button>
          )}
        </div>
      </div>

      <p style={{ color: '#555', fontSize: 12, marginTop: 16, textAlign: 'center' }}>
        This simulates the real *99# USSD experience.<br />
        On any phone, dial <strong style={{ color: '#00ff88' }}>*99#</strong> — no internet needed.
      </p>
    </div>
  );
}
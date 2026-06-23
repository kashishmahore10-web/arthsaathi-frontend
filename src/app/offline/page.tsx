import Link from 'next/link';

export default function OfflinePage() {
  return (
    <div style={{
      minHeight: '100vh', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      padding: '2rem', background: '#f8f9fa', textAlign: 'center',
    }}>
      <div style={{ fontSize: 64, marginBottom: 16 }}>📴</div>

      <h1 style={{ fontSize: 24, fontWeight: 700, color: '#1a1a2e', marginBottom: 8 }}>
        You are offline
      </h1>
      <p style={{ color: '#666', fontSize: 15, maxWidth: 320, lineHeight: 1.6, marginBottom: 32 }}>
        This page is not cached yet. But ArthSaathi still works for you — use USSD mode below.
      </p>

      {/* USSD Card */}
      <div style={{
        background: '#1a1a2e', color: '#fff',
        borderRadius: 16, padding: '24px 32px',
        marginBottom: 24, maxWidth: 320, width: '100%',
      }}>
        <div style={{ fontSize: 32, marginBottom: 8 }}>📞</div>
        <div style={{ fontSize: 28, fontWeight: 800, letterSpacing: 2, marginBottom: 4 }}>*99#</div>
        <div style={{ fontSize: 13, opacity: 0.8 }}>
          Dial from any mobile phone.<br />
          Works without internet. Works on any phone.
        </div>
      </div>

      {/* What USSD can do */}
      <div style={{
        background: '#fff', borderRadius: 12, padding: '16px 20px',
        maxWidth: 320, width: '100%', textAlign: 'left',
        border: '1px solid #e0e0e0', marginBottom: 24,
      }}>
        <p style={{ fontSize: 13, fontWeight: 600, color: '#1a1a2e', marginBottom: 10 }}>
          Via *99# you can:
        </p>
        {[
          '✓ Check bank balance',
          '✓ Send & receive money',
          '✓ Check PM-KISAN status',
          '✓ Get scam alert info',
          '✓ Find government schemes',
        ].map(item => (
          <div key={item} style={{ fontSize: 13, color: '#444', padding: '4px 0' }}>{item}</div>
        ))}
      </div>

      <Link href="/" style={{
        background: '#378ADD', color: '#fff',
        padding: '12px 28px', borderRadius: 8,
        fontWeight: 600, textDecoration: 'none', fontSize: 14,
      }}>
        Try reconnecting →
      </Link>
    </div>
  );
}
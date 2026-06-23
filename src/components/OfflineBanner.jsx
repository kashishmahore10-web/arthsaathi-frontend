'use client';
import { useOffline } from '@/hooks/useOffline';
import Link from 'next/link';

export default function OfflineBanner() {
  const { isOffline, wasOffline } = useOffline();

  if (!isOffline && !wasOffline) return null;

  // Back online toast
  if (!isOffline && wasOffline) {
    return (
      <div style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 9999,
        background: '#1D9E75', color: '#fff',
        padding: '10px 16px',
        display: 'flex', alignItems: 'center', gap: 8,
        fontSize: 14, fontWeight: 500,
        animation: 'slideDown 0.3s ease',
      }}>
        <span>✓</span>
        <span>Back online! All features available.</span>
      </div>
    );
  }

  // Offline banner
  return (
    <div style={{
      position: 'sticky', top: 0, zIndex: 9999,
      background: '#1a1a2e', color: '#fff',
      padding: '10px 16px',
      fontSize: 13,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 16 }}>📴</span>
          <div>
            <span style={{ fontWeight: 600 }}>You are offline.</span>
            <span style={{ opacity: 0.8, marginLeft: 6 }}>
              Showing cached answers. Basic features still work.
            </span>
          </div>
        </div>
        <Link
          href="/ussd"
          style={{
            background: '#378ADD', color: '#fff',
            padding: '5px 12px', borderRadius: 6,
            fontSize: 12, fontWeight: 600,
            textDecoration: 'none', whiteSpace: 'nowrap',
          }}
        >
          Use USSD Mode →
        </Link>
      </div>

      <div style={{
        marginTop: 8, padding: '8px 12px',
        background: 'rgba(255,255,255,0.08)', borderRadius: 6,
        fontSize: 12, opacity: 0.9,
      }}>
        💡 Dial <strong>*99#</strong> from any mobile — works without internet on any phone
      </div>
    </div>
  );
}
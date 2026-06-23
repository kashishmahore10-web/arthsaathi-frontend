'use client';
import { useState, useEffect } from 'react';

export function useOffline() {
  const [isOffline, setIsOffline] = useState(false);
  const [wasOffline, setWasOffline] = useState(false);

  useEffect(() => {
    // Set initial state
    setIsOffline(!navigator.onLine);

    const goOffline = () => {
      setIsOffline(true);
      setWasOffline(true);
    };

    const goOnline = () => {
      setIsOffline(false);
      // Show "back online" toast for 3 seconds
      setTimeout(() => setWasOffline(false), 3000);
    };

    window.addEventListener('offline', goOffline);
    window.addEventListener('online', goOnline);

    return () => {
      window.removeEventListener('offline', goOffline);
      window.removeEventListener('online', goOnline);
    };
  }, []);

  return { isOffline, wasOffline };
}



import { useState, useEffect } from 'react';
import { syncManager } from '../lib/syncManager';

export function useSyncStatus() {
  const [status, setStatus] = useState<'idle' | 'syncing' | 'error'>('idle');
  const [pendingCount, setPendingCount] = useState(0);

  useEffect(() => {
    const unsubscribe = syncManager.subscribe((newStatus, count) => {
      setStatus(newStatus);
      setPendingCount(count);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return { status, pendingCount };
}

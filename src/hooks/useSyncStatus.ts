import { useState, useEffect } from 'react';
import { syncManager } from '../lib/syncManager';

export function useSyncStatus() {
  const [status, setStatus] = useState<'idle' | 'syncing' | 'error'>('idle');
  const [pendingCount, setPendingCount] = useState(0);
  const [progress, setProgress] = useState<{ completed: number; total: number } | undefined>(undefined);

  useEffect(() => {
    const unsubscribe = syncManager.subscribe((newStatus, count, currentProgress) => {
      setStatus(newStatus);
      setPendingCount(count);
      setProgress(currentProgress);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return { status, pendingCount, progress };
}

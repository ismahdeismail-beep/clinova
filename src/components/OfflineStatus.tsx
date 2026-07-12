import React, { useState, useEffect } from 'react';
import { Wifi, WifiOff, X, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export function OfflineStatus() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [showToast, setShowToast] = useState(false);
  const [toastType, setToastType] = useState<'online' | 'offline'>('online');

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setToastType('online');
      setShowToast(true);
      
      // Auto dismiss online toast after 3.5 seconds
      const timer = setTimeout(() => {
        setShowToast(false);
      }, 3500);
      return () => clearTimeout(timer);
    };

    const handleOffline = () => {
      setIsOnline(false);
      setToastType('offline');
      setShowToast(true);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Initial check (if loaded while offline, show the warning immediately)
    if (!navigator.onLine) {
      setIsOnline(false);
      setToastType('offline');
      setShowToast(true);
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <>
      <AnimatePresence>
        {showToast && (
          <div className="fixed top-20 right-4 z-50 pointer-events-none select-none max-w-sm w-full p-4 md:right-6">
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className={`pointer-events-auto flex items-start gap-3.5 p-4 rounded-2xl shadow-xl border backdrop-blur-md ${
                toastType === 'offline'
                  ? 'bg-amber-950/90 border-amber-500/35 text-amber-100'
                  : 'bg-emerald-950/90 border-emerald-500/35 text-emerald-100'
              }`}
            >
              <div className="mt-0.5 shrink-0">
                {toastType === 'offline' ? (
                  <div className="p-2 rounded-xl bg-amber-500/15 text-amber-400 animate-pulse">
                    <WifiOff size={18} />
                  </div>
                ) : (
                  <div className="p-2 rounded-xl bg-emerald-500/15 text-emerald-400">
                    <Wifi size={18} />
                  </div>
                )}
              </div>

              <div className="flex-1 space-y-1">
                <h4 className="text-sm font-bold tracking-tight">
                  {toastType === 'offline' ? 'Offline Mode Active' : 'Back Online'}
                </h4>
                <p className="text-xs opacity-85 leading-relaxed">
                  {toastType === 'offline'
                    ? 'Clinova OS is running offline. Your local medical guides, case files, and triage databases are fully accessible.'
                    : 'System connection re-established. Background cloud database syncing resumed.'}
                </p>
                {toastType === 'offline' && (
                  <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full mt-1.5">
                    <Sparkles size={10} /> Powered by Local Cache
                  </span>
                )}
              </div>

               <button
                type="button"
                onClick={() => setShowToast(false)}
                aria-label="Dismiss notification"
                className="text-current opacity-60 hover:opacity-100 p-1 rounded-lg hover:bg-white/5 transition-colors cursor-pointer shrink-0"
              >
                <X size={15} />
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Subtle, permanent indicator in footer/corner when offline and toast is closed */}
      {!isOnline && !showToast && (
        <div className="fixed bottom-6 left-6 z-40 bg-amber-500/10 hover:bg-amber-500/15 border border-amber-500/25 px-3 py-1.5 rounded-full text-amber-400 text-xs font-semibold flex items-center gap-1.5 backdrop-blur-md shadow-lg animate-pulse">
          <WifiOff size={13} />
          <span>Offline</span>
        </div>
      )}
    </>
  );
}

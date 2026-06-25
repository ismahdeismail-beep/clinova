import React, { useState, useEffect } from 'react';
import { WifiOff, Wifi } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export function OfflineStatus() {
  const [isOnline, setIsOnline] = useState(typeof navigator !== 'undefined' ? navigator.onLine : true);
  const [showRestored, setShowRestored] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setShowRestored(true);
      setTimeout(() => setShowRestored(false), 3000);
    };
    
    const handleOffline = () => {
      setIsOnline(false);
      setShowRestored(false);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <AnimatePresence>
      {(!isOnline || showRestored) && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          className="fixed top-0 left-0 right-0 z-50 flex justify-center mt-2 pointer-events-none"
        >
          <div 
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium shadow-lg pointer-events-auto transition-colors ${
              !isOnline 
                ? 'bg-amber-500/90 text-white backdrop-blur-sm' 
                : 'bg-emerald-500/90 text-white backdrop-blur-sm'
            }`}
          >
            {!isOnline ? (
              <>
                <WifiOff size={16} />
                <span>You are currently offline. Changes will be synced when connection is restored.</span>
              </>
            ) : (
              <>
                <Wifi size={16} />
                <span>Connection restored. Syncing data...</span>
              </>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

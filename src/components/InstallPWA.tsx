import React, { useEffect, useState } from 'react';
import { Download, X, Smartphone, Zap, Shield, Share } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: Array<string>;
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed',
    platform: string
  }>;
  prompt(): Promise<void>;
}

export function InstallPWA() {
  const [showModal, setShowModal] = useState(false);
  const [showFloatingBtn, setShowFloatingBtn] = useState(false);
  const [promptInstall, setPromptInstall] = useState<BeforeInstallPromptEvent | null>(null);
  const [isIOSDevice, setIsIOSDevice] = useState(false);
  const [isSafariBrowser, setIsSafariBrowser] = useState(false);

  useEffect(() => {
    // 1. Check if already installed / standalone
    const isStandalone = 
      window.matchMedia('(display-mode: standalone)').matches ||
      (navigator as any).standalone === true ||
      document.referrer.includes('android-app://');

    if (isStandalone) {
      return; // Do not show anything if already installed
    }

    // 2. Detect iOS & Safari
    const ua = navigator.userAgent;
    const ios = /iPad|iPhone|iPod/.test(ua) && !(window as any).MSStream;
    const safari = /Safari/.test(ua) && !/CriOS/.test(ua) && !/FxiOS/.test(ua);
    setIsIOSDevice(ios);
    setIsSafariBrowser(safari);

    // 3. Listen for browser install prompt (Android/Chrome/Windows)
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setPromptInstall(e as BeforeInstallPromptEvent);
      
      // Check if user dismissed the prompt recently (snoozed for 24 hours)
      const dismissedTime = localStorage.getItem('clinova-pwa-dismissed-time');
      const now = Date.now();
      const oneDay = 24 * 60 * 60 * 1000;

      if (!dismissedTime || now - parseInt(dismissedTime, 10) > oneDay) {
        // Auto-show modal to prompt download if not recently dismissed
        setShowModal(true);
      } else {
        // Otherwise, just show a subtle floating action button
        setShowFloatingBtn(true);
      }
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // 4. For iOS devices, we don't get 'beforeinstallprompt', so we show custom prompt
    if (ios && safari) {
      const dismissedTime = localStorage.getItem('clinova-pwa-dismissed-time');
      const now = Date.now();
      const oneDay = 24 * 60 * 60 * 1000;

      if (!dismissedTime || now - parseInt(dismissedTime, 10) > oneDay) {
        // Auto show instruction modal on iOS Safari if not dismissed recently
        setShowModal(true);
      } else {
        setShowFloatingBtn(true);
      }
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!promptInstall) return;
    
    // Trigger browser installation prompt
    await promptInstall.prompt();
    const { outcome } = await promptInstall.userChoice;
    
    if (outcome === 'accepted') {
      setShowModal(false);
      setShowFloatingBtn(false);
    }
  };

  const handleDismiss = () => {
    // Snooze prompt for 24 hours
    localStorage.setItem('clinova-pwa-dismissed-time', Date.now().toString());
    setShowModal(false);
    setShowFloatingBtn(false); // Do not show the floating button if they dismissed
  };

  const handleFloatingClick = () => {
    setShowModal(true);
    setShowFloatingBtn(false);
  };

  // If already standalone, or PWA install is not supported and not iOS Safari, show nothing
  if (!promptInstall && !(isIOSDevice && isSafariBrowser)) {
    return null;
  }

  return (
    <>
      <AnimatePresence>
        {/* Unobtrusive Floating Trigger Button */}
        {showFloatingBtn && (
          <motion.button
            id="pwa-floating-btn"
            initial={{ scale: 0, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0, opacity: 0, y: 50 }}
            onClick={handleFloatingClick}
            className="fixed bottom-6 right-6 z-40 bg-[var(--primary)] text-white p-3.5 rounded-full shadow-2xl hover:scale-105 transition-transform flex items-center justify-center border border-white/10 group cursor-pointer"
            title="Install Clinova OS App"
          >
            <Download className="w-5 h-5 group-hover:animate-bounce" />
            <span className="max-w-0 overflow-hidden group-hover:max-w-xs group-hover:ml-2 transition-all duration-300 font-medium text-sm whitespace-nowrap">
              Install App
            </span>
          </motion.button>
        )}

        {/* Highly Immersive Promo Installer Modal */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              id="pwa-install-modal"
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-md overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-2xl backdrop-blur-md"
            >
              {/* Close Button */}
              <button
                onClick={handleDismiss}
                className="absolute top-4 right-4 p-1.5 rounded-lg text-[var(--text-muted)] hover:bg-[var(--surface-dim)] hover:text-[var(--text)] transition-colors cursor-pointer"
                title="Dismiss"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Unique Launcher Logo Header */}
              <div className="flex flex-col items-center text-center mt-2 mb-6">
                <div className="relative mb-4 group">
                  {/* Glowing backdrop effect */}
                  <div className="absolute inset-0 bg-[var(--primary)] rounded-2xl opacity-35 blur-xl group-hover:opacity-50 transition-opacity"></div>
                  <img
                    src="/clinova_logo.jpg"
                    alt="Clinova OS Logo"
                    referrerPolicy="no-referrer"
                    className="relative w-20 h-20 rounded-2xl shadow-xl object-cover border border-white/20"
                  />
                  <div className="absolute -bottom-1 -right-1 bg-[var(--primary)] text-white p-1 rounded-full border border-[var(--surface)]">
                    <Smartphone className="w-3.5 h-3.5" />
                  </div>
                </div>

                <h3 className="text-xl font-bold tracking-tight text-[var(--text)]">
                  Clinova OS Native App
                </h3>
                <p className="text-sm text-[var(--text-muted)] mt-1">
                  Clinical Intelligence System
                </p>
              </div>

              {/* Native App Benefits */}
              <div className="space-y-4 mb-6">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-[var(--primary-container)] text-[var(--primary)] mt-0.5">
                    <Zap className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-[var(--text)]">Instant Loading</h4>
                    <p className="text-xs text-[var(--text-muted)]">Launches immediately from your home screen dock with zero browser overhead.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-[var(--primary-container)] text-[var(--primary)] mt-0.5">
                    <Shield className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-[var(--text)]">Offline Clinical Reliability</h4>
                    <p className="text-xs text-[var(--text-muted)]">Maintains access to medicine guides, triage, and handbook references offline.</p>
                  </div>
                </div>
              </div>

              {/* Action Area */}
              {isIOSDevice && isSafariBrowser ? (
                /* Custom Instructions for iOS Safari */
                <div className="border border-[var(--border)] rounded-xl bg-[var(--surface-dim)] p-4 space-y-3.5">
                  <p className="text-xs font-medium text-center text-[var(--text)] flex items-center justify-center gap-1.5">
                    <Share className="w-4 h-4 text-[var(--primary)]" />
                    iOS Installation Instructions
                  </p>
                  <div className="text-xs space-y-2.5 text-[var(--text-muted)]">
                    <div className="flex items-center gap-2">
                      <span className="flex items-center justify-center w-5 h-5 rounded-full bg-[var(--primary-container)] text-[var(--primary)] font-bold text-[10px]">1</span>
                      <span>Tap the Safari <span className="font-semibold text-[var(--text)]">Share button</span> at the bottom of the screen.</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="flex items-center justify-center w-5 h-5 rounded-full bg-[var(--primary-container)] text-[var(--primary)] font-bold text-[10px]">2</span>
                      <span>Scroll down and select <span className="font-semibold text-[var(--text)]">"Add to Home Screen"</span>.</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="flex items-center justify-center w-5 h-5 rounded-full bg-[var(--primary-container)] text-[var(--primary)] font-bold text-[10px]">3</span>
                      <span>Tap <span className="font-semibold text-[var(--text)]">"Add"</span> in the top-right corner to complete.</span>
                    </div>
                  </div>
                  <button
                    onClick={handleDismiss}
                    className="w-full bg-[var(--surface-dim)] text-[var(--text)] hover:bg-[var(--border)] border border-[var(--border)] font-medium text-sm py-2 px-4 rounded-xl transition-colors cursor-pointer mt-2"
                  >
                    Got It
                  </button>
                </div>
              ) : (
                /* Standard Browser Direct Installer Trigger */
                <div className="flex flex-col gap-2">
                  <button
                    onClick={handleInstallClick}
                    className="w-full bg-[var(--primary)] text-white hover:bg-[var(--primary-hover)] font-semibold text-sm py-2.5 px-4 rounded-xl shadow-lg shadow-[var(--primary)]/10 transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                    <span>Install Clinova OS</span>
                  </button>
                  <button
                    onClick={handleDismiss}
                    className="w-full text-xs text-[var(--text-muted)] hover:text-[var(--text)] transition-colors py-2 font-medium cursor-pointer"
                  >
                    Maybe Later
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

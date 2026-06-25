import React, { useEffect, useState } from 'react';
import { Download } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: Array<string>;
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed',
    platform: string
  }>;
  prompt(): Promise<void>;
}

export function InstallPWA() {
  const [supportsPWA, setSupportsPWA] = useState(false);
  const [promptInstall, setPromptInstall] = useState<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setSupportsPWA(true);
      setPromptInstall(e as BeforeInstallPromptEvent);
    };
    
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const onClick = async () => {
    if (!promptInstall) return;
    await promptInstall.prompt();
    const { outcome } = await promptInstall.userChoice;
    if (outcome === 'accepted') {
      setSupportsPWA(false);
    }
  };

  if (!supportsPWA) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-[var(--surface)] border border-[var(--border)] p-4 rounded-xl shadow-lg flex items-center gap-4 max-w-sm">
      <div className="flex-1">
        <h4 className="text-sm font-semibold text-[var(--text)]">Install Clinova</h4>
        <p className="text-xs text-[var(--text-muted)] mt-1">Install the app on your device for a better experience and offline access.</p>
      </div>
      <button 
        onClick={onClick}
        className="flex items-center justify-center gap-2 bg-[var(--primary)] text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-[var(--primary-hover)] transition-colors"
      >
        <Download className="w-4 h-4" />
        <span>Install</span>
      </button>
    </div>
  );
}

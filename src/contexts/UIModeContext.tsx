import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react';

export type UIMode = 'simple' | 'clinical';

interface UIModeContextValue {
  mode: UIMode;
  setMode: (mode: UIMode) => void;
  toggleMode: () => void;
  isSimple: boolean;
  isClinical: boolean;
}

const UIModeContext = createContext<UIModeContextValue | null>(null);

const STORAGE_KEY = 'clinova-ui-mode';

export function UIModeProvider({ children }: { children: ReactNode }) {
  const [mode, setModeState] = useState<UIMode>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === 'simple' || stored === 'clinical') return stored;
    } catch { }
    const role = localStorage.getItem('clinova-role');
    return role === 'admin' || role === 'clinician' ? 'clinical' : 'simple';
  });

  const setMode = useCallback((newMode: UIMode) => {
    setModeState(newMode);
    try {
      localStorage.setItem(STORAGE_KEY, newMode);
    } catch { }
  }, []);

  const toggleMode = useCallback(() => {
    setMode(mode === 'simple' ? 'clinical' : 'simple');
  }, [mode, setMode]);

  useEffect(() => {
    document.documentElement.setAttribute('data-ui-mode', mode);
  }, [mode]);

  return (
    <UIModeContext.Provider value={{ mode, setMode, toggleMode, isSimple: mode === 'simple', isClinical: mode === 'clinical' }}>
      {children}
    </UIModeContext.Provider>
  );
}

export function useUIMode(): UIModeContextValue {
  const ctx = useContext(UIModeContext);
  if (!ctx) throw new Error('useUIMode must be used within UIModeProvider');
  return ctx;
}

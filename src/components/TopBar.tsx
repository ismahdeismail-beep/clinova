import { memo } from 'react';
import { Search, Bell, Home, Eye, EyeOff, Cloud, CloudOff, RefreshCw, CheckCircle2 } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import { useUIMode } from '../contexts/UIModeContext';
import { useOnlineStatus } from '../hooks/useOnlineStatus';
import { useSyncStatus } from '../hooks/useSyncStatus';
import type { ViewState } from '../types';

interface TopBarProps {
  activeView: ViewState;
}

const TITLE_MAP: Record<string, string> = {
  login: '',
  dashboard: 'Dashboard',
  tree: 'Decision Tree',
  study: 'Knowledge Engine',
  pharma: 'Reasoning Engine',
  case: 'Risk Simulator',
  settings: 'Settings',
  patients: 'Patients',
  'new-case': 'New Case',
  pharmacotherapy: 'Pharmacotherapy Review',
  'drug-index': 'Drug Index',
  'knowledge-base': 'Knowledge Base',
};

const SIMPLE_TITLE_MAP: Record<string, string> = {
  dashboard: 'Home',
  study: 'Study Tools',
  pharma: 'Medications',
  case: 'Simulations',
  settings: 'Settings',
  patients: 'Patients',
};

function TopBar({ activeView }: TopBarProps) {
  const { isSimple, toggleMode } = useUIMode();
  const titleMap = isSimple ? { ...TITLE_MAP, ...SIMPLE_TITLE_MAP } : TITLE_MAP;
  const title = activeView !== 'login' ? titleMap[activeView] || 'Clinova' : '';

  const isOnline = useOnlineStatus();
  const { status, pendingCount } = useSyncStatus();

  const handleHome = () => {
    window.dispatchEvent(new CustomEvent('clinova:navigate', { detail: { view: 'dashboard' } }));
  };

  return (
    <header className="topbar h-16 flex items-center justify-between px-4 md:px-6 shrink-0">
      <div className="flex items-center gap-3">
        {activeView !== 'dashboard' && activeView !== 'login' && (
          <button
            onClick={handleHome}
            className="p-1.5 rounded-lg text-[var(--text-muted)] hover:text-[var(--primary)] hover:bg-[var(--surface-dim)] transition-colors"
            title="Dashboard Home"
          >
            <Home size={18} />
          </button>
        )}
        <h2 className="text-lg font-semibold text-[var(--text)]">{title}</h2>
      </div>
      <div className="flex items-center gap-2">
        {activeView !== 'login' && (
          <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 bg-[var(--surface)] border border-[var(--border)] rounded-full text-xs font-medium" title={!isOnline ? 'Offline' : status === 'syncing' ? 'Syncing changes...' : pendingCount > 0 ? `${pendingCount} changes pending` : 'All changes synced'}>
            {!isOnline ? (
              <>
                <CloudOff size={14} className="text-red-500" />
                <span className="text-[var(--text-muted)]">Offline</span>
                {pendingCount > 0 && <span className="text-xs bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 px-1.5 py-0.5 rounded-full ml-1">{pendingCount}</span>}
              </>
            ) : status === 'syncing' ? (
              <>
                <RefreshCw size={14} className="text-blue-500 animate-spin" />
                <span className="text-blue-500">Syncing...</span>
              </>
            ) : pendingCount > 0 ? (
              <>
                <Cloud size={14} className="text-amber-500" />
                <span className="text-amber-600 dark:text-amber-400">Pending ({pendingCount})</span>
              </>
            ) : (
              <>
                <CheckCircle2 size={14} className="text-emerald-500" />
                <span className="text-[var(--text-muted)]">Up to date</span>
              </>
            )}
          </div>
        )}
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 border border-[var(--border)] rounded-lg bg-[var(--surface-dim)] ml-2">
          <Search size={16} className="text-[var(--text-dim)]" />
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent border-none focus:outline-none text-sm w-40 text-[var(--text)] placeholder:text-[var(--text-dim)]"
          />
        </div>
        <button
          onClick={toggleMode}
          className="p-1.5 rounded-lg text-[var(--text-muted)] hover:text-[var(--primary)] hover:bg-[var(--surface-dim)] transition-colors"
          title={isSimple ? 'Switch to Clinical view' : 'Switch to Simple view'}
        >
          {isSimple ? <Eye size={18} /> : <EyeOff size={18} />}
        </button>
        <button className="p-1.5 rounded-lg text-[var(--text-muted)] hover:text-[var(--primary)] hover:bg-[var(--surface-dim)] transition-colors">
          <Bell size={18} />
        </button>
        <ThemeToggle />
      </div>
    </header>
  );
}

export default memo(TopBar);

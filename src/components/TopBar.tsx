import { memo } from 'react';
import { Search, Bell, Home } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
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

function TopBar({ activeView }: TopBarProps) {
  const title = activeView !== 'login' ? TITLE_MAP[activeView] || 'Clinova' : '';

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
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 border border-[var(--border)] rounded-lg bg-[var(--surface-dim)]">
          <Search size={16} className="text-[var(--text-dim)]" />
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent border-none focus:outline-none text-sm w-40 text-[var(--text)] placeholder:text-[var(--text-dim)]"
          />
        </div>
        <button className="p-1.5 rounded-lg text-[var(--text-muted)] hover:text-[var(--primary)] hover:bg-[var(--surface-dim)] transition-colors">
          <Bell size={18} />
        </button>
        <ThemeToggle />
      </div>
    </header>
  );
}

export default memo(TopBar);

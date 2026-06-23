import { memo } from 'react';
import { Search, Bell, Home } from 'lucide-react';
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
    <header className="h-16 border-b border-[#E2E8F0] bg-white flex items-center justify-between px-4 md:px-6 shrink-0">
      <div className="flex items-center gap-3">
        {activeView !== 'dashboard' && activeView !== 'login' && (
          <button
            onClick={handleHome}
            className="text-[#64748B] hover:text-[#2563EB] p-1.5 rounded-lg hover:bg-[#F8FAFC] transition-colors"
            title="Dashboard Home"
          >
            <Home size={18} />
          </button>
        )}
        <h2 className="text-lg font-semibold text-[#0F172A]">{title}</h2>
      </div>
      <div className="flex items-center gap-4">
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 border border-[#E2E8F0] rounded-lg bg-[#F8FAFC]">
          <Search size={16} className="text-[#94A3B8]" />
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent border-none focus:outline-none text-sm w-40 text-[#0F172A] placeholder:text-[#94A3B8]"
          />
        </div>
        <button className="text-[#64748B] hover:text-[#2563EB] p-1.5 rounded-lg hover:bg-[#F8FAFC]">
          <Bell size={18} />
        </button>
      </div>
    </header>
  );
}

export default memo(TopBar);

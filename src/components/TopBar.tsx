import { memo, useMemo } from 'react';
import { Menu, Search, Brain, Bell } from 'lucide-react';
import type { ViewState } from '../types';

interface TopBarProps {
  activeView: ViewState;
}

const TITLE_MAP: Record<ViewState, string> = {
  dashboard: 'Canvas',
  tree: 'Decision Tree',
  study: 'Knowledge Engine',
  pharma: 'Reasoning Engine',
  case: 'Risk Simulator',
  settings: 'Settings & Privacy',
  admin: 'Governance Console',
  login: 'Core OS',
};

function TopBar({ activeView }: TopBarProps) {
  const title = useMemo(() => TITLE_MAP[activeView] ?? 'Core OS', [activeView]);

  return (
    <header className="fixed top-0 right-0 w-full md:w-[calc(100%-18rem)] z-30 h-16 bg-surface border-b border-outline-variant flex items-center justify-between px-6 md:px-8">
      <div className="flex items-center gap-4">
        <button className="md:hidden text-primary hover:bg-surface-container-high p-2 rounded-lg">
          <Menu size={24} />
        </button>
        <div className="flex flex-col">
          <h2 className="text-xl font-bold tracking-tight text-primary">{title}</h2>
          <div className="flex items-center gap-2 hidden sm:flex">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            <p className="text-[10px] font-semibold text-on-surface-variant uppercase tracking-tighter">Session: Encrypted & Anonymous</p>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-6">
        <div className="hidden lg:flex items-center gap-4 px-4 py-2 border border-outline-variant rounded-lg bg-surface-container-low focus-within:cyan-glow transition-all">
          <Search size={18} className="text-on-surface-variant" />
          <input type="text" placeholder="Search clinical cases..."
            className="bg-transparent border-none focus:outline-none focus:ring-0 text-sm w-48 text-on-surface placeholder:text-on-surface-variant" />
        </div>
        <div className="flex items-center gap-4">
          <button className="text-on-surface-variant hover:text-primary transition-colors p-2 md:p-0"><Brain size={20} /></button>
          <button className="text-on-surface-variant hover:text-primary transition-colors p-2 md:p-0"><Bell size={20} /></button>
        </div>
      </div>
    </header>
  );
}

export default memo(TopBar);

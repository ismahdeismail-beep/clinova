import { ViewState } from '../types';
import { Settings, Search, Brain, Bell, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface TopBarProps {
  activeView: ViewState;
  onNavigate: (view: ViewState) => void;
}

export default function TopBar({ activeView, onNavigate }: TopBarProps) {
  const { logout } = useAuth();
  const getTitle = () => {
    switch (activeView) {
      case 'dashboard': return 'Clinova Canvas';
      case 'tree': return 'Clinova Decision Tree';
      case 'study': return 'Clinova Engine';
      case 'pharma': return 'Clinova Reasoning';
      case 'case': return 'Clinova Simulator';
      case 'settings': return 'Clinova Settings';
      case 'admin': return 'Governance Console';
      default: return 'Clinova Core OS';
    }
  };

  return (
    <header className="fixed top-0 right-0 w-full md:w-[calc(100%-18rem)] z-30 h-16 bg-surface border-b border-outline-variant flex items-center justify-between px-4 md:px-8">
      <div className="flex items-center gap-4">
        <button onClick={() => onNavigate('settings')} className="md:hidden text-primary hover:bg-surface-container-high p-2 rounded-lg min-h-[44px] min-w-[44px] flex items-center justify-center">
          <Settings size={24} />
        </button>
        <div className="flex flex-col">
          <h2 className="text-xl font-bold tracking-tight text-primary truncate max-w-[150px] sm:max-w-none">{getTitle()}</h2>
          <div className="flex items-center gap-2 hidden sm:flex">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            <p className="text-[10px] font-semibold text-on-surface-variant uppercase tracking-tighter">Session: Encrypted & Anonymous</p>
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-2 md:gap-6">
        <div className="hidden lg:flex items-center gap-4 px-4 py-2 border border-outline-variant rounded-lg bg-surface-container-low focus-within:cyan-glow transition-all">
          <Search size={18} className="text-on-surface-variant" />
          <input 
            type="text" 
            placeholder="Search clinical cases..." 
            className="bg-transparent border-none focus:outline-none focus:ring-0 text-sm w-48 text-on-surface placeholder:text-on-surface-variant"
          />
        </div>
        <div className="flex items-center gap-1 md:gap-4">
          <button className="text-on-surface-variant hover:text-primary transition-colors p-2 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-full">
            <Bell size={20} />
          </button>
          <button onClick={logout} className="md:hidden text-error hover:text-error hover:bg-error-container/10 transition-colors p-2 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-full">
            <LogOut size={20} />
          </button>
        </div>
      </div>
    </header>
  );
}

import { memo, useState, useCallback, useMemo } from 'react';
import {
  LayoutDashboard, FlaskConical, BrainCircuit, Pill, Activity, Settings, LogOut, Menu, X, Users, FilePlus, Library, BookMarked, ClipboardList, Shield
} from 'lucide-react';
import ClinovaLogo from './ClinovaLogo';
import type { ViewState } from '../types';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { useUIMode } from '../contexts/UIModeContext';

interface NavigationProps {
  activeView: ViewState;
  onNavigate: (view: ViewState) => void;
}

const CLINICAL_NAV_ITEMS: { view: ViewState; label: string; icon: typeof LayoutDashboard }[] = [
  { view: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { view: 'patients', label: 'Patients', icon: Users },
  { view: 'new-case', label: 'New Case', icon: FilePlus },
  { view: 'pharmacotherapy', label: 'Pharma Review', icon: ClipboardList },
  { view: 'tree', label: 'Decision Tree', icon: FlaskConical },
  { view: 'drug-index', label: 'Drug Index', icon: BookMarked },
  { view: 'knowledge-base', label: 'Knowledge Base', icon: Library },
  { view: 'settings', label: 'Settings', icon: Settings },
];

const SIMPLE_NAV_ITEMS: { view: ViewState; label: string; icon: typeof LayoutDashboard }[] = [
  { view: 'dashboard', label: 'Home', icon: LayoutDashboard },
  { view: 'study', label: 'Study', icon: BrainCircuit },
  { view: 'pharma', label: 'Medications', icon: Pill },
  { view: 'case', label: 'Simulations', icon: Activity },
  { view: 'settings', label: 'Settings', icon: Settings },
];

function Navigation({ activeView, onNavigate }: NavigationProps) {
  const { userData, logout } = useAuth();
  const { theme } = useTheme();
  const { isSimple } = useUIMode();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNav = useCallback((view: ViewState) => {
    onNavigate(view);
    setMobileOpen(false);
  }, [onNavigate]);

  const logoVariant = theme === 'dark' ? 'light' : 'default';

  const navItems = useMemo(() => isSimple ? SIMPLE_NAV_ITEMS : CLINICAL_NAV_ITEMS, [isSimple]);

  const navContent = (
    <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto touch-pan-y overscroll-y-contain">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = activeView === item.view;
        return (
          <button
            key={item.view}
            onClick={() => handleNav(item.view)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
              isActive
                ? 'bg-[var(--primary-container)] text-[var(--primary)]'
                : 'text-[var(--text-secondary)] hover:bg-[var(--surface-dim)] hover:text-[var(--text)]'
            }`}
          >
            <Icon size={18} strokeWidth={isActive ? 2.5 : 1.5} aria-hidden="true" />
            <span>{item.label}</span>
          </button>
        );
      })}
    </nav>
  );

  return (
    <>
      <button
        onClick={() => setMobileOpen(true)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-[var(--surface)] border border-[var(--border)] rounded-lg shadow-sm"
        aria-label="Open navigation"
      >
        <Menu size={20} className="text-[var(--text-secondary)]" />
      </button>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setMobileOpen(false)} />
          <aside className="sidebar relative w-64 h-full flex flex-col shadow-xl">
            <div className="sidebar-header flex items-center justify-between px-6 py-6">
              <div className="flex items-center gap-3">
                <ClinovaLogo size={32} variant={logoVariant} />
                <div>
                  <h1 className="text-lg font-bold text-[var(--text)] tracking-tight">Clinova</h1>
                  <p className="text-xs text-[var(--text-muted)] mt-0.5">Clinical Decision Support</p>
                </div>
              </div>
              <button onClick={() => setMobileOpen(false)} className="p-1 text-[var(--text-muted)] hover:text-[var(--text)]">
                <X size={20} />
              </button>
            </div>
            {navContent}
            <UserPanel userData={userData} logout={logout} />
          </aside>
        </div>
      )}

      <aside className="sidebar fixed left-0 top-0 h-full z-40 w-64 hidden md:flex flex-col">
        <div className="sidebar-header px-6 py-6">
          <div className="flex items-center gap-3">
            <ClinovaLogo size={32} variant={logoVariant} />
            <div>
              <h1 className="text-lg font-bold text-[var(--text)] tracking-tight">Clinova</h1>
              <p className="text-xs text-[var(--text-muted)] mt-0.5">Clinical Decision Support</p>
            </div>
          </div>
        </div>
        {navContent}
        <UserPanel userData={userData} logout={logout} />
      </aside>
    </>
  );
}

function UserPanel({ userData, logout }: { userData: any; logout: () => void }) {
  return (
    <div className="user-panel p-4">
      <div className="flex items-center gap-3 mb-3">
        {userData?.photoURL ? (
          <img src={userData.photoURL} alt="" className="w-9 h-9 rounded-full border border-[var(--border)]" />
        ) : (
          <div className="w-9 h-9 rounded-full bg-[var(--primary-container)] flex items-center justify-center font-semibold text-sm text-[var(--primary)]">
            {userData?.displayName ? userData.displayName.charAt(0).toUpperCase() : 'U'}
          </div>
        )}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-[var(--text)] truncate">{userData?.displayName || 'User'}</p>
          <p className="text-xs text-[var(--text-muted)] capitalize">{userData?.role || 'Clinician'}</p>
        </div>
      </div>
      <button
        onClick={logout}
        className="w-full flex items-center justify-center gap-2 text-xs text-[var(--text-muted)] hover:text-[var(--danger)] py-2 rounded transition-colors"
      >
        <LogOut size={14} /> Sign Out
      </button>
    </div>
  );
}

export default memo(Navigation);

import { memo, useMemo } from 'react';
import {
  LayoutDashboard, FlaskConical, Pill, GraduationCap, Settings, ShieldAlert, LogOut, Brain
} from 'lucide-react';
import type { ViewState } from '../types';
import { useAuth } from '../contexts/AuthContext';
import { ROUTE_REGISTRY } from '../engine/BrainRouter';

interface NavigationProps {
  activeView: ViewState;
  onNavigate: (view: ViewState) => void;
}

const ICON_MAP = {
  dashboard: LayoutDashboard,
  tree: Brain,
  study: FlaskConical,
  pharma: Pill,
  case: GraduationCap,
  settings: Settings,
  admin: ShieldAlert,
} as const;

function Navigation({ activeView, onNavigate }: NavigationProps) {
  const { userData, logout } = useAuth();

  const visibleRoutes = useMemo(() =>
    ROUTE_REGISTRY.filter((r) => userData?.role === 'admin' || r.view !== 'admin'),
    [userData?.role]
  );

  return (
    <aside className="fixed left-0 top-0 h-full z-40 w-72 border-r border-outline-variant bg-surface-container hidden md:flex flex-col">
      <div className="p-8">
        <h1 className="text-2xl font-bold text-primary tracking-tight">Clinova</h1>
        <p className="text-xs font-semibold text-on-surface-variant mt-1 tracking-wider uppercase">Core OS</p>
      </div>

      <nav className="flex-1 px-4 space-y-2 mt-4 overflow-y-auto">
        {visibleRoutes.map((route) => {
          const Icon = ICON_MAP[route.view];
          const isActive = activeView === route.view;
          return (
            <button
              key={route.view}
              onClick={() => onNavigate(route.view)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-semibold text-sm transition-all duration-200 ${
                isActive
                  ? 'bg-secondary-container text-on-secondary-container opacity-100'
                  : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high opacity-80'
              }`}
            >
              <Icon size={20} className={isActive ? 'text-on-secondary-container' : 'text-on-surface-variant'} />
              <span>{route.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-outline-variant bg-surface-container-low hidden md:block">
        <div className="flex items-center gap-3 mb-3">
          {userData?.photoURL ? (
            <img src={userData.photoURL} alt={userData.displayName || 'User'} className="w-10 h-10 rounded-full overflow-hidden border border-outline bg-surface-container-highest" />
          ) : (
            <div className="w-10 h-10 rounded-full overflow-hidden border border-outline bg-surface-container-highest flex items-center justify-center font-bold text-lg text-primary">
              {userData?.displayName ? userData.displayName.charAt(0).toUpperCase() : 'U'}
            </div>
          )}
          <div className="flex-1 min-w-0">
            <p className="text-sm text-on-surface font-bold truncate">{userData?.displayName || userData?.email || 'Clinician'}</p>
            <p className="text-[10px] text-primary uppercase tracking-widest">{userData?.role || 'authorized'}</p>
          </div>
        </div>
        <button
          onClick={logout}
          className="w-full flex items-center justify-center gap-2 text-xs text-on-surface-variant font-bold hover:text-error hover:bg-error-container/10 py-2 rounded transition-colors uppercase tracking-widest"
        >
          <LogOut size={14} /> Disconnect
        </button>
      </div>
    </aside>
  );
}

export default memo(Navigation);

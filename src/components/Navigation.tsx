import { memo, useState, useCallback } from 'react';
import {
  LayoutDashboard, FlaskConical, BrainCircuit, Pill, Activity, Settings, LogOut, Menu, X
} from 'lucide-react';
import ClinovaLogo from './ClinovaLogo';
import type { ViewState } from '../types';
import { useAuth } from '../contexts/AuthContext';

interface NavigationProps {
  activeView: ViewState;
  onNavigate: (view: ViewState) => void;
}

const NAV_ITEMS: { view: ViewState; label: string; icon: typeof LayoutDashboard }[] = [
  { view: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { view: 'tree', label: 'Decision Tree', icon: FlaskConical },
  { view: 'study', label: 'Knowledge Engine', icon: BrainCircuit },
  { view: 'pharma', label: 'Reasoning Engine', icon: Pill },
  { view: 'case', label: 'Risk Simulator', icon: Activity },
  { view: 'settings', label: 'Settings', icon: Settings },
];

function Navigation({ activeView, onNavigate }: NavigationProps) {
  const { userData, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNav = useCallback((view: ViewState) => {
    onNavigate(view);
    setMobileOpen(false);
  }, [onNavigate]);

  const navContent = (
    <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
      {NAV_ITEMS.map((item) => {
        const Icon = item.icon;
        const isActive = activeView === item.view;
        return (
          <button
            key={item.view}
            onClick={() => handleNav(item.view)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
              isActive
                ? 'bg-[#EFF6FF] text-[#2563EB]'
                : 'text-[#475569] hover:bg-[#F8FAFC] hover:text-[#0F172A]'
            }`}
          >
            <Icon size={18} strokeWidth={isActive ? 2.5 : 1.5} />
            <span>{item.label}</span>
          </button>
        );
      })}
    </nav>
  );

  return (
    <>
      {/* Mobile hamburger */}
      <button
        onClick={() => setMobileOpen(true)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-white border border-[#E2E8F0] rounded-lg shadow"
        aria-label="Open navigation"
      >
        <Menu size={20} className="text-[#475569]" />
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setMobileOpen(false)} />
          <aside className="relative w-64 h-full bg-white border-r border-[#E2E8F0] flex flex-col shadow-xl">
            <div className="flex items-center justify-between px-6 py-6 border-b border-[#E2E8F0]">
              <div className="flex items-center gap-3">
                <ClinovaLogo size={32} variant="default" />
                <div>
                  <h1 className="text-lg font-bold text-[#0F172A] tracking-tight">Clinova</h1>
                  <p className="text-xs text-[#64748B] mt-0.5">Clinical Decision Support</p>
                </div>
              </div>
              <button onClick={() => setMobileOpen(false)} className="p-1 text-[#64748B] hover:text-[#0F172A]">
                <X size={20} />
              </button>
            </div>
            {navContent}
            <UserPanel userData={userData} logout={logout} />
          </aside>
        </div>
      )}

      {/* Desktop sidebar */}
      <aside className="fixed left-0 top-0 h-full z-40 w-64 border-r border-[#E2E8F0] bg-white hidden md:flex flex-col">
        <div className="px-6 py-6 border-b border-[#E2E8F0]">
          <div className="flex items-center gap-3">
            <ClinovaLogo size={32} variant="default" />
            <div>
              <h1 className="text-lg font-bold text-[#0F172A] tracking-tight">Clinova</h1>
              <p className="text-xs text-[#64748B] mt-0.5">Clinical Decision Support</p>
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
    <div className="p-4 border-t border-[#E2E8F0] bg-white">
      <div className="flex items-center gap-3 mb-3">
        {userData?.photoURL ? (
          <img src={userData.photoURL} alt="" className="w-9 h-9 rounded-full border border-[#E2E8F0]" />
        ) : (
          <div className="w-9 h-9 rounded-full bg-[#EFF6FF] flex items-center justify-center font-semibold text-sm text-[#2563EB]">
            {userData?.displayName ? userData.displayName.charAt(0).toUpperCase() : 'U'}
          </div>
        )}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-[#0F172A] truncate">{userData?.displayName || 'User'}</p>
          <p className="text-xs text-[#64748B] capitalize">{userData?.role || 'Clinician'}</p>
        </div>
      </div>
      <button
        onClick={logout}
        className="w-full flex items-center justify-center gap-2 text-xs text-[#64748B] hover:text-[#DC2626] py-2 rounded transition-colors"
      >
        <LogOut size={14} /> Sign Out
      </button>
    </div>
  );
}

export default memo(Navigation);

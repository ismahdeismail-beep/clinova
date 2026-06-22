import { 
  LayoutDashboard, 
  FlaskConical, 
  Pill, 
  GraduationCap, 
  FolderOpen, 
  Settings, 
  ShieldAlert,
  LogOut,
  Brain
} from 'lucide-react';
import { ViewState } from '../types';
import { useAuth } from '../contexts/AuthContext';

interface NavigationProps {
  activeView: ViewState;
  onNavigate: (view: ViewState) => void;
}

export default function Navigation({ activeView, onNavigate }: NavigationProps) {
  const { userData, logout } = useAuth();
  
  const navItems = [
    { id: 'dashboard', label: 'Clinova Canvas', icon: LayoutDashboard, core: true },
    { id: 'tree', label: 'Clinova Decision Tree', icon: Brain, core: true },
    { id: 'study', label: 'Clinova Knowledge Engine', icon: FlaskConical, core: true },
    { id: 'pharma', label: 'Clinova Reasoning Engine', icon: Pill, core: true },
    { id: 'case', label: 'Clinova Risk Simulator', icon: GraduationCap, core: true },
    { id: 'settings', label: 'Settings', icon: Settings, core: false },
    { id: 'admin', label: 'Governance Console', icon: ShieldAlert, core: false },
  ];

  return (
    <aside className="fixed left-0 top-0 h-full z-40 w-72 border-r border-outline-variant bg-surface-container hidden md:flex flex-col">
      <div className="p-8">
        <h1 className="text-2xl font-bold text-primary tracking-tight">Clinova</h1>
        <p className="text-xs font-semibold text-on-surface-variant mt-1 tracking-wider uppercase">Clinova Core OS</p>
      </div>
      
      <nav className="flex-1 px-4 space-y-2 mt-4 overflow-y-auto">
        {navItems.filter(item => userData?.role === 'admin' || item.id !== 'admin').map((item) => {
          const Icon = item.icon;
          const isActive = activeView === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id as ViewState)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-semibold text-sm transition-all duration-200 ${
                isActive 
                  ? 'bg-secondary-container text-on-secondary-container opacity-100' 
                  : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high opacity-80'
              }`}
            >
              <Icon size={20} className={isActive ? 'text-on-secondary-container' : 'text-on-surface-variant'} />
              <span>{item.label}</span>
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
          <LogOut size={14} />
          Disconnect
        </button>
      </div>
    </aside>
  );
}

import React from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation, useNavigate, Navigate } from 'react-router-dom';
import { 
  Home, Users, FolderOpen, ClipboardList, Pill, Bot, 
  BookOpen, BarChart3, Bell, Settings, Menu, Search, MessageSquare, ShieldCheck,
  X
} from 'lucide-react';

const DashboardScreen = React.lazy(() => import('./screens/DashboardScreen'));
const PatientsScreen = React.lazy(() => import('./screens/PatientsScreen'));
const ClinicalCasesScreen = React.lazy(() => import('./screens/ClinicalCasesScreen'));
const PharmacotherapyReviewScreen = React.lazy(() => import('./screens/PharmacotherapyReviewScreen'));
const DrugIndexScreen = React.lazy(() => import('./screens/DrugIndexScreen'));
const ClinicalAssistantScreen = React.lazy(() => import('./screens/ClinicalAssistantScreen'));
const KnowledgeBaseScreen = React.lazy(() => import('./screens/KnowledgeBaseScreen'));
const NotificationsScreen = React.lazy(() => import('./screens/NotificationsScreen'));
const SettingsScreen = React.lazy(() => import('./screens/SettingsScreen'));
const AdminDashboardScreen = React.lazy(() => import('./screens/AdminDashboardScreen'));
const LoginScreen = React.lazy(() => import('./screens/LoginScreen'));
const LandingScreen = React.lazy(() => import('./screens/LandingScreen'));
const StudentOnboarding = React.lazy(() => import('./components/StudentOnboarding'));

import { ProtectedRoute } from './components/ProtectedRoute';
import { useAuth } from './contexts/AuthContext';
import { InstallPWA } from './components/InstallPWA';
import { OfflineStatus } from './components/OfflineStatus';
import { CommandPalette } from './components/CommandPalette';
import ClinovaLogo from './components/ClinovaLogo';
import ThemeToggle from './components/ThemeToggle';

import { Breadcrumbs } from './components/Breadcrumbs';

import { useNotifications } from './contexts/NotificationContext';

function TopNavigation({ onMenuClick }: { onMenuClick: () => void }) {
  const { userData } = useAuth();
  const { unreadCount } = useNotifications();
  
  return (
    <div className="fixed top-0 left-0 right-0 z-30 md:z-50 md:left-64 flex justify-center pointer-events-none pt-[env(safe-area-inset-top,0px)] bg-[var(--surface)]/80 backdrop-blur-md border-b border-[var(--border)]">
      <header className="pointer-events-auto flex items-center justify-between bg-transparent h-16 w-full px-4 lg:px-8">
        <div className="flex items-center gap-4 shrink-0">
          <button 
            className="md:hidden p-2 text-[var(--text-muted)] hover:text-[var(--text)] transition-colors rounded-full"
            onClick={onMenuClick}
          >
            <Menu size={20} />
          </button>
          <Link to="/" className="flex items-center gap-2 text-[var(--primary)] font-bold text-xl tracking-tight shrink-0 md:hidden lg:flex">
            <div className="flex items-center justify-center">
              <ClinovaLogo size={28} variant="colored" />
            </div>
            <span className="hidden sm:inline">CLINOVA</span>
          </Link>
        </div>

        <div className="flex-1 px-4 lg:px-8 hidden md:flex justify-center max-w-2xl">
          <div className="relative group w-full">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] group-focus-within:text-[var(--primary)] transition-colors" />
            <div 
              className="w-full bg-[var(--surface-dim)]/50 border border-[var(--border)] text-[var(--text-muted)] flex items-center justify-between cursor-pointer hover:border-[var(--primary)] transition-all duration-300 backdrop-blur-sm pl-10 pr-4 py-2 rounded-full text-sm"
              onClick={() => {
                window.dispatchEvent(new Event('open-command-palette'));
              }}
            >
              <span className="truncate">Search Kenya Drug Index, Guidelines, patients...</span>
              <div className="flex items-center gap-1 shrink-0 ml-2">
                <kbd className="hidden sm:inline-block bg-[var(--surface)] border border-[var(--border)] rounded px-1.5 py-0.5 text-[10px] font-mono font-medium text-[var(--text-muted)]">Ctrl</kbd>
                <kbd className="hidden sm:inline-block bg-[var(--surface)] border border-[var(--border)] rounded px-1.5 py-0.5 text-[10px] font-mono font-medium text-[var(--text-muted)]">K</kbd>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1 sm:gap-2 shrink-0">
          <Link to="/notifications" className="text-[var(--text-muted)] hover:text-[var(--primary)] hover:bg-[var(--primary-container)] rounded-full transition-colors relative p-2">
            <Bell size={20} />
            {unreadCount > 0 && (
              <span className="absolute bg-[var(--danger)] rounded-full border border-[var(--surface)] font-bold text-white flex items-center justify-center top-1 right-1 min-w-[16px] h-4 text-[10px] px-0.5">
                {unreadCount}
              </span>
            )}
          </Link>
          <Link to="/settings" className="text-[var(--text-muted)] hover:text-[var(--primary)] hover:bg-[var(--primary-container)] rounded-full transition-colors hidden sm:block p-2">
            <Settings size={20} />
          </Link>
          <ThemeToggle />
          
          <div className="h-8 w-px bg-[var(--border)] mx-1 hidden sm:block"></div>
          
          <div className="flex items-center gap-2 pl-1 cursor-pointer hover:opacity-80">
            <div className="hidden sm:block text-right">
              <p className="text-sm font-semibold text-[var(--text)] leading-none">{userData?.name || 'Guest'}</p>
              <p className="text-[10px] text-[var(--text-muted)] font-medium mt-1 capitalize">{userData?.role || 'user'}</p>
            </div>
            <div className="rounded-full bg-gradient-to-tr from-[var(--primary)] to-[var(--primary-hover)] text-[var(--primary-foreground)] flex items-center justify-center font-bold shadow-sm border-2 border-white w-9 h-9 text-sm">
              {userData?.name ? userData.name.split(' ').map((n: string) => n[0]).join('').substring(0, 2) : 'G'}
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

function Sidebar({ isOpen, setIsOpen }: { isOpen: boolean, setIsOpen: (v: boolean) => void }) {
  const location = useLocation();
  const { userData } = useAuth();

  const links = [
    { to: '/', label: 'Dashboard', icon: Home },
    { to: '/patients', label: 'Patients', icon: Users },
    { to: '/cases', label: 'Clinical Cases', icon: FolderOpen },
    { to: '/review', label: 'Pharmacotherapy Review', icon: ClipboardList },
    { to: '/drugs', label: 'Drug Index', icon: Pill },
    { to: '/assistant', label: 'Clinical Assistant', icon: Bot },
    { to: '/knowledge', label: 'Education Hub', icon: BookOpen },
    ...(userData?.role === 'admin' ? [{ to: '/admin', label: 'Admin Console', icon: ShieldCheck }] : []),
    { to: '/notifications', label: 'Notifications', icon: Bell },
    { to: '/settings', label: 'Settings', icon: Settings },
  ];

  return (
    <>
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-[var(--surface)] border-r border-[var(--border)] transform transition-transform duration-200 ease-in-out md:translate-x-0 overflow-y-auto flex flex-col ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="h-16 px-4 lg:px-6 pt-[env(safe-area-inset-top,0px)] border-b border-[var(--border)] shrink-0 flex items-center justify-between">
          <div className="flex items-center gap-2 text-[var(--primary)] font-bold text-xl tracking-tight mt-1">
            <div className="flex items-center justify-center">
              <ClinovaLogo size={28} variant="colored" />
            </div>
            <div className="flex flex-col leading-none">
              <span>CLINOVA</span>
              <span className="text-[9px] text-[var(--text-muted)] font-semibold uppercase tracking-wider mt-0.5">Clinical OS</span>
            </div>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className="md:hidden p-1.5 text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--surface-dim)] rounded-full transition-colors"
          >
            <X size={18} />
          </button>
        </div>
        <nav className="p-3 space-y-0.5 flex-1 mt-2">
          {links.map((link) => {
            const isActive = location.pathname === link.to;
            const Icon = link.icon;
            return (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-[var(--primary-container)] text-[var(--primary)]'
                    : 'text-[var(--text-muted)] hover:bg-[var(--surface-dim)] hover:text-[var(--text)]'
                }`}
              >
                <Icon size={18} className={isActive ? 'text-[var(--primary)]' : ''} />
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
      
      {/* Backdrop for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-40 md:hidden backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}

function AdminLoginScreen() {
  const { loginAs } = useAuth();
  const navigate = useNavigate();
  
  React.useEffect(() => {
    loginAs('admin').then(() => navigate('/'));
  }, [loginAs, navigate]);

  return <div className="min-h-screen bg-[var(--bg)] flex items-center justify-center p-8 text-center text-sm font-medium text-[var(--text-muted)] animate-pulse">Authenticating Admin Access...</div>;
}

function AppContent() {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
  const { userData, loading } = useAuth();
  const [forceShowOnboarding, setForceShowOnboarding] = React.useState(false);

  React.useEffect(() => {
    const handleOpenOnboarding = () => setForceShowOnboarding(true);
    window.addEventListener('open-onboarding', handleOpenOnboarding);
    return () => window.removeEventListener('open-onboarding', handleOpenOnboarding);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--bg)] flex flex-col items-center justify-center p-8 text-center selection:bg-[var(--primary)] selection:text-[var(--primary-foreground)]">
        <div className="flex flex-col items-center gap-5 animate-pulse">
          <div className="flex items-center justify-center drop-shadow-lg">
            <ClinovaLogo size={64} variant="colored" />
          </div>
          <h2 className="text-xl font-bold text-[var(--text)] tracking-tight">CLINOVA</h2>
          <p className="text-xs text-[var(--text-muted)] font-medium">Initializing Clinical Intelligence OS...</p>
        </div>
      </div>
    );
  }

  if (!userData) {
    return (
      <React.Suspense fallback={
        <div className="min-h-screen bg-[var(--bg)] flex flex-col items-center justify-center p-8 text-center selection:bg-[var(--primary)] selection:text-[var(--primary-foreground)]">
          <div className="flex flex-col items-center gap-5 animate-pulse">
            <div className="flex items-center justify-center drop-shadow-lg">
              <ClinovaLogo size={64} variant="colored" />
            </div>
          </div>
        </div>
      }>
        <Routes>
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/admin-access" element={<AdminLoginScreen />} />
          <Route path="*" element={<LandingScreen />} />
        </Routes>
      </React.Suspense>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] flex flex-col">
      <CommandPalette />
      <OfflineStatus />
      {(forceShowOnboarding || (userData && !userData.onboardingCompleted && userData.role !== 'admin')) && (
        <React.Suspense fallback={null}>
          <StudentOnboarding onClose={() => setForceShowOnboarding(false)} />
        </React.Suspense>
      )}
      <TopNavigation onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />
      <div className="flex-1 flex overflow-hidden relative">
        <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
        <main id="main-scroll-area" className="flex-1 md:pl-64 overflow-y-auto pt-[calc(4rem+env(safe-area-inset-top,0px))]">
          <Breadcrumbs />
          <React.Suspense fallback={
            <div className="h-full flex flex-col items-center justify-center p-8 text-center">
              <div className="flex flex-col items-center gap-5 animate-pulse">
                <div className="flex items-center justify-center drop-shadow-lg opacity-50">
                  <ClinovaLogo size={48} variant="colored" />
                </div>
              </div>
            </div>
          }>
            <Routes>
              <Route path="/" element={<DashboardScreen />} />
              <Route path="/patients" element={<PatientsScreen />} />
              <Route path="/cases" element={<ClinicalCasesScreen />} />
              <Route path="/review" element={<PharmacotherapyReviewScreen />} />
              <Route path="/drugs" element={<DrugIndexScreen />} />
              <Route path="/assistant" element={<ClinicalAssistantScreen />} />
              <Route path="/knowledge" element={<KnowledgeBaseScreen />} />
              <Route path="/admin" element={
                <ProtectedRoute requiredRole="admin">
                  <AdminDashboardScreen />
                </ProtectedRoute>
              } />
              <Route path="/notifications" element={<NotificationsScreen />} />
              <Route path="/settings" element={<SettingsScreen />} />
              <Route path="/login" element={<Navigate to="/" replace />} />
              <Route path="/admin-access" element={<Navigate to="/" replace />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </React.Suspense>
          <InstallPWA />
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}


import React from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation, useNavigate, Navigate } from 'react-router-dom';
import { 
  Home, Users, FolderOpen, ClipboardList, Pill, Bot, 
  BookOpen, BarChart3, Bell, Settings, Menu, Search, MessageSquare, ShieldCheck
} from 'lucide-react';

import DashboardScreen from './screens/DashboardScreen';
import PatientsScreen from './screens/PatientsScreen';
import ClinicalCasesScreen from './screens/ClinicalCasesScreen';
import PharmacotherapyReviewScreen from './screens/PharmacotherapyReviewScreen';
import DrugIndexScreen from './screens/DrugIndexScreen';
import ClinicalAssistantScreen from './screens/ClinicalAssistantScreen';
import KnowledgeBaseScreen from './screens/KnowledgeBaseScreen';
import NotificationsScreen from './screens/NotificationsScreen';
import SettingsScreen from './screens/SettingsScreen';
import AdminDashboardScreen from './screens/AdminDashboardScreen';
import { ProtectedRoute } from './components/ProtectedRoute';
import { useAuth } from './contexts/AuthContext';
import { InstallPWA } from './components/InstallPWA';
import { OfflineStatus } from './components/OfflineStatus';
import { CommandPalette } from './components/CommandPalette';
import LoginScreen from './screens/LoginScreen';
import LandingScreen from './screens/LandingScreen';
import ClinovaLogo from './components/ClinovaLogo';
import ThemeToggle from './components/ThemeToggle';

import { useNotifications } from './contexts/NotificationContext';

function TopNavigation({ onMenuClick }: { onMenuClick: () => void }) {
  const { userData } = useAuth();
  const { unreadCount } = useNotifications();
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const scrollContainer = document.getElementById('main-scroll-area');
    if (!scrollContainer) return;
    
    // Create a dummy element at the top of the scroll container for Intersection Observer
    const observerTarget = document.createElement('div');
    observerTarget.style.height = '1px';
    observerTarget.style.width = '100%';
    observerTarget.style.pointerEvents = 'none';
    observerTarget.style.visibility = 'hidden';
    observerTarget.style.flexShrink = '0';
    
    // Insert at the very top of the scrolling content
    scrollContainer.prepend(observerTarget);

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsScrolled(!entry.isIntersecting);
      },
      {
        root: scrollContainer,
        threshold: 0,
      }
    );

    observer.observe(observerTarget);

    return () => {
      observer.disconnect();
      if (observerTarget.parentNode) {
        observerTarget.parentNode.removeChild(observerTarget);
      }
    };
  }, []);
  
  return (
    <div className={`fixed top-0 left-0 right-0 z-50 md:left-64 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] flex justify-center pointer-events-none ${isScrolled ? 'pt-4' : 'pt-0'}`}>
      <header className={`
        pointer-events-auto
        flex items-center justify-between
        bg-[var(--surface)]/80 backdrop-blur-md border border-[var(--border)]
        transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]
        overflow-hidden
        ${isScrolled 
          ? 'h-14 w-[95%] max-w-4xl rounded-full shadow-lg px-4 border-[var(--border)]/50 bg-[var(--surface)]/90' 
          : 'h-16 w-full rounded-none shadow-sm px-4 lg:px-8 border-b border-t-0 border-l-0 border-r-0'}
      `}>
        <div className="flex items-center gap-4 shrink-0">
          <button 
            className="md:hidden p-2 text-[var(--text-muted)] hover:text-[var(--text)] transition-colors rounded-full"
            onClick={onMenuClick}
          >
            <Menu size={20} />
          </button>
          <Link to="/" className="flex items-center gap-2 text-[var(--primary)] font-bold text-xl tracking-tight shrink-0 md:hidden lg:flex">
            <div className={`rounded-lg bg-blue-500/10 flex items-center justify-center text-[var(--primary)] shadow-sm transition-all duration-300 ${isScrolled ? 'w-6 h-6' : 'w-8 h-8'}`}>
              <ClinovaLogo size={isScrolled ? 14 : 20} />
            </div>
            {!isScrolled && <span className="hidden sm:inline transition-opacity duration-300">CLINOVA</span>}
          </Link>
        </div>

        <div className={`flex-1 px-4 lg:px-8 hidden md:flex justify-center transition-all duration-300 ${isScrolled ? 'max-w-md' : 'max-w-2xl'}`}>
          <div className="relative group w-full">
            <Search size={isScrolled ? 16 : 18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] group-focus-within:text-[var(--primary)] transition-colors" />
            <div 
              className={`w-full bg-[var(--surface-dim)]/50 border border-[var(--border)] text-[var(--text-muted)] flex items-center justify-between cursor-pointer hover:border-[var(--primary)] transition-all duration-300 backdrop-blur-sm
                ${isScrolled ? 'pl-9 pr-3 py-1.5 rounded-full text-xs' : 'pl-10 pr-4 py-2 rounded-full text-sm'}`}
              onClick={() => {
                window.dispatchEvent(new Event('open-command-palette'));
              }}
            >
              <span className="truncate">{isScrolled ? 'Search...' : 'Search Kenya Drug Index, Guidelines, patients...'}</span>
              {!isScrolled && (
                <div className="flex items-center gap-1 shrink-0 ml-2">
                  <kbd className="hidden sm:inline-block bg-[var(--surface)] border border-[var(--border)] rounded px-1.5 py-0.5 text-[10px] font-mono font-medium text-[var(--text-muted)]">Ctrl</kbd>
                  <kbd className="hidden sm:inline-block bg-[var(--surface)] border border-[var(--border)] rounded px-1.5 py-0.5 text-[10px] font-mono font-medium text-[var(--text-muted)]">K</kbd>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1 sm:gap-2 shrink-0">
          <Link to="/notifications" className={`text-[var(--text-muted)] hover:text-[var(--primary)] hover:bg-[var(--primary-container)] rounded-full transition-colors relative ${isScrolled ? 'p-1.5' : 'p-2'}`}>
            <Bell size={isScrolled ? 18 : 20} />
            {unreadCount > 0 && (
              <span className={`absolute bg-red-500 rounded-full border border-[var(--surface)] font-bold text-white flex items-center justify-center
                ${isScrolled ? 'top-0.5 right-0.5 min-w-[14px] h-3.5 text-[8px] px-0.5' : 'top-1 right-1 min-w-[16px] h-4 text-[10px] px-0.5'}`}>
                {unreadCount}
              </span>
            )}
          </Link>
          <Link to="/settings" className={`text-[var(--text-muted)] hover:text-[var(--primary)] hover:bg-[var(--primary-container)] rounded-full transition-colors hidden sm:block ${isScrolled ? 'p-1.5' : 'p-2'}`}>
            <Settings size={isScrolled ? 18 : 20} />
          </Link>
          <ThemeToggle />
          
          {!isScrolled && <div className="h-8 w-px bg-[var(--border)] mx-1 hidden sm:block transition-all"></div>}
          
          <div className={`flex items-center gap-2 pl-1 cursor-pointer hover:opacity-80 transition-all ${isScrolled ? 'ml-1' : ''}`}>
            {!isScrolled && (
              <div className="hidden sm:block text-right transition-all">
                <p className="text-sm font-semibold text-[var(--text)] leading-none">{userData?.name || 'Guest'}</p>
                <p className="text-[10px] text-[var(--text-muted)] font-medium mt-1 capitalize">{userData?.role || 'user'}</p>
              </div>
            )}
            <div className={`rounded-full bg-gradient-to-tr from-[var(--primary)] to-[var(--primary-hover)] text-white flex items-center justify-center font-bold shadow-sm border-2 border-white transition-all
              ${isScrolled ? 'w-7 h-7 text-xs' : 'w-9 h-9 text-sm'}`}>
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
      <div className={`fixed inset-y-0 left-0 z-40 w-64 bg-[var(--surface)]/80 backdrop-blur-md border-r border-[var(--border)] transform transition-transform duration-200 ease-in-out md:translate-x-0 overflow-y-auto flex flex-col pt-16 md:pt-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6 border-b border-[var(--border)] shrink-0 hidden md:block">
          <div className="flex items-center gap-2 text-[var(--primary)] font-bold text-xl tracking-tight">
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-[var(--primary)] shadow-sm">
              <ClinovaLogo size={20} />
            </div>
            CLINOVA
          </div>
          <p className="text-[10px] text-[var(--text-muted)] mt-1 font-semibold uppercase tracking-wider">Clinical Intelligence</p>
        </div>
        <nav className="p-4 space-y-1 flex-1 mt-2">
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
          className="fixed inset-0 bg-black/50 z-30 md:hidden top-16 backdrop-blur-sm"
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

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--bg)] flex flex-col items-center justify-center p-8 text-center selection:bg-[var(--primary)] selection:text-white">
        <div className="flex flex-col items-center gap-4 animate-pulse">
          <div className="w-16 h-16 bg-[var(--primary)] text-white rounded-2xl flex items-center justify-center shadow-lg shadow-[var(--primary)]/20">
            <ClinovaLogo size={32} variant="light" />
          </div>
          <h2 className="text-lg font-bold text-[var(--text)] tracking-tight">CLINOVA</h2>
          <p className="text-xs text-[var(--text-muted)] font-medium">Initializing Clinical Intelligence OS...</p>
        </div>
      </div>
    );
  }

  if (!userData) {
    return (
      <Routes>
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/admin-access" element={<AdminLoginScreen />} />
        <Route path="*" element={<LandingScreen />} />
      </Routes>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] flex flex-col">
      <CommandPalette />
      <OfflineStatus />
      <TopNavigation onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />
      <div className="flex flex-1 overflow-hidden relative">
        <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
        <main id="main-scroll-area" className="flex-1 md:ml-64 w-full overflow-y-auto pt-16">
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


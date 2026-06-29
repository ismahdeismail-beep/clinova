import React from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
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
import ReportsScreen from './screens/ReportsScreen';
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

import { useNotifications } from './contexts/NotificationContext';

function TopNavigation({ onMenuClick }: { onMenuClick: () => void }) {
  const { userData } = useAuth();
  const { unreadCount } = useNotifications();
  
  return (
    <header className="sticky top-0 z-30 bg-[var(--surface)]/80 backdrop-blur-md border-b border-[var(--border)] h-16 flex items-center justify-between px-4 lg:px-8">
      <div className="flex items-center gap-4">
        <button 
          className="md:hidden p-2 text-[var(--text-muted)] hover:text-[var(--text)] transition-colors"
          onClick={onMenuClick}
        >
          <Menu size={24} />
        </button>
        <Link to="/" className="flex items-center gap-2 text-[var(--primary)] font-bold text-xl tracking-tight shrink-0 md:hidden lg:flex">
          <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-[var(--primary)] shadow-sm">
            <ClinovaLogo size={20} />
          </div>
          <span className="hidden sm:inline">CLINOVA</span>
        </Link>
      </div>

      <div className="flex-1 max-w-2xl px-4 lg:px-8 hidden md:block">
        <div className="relative group">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] group-focus-within:text-[var(--primary)] transition-colors" />
          <div 
            className="w-full pl-10 pr-4 py-2 bg-[var(--surface-dim)]/50 border border-[var(--border)] rounded-full text-sm text-[var(--text-muted)] flex items-center justify-between cursor-pointer hover:border-[var(--primary)] transition-colors backdrop-blur-sm"
            onClick={() => {
              window.dispatchEvent(new Event('open-command-palette'));
            }}
          >
            <span>Search Kenya Drug Index, Guidelines, patients...</span>
            <div className="flex items-center gap-1">
              <kbd className="hidden sm:inline-block bg-[var(--surface)] border border-[var(--border)] rounded px-1.5 py-0.5 text-[10px] font-mono font-medium text-[var(--text-muted)]">Ctrl</kbd>
              <kbd className="hidden sm:inline-block bg-[var(--surface)] border border-[var(--border)] rounded px-1.5 py-0.5 text-[10px] font-mono font-medium text-[var(--text-muted)]">K</kbd>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-4 shrink-0">
        <Link to="/notifications" className="p-2 text-[var(--text-muted)] hover:text-[var(--primary)] hover:bg-[var(--primary-container)] rounded-full transition-colors relative">
          <Bell size={20} />
          {unreadCount > 0 && (
            <span className="absolute top-1 right-1 min-w-[16px] h-4 flex items-center justify-center bg-red-500 rounded-full border border-[var(--surface)] text-[10px] font-bold text-white px-0.5">
              {unreadCount}
            </span>
          )}
        </Link>
        <button className="p-2 text-[var(--text-muted)] hover:text-[var(--primary)] hover:bg-[var(--primary-container)] rounded-full transition-colors hidden sm:block">
          <MessageSquare size={20} />
        </button>
        <Link to="/settings" className="p-2 text-[var(--text-muted)] hover:text-[var(--primary)] hover:bg-[var(--primary-container)] rounded-full transition-colors hidden sm:block">
          <Settings size={20} />
        </Link>
        
        <div className="h-8 w-px bg-[var(--border)] mx-1 hidden sm:block"></div>
        
        <div className="flex items-center gap-3 pl-1 cursor-pointer hover:opacity-80 transition-opacity">
          <div className="hidden sm:block text-right">
            <p className="text-sm font-semibold text-[var(--text)] leading-none">{userData?.name || 'Guest'}</p>
            <p className="text-[10px] text-[var(--text-muted)] font-medium mt-1 capitalize">{userData?.role || 'user'}</p>
          </div>
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[var(--primary)] to-[var(--primary-hover)] text-white flex items-center justify-center font-bold text-sm shadow-sm border-2 border-white">
            {userData?.name ? userData.name.split(' ').map((n: string) => n[0]).join('').substring(0, 2) : 'G'}
          </div>
        </div>
      </div>
    </header>
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
    { to: '/reports', label: 'Reports', icon: BarChart3 },
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

function AppContent() {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
  const { userData } = useAuth();

  if (!userData) {
    return (
      <Routes>
        <Route path="/login" element={<LoginScreen />} />
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
        <main className="flex-1 md:ml-64 w-full overflow-y-auto">
          <Routes>
            <Route path="/" element={<DashboardScreen />} />
            <Route path="/patients" element={<PatientsScreen />} />
            <Route path="/cases" element={<ClinicalCasesScreen />} />
            <Route path="/review" element={<PharmacotherapyReviewScreen />} />
            <Route path="/drugs" element={<DrugIndexScreen />} />
            <Route path="/assistant" element={<ClinicalAssistantScreen />} />
            <Route path="/knowledge" element={<KnowledgeBaseScreen />} />
            <Route path="/reports" element={<ReportsScreen />} />
            <Route path="/admin" element={
              <ProtectedRoute requiredRole="admin">
                <AdminDashboardScreen />
              </ProtectedRoute>
            } />
            <Route path="/notifications" element={<NotificationsScreen />} />
            <Route path="/settings" element={<SettingsScreen />} />
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


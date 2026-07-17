import React from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation, useNavigate, Navigate } from 'react-router-dom';
import {
  Menu, Search,
  X, LogOut,
} from 'lucide-react';

const DashboardScreen = React.lazy(() => import('./screens/DashboardScreen'));
const ClinicalCasesScreen = React.lazy(() => import('./screens/ClinicalCasesScreen'));
const DrugIndexScreen = React.lazy(() => import('./screens/DrugIndexScreen'));
const ClinicalAssistantScreen = React.lazy(() => import('./screens/ClinicalAssistantScreen'));
const EducationHubScreen = React.lazy(() => import('./screens/EducationHubScreen'));
const BoardExamScreen = React.lazy(() => import('./screens/BoardExamScreen'));
const OnlineLibraryScreen = React.lazy(() => import('./screens/OnlineLibraryScreen'));
const SettingsScreen = React.lazy(() => import('./screens/SettingsScreen'));
const LoginScreen = React.lazy(() => import('./screens/LoginScreen'));
const LandingScreen = React.lazy(() => import('./screens/LandingScreen'));

import { useAuth } from './contexts/AuthContext';
import ClinovaLogo from './components/ClinovaLogo';
import ThemeToggle from './components/ThemeToggle';
import { NAV_GROUPS, type NavGroup } from './data/navigationConfig';
import { InstallPWA } from './components/InstallPWA';

function TopNavigation({ onMenuClick }: { onMenuClick: () => void }) {
  const { userData } = useAuth();
  
  return (
    <div className="fixed top-0 left-0 right-0 z-30 md:z-50 md:left-64 flex justify-center pointer-events-none pt-[env(safe-area-inset-top,0px)] bg-[var(--surface)]/80 backdrop-blur-md border-b border-[var(--border)]">
      <header className="pointer-events-auto flex items-center justify-between bg-transparent h-16 w-full px-4 lg:px-8">
        <div className="flex items-center gap-4 shrink-0">
          <button 
            aria-label="Open menu"
            className="md:hidden p-2 text-[var(--text-muted)] hover:text-[var(--text)] transition-colors rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]"
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
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] group-focus-within:text-[var(--primary)] transition-colors pointer-events-none" />
            <button 
              type="button"
              aria-label="Open search"
              className="w-full bg-[var(--surface-dim)]/50 border border-[var(--border)] text-[var(--text-muted)] flex items-center justify-between cursor-pointer hover:border-[var(--primary)] transition-all duration-300 backdrop-blur-sm pl-10 pr-4 py-2 rounded-full text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]"
              onClick={() => {
                window.location.href = '/knowledge';
              }}
            >
              <span className="truncate">Search drugs, diseases, guidelines...</span>
              <span className="flex items-center gap-1 shrink-0 ml-2">
                <kbd className="hidden sm:inline-block bg-[var(--surface)] border border-[var(--border)] rounded px-1.5 py-0.5 text-[10px] font-mono font-medium text-[var(--text-muted)]">Ctrl</kbd>
                <kbd className="hidden sm:inline-block bg-[var(--surface)] border border-[var(--border)] rounded px-1.5 py-0.5 text-[10px] font-mono font-medium text-[var(--text-muted)]">K</kbd>
              </span>
            </button>
          </div>
        </div>

        <div className="flex items-center gap-1 sm:gap-2 shrink-0">
          <ThemeToggle />
          
          <div className="h-8 w-px bg-[var(--border)] mx-1 hidden sm:block"></div>
          
          <Link to="/settings" className="flex items-center gap-2 pl-1 hover:opacity-80 transition-opacity">
            <div className="hidden sm:block text-right">
              <p className="text-sm font-semibold text-[var(--text)] leading-none">{userData?.name || 'Guest'}</p>
              <p className="text-[10px] text-[var(--text-muted)] font-medium mt-1 capitalize">{userData?.role || 'user'}</p>
            </div>
            <div className="rounded-full bg-gradient-to-tr from-[var(--primary)] to-[var(--primary-hover)] text-[var(--primary-foreground)] flex items-center justify-center font-bold shadow-sm border-2 border-white w-9 h-9 text-sm">
              {userData?.name ? userData.name.split(' ').map((n: string) => n[0]).join('').substring(0, 2) : 'G'}
            </div>
          </Link>
        </div>
      </header>
    </div>
  );
}

function Sidebar({ isOpen, setIsOpen }: { isOpen: boolean, setIsOpen: (v: boolean) => void }) {
  const location = useLocation();
  const { userData, logout } = useAuth();

  return (
    <>
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-[var(--surface)] border-r border-[var(--border)] transform transition-transform duration-200 ease-in-out md:translate-x-0 overflow-y-auto flex flex-col ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="h-16 px-4 lg:px-6 pt-[env(safe-area-inset-top,0px)] border-b border-[var(--border)] shrink-0 flex items-center justify-between bg-[var(--bg)]/95 backdrop-blur-sm">
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
            aria-label="Close sidebar"
            className="md:hidden p-1.5 text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--surface-dim)] rounded-full transition-colors"
          >
            <X size={18} />
          </button>
        </div>
        <nav className="p-3 space-y-1 flex-1 mt-1 overflow-y-auto">
          {NAV_GROUPS.map((group) => (
            <div key={group.id} className="space-y-0.5">
              {group.items.map((item) => {
                const isActive =
                  location.pathname === item.to ||
                  (item.to !== '/' && location.pathname.startsWith(item.to + '/'))
                const ItemIcon = item.icon

                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150 ${
                      isActive
                        ? 'bg-[var(--primary)] text-[var(--primary-foreground)] shadow-sm'
                        : 'text-[var(--text-muted)] hover:bg-[var(--surface-dim)] hover:text-[var(--text)]'
                    }`}
                  >
                    <div className={`flex items-center justify-center w-8 h-8 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-[var(--primary-foreground)]/20'
                        : ''
                    }`}>
                      <ItemIcon size={18} className={isActive ? 'text-[var(--primary-foreground)]' : ''} />
                    </div>
                    <span className="truncate">{item.label}</span>
                  </Link>
                )
              })}
            </div>
          ))}
        </nav>

        <div className="p-3 border-t border-[var(--border)] mt-auto bg-[var(--surface-dim)]/30">
          {userData && (
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3 px-2">
                <div className="w-9 h-9 rounded-full bg-[var(--primary)] text-[var(--primary-foreground)] flex items-center justify-center font-bold text-sm shrink-0">
                  {userData.name.charAt(0).toUpperCase()}
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-sm font-semibold truncate text-[var(--text)]">{userData.name}</span>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-[var(--text-muted)] truncate">{userData.role}</span>
                </div>
              </div>
              <button
                onClick={() => logout()}
                className="flex items-center justify-center gap-2 w-full py-2 px-3 rounded-lg text-sm font-medium text-[var(--destructive)] hover:bg-[var(--destructive)]/10 transition-colors border border-transparent hover:border-[var(--destructive)]/20"
              >
                <LogOut size={16} />
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
      
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-40 md:hidden backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}

function AppContent() {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
  const { userData, loading } = useAuth();

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
          <Route path="*" element={<LandingScreen />} />
        </Routes>
      </React.Suspense>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] flex flex-col">
      <TopNavigation onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />
      <div className="flex-1 flex overflow-hidden relative">
        <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
        <main id="main-scroll-area" className="flex-1 md:pl-64 overflow-y-auto pt-[calc(4rem+env(safe-area-inset-top,0px))]">
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
              <Route path="/cases" element={<ClinicalCasesScreen />} />
              <Route path="/drugs" element={<DrugIndexScreen />} />
              <Route path="/assistant" element={<ClinicalAssistantScreen />} />
              <Route path="/knowledge" element={<EducationHubScreen />} />
              <Route path="/knowledge/:moduleId" element={<EducationHubScreen />} />
              <Route path="/knowledge/:moduleId/:unitId" element={<EducationHubScreen />} />
              <Route path="/board-exam" element={<BoardExamScreen />} />
              <Route path="/board-exam/:setId" element={<BoardExamScreen />} />
              <Route path="/library" element={<OnlineLibraryScreen />} />
              <Route path="/settings" element={<SettingsScreen />} />
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


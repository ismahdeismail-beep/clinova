import { useState, useEffect, useCallback, useMemo, lazy, Suspense } from 'react';
import Navigation from './components/Navigation';
import TopBar from './components/TopBar';
import ClinovaLogo from './components/ClinovaLogo';
import { ErrorBoundary } from './components/ErrorBoundary';
import { OverlayHost } from './components/OverlayHost';
import type { ViewState } from './types';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import { UIModeProvider } from './contexts/UIModeContext';
import { EventBus } from './engine/EventBus';
import { BrainTreeAuditor, WorkflowRepairEngine } from './core/selfHealing';
import { RealtimeSyncManager } from './core/sync';
import { BrainTree } from './engine/BrainTree';
import { AppBootManager } from './core/AppBootManager';
import { NavigationGuard } from './core/NavigationGuard';
import { ErrorHandler } from './core/ErrorHandler';
import { logger } from './core/logger';

logger.loadPersisted();
logger.info('system', 'App initializing');

const LoginScreen = lazy(() => import('./screens/LoginScreen'));
const DashboardScreen = lazy(() => import('./screens/DashboardScreen'));
const DecisionTreeScreen = lazy(() => import('./screens/DecisionTreeScreen'));
const StudyEngineScreen = lazy(() => import('./screens/StudyEngineScreen'));
const PharmaScreen = lazy(() => import('./screens/PharmaScreen'));
const CaseLearningScreen = lazy(() => import('./screens/CaseLearningScreen'));
const SettingsScreen = lazy(() => import('./screens/SettingsScreen'));
const PharmacotherapyScreen = lazy(() => import('./screens/PharmacotherapyScreen'));
const DrugIndexScreen = lazy(() => import('./screens/DrugIndexScreen'));
const KnowledgeBaseScreen = lazy(() => import('./screens/KnowledgeBaseScreen'));
const PatientsScreen = lazy(() => import('./screens/PatientsScreen'));
const NewCaseScreen = lazy(() => import('./screens/NewCaseScreen'));

const SCREEN_MAP: Record<string, ReturnType<typeof lazy>> = {
  dashboard: DashboardScreen,
  tree: DecisionTreeScreen,
  study: StudyEngineScreen,
  pharma: PharmaScreen,
  case: CaseLearningScreen,
  settings: SettingsScreen,
  pharmacotherapy: PharmacotherapyScreen,
  'drug-index': DrugIndexScreen,
  'knowledge-base': KnowledgeBaseScreen,
  patients: PatientsScreen,
  'new-case': NewCaseScreen,
};

function LoadingFallback() {
  return (
    <div className="flex items-center justify-center h-full p-12">
      <div className="flex flex-col items-center gap-3">
        <ClinovaLogo size={40} variant="default" />
        <div className="w-5 h-5 border-2 border-[var(--primary)] border-t-transparent rounded-full animate-spin" />
      </div>
    </div>
  );
}

function RouteFallback({ view, onNavigate }: { view: string; onNavigate: (v: ViewState) => void }) {
  return (
    <div className="flex items-center justify-center h-full p-8">
      <div className="text-center max-w-md">
        <h2 className="text-xl font-bold text-[var(--text)] mb-2">Screen Not Found</h2>
        <p className="text-sm text-[var(--text-muted)] mb-4">
          The screen "{view}" is not available.
        </p>
        <button
          onClick={() => onNavigate('dashboard')}
          className="px-5 py-2 bg-[var(--primary)] text-[var(--on-primary)] rounded-lg text-sm font-medium hover:opacity-90"
        >
          Return to Dashboard
        </button>
      </div>
    </div>
  );
}

const eventBus = EventBus.getInstance();
const brainTree = BrainTree.getInstance();
const syncManager = new RealtimeSyncManager(eventBus, brainTree);
const auditor = new BrainTreeAuditor(eventBus);
const bootManager = AppBootManager.getInstance();
const navGuard = NavigationGuard.getInstance();

function MainApp() {
  const { user, userData, loading } = useAuth();
  const { theme } = useTheme();
  const [activeView, setActiveView] = useState<ViewState>('dashboard');
  const [fatalError, setFatalError] = useState<string | null>(null);
  const [bootPhase, setBootPhase] = useState(bootManager.getPhase());
  const [bootError, setBootError] = useState<string | null>(null);

  const handleNavigate = useCallback((view: ViewState) => {
    const validated = navGuard.validate(view, userData?.role);
    if (validated !== view) {
      logger.warn('navigation', `Route "${view}" invalid, redirecting to "${validated}"`);
    }
    setActiveView(validated);
  }, [userData?.role]);

  useEffect(() => {
    if (!user) {
      setActiveView('login');
    } else if (activeView === 'login') {
      const validated = navGuard.validate('dashboard', userData?.role);
      setActiveView(validated);
    }
  }, [user, activeView, userData?.role]);

  useEffect(() => {
    if (user) {
      bootManager.start();
      bootManager.markComplete('firebase');

      const unsubReady = eventBus.on('boot:ready', ({ degraded }: { degraded?: boolean }) => {
        setBootPhase('ready');
        logger.info('system', `App booted${degraded ? ' (degraded mode)' : ''}`);
      });
      const unsubFailed = eventBus.on('boot:failed', ({ error }: { error: string }) => {
        setBootPhase('error');
        setBootError(error);
        logger.error('system', `Boot failed: ${error}`);
      });

      syncManager.start();

      return () => {
        syncManager.stop();
        unsubReady();
        unsubFailed();
      };
    }
  }, [user]);

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (detail?.view) handleNavigate(detail.view);
    };
    window.addEventListener('clinova:navigate', handler);
    return () => window.removeEventListener('clinova:navigate', handler);
  }, [handleNavigate]);

  useEffect(() => {
    const unsub = eventBus.on('workflow:error', ({ message }: { message: string }) => {
      setFatalError(message);
      logger.warn('workflow', message);
      setTimeout(() => setFatalError(null), 5000);
    });
    return unsub;
  }, []);

  const ScreenComponent = useMemo(
    () => activeView !== 'login' ? SCREEN_MAP[activeView] : null,
    [activeView]
  );

  if (loading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-[var(--bg)]">
        <div className="flex flex-col items-center gap-4">
          <ClinovaLogo size={48} variant={theme === 'dark' ? 'light' : 'default'} />
          <div className="w-5 h-5 border-2 border-[var(--primary)] border-t-transparent rounded-full animate-spin" />
          <span className="text-sm text-[var(--text-muted)] animate-pulse">Initializing Clinova...</span>
        </div>
      </div>
    );
  }

  if (bootPhase === 'error') {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-[var(--bg)] p-8">
        <div className="text-center max-w-md">
          <ClinovaLogo size={40} variant={theme === 'dark' ? 'light' : 'default'} />
          <h2 className="text-xl font-bold text-[var(--text)] mt-4 mb-2">Startup Error</h2>
          <p className="text-sm text-[var(--text-muted)] mb-4">{bootError || 'Failed to initialize services.'}</p>
          <button
            onClick={() => { bootManager.reset(); bootManager.start(); setBootPhase('configuring'); setBootError(null); }}
            className="px-5 py-2 bg-[var(--primary)] text-[var(--on-primary)] rounded-lg text-sm font-medium hover:opacity-90"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <Suspense fallback={<LoadingFallback />}>
        <LoginScreen onNavigate={handleNavigate} />
      </Suspense>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden bg-[var(--bg)]">
      <OverlayHost />
      <Navigation activeView={activeView} onNavigate={handleNavigate} />
      <main className="flex-1 flex flex-col h-screen overflow-hidden md:ml-64">
        <TopBar activeView={activeView} />
        {fatalError && (
          <div className="bg-[var(--danger-container)] border-b border-[var(--danger)]/30 px-6 py-2 text-sm text-[var(--danger)] flex items-center gap-2">
            <span className="font-medium">Recovery:</span> {fatalError}
            <button onClick={() => setFatalError(null)} className="ml-auto underline text-xs">Dismiss</button>
          </div>
        )}
        {bootPhase !== 'ready' && (
          <div className="bg-[var(--info-container)] border-b border-[var(--info)]/30 px-6 py-1.5 text-xs text-[var(--info)] flex items-center gap-2">
            <div className="w-3 h-3 border border-[var(--info)] border-t-transparent rounded-full animate-spin" />
            Initializing services...
          </div>
        )}
        <div className="flex-1 overflow-y-auto touch-pan-y overscroll-y-contain">
          <Suspense fallback={<LoadingFallback />}>
            {ScreenComponent ? <ScreenComponent /> : <RouteFallback view={activeView} onNavigate={handleNavigate} />}
          </Suspense>
        </div>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <UIModeProvider>
          <AuthProvider>
            <MainApp />
          </AuthProvider>
        </UIModeProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

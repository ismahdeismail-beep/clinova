import { useState, useEffect, useCallback, useMemo, lazy, Suspense, type LazyExoticComponent, type ComponentType } from 'react';
import Navigation from './components/Navigation';
import TopBar from './components/TopBar';
import { ErrorBoundary } from './components/ErrorBoundary';
import type { ViewState } from './types';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { BrainRouter, NavigationGraph, EventBus } from './engine';
import { useClinicalStore } from './store/clinicalStore';
import { NavigationDebugger } from './debug/navigation';
import { BrainTreeAuditor } from './core/selfHealing';
import { RealtimeSyncManager } from './core/sync';
import { ClinicalValidator } from './clinical/validator';

const LoginScreen = lazy(() => import('./screens/LoginScreen'));
const DashboardScreen = lazy(() => import('./screens/DashboardScreen'));
const StudyEngineScreen = lazy(() => import('./screens/StudyEngineScreen'));
const PharmaScreen = lazy(() => import('./screens/PharmaScreen'));
const CaseLearningScreen = lazy(() => import('./screens/CaseLearningScreen'));
const SettingsScreen = lazy(() => import('./screens/SettingsScreen'));
const DecisionTreeScreen = lazy(() => import('./screens/DecisionTreeScreen'));

const router = BrainRouter.getInstance();
const navGraph = NavigationGraph.getInstance();
const eventBus = EventBus.getInstance();
const auditor = new BrainTreeAuditor(eventBus);
const syncManager = new RealtimeSyncManager(eventBus);
syncManager.configure({ autoSync: true, collections: ['workflows', 'workflow_nodes', 'rules'], conflictStrategy: 'timestamp', offlineQueueEnabled: true, healthCheckInterval: 30000 });
const validator = new ClinicalValidator();

const ADMIN_PLACEHOLDER: ComponentType = () => (
  <div className="flex items-center justify-center h-full text-[#6B7280] font-mono">
    [GOVERNANCE CONSOLE - ENCRYPTED]
  </div>
);

const SCREEN_MAP: Record<Exclude<ViewState, 'login'>, LazyExoticComponent<ComponentType> | ComponentType> = {
  dashboard: DashboardScreen,
  tree: DecisionTreeScreen,
  study: StudyEngineScreen,
  pharma: PharmaScreen,
  case: CaseLearningScreen,
  settings: SettingsScreen,
  admin: ADMIN_PLACEHOLDER,
};

function LoadingFallback() {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="w-6 h-6 border-2 border-[#00E5FF] border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

function MainApp() {
  const { user, loading } = useAuth();
  const setView = useClinicalStore((s) => s.setView);
  const [activeView, setActiveView] = useState<ViewState>('dashboard');

  useEffect(() => {
    syncManager.start();
    return () => { syncManager.stop(); };
  }, []);

  useEffect(() => {
    if (!user) {
      setActiveView('login');
    } else if (activeView === 'login') {
      setActiveView('dashboard');
    }
  }, [user, activeView]);

  const handleNavigate = useCallback((view: ViewState) => {
    setActiveView(view);
    setView(view);
    router.navigate(view);
  }, [setView]);

  const ScreenComponent = useMemo(
    () => activeView !== 'login' ? SCREEN_MAP[activeView] : null,
    [activeView]
  );

  if (loading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-[#0E0E10] text-[#00E5FF] font-mono text-sm tracking-widest uppercase">
        <span className="animate-pulse">Initializing Clinova OS...</span>
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
    <div className="flex h-screen overflow-hidden bg-background">
      <Navigation activeView={activeView} onNavigate={handleNavigate} />
      <main className="md:ml-72 flex-1 flex flex-col h-screen relative overflow-hidden bg-background">
        <TopBar activeView={activeView} />
        <div className="mt-16 p-6 lg:p-10 overflow-y-auto w-full h-[calc(100vh-4rem)]">
          <Suspense fallback={<LoadingFallback />}>
            {ScreenComponent && <ScreenComponent />}
          </Suspense>
        </div>
      </main>
      <NavigationDebugger navigationGraph={navGraph} brainRouter={router} eventBus={eventBus} />
    </div>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <MainApp />
      </AuthProvider>
    </ErrorBoundary>
  );
}

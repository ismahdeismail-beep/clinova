import { useState, useEffect, useCallback, useMemo, lazy, Suspense } from 'react';
import Navigation from './components/Navigation';
import TopBar from './components/TopBar';
import ClinovaLogo from './components/ClinovaLogo';
import { ErrorBoundary } from './components/ErrorBoundary';
import type { ViewState } from './types';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { EventBus } from './engine/EventBus';
import { BrainTreeAuditor, WorkflowRepairEngine } from './core/selfHealing';
import { RealtimeSyncManager } from './core/sync';
import { BrainTree } from './engine/BrainTree';

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
        <div className="w-5 h-5 border-2 border-[#2563EB] border-t-transparent rounded-full animate-spin" />
      </div>
    </div>
  );
}

function RouteFallback({ view, onNavigate }: { view: string; onNavigate: (v: ViewState) => void }) {
  return (
    <div className="flex items-center justify-center h-full p-8">
      <div className="text-center max-w-md">
        <h2 className="text-xl font-bold text-[#0F172A] mb-2">Screen Not Found</h2>
        <p className="text-sm text-[#64748B] mb-4">
          The screen "{view}" is not available. This may be a navigation error.
        </p>
        <button
          onClick={() => onNavigate('dashboard')}
          className="px-5 py-2 bg-[#2563EB] text-white rounded-lg text-sm font-medium hover:bg-[#1D4ED8]"
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

function MainApp() {
  const { user, loading } = useAuth();
  const [activeView, setActiveView] = useState<ViewState>('dashboard');
  const [fatalError, setFatalError] = useState<string | null>(null);

  const handleNavigate = useCallback((view: ViewState) => {
    if (!SCREEN_MAP[view]) {
      setActiveView('dashboard');
      return;
    }
    setActiveView(view);
  }, []);

  useEffect(() => {
    if (!user) {
      setActiveView('login');
    } else if (activeView === 'login') {
      setActiveView('dashboard');
    }
  }, [user, activeView]);

  useEffect(() => {
    if (user) {
      syncManager.start();
    }
    return () => { syncManager.stop(); };
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
      <div className="h-screen w-screen flex items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-4">
          <ClinovaLogo size={48} variant="default" />
          <div className="w-5 h-5 border-2 border-[#2563EB] border-t-transparent rounded-full animate-spin" />
          <span className="text-sm text-[#64748B] animate-pulse">Initializing Clinova...</span>
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
    <div className="flex h-screen overflow-hidden bg-[#F8FAFC]">
      <Navigation activeView={activeView} onNavigate={handleNavigate} />
      <main className="flex-1 flex flex-col h-screen overflow-hidden md:ml-64">
        <TopBar activeView={activeView} />
        {fatalError && (
          <div className="bg-[#FEF2F2] border-b border-[#FECACA] px-6 py-2 text-sm text-[#DC2626] flex items-center gap-2">
            <span className="font-medium">Recovery:</span> {fatalError}
            <button onClick={() => setFatalError(null)} className="ml-auto underline text-xs">Dismiss</button>
          </div>
        )}
        <div className="flex-1 overflow-y-auto">
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
      <AuthProvider>
        <MainApp />
      </AuthProvider>
    </ErrorBoundary>
  );
}

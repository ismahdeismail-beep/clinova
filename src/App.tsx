/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import TopBar from './components/TopBar';
import { ViewState } from './types';
import { AuthProvider, useAuth } from './contexts/AuthContext';

// Screen imports
import LoginScreen from './screens/LoginScreen';
import DashboardScreen from './screens/DashboardScreen';
import StudyEngineScreen from './screens/StudyEngineScreen';
import PharmaScreen from './screens/PharmaScreen';
import CaseLearningScreen from './screens/CaseLearningScreen';
import SettingsScreen from './screens/SettingsScreen';
import DecisionTreeScreen from './screens/DecisionTreeScreen';

function MainApp() {
  const { user, loading } = useAuth();
  const [activeView, setActiveView] = useState<ViewState>('dashboard');

  useEffect(() => {
    if (!user) {
      setActiveView('login');
    } else if (activeView === 'login') {
      setActiveView('dashboard');
    }
  }, [user, activeView]);

  if (loading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-[#0E0E10] text-[#00E5FF] font-mono text-sm tracking-widest uppercase">
        <span className="animate-pulse">Initializing Clinova OS...</span>
      </div>
    );
  }

  if (!user) {
    return <LoginScreen />;
  }

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Navigation activeView={activeView} onNavigate={setActiveView} />
      
      <main className="md:ml-72 flex-1 flex flex-col h-screen relative overflow-hidden bg-background">
        <TopBar activeView={activeView} onNavigate={setActiveView} />
        
        <div className="mt-16 pb-24 md:pb-6 p-4 md:p-6 lg:p-10 overflow-y-auto w-full h-[calc(100vh-4rem)]">
          {activeView === 'dashboard' && <DashboardScreen />}
          {activeView === 'tree' && <DecisionTreeScreen />}
          {activeView === 'study' && <StudyEngineScreen />}
          {activeView === 'pharma' && <PharmaScreen />}
          {activeView === 'case' && <CaseLearningScreen />}
          {activeView === 'settings' && <SettingsScreen />}
          {activeView === 'admin' && (
            <div className="flex items-center justify-center h-full text-on-surface-variant font-mono">
              [GOVERNANCE CONSOLE - ENCRYPTED]
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}

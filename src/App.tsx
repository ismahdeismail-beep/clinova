import React from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { 
  Home, Users, FolderOpen, ClipboardList, Pill, Bot, 
  BookOpen, BarChart3, Bell, Settings, Menu, X, Stethoscope
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

function Sidebar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = React.useState(false);

  const links = [
    { to: '/', label: 'Dashboard', icon: Home },
    { to: '/patients', label: 'Patients', icon: Users },
    { to: '/cases', label: 'Clinical Cases', icon: FolderOpen },
    { to: '/review', label: 'Pharmacotherapy Review', icon: ClipboardList },
    { to: '/drugs', label: 'Drug Index', icon: Pill },
    { to: '/assistant', label: 'Clinical Assistant', icon: Bot },
    { to: '/knowledge', label: 'Knowledge Base', icon: BookOpen },
    { to: '/reports', label: 'Reports', icon: BarChart3 },
    { to: '/notifications', label: 'Notifications', icon: Bell },
    { to: '/settings', label: 'Settings', icon: Settings },
  ];

  return (
    <>
      <button 
        className="md:hidden fixed top-4 right-4 z-50 p-2 bg-[var(--surface)] rounded-md border border-[var(--border)]"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      <div className={`fixed inset-y-0 left-0 z-40 w-64 bg-[var(--surface)] border-r border-[var(--border)] transform transition-transform duration-200 ease-in-out md:translate-x-0 overflow-y-auto flex flex-col ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6 border-b border-[var(--border)] shrink-0">
          <div className="flex items-center gap-2 text-[var(--primary)] font-bold text-xl tracking-tight">
            <Stethoscope size={24} strokeWidth={2.5} />
            CLINOVA
          </div>
          <p className="text-[10px] text-[var(--text-muted)] mt-1 font-semibold uppercase tracking-wider">Clinical Intelligence Platform</p>
        </div>
        <nav className="p-4 space-y-1 flex-1">
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
        <div className="p-4 border-t border-[var(--border)]">
           <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[var(--primary-container)] flex items-center justify-center text-[var(--primary)] font-bold text-sm shrink-0">
                Dr
              </div>
              <div className="overflow-hidden">
                <p className="text-sm font-medium text-[var(--text)] truncate">Dr. Sarah K.</p>
                <p className="text-xs text-[var(--text-muted)] truncate">Clinical Pharmacist</p>
              </div>
           </div>
        </div>
      </div>
      
      {/* Backdrop for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] flex">
        <Sidebar />
        <main className="flex-1 md:ml-64 w-full h-screen overflow-y-auto">
          <Routes>
            <Route path="/" element={<DashboardScreen />} />
            <Route path="/patients" element={<PatientsScreen />} />
            <Route path="/cases" element={<ClinicalCasesScreen />} />
            <Route path="/review" element={<PharmacotherapyReviewScreen />} />
            <Route path="/drugs" element={<DrugIndexScreen />} />
            <Route path="/assistant" element={<ClinicalAssistantScreen />} />
            <Route path="/knowledge" element={<KnowledgeBaseScreen />} />
            <Route path="/reports" element={<ReportsScreen />} />
            <Route path="/notifications" element={<NotificationsScreen />} />
            <Route path="/settings" element={<SettingsScreen />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

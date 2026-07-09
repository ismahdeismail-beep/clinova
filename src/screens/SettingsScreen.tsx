import React, { useState } from 'react';
import { User, Cpu, Key, HelpCircle, CheckCircle, ExternalLink, Sun, Moon } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';

export default function SettingsScreen() {
  const { userData } = useAuth();
  const { theme, setTheme } = useTheme();
  const [activeTab, setActiveTab] = useState<'profile' | 'api'>('profile');
  const isAdmin = userData?.role === 'admin';

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6 pb-24 selection:bg-[var(--primary)] selection:text-[var(--primary-foreground)]">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-[var(--text)] mb-2 tracking-tight">Settings & Configuration</h1>
        <p className="text-[var(--text-muted)] text-sm">Manage your profile, credentials, and app intelligence settings.</p>
      </div>

      <div className={isAdmin ? "grid grid-cols-1 md:grid-cols-4 gap-6" : "max-w-3xl mx-auto"}>
        {/* Left Navigation Tabs */}
        {isAdmin && (
          <div className="md:col-span-1 space-y-2">
            <button 
              onClick={() => setActiveTab('profile')}
              className={`w-full text-left px-4 py-3 rounded-xl text-sm transition-all flex items-center gap-2.5 font-medium ${
                activeTab === 'profile' 
                  ? 'bg-[var(--primary)] text-[var(--primary-foreground)] shadow-sm' 
                  : 'bg-[var(--surface)] hover:bg-[var(--surface-dim)] text-[var(--text)] border border-[var(--border)]'
              }`}
            >
              <User size={16} />
              Profile Settings
            </button>
            
            <button 
              onClick={() => setActiveTab('api')}
              className={`w-full text-left px-4 py-3 rounded-xl text-sm transition-all flex items-center gap-2.5 font-medium ${
                activeTab === 'api' 
                  ? 'bg-[var(--primary)] text-[var(--primary-foreground)] shadow-sm' 
                  : 'bg-[var(--surface)] hover:bg-[var(--surface-dim)] text-[var(--text)] border border-[var(--border)]'
              }`}
            >
              <Cpu size={16} />
              AI Brain & API Setup
            </button>
          </div>
        )}

        {/* Content Area */}
        <div className={isAdmin ? "md:col-span-3" : "w-full"}>
          {activeTab === 'profile' ? (
            <div className="bg-[var(--surface)] p-6 rounded-2xl border border-[var(--border)] shadow-sm space-y-6 animate-in fade-in duration-200">
              <h3 className="text-lg font-bold text-[var(--text)] flex items-center gap-2">
                <User size={20} className="text-[var(--primary)]" /> Profile Details
              </h3>
              
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider">Full Name</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-2.5 border border-[var(--border)] rounded-xl bg-[var(--surface-dim)] text-[var(--text-muted)] outline-none text-sm font-medium" 
                    value={userData?.name || 'Guest User'} 
                    disabled 
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider">Email Address</label>
                  <input 
                    type="email" 
                    className="w-full px-4 py-2.5 border border-[var(--border)] rounded-xl bg-[var(--surface-dim)] text-[var(--text-muted)] outline-none text-sm font-medium" 
                    value={userData?.email || 'N/A'} 
                    disabled 
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider">Role / Privilege</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-2.5 border border-[var(--border)] rounded-xl bg-[var(--surface-dim)] text-[var(--text-muted)] outline-none text-sm font-medium capitalize" 
                    value={userData?.role || 'User'} 
                    disabled 
                  />
                </div>
              </div>

              {/* Academic Level & Personalization */}
              <div className="border-t border-[var(--border)] pt-6">
                <h4 className="text-sm font-bold text-[var(--text)] mb-2 flex items-center gap-2">
                  Academic Level & Learning Personalization
                </h4>
                <p className="text-xs text-[var(--text-muted)] mb-3">
                  Currently set to: <strong className="text-[var(--primary)]">{userData?.academicLevel || 'Not set'}</strong> with <strong className="text-[var(--primary)]">{userData?.clinicalInterests?.length || 0}</strong> systems of interest.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    window.dispatchEvent(new CustomEvent('open-onboarding'));
                  }}
                  className="px-4 py-2 bg-[var(--surface-dim)] hover:bg-[var(--primary-container)]/20 border border-[var(--border)] hover:border-[var(--primary)]/30 text-xs font-bold text-[var(--text)] hover:text-[var(--primary)] rounded-xl transition-all cursor-pointer inline-flex items-center gap-2 select-none"
                  id="adjust-academic-level-button"
                >
                  Adjust Academic Level & Clinical Focus
                </button>
              </div>

              {/* Theme Settings Selector Card */}
              <div className="border-t border-[var(--border)] pt-6">
                <h4 className="text-sm font-bold text-[var(--text)] mb-2 flex items-center gap-2">
                  Appearance Mode
                </h4>
                <p className="text-xs text-[var(--text-muted)] mb-4">Select your preferred user interface visual style for Clinova OS.</p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setTheme('light')}
                    className={`flex items-center gap-3 p-4 rounded-xl border transition-all text-left cursor-pointer ${
                      theme === 'light'
                        ? 'border-[var(--primary)] bg-[var(--primary-container)]/10 text-[var(--text)] font-semibold shadow-sm'
                        : 'border-[var(--border)] bg-[var(--surface-dim)]/30 hover:bg-[var(--surface-dim)]/50 text-[var(--text-muted)] hover:text-[var(--text)]'
                    }`}
                  >
                    <div className={`p-2 rounded-lg ${theme === 'light' ? 'bg-[var(--primary)] text-[var(--primary-foreground)]' : 'bg-[var(--surface-dim)] text-[var(--text-muted)]'}`}>
                      <Sun size={18} />
                    </div>
                    <div>
                      <span className="text-sm block font-semibold animate-none">Vibrant Light Mode</span>
                      <span className="text-[10px] text-[var(--text-muted)] block mt-0.5">Clean, high-contrast, eye-friendly</span>
                    </div>
                  </button>
                  
                  <button
                    type="button"
                    onClick={() => setTheme('dark')}
                    className={`flex items-center gap-3 p-4 rounded-xl border transition-all text-left cursor-pointer ${
                      theme === 'dark'
                        ? 'border-[var(--primary)] bg-[var(--primary-container)]/10 text-[var(--text)] font-semibold shadow-sm'
                        : 'border-[var(--border)] bg-[var(--surface-dim)]/30 hover:bg-[var(--surface-dim)]/50 text-[var(--text-muted)] hover:text-[var(--text)]'
                    }`}
                  >
                    <div className={`p-2 rounded-lg ${theme === 'dark' ? 'bg-[var(--primary)] text-[var(--primary-foreground)]' : 'bg-[var(--surface-dim)] text-[var(--text-muted)]'}`}>
                      <Moon size={18} />
                    </div>
                    <div>
                      <span className="text-sm block font-semibold animate-none">Premium Dark Mode</span>
                      <span className="text-[10px] text-[var(--text-muted)] block mt-0.5">Cosmic dark, comfortable in low light</span>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-[var(--surface)] p-6 rounded-2xl border border-[var(--border)] shadow-sm space-y-6 animate-in fade-in duration-200">
              <div className="flex items-start justify-between gap-4 border-b border-[var(--border)] pb-4">
                <div>
                  <h3 className="text-lg font-bold text-[var(--text)] flex items-center gap-2">
                    <Key size={20} className="text-amber-500" /> API Keys & Core "Brain" Setup
                  </h3>
                  <p className="text-xs text-[var(--text-muted)] mt-1">Configure the keys that power the AI clinical autofill, pharmacy index chat, and case studies.</p>
                </div>
                <span className="px-2.5 py-1 bg-amber-500/10 text-amber-500 border border-amber-500/20 rounded-full text-[10px] font-bold tracking-wider uppercase">
                  Security Safe
                </span>
              </div>

              {/* Instructions Panel */}
              <div className="bg-[var(--surface-dim)] border border-[var(--border)] p-5 rounded-xl space-y-4">
                <h4 className="font-bold text-sm text-[var(--text)] flex items-center gap-2">
                  <HelpCircle size={16} className="text-[var(--primary)]" /> Where to put the API Keys?
                </h4>
                
                <div className="text-sm text-[var(--text-muted)] space-y-3 leading-relaxed">
                  <p>
                    Because this is an secure, container-isolated workspace, you should <strong className="text-[var(--text)]">never</strong> expose, paste, or hardcode your secret keys inside the code files themselves. Instead, you can manage secrets using our platform's secure environment settings:
                  </p>
                  
                  <ol className="list-decimal list-inside space-y-2 font-medium text-[var(--text)]">
                    <li>
                      Open the <strong className="text-[var(--primary)]">Settings Menu (Settings Gear)</strong> in the top-right or left-sidebar of the AI Studio development console.
                    </li>
                    <li>
                      Add an environment variable named <code className="bg-black/5 dark:bg-white/10 px-1.5 py-0.5 rounded font-mono text-xs text-red-500">GEMINI_API_KEY</code>.
                    </li>
                    <li>
                      Paste your secure key from <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noreferrer" className="text-[var(--primary)] underline hover:text-[var(--primary-dark)] inline-flex items-center gap-1">Google AI Studio <ExternalLink size={12} /></a> as the value.
                    </li>
                    <li>
                      Click save. The system will securely inject it at runtime without exposing it to the client/browser!
                    </li>
                  </ol>
                </div>
              </div>

              {/* Secret Keys List */}
              <div className="space-y-4">
                <h4 className="font-bold text-sm text-[var(--text)] uppercase tracking-wider">Required Environment Keys</h4>
                
                <div className="divide-y divide-[var(--border)] border border-[var(--border)] rounded-xl overflow-hidden">
                  <div className="p-4 bg-[var(--surface-dim)] flex flex-col sm:flex-row justify-between sm:items-center gap-3">
                    <div>
                      <span className="font-mono text-xs font-bold text-red-500 bg-red-500/10 px-2 py-0.5 rounded">GEMINI_API_KEY</span>
                      <p className="text-xs text-[var(--text-muted)] mt-1.5">Powers the Clinical Assistant, automatic form-filling recommendations, drug lookup monographs, and exam study generators.</p>
                    </div>
                    <span className="text-[10px] font-bold text-amber-600 bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded-full uppercase shrink-0 w-fit">
                      Runtime Managed
                    </span>
                  </div>

                  <div className="p-4 bg-[var(--surface-dim)] flex flex-col sm:flex-row justify-between sm:items-center gap-3">
                    <div>
                      <span className="font-mono text-xs font-bold text-blue-500 bg-blue-500/10 px-2 py-0.5 rounded">FIREBASE CREDENTIALS</span>
                      <p className="text-xs text-[var(--text-muted)] mt-1.5">Provides persistent clinical data storage, patient registries, case studies libraries, and user authentication.</p>
                    </div>
                    <span className="text-[10px] font-bold text-green-600 bg-green-500/10 border border-green-500/20 px-2.5 py-1 rounded-full uppercase shrink-0 w-fit">
                      Active
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

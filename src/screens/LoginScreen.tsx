import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Mail, ArrowRight, UserCheck, 
  Shield, Sparkles, ArrowLeft, Loader2
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import ClinovaLogo from '../components/ClinovaLogo';

export default function LoginScreen() {
  const { loginWithGoogle, loginReturning } = useAuth();
  const navigate = useNavigate();
  
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'google' | 'returning'>('google');

  const handleGoogleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await loginWithGoogle();
      navigate('/');
    } catch (e) {
      console.error(e);
      setIsLoading(false);
    }
  };

  const handleReturningSubmit = async (name: string, role: 'admin' | 'user') => {
    setIsLoading(true);
    try {
      await loginReturning(name, role);
      navigate('/');
    } catch (e) {
      console.error(e);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg)] flex flex-col items-center justify-center p-4 selection:bg-[var(--primary)] selection:text-white">
      {/* Top back link */}
      <div className="w-full max-w-md mb-4 flex items-center justify-between">
        <Link 
          to="/landing" 
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--text-muted)] hover:text-[var(--primary)] transition-colors"
        >
          <ArrowLeft size={14} /> Back to Overview
        </Link>
        <span className="text-[10px] font-mono text-[var(--text-muted)] bg-[var(--surface)] border border-[var(--border)] px-2 py-0.5 rounded">Secure Portal</span>
      </div>

      <div className="w-full max-w-md bg-[var(--surface)]/80 backdrop-blur-md border border-[var(--border)] rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-400">
        
        {/* Header */}
        <div className="p-8 pb-6 text-center bg-gradient-to-b from-[var(--primary-container)]/50 to-transparent">
          <div className="w-16 h-16 bg-[var(--primary)] text-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-[var(--primary)]/30">
            <ClinovaLogo size={32} variant="light" />
          </div>
          <h1 className="text-2xl font-bold text-[var(--text)] tracking-tight">Sign In Portal</h1>
          <p className="text-xs text-[var(--text-muted)] mt-1">Access Clinova Pharmacy AI &amp; Study Hub</p>
        </div>

        {/* Option Tabs */}
        <div className="px-6 flex bg-[var(--surface-dim)]/50 p-1 mx-6 rounded-xl border border-[var(--border)] mb-6 backdrop-blur-sm">
          <button
            type="button"
            onClick={() => setActiveTab('google')}
            className={`flex-1 py-2.5 text-xs font-semibold rounded-lg transition-all ${activeTab === 'google' ? 'bg-[var(--surface)] text-[var(--text)] shadow-sm' : 'text-[var(--text-muted)] hover:text-[var(--text)]'}`}
          >
            Google Email (1st Time)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('returning')}
            className={`flex-1 py-2.5 text-xs font-semibold rounded-lg transition-all ${activeTab === 'returning' ? 'bg-[var(--surface)] text-[var(--text)] shadow-sm' : 'text-[var(--text-muted)] hover:text-[var(--text)]'}`}
          >
            Returning Access
          </button>
        </div>

        <div className="p-8 pt-0">
          {/* Tab 1: Google Email Login */}
          {activeTab === 'google' && (
            <form onSubmit={handleGoogleSubmit} className="space-y-4 animate-in fade-in duration-200">
              <div className="text-left space-y-1.5">
                <label className="text-xs font-semibold text-[var(--text)] block">
                  Google Email Address
                </label>
                <div className="relative">
                  <Mail size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="pharmacist@gmail.com"
                    className="w-full pl-10 pr-4 py-3.5 bg-[var(--bg)] border border-[var(--border)] rounded-xl text-sm text-[var(--text)] focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/10 outline-none transition-all"
                  />
                </div>
                <p className="text-[11px] text-[var(--text-muted)]">
                  Entering your Google email will instantly grant access to your AI study &amp; practice assistant.
                </p>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 px-4 bg-[var(--text)] hover:bg-black dark:bg-white dark:text-black dark:hover:bg-gray-100 text-white font-semibold text-sm rounded-xl transition-all shadow-md flex items-center justify-center gap-2 active:scale-[0.98] disabled:opacity-50"
              >
                {isLoading ? (
                  <Loader2 size={18} className="animate-spin" />
                ) : (
                  <>
                    <svg className="w-4 h-4" viewBox="0 0 24 24">
                      <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                    </svg>
                    Continue with Google
                  </>
                )}
              </button>
            </form>
          )}

          {/* Tab 2: Returning User Access */}
          {activeTab === 'returning' && (
            <div className="space-y-3 animate-in fade-in duration-200">
              <p className="text-xs font-medium text-[var(--text-muted)] text-left mb-2">
                Not your 1st time? Select account for instant access:
              </p>

              <button
                onClick={() => handleReturningSubmit('Sarah Kimani (Admin)', 'admin')}
                disabled={isLoading}
                className="w-full p-4 bg-[var(--bg)] hover:bg-[var(--primary-container)]/40 border border-[var(--border)] hover:border-[var(--primary)] rounded-2xl flex items-center justify-between text-left transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-purple-500/10 text-purple-600 flex items-center justify-center font-bold text-sm">
                    SK
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[var(--text)] group-hover:text-[var(--primary)]">Sarah Kimani</h3>
                    <p className="text-[11px] text-[var(--text-muted)]">Admin Access (Add Books &amp; URLs)</p>
                  </div>
                </div>
                <UserCheck size={18} className="text-[var(--text-muted)] group-hover:text-[var(--primary)]" />
              </button>

              <button
                onClick={() => handleReturningSubmit('John Doe (Pharmacist)', 'user')}
                disabled={isLoading}
                className="w-full p-4 bg-[var(--bg)] hover:bg-[var(--primary-container)]/40 border border-[var(--border)] hover:border-[var(--primary)] rounded-2xl flex items-center justify-between text-left transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-500/10 text-blue-600 flex items-center justify-center font-bold text-sm">
                    JD
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[var(--text)] group-hover:text-[var(--primary)]">John Doe</h3>
                    <p className="text-[11px] text-[var(--text-muted)]">Standard Access (Upload Notes &amp; PDFs)</p>
                  </div>
                </div>
                <UserCheck size={18} className="text-[var(--text-muted)] group-hover:text-[var(--primary)]" />
              </button>
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="px-8 py-4 bg-[var(--surface-dim)]/50 border-t border-[var(--border)] text-center text-[11px] text-[var(--text-muted)] flex items-center justify-center gap-2 backdrop-blur-sm">
          <Shield size={12} className="text-emerald-500" /> Secure healthcare &amp; student study environment.
        </div>
      </div>
    </div>
  );
}


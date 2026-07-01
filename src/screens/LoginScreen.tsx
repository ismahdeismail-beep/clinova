import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Mail, Lock, User, Loader2, Shield, Sparkles, AlertCircle, ArrowRight
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import ClinovaLogo from '../components/ClinovaLogo';

export default function LoginScreen() {
  const { loginWithEmail, signUpWithEmail, loginAs } = useAuth();
  const navigate = useNavigate();
  
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg(null);
    
    try {
      if (isSignUp) {
        await signUpWithEmail(email, password, name);
      } else {
        await loginWithEmail(email, password);
      }
      navigate('/');
    } catch (err: any) {
      console.error(err);
      let friendlyMessage = err?.message || 'Authentication failed. Please check your details.';
      if (err?.code === 'auth/email-already-in-use') {
        friendlyMessage = 'This email is already registered. Please sign in instead.';
      } else if (err?.code === 'auth/weak-password') {
        friendlyMessage = 'Password must be at least 6 characters.';
      } else if (err?.code === 'auth/invalid-credential' || err?.code === 'auth/user-not-found' || err?.code === 'auth/wrong-password') {
        friendlyMessage = 'Incorrect email or password.';
      } else if (err?.code === 'auth/invalid-email') {
        friendlyMessage = 'Please enter a valid email address.';
      }
      setErrorMsg(friendlyMessage);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg)] flex flex-col items-center justify-center p-4 selection:bg-[var(--primary)] selection:text-white">
      <div className="w-full max-w-md bg-[var(--surface)] border border-[var(--border)] rounded-3xl shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-300">
        
        {/* Logo and Greeting */}
        <div className="p-8 pb-4 text-center bg-gradient-to-b from-[var(--primary-container)]/30 to-transparent">
          <div className="w-14 h-14 bg-[var(--primary)] text-white rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-md shadow-[var(--primary)]/20">
            <ClinovaLogo size={28} variant="light" />
          </div>
          <h1 className="text-xl font-bold text-[var(--text)] tracking-tight">
            {isSignUp ? 'Create Account' : 'Welcome to Clinova'}
          </h1>
          <p className="text-xs text-[var(--text-muted)] mt-1">
            {isSignUp ? 'Sign up to start your practice review' : 'Sign in to access patient reviews & KDI engine'}
          </p>
        </div>

        <div className="px-8 pb-8 pt-2">
          {errorMsg && (
            <div className="mb-4 p-3.5 bg-red-500/10 border border-red-500/20 rounded-xl flex items-start gap-2 text-xs text-red-700 dark:text-red-400">
              <AlertCircle size={16} className="shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignUp && (
              <div className="space-y-1">
                <label className="text-xs font-semibold text-[var(--text)] block">Full Name</label>
                <div className="relative">
                  <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Dr. Jane Doe"
                    className="w-full pl-10 pr-4 py-2.5 bg-[var(--bg)] border border-[var(--border)] rounded-xl text-xs sm:text-sm text-[var(--text)] focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/10 outline-none transition-all"
                  />
                </div>
              </div>
            )}

            <div className="space-y-1">
              <label className="text-xs font-semibold text-[var(--text)] block">Email Address</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full pl-10 pr-4 py-2.5 bg-[var(--bg)] border border-[var(--border)] rounded-xl text-xs sm:text-sm text-[var(--text)] focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/10 outline-none transition-all"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-[var(--text)] block">Password</label>
              <div className="relative">
                <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2.5 bg-[var(--bg)] border border-[var(--border)] rounded-xl text-xs sm:text-sm text-[var(--text)] focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/10 outline-none transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 bg-[var(--primary)] text-white hover:opacity-95 font-semibold text-xs sm:text-sm rounded-xl transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isLoading ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <>
                  {isSignUp ? 'Create Account' : 'Sign In'}
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>

          {/* Switch Toggle */}
          <div className="mt-4 text-center">
            <button
              type="button"
              onClick={() => {
                setIsSignUp(!isSignUp);
                setErrorMsg(null);
              }}
              className="text-xs text-[var(--primary)] hover:underline font-medium"
            >
              {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
            </button>
          </div>

        </div>

        {/* Footer */}
        <div className="px-8 py-3.5 bg-[var(--surface-dim)]/50 border-t border-[var(--border)] text-center text-[10px] text-[var(--text-muted)] flex items-center justify-center gap-1.5">
          <Shield size={12} className="text-emerald-500 shrink-0" /> Secure clinical &amp; research hub.
        </div>
      </div>
    </div>
  );
}

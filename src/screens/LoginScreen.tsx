import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2, Shield, AlertCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import ClinovaLogo from '../components/ClinovaLogo';

export default function LoginScreen() {
  const { loginWithGoogle, userData } = useAuth();
  const navigate = useNavigate();
  
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  React.useEffect(() => {
    if (userData) {
      navigate('/', { replace: true });
    }
  }, [userData, navigate]);

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setErrorMsg(null);
    try {
      await loginWithGoogle();
      navigate('/');
    } catch (err: any) {
      console.error(err);
      setErrorMsg('Google authentication failed. Please try again.');
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
            Welcome to Clinova
          </h1>
          <p className="text-xs text-[var(--text-muted)] mt-1">
            Sign in to access patient reviews & KDI engine
          </p>
        </div>

        <div className="px-8 pb-8 pt-6">
          {errorMsg && (
            <div className="mb-6 p-3.5 bg-red-500/10 border border-red-500/20 rounded-xl flex items-start gap-2 text-xs text-red-700 dark:text-red-400">
              <AlertCircle size={16} className="shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          <button
            onClick={handleGoogleLogin}
            disabled={isLoading}
            className="w-full py-3 bg-[var(--surface-dim)] border border-[var(--border)] hover:bg-[var(--surface-hover)] text-[var(--text)] font-semibold text-sm rounded-xl transition-all shadow-sm flex items-center justify-center gap-3 disabled:opacity-50"
          >
            {isLoading ? (
              <Loader2 size={20} className="animate-spin text-[var(--primary)]" />
            ) : (
              <>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Continue with Google
              </>
            )}
          </button>
        </div>

        {/* Footer */}
        <div className="px-8 py-3.5 bg-[var(--surface-dim)]/50 border-t border-[var(--border)] text-center text-[10px] text-[var(--text-muted)] flex items-center justify-center gap-1.5">
          <Shield size={12} className="text-emerald-500 shrink-0" /> Secure clinical &amp; research hub.
        </div>
      </div>
    </div>
  );
}

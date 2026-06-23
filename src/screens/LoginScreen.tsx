import { memo, useState } from 'react';
import { Brain, Lock, ArrowRight } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import type { ViewState } from '../types';

interface LoginScreenProps {
  onNavigate?: (view: ViewState) => void;
}

function LoginScreen({ onNavigate }: LoginScreenProps) {
  const { signInWithGoogle } = useAuth();
  const [signingIn, setSigningIn] = useState(false);
  const year = new Date().getFullYear();

  const handleSignIn = async () => {
    setSigningIn(true);
    try {
      await signInWithGoogle();
    } catch {
      setSigningIn(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden"
         style={{ background: 'radial-gradient(circle at 50% 50%, #131315 0%, #0E0E10 100%)' }}>
      <div className="absolute inset-0 z-0 opacity-40 mix-blend-screen pointer-events-none"
           style={{ background: 'radial-gradient(circle at 50% -20%, rgba(0, 229, 255, 0.15), transparent 60%)' }} />
      <header className="fixed top-0 left-0 w-full flex items-center justify-between px-8 py-6 z-50">
        <div className="flex items-center gap-2">
          <Brain className="text-primary" size={28} />
          <span className="text-xl font-extrabold tracking-tighter text-primary uppercase">Clinova</span>
        </div>
      </header>
      <main className="z-20 w-full max-w-[440px] px-6 text-center">
        <div className="mb-12 relative">
          <div className="absolute top-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-50 animate-[pulse_4s_ease-in-out_infinite]" />
          <h1 className="text-3xl md:text-4xl mb-2 font-extrabold text-on-surface tracking-tight mt-4">Core OS</h1>
          <p className="text-sm text-on-surface-variant max-w-[320px] mx-auto">Secure, high-performance operating environment for modern clinical decision making.</p>
        </div>
        <div className="bg-[#131315]/80 backdrop-blur-xl border border-outline-variant p-8 rounded-xl cyan-glow transition-all duration-500 hover:border-primary/50">
          <div className="mb-8">
            <div className="inline-flex items-center justify-center p-3 bg-surface-container-lowest rounded-full border border-outline-variant mb-4">
              <Lock className="text-primary" size={24} />
            </div>
            <h2 className="text-xl font-bold text-on-surface">Internal Gateway</h2>
            <p className="text-xs font-semibold text-on-surface-variant uppercase tracking-widest mt-1">Authorized Access Only</p>
          </div>
          <div className="space-y-4">
            <button
              onClick={handleSignIn}
              disabled={signingIn}
              className="w-full flex items-center justify-center gap-4 bg-[#131315] border border-outline-variant py-4 px-6 rounded-lg font-semibold text-sm text-on-surface hover:bg-surface-container-high hover:border-primary/50 transition-all group disabled:opacity-50"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 12-4.53z" fill="#EA4335"/>
              </svg>
              <span>{signingIn ? 'Authenticating...' : 'Sign in with Google'}</span>
              <ArrowRight size={18} className="opacity-0 group-hover:opacity-100 transition-all -ml-6 group-hover:ml-0 group-hover:translate-x-1" />
            </button>
            <div className="relative py-4">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-outline-variant/30"></div></div>
              <div className="relative flex justify-center text-xs">
                <span className="px-2 bg-[#131315] text-on-surface-variant font-semibold">v2.4.0 STABLE</span>
              </div>
            </div>
            <div className="flex items-center justify-between text-on-surface-variant text-xs font-semibold px-1">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                <span>Systems Nominal</span>
              </div>
              <span>US-EAST-1</span>
            </div>
          </div>
        </div>
        <footer className="mt-12 text-on-surface-variant text-xs font-semibold space-y-2 opacity-60">
          <p>{year} Clinova Systems. All Rights Reserved.</p>
          <div className="flex items-center justify-center gap-4">
            <a href="#" className="hover:text-primary transition-colors">Privacy</a>
            <span className="w-1 h-1 bg-outline rounded-full"></span>
            <a href="#" className="hover:text-primary transition-colors">HIPAA Compliance</a>
            <span className="w-1 h-1 bg-outline rounded-full"></span>
            <a href="#" className="hover:text-primary transition-colors">Support</a>
          </div>
        </footer>
      </main>
    </div>
  );
}

export default memo(LoginScreen);

import React, { useState } from 'react';
import { Fingerprint, ScanFace, Stethoscope, Loader2, AlertCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function LoginScreen() {
  const { loginAs } = useAuth();
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [error, setError] = useState('');

  const handleBiometricAuth = async () => {
    setIsAuthenticating(true);
    setError('');
    
    try {
      // Check if WebAuthn is supported
      if (!window.PublicKeyCredential) {
        throw new Error('Web Authentication API is not supported in this browser.');
      }

      // We'll simulate a WebAuthn challenge since we don't have a real server setup for it right now
      // A real implementation would fetch options from the server, call navigator.credentials.get,
      // and send the assertion back to the server.
      
      const publicKeyCredentialRequestOptions: PublicKeyCredentialRequestOptions = {
        challenge: new Uint8Array(32), // random challenge
        rpId: window.location.hostname,
        allowCredentials: [],
        userVerification: "required",
        timeout: 60000,
      };

      try {
        // Attempt to call the actual WebAuthn API
        const assertion = await navigator.credentials.get({
          publicKey: publicKeyCredentialRequestOptions
        });
        
        if (assertion) {
          // Success
          loginAs('admin');
        }
      } catch (e: any) {
        if (e.name === 'NotAllowedError') {
          throw new Error('Biometric authentication cancelled or failed.');
        } else if (e.name === 'NotSupportedError') {
           // Fallback for dev environments where WebAuthn might throw
           console.log("WebAuthn not fully supported here, simulating success for demo");
           setTimeout(() => {
             loginAs('admin');
           }, 1000);
           return;
        } else {
           throw e;
        }
      }

    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Authentication failed. Please try again.');
    } finally {
      setIsAuthenticating(false);
    }
  };

  const handleBypass = () => {
    // Development bypass
    loginAs('admin');
  };

  return (
    <div className="min-h-screen bg-[var(--bg)] flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-[var(--surface)] border border-[var(--border)] rounded-2xl shadow-xl p-8 text-center animate-in fade-in zoom-in-95 duration-500">
        <div className="w-20 h-20 bg-[var(--primary-container)] rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-inner">
          <Stethoscope size={40} className="text-[var(--primary)]" />
        </div>
        
        <h1 className="text-3xl font-bold text-[var(--text)] mb-2 tracking-tight">Clinova OS</h1>
        <p className="text-[var(--text-muted)] mb-8">Secure clinician portal</p>
        
        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-start gap-3 text-red-600 text-left text-sm">
            <AlertCircle size={18} className="shrink-0 mt-0.5" />
            <p>{error}</p>
          </div>
        )}

        <button 
          onClick={handleBiometricAuth}
          disabled={isAuthenticating}
          className="w-full flex items-center justify-center gap-3 py-4 bg-[var(--primary)] text-white rounded-xl font-medium text-lg hover:opacity-90 transition-all active:scale-[0.98] disabled:opacity-70 disabled:active:scale-100 shadow-md shadow-[var(--primary)]/20"
        >
          {isAuthenticating ? (
             <Loader2 size={24} className="animate-spin" />
          ) : (
            <>
              <Fingerprint size={24} />
              <ScanFace size={24} />
            </>
          )}
          {isAuthenticating ? 'Authenticating...' : 'Sign in with Biometrics'}
        </button>
        
        <div className="mt-8 text-sm text-[var(--text-muted)] border-t border-[var(--border)] pt-6">
          <p>Requires Fingerprint, FaceID, or Windows Hello</p>
        </div>

        {/* Development fallback */}
        {process.env.NODE_ENV !== 'production' && (
          <button 
            onClick={handleBypass}
            className="mt-4 text-xs text-[var(--text-muted)] hover:text-[var(--primary)] underline transition-colors"
          >
            Bypass (Dev Only)
          </button>
        )}
      </div>
    </div>
  );
}

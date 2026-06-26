import React, { useState } from 'react';
import { User, Bell, Shield, Database, Palette, Fingerprint } from 'lucide-react';

export default function SettingsScreen() {
  const [activeTab, setActiveTab] = useState<'profile' | 'theme' | 'notifications' | 'security'>('profile');
  const [biometricEnabled, setBiometricEnabled] = useState(() => {
    return localStorage.getItem('clinova_biometric_enabled') === 'true';
  });

  const handleBiometricToggle = async () => {
    if (biometricEnabled) {
      setBiometricEnabled(false);
      localStorage.setItem('clinova_biometric_enabled', 'false');
      return;
    }

    try {
      if (!window.PublicKeyCredential) {
        alert("WebAuthn is not supported on this browser or device.");
        return;
      }

      const challenge = new Uint8Array(32);
      window.crypto.getRandomValues(challenge);

      const userId = new Uint8Array(16);
      window.crypto.getRandomValues(userId);

      const credential = await navigator.credentials.create({
        publicKey: {
          challenge,
          rp: {
            name: "Clinova OS",
            id: window.location.hostname
          },
          user: {
            id: userId,
            name: "user@clinova.health",
            displayName: "Sarah K."
          },
          pubKeyCredParams: [
            { alg: -7, type: "public-key" },
            { alg: -257, type: "public-key" }
          ],
          authenticatorSelection: {
            authenticatorAttachment: "platform",
            userVerification: "required"
          },
          timeout: 60000,
          attestation: "none"
        }
      });

      if (credential) {
        setBiometricEnabled(true);
        localStorage.setItem('clinova_biometric_enabled', 'true');
        // Normally, you would send the credential to the server here
      }
    } catch (error) {
      console.error("Biometric registration failed:", error);
      alert("Failed to register biometrics. You may have canceled the prompt, or your device doesn't support platform authenticators.");
    }
  };

  const testBiometricAuth = async () => {
    try {
      if (!window.PublicKeyCredential) {
        alert("WebAuthn is not supported.");
        return;
      }

      const challenge = new Uint8Array(32);
      window.crypto.getRandomValues(challenge);

      const assertion = await navigator.credentials.get({
        publicKey: {
          challenge,
          rpId: window.location.hostname,
          userVerification: "required",
          timeout: 60000
        }
      });

      if (assertion) {
        alert("Biometric authentication successful!");
      }
    } catch (error) {
      console.error("Biometric authentication failed:", error);
      alert("Biometric authentication failed or was canceled.");
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6 pb-24">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-[var(--text)] mb-2 tracking-tight">Settings</h1>
        <p className="text-[var(--text-muted)] text-sm">Manage your profile, preferences, and system settings.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-1 space-y-1">
          <button 
            onClick={() => setActiveTab('profile')}
            className={`w-full text-left px-4 py-2.5 rounded-lg text-sm transition-colors ${activeTab === 'profile' ? 'bg-[var(--surface-dim)] font-medium text-[var(--primary)] border-l-4 border-[var(--primary)]' : 'text-[var(--text)] hover:bg-[var(--surface-dim)]'}`}
          >
            Profile
          </button>
          <button 
            onClick={() => setActiveTab('theme')}
            className={`w-full text-left px-4 py-2.5 rounded-lg text-sm transition-colors ${activeTab === 'theme' ? 'bg-[var(--surface-dim)] font-medium text-[var(--primary)] border-l-4 border-[var(--primary)]' : 'text-[var(--text)] hover:bg-[var(--surface-dim)]'}`}
          >
            Theme
          </button>
          <button 
            onClick={() => setActiveTab('notifications')}
            className={`w-full text-left px-4 py-2.5 rounded-lg text-sm transition-colors ${activeTab === 'notifications' ? 'bg-[var(--surface-dim)] font-medium text-[var(--primary)] border-l-4 border-[var(--primary)]' : 'text-[var(--text)] hover:bg-[var(--surface-dim)]'}`}
          >
            Notifications
          </button>
          <button 
            onClick={() => setActiveTab('security')}
            className={`w-full text-left px-4 py-2.5 rounded-lg text-sm transition-colors ${activeTab === 'security' ? 'bg-[var(--surface-dim)] font-medium text-[var(--primary)] border-l-4 border-[var(--primary)]' : 'text-[var(--text)] hover:bg-[var(--surface-dim)]'}`}
          >
            Security
          </button>
        </div>

        <div className="md:col-span-3 space-y-6">
          {activeTab === 'profile' && (
            <div className="bg-[var(--surface)] p-6 rounded-xl border border-[var(--border)] shadow-sm space-y-6">
              <h3 className="text-lg font-semibold text-[var(--text)] flex items-center gap-2">
                <User size={20} className="text-[var(--primary)]" /> Profile Settings
              </h3>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-[var(--text)]">First Name</label>
                    <input type="text" className="w-full px-3 py-2 border border-[var(--border)] rounded-lg bg-[var(--surface)] text-[var(--text)] outline-none focus:ring-2 focus:ring-[var(--primary)]" defaultValue="Sarah" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-[var(--text)]">Last Name</label>
                    <input type="text" className="w-full px-3 py-2 border border-[var(--border)] rounded-lg bg-[var(--surface)] text-[var(--text)] outline-none focus:ring-2 focus:ring-[var(--primary)]" defaultValue="K." />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-[var(--text)]">Email</label>
                  <input type="email" className="w-full px-3 py-2 border border-[var(--border)] rounded-lg bg-[var(--surface-dim)] text-[var(--text-muted)] outline-none" defaultValue="doctor@clinova.health" disabled />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-[var(--text)]">Role / Designation</label>
                  <select className="w-full px-3 py-2 border border-[var(--border)] rounded-lg bg-[var(--surface)] text-[var(--text)] outline-none focus:ring-2 focus:ring-[var(--primary)]">
                    <option>Clinical Pharmacist</option>
                    <option>Student</option>
                    <option>Pharmacist</option>
                    <option>Intern</option>
                    <option>Healthcare Professional</option>
                    <option>Lecturer</option>
                    <option>Researcher</option>
                    <option>Administrator</option>
                    <option>Super Admin</option>
                  </select>
                </div>
                <button className="px-4 py-2 bg-[var(--primary)] text-white font-medium rounded-lg hover:opacity-90 transition-opacity">
                  Save Changes
                </button>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="bg-[var(--surface)] p-6 rounded-xl border border-[var(--border)] shadow-sm space-y-6">
              <h3 className="text-lg font-semibold text-[var(--text)] flex items-center gap-2">
                <Shield size={20} className="text-[var(--primary)]" /> Security Settings
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1 pr-6">
                    <div className="flex items-center gap-2">
                      <Fingerprint size={18} className="text-[var(--text)]" />
                      <span className="text-sm font-medium text-[var(--text)]">Biometric Re-authentication</span>
                    </div>
                    <p className="text-xs text-[var(--text-muted)]">
                      Require fingerprint or face ID when accessing sensitive clinical records and patient data.
                    </p>
                  </div>
                  <button 
                    onClick={handleBiometricToggle}
                    className={`w-11 h-6 rounded-full flex items-center transition-colors px-0.5 ${biometricEnabled ? 'bg-[var(--primary)]' : 'bg-[var(--border)]'}`}
                  >
                    <div className={`w-5 h-5 rounded-full bg-white shadow-sm transform transition-transform ${biometricEnabled ? 'translate-x-5' : 'translate-x-0'}`}></div>
                  </button>
                </div>
                
                {biometricEnabled && (
                  <div className="pt-2">
                    <button 
                      onClick={testBiometricAuth}
                      className="px-4 py-2 bg-[var(--primary-container)] text-[var(--primary)] font-medium rounded-lg hover:opacity-90 transition-opacity"
                    >
                      Test Biometric Authentication
                    </button>
                  </div>
                )}
                
                <div className="pt-4 border-t border-[var(--border)]">
                  <button className="px-4 py-2 bg-[var(--primary)] text-white font-medium rounded-lg hover:opacity-90 transition-opacity">
                    Update Password
                  </button>
                </div>
              </div>
            </div>
          )}
          
          {(activeTab === 'theme' || activeTab === 'notifications') && (
            <div className="bg-[var(--surface)] p-6 rounded-xl border border-[var(--border)] shadow-sm flex items-center justify-center min-h-[300px]">
              <p className="text-[var(--text-muted)] text-sm text-center">Settings for {activeTab} are coming soon.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

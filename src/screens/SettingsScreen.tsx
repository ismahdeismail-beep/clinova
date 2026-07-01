import React from 'react';
import { User, Shield } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function SettingsScreen() {
  const { userData } = useAuth();

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6 pb-24">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-[var(--text)] mb-2 tracking-tight">Settings</h1>
        <p className="text-[var(--text-muted)] text-sm">Manage your profile and system settings.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-1 space-y-1">
          <button 
            className={`w-full text-left px-4 py-2.5 rounded-lg text-sm transition-colors bg-[var(--surface-dim)] font-medium text-[var(--primary)] border-l-4 border-[var(--primary)]`}
          >
            Profile
          </button>
        </div>

        <div className="md:col-span-3 space-y-6">
          <div className="bg-[var(--surface)] p-6 rounded-xl border border-[var(--border)] shadow-sm space-y-6">
            <h3 className="text-lg font-semibold text-[var(--text)] flex items-center gap-2">
              <User size={20} className="text-[var(--primary)]" /> Profile Settings
            </h3>
            
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-[var(--text)]">Full Name</label>
                <input type="text" className="w-full px-3 py-2 border border-[var(--border)] rounded-lg bg-[var(--surface-dim)] text-[var(--text-muted)] outline-none" value={userData?.name || 'Guest'} disabled />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-[var(--text)]">Email</label>
                <input type="email" className="w-full px-3 py-2 border border-[var(--border)] rounded-lg bg-[var(--surface-dim)] text-[var(--text-muted)] outline-none" value={userData?.email || 'N/A'} disabled />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-[var(--text)]">Role / Designation</label>
                <input type="text" className="w-full px-3 py-2 border border-[var(--border)] rounded-lg bg-[var(--surface-dim)] text-[var(--text-muted)] outline-none capitalize" value={userData?.role || 'user'} disabled />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

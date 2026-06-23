import React from 'react';
import { User, Bell, Shield, Database, Palette } from 'lucide-react';

export default function SettingsScreen() {
  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6 pb-24">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-[var(--text)] mb-2 tracking-tight">Settings</h1>
        <p className="text-[var(--text-muted)] text-sm">Manage your profile, preferences, and system settings.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-1 space-y-1">
          <div className="bg-[var(--surface-dim)] px-4 py-2.5 rounded-lg font-medium text-sm text-[var(--primary)] border-l-4 border-[var(--primary)]">
            Profile
          </div>
          <div className="px-4 py-2.5 rounded-lg text-sm text-[var(--text)] hover:bg-[var(--surface-dim)] cursor-pointer transition-colors">
            Theme
          </div>
          <div className="px-4 py-2.5 rounded-lg text-sm text-[var(--text)] hover:bg-[var(--surface-dim)] cursor-pointer transition-colors">
            Notifications
          </div>
          <div className="px-4 py-2.5 rounded-lg text-sm text-[var(--text)] hover:bg-[var(--surface-dim)] cursor-pointer transition-colors">
            Security
          </div>
        </div>

        <div className="md:col-span-3 space-y-6">
          <div className="bg-[var(--surface)] p-6 rounded-xl border border-[var(--border)] shadow-sm space-y-6">
            <h3 className="text-lg font-semibold text-[var(--text)] flex items-center gap-2">
              <User size={20} className="text-[var(--primary)]" /> Profile Settings
            </h3>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-[var(--text)]">First Name</label>
                  <input type="text" className="w-full px-3 py-2 border border-[var(--border)] rounded-lg bg-[var(--surface)] text-[var(--text)] outline-none focus:ring-2 focus:ring-[var(--primary)]" defaultValue="Ismahde" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-[var(--text)]">Last Name</label>
                  <input type="text" className="w-full px-3 py-2 border border-[var(--border)] rounded-lg bg-[var(--surface)] text-[var(--text)] outline-none focus:ring-2 focus:ring-[var(--primary)]" defaultValue="Ismail" />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-[var(--text)]">Email</label>
                <input type="email" className="w-full px-3 py-2 border border-[var(--border)] rounded-lg bg-[var(--surface-dim)] text-[var(--text-muted)] outline-none" defaultValue="ismahdeismail@gmail.com" disabled />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-[var(--text)]">Role / Designation</label>
                <select className="w-full px-3 py-2 border border-[var(--border)] rounded-lg bg-[var(--surface)] text-[var(--text)] outline-none focus:ring-2 focus:ring-[var(--primary)]">
                  <option>Clinical Pharmacist</option>
                  <option>Medical Officer</option>
                  <option>Pharmacy Student</option>
                </select>
              </div>
              <button className="px-4 py-2 bg-[var(--primary)] text-white font-medium rounded-lg hover:opacity-90 transition-opacity">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

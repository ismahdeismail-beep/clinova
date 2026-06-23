import React from 'react';
import { Users, AlertTriangle, Activity, ClipboardList } from 'lucide-react';

export default function DashboardScreen() {
  return (
    <div className="p-6 max-w-6xl mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[var(--text)] mb-2 tracking-tight">Dashboard</h1>
        <p className="text-[var(--text-muted)] text-sm">Overview of today's clinical activities.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-[var(--surface)] p-6 rounded-xl border border-[var(--border)] shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-[var(--text-muted)] uppercase tracking-wider">Today's Patients</h3>
            <Users size={20} className="text-[var(--primary)]" />
          </div>
          <p className="text-3xl font-bold text-[var(--text)]">24</p>
          <p className="text-xs text-[var(--success)] mt-2 font-medium">↑ 4 from yesterday</p>
        </div>

        <div className="bg-[var(--surface)] p-6 rounded-xl border border-[var(--border)] shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-[var(--text-muted)] uppercase tracking-wider">Active Reviews</h3>
            <ClipboardList size={20} className="text-[var(--primary)]" />
          </div>
          <p className="text-3xl font-bold text-[var(--text)]">12</p>
          <p className="text-xs text-[var(--text-muted)] mt-2 font-medium">5 pending completion</p>
        </div>

        <div className="bg-[var(--surface)] p-6 rounded-xl border border-[var(--border)] shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-[var(--text-muted)] uppercase tracking-wider">High Risk Alerts</h3>
            <AlertTriangle size={20} className="text-[var(--danger)]" />
          </div>
          <p className="text-3xl font-bold text-[var(--text)]">3</p>
          <p className="text-xs text-[var(--danger)] mt-2 font-medium">Requires immediate attention</p>
        </div>

        <div className="bg-[var(--surface)] p-6 rounded-xl border border-[var(--border)] shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-[var(--text-muted)] uppercase tracking-wider">Follow-ups</h3>
            <Activity size={20} className="text-[var(--primary)]" />
          </div>
          <p className="text-3xl font-bold text-[var(--text)]">8</p>
          <p className="text-xs text-[var(--text-muted)] mt-2 font-medium">Scheduled for today</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-[var(--surface)] rounded-xl border border-[var(--border)] shadow-sm overflow-hidden">
          <div className="p-5 border-b border-[var(--border)]">
            <h3 className="font-semibold text-[var(--text)]">Recent Clinical Activity</h3>
          </div>
          <div className="divide-y divide-[var(--border)]">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="p-4 flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[var(--primary-container)] flex items-center justify-center shrink-0">
                  <ClipboardList size={18} className="text-[var(--primary)]" />
                </div>
                <div>
                  <p className="text-sm font-medium text-[var(--text)]">Pharmacotherapy Review Completed</p>
                  <p className="text-xs text-[var(--text-muted)] mt-0.5">Patient IP: 89432 • Medical Ward 3</p>
                  <p className="text-xs text-[var(--text-muted)] mt-1.5 opacity-70">2 hours ago</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[var(--surface)] rounded-xl border border-[var(--border)] shadow-sm overflow-hidden">
          <div className="p-5 border-b border-[var(--border)]">
            <h3 className="font-semibold text-[var(--text)]">Drug Safety Alerts</h3>
          </div>
          <div className="divide-y divide-[var(--border)]">
             <div className="p-4 flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[var(--danger-container)] flex items-center justify-center shrink-0">
                  <AlertTriangle size={18} className="text-[var(--danger)]" />
                </div>
                <div>
                  <p className="text-sm font-medium text-[var(--text)]">Severe Interaction Warning</p>
                  <p className="text-xs text-[var(--text-muted)] mt-0.5">Warfarin + Fluconazole ordered for Patient IP: 77211.</p>
                  <button className="text-xs text-[var(--primary)] font-medium mt-2 hover:underline">Review Case</button>
                </div>
              </div>
              <div className="p-4 flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[var(--warning-container)] flex items-center justify-center shrink-0">
                  <AlertTriangle size={18} className="text-[var(--warning)]" />
                </div>
                <div>
                  <p className="text-sm font-medium text-[var(--text)]">Renal Dose Adjustment Required</p>
                  <p className="text-xs text-[var(--text-muted)] mt-0.5">Ceftriaxone in severe renal impairment (CrCl 25ml/min).</p>
                  <button className="text-xs text-[var(--primary)] font-medium mt-2 hover:underline">Review Case</button>
                </div>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
}

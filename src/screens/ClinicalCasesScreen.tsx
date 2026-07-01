import React from 'react';
import { FolderOpen, Plus } from 'lucide-react';

export default function ClinicalCasesScreen() {
  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-[var(--text)] mb-2 tracking-tight">Clinical Cases</h1>
          <p className="text-[var(--text-muted)] text-sm">Active and archived case discussions.</p>
        </div>
        <button className="px-4 py-2 bg-[var(--primary)] text-white rounded-lg font-medium text-sm flex items-center gap-2 hover:opacity-90 transition-opacity">
          <Plus size={18} />
          New Case
        </button>
      </div>

      <div className="bg-[var(--surface)] p-12 rounded-xl border border-[var(--border)] shadow-sm flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 bg-[var(--surface-dim)] rounded-full flex items-center justify-center mb-4">
          <FolderOpen size={32} className="text-[var(--text-muted)]" />
        </div>
        <h3 className="text-lg font-semibold text-[var(--text)] mb-2">No active cases</h3>
        <p className="text-[var(--text-muted)] text-sm max-w-md mb-6">
          Start a new case to document comprehensive clinical findings, treatment plans, and outcomes for discussion.
        </p>
      </div>
    </div>
  );
}

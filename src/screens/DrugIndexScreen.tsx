import React from 'react';
import { Pill, Search } from 'lucide-react';

export default function DrugIndexScreen() {
  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-[var(--text)] mb-2 tracking-tight">Drug Index</h1>
        <p className="text-[var(--text-muted)] text-sm">Kenya Drug Index and comprehensive medication profiles.</p>
      </div>

      <div className="bg-[var(--surface)] p-4 rounded-xl border border-[var(--border)] shadow-sm flex items-center gap-3">
        <Search size={20} className="text-[var(--text-muted)]" />
        <input 
          type="text" 
          placeholder="Search by generic or brand name..." 
          className="flex-1 bg-transparent border-none outline-none text-[var(--text)]"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1 space-y-2">
          <div className="bg-[var(--surface-dim)] p-4 rounded-lg font-medium text-[var(--primary)] border-l-4 border-[var(--primary)]">
            Browse Categories
          </div>
          <div className="p-4 rounded-lg text-[var(--text)] hover:bg-[var(--surface-dim)] cursor-pointer transition-colors">
            Cardiovascular
          </div>
          <div className="p-4 rounded-lg text-[var(--text)] hover:bg-[var(--surface-dim)] cursor-pointer transition-colors">
            Anti-infectives
          </div>
          <div className="p-4 rounded-lg text-[var(--text)] hover:bg-[var(--surface-dim)] cursor-pointer transition-colors">
            Central Nervous System
          </div>
        </div>

        <div className="md:col-span-2 bg-[var(--surface)] p-12 rounded-xl border border-[var(--border)] shadow-sm flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 bg-[var(--surface-dim)] rounded-full flex items-center justify-center mb-4">
            <Pill size={32} className="text-[var(--text-muted)]" />
          </div>
          <h3 className="text-lg font-semibold text-[var(--text)] mb-2">Search for a drug</h3>
          <p className="text-[var(--text-muted)] text-sm max-w-md">
            Enter a drug name to view indications, dosages, contraindications, and required renal or hepatic adjustments.
          </p>
        </div>
      </div>
    </div>
  );
}

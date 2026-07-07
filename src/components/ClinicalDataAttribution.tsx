import React from 'react';
import { Database } from 'lucide-react';

export function ClinicalDataAttribution() {
  return (
    <footer 
      id="clinical-data-attribution"
      className="w-full mt-12 py-6 border-t border-[var(--border)] flex flex-col sm:flex-row items-center justify-center gap-2 text-center text-xs text-[var(--text-muted)] font-mono opacity-80"
    >
      <Database size={14} className="text-[var(--text-muted)] shrink-0" />
      <span>
        This product uses publicly available data from the U.S. National Library of Medicine.
      </span>
    </footer>
  );
}

import React from 'react';
import { MedicineImageManager } from '../components/MedicineImageManager';
import { ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function AdminImageManagerScreen() {
  const navigate = useNavigate();

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto space-y-6 pb-24 selection:bg-[var(--primary)] selection:text-[var(--primary-foreground)]">
      <div className="flex items-center gap-3 mb-4">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-[var(--surface)] border border-[var(--border)] hover:bg-[var(--surface-dim)] text-[var(--text-muted)] hover:text-[var(--text)] rounded-xl text-xs font-black shadow-xs transition-all cursor-pointer"
        >
          <ChevronLeft size={14} />
          Back to Dashboard
        </button>
      </div>

      <div className="mb-4">
        <h1 className="text-3xl font-bold text-[var(--text)] tracking-tight">Medicine Image Manager</h1>
        <p className="text-sm text-[var(--text-muted)] mt-1">
          Manage, verify, and crawl medicine images for the Kenya Drug Index
        </p>
      </div>

      <MedicineImageManager />
    </div>
  );
}

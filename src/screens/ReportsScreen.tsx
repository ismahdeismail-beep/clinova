import React from 'react';
import { BarChart3, Download } from 'lucide-react';

export default function ReportsScreen() {
  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-[var(--text)] mb-2 tracking-tight">Reports</h1>
        <p className="text-[var(--text-muted)] text-sm">Clinical activity, interventions, and outcomes reporting.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          "Patient Reports", 
          "Pharmacotherapy Reports", 
          "Ward Reports", 
          "Drug Utilization Reports", 
          "Intervention Reports", 
          "Outcomes Reports"
        ].map((report) => (
          <div key={report} className="bg-[var(--surface)] p-6 rounded-xl border border-[var(--border)] shadow-sm hover:border-[var(--primary)] transition-colors cursor-pointer group">
            <div className="flex items-start justify-between mb-4">
              <div className="w-10 h-10 rounded-lg bg-[var(--primary-container)] flex items-center justify-center text-[var(--primary)]">
                <BarChart3 size={20} />
              </div>
              <button className="p-2 text-[var(--text-muted)] hover:text-[var(--primary)] opacity-0 group-hover:opacity-100 transition-opacity">
                <Download size={18} />
              </button>
            </div>
            <h3 className="text-lg font-semibold text-[var(--text)] mb-2">{report}</h3>
            <p className="text-sm text-[var(--text-muted)]">Generate and download comprehensive analytics.</p>
          </div>
        ))}
      </div>
    </div>
  );
}

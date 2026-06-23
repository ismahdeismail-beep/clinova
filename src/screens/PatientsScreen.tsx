import React from 'react';
import { Search, UserPlus, FileText } from 'lucide-react';

export default function PatientsScreen() {
  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-[var(--text)] mb-2 tracking-tight">Patients</h1>
          <p className="text-[var(--text-muted)] text-sm">Patient registry and demographic profiles.</p>
        </div>
        <button className="px-4 py-2 bg-[var(--primary)] text-white rounded-lg font-medium text-sm flex items-center gap-2 hover:opacity-90 transition-opacity">
          <UserPlus size={18} />
          New Patient
        </button>
      </div>

      <div className="bg-[var(--surface)] p-4 rounded-xl border border-[var(--border)] shadow-sm flex items-center gap-3">
        <Search size={20} className="text-[var(--text-muted)]" />
        <input 
          type="text" 
          placeholder="Search by name, IP number, or ID..." 
          className="flex-1 bg-transparent border-none outline-none text-[var(--text)]"
        />
      </div>

      <div className="bg-[var(--surface)] rounded-xl border border-[var(--border)] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-[var(--surface-dim)] text-[var(--text-muted)] text-xs uppercase">
              <tr>
                <th className="px-6 py-4 font-medium">Patient Name</th>
                <th className="px-6 py-4 font-medium">IP Number</th>
                <th className="px-6 py-4 font-medium">Age/Sex</th>
                <th className="px-6 py-4 font-medium">Ward</th>
                <th className="px-6 py-4 font-medium">Last Admission</th>
                <th className="px-6 py-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)] bg-[var(--surface)]">
              {[1, 2, 3, 4, 5].map((i) => (
                <tr key={i} className="hover:bg-[var(--surface-dim)] transition-colors">
                  <td className="px-6 py-4 font-medium text-[var(--text)]">Patient Name {i}</td>
                  <td className="px-6 py-4 text-[var(--text-muted)]">IP-2023-{1000 + i}</td>
                  <td className="px-6 py-4 text-[var(--text-muted)]">45 / M</td>
                  <td className="px-6 py-4 text-[var(--text-muted)]">Medical Ward A</td>
                  <td className="px-6 py-4 text-[var(--text-muted)]">Oct 12, 2023</td>
                  <td className="px-6 py-4">
                    <button className="text-[var(--primary)] hover:underline font-medium text-xs flex items-center gap-1">
                      <FileText size={14} /> Profile
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

import { useState } from 'react';
import { Search, ExternalLink } from 'lucide-react';

const DRUGS = [
  { name: 'Amoxicillin', class: 'Penicillin', indication: 'Bacterial infections', dosing: '250-500mg 8hrly', kems: 'AMX-001' },
  { name: 'Ceftriaxone', class: 'Cephalosporin', indication: 'Severe infections', dosing: '1-2g 12-24hrly', kems: 'CRO-002' },
  { name: 'Metronidazole', class: 'Nitroimidazole', indication: 'Anaerobic infections', dosing: '400mg 8hrly', kems: 'MTZ-003' },
  { name: 'Artemether/Lumefantrine', class: 'Antimalarial', indication: 'Uncomplicated malaria', dosing: '4 tabs 0,8,24,36,48,60hr', kems: 'AL-004' },
  { name: 'Omeprazole', class: 'PPI', indication: 'Gastric ulcers', dosing: '20mg daily', kems: 'OMP-005' },
  { name: 'Losartan', class: 'ARB', indication: 'Hypertension', dosing: '50mg daily', kems: 'LOS-006' },
  { name: 'Metformin', class: 'Biguanide', indication: 'Type 2 DM', dosing: '500mg-1g 12hrly', kems: 'MET-007' },
  { name: 'Salbutamol', class: 'Beta-agonist', indication: 'Asthma', dosing: '2 puffs PRN', kems: 'SAL-008' },
];

export default function DrugIndexScreen() {
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<typeof DRUGS[0] | null>(null);

  const filtered = query
    ? DRUGS.filter(d =>
        d.name.toLowerCase().includes(query.toLowerCase()) ||
        d.class.toLowerCase().includes(query.toLowerCase()) ||
        d.indication.toLowerCase().includes(query.toLowerCase())
      )
    : DRUGS;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-base font-semibold text-[#0F172A]">Kenya Drug Index</h3>
          <p className="text-sm text-[#64748B] mt-0.5">KEML-referenced drug formulary</p>
        </div>
        <div className="relative w-64">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search drugs..."
            className="w-full pl-9 pr-3 py-2 border border-[#E2E8F0] rounded-lg text-sm bg-white focus:outline-none focus:border-[#2563EB]"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white border border-[#E2E8F0] rounded-xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#E2E8F0] bg-[#F8FAFC]">
                <th className="text-left px-4 py-3 text-xs font-semibold text-[#475569] uppercase">Drug (INN)</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-[#475569] uppercase">Class</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-[#475569] uppercase">Indication</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-[#475569] uppercase">KEMS Code</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0]">
              {filtered.map((d) => (
                <tr
                  key={d.kems}
                  onClick={() => setSelected(d)}
                  className={`hover:bg-[#F8FAFC] cursor-pointer ${selected?.kems === d.kems ? 'bg-[#EFF6FF]' : ''}`}
                >
                  <td className="px-4 py-3 text-sm font-medium text-[#0F172A]">{d.name}</td>
                  <td className="px-4 py-3 text-sm text-[#475569]">{d.class}</td>
                  <td className="px-4 py-3 text-sm text-[#475569]">{d.indication}</td>
                  <td className="px-4 py-3 text-sm text-[#475569] font-mono">{d.kems}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {selected && (
          <div className="bg-white border border-[#E2E8F0] rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-semibold text-[#0F172A]">{selected.name}</h4>
              <ExternalLink size={16} className="text-[#2563EB]" />
            </div>
            <div className="space-y-3 text-sm">
              <div><span className="text-[#64748B]">Class:</span> <span className="text-[#0F172A] font-medium">{selected.class}</span></div>
              <div><span className="text-[#64748B]">Indication:</span> <span className="text-[#0F172A]">{selected.indication}</span></div>
              <div><span className="text-[#64748B]">Dosing:</span> <span className="text-[#0F172A]">{selected.dosing}</span></div>
              <div><span className="text-[#64748B]">KEMS Code:</span> <span className="text-[#0F172A] font-mono">{selected.kems}</span></div>
            </div>
            <button className="mt-4 w-full text-center text-sm text-[#2563EB] font-medium hover:underline">
              View Full Monograph
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

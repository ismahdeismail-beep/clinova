import { useState } from 'react';
import { Search, FileText, BookOpen, FileUp } from 'lucide-react';

const ARTICLES = [
  { title: 'WHO Guidelines: Malaria Treatment', source: 'WHO', type: 'Guideline', date: '2024-10' },
  { title: 'Kenya Clinical Guidelines 2024', source: 'MOH Kenya', type: 'Guideline', date: '2024-08' },
  { title: 'Antimicrobial Stewardship Handbook', source: 'KEML', type: 'Reference', date: '2024-06' },
  { title: 'Drug Interactions in HIV/TB Co-infection', source: 'Research', type: 'Article', date: '2024-04' },
  { title: 'Pediatric Dosing Quick Reference', source: 'WHO', type: 'Reference', date: '2024-02' },
  { title: 'Renal Dose Adjustment Guide', source: 'KEML', type: 'Reference', date: '2023-12' },
];

export default function KnowledgeBaseScreen() {
  const [query, setQuery] = useState('');

  const filtered = query
    ? ARTICLES.filter(a =>
        a.title.toLowerCase().includes(query.toLowerCase()) ||
        a.source.toLowerCase().includes(query.toLowerCase())
      )
    : ARTICLES;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-base font-semibold text-[#0F172A]">Knowledge Base</h3>
        <div className="flex gap-2">
          <button className="btn-secondary flex items-center gap-2 text-xs">
            <FileUp size={14} /> Upload
          </button>
        </div>
      </div>

      <div className="relative mb-6">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search guidelines, references, notes..."
          className="w-full pl-9 pr-3 py-2.5 border border-[#E2E8F0] rounded-lg text-sm bg-white focus:outline-none focus:border-[#2563EB]"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {filtered.map((a) => {
          const Icon = a.type === 'Guideline' ? BookOpen : FileText;
          return (
            <div key={a.title} className="bg-white border border-[#E2E8F0] rounded-xl p-4 hover:border-[#2563EB] cursor-pointer transition-colors">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#EFF6FF] flex items-center justify-center flex-shrink-0">
                  <Icon size={16} className="text-[#2563EB]" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-[#0F172A] truncate">{a.title}</p>
                  <p className="text-xs text-[#64748B] mt-0.5">{a.source} &middot; {a.date}</p>
                  <span className="inline-block mt-1.5 text-[10px] px-2 py-0.5 rounded-full bg-[#F1F5F9] text-[#475569] font-medium">
                    {a.type}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

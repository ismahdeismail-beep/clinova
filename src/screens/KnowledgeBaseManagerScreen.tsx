import React, { useState } from 'react';
import { 
  Database, Upload, Search, Filter, FolderTree, FileText, Settings, 
  BarChart, Trash2, Edit, Plus, BookOpen, Layers, CheckCircle2, 
  AlertTriangle, RefreshCw
} from 'lucide-react';

export default function KnowledgeBaseManagerScreen() {
  const [activeTab, setActiveTab] = useState('resources');
  
  return (
    <div className="flex-1 bg-[var(--bg)] min-h-screen overflow-y-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[var(--primary)] mb-2">
              <Database size={16} /> Knowledge Base Engine
            </div>
            <h1 className="text-3xl font-extrabold text-[var(--text)] tracking-tight">
              Resource Manager
            </h1>
            <p className="text-sm text-[var(--text-muted)] mt-2">
              Centralized repository for curriculum documents, clinical guidelines, and RAG embeddings.
            </p>
          </div>
          <div className="flex gap-3">
            <button className="px-4 py-2 bg-[var(--surface)] border border-[var(--border)] rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-[var(--surface-dim)]">
              <RefreshCw size={16} /> Rebuild Embeddings
            </button>
            <button className="px-4 py-2 bg-[var(--primary)] text-[var(--primary-foreground)] rounded-xl text-sm font-bold flex items-center gap-2 hover:opacity-90">
              <Upload size={16} /> Upload Resource
            </button>
          </div>
        </div>

        <div className="flex overflow-x-auto border-b border-[var(--border)] no-scrollbar gap-2 pb-2">
          {[
            { id: 'resources', label: 'Resources & Files', icon: FileText },
            { id: 'taxonomy', label: 'Curriculum Taxonomy', icon: FolderTree },
            { id: 'analytics', label: 'Knowledge Analytics', icon: BarChart },
            { id: 'settings', label: 'RAG Settings', icon: Settings },
          ].map(t => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={`px-4 py-2.5 text-sm font-semibold rounded-xl flex items-center gap-2 transition-all ${
                activeTab === t.id 
                  ? 'bg-[var(--primary)] text-[var(--primary-foreground)] shadow-sm'
                  : 'text-[var(--text-muted)] hover:bg-[var(--surface-dim)] hover:text-[var(--text)]'
              }`}
            >
              <t.icon size={16} />
              {t.label}
            </button>
          ))}
        </div>

        {activeTab === 'resources' && <ResourcesTab />}
        {activeTab === 'taxonomy' && <TaxonomyTab />}
        {activeTab === 'analytics' && <AnalyticsTab />}
        {activeTab === 'settings' && <SettingsTab />}
        
      </div>
    </div>
  );
}

function ResourcesTab() {
  const [isUploading, setIsUploading] = useState(false);
  
  return (
    <div className="space-y-6 animate-in fade-in">
      {/* Upload Area */}
      <div 
        className="border-2 border-dashed border-[var(--border)] rounded-2xl p-8 text-center bg-[var(--surface-dim)]/50 hover:bg-[var(--surface-dim)] transition-colors cursor-pointer"
        onClick={() => setIsUploading(true)}
      >
        <div className="w-12 h-12 bg-[var(--primary)]/10 text-[var(--primary)] rounded-full flex items-center justify-center mx-auto mb-4">
          <Upload size={24} />
        </div>
        <h3 className="font-bold text-[var(--text)] mb-1">Drag & Drop Resources</h3>
        <p className="text-sm text-[var(--text-muted)] mb-4">Support for PDF, DOCX, PPTX, JSON, CSV, and URLs.</p>
        <button className="px-4 py-2 bg-[var(--primary)] text-[var(--primary-foreground)] rounded-xl text-sm font-bold shadow-sm">
          Browse Files
        </button>
      </div>

      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" size={18} />
          <input
            type="text"
            placeholder="Search documents by title, author, topic, or keyword..."
            className="w-full pl-10 pr-4 py-2.5 bg-[var(--surface)] border border-[var(--border)] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
          />
        </div>
        <button className="px-4 py-2.5 bg-[var(--surface)] border border-[var(--border)] rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-[var(--surface-dim)] shrink-0">
          <Filter size={16} /> Filters
        </button>
      </div>

      <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl overflow-hidden">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-[var(--surface-dim)] text-[var(--text-muted)]">
            <tr>
              <th className="px-6 py-4 font-semibold border-b border-[var(--border)]">Resource</th>
              <th className="px-6 py-4 font-semibold border-b border-[var(--border)]">Discipline / Unit</th>
              <th className="px-6 py-4 font-semibold border-b border-[var(--border)]">Type</th>
              <th className="px-6 py-4 font-semibold border-b border-[var(--border)]">Status</th>
              <th className="px-6 py-4 font-semibold border-b border-[var(--border)] text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border)]">
            {[
              { id: '1', title: 'Cardiovascular Guidelines 2024', author: 'MOH Kenya', discipline: 'Clinical Pharmacy', type: 'Clinical Guideline', status: 'Indexed' },
              { id: '2', title: 'Renal Physiology Notes', author: 'Prof. Smith', discipline: 'Medical Physiology', type: 'Lecture Notes', status: 'Processing' },
              { id: '3', title: 'Intro to Pharmacokinetics', author: 'Katzung', discipline: 'Pharmacology', type: 'Textbook Chapter', status: 'Indexed' }
            ].map((doc) => (
              <tr key={doc.id} className="hover:bg-[var(--surface-dim)] transition-colors">
                <td className="px-6 py-4">
                  <div className="font-bold text-[var(--text)]">{doc.title}</div>
                  <div className="text-xs text-[var(--text-muted)]">{doc.author}</div>
                </td>
                <td className="px-6 py-4 text-[var(--text-muted)]">{doc.discipline}</td>
                <td className="px-6 py-4">
                  <span className="px-2.5 py-1 rounded-md bg-[var(--bg)] border border-[var(--border)] text-xs font-semibold">
                    {doc.type}
                  </span>
                </td>
                <td className="px-6 py-4">
                  {doc.status === 'Indexed' ? (
                    <span className="flex items-center gap-1.5 text-emerald-600 text-xs font-bold">
                      <CheckCircle2 size={14} /> Indexed
                    </span>
                  ) : (
                    <span className="flex items-center gap-1.5 text-amber-600 text-xs font-bold">
                      <RefreshCw size={14} className="animate-spin" /> {doc.status}
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="p-2 text-[var(--text-muted)] hover:text-[var(--primary)] transition-colors"><Edit size={16} /></button>
                  <button className="p-2 text-[var(--text-muted)] hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {isUploading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-[var(--surface)] w-full max-w-lg rounded-2xl shadow-xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-4 border-b border-[var(--border)] flex justify-between items-center bg-[var(--surface-dim)]">
              <h3 className="font-bold text-[var(--text)]">Upload Resource</h3>
              <button onClick={() => setIsUploading(false)} className="text-[var(--text-muted)] hover:text-[var(--text)]">
                 ✕
              </button>
            </div>
            <div className="p-6 space-y-4">
               <div>
                 <label className="block text-sm font-semibold text-[var(--text)] mb-1">Resource Title</label>
                 <input type="text" className="w-full px-3 py-2 bg-[var(--bg)] border border-[var(--border)] rounded-xl focus:ring-2 focus:ring-[var(--primary)] outline-none" />
               </div>
               <div className="grid grid-cols-2 gap-4">
                 <div>
                   <label className="block text-sm font-semibold text-[var(--text)] mb-1">Author</label>
                   <input type="text" className="w-full px-3 py-2 bg-[var(--bg)] border border-[var(--border)] rounded-xl focus:ring-2 focus:ring-[var(--primary)] outline-none" />
                 </div>
                 <div>
                   <label className="block text-sm font-semibold text-[var(--text)] mb-1">Type</label>
                   <select className="w-full px-3 py-2 bg-[var(--bg)] border border-[var(--border)] rounded-xl focus:ring-2 focus:ring-[var(--primary)] outline-none">
                     <option>Clinical Guideline</option>
                     <option>Lecture Notes</option>
                     <option>Textbook</option>
                   </select>
                 </div>
               </div>
               <div>
                 <label className="block text-sm font-semibold text-[var(--text)] mb-1">Discipline</label>
                 <select className="w-full px-3 py-2 bg-[var(--bg)] border border-[var(--border)] rounded-xl focus:ring-2 focus:ring-[var(--primary)] outline-none">
                   <option>Medical Physiology</option>
                   <option>Pharmacology</option>
                   <option>Clinical Pharmacy</option>
                 </select>
               </div>
               <div className="border-2 border-dashed border-[var(--border)] p-8 text-center rounded-xl bg-[var(--bg)]">
                 <FileText className="mx-auto mb-2 text-[var(--text-muted)]" />
                 <p className="text-sm font-semibold">Select file or URL</p>
               </div>
               
               <div className="pt-2 flex justify-end gap-3">
                 <button onClick={() => setIsUploading(false)} className="px-4 py-2 font-semibold text-[var(--text)] hover:bg-[var(--surface-dim)] rounded-xl">Cancel</button>
                 <button onClick={() => setIsUploading(false)} className="px-4 py-2 bg-[var(--primary)] text-[var(--primary-foreground)] font-bold rounded-xl shadow-sm">Save & Index</button>
               </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function TaxonomyTab() {
  return (
    <div className="space-y-6 animate-in fade-in">
      <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="font-bold text-[var(--text)] text-lg">Curriculum Structure</h3>
            <p className="text-sm text-[var(--text-muted)]">Manage Disciplines, Units, and Topics mapping.</p>
          </div>
          <button className="px-4 py-2 bg-[var(--surface-dim)] border border-[var(--border)] rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-[var(--border)]">
            <Plus size={16} /> Add Discipline
          </button>
        </div>
        
        <div className="space-y-2">
          {['Medical Physiology', 'Pharmacology', 'Clinical Pharmacy & Therapeutics'].map((disc) => (
            <div key={disc} className="border border-[var(--border)] rounded-xl p-4 flex items-center justify-between group cursor-pointer hover:border-[var(--primary)] transition-all">
              <div className="flex items-center gap-3">
                <FolderTree size={20} className="text-[var(--primary)]" />
                <span className="font-bold text-[var(--text)]">{disc}</span>
              </div>
              <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="p-1.5 bg-[var(--surface-dim)] rounded-lg text-[var(--text-muted)] hover:text-[var(--text)]"><Edit size={14} /></button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function AnalyticsTab() {
  return (
    <div className="space-y-6 animate-in fade-in">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: 'Total Indexed Resources', val: '2,405', icon: Database },
          { label: 'Queries Answered (RAG)', val: '14.2k', icon: Search },
          { label: 'Vector Storage Used', val: '4.2 GB', icon: Layers }
        ].map((stat, i) => (
          <div key={i} className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-6 flex flex-col justify-between">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-[var(--primary)]/10 text-[var(--primary)] rounded-xl">
                <stat.icon size={20} />
              </div>
              <span className="text-sm font-bold text-[var(--text-muted)]">{stat.label}</span>
            </div>
            <div className="text-3xl font-extrabold text-[var(--text)]">{stat.val}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SettingsTab() {
  return (
    <div className="space-y-6 animate-in fade-in">
      <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-6">
         <h3 className="font-bold text-[var(--text)] text-lg mb-4">Processing Pipeline</h3>
         <div className="space-y-4 max-w-xl">
           <label className="flex items-center justify-between p-4 border border-[var(--border)] rounded-xl">
             <div>
               <p className="font-bold text-sm text-[var(--text)]">Auto-OCR Scanned Documents</p>
               <p className="text-xs text-[var(--text-muted)]">Extract text from images within PDFs automatically.</p>
             </div>
             <input type="checkbox" defaultChecked className="w-4 h-4" />
           </label>
           <label className="flex items-center justify-between p-4 border border-[var(--border)] rounded-xl">
             <div>
               <p className="font-bold text-sm text-[var(--text)]">Duplicate Detection</p>
               <p className="text-xs text-[var(--text-muted)]">Block uploads of semantically identical content.</p>
             </div>
             <input type="checkbox" defaultChecked className="w-4 h-4" />
           </label>
           <label className="flex items-center justify-between p-4 border border-[var(--border)] rounded-xl">
             <div>
               <p className="font-bold text-sm text-[var(--text)]">Generate Flashcards on Upload</p>
               <p className="text-xs text-[var(--text-muted)]">Automatically create spaced repetition decks from new materials.</p>
             </div>
             <input type="checkbox" defaultChecked className="w-4 h-4" />
           </label>
         </div>
      </div>
    </div>
  );
}

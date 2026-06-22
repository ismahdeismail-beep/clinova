import { 
  CloudUpload, 
  Plus, 
  FileText, 
  FileCheck2, 
  HelpCircle, 
  BookOpen, 
  ArrowRight,
  Shield,
  BrainCircuit,
  FileSearch,
  CheckCircle2
} from 'lucide-react';

export default function StudyEngineScreen() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-[1440px] mx-auto text-on-surface">
      
      {/* Header Section */}
      <div className="lg:col-span-12 mb-4 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2 py-0.5 rounded bg-primary/10 text-primary font-semibold text-[10px] uppercase tracking-tighter border border-primary/20">Knowledge Conversion</span>
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight">Clinova Knowledge Engine</h2>
          <p className="text-sm text-on-surface-variant mt-2 max-w-2xl">
            Convert clinical documentation and research into actionable learning assets. Validated against the <span className="text-primary hover:underline cursor-pointer">Kenya Drug Index v2024</span>.
          </p>
        </div>
      </div>

      {/* Main Upload / Settings */}
      <div className="lg:col-span-8 flex flex-col gap-6">
        <section className="obsidian-card p-8 rounded-xl relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none"></div>
          
          <div className="relative z-10 flex flex-col items-center justify-center py-12 border-2 border-dashed border-outline-variant rounded-lg hover:border-primary transition-colors cursor-pointer group-hover:bg-primary/5">
            <div className="w-16 h-16 rounded-full bg-surface-container-high flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <CloudUpload size={32} className="text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-1">Ingest Clinical Documents</h3>
            <p className="text-sm text-on-surface-variant mb-6 text-center max-w-xs">Drop PDFs, JPEG patient notes, or paste clinical abstracts</p>
            
            <div className="flex gap-3">
              <button className="px-6 py-2 bg-primary text-on-primary font-bold rounded-lg flex items-center gap-2 hover:opacity-90 transition-opacity whitespace-nowrap text-sm">
                <Plus size={16} /> Select Files
              </button>
              <button className="px-6 py-2 border border-outline-variant text-on-surface font-bold rounded-lg hover:bg-surface-container-high transition-colors text-sm">
                Browse Notes
              </button>
            </div>
          </div>

          {/* Conversion Options */}
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 relative z-10">
            {[
              { icon: FileText, label: 'Short Notes', active: true },
              { icon: FileCheck2, label: 'Summaries', active: false },
              { icon: HelpCircle, label: 'MCQs', active: false },
              { icon: BookOpen, label: 'Revision Guide', active: false }
            ].map((opt) => (
              <div key={opt.label} className={`p-4 rounded-lg flex flex-col items-center text-center cursor-pointer transition-all ${opt.active ? 'bg-primary-container/10 border-primary/40 border text-primary font-bold' : 'bg-surface border border-outline-variant hover:border-primary/40 text-on-surface-variant'}`}>
                <opt.icon size={24} className="mb-2" />
                <span className="text-xs">{opt.label}</span>
              </div>
            ))}
          </div>

          {/* Guardrails */}
          <div className="mt-8 p-4 rounded-lg bg-surface-container-lowest border border-outline-variant/30 relative z-10">
            <div className="flex items-center gap-2 mb-3">
              <Shield size={16} className="text-primary" />
              <h4 className="text-xs font-bold uppercase tracking-widest text-primary">Intelligence Guardrails</h4>
            </div>
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-primary shadow-[0_0_8px_#00E5FF]"></div>
                  <span className="text-xs font-medium">Source Fidelity Strict</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-primary shadow-[0_0_8px_#00E5FF]"></div>
                  <span className="text-xs font-medium">KDI Cross-Reference</span>
                </div>
              </div>
              <div className="flex items-center gap-2 bg-surface p-1 rounded-full border border-outline-variant">
                <button className="px-4 py-1.5 rounded-full text-[10px] font-bold bg-primary text-on-primary">SECURE ENGINE</button>
                <button className="px-4 py-1.5 rounded-full text-[10px] font-bold text-on-surface-variant hover:text-on-surface">CREATIVE EXPLORATION</button>
              </div>
            </div>
          </div>
        </section>

        {/* Recent Transformations */}
        <section className="obsidian-card p-6 rounded-xl">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold">Recent Transformations</h3>
            <button className="text-primary text-sm font-bold flex items-center gap-1 hover:underline">
              View Archive <ArrowRight size={14} />
            </button>
          </div>
          
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-surface-container-low border border-outline-variant hover:border-primary/50 transition-colors">
              <div className="flex items-start justify-between mb-4">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded bg-secondary-container/30 flex items-center justify-center text-secondary">
                    <FileSearch size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-bold">KNH_Diabetes_Guidelines_2023.pdf</p>
                    <p className="text-[11px] text-on-surface-variant">Summary Engine • 12 mins ago</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-primary text-[11px] font-bold tracking-wider">
                  <CheckCircle2 size={12} className="animate-pulse" />
                  KDI VALIDATED
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-[10px] font-bold uppercase text-on-surface-variant tracking-wider">
                  <span>Analyzing Hierarchy</span>
                  <span>88%</span>
                </div>
                <div className="h-1.5 w-full bg-surface-container-high rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full transition-all duration-1000" style={{ width: '88%' }}></div>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-surface-container-low border border-outline-variant hover:border-primary/50 transition-colors">
              <div className="flex items-start justify-between mb-4">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded bg-secondary-container/30 flex items-center justify-center text-secondary">
                    <FileText size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-bold">Hypertension_Clinic_Notes_v2.jpg</p>
                    <p className="text-[11px] text-on-surface-variant">MCQ Generator • 2 hours ago</p>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-surface-container-highest text-on-surface-variant text-[10px] font-bold uppercase">Complete</span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-[10px] font-bold uppercase text-on-surface-variant tracking-wider">
                  <span>Ready for Review</span>
                  <span>100%</span>
                </div>
                <div className="h-1.5 w-full bg-surface-container-high rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full" style={{ width: '100%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Sidebar Info */}
      <div className="lg:col-span-4 flex flex-col gap-6">
        
        {/* KDI Verification Status */}
        <section className="obsidian-card p-6 rounded-xl border-l-[3px] border-l-primary">
          <div className="flex items-center gap-3 mb-4">
            <FileCheck2 className="text-primary" size={24} />
            <h3 className="text-xs font-bold uppercase tracking-widest">KDI Verification</h3>
          </div>
          <div className="space-y-4">
            <div className="p-3 bg-surface-container border border-outline-variant rounded-lg flex items-center justify-between">
              <span className="text-xs">Database Version</span>
              <span className="text-xs font-mono text-primary font-bold">v2024.Q3.11</span>
            </div>
            <div className="p-3 bg-surface-container border border-outline-variant rounded-lg flex items-center justify-between">
              <span className="text-xs">Region Compliance</span>
              <span className="text-xs font-mono text-primary font-bold">Kenya (PPB)</span>
            </div>
            <p className="text-[11px] text-on-surface-variant italic leading-relaxed">
              "The engine will prioritize drug dosages and interaction profiles explicitly defined in the Kenya Essential Medicines List."
            </p>
          </div>
        </section>

        {/* Semantic Mapping block */}
        <section className="obsidian-card h-48 rounded-xl overflow-hidden relative flex items-center justify-center bg-surface-container-low group">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/microbial-mat.png')] opacity-10"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#131315] via-transparent to-transparent z-10" />
          
          <div className="relative z-20 flex flex-col items-center text-center p-6">
            <BrainCircuit size={40} className="text-primary mb-2 group-hover:scale-110 transition-transform" />
            <h4 className="text-xs font-bold mb-1">Semantic Mapping</h4>
            <p className="text-[10px] text-on-surface-variant max-w-[200px]">Real-time analysis of clinical entities within your documents</p>
          </div>
        </section>

        {/* Usage Stats */}
        <section className="obsidian-card p-6 rounded-xl">
          <h3 className="text-xs font-bold uppercase tracking-widest mb-6">Monthly Quota</h3>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between mb-2 text-xs">
                <span className="font-medium text-on-surface-variant">Pages Processed</span>
                <span className="font-bold">142 / 500</span>
              </div>
              <div className="h-1 bg-surface-container-highest rounded-full overflow-hidden">
                <div className="h-full bg-primary" style={{ width: '28%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-2 text-xs">
                <span className="font-medium text-on-surface-variant">Flashcards Created</span>
                <span className="font-bold">890 / 2,000</span>
              </div>
              <div className="h-1 bg-surface-container-highest rounded-full overflow-hidden">
                <div className="h-full bg-primary" style={{ width: '44%' }}></div>
              </div>
            </div>
            
            <button className="w-full py-3 bg-surface-container-highest text-on-surface text-xs font-bold rounded-lg border border-outline-variant hover:border-primary/50 transition-colors tracking-widest uppercase">
              Upgrade Engine
            </button>
          </div>
        </section>

      </div>
    </div>
  );
}

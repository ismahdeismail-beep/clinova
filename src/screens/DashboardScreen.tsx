import { Activity, Filter, FileText, File as FileIcon, FileVideo, ShieldAlert, CheckCircle2 } from 'lucide-react';

export default function DashboardScreen() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 max-w-[1440px] mx-auto text-on-surface">
      
      {/* Activity Intelligence */}
      <section className="md:col-span-8 obsidian-card rounded-xl p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <Activity size={96} />
        </div>
        
        <header className="flex justify-between items-start mb-8 relative z-10">
          <div>
            <h3 className="text-xl font-bold">Activity Intelligence</h3>
            <p className="text-sm text-on-surface-variant">Cognitive load and decision-making metrics for this session.</p>
          </div>
          <div className="px-3 py-1 bg-primary/10 border border-primary/20 rounded-full">
            <span className="text-xs font-semibold text-primary">Live Sync</span>
          </div>
        </header>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 relative z-10">
          <div className="p-4 border border-outline-variant rounded-lg bg-surface-container-low">
            <p className="text-xs font-semibold text-on-surface-variant uppercase mb-1">Decisions Made</p>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-primary">142</span>
              <span className="text-xs text-on-surface-variant">+12% vs last shift</span>
            </div>
          </div>
          <div className="p-4 border border-outline-variant rounded-lg bg-surface-container-low">
            <p className="text-xs font-semibold text-on-surface-variant uppercase mb-1">Knowledge Coverage</p>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold">88%</span>
              <span className="text-xs text-on-surface-variant">General Medicine</span>
            </div>
          </div>
          <div className="p-4 border border-outline-variant rounded-lg bg-surface-container-low">
            <p className="text-xs font-semibold text-on-surface-variant uppercase mb-1">Clinical Recall</p>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold">94.1</span>
              <span className="text-xs text-on-surface-variant">Avg Precision</span>
            </div>
          </div>
        </div>

        {/* Chart placeholder */}
        <div className="mt-8 h-48 w-full z-10 relative">
          <div className="w-full h-full border border-outline-variant bg-surface-container-lowest rounded-lg flex items-end p-4 gap-2">
            {[40, 65, 50, 85, 60, 45, 75, 90].map((h, i) => (
              <div key={i} className="flex-1 bg-primary/40 hover:bg-primary/80 transition-colors rounded-t-sm" style={{ height: `${h}%` }}></div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Progress */}
      <section className="md:col-span-4 obsidian-card rounded-xl p-6 flex flex-col">
        <h3 className="text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-6">Clinical Case Progress</h3>
        
        <div className="space-y-6 flex-1">
          {[
            { label: 'Acute Cardiology Case', val: 85 },
            { label: 'Endocrinology Module', val: 42 },
            { label: 'Emergency Triage Simulation', val: 91 }
          ].map(item => (
            <div key={item.label} className="space-y-2">
              <div className="flex justify-between text-xs font-semibold">
                <span>{item.label}</span>
                <span className="text-primary">{item.val}%</span>
              </div>
              <div className="w-full bg-surface-container-highest h-1 rounded-full">
                <div className="bg-primary h-full rounded-full" style={{ width: `${item.val}%` }}></div>
              </div>
            </div>
          ))}
        </div>
        
        <button className="mt-6 w-full min-h-[44px] py-3 border border-outline-variant rounded-lg text-xs font-bold hover:bg-surface-container-high transition-colors flex items-center justify-center gap-2">
          View All Cases
          <ArrowRightIcon size={14} />
        </button>
      </section>

      {/* Recent Files */}
      <section className="md:col-span-6 obsidian-card rounded-xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold">Recent Files</h3>
          <Filter size={18} className="text-on-surface-variant cursor-pointer" />
        </div>
        
        <div className="space-y-3">
          {[
            { icon: FileText, color: 'text-error', bg: 'bg-error-container/20', border: 'border-error-container/30', name: 'NICE_Guideline_NG28.pdf', meta: 'Uploaded 2h ago • 4.2 MB' },
            { icon: FileIcon, color: 'text-primary', bg: 'bg-primary/20', border: 'border-primary/30', name: 'Clinical_Notes_ICU_4.txt', meta: 'Uploaded 5h ago • 12 KB' },
            { icon: FileVideo, color: 'text-secondary', bg: 'bg-secondary-container', border: 'border-outline-variant', name: 'Lecture_Sepsis_Recording.mp4', meta: 'Uploaded Yesterday • 182 MB' }
          ].map((file, i) => (
            <div key={i} className="group flex items-center gap-4 p-3 rounded-lg border border-transparent hover:border-outline-variant hover:bg-surface-container-low transition-all cursor-pointer">
              <div className={`w-10 h-10 ${file.bg} flex items-center justify-center rounded border ${file.border}`}>
                <file.icon size={20} className={file.color} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">{file.name}</p>
                <p className="text-xs text-on-surface-variant">{file.meta}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Study Outputs */}
      <section className="md:col-span-6 obsidian-card rounded-xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold">Recent Study Outputs</h3>
          <div className="flex gap-2">
            <span className="px-2 py-1 bg-surface-container-highest rounded text-[10px] uppercase font-bold text-on-surface-variant">Summary</span>
            <span className="px-2 py-1 bg-surface-container-highest rounded text-[10px] uppercase font-bold text-on-surface-variant">MCQ</span>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="p-4 border border-outline-variant rounded-lg bg-surface-container-lowest hover:border-primary/50 transition-colors cursor-pointer relative overflow-hidden">
            <div className="absolute top-0 right-0 h-full w-1 bg-primary"></div>
            <div className="flex justify-between items-start mb-2">
              <span className="text-xs font-bold text-primary tracking-wider">MCQ SET</span>
              <span className="text-xs text-on-surface-variant">10 Questions</span>
            </div>
            <h4 className="text-base font-bold">Differential Diagnosis: Acute Abdomen</h4>
            <p className="text-xs text-on-surface-variant mt-1">Generated from NICE Guidelines • 90% Avg Score</p>
          </div>
          
          <div className="p-4 border border-outline-variant rounded-lg bg-surface-container-lowest hover:border-primary/50 transition-colors cursor-pointer relative overflow-hidden">
            <div className="absolute top-0 right-0 h-full w-1 bg-outline-variant"></div>
            <div className="flex justify-between items-start mb-2">
              <span className="text-xs font-bold text-on-surface-variant tracking-wider">SUMMARY</span>
              <span className="text-xs text-on-surface-variant">3 min read</span>
            </div>
            <h4 className="text-base font-bold">Key Changes in GINA Asthma Guidelines 2024</h4>
            <p className="text-xs text-on-surface-variant mt-1">Condensed Clinical Intelligence • Generated Today</p>
          </div>
        </div>
      </section>

      {/* Active Pharmacotherapy */}
      <section className="md:col-span-12 obsidian-card rounded-xl p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-xl font-bold">Clinova Reasoning Engine</h3>
            <p className="text-sm text-on-surface-variant">Currently active patient medication reconciliation and intelligence forms.</p>
          </div>
          <button className="px-4 min-h-[44px] bg-primary text-on-primary rounded-lg font-bold text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
            <span>+</span> New Form
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-outline-variant text-[10px] uppercase font-bold text-on-surface-variant tracking-widest">
                <th className="py-4 px-2">Patient Ref</th>
                <th className="py-4 px-2">Current Status</th>
                <th className="py-4 px-2">Drug Interactions</th>
                <th className="py-4 px-2">Next Step</th>
                <th className="py-4 px-2 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              <tr className="border-b border-outline-variant hover:bg-surface-container-high transition-colors">
                <td className="py-4 px-2 font-medium">#PAT-0092-A</td>
                <td className="py-4 px-2">
                  <span className="px-2 py-1 bg-primary/10 text-primary border border-primary/20 rounded text-[10px] font-bold uppercase">Validating</span>
                </td>
                <td className="py-4 px-2">
                  <div className="flex items-center gap-2">
                    <ShieldAlert size={16} className="text-error" />
                    <span>3 Major Interactions Detected</span>
                  </div>
                </td>
                <td className="py-4 px-2 text-on-surface-variant">Review Warfarin-NSAID Logic</td>
                <td className="py-2 px-2 text-right">
                  <button className="text-primary font-bold text-xs hover:underline min-h-[44px] px-2 flex items-center justify-end w-full">Resume</button>
                </td>
              </tr>
              <tr className="border-b border-outline-variant hover:bg-surface-container-high transition-colors">
                <td className="py-4 px-2 font-medium">#PAT-0118-C</td>
                <td className="py-4 px-2">
                  <span className="px-2 py-1 bg-surface-container-highest text-on-surface-variant border border-outline-variant rounded text-[10px] font-bold uppercase">Pending</span>
                </td>
                <td className="py-4 px-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-primary" />
                    <span>No Contraindications Found</span>
                  </div>
                </td>
                <td className="py-4 px-2 text-on-surface-variant">Awaiting Serum Creatinine</td>
                <td className="py-2 px-2 text-right">
                  <button className="text-primary font-bold text-xs hover:underline min-h-[44px] px-2 flex items-center justify-end w-full">Resume</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
      
    </div>
  );
}

function ArrowRightIcon({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M12 5l7 7-7 7"/>
    </svg>
  );
}

import { memo } from 'react';
import { 
  PlusCircle, 
  Search, 
  Filter, 
  Pill, 
  Calculator, 
  ListChecks, 
  TerminalSquare, 
  ArrowRight
} from 'lucide-react';

function PharmaScreen() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-[1440px] mx-auto text-on-surface">
      
      {/* AI Insight Banner */}
      <section className="lg:col-span-12 obsidian-card p-6 rounded-xl flex flex-col md:flex-row items-center gap-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
          <TerminalSquare size={96} />
        </div>
        <div className="p-4 bg-primary/10 rounded-full flex-shrink-0 z-10">
          <TerminalSquare size={32} className="text-primary" />
        </div>
        <div className="flex-1 z-10">
          <h3 className="text-xl font-bold mb-1">Clinova Reasoning Engine</h3>
          <p className="text-sm text-on-surface-variant max-w-2xl">
            AI Insight: <span className="text-primary font-medium italic">"Ready to assist with Drug Therapy Assessment using Kenya Drug Index. Systems primed for renal adjustment calculations and contraindication checks."</span>
          </p>
        </div>
        <button className="w-full md:w-auto px-6 py-3 bg-primary-container text-on-primary font-bold rounded-lg flex items-center justify-center gap-2 hover:opacity-90 transition-all z-10">
          <PlusCircle size={20} />
          <span>New Case Entry</span>
        </button>
      </section>

      {/* Left Column: Workflow & Cases */}
      <div className="lg:col-span-8 flex flex-col gap-6">
        
        {/* Workflow Tracker */}
        <section className="obsidian-card p-0 overflow-hidden rounded-xl">
          <div className="px-6 py-4 border-b border-outline-variant flex items-center justify-between">
            <span className="text-xs text-on-surface font-bold uppercase tracking-widest">Active Reasoning Path</span>
            <span className="text-[10px] text-primary bg-primary/10 px-2 py-0.5 rounded uppercase font-bold tracking-wider">Auto-save Enabled</span>
          </div>
          <div className="p-6 relative">
            <div className="hidden md:block absolute top-1/2 left-12 right-12 h-[1px] bg-outline-variant -translate-y-1/2 z-0"></div>
            
            <div className="grid grid-cols-4 gap-2 relative z-10">
              <div className="flex flex-col items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold">1</div>
                <span className="text-xs font-semibold text-primary text-center">Patient Profile</span>
              </div>
              <div className="flex flex-col items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-surface-container-highest border border-outline-variant text-on-surface-variant flex items-center justify-center font-bold">2</div>
                <span className="text-xs font-semibold text-on-surface-variant text-center">Drug History</span>
              </div>
              <div className="flex flex-col items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-surface-container-highest border border-outline-variant text-on-surface-variant flex items-center justify-center font-bold">3</div>
                <span className="text-xs font-semibold text-on-surface-variant text-center">Clinical Lab</span>
              </div>
              <div className="flex flex-col items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-surface-container-highest border border-outline-variant text-on-surface-variant flex items-center justify-center font-bold">4</div>
                <span className="text-xs font-semibold text-on-surface-variant text-center">Assessment</span>
              </div>
            </div>
          </div>
        </section>

        {/* Case List */}
        <section className="obsidian-card rounded-xl">
          <div className="p-6 border-b border-outline-variant flex justify-between items-center">
            <h4 className="text-xl font-bold">De-identified Patient Cases</h4>
            <div className="flex gap-2">
              <button className="p-2 border border-outline-variant rounded hover:bg-surface-container-low transition-colors">
                <Filter size={16} />
              </button>
              <button className="p-2 border border-outline-variant rounded hover:bg-surface-container-low transition-colors">
                <Search size={16} />
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-surface-container-low border-b border-outline-variant">
                <tr className="text-xs text-on-surface-variant tracking-wider">
                  <th className="px-6 py-4 font-semibold uppercase">Case ID</th>
                  <th className="px-6 py-4 font-semibold uppercase">Primary Diagnosis</th>
                  <th className="px-6 py-4 font-semibold uppercase">Last Updated</th>
                  <th className="px-6 py-4 font-semibold uppercase">Status</th>
                  <th className="px-6 py-4"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/30 text-sm">
                {[
                  { id: '#CLV-PX-2094', dx: 'Community Acquired Pneumonia', time: '2h ago', status: 'Reviewing', sc: 'bg-secondary-container/30', tc: 'text-secondary' },
                  { id: '#CLV-PX-8812', dx: 'Type 2 DM / Diabetic Foot', time: '10h ago', status: 'Requires Attention', sc: 'bg-error-container/20', tc: 'text-error' },
                  { id: '#CLV-PX-1205', dx: 'CKD Stage 3b', time: 'Yesterday', status: 'Completed', sc: 'bg-primary-container/20', tc: 'text-primary' },
                  { id: '#CLV-PX-4501', dx: 'Hypertensive Crisis', time: '2 days ago', status: 'Completed', sc: 'bg-primary-container/20', tc: 'text-primary' }
                ].map((row) => (
                  <tr key={row.id} className="hover:bg-surface-container transition-colors group">
                    <td className="px-6 py-5 font-mono font-medium text-primary">{row.id}</td>
                    <td className="px-6 py-5">{row.dx}</td>
                    <td className="px-6 py-5 text-on-surface-variant">{row.time}</td>
                    <td className="px-6 py-5">
                      <span className={`px-2 py-1 rounded ${row.sc} ${row.tc} text-[10px] font-bold uppercase tracking-tight`}>
                        {row.status}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <button className="opacity-0 group-hover:opacity-100 transition-opacity text-primary">
                        <ArrowRight size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

      </div>

      {/* Right Column: Context & Resources */}
      <div className="lg:col-span-4 flex flex-col gap-6">
        
        <section className="obsidian-card p-6 rounded-xl">
          <h5 className="text-xs font-bold text-on-surface mb-4 uppercase tracking-wider">Clinical Review Templates</h5>
          <div className="flex flex-col gap-3">
            {[
              { icon: Pill, title: 'Clinova SOAP Generator', sub: 'Automated Notes Generation', bg: 'bg-primary/20', c: 'text-primary' },
              { icon: Calculator, title: 'Dose Adjustment Hub', sub: 'Renal / Hepatic Impairment', bg: 'bg-tertiary-container/20', c: 'text-tertiary' },
              { icon: ListChecks, title: 'Meds Reconciliation', sub: 'Admission vs. Discharge', bg: 'bg-secondary-container/30', c: 'text-secondary' }
            ].map(tpl => (
              <button key={tpl.title} className="flex items-center gap-4 p-4 rounded-lg bg-surface-container-high border border-outline-variant hover:border-primary transition-all text-left">
                <div className={`p-2 rounded ${tpl.bg} ${tpl.c}`}>
                  <tpl.icon size={20} />
                </div>
                <div>
                  <p className="font-bold text-sm">{tpl.title}</p>
                  <p className="text-[11px] text-on-surface-variant">{tpl.sub}</p>
                </div>
              </button>
            ))}
          </div>
        </section>

        <section className="obsidian-card rounded-xl overflow-hidden flex flex-col relative group">
          <div className="h-32 w-full bg-surface-container-high relative overflow-hidden flex items-center justify-center">
            {/* Mock image background pattern */}
            <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#131315] to-transparent z-10" />
            <Search size={48} className="text-primary/20" />
          </div>
          
          <div className="p-6 relative z-20">
            <div className="flex items-center justify-between mb-4">
              <h5 className="text-xs font-bold uppercase tracking-wider text-on-surface">Reference Link</h5>
              <span className="px-2 py-0.5 rounded-full bg-primary/20 text-primary text-[10px] font-bold">LIVE</span>
            </div>
            <p className="text-sm mb-4 text-on-surface-variant">Kenya Essential Medicines List (KEML) & Drug Index synchronized.</p>
            
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search KEML Index..." 
                className="w-full bg-surface-dim border border-outline-variant rounded-lg px-4 py-2 pr-10 text-sm focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all placeholder:text-on-surface-variant text-on-surface"
              />
              <Search size={16} className="absolute right-3 top-2.5 text-on-surface-variant" />
            </div>
          </div>
        </section>

        <section className="p-2">
          <h5 className="text-xs font-bold text-on-surface-variant mb-4 uppercase tracking-widest px-2">System Events</h5>
          <div className="space-y-4 px-2">
            <div className="flex gap-4">
              <div className="w-1 h-8 bg-primary rounded-full"></div>
              <div>
                <p className="text-sm">Review #CLV-PX-2094 updated</p>
                <p className="text-[10px] text-on-surface-variant">5 minutes ago</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-1 h-8 bg-outline-variant rounded-full"></div>
              <div>
                <p className="text-sm">Kenya Drug Index database refresh</p>
                <p className="text-[10px] text-on-surface-variant">1 hour ago</p>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}

export default memo(PharmaScreen);

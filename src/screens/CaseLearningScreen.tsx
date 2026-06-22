import { Heart, Droplet, Circle, Brain, Search, ChevronRight } from 'lucide-react';

export default function CaseLearningScreen() {
  return (
    <div className="max-w-[1440px] mx-auto text-on-surface">
      
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <h2 className="text-3xl font-extrabold text-primary mb-2 tracking-tight">Clinova Risk Simulator</h2>
          <p className="text-sm text-on-surface-variant max-w-xl">
            Advanced clinical diagnostic environment. Utilize curated cases from Harrison’s Principles and Oxford Pharmacotherapy textbooks to sharpen clinical reasoning.
          </p>
        </div>
        <div className="flex items-center gap-8 bg-surface-container-high p-4 rounded-xl border border-outline-variant">
          <div className="flex flex-col items-center">
            <span className="text-[10px] text-on-surface-variant font-bold uppercase tracking-widest mb-1">Mastery Score</span>
            <div className="relative flex items-center justify-center">
              <svg className="w-14 h-14 transform -rotate-90">
                <circle className="text-surface-variant" cx="28" cy="28" fill="transparent" r="24" stroke="currentColor" strokeWidth="4"></circle>
                <circle className="text-primary" cx="28" cy="28" fill="transparent" r="24" stroke="currentColor" strokeDasharray="150" strokeDashoffset="24" strokeWidth="4"></circle>
              </svg>
              <span className="absolute font-mono text-primary text-sm font-bold">84%</span>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] text-on-surface-variant font-bold uppercase tracking-widest mb-1">Cases Cleared</span>
            <span className="text-2xl font-bold text-on-surface">
              142<span className="text-on-surface-variant font-normal text-sm ml-1">/ 450</span>
            </span>
          </div>
        </div>
      </header>

      {/* Categories */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
        {[
          { icon: Heart, label: 'Cardiology', count: 32 },
          { icon: Droplet, label: 'Endocrinology', count: 28 },
          { icon: Circle, label: 'Pulmonology', count: 19 },
          { icon: Brain, label: 'Neurology', count: 24 }
        ].map(cat => (
          <div key={cat.label} className="obsidian-card p-6 rounded-2xl flex flex-col justify-between group cursor-pointer hover:border-primary/50">
            <cat.icon size={32} className="text-primary mb-4 group-hover:scale-110 transition-transform" />
            <div>
              <h3 className="text-xl font-bold mb-1">{cat.label}</h3>
              <p className="text-xs text-on-surface-variant">{cat.count} Structured Cases</p>
            </div>
          </div>
        ))}
      </section>

      {/* Split layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Case List */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-xl font-bold">Available Simulations</h4>
            <div className="flex gap-2">
              <button className="bg-surface-container-high px-3 py-1 rounded border border-outline-variant text-[10px] font-bold text-on-surface-variant uppercase hover:border-primary transition-colors">Filters</button>
              <button className="bg-surface-container-high px-3 py-1 rounded border border-outline-variant text-[10px] font-bold text-on-surface-variant uppercase hover:border-primary transition-colors">Sort</button>
            </div>
          </div>

          {[
            { tag1: 'HARD', tc1: 'bg-error-container text-on-error-container', tag2: "HARRISON'S V21", title: 'Refractory Hypertension in a 58yo Male', desc: 'Exploring secondary causes and multi-drug regimen optimization. Focus on renal artery stenosis screening criteria.', time: '15-20 min', xp: '450 XP' },
            { tag1: 'MEDIUM', tc1: 'bg-primary-container text-on-primary-container', tag2: "OXFORD PHARM", title: 'DKA Management Protocol Optimization', desc: 'Patient presenting with metabolic acidosis. Navigate insulin drip titrations and electrolyte replacements.', time: '10-12 min', xp: '280 XP' }
          ].map(sim => (
            <article key={sim.title} className="obsidian-card p-5 rounded-2xl flex flex-col md:flex-row gap-6 relative overflow-hidden group">
              <div className="w-full md:w-40 h-40 rounded-xl overflow-hidden flex-shrink-0 bg-surface-container-low border border-outline-variant flex items-center justify-center relative">
                <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-50 z-10" />
                <span className="text-primary opacity-20 relative z-0">
                  <Search size={48} />
                </span>
              </div>
              <div className="flex-grow flex flex-col justify-between py-1">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${sim.tc1}`}>{sim.tag1}</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-secondary-container text-on-secondary-container uppercase">{sim.tag2}</span>
                  </div>
                  <h5 className="text-xl font-bold mb-2">{sim.title}</h5>
                  <p className="text-sm text-on-surface-variant line-clamp-2">{sim.desc}</p>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center gap-4 text-xs text-on-surface-variant font-bold">
                    <span>{sim.time}</span>
                    <span className="text-primary">{sim.xp}</span>
                  </div>
                  <button className="bg-primary text-on-primary px-6 py-2 rounded-lg font-bold text-sm hover:opacity-90 transition-opacity whitespace-nowrap">
                    Launch Simulation
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Workflow Logic */}
        <div className="lg:col-span-1">
          <div className="obsidian-card rounded-2xl overflow-hidden sticky top-24">
            <div className="p-6 border-b border-outline-variant bg-surface-container-high">
              <h4 className="text-[10px] text-primary uppercase font-bold tracking-widest mb-1">Clinova Decision Tree</h4>
              <p className="text-xl font-bold text-on-surface">Step-by-Step Logic</p>
            </div>
            
            <div className="p-6 space-y-8 relative">
              <div className="absolute left-9 top-12 bottom-12 w-[1px] bg-outline-variant"></div>
              
              {[
                { s: 1, c: 'bg-primary text-on-primary border-transparent', t: 'Clinical Data Ingestion', d: 'Patient history, vitals, and current medication list parsing.' },
                { s: 2, c: 'bg-secondary-container text-primary border-primary/50 border', t: 'Differential Matrix', d: 'Weighting possibilities based on textbook sensitivity/specificity.' },
                { s: 3, c: 'bg-surface-container text-on-surface-variant border-outline-variant border', t: 'Intervention Selection', d: 'Pharmacological vs procedural choice with risk assessment.' },
                { s: 4, c: 'bg-surface-container text-on-surface-variant border-outline-variant border', t: 'Outcome Simulation', d: 'Real-time physiological response modeling based on your actions.' }
              ].map(step => (
                <div key={step.s} className="relative flex gap-4">
                  <div className={`z-10 w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold mt-1 ${step.c}`}>
                    {step.s}
                  </div>
                  <div>
                    <h6 className="font-bold text-sm">{step.t}</h6>
                    <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">{step.d}</p>
                  </div>
                </div>
              ))}

              <div className="pt-4">
                <div className="p-4 bg-primary/5 rounded-xl border border-primary/20">
                  <span className="text-[10px] font-bold text-primary uppercase tracking-wider block mb-1">Expert Tip</span>
                  <p className="text-[11px] text-on-surface-variant leading-relaxed">Systematic reasoning is 40% more effective than heuristic shortcuts in complex Cardiology cases.</p>
                </div>
              </div>
            </div>
            
            <div className="p-6 bg-surface-container-low border-t border-outline-variant">
              <button className="w-full py-3 bg-transparent border border-outline-variant text-on-surface rounded-xl font-bold text-xs uppercase tracking-widest hover:border-primary transition-colors flex items-center justify-center gap-2">
                Export Reasoning History
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

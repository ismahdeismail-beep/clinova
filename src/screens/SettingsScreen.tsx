import { 
  ShieldCheck, 
  Sparkles, 
  Globe2, 
  MonitorSmartphone, 
  Bell, 
  Save,
  Laptop
} from 'lucide-react';

export default function SettingsScreen() {
  return (
    <div className="max-w-[1440px] mx-auto text-on-surface flex flex-col gap-6">
      
      {/* Header */}
      <section className="obsidian-card p-8 rounded-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-5">
          <ShieldCheck size={120} />
        </div>
        <div className="relative z-10">
          <h2 className="text-3xl font-extrabold mb-2">Clinical Governance</h2>
          <p className="text-sm text-on-surface-variant max-w-2xl">
            Manage your clinical environment protocols, data de-identification guardrails, and regional pharmaceutical standards.
          </p>
        </div>
        <button className="px-6 py-3 bg-primary text-on-primary font-bold text-sm rounded-lg hover:opacity-90 transition-all flex items-center gap-2 relative z-10">
          <Save size={18} />
          <span>SAVE ALL CHANGES</span>
        </button>
      </section>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* Privacy & ID */}
        <div className="md:col-span-8 flex flex-col gap-6">
          <div className="obsidian-card rounded-xl overflow-hidden">
            <div className="p-6 border-b border-outline-variant bg-surface-container-high flex items-center justify-between">
              <div className="flex items-center gap-3">
                <ShieldCheck className="text-primary" size={24} />
                <h3 className="text-xl font-bold">Privacy & De-identification</h3>
              </div>
              <span className="px-3 py-1 bg-secondary-container/30 text-primary border border-primary/20 rounded text-[10px] font-bold uppercase tracking-widest">Enforced</span>
            </div>
            
            <div className="p-6 space-y-6 bg-surface-container-low">
              {/* Toggle 1 */}
              <div className="flex items-center justify-between p-4 bg-surface-dim border border-outline-variant rounded-lg">
                <div className="flex flex-col gap-1 pr-4">
                  <span className="font-bold">User Anonymity Settings</span>
                  <span className="text-xs text-on-surface-variant">Replaces clinical staff names with Abstracted IDs (e.g., Clinical-Alpha-09) in audit logs.</span>
                </div>
                {/* Custom Toggle (Mock) */}
                <div className="relative w-12 h-6 bg-primary rounded-full cursor-pointer flex items-center px-1 shrink-0">
                  <div className="w-4 h-4 bg-white rounded-full translate-x-6 transition-transform"></div>
                </div>
              </div>

              {/* Protocols */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-surface-dim border border-outline-variant rounded-lg flex flex-col gap-3">
                  <div className="flex items-center gap-2 text-primary">
                    <ShieldCheck size={16} />
                    <span className="text-[10px] font-bold uppercase tracking-wider">PHR Redaction</span>
                  </div>
                  <p className="text-xs text-on-surface-variant flex-1">Auto-scrub Patient Health Records of PII during collaborative case reviews.</p>
                  <button className="text-left text-xs font-bold text-primary tracking-widest uppercase hover:underline mt-2">Configure Patterns</button>
                </div>
                
                <div className="p-4 bg-surface-dim border border-outline-variant rounded-lg flex flex-col gap-3">
                  <div className="flex items-center gap-2 text-primary">
                    <ShieldCheck size={16} />
                    <span className="text-[10px] font-bold uppercase tracking-wider">Data Localization</span>
                  </div>
                  <p className="text-xs text-on-surface-variant flex-1">Ensures all diagnostic data remains within regional clinical firewalls.</p>
                  <div className="text-xs font-mono text-on-surface flex items-center gap-2 mt-2">
                    <span className="w-2 h-2 rounded-full bg-primary"></span>
                    ACTIVE: REGION-KE-01
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Clinical Env */}
          <div className="obsidian-card rounded-xl overflow-hidden">
            <div className="p-6 border-b border-outline-variant bg-surface-container-high flex items-center gap-3">
              <MonitorSmartphone className="text-primary" size={24} />
              <h3 className="text-xl font-bold">Clinical Environment</h3>
            </div>
            <div className="p-6 bg-surface-container-low grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                
                <div className="flex items-center justify-between p-4 bg-surface-dim border border-outline-variant rounded-lg">
                  <div className="flex flex-col pr-4">
                    <span className="font-bold text-sm">Force Dark Mode</span>
                    <span className="text-[11px] text-on-surface-variant italic">Required for Night Shifts</span>
                  </div>
                  <div className="relative w-10 h-5 bg-primary/50 rounded-full cursor-not-allowed flex items-center px-1 opacity-50 shrink-0">
                    <div className="w-3 h-3 bg-white rounded-full translate-x-5"></div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-surface-dim border border-outline-variant rounded-lg">
                  <div className="flex flex-col pr-4">
                    <span className="font-bold text-sm">Haptic Critical Alerts</span>
                    <span className="text-[11px] text-on-surface-variant">Wrist-vibration for Vitals drop</span>
                  </div>
                  <div className="relative w-10 h-5 bg-primary rounded-full cursor-pointer flex items-center px-1 shrink-0">
                    <div className="w-3 h-3 bg-white rounded-full translate-x-5 transition-transform"></div>
                  </div>
                </div>

              </div>
              <div className="space-y-4">
                <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Diagnostic Interface Theme</span>
                <div className="grid grid-cols-2 gap-3">
                  <button className="p-3 bg-surface-dim border-2 border-primary rounded-lg flex flex-col items-center gap-2">
                    <div className="w-full h-12 bg-[#131315] rounded border border-outline-variant p-1 flex flex-col gap-1">
                      <div className="w-full h-1 bg-primary/40 rounded"></div>
                      <div className="w-2/3 h-1 bg-outline-variant rounded"></div>
                    </div>
                    <span className="text-[10px] font-bold">Obsidian (Active)</span>
                  </button>
                  <button className="p-3 bg-surface-dim border border-outline-variant rounded-lg flex flex-col items-center gap-2 opacity-50 hover:opacity-100">
                    <div className="w-full h-12 bg-gray-200 rounded border border-gray-300 p-1 flex flex-col gap-1">
                      <div className="w-full h-1 bg-blue-400/40 rounded"></div>
                      <div className="w-2/3 h-1 bg-gray-300 rounded"></div>
                    </div>
                    <span className="text-[10px] font-bold text-on-surface-variant">Light Mode</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* AI + Regional */}
        <div className="md:col-span-4 flex flex-col gap-6">
          {/* AI Guardrails */}
          <div className="obsidian-card rounded-xl overflow-hidden flex flex-col h-full">
            <div className="p-6 border-b border-outline-variant bg-surface-container-high flex items-center gap-3">
              <Sparkles className="text-primary" size={24} />
              <h3 className="text-xl font-bold">AI Guardrails</h3>
            </div>
            
            <div className="p-6 bg-surface-container-low flex-1 space-y-6">
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold">Auto-fill Confirmation</span>
                  <div className="relative w-10 h-5 bg-primary rounded-full cursor-pointer flex items-center px-1 shrink-0">
                    <div className="w-3 h-3 bg-white rounded-full translate-x-5 transition-transform"></div>
                  </div>
                </div>
                <p className="text-[11px] text-on-surface-variant line-clamp-2">Requires manual clinician approval for every AI-generated medication dosage suggestion.</p>
              </div>

              <div className="space-y-3">
                <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Intelligence Level</span>
                <input type="range" min="0" max="100" defaultValue="75" className="w-full h-1 bg-surface-variant rounded-lg appearance-none cursor-pointer accent-primary" />
                <div className="flex justify-between text-[10px] font-bold text-on-surface-variant">
                  <span>Conservative</span>
                  <span className="text-primary">Predictive (75%)</span>
                  <span>Generative</span>
                </div>
              </div>

              <div className="p-4 bg-error-container/10 border border-error-container/30 rounded-lg">
                <div className="flex items-center gap-2 text-error mb-2">
                  <Bell size={14} />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Safety Override</span>
                </div>
                <p className="text-[11px] text-on-surface-variant leading-relaxed">Emergency AI bypass is currently <span className="text-error font-bold">DISABLED</span> by hospital admin.</p>
              </div>
            </div>
          </div>

          {/* Regional Lock */}
          <div className="obsidian-card rounded-xl overflow-hidden">
            <div className="p-6 border-b border-outline-variant bg-surface-container-high flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Globe2 className="text-primary" size={24} />
                <h3 className="text-xl font-bold">Regional Lock</h3>
              </div>
              <LockIcon size={20} className="text-on-surface-variant" />
            </div>
            
            <div className="p-6 bg-surface-container-low space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-surface-dim border border-outline-variant rounded-lg flex items-center justify-center">
                  <PillIcon size={24} className="text-primary" />
                </div>
                <div>
                  <div className="font-bold">Kenya Drug Index</div>
                  <div className="text-[10px] font-bold text-primary tracking-widest">STATUS: ACTIVE & SYNCED</div>
                </div>
              </div>
              <p className="text-xs text-on-surface-variant">Validated against the Pharmacy and Poisons Board (PPB) guidelines.</p>
              <div className="text-xs flex flex-col gap-2 pt-2 border-t border-outline-variant mt-4">
                <div className="flex justify-between">
                  <span className="text-on-surface-variant font-bold">Last Sync</span>
                  <span className="text-on-surface font-mono">2023-10-27 04:00 UTC</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

function LockIcon({ size, className }: { size: number, className: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
      <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
    </svg>
  );
}

function PillIcon({ size, className }: { size: number, className: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M10.5 20.5 19 12M14 6.5l4 4"></path>
      <path d="M5.5 17.5 12 11M3.5 10.5l4 4"></path>
      <path d="M7 17l10-10a2.828 2.828 0 0 0-4-4L3 13a2.828 2.828 0 0 0 4 4z"></path>
    </svg>
  );
}

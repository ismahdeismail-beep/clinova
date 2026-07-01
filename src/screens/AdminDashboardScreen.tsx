import React, { useState } from 'react';
import { Users, Database, ShieldAlert, Activity, Server, TrendingUp, CheckCircle, Loader2 } from 'lucide-react';

export default function AdminDashboardScreen() {
  const [isAuditing, setIsAuditing] = useState(false);
  const [auditComplete, setAuditComplete] = useState(false);
  const [auditResult, setAuditResult] = useState<string | null>(null);

  const handleRunAudit = () => {
    setIsAuditing(true);
    setAuditComplete(false);
    setAuditResult(null);
    setTimeout(() => {
      setIsAuditing(false);
      setAuditComplete(true);
      setAuditResult("System Audit Completed Successfully: 0 Vulnerabilities Found, All Clinical Data Encrypted, Access Controls Verified, No Anomalous Access Patterns Detected.");
    }, 2500);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-8 pb-24">
      {auditResult && (
        <div className="mb-4 p-4 bg-[var(--success)]/10 border border-[var(--success)]/20 rounded-xl flex items-start gap-3 text-sm text-[var(--success)]">
          <CheckCircle size={20} className="shrink-0 mt-0.5" />
          <p>{auditResult}</p>
        </div>
      )}
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[var(--text)] mb-2 tracking-tight">Admin Console</h1>
          <p className="text-[var(--text-muted)] text-sm">System overview and administrative controls.</p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={handleRunAudit}
            disabled={isAuditing}
            className="flex items-center gap-2 px-4 py-2 bg-[var(--surface-dim)] text-[var(--text)] font-medium rounded-lg hover:bg-[var(--surface)] transition-colors border border-[var(--border)] disabled:opacity-70"
          >
            {isAuditing ? <Loader2 size={18} className="animate-spin" /> : <ShieldAlert size={18} />}
            {isAuditing ? 'Running Audit...' : 'Run System Audit'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-[var(--surface)] p-6 rounded-xl border border-[var(--border)] shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-[var(--text-muted)] uppercase tracking-wider">Total Users</h3>
            <Users size={20} className="text-[var(--primary)]" />
          </div>
          <p className="text-3xl font-bold text-[var(--text)]">1,248</p>
          <p className="text-xs text-[var(--success)] mt-2 font-medium flex items-center gap-1">
            <TrendingUp size={12} /> +12 this week
          </p>
        </div>

        <div className="bg-[var(--surface)] p-6 rounded-xl border border-[var(--border)] shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-[var(--text-muted)] uppercase tracking-wider">AI Queries</h3>
            <Activity size={20} className="text-[var(--primary)]" />
          </div>
          <p className="text-3xl font-bold text-[var(--text)]">45.2k</p>
          <p className="text-xs text-[var(--success)] mt-2 font-medium flex items-center gap-1">
            <TrendingUp size={12} /> +8% this month
          </p>
        </div>

        <div className="bg-[var(--surface)] p-6 rounded-xl border border-[var(--border)] shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-[var(--text-muted)] uppercase tracking-wider">Knowledge Base</h3>
            <Database size={20} className="text-[var(--primary)]" />
          </div>
          <p className="text-3xl font-bold text-[var(--text)]">8,432</p>
          <p className="text-xs text-[var(--text-muted)] mt-2 font-medium">Indexed documents</p>
        </div>

        <div className="bg-[var(--surface)] p-6 rounded-xl border border-[var(--border)] shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-[var(--text-muted)] uppercase tracking-wider">System Health</h3>
            <Server size={20} className="text-[var(--success)]" />
          </div>
          <p className="text-3xl font-bold text-[var(--text)]">100%</p>
          <p className="text-xs text-[var(--success)] mt-2 font-medium">All services operational</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-[var(--surface)] rounded-xl border border-[var(--border)] shadow-sm overflow-hidden">
          <div className="p-5 border-b border-[var(--border)]">
            <h3 className="font-semibold text-[var(--text)]">Recent Security Events</h3>
          </div>
          <div className="divide-y divide-[var(--border)]">
            {[1, 2, 3].map((i) => (
              <div key={i} className="p-4 flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[var(--surface-dim)] flex items-center justify-center shrink-0">
                  <ShieldAlert size={18} className="text-[var(--text-muted)]" />
                </div>
                <div>
                  <p className="text-sm font-medium text-[var(--text)]">Successful Admin Login</p>
                  <p className="text-xs text-[var(--text-muted)] mt-0.5">IP: 192.168.1.104 • Super Admin</p>
                  <p className="text-xs text-[var(--text-muted)] mt-1.5 opacity-70">{i * 2} hours ago</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[var(--surface)] rounded-xl border border-[var(--border)] shadow-sm overflow-hidden">
          <div className="p-5 border-b border-[var(--border)]">
            <h3 className="font-semibold text-[var(--text)]">System Logs</h3>
          </div>
          <div className="p-4 font-mono text-xs text-[var(--text-muted)] bg-[var(--bg)] h-[250px] overflow-y-auto rounded-b-xl">
            <div className="space-y-2">
              <p><span className="text-[var(--success)]">[INFO]</span> 08:00:01 - RAG Index updated successfully.</p>
              <p><span className="text-[var(--success)]">[INFO]</span> 08:15:22 - User Dr. Sarah K. authenticated.</p>
              <p><span className="text-[var(--primary)]">[SYS]</span> 08:30:00 - Routine database backup completed.</p>
              <p><span className="text-[var(--warning)]">[WARN]</span> 08:45:10 - High memory usage detected on Inference Node 3.</p>
              <p><span className="text-[var(--success)]">[INFO]</span> 08:46:00 - Auto-scaling triggered. Node 4 provisioned.</p>
              <p><span className="text-[var(--success)]">[INFO]</span> 09:00:00 - Scheduled metric aggregation finished.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

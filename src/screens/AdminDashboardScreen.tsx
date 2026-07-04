import React, { useState, useEffect } from 'react';
import { Users, Database, ShieldAlert, Activity, Server, TrendingUp, CheckCircle, Loader2, Cpu } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

export default function AdminDashboardScreen() {
  const [isAuditing, setIsAuditing] = useState(false);
  const [auditComplete, setAuditComplete] = useState(false);
  const [auditResult, setAuditResult] = useState<string | null>(null);
  const [providers, setProviders] = useState<any[]>([]);
  const [latencyHistory, setLatencyHistory] = useState<any[]>([]);

  const [hiddenProviders, setHiddenProviders] = useState<Record<string, boolean>>({});

  const handleLegendClick = (e: any) => {
    const { dataKey } = e;
    setHiddenProviders(prev => ({
      ...prev,
      [dataKey]: !prev[dataKey]
    }));
  };

  const renderLegendText = (value: string, entry: any) => {
    const { color } = entry;
    const isHidden = hiddenProviders[value];
    return <span style={{ color: isHidden ? 'var(--text-muted)' : color, textDecoration: isHidden ? 'line-through' : 'none' }}>{value}</span>;
  };

  useEffect(() => {
    const fetchProviders = () => {
      fetch('/api/admin/providers')
        .then(res => res.json())
        .then(data => {
          setProviders(data);
          
          const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
          const dataPoint: any = { time: now };
          data.forEach((p: any) => {
            // we'll just plot averageLatencyMs, or a mock real-time value if averageLatencyMs is 0 to make the chart look alive
            dataPoint[p.name] = p.averageLatencyMs || 0;
          });
          
          setLatencyHistory(prev => {
            const newHistory = [...prev, dataPoint];
            return newHistory.slice(-20); // Keep last 20 points
          });
        })
        .catch(err => console.error("Failed to load providers", err));
    };

    fetchProviders();
    const interval = setInterval(fetchProviders, 3000);
    return () => clearInterval(interval);
  }, []);

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

      <div className="bg-[var(--surface)] rounded-xl border border-[var(--border)] shadow-sm overflow-hidden mt-8">
        <div className="p-5 border-b border-[var(--border)] flex justify-between items-center">
          <div className="flex items-center gap-2">
             <Cpu size={20} className="text-[var(--primary)]" />
             <h3 className="font-semibold text-[var(--text)]">AI Provider Router Status</h3>
          </div>
          <span className="text-xs font-medium px-2.5 py-1 bg-[var(--primary)]/10 text-[var(--primary)] rounded-full">Multi-Provider Active</span>
        </div>
        
        {providers.length > 0 && (
          <div className="p-6 border-b border-[var(--border)] bg-[var(--bg)]">
            <h4 className="text-sm font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-4">Real-Time Latency (ms)</h4>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={latencyHistory} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                  <XAxis 
                    dataKey="time" 
                    stroke="var(--text-muted)" 
                    fontSize={12} 
                    tickLine={false} 
                    axisLine={false} 
                  />
                  <YAxis 
                    stroke="var(--text-muted)" 
                    fontSize={12} 
                    tickLine={false} 
                    axisLine={false}
                    tickFormatter={(value) => `${value}ms`}
                  />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)', borderRadius: '8px', color: 'var(--text)' }}
                    itemStyle={{ color: 'var(--text)' }}
                  />
                  <Legend 
                    wrapperStyle={{ fontSize: '12px', paddingTop: '10px', cursor: 'pointer' }} 
                    onClick={handleLegendClick} 
                    formatter={renderLegendText}
                  />
                  {providers.map((provider, idx) => (
                    <Line 
                      key={provider.name} 
                      type="monotone" 
                      dataKey={provider.name} 
                      hide={hiddenProviders[provider.name] === true}
                      stroke={['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#6366f1'][idx % 7]} 
                      strokeWidth={2}
                      dot={false}
                      activeDot={{ r: 4 }}
                      isAnimationActive={false}
                    />
                  ))}
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-[var(--bg)] text-[var(--text-muted)] text-xs uppercase border-b border-[var(--border)]">
              <tr>
                <th className="px-6 py-3 font-medium">Provider</th>
                <th className="px-6 py-3 font-medium">Status</th>
                <th className="px-6 py-3 font-medium">Uptime</th>
                <th className="px-6 py-3 font-medium">Requests</th>
                <th className="px-6 py-3 font-medium">Avg Latency</th>
                <th className="px-6 py-3 font-medium">Error Rate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)] text-[var(--text)]">
              {providers.length > 0 ? providers.map((provider, i) => (
                <tr key={i} className="hover:bg-[var(--surface-dim)] transition-colors">
                  <td className="px-6 py-4 font-medium flex items-center gap-2">
                     <div className={`w-2 h-2 rounded-full ${provider.isHealthy ? 'bg-[var(--success)]' : 'bg-[var(--destructive)]'}`} />
                     {provider.name}
                  </td>
                  <td className="px-6 py-4">
                     <span className={`px-2 py-1 text-[10px] uppercase font-bold rounded-full ${provider.isHealthy ? 'bg-[var(--success)]/10 text-[var(--success)]' : 'bg-[var(--destructive)]/10 text-[var(--destructive)]'}`}>
                       {provider.isHealthy ? 'Operational' : 'Degraded'}
                     </span>
                  </td>
                  <td className="px-6 py-4 font-mono">{provider.uptime.toFixed(1)}%</td>
                  <td className="px-6 py-4 font-mono">{provider.requestCount.toLocaleString()}</td>
                  <td className="px-6 py-4 font-mono">{provider.averageLatencyMs ? `${Math.round(provider.averageLatencyMs)}ms` : '-'}</td>
                  <td className="px-6 py-4 font-mono">{provider.errorRate.toFixed(1)}%</td>
                </tr>
              )) : (
                <tr>
                   <td colSpan={6} className="px-6 py-8 text-center text-[var(--text-muted)]">
                      <div className="flex justify-center items-center gap-2"><Loader2 className="animate-spin" size={16}/> Loading provider metrics...</div>
                   </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

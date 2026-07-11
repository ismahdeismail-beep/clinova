import React, { useState, useEffect } from 'react';
import { 
  Cpu, Server, Activity, ShieldCheck, Zap, AlertCircle, RefreshCw, 
  Settings, Key, Layers, Code, Play, RefreshCw as LoopIcon, Check, 
  HelpCircle, Trash, Sparkles, TrendingUp, DollarSign, Terminal, 
  FileText, CheckCircle2, AlertTriangle, BookOpen, Clock, ShieldAlert
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';

interface Provider {
  id: string;
  name: string;
  isHealthy: boolean;
  requestCount: number;
  successCount: number;
  errorCount: number;
  totalLatency: number;
  averageLatencyMs: number;
  errorRate: number;
  uptime: number;
  priority: number;
  weight: number;
  costInputPer1M: number;
  costOutputPer1M: number;
  tokenCountInput: number;
  tokenCountOutput: number;
  estimatedCost: number;
  latencyHistory: number[];
  apiKeyMasked: string;
  status: 'active' | 'inactive';
}

interface PromptTemplate {
  id: string;
  name: string;
  description: string;
  template: string;
  placeholders: string[];
  category: 'Education' | 'Clinical' | 'Synthesis';
}

interface LogEntry {
  id: string;
  timestamp: string;
  feature: string;
  prompt: string;
  provider: string;
  latencyMs: number;
  status: 'success' | 'failed';
  error?: string;
  fallbackChain: string[];
  tokensInput: number;
  tokensOutput: number;
  cost: number;
}

export default function AiOrchestrationScreen() {
  const [providers, setProviders] = useState<Provider[]>([]);
  const [loadBalancing, setLoadBalancing] = useState<string>('Priority');
  const [globalOverride, setGlobalOverride] = useState<string | null>(null);
  
  // Prompts states
  const [prompts, setPrompts] = useState<PromptTemplate[]>([]);
  const [selectedPromptId, setSelectedPromptId] = useState<string>('aiTutor');
  const [editedPromptTemplate, setEditedPromptTemplate] = useState<string>('');
  
  // Gateway logs states
  const [logs, setLogs] = useState<LogEntry[]>([]);
  
  // Live testing states
  const [testPrompt, setTestPrompt] = useState<string>('What is the mechanism of action of metformin?');
  const [testProvider, setTestProvider] = useState<string>('auto'); // auto or specific
  const [testFeature, setTestFeature] = useState<string>('Interactive Study Tutor');
  const [isTesting, setIsTesting] = useState<boolean>(false);
  const [testResult, setTestResult] = useState<{ text: string; logs: LogEntry[] } | null>(null);
  const [testError, setTestError] = useState<string | null>(null);

  // Sub-tabs
  const [activeTab, setActiveTab] = useState<'registry' | 'routing' | 'prompts' | 'testing' | 'logs'>('registry');

  // Loading indicator
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Fetch all state
  const fetchData = async () => {
    try {
      setIsLoading(true);
      
      // 1. Fetch providers
      const provRes = await fetch('/api/admin/providers');
      if (!provRes.ok) throw new Error('Failed to fetch provider status');
      const provData = await provRes.json();
      setProviders(provData.providers || []);
      setLoadBalancing(provData.loadBalancingMode || 'Priority');
      setGlobalOverride(provData.globalProviderOverride || null);

      // 2. Fetch prompts
      const promptsRes = await fetch('/api/admin/ai/prompts');
      if (promptsRes.ok) {
        const promptsData = await promptsRes.json();
        setPrompts(promptsData);
        const current = promptsData.find((p: any) => p.id === selectedPromptId);
        if (current) {
          setEditedPromptTemplate(current.template);
        }
      }

      // 3. Fetch logs
      const logsRes = await fetch('/api/admin/ai/logs');
      if (logsRes.ok) {
        const logsData = await logsRes.json();
        setLogs(logsData);
      }

      setErrorMessage(null);
    } catch (err: any) {
      console.error('Error loading AI orchestration settings:', err);
      setErrorMessage(err.message || 'Could not reach the backend server. Please verify it is running.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // Poll logs and metrics every 6 seconds to keep stats real-time
    const interval = setInterval(() => {
      fetchData();
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  // Sync edited text on prompt selection change
  useEffect(() => {
    const p = prompts.find(item => item.id === selectedPromptId);
    if (p) {
      setEditedPromptTemplate(p.template);
    }
  }, [selectedPromptId, prompts]);

  // Update Global configuration (Load balancer mode / Provider override)
  const handleUpdateConfig = async (newOverride: string | null, newMode?: string) => {
    try {
      const payload = {
        globalProviderOverride: newOverride,
        loadBalancingMode: newMode || loadBalancing
      };
      
      const res = await fetch('/api/admin/config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      
      if (!res.ok) throw new Error('Failed to save config override');
      const data = await res.json();
      setGlobalOverride(data.globalProviderOverride);
      setLoadBalancing(data.loadBalancingMode);
    } catch (err: any) {
      alert('Error updating config: ' + err.message);
    }
  };

  // Toggle healthy/outage simulation
  const handleToggleHealthy = async (providerName: string) => {
    try {
      const res = await fetch('/api/admin/providers/toggle-healthy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ providerName })
      });
      if (!res.ok) throw new Error('Failed to toggle provider health');
      fetchData();
    } catch (err: any) {
      alert('Error: ' + err.message);
    }
  };

  // Edit provider config parameters (Priority / Weight / Status / API Key)
  const handleUpdateProvider = async (providerName: string, fields: Partial<Provider>) => {
    try {
      const res = await fetch('/api/admin/providers/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          providerName,
          ...fields
        })
      });
      if (!res.ok) throw new Error('Failed to update provider parameters');
      fetchData();
    } catch (err: any) {
      alert('Error saving provider parameters: ' + err.message);
    }
  };

  // Save updated prompt template
  const handleSavePrompt = async () => {
    try {
      const res = await fetch('/api/admin/ai/prompts/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: selectedPromptId,
          template: editedPromptTemplate
        })
      });
      if (!res.ok) throw new Error('Failed to update prompt template');
      alert('Template successfully synchronized across all active gateway tasks!');
      fetchData();
    } catch (err: any) {
      alert('Error: ' + err.message);
    }
  };

  // Reset prompts to default
  const handleResetPrompts = async () => {
    if (confirm('Are you sure you want to reset all templates to Clinova factory defaults?')) {
      try {
        const res = await fetch('/api/admin/ai/prompts/reset', {
          method: 'POST'
        });
        if (!res.ok) throw new Error('Failed to reset prompts');
        alert('All templates reverted to initial default structures.');
        fetchData();
      } catch (err: any) {
        alert('Error resetting templates: ' + err.message);
      }
    }
  };

  // Execute Live API test
  const handleLiveTest = async () => {
    setIsTesting(true);
    setTestResult(null);
    setTestError(null);
    try {
      const res = await fetch('/api/admin/ai/gateway/test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: testPrompt,
          provider: testProvider === 'auto' ? undefined : testProvider,
          feature: testFeature
        })
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Server error during live execution');
      }
      const data = await res.json();
      setTestResult({
        text: data.text,
        logs: data.logs
      });
      fetchData(); // refresh parent logs & history
    } catch (err: any) {
      setTestError(err.message || 'Execution failed');
    } finally {
      setIsTesting(false);
    }
  };

  // Aggregated analytics metrics
  const totalQueries = providers.reduce((sum, p) => sum + p.requestCount, 0);
  const totalSuccess = providers.reduce((sum, p) => sum + p.successCount, 0);
  const totalError = providers.reduce((sum, p) => sum + p.errorCount, 0);
  const totalTokens = providers.reduce((sum, p) => sum + p.tokenCountInput + p.tokenCountOutput, 0);
  const totalCost = providers.reduce((sum, p) => sum + p.estimatedCost, 0);
  const averageLatency = totalSuccess > 0 
    ? Math.round(providers.reduce((sum, p) => sum + (p.averageLatencyMs * p.successCount), 0) / totalSuccess)
    : 0;
  const failureRate = totalQueries > 0 ? Math.round((totalError / totalQueries) * 100) : 0;

  // Visual chart metrics
  const providerDataForChart = providers.map(p => ({
    name: p.name.replace(' AI', '').replace(' Gemini', ''),
    Requests: p.requestCount,
    Latency: p.averageLatencyMs || 0,
    Cost: parseFloat(p.estimatedCost.toFixed(4)),
    Uptime: p.uptime
  }));

  const latencyHistoryForChart = logs.slice(0, 15).reverse().map((log, index) => ({
    index: index + 1,
    latency: log.latencyMs,
    provider: log.provider,
    cost: log.cost * 1000 // cost per 1k requests representation
  }));

  return (
    <div id="ai-orchestration-root" className="flex-1 bg-[var(--bg)] min-h-screen pb-12 selection:bg-[var(--primary)] selection:text-[var(--primary-foreground)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        
        {/* Header Block */}
        <div id="ai-orchestration-header" className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[var(--primary)] mb-2">
              <Cpu size={16} /> Clinova Gateway Engine
            </div>
            <h1 className="text-3xl font-extrabold text-[var(--text)] tracking-tight">
              Service Gateway
            </h1>
            <p className="text-sm text-[var(--text-muted)] mt-2">
              Fault-tolerant, multi-provider router that intelligently balances and distributes queries across connected services.
            </p>
          </div>
          <div className="flex gap-3 shrink-0">
            <button 
              onClick={fetchData}
              className="px-4 py-2 bg-[var(--surface)] border border-[var(--border)] rounded-xl text-sm font-semibold flex items-center gap-2 hover:bg-[var(--surface-dim)] text-[var(--text)] transition-colors active:scale-95"
            >
              <RefreshCw size={16} /> Sync Telemetry
            </button>
          </div>
        </div>

        {/* Global Warning if server fails */}
        {errorMessage && (
          <div id="gateway-err-banner" className="p-4 bg-amber-500/15 border border-amber-500/30 rounded-2xl flex items-start gap-3">
            <AlertCircle className="text-amber-500 shrink-0 mt-0.5" size={18} />
            <div>
              <p className="text-sm font-bold text-amber-500">Connection Error</p>
              <p className="text-xs text-[var(--text-muted)] mt-1">{errorMessage}</p>
            </div>
          </div>
        )}

        {/* Real-time Enterprise Stats cards */}
        <div id="telemetry-summary-row" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Total Requests', val: totalQueries, sub: `${totalSuccess} successful, ${totalError} failed`, icon: Server, color: 'text-[var(--primary)]', bg: 'bg-[var(--primary)]/10' },
            { label: 'Average Gateway Latency', val: `${averageLatency}ms`, sub: 'Across healthy nodes', icon: Zap, color: 'text-amber-500', bg: 'bg-amber-500/10' },
            { label: 'Estimated Budget Spend', val: `$${totalCost.toFixed(5)}`, sub: `${(totalTokens / 1000).toFixed(1)}k units processed`, icon: DollarSign, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
            { label: 'Global Failure Rate', val: `${failureRate}%`, sub: failureRate > 10 ? 'High Failures: Failover triggered' : 'Within normal SLA limits', icon: Activity, color: failureRate > 10 ? 'text-red-500' : 'text-emerald-500', bg: failureRate > 10 ? 'bg-red-500/10' : 'bg-emerald-500/10' }
          ].map((stat, i) => (
            <div key={i} className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-6 flex items-start justify-between">
              <div className="space-y-2">
                <span className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider">{stat.label}</span>
                <div className="text-3xl font-black text-[var(--text)]">{stat.val}</div>
                <p className="text-xs text-[var(--text-muted)]">{stat.sub}</p>
              </div>
              <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
                <stat.icon size={20} />
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Tabs */}
        <div id="admin-subtabs" className="flex overflow-x-auto border-b border-[var(--border)] no-scrollbar gap-2 pb-2">
          {[
            { id: 'registry', label: 'Provider Registry', icon: Server },
            { id: 'routing', label: 'Intelligent Routing', icon: Layers },
            { id: 'prompts', label: 'System Templates', icon: FileText },
            { id: 'testing', label: 'Live Gateway Test', icon: Play },
            { id: 'logs', label: 'Gateway Audit Trail', icon: Terminal },
          ].map(t => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id as any)}
              className={`px-4 py-2.5 text-sm font-semibold rounded-xl flex items-center gap-2 transition-all whitespace-nowrap cursor-pointer ${
                activeTab === t.id 
                  ? 'bg-[var(--primary)] text-[var(--primary-foreground)] shadow-md'
                  : 'text-[var(--text-muted)] hover:bg-[var(--surface-dim)] hover:text-[var(--text)]'
              }`}
            >
              <t.icon size={16} />
              {t.label}
            </button>
          ))}
        </div>

        {/* Tab content: Provider Registry */}
        {activeTab === 'registry' && (
          <div id="registry-tab" className="space-y-6 animate-in fade-in duration-200">
            <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl overflow-hidden">
              <div className="p-6 border-b border-[var(--border)] bg-[var(--surface-dim)]/50 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h3 className="font-extrabold text-[var(--text)] text-lg">Provider Registry</h3>
                  <p className="text-xs text-[var(--text-muted)] mt-1">Configure weights, priorities, health diagnostics, and simulate service outages.</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-[var(--text-muted)] uppercase">Status:</span>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-500 text-xs font-bold flex items-center gap-1 border border-emerald-500/20">
                     <CheckCircle2 size={12} /> 9 Providers Registered
                  </span>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm border-collapse">
                  <thead className="bg-[var(--surface-dim)] text-[var(--text-muted)] text-xs uppercase font-bold tracking-wider">
                    <tr>
                      <th className="px-6 py-4 border-b border-[var(--border)]">Provider Name & ID</th>
                      <th className="px-6 py-4 border-b border-[var(--border)]">Status & Health</th>
                      <th className="px-6 py-4 border-b border-[var(--border)]">Priority</th>
                      <th className="px-6 py-4 border-b border-[var(--border)]">Load Weight</th>
                      <th className="px-6 py-4 border-b border-[var(--border)]">Uptime %</th>
                      <th className="px-6 py-4 border-b border-[var(--border)]">Avg Latency</th>
                      <th className="px-6 py-4 border-b border-[var(--border)]">Access Key</th>
                      <th className="px-6 py-4 border-b border-[var(--border)] text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[var(--border)]">
                    {providers.map((p) => (
                      <tr key={p.name} className={`hover:bg-[var(--surface-dim)]/40 transition-colors ${p.status === 'inactive' ? 'opacity-50' : ''}`}>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2.5">
                            <div className="p-2 bg-[var(--bg)] border border-[var(--border)] rounded-xl text-[var(--primary)]">
                              <Cpu size={16} />
                            </div>
                            <div>
                              <div className="font-extrabold text-[var(--text)] flex items-center gap-1.5">
                                {p.name}
                                {p.id === 'google' && <span className="text-[10px] bg-indigo-500/10 text-indigo-500 px-1.5 py-0.5 rounded-md font-bold uppercase">Main</span>}
                              </div>
                              <span className="text-xs font-mono text-[var(--text-muted)]">{p.id}</span>
                            </div>
                          </div>
                        </td>
                        
                        <td className="px-6 py-4">
                          <div className="space-y-1.5">
                            {p.status === 'inactive' ? (
                              <span className="px-2 py-0.5 rounded-full bg-[var(--border)] text-[var(--text-muted)] text-xs font-bold">
                                Disabled
                              </span>
                            ) : p.isHealthy ? (
                              <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 text-xs font-bold inline-flex items-center gap-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span> Healthy
                              </span>
                            ) : (
                              <span className="px-2 py-0.5 rounded-full bg-red-500/10 text-red-500 text-xs font-bold inline-flex items-center gap-1 border border-red-500/20">
                                <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span> Outage Simulated
                              </span>
                            )}
                            <div className="text-[10px] text-[var(--text-muted)] font-medium">
                              Input: ${p.costInputPer1M}/1M | Output: ${p.costOutputPer1M}/1M
                            </div>
                          </div>
                        </td>

                        <td className="px-6 py-4">
                          <select 
                            value={p.priority}
                            onChange={(e) => handleUpdateProvider(p.name, { priority: parseInt(e.target.value) })}
                            className="bg-[var(--bg)] text-[var(--text)] border border-[var(--border)] px-2 py-1 rounded-lg text-xs font-bold outline-none focus:ring-1 focus:ring-[var(--primary)]"
                          >
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
                              <option key={num} value={num}>Priority {num}</option>
                            ))}
                          </select>
                        </td>

                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <input 
                              type="range" 
                              min="0" 
                              max="100" 
                              value={p.weight}
                              onChange={(e) => handleUpdateProvider(p.name, { weight: parseInt(e.target.value) })}
                              className="w-16 accent-[var(--primary)]"
                            />
                            <span className="text-xs font-mono font-bold text-[var(--text)]">{p.weight}%</span>
                          </div>
                        </td>

                        <td className="px-6 py-4">
                          <div className="space-y-1">
                            <div className="text-xs font-bold text-[var(--text)]">{p.uptime}%</div>
                            <div className="text-[10px] text-[var(--text-muted)] font-semibold">{p.successCount}/{p.requestCount} OK</div>
                          </div>
                        </td>

                        <td className="px-6 py-4">
                          <span className="font-mono text-xs font-bold text-[var(--text)]">
                            {p.averageLatencyMs > 0 ? `${p.averageLatencyMs}ms` : '—'}
                          </span>
                        </td>

                        <td className="px-6 py-4">
                          <div className="flex items-center gap-1">
                            <Key size={12} className="text-[var(--text-muted)] shrink-0" />
                            <input 
                              type="password" 
                              placeholder="••••••••••••"
                              value={p.apiKeyMasked}
                              onChange={(e) => handleUpdateProvider(p.name, { apiKeyMasked: e.target.value })}
                              className="w-20 bg-[var(--bg)] text-[var(--text)] text-xs border border-[var(--border)] px-1.5 py-0.5 rounded-lg outline-none"
                            />
                          </div>
                        </td>

                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => handleToggleHealthy(p.name)}
                              className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                                p.isHealthy 
                                  ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20 hover:bg-amber-500/20' 
                                  : 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 hover:bg-emerald-500/20'
                              }`}
                              title={p.isHealthy ? 'Simulate Outage on this Provider' : 'Restore health of this Provider'}
                            >
                              {p.isHealthy ? 'Simulate Outage' : 'Heal Outage'}
                            </button>
                            <button
                              onClick={() => handleUpdateProvider(p.name, { status: p.status === 'active' ? 'inactive' : 'active' })}
                              className={`p-1 text-xs font-bold rounded-lg cursor-pointer ${
                                p.status === 'active' ? 'text-red-500 hover:bg-red-500/10' : 'text-[var(--primary)] hover:bg-[var(--primary)]/10'
                              }`}
                              title={p.status === 'active' ? 'Disable Provider' : 'Enable Provider'}
                            >
                              {p.status === 'active' ? 'Disable' : 'Enable'}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Tab content: Intelligent Routing Configuration */}
        {activeTab === 'routing' && (
          <div id="routing-tab" className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-in fade-in duration-200">
            
            {/* Controls panel */}
            <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-6 space-y-6 lg:col-span-1">
              <div>
                <h3 className="font-extrabold text-[var(--text)] text-lg flex items-center gap-2">
                  <Layers size={18} className="text-[var(--primary)]" />
                  Gateway Algorithm
                </h3>
                <p className="text-xs text-[var(--text-muted)] mt-1">Determine how requests are routed to healthy providers.</p>
              </div>

              {/* Mode Selectors */}
              <div className="space-y-2">
                {[
                  { mode: 'Priority', desc: 'SLA Fallback (Cascade)', details: 'Routes sequentially to the highest priority active provider (Priority 1 first). If failing, automatically cascading-fails over.' },
                  { mode: 'Weighted', desc: 'Load-Balanced Distribution', details: 'Distributes traffic probabilistically based on configured weight percentage. Excellent for multi-key configurations.' },
                  { mode: 'Latency', desc: 'Fastest Response First', details: 'Dynamically routes incoming requests to the provider displaying the lowest rolling average latency (ms).' },
                  { mode: 'Cost', desc: 'Budget Optimizer', details: 'Always routes to the cheapest healthy active provider based on input/output pricing metrics.' },
                  { mode: 'Health', desc: 'Uptime Maximizer', details: 'Routes to the provider possessing the highest uptime ratio, bypassing unreliable services completely.' },
                  { mode: 'RoundRobin', desc: 'Load Equalizer', details: 'Cycles evenly across healthy nodes based on request counters to prevent quota exhausts.' }
                ].map((item) => (
                  <label 
                    key={item.mode}
                    onClick={() => handleUpdateConfig(globalOverride, item.mode)}
                    className={`block border rounded-xl p-4 cursor-pointer transition-all hover:bg-[var(--surface-dim)]/50 ${
                      loadBalancing === item.mode 
                        ? 'border-[var(--primary)] bg-[var(--primary)]/5 shadow-sm'
                        : 'border-[var(--border)]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="font-extrabold text-sm text-[var(--text)]">{item.mode}</div>
                      <input 
                        type="radio" 
                        name="routingMode" 
                        checked={loadBalancing === item.mode}
                        onChange={() => {}}
                        className="w-4 h-4 accent-[var(--primary)]"
                      />
                    </div>
                    <span className="text-[11px] font-bold text-[var(--primary)] uppercase mt-1 block">{item.desc}</span>
                    <p className="text-[11px] text-[var(--text-muted)] mt-1">{item.details}</p>
                  </label>
                ))}
              </div>

              {/* Global Override Select */}
              <div className="border-t border-[var(--border)] pt-4 space-y-2">
                <label className="block text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider">Forced Global Override (Admin Block)</label>
                <select
                  value={globalOverride || 'none'}
                  onChange={(e) => handleUpdateConfig(e.target.value === 'none' ? null : e.target.value)}
                  className="w-full bg-[var(--bg)] text-[var(--text)] border border-[var(--border)] rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[var(--primary)]"
                >
                  <option value="none">Intelligent Gateway (Dynamic Router)</option>
                  {providers.map(p => (
                    <option key={p.name} value={p.name}>Force: {p.name}</option>
                  ))}
                </select>
                <p className="text-[10px] text-[var(--text-muted)] font-medium">Overrules the load-balancer to force all app features to use a single provider for diagnostic testing.</p>
              </div>
            </div>

            {/* Visualizer and Charts panel */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* Load Balancing Distribution Chart */}
              <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-6">
                <h3 className="font-extrabold text-[var(--text)] text-sm uppercase tracking-wider text-[var(--text-muted)] mb-4">
                  Provider Workload & Latency Distribution
                </h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={providerDataForChart} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <XAxis dataKey="name" tick={{ fontSize: 10, fill: 'var(--text-muted)' }} />
                      <YAxis tick={{ fontSize: 10, fill: 'var(--text-muted)' }} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)', borderRadius: '12px' }}
                        labelStyle={{ color: 'var(--text)', fontWeight: 'bold' }}
                      />
                      <Bar dataKey="Requests" name="Requests Run" radius={[4, 4, 0, 0]}>
                        {providerDataForChart.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={index === 0 ? 'var(--primary)' : 'rgba(var(--primary-rgb, 99, 102, 241), 0.5)'} />
                        ))}
                      </Bar>
                      <Bar dataKey="Latency" name="Average Latency (ms)" fill="var(--primary)" opacity={0.25} radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Rolling latency analysis */}
              <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-6">
                <h3 className="font-extrabold text-[var(--text)] text-sm uppercase tracking-wider text-[var(--text-muted)] mb-4">
                  Real-time Gateway Query Latency Response (ms)
                </h3>
                {latencyHistoryForChart.length === 0 ? (
                  <div className="h-44 flex items-center justify-center border border-dashed border-[var(--border)] rounded-xl text-xs text-[var(--text-muted)]">
                     Gateway silent. Run tests or interact with the app to plot rolling latencies.
                  </div>
                ) : (
                  <div className="h-44">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={latencyHistoryForChart} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                        <XAxis dataKey="index" tick={{ fontSize: 10 }} />
                        <YAxis tick={{ fontSize: 10 }} />
                        <Tooltip 
                          contentStyle={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)', borderRadius: '12px' }}
                          labelStyle={{ color: 'var(--text)' }}
                        />
                        <Area type="monotone" dataKey="latency" name="Latency (ms)" stroke="var(--primary)" fill="var(--primary)" fillOpacity={0.1} strokeWidth={2} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Tab content: Prompt Templates */}
        {activeTab === 'prompts' && (
          <div id="prompts-tab" className="grid grid-cols-1 lg:grid-cols-4 gap-6 animate-in fade-in duration-200">
            
            {/* Left selector */}
            <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-4 space-y-2 lg:col-span-1">
              <span className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider px-2 block mb-2">Templates</span>
              <div className="space-y-1">
                {prompts.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setSelectedPromptId(p.id)}
                    className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-bold flex flex-col gap-1 transition-all border cursor-pointer ${
                      selectedPromptId === p.id
                        ? 'bg-[var(--primary)] text-[var(--primary-foreground)] border-[var(--primary)] shadow-sm'
                        : 'text-[var(--text)] hover:bg-[var(--surface-dim)] border-transparent'
                    }`}
                  >
                    <span>{p.name}</span>
                    <span className={`text-[10px] font-medium ${selectedPromptId === p.id ? 'text-[var(--primary-foreground)]/85' : 'text-[var(--text-muted)]'}`}>
                      {p.description}
                    </span>
                  </button>
                ))}
              </div>
              <div className="pt-4 border-t border-[var(--border)]">
                <button
                  onClick={handleResetPrompts}
                  className="w-full px-3 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer border border-red-500/20"
                >
                  <Trash size={14} /> Revert To Default
                </button>
              </div>
            </div>

            {/* Prompt Editor */}
            <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-6 lg:col-span-3 space-y-4">
              {prompts.find(item => item.id === selectedPromptId) ? (
                <>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-[var(--border)] pb-4">
                    <div>
                      <h3 className="font-extrabold text-[var(--text)] text-lg flex items-center gap-2">
                        <Code size={18} className="text-[var(--primary)]" />
                        {prompts.find(item => item.id === selectedPromptId)?.name}
                      </h3>
                      <p className="text-xs text-[var(--text-muted)] mt-1">
                        Editing system instruction guidelines. These are applied dynamically to guide responses.
                      </p>
                    </div>
<span className="px-2.5 py-1 rounded-md bg-[var(--surface-dim)] border border-[var(--border)] text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">
                       {prompts.find(item => item.id === selectedPromptId)?.category}
                     </span>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider">Dynamic Placeholders</label>
                    <div className="flex flex-wrap gap-1.5">
                      {prompts.find(item => item.id === selectedPromptId)?.placeholders.map((ph) => (
                        <span key={ph} className="font-mono text-xs font-extrabold bg-[var(--primary)]/10 text-[var(--primary)] px-2.5 py-1 rounded-lg border border-[var(--primary)]/20">
                          {ph}
                        </span>
                      ))}
                    </div>
                    <p className="text-[10px] text-[var(--text-muted)]">Placeholders are automatically parsed during execution. Do not delete them unless required.</p>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider block">Template Instructions</label>
                    <textarea
                      rows={14}
                      value={editedPromptTemplate}
                      onChange={(e) => setEditedPromptTemplate(e.target.value)}
                      className="w-full p-4 bg-[var(--bg)] border border-[var(--border)] rounded-xl font-mono text-xs focus:outline-none focus:ring-2 focus:ring-[var(--primary)] text-[var(--text)]"
                    />
                  </div>

                  <div className="flex justify-end pt-2">
                    <button
                      onClick={handleSavePrompt}
                      className="px-5 py-2.5 bg-[var(--primary)] text-[var(--primary-foreground)] rounded-xl text-sm font-bold shadow-md hover:opacity-90 active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <Check size={16} /> Save & Deploy Template
                    </button>
                  </div>
                </>
              ) : (
                <div className="h-full flex items-center justify-center text-xs text-[var(--text-muted)] py-20">
                   Select a template from the panel to manage its instructions.
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tab content: Live testing */}
        {activeTab === 'testing' && (
          <div id="testing-tab" className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-in fade-in duration-200">
            
            {/* Control panel */}
            <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-6 lg:col-span-4 space-y-4 h-fit">
              <div>
                <h3 className="font-extrabold text-[var(--text)] text-lg flex items-center gap-2">
                  <Play size={18} className="text-[var(--primary)]" />
                  Live Testing Suite
                </h3>
                <p className="text-xs text-[var(--text-muted)] mt-1">Submit test queries to check failover logs, latency responses, and formatted outputs.</p>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider block">Select Route / Target</label>
                <select
                  value={testProvider}
                  onChange={(e) => setTestProvider(e.target.value)}
                  className="w-full bg-[var(--bg)] text-[var(--text)] border border-[var(--border)] rounded-xl px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-[var(--primary)]"
                >
                  <option value="auto">Auto Intelligent Gateway (Recommended)</option>
                  {providers.map(p => (
                    <option key={p.name} value={p.name}>{p.name} {p.status === 'inactive' ? '(Disabled)' : ''}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider block">Task Category</label>
                <select
                  value={testFeature}
                  onChange={(e) => setTestFeature(e.target.value)}
                  className="w-full bg-[var(--bg)] text-[var(--text)] border border-[var(--border)] rounded-xl px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-[var(--primary)]"
                >
                  <option>Interactive Study Tutor</option>
                  <option>Clinical Case Reasoning</option>
                  <option>Flashcard Generator</option>
                  <option>MCQ Board Generator</option>
                  <option>Drug Comparison Analysis</option>
                  <option>Lecture Summary Synthesis</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider block">Test Input</label>
                <textarea
                  rows={4}
                  value={testPrompt}
                  onChange={(e) => setTestPrompt(e.target.value)}
                  placeholder="Enter a clinical scenario or test query..."
                  className="w-full p-3 bg-[var(--bg)] border border-[var(--border)] rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-[var(--primary)]"
                />
              </div>

              <button
                onClick={handleLiveTest}
                disabled={isTesting}
                className="w-full py-3 bg-[var(--primary)] text-[var(--primary-foreground)] rounded-xl text-sm font-bold shadow-md hover:opacity-90 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isTesting ? (
                  <>
                    <RefreshCw className="animate-spin" size={16} />
                    Executing Gateway Fallback Chain...
                  </>
                ) : (
                  <>
                    <Sparkles size={16} />
                    Trigger AI Gateway Query
                  </>
                )}
              </button>
            </div>

            {/* Test response panel */}
            <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-6 lg:col-span-8 flex flex-col min-h-[450px]">
              <div className="border-b border-[var(--border)] pb-3 flex justify-between items-center bg-[var(--surface-dim)]/50 px-4 -mx-6 -mt-6 rounded-t-2xl">
                <div className="flex items-center gap-2 font-bold text-sm text-[var(--text)]">
                  <Terminal size={16} className="text-[var(--primary)]" />
                  Gateway Console Output
                </div>
                {testResult && (
                  <span className="text-xs text-emerald-500 font-bold flex items-center gap-1">
                     <CheckCircle2 size={14} /> Completed
                  </span>
                )}
              </div>

              <div className="flex-1 py-4 flex flex-col justify-between">
                {isTesting ? (
                  <div className="flex-1 flex flex-col items-center justify-center py-20 text-center space-y-4">
                    <RefreshCw className="animate-spin text-[var(--primary)]" size={32} />
                    <div>
<p className="text-sm font-bold">Processing Request...</p>
<p className="text-xs text-[var(--text-muted)] mt-1">Evaluating provider health and routing the request to the best available service.</p>
                    </div>
                  </div>
                ) : testError ? (
                  <div className="p-4 bg-red-500/15 border border-red-500/30 rounded-2xl flex items-start gap-3 my-auto mx-auto max-w-lg">
                    <ShieldAlert className="text-red-500 shrink-0 mt-0.5" size={20} />
                    <div>
                      <p className="text-sm font-bold text-red-500">Execution Blocked by Gateway</p>
                      <p className="text-xs text-[var(--text-muted)] mt-1">{testError}</p>
                    </div>
                  </div>
                ) : testResult ? (
                  <div className="space-y-4 flex-1 flex flex-col justify-between">
                    <div className="space-y-2">
                      <span className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider block">Generated Synthesized Response</span>
                      <div className="p-4 bg-[var(--bg)] border border-[var(--border)] rounded-2xl text-xs leading-relaxed max-h-[300px] overflow-y-auto whitespace-pre-wrap font-sans text-[var(--text)]">
                        {testResult.text}
                      </div>
                    </div>

                    {/* Routing path output */}
                    <div className="bg-[var(--surface-dim)] border border-[var(--border)] rounded-2xl p-4 space-y-2.5">
                      <span className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider flex items-center gap-1">
                        <Layers size={14} /> Gateway Routing Pathway Logs
                      </span>
                      {testResult.logs && testResult.logs[0] ? (
                        <div className="space-y-2 font-mono text-[10px] text-[var(--text-muted)]">
                          <div className="flex items-center gap-1.5 text-emerald-500 font-bold">
                             <span>✓</span> Routed successfully to: {testResult.logs[0].provider}
                          </div>
                          <div>- Timestamp: {new Date(testResult.logs[0].timestamp).toLocaleTimeString()}</div>
                          <div>- Latency Response: {testResult.logs[0].latencyMs}ms</div>
                          <div>- Units: {testResult.logs[0].tokensInput} (in) / {testResult.logs[0].tokensOutput} (out)</div>
                          {testResult.logs[0].fallbackChain && testResult.logs[0].fallbackChain.length > 0 && (
                            <div className="text-amber-500">
                              - Fallback triggered! Bypassed failed nodes: {testResult.logs[0].fallbackChain.join(' → ')}
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="text-[10px] font-mono text-[var(--text-muted)]">
                          No active retries. Direct route executed instantly.
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="flex-1 flex flex-col items-center justify-center py-20 text-center space-y-2 my-auto">
                    <Code className="text-[var(--text-muted)]" size={32} />
                    <p className="text-sm font-bold">Gateway Console Ready</p>
                    <p className="text-xs text-[var(--text-muted)]">Run a test to monitor live routing results and verify configuration.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Tab content: Gateway audit logs */}
        {activeTab === 'logs' && (
          <div id="logs-tab" className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-6 space-y-4 animate-in fade-in duration-200">
            <div>
              <h3 className="font-extrabold text-[var(--text)] text-lg">Gateway Audit Trail</h3>
              <p className="text-xs text-[var(--text-muted)] mt-1">Complete historic immutable list of gateway routing, retries, and costs.</p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm whitespace-nowrap">
                <thead className="bg-[var(--surface-dim)] text-[var(--text-muted)] text-xs uppercase font-bold tracking-wider">
                  <tr>
                    <th className="px-6 py-4 border-b border-[var(--border)]">Time</th>
                    <th className="px-6 py-4 border-b border-[var(--border)]">Feature Task</th>
                    <th className="px-6 py-4 border-b border-[var(--border)]">Input Snippet</th>
                    <th className="px-6 py-4 border-b border-[var(--border)]">Routed Provider</th>
                    <th className="px-6 py-4 border-b border-[var(--border)]">Latency</th>
                    <th className="px-6 py-4 border-b border-[var(--border)]">Status</th>
                    <th className="px-6 py-4 border-b border-[var(--border)]">Retries / Fallbacks</th>
                    <th className="px-6 py-4 border-b border-[var(--border)]">Estimated Cost</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border)]">
                  {logs.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="px-6 py-12 text-center text-xs text-[var(--text-muted)]">
                         No audit trail logs recorded yet. Execute some requests above.
                      </td>
                    </tr>
                  ) : (
                    logs.map((log) => (
                      <tr key={log.id} className="hover:bg-[var(--surface-dim)]/50 transition-colors">
                        <td className="px-6 py-4 font-mono text-xs text-[var(--text-muted)]">
                          {new Date(log.timestamp).toLocaleTimeString()}
                        </td>
                        <td className="px-6 py-4 font-bold text-xs">
                          {log.feature}
                        </td>
                        <td className="px-6 py-4 font-mono text-xs text-[var(--text-muted)] truncate max-w-xs">
                          {log.prompt}
                        </td>
                        <td className="px-6 py-4 font-bold text-xs text-[var(--primary)]">
                          {log.provider}
                        </td>
                        <td className="px-6 py-4 font-mono text-xs font-bold text-[var(--text)]">
                          {log.latencyMs}ms
                        </td>
                        <td className="px-6 py-4">
                          {log.status === 'success' ? (
                            <span className="px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-500 text-xs font-bold inline-flex items-center gap-1">
                               ✓ OK
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 rounded-md bg-red-500/10 text-red-500 text-xs font-bold inline-flex items-center gap-1">
                               ✕ Failover
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 font-mono text-xs text-[var(--text-muted)]">
                          {log.fallbackChain && log.fallbackChain.length > 0 ? (
                            <span className="text-amber-500 font-bold">
                              {log.fallbackChain.join(' → ')}
                            </span>
                          ) : (
                            <span className="text-emerald-600 font-semibold">Direct Route</span>
                          )}
                        </td>
                        <td className="px-6 py-4 font-mono text-xs font-bold text-[var(--text)]">
                          ${log.cost.toFixed(6)}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

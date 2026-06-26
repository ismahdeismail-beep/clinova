import React from 'react';
import { Activity, Thermometer, HeartPulse, Wind, AlertTriangle, AlertCircle, X, ShieldAlert } from 'lucide-react';

export interface Vitals {
  bp: string;
  hr: number;
  temp: number;
  rr: number;
  spo2: number;
}

export interface Alert {
  id: string;
  type: 'critical' | 'warning' | 'info';
  message: string;
}

export interface Patient {
  id: string;
  name: string;
  ipNumber: string;
  age: number;
  sex: string;
  ward: string;
  lastAdmission: string;
  vitals: Vitals;
  alerts: Alert[];
}

interface PatientQuickSummaryProps {
  patient: Patient;
  onClose: () => void;
}

export function PatientQuickSummary({ patient, onClose }: PatientQuickSummaryProps) {
  return (
    <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl shadow-lg flex flex-col h-full animate-in slide-in-from-right-4 duration-300">
      <div className="flex items-center justify-between p-4 border-b border-[var(--border)] bg-[var(--surface-dim)] rounded-t-xl">
        <div>
          <h2 className="text-lg font-bold text-[var(--text)] tracking-tight">{patient.name}</h2>
          <p className="text-sm text-[var(--text-muted)] font-medium">
            {patient.ipNumber} • {patient.age}y / {patient.sex} • {patient.ward}
          </p>
        </div>
        <button 
          onClick={onClose}
          className="p-2 rounded-lg text-[var(--text-muted)] hover:bg-[var(--bg)] hover:text-[var(--text)] transition-colors"
        >
          <X size={20} />
        </button>
      </div>

      <div className="p-4 flex-1 overflow-y-auto space-y-6">
        {/* Alerts Section */}
        {patient.alerts.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-[var(--text)] uppercase tracking-wider flex items-center gap-2">
              <ShieldAlert size={16} className="text-[var(--primary)]" />
              Active Alerts
            </h3>
            <div className="space-y-2">
              {patient.alerts.map((alert) => (
                <div 
                  key={alert.id}
                  className={`p-3 rounded-lg flex items-start gap-3 text-sm font-medium border ${
                    alert.type === 'critical' ? 'bg-red-500/10 border-red-500/20 text-red-600' :
                    alert.type === 'warning' ? 'bg-amber-500/10 border-amber-500/20 text-amber-600' :
                    'bg-blue-500/10 border-blue-500/20 text-blue-600'
                  }`}
                >
                  {alert.type === 'critical' ? <AlertTriangle size={18} className="shrink-0 mt-0.5" /> : <AlertCircle size={18} className="shrink-0 mt-0.5" />}
                  <p>{alert.message}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Vitals Section */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-[var(--text)] uppercase tracking-wider flex items-center gap-2">
            <Activity size={16} className="text-[var(--primary)]" />
            Recent Vitals
          </h3>
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 bg-[var(--surface-dim)] rounded-xl border border-[var(--border)]">
              <div className="flex items-center text-[var(--text-muted)] text-xs mb-1 font-medium gap-1.5">
                <HeartPulse size={14} className="text-rose-500" />
                Heart Rate
              </div>
              <div className="text-xl font-bold text-[var(--text)]">
                {patient.vitals.hr} <span className="text-sm font-medium text-[var(--text-muted)]">bpm</span>
              </div>
            </div>
            
            <div className="p-3 bg-[var(--surface-dim)] rounded-xl border border-[var(--border)]">
              <div className="flex items-center text-[var(--text-muted)] text-xs mb-1 font-medium gap-1.5">
                <Activity size={14} className="text-blue-500" />
                Blood Pressure
              </div>
              <div className="text-xl font-bold text-[var(--text)]">
                {patient.vitals.bp} <span className="text-sm font-medium text-[var(--text-muted)]">mmHg</span>
              </div>
            </div>

            <div className="p-3 bg-[var(--surface-dim)] rounded-xl border border-[var(--border)]">
              <div className="flex items-center text-[var(--text-muted)] text-xs mb-1 font-medium gap-1.5">
                <Thermometer size={14} className="text-amber-500" />
                Temperature
              </div>
              <div className="text-xl font-bold text-[var(--text)]">
                {patient.vitals.temp}°<span className="text-sm font-medium text-[var(--text-muted)]">C</span>
              </div>
            </div>

            <div className="p-3 bg-[var(--surface-dim)] rounded-xl border border-[var(--border)]">
              <div className="flex items-center text-[var(--text-muted)] text-xs mb-1 font-medium gap-1.5">
                <Wind size={14} className="text-teal-500" />
                Resp. Rate
              </div>
              <div className="text-xl font-bold text-[var(--text)]">
                {patient.vitals.rr} <span className="text-sm font-medium text-[var(--text-muted)]">bpm</span>
              </div>
            </div>
            
            <div className="p-3 bg-[var(--surface-dim)] rounded-xl border border-[var(--border)] col-span-2">
              <div className="flex items-center text-[var(--text-muted)] text-xs mb-1 font-medium gap-1.5">
                <Activity size={14} className="text-[var(--primary)]" />
                SpO2
              </div>
              <div className="text-xl font-bold text-[var(--text)]">
                {patient.vitals.spo2}% <span className="text-sm font-medium text-[var(--text-muted)]">on room air</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="p-4 border-t border-[var(--border)] bg-[var(--surface-dim)] rounded-b-xl">
        <button className="w-full py-2.5 bg-[var(--primary)] text-white rounded-lg font-medium text-sm hover:opacity-90 transition-opacity">
          Open Full Clinical Profile
        </button>
      </div>
    </div>
  );
}

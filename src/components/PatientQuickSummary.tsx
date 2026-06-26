import React, { useState, useEffect } from 'react';
import { Activity, Thermometer, HeartPulse, Wind, AlertTriangle, AlertCircle, X, ShieldAlert, LineChart as LineChartIcon, BrainCircuit, BellPlus, CheckCircle, Download } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useNotifications } from '../contexts/NotificationContext';
import { jsPDF } from 'jspdf';

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

export interface VitalHistoryItem {
  time: string;
  hr: number;
  temp: number;
  spo2: number;
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
  vitalsHistory?: VitalHistoryItem[];
  alerts: Alert[];
}

interface PatientQuickSummaryProps {
  patient: Patient;
  onClose: () => void;
}

function evaluatePriority(vitals: Vitals): { level: 'Critical' | 'Warning' | 'Stable', color: string, reason: string } {
  const systolic = parseInt(vitals.bp.split('/')[0]) || 120;
  let score = 0;
  let reasons: string[] = [];

  if (vitals.hr > 110 || vitals.hr < 50) { score += 2; reasons.push('Abnormal HR'); }
  else if (vitals.hr > 100) { score += 1; }

  if (vitals.rr > 22 || vitals.rr < 10) { score += 2; reasons.push('Abnormal RR'); }
  else if (vitals.rr > 20) { score += 1; }

  if (vitals.spo2 <= 92) { score += 2; reasons.push('Low SpO2'); }
  else if (vitals.spo2 <= 95) { score += 1; }

  if (systolic > 160 || systolic <= 90) { score += 2; reasons.push('Abnormal BP'); }
  else if (systolic > 140) { score += 1; }

  if (vitals.temp >= 38.5 || vitals.temp <= 35.0) { score += 2; reasons.push('Abnormal Temp'); }
  else if (vitals.temp >= 38.0) { score += 1; }

  if (score >= 3) return { level: 'Critical', color: 'bg-red-500/10 text-red-600 border-red-500/20', reason: reasons.join(', ') || 'Multiple abnormal vitals' };
  if (score >= 1) return { level: 'Warning', color: 'bg-amber-500/10 text-amber-600 border-amber-500/20', reason: reasons.join(', ') || 'Slightly abnormal vitals' };
  return { level: 'Stable', color: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20', reason: 'Vitals within normal range' };
}

export function PatientQuickSummary({ patient, onClose }: PatientQuickSummaryProps) {
  const [activeChart, setActiveChart] = useState<'hr' | 'temp' | 'spo2'>('hr');
  const [priority, setPriority] = useState<{ level: string, color: string, reason: string } | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(true);
  
  // Reminder State
  const { scheduleMedicationReminder } = useNotifications();
  const [showReminderForm, setShowReminderForm] = useState(false);
  const [medicationName, setMedicationName] = useState('');
  const [delayMinutes, setDelayMinutes] = useState('15');
  const [reminderScheduled, setReminderScheduled] = useState(false);

  useEffect(() => {
    setIsAnalyzing(true);
    setPriority(null);
    const timer = setTimeout(() => {
      setPriority(evaluatePriority(patient.vitals));
      setIsAnalyzing(false);
    }, 800); // Simulate AI analysis
    return () => clearTimeout(timer);
  }, [patient.vitals]);

  const handleScheduleReminder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!medicationName.trim()) return;
    
    scheduleMedicationReminder(patient.name, medicationName, parseInt(delayMinutes, 10));
    setReminderScheduled(true);
    setMedicationName('');
    
    setTimeout(() => {
      setReminderScheduled(false);
      setShowReminderForm(false);
    }, 2000);
  };

  const handleDownloadPdf = () => {
    const doc = new jsPDF();
    
    // Header
    doc.setFontSize(20);
    doc.setTextColor(33, 37, 41);
    doc.text('Patient Health Report', 20, 20);
    
    doc.setFontSize(12);
    doc.setTextColor(108, 117, 125);
    doc.text(`Generated on: ${new Date().toLocaleString()}`, 20, 30);
    
    // Patient Info
    doc.setFontSize(16);
    doc.setTextColor(33, 37, 41);
    doc.text('Patient Information', 20, 45);
    
    doc.setFontSize(12);
    doc.text(`Name: ${patient.name}`, 20, 55);
    doc.text(`IP Number: ${patient.ipNumber}`, 20, 65);
    doc.text(`Age/Sex: ${patient.age}y / ${patient.sex}`, 20, 75);
    doc.text(`Ward: ${patient.ward}`, 20, 85);
    doc.text(`Last Admission: ${patient.lastAdmission}`, 20, 95);
    
    // Vitals
    doc.setFontSize(16);
    doc.text('Current Vitals', 20, 110);
    
    doc.setFontSize(12);
    doc.text(`Heart Rate: ${patient.vitals.hr} bpm`, 20, 120);
    doc.text(`Blood Pressure: ${patient.vitals.bp} mmHg`, 20, 130);
    doc.text(`Temperature: ${patient.vitals.temp} °C`, 20, 140);
    doc.text(`Respiratory Rate: ${patient.vitals.rr} bpm`, 20, 150);
    doc.text(`SpO2: ${patient.vitals.spo2}%`, 20, 160);
    
    // Alerts
    if (patient.alerts.length > 0) {
      doc.setFontSize(16);
      doc.text('Active Alerts', 20, 175);
      
      doc.setFontSize(12);
      let yOffset = 185;
      patient.alerts.forEach((alert) => {
        const text = `[${alert.type.toUpperCase()}] ${alert.message}`;
        const splitText = doc.splitTextToSize(text, 170);
        doc.text(splitText, 20, yOffset);
        yOffset += splitText.length * 7;
      });
    }
    
    doc.save(`${patient.name.replace(/\s+/g, '_')}_Report.pdf`);
  };

  return (
    <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl shadow-lg flex flex-col h-full animate-in slide-in-from-right-4 duration-300">
      <div className="p-4 border-b border-[var(--border)] bg-[var(--surface-dim)] rounded-t-xl relative">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-[var(--text-muted)] hover:bg-[var(--bg)] hover:text-[var(--text)] transition-colors"
        >
          <X size={18} />
        </button>
        <div className="pr-8">
          <h2 className="text-lg font-bold text-[var(--text)] tracking-tight">{patient.name}</h2>
          <p className="text-sm text-[var(--text-muted)] font-medium">
            {patient.ipNumber} • {patient.age}y / {patient.sex} • {patient.ward}
          </p>
        </div>
        
        <div className="mt-4 flex flex-wrap gap-2">
          {isAnalyzing ? (
            <div className="flex items-center gap-2 text-xs font-medium text-[var(--text-muted)] bg-[var(--surface)] border border-[var(--border)] w-fit px-2.5 py-1.5 rounded-full animate-pulse shadow-sm">
              <BrainCircuit size={14} className="text-[var(--primary)] animate-spin-slow" />
              AI analyzing clinical priority...
            </div>
          ) : priority ? (
            <div className={`flex items-center gap-2 text-xs font-medium border w-fit px-2.5 py-1.5 rounded-full shadow-sm ${priority.color}`} title={priority.reason}>
              <BrainCircuit size={14} />
              Priority: {priority.level}
            </div>
          ) : null}
          
          <button 
            onClick={() => setShowReminderForm(!showReminderForm)}
            className="flex items-center gap-2 text-xs font-medium bg-[var(--surface)] border border-[var(--border)] text-[var(--text)] hover:text-[var(--primary)] hover:border-[var(--primary)] transition-colors px-2.5 py-1.5 rounded-full shadow-sm"
          >
            <BellPlus size={14} />
            Schedule Reminder
          </button>

          <button 
            onClick={handleDownloadPdf}
            className="flex items-center gap-2 text-xs font-medium bg-[var(--surface)] border border-[var(--border)] text-[var(--text)] hover:text-[var(--primary)] hover:border-[var(--primary)] transition-colors px-2.5 py-1.5 rounded-full shadow-sm"
            title="Download PDF Report"
          >
            <Download size={14} />
            Download PDF
          </button>
        </div>
        
        {showReminderForm && (
          <form onSubmit={handleScheduleReminder} className="mt-4 p-3 bg-[var(--surface)] border border-[var(--border)] rounded-lg shadow-sm animate-in fade-in slide-in-from-top-2">
            {reminderScheduled ? (
              <div className="flex items-center gap-2 text-emerald-600 text-sm font-medium py-2">
                <CheckCircle size={18} />
                Reminder Scheduled
              </div>
            ) : (
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-[var(--text-muted)] mb-1">Medication Name</label>
                  <input 
                    type="text" 
                    value={medicationName}
                    onChange={(e) => setMedicationName(e.target.value)}
                    placeholder="e.g. Ceftriaxone 1g IV" 
                    className="w-full text-sm bg-[var(--bg)] border border-[var(--border)] rounded-md px-3 py-1.5 focus:outline-none focus:border-[var(--primary)]"
                    required
                  />
                </div>
                <div className="flex items-end gap-2">
                  <div className="flex-1">
                    <label className="block text-xs font-medium text-[var(--text-muted)] mb-1">Remind In (minutes)</label>
                    <select 
                      value={delayMinutes}
                      onChange={(e) => setDelayMinutes(e.target.value)}
                      className="w-full text-sm bg-[var(--bg)] border border-[var(--border)] rounded-md px-3 py-1.5 focus:outline-none focus:border-[var(--primary)]"
                    >
                      <option value="5">5 minutes</option>
                      <option value="15">15 minutes</option>
                      <option value="30">30 minutes</option>
                      <option value="60">1 hour</option>
                    </select>
                  </div>
                  <button type="submit" className="px-4 py-1.5 bg-[var(--primary)] text-white text-sm font-medium rounded-md hover:opacity-90 transition-opacity">
                    Schedule
                  </button>
                </div>
              </div>
            )}
          </form>
        )}
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

        {/* Vitals Trend Section */}
        {patient.vitalsHistory && patient.vitalsHistory.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-[var(--text)] uppercase tracking-wider flex items-center justify-between">
              <div className="flex items-center gap-2">
                <LineChartIcon size={16} className="text-[var(--primary)]" />
                Vitals Trend
              </div>
            </h3>
            
            <div className="bg-[var(--surface-dim)] rounded-xl border border-[var(--border)] p-3">
              <div className="flex bg-[var(--surface)] p-1 rounded-lg mb-4 border border-[var(--border)]">
                <button 
                  onClick={() => setActiveChart('hr')}
                  className={`flex-1 py-1 text-xs font-medium rounded-md transition-colors ${activeChart === 'hr' ? 'bg-[var(--primary)] text-white' : 'text-[var(--text-muted)] hover:text-[var(--text)]'}`}
                >
                  HR
                </button>
                <button 
                  onClick={() => setActiveChart('temp')}
                  className={`flex-1 py-1 text-xs font-medium rounded-md transition-colors ${activeChart === 'temp' ? 'bg-[var(--primary)] text-white' : 'text-[var(--text-muted)] hover:text-[var(--text)]'}`}
                >
                  Temp
                </button>
                <button 
                  onClick={() => setActiveChart('spo2')}
                  className={`flex-1 py-1 text-xs font-medium rounded-md transition-colors ${activeChart === 'spo2' ? 'bg-[var(--primary)] text-white' : 'text-[var(--text-muted)] hover:text-[var(--text)]'}`}
                >
                  SpO2
                </button>
              </div>
              
              <div className="h-[180px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={patient.vitalsHistory} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                    <XAxis 
                      dataKey="time" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fill: 'var(--text-muted)', fontSize: 10 }}
                      dy={10}
                    />
                    <YAxis 
                      domain={['auto', 'auto']}
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fill: 'var(--text-muted)', fontSize: 10 }}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'var(--surface)', 
                        borderColor: 'var(--border)',
                        borderRadius: '0.5rem',
                        fontSize: '12px'
                      }}
                      itemStyle={{ color: 'var(--text)' }}
                      labelStyle={{ color: 'var(--text-muted)' }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey={activeChart} 
                      stroke={activeChart === 'hr' ? '#f43f5e' : activeChart === 'temp' ? '#f59e0b' : '#3b82f6'} 
                      strokeWidth={2}
                      dot={{ fill: activeChart === 'hr' ? '#f43f5e' : activeChart === 'temp' ? '#f59e0b' : '#3b82f6', r: 4, strokeWidth: 0 }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <div className="p-4 border-t border-[var(--border)] bg-[var(--surface-dim)] rounded-b-xl">
        <button className="w-full py-2.5 bg-[var(--primary)] text-white rounded-lg font-medium text-sm hover:opacity-90 transition-opacity">
          Open Full Clinical Profile
        </button>
      </div>
    </div>
  );
}

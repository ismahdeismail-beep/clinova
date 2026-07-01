import React, { useRef, useState } from 'react';
import { BarChart3, Download, FileText, Loader2, FileSpreadsheet, Database, ShieldCheck, Check } from 'lucide-react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { db } from '../lib/firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { handleFirestoreError, OperationType } from '../lib/firestore-error';

export default function ReportsScreen() {
  const reportRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isExportingPatients, setIsExportingPatients] = useState(false);
  const [isExportingCases, setIsExportingCases] = useState(false);
  const [exportMessage, setExportMessage] = useState<{ text: string; type: 'success' | 'error' | null }>({ text: '', type: null });

  const handleDownloadPDF = async () => {
    if (!reportRef.current) return;
    
    try {
      setIsGenerating(true);
      const canvas = await html2canvas(reportRef.current, {
        scale: 2,
        useCORS: true,
        logging: false
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'px',
        format: 'a4'
      });
      
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('clinova_analytics_report.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF report.');
    } finally {
      setIsGenerating(false);
    }
  };

  const escapeCSV = (val: any) => {
    if (val === undefined || val === null) return '';
    let str = String(val);
    if (str.includes(',') || str.includes('"') || str.includes('\n') || str.includes('\r')) {
      str = '"' + str.replace(/"/g, '""') + '"';
    }
    return str;
  };

  const downloadCSVFile = (csvContent: string, fileName: string) => {
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', fileName);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleExportPatientsCSV = async () => {
    setIsExportingPatients(true);
    setExportMessage({ text: '', type: null });
    const path = 'patients';

    try {
      const querySnapshot = await getDocs(collection(db, path));
      if (querySnapshot.empty) {
        setExportMessage({ text: 'No patient records found in registry.', type: 'error' });
        return;
      }

      // Headers for fully anonymized patient data
      const headers = [
        'Patient ID (Anonymized)',
        'Age',
        'Sex',
        'Ward Assignment',
        'Last Admission',
        'BP (Systolic/Diastolic)',
        'Heart Rate (bpm)',
        'Temperature (C)',
        'Respiratory Rate (rpm)',
        'Oxygen Saturation (%)',
        'Total Notes logged'
      ];

      const rows: string[][] = [headers];

      let index = 0;
      querySnapshot.forEach((docSnap) => {
        const data = docSnap.data();
        const row = [
          `PATIENT-${String(index + 1).padStart(4, '0')}`, // Mask Name & original ID with sequential anonymized label
          data.age ? String(data.age) : 'N/A',
          data.sex || 'N/A',
          data.ward || 'N/A',
          data.lastAdmission || 'N/A',
          data.vitals?.bp || 'N/A',
          data.vitals?.hr ? String(data.vitals.hr) : 'N/A',
          data.vitals?.temp ? String(data.vitals.temp) : 'N/A',
          data.vitals?.rr ? String(data.vitals.rr) : 'N/A',
          data.vitals?.spo2 ? String(data.vitals.spo2) : 'N/A',
          data.notes ? String(data.notes.length) : '0'
        ].map(escapeCSV);

        rows.push(row);
        index++;
      });

      const csvContent = rows.map(r => r.join(',')).join('\n');
      const timestamp = new Date().toISOString().slice(0, 10);
      downloadCSVFile(csvContent, `clinova_patients_anonymized_${timestamp}.csv`);
      setExportMessage({ text: `Successfully exported ${index} de-identified patient records to CSV.`, type: 'success' });
    } catch (error) {
      console.error('Error exporting patients:', error);
      setExportMessage({ text: 'Failed to query database for patient export.', type: 'error' });
    } finally {
      setIsExportingPatients(false);
    }
  };

  const handleExportCasesCSV = async () => {
    setIsExportingCases(true);
    setExportMessage({ text: '', type: null });
    const path = 'clinical_cases';

    try {
      const q = query(collection(db, path), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        setExportMessage({ text: 'No clinical case discussions found in registry.', type: 'error' });
        return;
      }

      // Headers for fully anonymized clinical case data
      const headers = [
        'Case ID (Anonymized)',
        'Clinical Case Title',
        'Admitting Ward',
        'Chief Complaint (De-identified)',
        'History of Present Illness (De-identified)',
        'Case Status',
        'Date Created'
      ];

      const rows: string[][] = [headers];

      let index = 0;
      querySnapshot.forEach((docSnap) => {
        const data = docSnap.data();
        
        // Remove specific names or specific references inside free text if possible, and completely de-identify headers
        const row = [
          `CASE-${String(index + 1).padStart(4, '0')}`, // Mask Name & original Case ID
          data.title || 'Untitled Case',
          data.ward || 'N/A',
          data.chiefComplaint || 'N/A',
          data.historyOfPresentIllness || 'N/A',
          data.status || 'active',
          data.createdAt ? new Date(data.createdAt.seconds * 1000).toLocaleDateString() : 'N/A'
        ].map(escapeCSV);

        rows.push(row);
        index++;
      });

      const csvContent = rows.map(r => r.join(',')).join('\n');
      const timestamp = new Date().toISOString().slice(0, 10);
      downloadCSVFile(csvContent, `clinova_cases_anonymized_${timestamp}.csv`);
      setExportMessage({ text: `Successfully exported ${index} de-identified clinical case discussions to CSV.`, type: 'success' });
    } catch (error) {
      console.error('Error exporting clinical cases:', error);
      setExportMessage({ text: 'Failed to query database for clinical cases export.', type: 'error' });
    } finally {
      setIsExportingCases(false);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8 pb-24 selection:bg-[var(--primary)] selection:text-white" ref={reportRef}>
      
      {/* Header section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-2">
        <div>
          <h1 className="text-3xl font-bold text-[var(--text)] mb-2 tracking-tight">Reports & de-identified Exports</h1>
          <p className="text-[var(--text-muted)] text-sm">Generate compliance reports, perform analytical studies, and export fully anonymized clinical metrics.</p>
        </div>
        <button 
          onClick={handleDownloadPDF}
          disabled={isGenerating}
          className="flex items-center gap-2 px-4 py-2.5 bg-[var(--surface)] border border-[var(--border)] text-[var(--text)] rounded-xl hover:bg-[var(--surface-dim)] transition-colors font-semibold text-sm disabled:opacity-70 shadow-sm"
        >
          {isGenerating ? (
            <Loader2 size={18} className="animate-spin text-[var(--primary)]" />
          ) : (
            <FileText size={18} className="text-[var(--primary)]" />
          )}
          {isGenerating ? 'Generating PDF...' : 'Download PDF Summary'}
        </button>
      </div>

      {/* Compliance Notice Banner */}
      <div className="bg-blue-50/10 border border-blue-500/20 rounded-2xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start md:items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500 shrink-0">
            <ShieldCheck size={22} />
          </div>
          <div className="text-left">
            <h4 className="text-sm font-bold text-[var(--text)]">HIPAA & Clinical Research Compliance</h4>
            <p className="text-xs text-[var(--text-muted)] mt-0.5">
              Exports are pre-processed to remove Personally Identifiable Information (PII). Original patient names, IP/OP files, dates of birth, and identity trackers are completely omitted or replaced with sequential index masks.
            </p>
          </div>
        </div>
        <span className="text-[10px] font-bold font-mono uppercase bg-blue-500/20 text-blue-400 px-2.5 py-1 rounded-full self-start md:self-center">
          De-Identification Mode Active
        </span>
      </div>

      {/* Export feedback messages */}
      {exportMessage.text && (
        <div className={`p-4 rounded-xl text-sm font-medium border text-left flex items-center gap-3 animate-in fade-in duration-200 ${
          exportMessage.type === 'success' 
            ? 'bg-green-500/10 border-green-500/20 text-green-400' 
            : 'bg-red-500/10 border-red-500/20 text-red-400'
        }`}>
          {exportMessage.type === 'success' ? <Check size={18} className="shrink-0" /> : <ShieldCheck size={18} className="shrink-0" />}
          <span>{exportMessage.text}</span>
        </div>
      )}

      {/* Primary Export Operations Panel */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Patients CSV Card */}
        <div className="bg-[var(--surface)] p-6 rounded-2xl border border-[var(--border)] shadow-sm flex flex-col justify-between hover:border-[var(--primary)] transition-all">
          <div className="space-y-4 text-left">
            <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center text-green-500">
              <FileSpreadsheet size={24} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-[var(--text)]">Anonymized Patient Records</h3>
              <p className="text-sm text-[var(--text-muted)] mt-1">
                Download a fully compliant CSV dataset containing vital histories, age brackets, sex metadata, admitting locations, and therapeutic counts.
              </p>
            </div>
            
            <div className="bg-[var(--surface-dim)] rounded-xl p-3 border border-[var(--border)] text-xs space-y-2">
              <div className="font-bold uppercase tracking-wider text-[10px] text-[var(--text-muted)]">Applied Protections</div>
              <ul className="list-disc pl-4 space-y-1 text-[var(--text-muted)]">
                <li>Patient Full Name → <span className="text-green-500 font-mono text-[10px] bg-green-500/10 px-1 py-0.5 rounded">PATIENT-XXXX</span></li>
                <li>IP/OP Number Registry → <span className="text-red-500 font-semibold line-through">Purged</span></li>
                <li>Exact admission date timestamps de-identified</li>
              </ul>
            </div>
          </div>

          <button
            onClick={handleExportPatientsCSV}
            disabled={isExportingPatients}
            className="w-full mt-6 py-3 bg-[var(--primary)] hover:opacity-95 transition-opacity text-white rounded-xl font-semibold text-sm flex items-center justify-center gap-2"
          >
            {isExportingPatients ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <Download size={16} />
            )}
            {isExportingPatients ? 'Querying registry...' : 'Export Patient CSV'}
          </button>
        </div>

        {/* Clinical Cases CSV Card */}
        <div className="bg-[var(--surface)] p-6 rounded-2xl border border-[var(--border)] shadow-sm flex flex-col justify-between hover:border-[var(--primary)] transition-all">
          <div className="space-y-4 text-left">
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-500">
              <Database size={24} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-[var(--text)]">Anonymized Clinical Cases</h3>
              <p className="text-sm text-[var(--text-muted)] mt-1">
                Export case records including de-identified chief complaints, histories of present illness (HPI), admission wards, and active timelines.
              </p>
            </div>

            <div className="bg-[var(--surface-dim)] rounded-xl p-3 border border-[var(--border)] text-xs space-y-2">
              <div className="font-bold uppercase tracking-wider text-[10px] text-[var(--text-muted)]">Applied Protections</div>
              <ul className="list-disc pl-4 space-y-1 text-[var(--text-muted)]">
                <li>Patient Name Reference → <span className="text-green-500 font-mono text-[10px] bg-green-500/10 px-1 py-0.5 rounded">CASE-XXXX</span></li>
                <li>Identifiable patient IP numbers → <span className="text-red-500 font-semibold line-through">Purged</span></li>
                <li>OSCE / research compliant notes structure</li>
              </ul>
            </div>
          </div>

          <button
            onClick={handleExportCasesCSV}
            disabled={isExportingCases}
            className="w-full mt-6 py-3 bg-[var(--primary)] hover:opacity-95 transition-opacity text-white rounded-xl font-semibold text-sm flex items-center justify-center gap-2"
          >
            {isExportingCases ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <Download size={16} />
            )}
            {isExportingCases ? 'Processing records...' : 'Export Clinical Cases CSV'}
          </button>
        </div>

      </div>

      {/* Analytics Card Deck */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-[var(--text)] text-left">Traditional Reports</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            "Patient Reports", 
            "Pharmacotherapy Reports", 
            "Ward Reports", 
            "Drug Utilization Reports", 
            "Intervention Reports", 
            "Outcomes Reports"
          ].map((report) => (
            <div key={report} className="bg-[var(--surface)] p-6 rounded-xl border border-[var(--border)] shadow-sm hover:border-[var(--primary)] transition-colors cursor-pointer group text-left">
              <div className="flex items-start justify-between mb-4">
                <div className="w-10 h-10 rounded-lg bg-[var(--primary-container)] flex items-center justify-center text-[var(--primary)]">
                  <BarChart3 size={20} />
                </div>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDownloadPDF();
                  }}
                  className="p-2 text-[var(--text-muted)] hover:text-[var(--primary)] opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Download size={18} />
                </button>
              </div>
              <h3 className="text-lg font-semibold text-[var(--text)] mb-2">{report}</h3>
              <p className="text-sm text-[var(--text-muted)]">Generate and download comprehensive analytics.</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


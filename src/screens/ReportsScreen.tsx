import React, { useRef, useState } from 'react';
import { BarChart3, Download, FileText, Loader2 } from 'lucide-react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

export default function ReportsScreen() {
  const reportRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);

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

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6" ref={reportRef}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-[var(--text)] mb-2 tracking-tight">Reports</h1>
          <p className="text-[var(--text-muted)] text-sm">Clinical activity, interventions, and outcomes reporting.</p>
        </div>
        <button 
          onClick={handleDownloadPDF}
          disabled={isGenerating}
          className="flex items-center gap-2 px-4 py-2 bg-[var(--primary)] text-white rounded-lg hover:opacity-90 transition-opacity font-medium disabled:opacity-70"
        >
          {isGenerating ? (
            <Loader2 size={18} className="animate-spin" />
          ) : (
            <FileText size={18} />
          )}
          {isGenerating ? 'Generating...' : 'Download Report'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          "Patient Reports", 
          "Pharmacotherapy Reports", 
          "Ward Reports", 
          "Drug Utilization Reports", 
          "Intervention Reports", 
          "Outcomes Reports"
        ].map((report) => (
          <div key={report} className="bg-[var(--surface)] p-6 rounded-xl border border-[var(--border)] shadow-sm hover:border-[var(--primary)] transition-colors cursor-pointer group">
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
  );
}

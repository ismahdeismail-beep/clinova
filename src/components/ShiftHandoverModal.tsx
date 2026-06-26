import React from "react";
import {
  X,
  Clock,
  AlertTriangle,
  Activity,
  CheckSquare,
  FileText,
  ChevronRight,
  Download,
} from "lucide-react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

interface ShiftHandoverModalProps {
  onClose: () => void;
}

const HANDOVER_DATA = {
  shiftTime: "Last 12 Hours",
  statusChanges: [
    {
      patient: "IP-89432 (John Doe)",
      change: "Condition deteriorated. Upgraded to Critical.",
      time: "14:30",
      type: "negative",
    },
    {
      patient: "IP-89433 (Mary Smith)",
      change: "Stabilized. Step down to general ward recommended.",
      time: "11:15",
      type: "positive",
    },
  ],
  pendingTasks: [
    { task: "Review morning labs for IP-89432", urgency: "High" },
    {
      task: "Follow up on Ceftriaxone dose adjustment for IP-89435",
      urgency: "Medium",
    },
    { task: "Discharge summary for IP-89433", urgency: "Low" },
  ],
  criticalAlerts: [
    { message: "Patient IP-89432 SpO2 dropped below 90%", time: "14:20" },
    { message: "Missed medication: Warfarin for IP-89438", time: "16:00" },
  ],
};

export function ShiftHandoverModal({ onClose }: ShiftHandoverModalProps) {
  const [isGenerating, setIsGenerating] = React.useState(false);
  const reportRef = React.useRef<HTMLDivElement>(null);

  const handleDownloadPDF = async () => {
    if (!reportRef.current) return;

    try {
      setIsGenerating(true);
      const canvas = await html2canvas(reportRef.current, {
        scale: 2,
        useCORS: true,
        logging: false,
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "px",
        format: "a4",
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("shift_handover_report.pdf");
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Failed to generate PDF report.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in">
      <div className="bg-[var(--bg)] w-full max-w-4xl max-h-[90vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-[var(--border)] flex items-center justify-between bg-[var(--surface)]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] flex items-center justify-center">
              <FileText size={20} />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-[var(--text)]">
                Shift Handover Report
              </h2>
              <p className="text-xs sm:text-sm text-[var(--text-muted)] flex items-center gap-1">
                <Clock size={14} /> Automatically generated for{" "}
                {HANDOVER_DATA.shiftTime}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleDownloadPDF}
              disabled={isGenerating}
              className="flex items-center gap-2 px-4 py-2 bg-[var(--surface-dim)] hover:bg-[var(--border)] text-[var(--text)] text-sm font-medium rounded-lg transition-colors disabled:opacity-50"
            >
              {isGenerating ? (
                <Clock size={16} className="animate-spin" />
              ) : (
                <Download size={16} />
              )}
              <span className="hidden sm:inline">
                {isGenerating ? "Generating..." : "Export PDF"}
              </span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-[var(--surface-dim)] text-[var(--text-muted)] hover:text-[var(--text)] transition-colors"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div
          className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6"
          ref={reportRef}
        >
          {/* Summary Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 flex items-start gap-3">
              <AlertTriangle className="text-red-500 mt-0.5" size={20} />
              <div>
                <p className="text-xs font-medium text-red-600 uppercase tracking-wider mb-1">
                  Critical Alerts
                </p>
                <p className="text-2xl font-bold text-red-700">
                  {HANDOVER_DATA.criticalAlerts.length}
                </p>
              </div>
            </div>
            <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 flex items-start gap-3">
              <CheckSquare className="text-amber-500 mt-0.5" size={20} />
              <div>
                <p className="text-xs font-medium text-amber-600 uppercase tracking-wider mb-1">
                  Pending Tasks
                </p>
                <p className="text-2xl font-bold text-amber-700">
                  {HANDOVER_DATA.pendingTasks.length}
                </p>
              </div>
            </div>
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 flex items-start gap-3">
              <Activity className="text-blue-500 mt-0.5" size={20} />
              <div>
                <p className="text-xs font-medium text-blue-600 uppercase tracking-wider mb-1">
                  Status Changes
                </p>
                <p className="text-2xl font-bold text-blue-700">
                  {HANDOVER_DATA.statusChanges.length}
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Critical Alerts */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-[var(--text)] uppercase tracking-wider flex items-center gap-2">
                <AlertTriangle size={16} className="text-red-500" />
                Critical Alerts
              </h3>
              <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl overflow-hidden">
                <div className="divide-y divide-[var(--border)]">
                  {HANDOVER_DATA.criticalAlerts.map((alert, idx) => (
                    <div
                      key={idx}
                      className="p-4 hover:bg-[var(--surface-dim)] transition-colors"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] font-bold text-red-600 bg-red-500/10 px-2 py-0.5 rounded uppercase">
                          Urgent
                        </span>
                        <span className="text-xs text-[var(--text-muted)]">
                          {alert.time}
                        </span>
                      </div>
                      <p className="text-sm font-medium text-[var(--text)]">
                        {alert.message}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Pending Tasks */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-[var(--text)] uppercase tracking-wider flex items-center gap-2">
                <CheckSquare size={16} className="text-amber-500" />
                Pending Tasks
              </h3>
              <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl overflow-hidden">
                <div className="divide-y divide-[var(--border)]">
                  {HANDOVER_DATA.pendingTasks.map((task, idx) => (
                    <div
                      key={idx}
                      className="p-4 hover:bg-[var(--surface-dim)] transition-colors flex items-start gap-3"
                    >
                      <div className="mt-0.5">
                        <div
                          className={`w-3 h-3 rounded-full ${task.urgency === "High" ? "bg-red-500" : task.urgency === "Medium" ? "bg-amber-500" : "bg-green-500"}`}
                        />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-[var(--text)]">
                          {task.task}
                        </p>
                        <p className="text-xs text-[var(--text-muted)] mt-1">
                          Priority: {task.urgency}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Patient Status Changes */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-[var(--text)] uppercase tracking-wider flex items-center gap-2">
              <Activity size={16} className="text-blue-500" />
              Patient Status Changes
            </h3>
            <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl overflow-hidden">
              <div className="divide-y divide-[var(--border)]">
                {HANDOVER_DATA.statusChanges.map((change, idx) => (
                  <div
                    key={idx}
                    className="p-4 hover:bg-[var(--surface-dim)] transition-colors"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-bold text-[var(--text)]">
                        {change.patient}
                      </span>
                      <span className="text-xs text-[var(--text-muted)]">
                        {change.time}
                      </span>
                    </div>
                    <div
                      className={`text-sm p-3 rounded-lg ${change.type === "negative" ? "bg-red-500/10 text-red-700" : "bg-emerald-500/10 text-emerald-700"}`}
                    >
                      {change.change}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

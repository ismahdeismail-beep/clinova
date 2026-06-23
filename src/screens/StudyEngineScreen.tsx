import { useEffect } from 'react';
import {
  FileText, FileCheck2, HelpCircle, BookOpen, ArrowRight,
  Shield, BrainCircuit,
} from 'lucide-react';
import FileUploader from '../components/FileUploader';
import FileList from '../components/FileList';
import { useFileStore } from '../store/fileStore';

export default function StudyEngineScreen() {
  const { files, fetchFiles, removeFile } = useFileStore();

  useEffect(() => {
    fetchFiles('study_source');
  }, [fetchFiles]);

  const studyFiles = files.filter((f) => f.category === 'study_source');

  return (
    <div className="p-6 max-w-[1440px] mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        <div className="lg:col-span-12 mb-4 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2 py-0.5 rounded text-xs font-semibold uppercase tracking-wider bg-[var(--primary-container)] text-[var(--primary)]">
                Knowledge Conversion
              </span>
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight text-[var(--text)]">Clinova Knowledge Engine</h2>
            <p className="text-sm text-[var(--text-muted)] mt-2 max-w-2xl">
              Convert clinical documentation and research into actionable learning assets.
            </p>
          </div>
        </div>

        <div className="lg:col-span-8 flex flex-col gap-6">
          <section className="glass-card">
            <div className="p-4 border-b border-[var(--border)]">
              <h3 className="font-semibold text-sm text-[var(--text)]">Upload Source Documents</h3>
            </div>
            <div className="p-4">
              <FileUploader category="study_source" maxSizeMB={20} />
            </div>
            <div className="p-4 border-t border-[var(--border)]">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { icon: FileText, label: 'Short Notes', active: true },
                  { icon: FileCheck2, label: 'Summaries', active: false },
                  { icon: HelpCircle, label: 'MCQs', active: false },
                  { icon: BookOpen, label: 'Revision Guide', active: false },
                ].map((opt) => (
                  <div
                    key={opt.label}
                    className={`p-3 rounded-lg flex flex-col items-center text-center cursor-pointer transition-all text-sm ${
                      opt.active
                        ? 'bg-[var(--primary-container)] text-[var(--primary)] font-semibold border border-[var(--primary)]/30'
                        : 'bg-[var(--surface-dim)] text-[var(--text-muted)] hover:text-[var(--text)] border border-transparent'
                    }`}
                  >
                    <opt.icon size={20} className="mb-1" />
                    <span className="text-xs">{opt.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 border-t border-[var(--border)] bg-[var(--surface-dim)]/50">
              <div className="flex items-center gap-2 mb-2">
                <Shield size={14} className="text-[var(--primary)]" />
                <h4 className="text-xs font-bold uppercase tracking-widest text-[var(--primary)]">
                  Intelligence Guardrails
                </h4>
              </div>
              <div className="flex flex-wrap gap-3">
                <span className="text-xs px-2 py-1 rounded bg-[var(--surface)] text-[var(--text-secondary)] border border-[var(--border)]">
                  Source Fidelity Strict
                </span>
                <span className="text-xs px-2 py-1 rounded bg-[var(--surface)] text-[var(--text-secondary)] border border-[var(--border)]">
                  KDI Cross-Reference
                </span>
              </div>
            </div>
          </section>

          <section className="glass-card">
            <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--border)]">
              <h3 className="font-semibold text-sm text-[var(--text)]">Uploaded Documents</h3>
              <button className="text-[var(--primary)] text-xs font-medium flex items-center gap-1 hover:underline">
                View Archive <ArrowRight size={12} />
              </button>
            </div>
            <div className="p-4">
              <FileList
                files={studyFiles}
                onDelete={(id) => {
                  removeFile(id);
                }}
              />
            </div>
          </section>
        </div>

        <div className="lg:col-span-4 flex flex-col gap-6">
          <section className="glass-card border-l-[3px] border-l-[var(--primary)]">
            <div className="p-5">
              <div className="flex items-center gap-3 mb-4">
                <FileCheck2 size={20} className="text-[var(--primary)]" />
                <h3 className="text-xs font-bold uppercase tracking-widest text-[var(--text)]">
                  KDI Verification
                </h3>
              </div>
              <div className="space-y-3">
                <div className="p-3 bg-[var(--surface-dim)] rounded-lg flex items-center justify-between text-xs">
                  <span className="text-[var(--text-muted)]">Database Version</span>
                  <span className="font-mono text-[var(--primary)] font-bold">v2024.Q3.11</span>
                </div>
                <div className="p-3 bg-[var(--surface-dim)] rounded-lg flex items-center justify-between text-xs">
                  <span className="text-[var(--text-muted)]">Region Compliance</span>
                  <span className="font-mono text-[var(--primary)] font-bold">Kenya (PPB)</span>
                </div>
                <p className="text-xs text-[var(--text-muted)] italic leading-relaxed">
                  Prioritizes drug dosages from the Kenya Essential Medicines List.
                </p>
              </div>
            </div>
          </section>

          <section className="glass-card flex items-center justify-center p-8">
            <div className="flex flex-col items-center text-center">
              <BrainCircuit size={36} className="text-[var(--primary)] mb-3" />
              <h4 className="text-xs font-bold text-[var(--text)] mb-1">Semantic Mapping</h4>
              <p className="text-xs text-[var(--text-muted)] max-w-[180px]">
                Clinical entity extraction from your documents
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

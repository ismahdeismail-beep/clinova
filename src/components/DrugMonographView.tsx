import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { BookOpen, ArrowRight, Download, Pill, Database, Sparkles, ShieldCheck } from 'lucide-react';
import { getDrugClassConfig } from '../data/drugClassColors';
import { MedicineImageGallery } from './MedicineImageGallery';
import { getDrugThumbnail } from '../services/drugMonograph.service';

interface DrugMonographViewProps {
  content: string;
  drugName: string;
  genericName?: string;
  drugClass?: string;
  isSeeded: boolean;
  drugId?: string;
  onBack: () => void;
  onPin: () => void;
  saveButton?: React.ReactNode;
}

/**
 * Modern, design-system-driven template for drug monographs.
 * Renders a polished header with metadata and a clinical reading body
 * using the established .cl-* primitives (panels, pills, reading typography).
 */
export function DrugMonographView({
  content,
  drugName,
  genericName,
  drugClass,
  isSeeded,
  drugId,
  onBack,
  onPin,
  saveButton,
}: DrugMonographViewProps) {
  // Strip a leading "# Title" so the header card doesn't duplicate the drug name.
  const body = content.replace(/^#\s+.*\n+/, '').trim();
  const classConfig = drugClass ? getDrugClassConfig(drugClass) : null;
  const [thumb, setThumb] = useState<string | null>(null);

  // 3D-first thumbnail for the header icon (session-cached in the service).
  useEffect(() => {
    let on = true;
    if (drugId) {
      getDrugThumbnail(drugId).then((u) => {
        if (on) setThumb(u);
      });
    } else {
      setThumb(null);
    }
    return () => {
      on = false;
    };
  }, [drugId]);

  return (
    <div className="bg-[var(--surface)] rounded-2xl border border-[var(--border)] shadow-sm overflow-hidden animate-in fade-in duration-300">
      {/* ── Header ── */}
      <div className={`relative bg-gradient-to-br ${classConfig ? `from-${classConfig.color}-500/10 to-${classConfig.color}-500/5` : 'from-[var(--primary-container)]/70 to-transparent'} border-b border-[var(--border)] px-4 sm:px-6 md:px-8 py-4 sm:py-5`}>
        {/* Color accent bar */}
        {classConfig && (
          <div className={`absolute top-0 left-0 right-0 h-1 ${classConfig.bar}`} />
        )}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div className="flex items-start gap-4 min-w-0">
            {thumb ? (
              <img
                src={thumb}
                alt=""
                className="w-14 h-14 sm:w-16 sm:h-16 shrink-0 rounded-2xl object-cover bg-white border-2 border-[var(--border)] shadow-md"
              />
            ) : (
              <div className="w-14 h-14 sm:w-16 sm:h-16 shrink-0 rounded-2xl bg-[var(--primary-container)] flex items-center justify-center text-[var(--primary)] shadow-md">
                <Pill size={28} />
              </div>
            )}
            <div className="min-w-0">
              <h1 className="text-xl sm:text-2xl font-bold text-[var(--text)] tracking-tight leading-tight break-words">
                {drugName || 'Medication Monograph'}
              </h1>
              {genericName && (
                <p className="text-sm text-[var(--text-muted)] mt-0.5 truncate">
                  <span className="font-medium">Generic:</span> {genericName}
                </p>
              )}
              {drugClass && classConfig && (
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold mt-2 pointer-events-none border ${classConfig.badge} ${classConfig.border}`}>
                  <Pill size={13} />
                  {classConfig.subtitle && (
                    <span className="opacity-70">{classConfig.subtitle}</span>
                  )}
                  <span className="font-bold">·</span>
                  {drugClass}
                </span>
              )}
              {drugClass && !classConfig && (
                <span className="cl-pill cl-pill-medicine mt-2 pointer-events-none">
                  <Pill size={13} />
                  {drugClass}
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={onBack}
              aria-label="Back to drug list"
              className="flex items-center gap-1 px-3 py-1.5 bg-[var(--surface)] hover:bg-[var(--primary-container)] text-[var(--text-muted)] hover:text-[var(--primary)] rounded-lg text-xs font-semibold transition-colors border border-[var(--border)] hover:border-[var(--primary)]/30 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]"
            >
              <ArrowRight size={14} className="rotate-180" /> Back
            </button>
            {saveButton}
            <button
              onClick={onPin}
              aria-label="Pin monograph for offline access"
              className="flex items-center gap-2 px-3 py-1.5 bg-[var(--surface)] hover:bg-[var(--primary-container)] text-[var(--text-muted)] hover:text-[var(--primary)] rounded-lg text-xs font-semibold transition-colors border border-[var(--border)] hover:border-[var(--primary)]/30 shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]"
            >
              <Download size={14} />
              <span className="hidden sm:inline">Pin Offline</span>
            </button>
          </div>
        </div>

        {/* Source badge */}
        <div className="mt-3 flex items-center gap-2">
          <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wide border ${
              isSeeded
                ? 'bg-[var(--success-container)] text-[var(--success)] border-[var(--success)]/30'
                : 'bg-[var(--info-container)] text-[var(--info)] border-[var(--info)]/30'
            }`}
          >
            {isSeeded ? <Database size={12} /> : <Sparkles size={12} />}
            {isSeeded ? 'KDI Seeded' : 'Generated'}
          </span>
          <span className="text-[11px] text-[var(--text-muted)] font-mono">
            {isSeeded ? 'Kenya Drug Index · Clinova Monograph DB' : 'FDA / NLM Grounded'}
          </span>
        </div>
      </div>

      {/* ── Body ── */}
      <div className="px-4 sm:px-6 md:px-8 py-5">
        <div className="markdown-body cl-reading max-w-3xl min-w-0">
          <ReactMarkdown
            components={{
              table: ({ children }) => (
                <div className="overflow-x-auto w-full my-4 rounded-xl border border-[var(--border)] shadow-sm bg-[var(--surface)]">
                  <table className="w-full text-left border-collapse text-xs sm:text-sm">{children}</table>
                </div>
              ),
              thead: ({ children }) => (
                <thead className="bg-[var(--surface-dim)] border-b border-[var(--border)]">{children}</thead>
              ),
              tbody: ({ children }) => (
                <tbody className="divide-y divide-[var(--border)]/60">{children}</tbody>
              ),
              tr: ({ children }) => (
                <tr className="hover:bg-[var(--surface-dim)]/40 transition-colors">{children}</tr>
              ),
              th: ({ children }) => (
                <th className="p-3 font-semibold text-[var(--text)] uppercase tracking-wider text-[10px] sm:text-xs bg-[var(--surface-dim)] whitespace-nowrap">
                  {children}
                </th>
              ),
              td: ({ children }) => (
                <td className="p-3 text-[var(--text-muted)] leading-normal align-top">{children}</td>
              ),
              h2: ({ children }) => (
                <div className="flex items-center gap-2 mt-5 mb-2.5">
                  <div className="w-1 h-5 bg-[var(--primary)] rounded-full shrink-0" />
                  <h2 className="text-base sm:text-lg font-semibold text-[var(--text)] tracking-tight">{children}</h2>
                </div>
              ),
              h3: ({ children }) => (
                <h3 className="text-sm sm:text-base font-semibold text-[var(--text)] mt-3 mb-2 ml-3 border-l-2 border-[var(--border)] pl-3">
                  {children}
                </h3>
              ),
              p: ({ children }) => (
                <p className="text-sm leading-relaxed text-[var(--text-muted)] mb-2.5 last:mb-0">{children}</p>
              ),
              ul: ({ children }) => <ul className="space-y-2 mb-4">{children}</ul>,
              ol: ({ children }) => <ol className="space-y-2 mb-4">{children}</ol>,
              li: ({ children }) => (
                <li className="flex items-start gap-2 text-sm leading-relaxed text-[var(--text-muted)]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--primary)]/60 mt-2 shrink-0" />
                  {children}
                </li>
              ),
              strong: ({ children }) => (
                <strong className="font-semibold text-[var(--text)]">{children}</strong>
              ),
              blockquote: ({ children }) => (
                <div className="cl-panel cl-panel-info my-4">{children}</div>
              ),
              code: ({ children }) => (
                <code className="font-mono text-[0.8rem] bg-[var(--surface-dim)] border border-[var(--border)] px-1 py-0.5 rounded text-[var(--primary)]">
                  {children}
                </code>
              ),
              a: ({ href, children }) => (
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--primary)] underline underline-offset-2 hover:text-[var(--primary-hover)]"
                >
                  {children}
                </a>
              ),
            }}
          >
            {body}
          </ReactMarkdown>
        </div>

        {/* ── Medicine Image Gallery ── */}
        {(drugId || genericName || drugName) && (
          <div className="px-4 sm:px-6 md:px-8 py-4 border-t border-[var(--border)]/60">
            <MedicineImageGallery
              drugId={drugId || ''}
              genericName={genericName || drugName}
            />
          </div>
        )}
      </div>

      {/* ── Footer ── */}
      <div className="px-4 sm:px-6 md:px-8 py-3 border-t border-[var(--border)]/60 flex flex-col sm:flex-row items-center justify-between gap-2 text-[10px] text-[var(--text-muted)] font-sans select-none">
        <div className="flex items-center gap-1.5">
          <ShieldCheck size={13} className="text-[var(--success)]" />
          <span>
            {isSeeded
              ? 'Content reviewed per Kenyan Standard Treatment Guidelines. Verify before clinical use.'
              : 'Clinical content grounded in NLM / openFDA data. Verify against current STG before clinical use.'}
          </span>
        </div>
        <span className="font-mono font-bold px-2 py-0.5 rounded border border-[var(--border)]">
          {isSeeded ? 'KDI Seeded' : 'FDA/NLM Grounded'}
        </span>
      </div>
    </div>
  );
}

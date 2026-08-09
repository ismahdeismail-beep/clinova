import React, { useState } from 'react';
import { Eye, EyeOff, Download, BookOpen, FileText, Award, Clock, Target, FlaskConical, Pill, ArrowRight, History, Sparkles } from 'lucide-react';
import { STANDARD_EXAM_STRUCTURE, type ExamUnitSpec, type ExamModuleSpec, type ExamTrackSpec } from '../data/examPrepData';
import { getExamPrepPaper, type GeneratedPaper } from '../data/examPrepPapers';

// Count available paper variants for a unit (mock units have 3, real/OLD units have 1)
export const getPaperCount = (spec: ExamUnitSpec): number => {
  const isReal = spec.source === 'real';
  return isReal ? 1 : 3;
};

// Total papers across all units in a module
export const getModulePaperCount = (mod: ExamModuleSpec): number =>
  mod.units.reduce((sum, u) => sum + getPaperCount(u), 0);

// Total papers across all units in a track (derived, never hardcoded)
export const getTrackPaperCount = (track: ExamTrackSpec): number =>
  track.units.reduce((sum, u) => sum + getPaperCount(u), 0);

const txt = (v: any): string => {
  if (v == null) return '';
  if (typeof v === 'string') return v;
  if (Array.isArray(v)) return v.map((x: any) => (typeof x === 'string' ? x : JSON.stringify(x))).join('\n');
  if (typeof v === 'object') {
    // Handle nested { title, content } objects (common in Section B/C)
    if ('title' in v || 'content' in v) {
      const obj = v as Record<string, any>;
      const title = obj.title || '';
      const content = Array.isArray(obj.content) ? obj.content.join('\n') : (obj.content || '');
      return title ? `${title}\n${content}` : content;
    }
    return Object.entries(v)
      .map(([k, val]) => {
        // Handle nested { title, content } objects as values
        if (val && typeof val === 'object' && ('title' in val || 'content' in val)) {
          const obj = val as Record<string, any>;
          const title = obj.title || k;
          const content = Array.isArray(obj.content) ? obj.content.join('\n') : (obj.content || '');
          return `${title}\n${content}`;
        }
        return `${k}: ${typeof val === 'object' ? JSON.stringify(val) : val}`;
      })
      .join('\n\n');
  }
  return String(v);
};

const opts = (v: any): string[] => {
  if (!v) return [];
  if (Array.isArray(v)) return v.map((x) => (typeof x === 'string' ? x : JSON.stringify(x)));
  return [txt(v)];
};

// Split a bulky answer string into logical points without altering the wording.
const toPoints = (v: any): string[] => {
  const s = txt(v).trim();
  if (!s) return [];
  // Prefer existing line breaks / bullet markers.
  let parts = s
    .split(/\r?\n+|(?:^|\s)[•\-\u2022]\s+|\s*;\s+|\s+\d+[.)]\s+/g)
    .map((p) => p.replace(/^[•\-\u2022\s]+/, '').trim())
    .filter(Boolean);
  // Fall back to sentence splitting only if it stays a single long block.
  if (parts.length <= 1) {
    parts = s
      .split(/(?<=[.!?])\s+(?=[A-Z0-9])/g)
      .map((p) => p.trim())
      .filter(Boolean);
  }
  return parts.length ? parts : [s];
};

// Highlight doses, strengths and frequencies inside an answer point.
const DOSE_RE = /(\d[\d.,]*\s?(?:mg|mcg|µg|g|kg|ml|mL|L|IU|units?|%|mmol|mEq)(?:\/(?:kg|day|dose|hr|h|min|m2|m²))?|\b(?:od|bd|tds|qds|q\d+h|prn|stat|iv|im|sc|po)\b)/gi;
function HighlightDose({ text }: { text: string }) {
  const nodes: React.ReactNode[] = [];
  let last = 0;
  let m: RegExpExecArray | null;
  DOSE_RE.lastIndex = 0;
  while ((m = DOSE_RE.exec(text)) !== null) {
    if (m.index > last) nodes.push(text.slice(last, m.index));
    nodes.push(
      <span key={m.index} className="font-semibold text-indigo-600">
        {m[0]}
      </span>,
    );
    last = m.index + m[0].length;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return <>{nodes}</>;
}

function AnswerBody({ value }: { value: any }) {
  const points = toPoints(value);
  if (points.length <= 1) {
    return (
      <span className="text-emerald-700">
        <HighlightDose text={points[0] || ''} />
      </span>
    );
  }
  return (
    <ul className="mt-1 space-y-1 list-disc list-inside marker:text-emerald-500">
      {points.map((p, i) => (
        <li key={i} className="text-emerald-700 leading-relaxed">
          <HighlightDose text={p} />
        </li>
      ))}
    </ul>
  );
}

export function PaperCard({ spec, variant }: { spec: ExamUnitSpec; variant: number }) {
  const [showAnswers, setShowAnswers] = useState(false);
  const paper: GeneratedPaper | undefined = getExamPrepPaper(spec.id, variant);

  const download = () => {
    if (!paper) return;
    const lines: string[] = [];
    const paperType = spec.source === 'real' ? 'Past Paper' : `Mock Paper ${paper.variant || variant}`;
    lines.push(`${paper.title} — ${paperType}`);
    lines.push('='.repeat(60));
    lines.push('');
    paper.sections.forEach((sec) => {
      lines.push(`SECTION ${sec.letter}: ${sec.name} [${sec.marks} marks]`);
      lines.push('-'.repeat(40));
      sec.questions.forEach((q, i) => {
        lines.push(`${i + 1}. ${q.stem}`);
        if (q.options && q.options.length) q.options.forEach((o) => lines.push(`   ${o}`));
        lines.push('');
      });
      lines.push('');
    });
    if (showAnswers) {
      lines.push('');
      lines.push('ANSWER KEY');
      lines.push('='.repeat(60));
      paper.sections.forEach((sec) => {
        lines.push(`SECTION ${sec.letter}: ${sec.name}`);
        lines.push('-'.repeat(40));
        sec.questions.forEach((q, i) => {
          lines.push(`${i + 1}. ANSWER: ${q.answer || q.modelAnswer || ''}`);
          if (q.explanation) lines.push(`   EXPLANATION: ${q.explanation}`);
          lines.push('');
        });
      });
    }
    const blob = new Blob([lines.join('\n')], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${spec.id}-paper-${variant}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (!paper) {
    return (
      <div className="border border-[var(--border)] rounded-xl p-4 bg-[var(--surface)] text-xs text-[var(--text-muted)]">
        {spec.source === 'real' ? `Past Paper is not available` : `Mock Paper ${variant} is not available yet.`}
      </div>
    );
  }

  const paperLabel = spec.source === 'real'
    ? 'Past Paper'
    : (variant === 1 ? 'Paper One' : variant === 2 ? 'Paper Two' : `Paper ${variant}`);

  return (
    <div className="border-2 border-[var(--border)] rounded-2xl bg-[var(--surface)] overflow-hidden w-full">
      <div className="flex items-center justify-between gap-3 flex-wrap bg-[var(--primary)]/5 border-b border-[var(--border)] px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-[var(--primary)] text-[var(--primary-foreground)] text-xs font-bold">
            {variant}
          </span>
          <span className="text-sm font-bold text-[var(--primary)]">{paperLabel}</span>
          <span className="text-[11px] text-[var(--text-muted)]">
            {spec.structure.reduce((a, s) => a + s.count, 0)} questions ·{' '}
            {spec.structure.reduce((a, s) => a + s.marks, 0)} marks
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowAnswers((v) => !v)}
            className="flex items-center gap-1 text-[11px] px-2 py-1 rounded-lg border border-[var(--border)] hover:bg-[var(--surface-2)]"
          >
            {showAnswers ? <EyeOff size={13} /> : <Eye size={13} />}
            {showAnswers ? 'Hide Answers' : 'Show Answers'}
          </button>
          <button
            onClick={download}
            className="flex items-center gap-1 text-[11px] px-2 py-1 rounded-lg border border-[var(--border)] hover:bg-[var(--surface-2)]"
          >
            <Download size={13} /> Download
          </button>
        </div>
      </div>

      {/* Questions with inline answers */}
      <div className="p-4 sm:p-6 space-y-6">
        {paper.sections.map((sec) => (
          <div key={sec.letter} className="space-y-4">
            <div className="border-b border-[var(--border)] pb-2">
              <h4 className="text-[13px] font-bold text-[var(--text)]">
                Section {sec.letter}: {sec.name}{' '}
                <span className="text-[var(--text-muted)] font-normal">[{sec.marks} marks]</span>
              </h4>
              <p className="text-[11px] text-[var(--text-muted)] italic mt-0.5">{sec.instruction}</p>
            </div>
            <ol className="space-y-4 list-decimal list-inside">
              {sec.questions.map((q, i) => (
                <li key={i} className="text-[13px] text-[var(--text)] leading-relaxed">
                  <div className="font-medium">{txt(q.stem)}</div>
                  {opts(q.options).length > 0 && (
                    <ul className="mt-2 ml-6 list-[lower-alpha] space-y-1.5 text-[12px] text-[var(--text-muted)]">
                      {opts(q.options).map((o, oi) => (
                        <li key={oi}>{o}</li>
                      ))}
                    </ul>
                  )}
                  {showAnswers && (q.answer || q.modelAnswer) && (
                    <div className="mt-3 ml-6 space-y-2 border-l-2 border-emerald-500/30 pl-3 bg-emerald-500/5 rounded-r">
                      <div className="font-semibold text-emerald-700 uppercase tracking-wide text-[10px]">Answer</div>
                      <div className="text-emerald-700">
                        <AnswerBody value={q.answer || q.modelAnswer} />
                      </div>
                    </div>
                  )}
                  {showAnswers && q.explanation && (
                    <div className="mt-2 ml-6 text-[12px] text-[var(--text-muted)] italic border-l-2 border-blue-500/30 pl-2">
                      Explanation: {txt(q.explanation)}
                    </div>
                  )}
                </li>
              ))}
            </ol>
          </div>
        ))}
      </div>
    </div>
  );
}

export function UnitCard({ spec, onSelect }: { spec: ExamUnitSpec; onSelect: (unitId: string) => void }) {
  const paperCount = getPaperCount(spec);
  const totalQs = spec.structure.reduce((a, s) => a + s.count, 0);
  return (
    <button
      onClick={() => onSelect(spec.id)}
      className="w-full text-left border border-[var(--border)] rounded-2xl bg-[var(--surface)] p-5 hover:shadow-md hover:border-[var(--primary)]/40 transition-all group"
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-9 h-9 rounded-xl bg-[var(--primary)]/10 flex items-center justify-center shrink-0">
            <FileText size={16} className="text-[var(--primary)]" />
          </div>
          <div className="min-w-0">
            <div className="font-bold text-[var(--text)] text-sm truncate">{spec.title}</div>
            <div className="text-[11px] text-[var(--text-muted)]">
              {spec.year && spec.trimester ? `Year ${spec.year} · Trimester ${spec.trimester} · ` : ''}
              {spec.structure.length} sections · {totalQs} questions · {paperCount} paper{paperCount !== 1 ? 's' : ''}
            </div>
          </div>
        </div>
        <ArrowRight size={18} className="text-[var(--text-muted)] group-hover:text-[var(--primary)] group-hover:translate-x-0.5 transition-all shrink-0" />
      </div>
      {spec.topics.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-3">
          {spec.topics.slice(0, 4).map((t, i) => (
            <span key={i} className="text-[10px] px-2 py-0.5 rounded-full bg-[var(--surface-2)] border border-[var(--border)] text-[var(--text-muted)]">
              {t}
            </span>
          ))}
        </div>
      )}
    </button>
  );
}

export function PaperLinkCard({ spec, variant, onSelect }: { spec: ExamUnitSpec; variant: number; onSelect: (variant: number) => void }) {
  const paper = getExamPrepPaper(spec.id, variant);
  const label = spec.source === 'real' ? 'Past Paper' : variant === 1 ? 'Paper One' : variant === 2 ? 'Paper Two' : `Paper ${variant}`;
  const qCount = paper ? paper.sections.reduce((a, s) => a + s.questions.length, 0) : 0;
  const marks = spec.structure.reduce((a, s) => a + s.marks, 0);
  return (
    <button
      onClick={() => onSelect(variant)}
      className="w-full text-left border border-[var(--border)] rounded-2xl bg-[var(--surface)] p-5 hover:shadow-md hover:border-[var(--primary)]/40 transition-all group"
    >
      <div className="flex items-center gap-3">
        <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-[var(--primary)] text-[var(--primary-foreground)] text-xs font-bold shrink-0">
          {variant}
        </span>
        <div className="flex-1 min-w-0">
          <div className="font-bold text-[var(--text)] text-sm">{label}</div>
          <div className="text-[11px] text-[var(--text-muted)]">
            {qCount} questions · {marks} marks
          </div>
        </div>
        <Eye size={16} className="text-[var(--text-muted)] group-hover:text-[var(--primary)] transition-colors shrink-0" />
      </div>
    </button>
  );
}

export function ModuleCard({ mod, onSelect }: { mod: ExamModuleSpec; onSelect: (id: string) => void }) {
  const Icon = mod.id === 'clinical-pharmacy-exam' ? Award : FlaskConical;
  return (
    <button
      onClick={() => onSelect(mod.id)}
      className="w-full border border-[var(--border)] rounded-2xl overflow-hidden bg-[var(--surface)] hover:shadow-md hover:border-[var(--primary)]/40 transition-all group text-left"
    >
      <div className="p-6 space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-[var(--primary)]/10 flex items-center justify-center">
            <Icon size={24} className="text-[var(--primary)]" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-[var(--text)]">{mod.title}</h3>
            <p className="text-[12px] text-[var(--text-muted)]">{mod.tracks.length} curriculum tracks · {mod.units.length} units · {getModulePaperCount(mod)} papers</p>
          </div>
          <ArrowRight size={20} className="text-[var(--text-muted)] group-hover:text-[var(--primary)] transition-colors" />
        </div>
        <p className="text-sm text-[var(--text-muted)] leading-relaxed">{mod.description}</p>
        <div className="flex flex-wrap gap-2">
          {mod.units.map((u) => (
            <span key={u.id} className="text-[11px] px-2.5 py-1 rounded-full bg-[var(--surface-2)] border border-[var(--border)] text-[var(--text-muted)]">
              {u.title}
            </span>
          ))}
        </div>
      </div>
    </button>
  );
}

export function TrackCard({ track, onSelect }: { track: ExamTrackSpec; onSelect: (trackId: string) => void }) {
  const Icon = track.id === 'traditional' ? History : Sparkles;
  const paperCount = getTrackPaperCount(track);
  return (
    <button
      onClick={() => onSelect(track.id)}
      className="w-full border border-[var(--border)] rounded-2xl overflow-hidden bg-[var(--surface)] hover:shadow-md hover:border-[var(--primary)]/40 transition-all group text-left"
    >
      <div className="p-6 space-y-4">
        <div className="flex items-center gap-3">
          <div
            className={`w-12 h-12 rounded-xl flex items-center justify-center ${
              track.id === 'traditional' ? 'bg-amber-500/10' : 'bg-emerald-500/10'
            }`}
          >
            <Icon size={24} className={track.id === 'traditional' ? 'text-amber-600' : 'text-emerald-600'} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold text-[var(--text)]">{track.title}</h3>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[var(--surface-2)] border border-[var(--border)] text-[var(--text-muted)]">
                {track.badge}
              </span>
            </div>
            <p className="text-[12px] text-[var(--text-muted)]">
              {track.units.length} units · {paperCount} papers
            </p>
          </div>
          <ArrowRight size={20} className="text-[var(--text-muted)] group-hover:text-[var(--primary)] transition-colors" />
        </div>
        <p className="text-sm text-[var(--text-muted)] leading-relaxed">{track.description}</p>
      </div>
    </button>
  );
}

export function ModuleOverview({ mod }: { mod: ExamModuleSpec }) {
  const isClinicalPharmacy = mod.id === 'clinical-pharmacy-exam';
  const Icon = isClinicalPharmacy ? Award : Pill;
  const title = isClinicalPharmacy ? 'Clinical Pharmacy Exam Overview' : 'Pharmacology Exam Overview';

  return (
    <div className="border-2 border-[var(--primary)]/20 rounded-2xl bg-[var(--primary)]/5 overflow-hidden">
      <div className="px-5 py-4 border-b border-[var(--border)]">
        <div className="flex items-center gap-2 mb-1">
          <Icon size={16} className="text-[var(--primary)]" />
          <h3 className="text-sm font-bold text-[var(--text)]">{title}</h3>
        </div>
        <p className="text-[11px] text-[var(--text-muted)]">
          Two curriculum tracks — {mod.tracks.map((t) => t.shortLabel).join(' & ')} — standard format: 100 marks total
        </p>
      </div>
      <div className="p-5 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {STANDARD_EXAM_STRUCTURE.map((sec) => (
            <div key={sec.letter} className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-3.5">
              <div className="flex items-center justify-between mb-2">
                <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-[var(--primary)] text-[var(--primary-foreground)] text-xs font-bold">
                  {sec.letter}
                </span>
                <span className="text-lg font-bold text-[var(--primary)]">{sec.marks}<span className="text-[10px] font-normal text-[var(--text-muted)] ml-0.5">marks</span></span>
              </div>
              <div className="text-[13px] font-semibold text-[var(--text)]">{sec.name}</div>
              <div className="text-[11px] text-[var(--text-muted)] mt-1">{sec.count} {sec.count === 1 ? 'question' : 'questions'}</div>
              <div className="text-[10px] text-[var(--text-muted)] mt-1 italic">{sec.instruction}</div>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-3 text-[11px] text-[var(--text-muted)]">
          <div className="flex items-center gap-1.5">
            <Target size={13} className="text-[var(--primary)]" />
            <span><strong className="text-[var(--text)]">Total:</strong> 100 marks</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock size={13} className="text-[var(--primary)]" />
            <span><strong className="text-[var(--text)]">Duration:</strong> 3 hours</span>
          </div>
          <div className="flex items-center gap-1.5">
            <BookOpen size={13} className="text-[var(--primary)]" />
            <span>
              <strong className="text-[var(--text)]">Tracks:</strong>{' '}
              {mod.tracks.map((t) => `${t.shortLabel} (${t.units.length} units)`).join(' · ')}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

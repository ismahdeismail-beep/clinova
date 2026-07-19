import React, { useState } from 'react';
import { Sparkles, Eye, EyeOff, Download, BookOpen, FileText, CheckCircle2 } from 'lucide-react';
import { EXAM_PREP_UNITS, type ExamUnitSpec } from '../data/examPrepData';
import { getExamPrepPaper, type GeneratedPaper } from '../data/examPrepPapers';

const txt = (v: any): string => {
  if (v == null) return '';
  if (typeof v === 'string') return v;
  if (Array.isArray(v)) return v.map((x) => (typeof x === 'string' ? x : JSON.stringify(x))).join('\n');
  if (typeof v === 'object') {
    return Object.entries(v)
      .map(([k, val]) => `${k}: ${typeof val === 'object' ? JSON.stringify(val) : val}`)
      .join('\n');
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

function PaperCard({ spec, variant }: { spec: ExamUnitSpec; variant: number }) {
  const [showAnswerKey, setShowAnswerKey] = useState(false);
  const paper: GeneratedPaper | undefined = getExamPrepPaper(spec.id, variant);

  const download = () => {
    if (!paper) return;
    const lines: string[] = [];
    lines.push(`${paper.title} — Mock Paper ${paper.variant || variant}`);
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
    if (showAnswerKey) {
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
        Mock Paper {variant} is not available yet.
      </div>
    );
  }

  const paperLabel = variant === 1 ? 'Paper One' : variant === 2 ? 'Paper Two' : `Paper ${variant}`;

  return (
    <div className="border-2 border-[var(--border)] rounded-2xl bg-[var(--surface)] overflow-hidden">
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
            onClick={() => setShowAnswerKey((v) => !v)}
            className="flex items-center gap-1 text-[11px] px-2 py-1 rounded-lg border border-[var(--border)] hover:bg-[var(--surface-2)]"
          >
            {showAnswerKey ? <EyeOff size={13} /> : <Eye size={13} />}
            {showAnswerKey ? 'Hide Answer Key' : 'Show Answer Key'}
          </button>
          <button
            onClick={download}
            className="flex items-center gap-1 text-[11px] px-2 py-1 rounded-lg border border-[var(--border)] hover:bg-[var(--surface-2)]"
          >
            <Download size={13} /> Download
          </button>
        </div>
      </div>

      {/* Questions - clean, spacious layout */}
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
                </li>
              ))}
            </ol>
          </div>
        ))}
      </div>

      {/* Answer Key - separate section at the end */}
      {showAnswerKey && (
        <div className="border-t-2 border-[var(--primary)] bg-[var(--primary)]/5 p-4 sm:p-6 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-[var(--primary)]">Answer Key</h3>
            <button
              onClick={() => setShowAnswerKey(false)}
              className="text-sm text-[var(--text-muted)] hover:text-[var(--text)]"
            >
              Close Answer Key
            </button>
          </div>
          {paper.sections.map((sec) => (
            <div key={sec.letter} className="space-y-3">
              <h4 className="text-sm font-bold text-[var(--primary)] border-b border-[var(--primary)]/20 pb-1">
                Section {sec.letter}: {sec.name}
              </h4>
              <ol className="space-y-3 list-decimal list-inside">
                {sec.questions.map((q, i) => (
                  <li key={i} className="text-[13px] text-[var(--text)] leading-relaxed">
                    <div className="font-semibold text-emerald-700">
                      Q{i + 1}. Answer: {txt(q.answer || q.modelAnswer || 'Not provided')}
                    </div>
                    {q.explanation && (
                      <div className="mt-1 ml-5 text-[12px] text-[var(--text-muted)] italic border-l-2 border-emerald-500/30 pl-2">
                        Explanation: {txt(q.explanation)}
                      </div>
                    )}
                  </li>
                ))}
            </ol>
          </div>
        ))}
      </div>
      )}
    </div>
  );
}

function ExamSubjectCard({ spec }: { spec: ExamUnitSpec }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border border-[var(--border)] rounded-2xl overflow-hidden bg-[var(--surface)]">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between gap-3 px-5 py-4 hover:bg-[var(--surface-2)] transition-colors"
      >
        <div className="flex items-center gap-3 text-left">
          {open ? <BookOpen size={18} className="text-[var(--primary)]" /> : <FileText size={18} className="text-[var(--text-muted)]" />}
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-[var(--text)]">{spec.title}</span>
            </div>
            <span className="text-[11px] text-[var(--text-muted)]">
              {spec.structure.length} sections · {spec.structure.reduce((a, s) => a + s.marks, 0)} marks ·{' '}
              {spec.topics.length} topic areas
            </span>
          </div>
        </div>
        {open ? null : <CheckCircle2 size={16} className="text-emerald-500" />}
      </button>

      {open && (
        <div className="px-5 pb-5 space-y-5">
          <div className="grid gap-2 sm:grid-cols-3">
            {spec.structure.map((s) => (
              <div key={s.letter} className="rounded-xl border border-[var(--border)] p-3">
                <div className="flex items-center gap-2 text-[12px] font-bold text-[var(--primary)]">
                  Section {s.letter}
                </div>
                <div className="text-[12px] text-[var(--text)] mt-1">{s.name}</div>
                <div className="text-[11px] text-[var(--text-muted)]">
                  {s.count} Qs · {s.marks} marks
                </div>
                <div className="text-[11px] text-[var(--text-muted)] mt-1 italic">{s.instruction}</div>
              </div>
            ))}
          </div>

          <div>
            <div className="text-[12px] font-bold text-[var(--text)] mb-2 flex items-center gap-2">
              <FileText size={14} className="text-[var(--primary)]" /> Topics covered (from the latest past paper)
            </div>
            <div className="flex flex-wrap gap-2">
              {spec.topics.map((t, i) => (
                <span
                  key={i}
                  className="text-[11px] px-2 py-1 rounded-full bg-[var(--surface-2)] border border-[var(--border)] text-[var(--text-muted)]"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="text-[12px] font-bold text-[var(--text)]">Mock Papers</div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <PaperCard spec={spec} variant={1} />
              <PaperCard spec={spec} variant={2} />
              <PaperCard spec={spec} variant={3} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ExamPrepView({ subjectId }: { subjectId?: string }) {
  const specs = subjectId ? EXAM_PREP_UNITS.filter((s) => s.id === subjectId) : EXAM_PREP_UNITS;
  return (
    <div className="space-y-5">
      <div className="flex items-center gap-2">
        <Sparkles size={18} className="text-[var(--primary)]" />
        <h2 className="text-lg font-bold text-[var(--text)]">Exam Prep</h2>
      </div>
      <p className="text-sm text-[var(--text-muted)]">
        Practice papers modelled on the real clinical-pharmacy exam pattern. Each subject shows the section
        structure and topic areas drawn from the most recent past paper, then provides three full mock papers
        (Section A MCQs — 30 marks, Section B short answers — 8 questions / 40 marks, Section C long answers —
        2 questions / 30 marks) generated from that exam's content. Toggle answers to self-mark.
      </p>
      <div className="space-y-4">
        {specs.map((spec) => (
          <ExamSubjectCard key={spec.id} spec={spec} />
        ))}
      </div>
    </div>
  );
}

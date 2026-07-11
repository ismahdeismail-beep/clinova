// Heuristic parsers that turn the free-text clinical_case fields
// (vitals, labs, dtps) into structured shapes for the redesigned UI.
// These are best-effort and fall back to rendering the raw string.

export function toArray(value: unknown): string[] {
  if (!value) return [];
  if (Array.isArray(value)) return value.map((v) => String(v));
  return String(value)
    .split(/\n+/)
    .map((s) => s.replace(/^\s*[\d]+\.\s*/, '').trim())
    .filter(Boolean);
}

export function toText(value: unknown): string {
  if (!value) return '';
  if (Array.isArray(value)) return value.join('\n');
  return String(value);
}

export interface Vital {
  label: string;
  value: string;
  unit?: string;
  abnormal: boolean;
}

const VITAL_RULES: Record<string, (n: number) => boolean> = {
  hr: (n) => n > 100 || n < 60,
  rr: (n) => n > 20 || n < 12,
  temp: (n) => n > 37.8 || n < 35,
  spo2: (n) => n < 92,
  bp: () => false, // handled specially
};

export function parseVitals(input: unknown): Vital[] | null {
  const text = toText(input).trim();
  if (!text) return null;
  const parts = text.split(',').map((p) => p.trim()).filter(Boolean);
  if (parts.length === 0) return null;
  const out: Vital[] = [];
  for (const part of parts) {
    const m = part.match(/^([A-Za-z\/ ]+?)\s*[:：]?\s*([\d./]+)\s*([A-Za-z%°\/]+)?/);
    if (!m) {
      out.push({ label: part, value: '', abnormal: false });
      continue;
    }
    const label = m[1].trim().toLowerCase();
    const value = m[2];
    const unit = m[3];
    let abnormal = false;
    if (label.includes('bp')) {
      const nums = value.match(/\d+/g);
      if (nums && nums.length >= 2) {
        const [sys, dia] = nums.map(Number);
        abnormal = sys < 90 || sys > 180 || dia < 60 || dia > 120;
      }
    } else {
      const key = Object.keys(VITAL_RULES).find((k) => label.includes(k));
      if (key) {
        const n = parseFloat(value);
        if (!Number.isNaN(n)) abnormal = VITAL_RULES[key](n);
      }
    }
    out.push({ label: m[1].trim(), value, unit, abnormal });
  }
  return out;
}

export interface Lab {
  test: string;
  value: string;
  unit?: string;
  range?: string;
  abnormal: boolean;
}

export function parseLabs(input: unknown): Lab[] | null {
  const text = toText(input).trim();
  if (!text) return null;
  // Split on ". " that is followed by a capitalised test name or known marker.
  const segments = text
    .split(/\.\s+(?=[A-Za-z])/)
    .map((s) => s.trim())
    .filter(Boolean);
  if (segments.length === 0) return null;
  const out: Lab[] = [];
  for (const seg of segments) {
    const rangeMatch = seg.match(/\(([^)]*?)\)/);
    const range = rangeMatch ? rangeMatch[1] : undefined;
    const withoutRange = rangeMatch ? seg.replace(rangeMatch[0], '') : seg;
    const m = withoutRange.match(/^([A-Za-z][A-Za-z\s/]*?)\s*[:：]?\s*([\d.]+(?:\s?[a-zA-Z%/]+)?|pending|positive|negative|raised|low|high|normal)/i);
    if (!m) {
      out.push({ test: seg, value: '', abnormal: false });
      continue;
    }
    const test = m[1].trim();
    const value = m[2].trim();
    const unitMatch = value.match(/([a-zA-Z%/°]+)$/);
    const unit = unitMatch && !/^(pending|positive|negative|raised|low|high|normal)$/i.test(value) ? unitMatch[1] : undefined;
    let abnormal = false;
    const num = parseFloat(value);
    if (!Number.isNaN(num) && range) {
      const bounds = range.match(/([\d.]+)\s*[-–]\s*([\d.]+)/);
      if (bounds) {
        const lo = parseFloat(bounds[1]);
        const hi = parseFloat(bounds[2]);
        if (!Number.isNaN(lo) && !Number.isNaN(hi)) abnormal = num < lo || num > hi;
      }
    }
    out.push({ test, value, unit: unit?.replace(value, '').trim() || unit, range, abnormal });
  }
  return out;
}

export function parseDtps(input: unknown): string[] {
  const text = toText(input);
  if (!text) return [];
  // Numbered list "1. ... 2. ..." or newline separated.
  if (/\d+\.\s/.test(text)) {
    return text
      .split(/\d+\.\s/)
      .map((s) => s.trim())
      .filter(Boolean);
  }
  return toArray(text);
}

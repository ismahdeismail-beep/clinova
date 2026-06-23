export type LogLevel = 'debug' | 'info' | 'warn' | 'error';
export type LogCategory = 'system' | 'auth' | 'workflow' | 'storage' | 'navigation' | 'ui' | 'network' | 'sync';

interface LogEntry {
  level: LogLevel;
  category: LogCategory;
  message: string;
  data?: unknown;
  timestamp: number;
  sessionId: string;
}

const MAX_LOG_ENTRIES = 500;
const STORAGE_KEY = 'clinova-log';
let entries: LogEntry[] = [];
let sessionId = crypto.randomUUID?.() ?? Date.now().toString(36);
let enabled = true;

function persist(): void {
  try {
    const tail = entries.slice(-MAX_LOG_ENTRIES);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tail));
  } catch { }
}

function addEntry(level: LogLevel, category: LogCategory, message: string, data?: unknown): void {
  if (!enabled) return;
  const entry: LogEntry = { level, category, message, data, timestamp: Date.now(), sessionId };
  entries.push(entry);
  if (entries.length > MAX_LOG_ENTRIES) entries = entries.slice(-MAX_LOG_ENTRIES);
  persist();
}

export const logger = {
  enable: () => { enabled = true; },
  disable: () => { enabled = false; },

  debug: (category: LogCategory, message: string, data?: unknown) => addEntry('debug', category, message, data),
  info: (category: LogCategory, message: string, data?: unknown) => addEntry('info', category, message, data),
  warn: (category: LogCategory, message: string, data?: unknown) => addEntry('warn', category, message, data),
  error: (category: LogCategory, message: string, data?: unknown) => addEntry('error', category, message, data),

  getEntries: (): LogEntry[] => [...entries],

  getByLevel: (level: LogLevel): LogEntry[] => entries.filter((e) => e.level === level),

  getRecent: (count = 50): LogEntry[] => entries.slice(-count),

  clear: () => {
    entries = [];
    try { localStorage.removeItem(STORAGE_KEY); } catch { }
  },

  loadPersisted: () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) entries = JSON.parse(stored);
    } catch {
      entries = [];
    }
  },

  getSummary: () => ({
    total: entries.length,
    errors: entries.filter((e) => e.level === 'error').length,
    warnings: entries.filter((e) => e.level === 'warn').length,
    sessionId,
  }),
};

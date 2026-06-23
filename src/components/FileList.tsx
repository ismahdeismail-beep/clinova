import { useEffect, useState } from 'react';
import { FileText, Image, File as FileIcon, Trash2, Download, AlertCircle } from 'lucide-react';
import { motion } from 'motion/react';
import type { StoredFile } from '../types/engine';
import { StorageService } from '../services/storage.service';

const MIME_ICONS: Record<string, typeof FileText> = {
  'image/': Image,
  'application/pdf': FileText,
};

function getFileIcon(mime: string) {
  const key = Object.keys(MIME_ICONS).find((k) => mime.startsWith(k));
  return key ? MIME_ICONS[key] : FileIcon;
}

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes}B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)}KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)}MB`;
}

function formatDate(ts: number): string {
  return new Date(ts).toLocaleDateString('en-KE', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

interface FileListProps {
  files: StoredFile[];
  loading?: boolean;
  onDelete?: (fileId: string) => void;
}

export default function FileList({ files, loading, onDelete }: FileListProps) {
  const [urls, setUrls] = useState<Record<string, string>>({});
  const [deleting, setDeleting] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      const map: Record<string, string> = {};
      for (const f of files) {
        try {
          const url = await StorageService.getFileUrl(f.id);
          if (url) map[f.id] = url;
        } catch {
          // skip
        }
      }
      setUrls(map);
    };
    if (files.length > 0) load();
  }, [files]);

  const handleDelete = async (fileId: string) => {
    setDeleting(fileId);
    setError(null);
    try {
      await StorageService.deleteFile(fileId);
      onDelete?.(fileId);
    } catch {
      setError('Failed to delete file');
    } finally {
      setDeleting(null);
    }
  };

  const handleDownload = async (fileId: string) => {
    const url = urls[fileId];
    if (!url) return;
    const a = document.createElement('a');
    a.href = url;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    a.click();
  };

  if (loading) {
    return (
      <div className="space-y-2">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-14 rounded-lg bg-[var(--surface-dim)] animate-pulse" />
        ))}
      </div>
    );
  }

  if (files.length === 0) {
    return (
      <div className="text-center py-8 text-sm text-[var(--text-muted)]">
        No files uploaded yet
      </div>
    );
  }

  return (
    <div className="space-y-1">
      {error && (
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[var(--danger-container)] text-sm text-[var(--danger)] mb-2">
          <AlertCircle size={14} />
          {error}
        </div>
      )}
      {files.map((file, i) => {
        const Icon = getFileIcon(file.mimeType);
        return (
          <motion.div
            key={file.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: i * 0.03 }}
            className="group flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-[var(--surface-dim)] transition-colors"
          >
            <Icon size={18} className="text-[var(--primary)] shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-[var(--text)] truncate">
                {file.originalName}
              </p>
              <p className="text-xs text-[var(--text-muted)]">
                {formatSize(file.size)} &middot; {formatDate(file.createdAt)}
              </p>
            </div>
            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              {urls[file.id] && (
                <button
                  onClick={() => handleDownload(file.id)}
                  className="p-1.5 rounded text-[var(--text-muted)] hover:text-[var(--primary)] hover:bg-[var(--surface)]"
                  title="Download"
                >
                  <Download size={14} />
                </button>
              )}
              {onDelete && (
                <button
                  onClick={() => handleDelete(file.id)}
                  disabled={deleting === file.id}
                  className="p-1.5 rounded text-[var(--text-muted)] hover:text-[var(--danger)] hover:bg-[var(--surface)] disabled:opacity-50"
                  title="Delete"
                >
                  <Trash2 size={14} />
                </button>
              )}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

import { useState, useRef, useCallback, type ChangeEvent, type DragEvent } from 'react';
import { Upload, X, FileText, Image, File as FileIcon, AlertCircle } from 'lucide-react';
import { useFileStore } from '../store/fileStore';
import type { FileCategory, FileUploadOptions, UploadProgress } from '../types/engine';
import { StorageService } from '../services/storage.service';

interface FileUploaderProps {
  category: FileCategory;
  patientId?: string;
  studyId?: string;
  allowedMimeTypes?: string[];
  maxSizeMB?: number;
  onUploadComplete?: (fileId: string) => void;
}

const MIME_ICONS: Record<string, typeof FileText> = {
  'image/': Image,
  'application/pdf': FileText,
  'text/': FileText,
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

export default function FileUploader({
  category,
  patientId,
  studyId,
  allowedMimeTypes,
  maxSizeMB = 10,
  onUploadComplete,
}: FileUploaderProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [localProgress, setLocalProgress] = useState<UploadProgress | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [previews, setPreviews] = useState<{ name: string; size: number; mime: string }[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  const { setUploading, addFile } = useFileStore();

  const maxBytes = maxSizeMB * 1024 * 1024;

  const processFiles = useCallback(async (files: FileList | File[]) => {
    setError(null);
    setPreviews([]);

    const valid: File[] = [];
    for (const file of Array.from(files)) {
      if (allowedMimeTypes && !allowedMimeTypes.some((t) => file.type.startsWith(t))) {
        setError(`"${file.name}" has unsupported type.`);
        continue;
      }
      if (file.size > maxBytes) {
        setError(`"${file.name}" exceeds ${maxSizeMB}MB limit.`);
        continue;
      }
      valid.push(file);
    }

    if (valid.length === 0) return;

    setPreviews(valid.map((f) => ({ name: f.name, size: f.size, mime: f.type })));
    setUploading(true);

    abortRef.current = new AbortController();

    for (const file of valid) {
      setLocalProgress({ bytesTransferred: 0, totalBytes: file.size, percentage: 0 });

      try {
        const options: FileUploadOptions = {
          category,
          patientId,
          studyId,
          accessScope: 'private',
        };

        const result = await StorageService.uploadFile(file, options, setLocalProgress);

        if (result.success && result.data) {
          addFile(result.data.file);
          onUploadComplete?.(result.data.file.id);
        } else {
          setError(`Failed to upload "${file.name}": ${result.error?.message || 'Unknown error'}`);
        }
      } catch (err: any) {
        if (err?.name === 'AbortError') return;
        setError(`Failed to upload "${file.name}": ${err?.message || 'Unknown error'}`);
      }
    }

    setUploading(false);
    setLocalProgress(null);
    setPreviews([]);
  }, [category, patientId, studyId, allowedMimeTypes, maxBytes, maxSizeMB, setUploading, addFile, onUploadComplete]);

  const handleDrop = useCallback((e: DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    processFiles(e.dataTransfer.files);
  }, [processFiles]);

  const handleDragOver = useCallback((e: DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragOver(false);
  }, []);

  const handleFileSelect = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      processFiles(e.target.files);
      e.target.value = '';
    }
  }, [processFiles]);

  const handleCancel = () => {
    abortRef.current?.abort();
    setLocalProgress(null);
    setUploading(false);
    setPreviews([]);
  };

  return (
    <div className="space-y-3">
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => inputRef.current?.click()}
        className={`relative border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all ${
          isDragOver
            ? 'border-[var(--primary)] bg-[var(--primary-container)]'
            : 'border-[var(--border)] hover:border-[var(--primary)] hover:bg-[var(--surface-dim)]'
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          multiple
          onChange={handleFileSelect}
          className="hidden"
          accept={allowedMimeTypes?.join(',')}
        />
        <div className="flex flex-col items-center gap-2">
          <div className="w-10 h-10 rounded-lg bg-[var(--primary-container)] flex items-center justify-center">
            <Upload size={20} className="text-[var(--primary)]" />
          </div>
          <p className="text-sm font-medium text-[var(--text)]">
            {isDragOver ? 'Drop files here' : 'Drag & drop files or click to browse'}
          </p>
          <p className="text-xs text-[var(--text-muted)]">
            Max {maxSizeMB}MB per file
          </p>
        </div>
      </div>

      {previews.length > 0 && (
        <div className="space-y-2">
          {previews.map((p, i) => {
            const Icon = getFileIcon(p.mime);
            return (
              <div
                key={i}
                className="flex items-center gap-3 px-3 py-2 rounded-lg bg-[var(--surface-dim)] text-sm"
              >
                <Icon size={16} className="text-[var(--primary)] shrink-0" />
                <span className="flex-1 truncate text-[var(--text)]">{p.name}</span>
                <span className="text-xs text-[var(--text-muted)]">{formatSize(p.size)}</span>
                {localProgress && localProgress.percentage < 100 ? (
                  <div className="flex items-center gap-2">
                    <div className="w-20 h-1.5 rounded-full bg-[var(--border)] overflow-hidden">
                      <div
                        className="h-full bg-[var(--primary)] rounded-full transition-all duration-200"
                        style={{ width: `${localProgress.percentage}%` }}
                      />
                    </div>
                    <span className="text-xs text-[var(--text-muted)] w-8 text-right">
                      {localProgress.percentage}%
                    </span>
                  </div>
                ) : (
                  <span className="text-xs text-[var(--success)]">Uploaded</span>
                )}
              </div>
            );
          })}
          {localProgress && localProgress.percentage < 100 && (
            <button
              onClick={handleCancel}
              className="flex items-center gap-1 text-xs text-[var(--danger)] hover:underline"
            >
              <X size={12} /> Cancel
            </button>
          )}
        </div>
      )}

      {error && (
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[var(--danger-container)] text-sm text-[var(--danger)]">
          <AlertCircle size={14} />
          <span>{error}</span>
          <button onClick={() => setError(null)} className="ml-auto">
            <X size={14} />
          </button>
        </div>
      )}
    </div>
  );
}

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
  const [uploadStates, setUploadStates] = useState<Record<string, {
    key: string;
    name: string;
    size: number;
    mime: string;
    progress: number;
    status: 'uploading' | 'completed' | 'failed';
    error?: string;
  }>>({});
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const { setUploading, addFile } = useFileStore();

  const maxBytes = maxSizeMB * 1024 * 1024;

  const processFiles = useCallback(async (files: FileList | File[]) => {
    setError(null);

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

    // Set uploading state in Zustand store
    setUploading(true);

    // Prepare abort controller for this batch
    abortControllerRef.current = new AbortController();
    const signal = abortControllerRef.current.signal;

    // Initialize state for each file
    const initialStates: typeof uploadStates = {};
    const fileTasks = valid.map((file, index) => {
      const key = `${file.name}-${file.size}-${index}-${Date.now()}`;
      initialStates[key] = {
        key,
        name: file.name,
        size: file.size,
        mime: file.type,
        progress: 0,
        status: 'uploading',
      };
      return { file, key };
    });

    setUploadStates((prev) => ({ ...prev, ...initialStates }));

    // Execute uploads in parallel
    await Promise.all(
      fileTasks.map(async ({ file, key }) => {
        try {
          const options: FileUploadOptions = {
            category,
            patientId,
            studyId,
            accessScope: 'private',
          };

          const result = await StorageService.uploadFile(
            file,
            options,
            (progress) => {
              setUploadStates((prev) => {
                if (!prev[key]) return prev;
                return {
                  ...prev,
                  [key]: {
                    ...prev[key],
                    progress: progress.percentage,
                  },
                };
              });
            },
            signal,
          );

          // Update individual file upload as completed
          setUploadStates((prev) => {
            if (!prev[key]) return prev;
            return {
              ...prev,
              [key]: {
                ...prev[key],
                progress: 100,
                status: 'completed',
              },
            };
          });

          // Update file list in global store
          addFile(result.file);
          onUploadComplete?.(result.file.id);
        } catch (err: any) {
          if (err?.name === 'AbortError') return;
          console.error(`Error uploading file ${file.name}`, err);

          setUploadStates((prev) => {
            if (!prev[key]) return prev;
            return {
              ...prev,
              [key]: {
                ...prev[key],
                status: 'failed',
                error: err?.message || 'Upload failed',
              },
            };
          });
        }
      })
    );

    // Set uploading to false in Zustand store when all tasks finish
    setUploading(false);
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
    abortControllerRef.current?.abort();
    setUploading(false);
    // Remove ongoing uploads from the list
    setUploadStates((prev) => {
      const next = { ...prev };
      for (const k of Object.keys(next)) {
        if (next[k].status === 'uploading') {
          delete next[k];
        }
      }
      return next;
    });
  };

  const removeStateItem = (key: string) => {
    setUploadStates((prev) => {
      const next = { ...prev };
      delete next[key];
      return next;
    });
  };

  const uploadItems = Object.values(uploadStates);
  const isAnyUploading = uploadItems.some((item) => item.status === 'uploading');

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
            {isDragOver ? 'Drop files here' : 'Drag & drop files (PDF/Images) or click to browse'}
          </p>
          <p className="text-xs text-[var(--text-muted)]">
            Supports multiple uploads up to {maxSizeMB}MB each
          </p>
        </div>
      </div>

      {uploadItems.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">
              Upload Progress ({uploadItems.filter(i => i.status === 'completed').length}/{uploadItems.length})
            </span>
            {isAnyUploading && (
              <button
                onClick={handleCancel}
                className="flex items-center gap-1 text-xs text-[var(--danger)] hover:underline font-medium cursor-pointer"
              >
                <X size={12} /> Cancel Pending
              </button>
            )}
          </div>

          <div className="space-y-1.5 max-h-60 overflow-y-auto pr-1">
            {uploadItems.map((item) => {
              const Icon = getFileIcon(item.mime);
              return (
                <div
                  key={item.key}
                  className="flex flex-col gap-1.5 p-3 rounded-xl bg-[var(--surface-dim)] border border-[var(--border)]/40 text-sm"
                >
                  <div className="flex items-center gap-2.5">
                    <Icon size={16} className="text-[var(--primary)] shrink-0" />
                    <span className="flex-1 truncate text-xs font-semibold text-[var(--text)]">
                      {item.name}
                    </span>
                    <span className="text-[10px] text-[var(--text-muted)] font-medium">
                      {formatSize(item.size)}
                    </span>
                    
                    {item.status === 'completed' && (
                      <span className="text-[10px] bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold px-2 py-0.5 rounded-full">
                        Success
                      </span>
                    )}
                    {item.status === 'failed' && (
                      <span className="text-[10px] bg-red-500/10 text-red-600 dark:text-red-400 font-semibold px-2 py-0.5 rounded-full">
                        Failed
                      </span>
                    )}
                    
                    {item.status !== 'uploading' && (
                      <button
                        onClick={() => removeStateItem(item.key)}
                        className="text-[var(--text-muted)] hover:text-[var(--text)]"
                      >
                        <X size={12} />
                      </button>
                    )}
                  </div>

                  {item.status === 'uploading' && (
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-1.5 rounded-full bg-[var(--border)] overflow-hidden">
                        <div
                          className="h-full bg-[var(--primary)] rounded-full transition-all duration-200"
                          style={{ width: `${item.progress}%` }}
                        />
                      </div>
                      <span className="text-[10px] text-[var(--text-muted)] w-8 text-right font-semibold">
                        {item.progress}%
                      </span>
                    </div>
                  )}

                  {item.status === 'failed' && item.error && (
                    <p className="text-[10px] text-red-500 font-medium">
                      Error: {item.error}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
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

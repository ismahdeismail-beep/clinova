import { create } from 'zustand';
import type { StoredFile, FileCategory, FileUploadOptions, UploadProgress } from '../types/engine';
import { StorageService } from '../services/storage.service';
import { enqueueRetry } from '../services/retry.service';
import { logger } from '../core/logger';

interface QueuedUpload {
  id: string;
  file: File;
  options: FileUploadOptions;
  addedAt: number;
}

interface FileState {
  files: StoredFile[];
  uploading: boolean;
  uploadProgress: UploadProgress | null;
  uploadError: string | null;
  offlineQueue: QueuedUpload[];

  setFiles: (files: StoredFile[]) => void;
  addFile: (file: StoredFile) => void;
  removeFile: (fileId: string) => void;
  setUploading: (v: boolean) => void;
  setUploadProgress: (p: UploadProgress | null) => void;
  setUploadError: (e: string | null) => void;
  addToQueue: (item: QueuedUpload) => void;
  removeFromQueue: (id: string) => void;
  clearQueue: () => void;

  fetchFiles: (category?: FileCategory) => Promise<void>;
  uploadFile: (file: File, options: FileUploadOptions) => Promise<void>;
  deleteFile: (fileId: string) => Promise<void>;
  processOfflineQueue: () => Promise<void>;
}

export const useFileStore = create<FileState>((set, get) => ({
  files: [],
  uploading: false,
  uploadProgress: null,
  uploadError: null,
  offlineQueue: [],

  setFiles: (files) => set({ files }),
  addFile: (file) => set((s) => ({ files: [file, ...s.files] })),
  removeFile: (fileId) => set((s) => ({ files: s.files.filter((f) => f.id !== fileId) })),
  setUploading: (uploading) => set({ uploading }),
  setUploadProgress: (uploadProgress) => set({ uploadProgress }),
  setUploadError: (uploadError) => set({ uploadError }),
  addToQueue: (item) => set((s) => ({ offlineQueue: [...s.offlineQueue, item] })),
  removeFromQueue: (id) => set((s) => ({ offlineQueue: s.offlineQueue.filter((q) => q.id !== id) })),
  clearQueue: () => set({ offlineQueue: [] }),

  fetchFiles: async (category) => {
    try {
      const files = category
        ? await StorageService.listFilesByCategory(category)
        : await StorageService.getAllFiles();
      set({ files });
    } catch (err) {
      logger.error('storage', 'fetchFiles failed', err);
    }
  },

  uploadFile: async (file, options) => {
    set({ uploading: true, uploadProgress: null, uploadError: null });

    const result = await StorageService.uploadFile(file, options, (progress) => {
      set({ uploadProgress: progress });
    });

    if (result.success && result.data) {
      set((s) => ({
        files: [result.data.file, ...s.files],
        uploading: false,
        uploadProgress: null,
      }));
      logger.info('storage', `Stored file: ${file.name}`);
    } else {
      const errMsg = result.error?.message ?? 'Upload failed';
      set({ uploadError: errMsg, uploading: false, uploadProgress: null });
      logger.error('storage', `Upload failed: ${file.name}`, result.error);

      enqueueRetry({
        fn: async () => {
          const retryResult = await StorageService.uploadFile(file, options);
          if (!retryResult.success) throw new Error(retryResult.error?.message);
          return retryResult;
        },
        maxAttempts: 3,
        baseDelayMs: 2000,
        category: 'storage',
        onSuccess: (retryResult: any) => {
          if (retryResult.success && retryResult.data) {
            get().addFile(retryResult.data.file);
            get().setUploadError(null);
          }
        },
        onFailed: () => {
          get().addToQueue({ id: crypto.randomUUID(), file, options, addedAt: Date.now() });
        },
      });
    }
  },

  deleteFile: async (fileId) => {
    const success = await StorageService.deleteFile(fileId);
    if (success) {
      set((s) => ({ files: s.files.filter((f) => f.id !== fileId) }));
    } else {
      logger.error('storage', `deleteFile failed in store: ${fileId}`);
    }
  },

  processOfflineQueue: async () => {
    const queue = get().offlineQueue;
    for (const item of queue) {
      try {
        const result = await StorageService.uploadFile(item.file, item.options);
        if (result.success && result.data) {
          get().addFile(result.data.file);
          get().removeFromQueue(item.id);
          logger.info('storage', `Offline upload processed: ${item.file.name}`);
        }
      } catch (err) {
        logger.warn('storage', `Offline upload retry failed: ${item.file.name}`, err);
      }
    }
  },
}));

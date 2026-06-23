import { create } from 'zustand';
import type { StoredFile, FileCategory, FileUploadOptions, UploadProgress } from '../types/engine';
import { StorageService } from '../services/storage.service';

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
    } catch {
      // silent fail
    }
  },

  processOfflineQueue: async () => {
    const queue = get().offlineQueue;
    for (const item of queue) {
      try {
        await StorageService.uploadFile(item.file, item.options);
        get().removeFromQueue(item.id);
      } catch {
        // leave in queue for retry
      }
    }
  },
}));

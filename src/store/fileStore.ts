import { create } from 'zustand';
import type { StoredFile, FileCategory, FileUploadOptions, UploadProgress } from '../types/engine';
import { StorageService } from '../services/storage.service';
import { enqueueRetry } from '../services/retry.service';
import { logger } from '../core/logger';

interface QueuedUpload {
  id: string;
@@ -27,6 +29,8 @@ interface FileState {
  clearQueue: () => void;

  fetchFiles: (category?: FileCategory) => Promise<void>;
  uploadFile: (file: File, options: FileUploadOptions) => Promise<void>;
  deleteFile: (fileId: string) => Promise<void>;
  processOfflineQueue: () => Promise<void>;
}

@@ -53,19 +57,73 @@ export const useFileStore = create<FileState>((set, get) => ({
        ? await StorageService.listFilesByCategory(category)
        : await StorageService.getAllFiles();
      set({ files });
    } catch {
      // silent fail
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
        await StorageService.uploadFile(item.file, item.options);
        get().removeFromQueue(item.id);
      } catch {
        // leave in queue for retry
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

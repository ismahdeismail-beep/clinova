import {
  ref, uploadBytesResumable, getDownloadURL, deleteObject,
  type UploadTaskSnapshot,
} from 'firebase/storage';
import {
  collection, doc, getDoc, getDocs, setDoc, updateDoc, deleteDoc,
  query, where, orderBy, limit,
} from 'firebase/firestore';
import { storage, db } from '../lib/firebase';
import type { StoredFile, FileCategory, FileUploadOptions, UploadProgress, UploadResult } from '../types/engine';
import { ErrorHandler } from '../core/ErrorHandler';
import { logger } from '../core/logger';

const errHandler = ErrorHandler.getInstance();

const FILES_COLLECTION = 'files';
const STORAGE_ROOT = 'clinova';

const CATEGORY_PATHS: Record<FileCategory, string> = {
  patient_image: 'patients',
  patient_document: 'patients',
  study_source: 'studies',
  study_output: 'studies',
  knowledge: 'knowledge',
  report: 'reports',
  general: 'general',
};

function sanitizeFileName(name: string): string {
  return name
    .replace(/[^a-zA-Z0-9._-]/g, '_')
    .toLowerCase()
    .slice(0, 100);
}

function buildStoragePath(category: FileCategory, subId: string | undefined, fileName: string): string {
  const base = CATEGORY_PATHS[category];
  const sub = subId ? `${subId}/` : '';
  const uuid = crypto.randomUUID();
  const safe = sanitizeFileName(fileName);
  return `${STORAGE_ROOT}/${base}/${sub}${uuid}-${safe}`;
}

function getFileId(): string {
  return doc(collection(db, FILES_COLLECTION)).id;
}

function computeHash(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const buffer = reader.result as ArrayBuffer;
      crypto.subtle.digest('SHA-256', buffer).then((hash) => {
        const hex = Array.from(new Uint8Array(hash))
          .map((b) => b.toString(16).padStart(2, '0'))
          .join('');
        resolve(hex);
      });
    };
    reader.onerror = reject;
    reader.readAsArrayBuffer(file);
  });
}

export const StorageService = {
  async uploadFile(
    file: File,
    options: FileUploadOptions,
    onProgress?: (progress: UploadProgress) => void,
    abortSignal?: AbortSignal,
  ): Promise<UploadResult> {
    const fileId = getFileId();
    const storagePath = buildStoragePath(
      options.category,
      options.patientId || options.studyId,
      file.name,
    );
    const hash = await computeHash(file);
    const storageRef = ref(storage, storagePath);
    const uploadTask = uploadBytesResumable(storageRef, file);

    return new Promise((resolve) => {
      abortSignal?.addEventListener('abort', () => {
        uploadTask.cancel();
        resolve(errHandler.error('UPLOAD_ABORTED', 'Upload was cancelled'));
      });

      uploadTask.on(
        'state_changed',
        (snapshot: UploadTaskSnapshot) => {
          onProgress?.({
            bytesTransferred: snapshot.bytesTransferred,
            totalBytes: snapshot.totalBytes,
            percentage: Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100),
          });
        },
        (error) => {
          const apiErr = errHandler.fromFirebase(error);
          logger.error('storage', `Upload failed: ${file.name}`, apiErr);
          resolve({ success: false, data: null, error: apiErr });
        },
        async () => {
          try {
            const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);

            const storedFile: StoredFile = {
              id: fileId,
              originalName: file.name,
              storagePath,
              mimeType: file.type,
              size: file.size,
              category: options.category,
              accessScope: options.accessScope ?? 'private',
              patientId: options.patientId,
              studyId: options.studyId,
              uploadedBy: '',
              uploadedByEmail: null,
              uploadedByName: null,
              createdAt: Date.now(),
              updatedAt: Date.now(),
              hash,
              accessibleTo: [],
            };

            await setDoc(doc(db, FILES_COLLECTION, fileId), storedFile);
            logger.info('storage', `File uploaded: ${file.name}`, { fileId, size: file.size });
            resolve({ success: true, data: { file: storedFile, url: downloadUrl }, error: null });
          } catch (err) {
            const apiErr = errHandler.fromFirebase(err);
            logger.error('storage', `Upload DB write failed: ${file.name}`, apiErr);
            resolve({ success: false, data: null, error: apiErr });
          }
        },
      );
    });
  },

  async getFile(fileId: string): Promise<StoredFile | null> {
    try {
      const snap = await getDoc(doc(db, FILES_COLLECTION, fileId));
      if (!snap.exists()) return null;
      return { id: snap.id, ...snap.data() } as StoredFile;
    } catch (err) {
      logger.error('storage', `getFile failed: ${fileId}`, err);
      return null;
    }
  },

  async getFileUrl(fileId: string): Promise<string | null> {
    try {
      const file = await this.getFile(fileId);
      if (!file) return null;
      const storageRef = ref(storage, file.storagePath);
      return getDownloadURL(storageRef);
    } catch (err) {
      logger.error('storage', `getFileUrl failed: ${fileId}`, err);
      return null;
    }
  },

  async deleteFile(fileId: string): Promise<boolean> {
    try {
      const file = await this.getFile(fileId);
      if (!file) {
        logger.warn('storage', `deleteFile: ${fileId} not found`);
        return false;
      }
      const storageRef = ref(storage, file.storagePath);
      await deleteObject(storageRef);
      await deleteDoc(doc(db, FILES_COLLECTION, fileId));
      logger.info('storage', `File deleted: ${fileId}`);
      return true;
    } catch (err) {
      logger.error('storage', `deleteFile failed: ${fileId}`, err);
      return false;
    }
  },

  async listFilesByCategory(category: FileCategory, max = 50): Promise<StoredFile[]> {
    try {
      const q = query(
        collection(db, FILES_COLLECTION),
        where('category', '==', category),
        orderBy('createdAt', 'desc'),
        limit(max),
      );
      const snap = await getDocs(q);
      return snap.docs.map((d) => ({ id: d.id, ...d.data() } as StoredFile));
    } catch (err) {
      logger.error('storage', `listFilesByCategory failed: ${category}`, err);
      return [];
    }
  },

  async listFilesByPatient(patientId: string, max = 50): Promise<StoredFile[]> {
    try {
      const q = query(
        collection(db, FILES_COLLECTION),
        where('patientId', '==', patientId),
        orderBy('createdAt', 'desc'),
        limit(max),
      );
      const snap = await getDocs(q);
      return snap.docs.map((d) => ({ id: d.id, ...d.data() } as StoredFile));
    } catch (err) {
      logger.error('storage', `listFilesByPatient failed: ${patientId}`, err);
      return [];
    }
  },

  async listFilesByStudy(studyId: string, max = 50): Promise<StoredFile[]> {
    try {
      const q = query(
        collection(db, FILES_COLLECTION),
        where('studyId', '==', studyId),
        orderBy('createdAt', 'desc'),
        limit(max),
      );
      const snap = await getDocs(q);
      return snap.docs.map((d) => ({ id: d.id, ...d.data() } as StoredFile));
    } catch (err) {
      logger.error('storage', `listFilesByStudy failed: ${studyId}`, err);
      return [];
    }
  },

  async getAllFiles(max = 50): Promise<StoredFile[]> {
    try {
      const q = query(
        collection(db, FILES_COLLECTION),
        orderBy('createdAt', 'desc'),
        limit(max),
      );
      const snap = await getDocs(q);
      return snap.docs.map((d) => ({ id: d.id, ...d.data() } as StoredFile));
    } catch (err) {
      logger.error('storage', 'getAllFiles failed', err);
      return [];
    }
  },

  async updateFileAccess(fileId: string, accessibleTo: string[]): Promise<boolean> {
    try {
      await updateDoc(doc(db, FILES_COLLECTION, fileId), {
        accessibleTo,
        updatedAt: Date.now(),
      });
      return true;
    } catch (err) {
      logger.error('storage', `updateFileAccess failed: ${fileId}`, err);
      return false;
    }
  },
};

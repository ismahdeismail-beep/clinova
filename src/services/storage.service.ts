import {
  ref, uploadBytesResumable, getDownloadURL, deleteObject,
  listAll, getMetadata, type UploadTaskSnapshot,
} from 'firebase/storage';
import {
  collection, doc, getDoc, getDocs, setDoc, updateDoc, deleteDoc,
  query, where, orderBy, limit, serverTimestamp,
} from 'firebase/firestore';
import { storage, db, auth } from '../lib/firebase';
import type { StoredFile, FileCategory, FileUploadOptions, UploadProgress, UploadResult } from '../types/engine';
import { MediaService } from './media.service';
import { localFileDb } from '../lib/localFileDb';

const FILES_COLLECTION = 'files';
const STORAGE_ROOT = 'clinova';

// Local cache for in-memory files (prevents crashing if firestore is blocked or offline)
const IN_MEMORY_FILES: StoredFile[] = [];

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
    onRetry?: (attempt: number, error: any) => void,
  ): Promise<UploadResult> {
    const fileId = getFileId();
    const storagePath = buildStoragePath(
      options.category,
      options.patientId || options.studyId,
      file.name,
    );

    let hash = 'hash-error';
    try {
      hash = await computeHash(file);
    } catch (e) {
      console.warn('Hash computation failed, using placeholder', e);
    }

    // Capture authenticating user details for multi-user tracking
    const currentUser = auth.currentUser;
    const uploadedBy = currentUser?.uid || 'guest';
    const uploadedByEmail = currentUser?.email || null;
    const uploadedByName = currentUser?.displayName || currentUser?.email?.split('@')[0] || 'Guest User';

    try {
      const storageRef = ref(storage, storagePath);
      const uploadTask = uploadBytesResumable(storageRef, file);

      return await new Promise<UploadResult>((resolve, reject) => {
        let completed = false;

        const unsub = abortSignal?.addEventListener('abort', () => {
          if (!completed) {
            uploadTask.cancel();
            reject(new Error('Upload aborted'));
          }
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
            completed = true;
            console.warn('Firebase uploadTask failed, triggering robust fallback', error);
            this.uploadFileFallback(file, options, fileId, storagePath, hash, uploadedBy, uploadedByEmail, uploadedByName, onRetry)
              .then(resolve)
              .catch(reject);
          },
          async () => {
            try {
              completed = true;
              const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);

              let cloudinaryUrl: string | undefined = undefined;
              let cloudinaryPublicId: string | undefined = undefined;

              try {
                const cloudDetails = await MediaService.uploadImageDetails(file, onRetry);
                cloudinaryUrl = cloudDetails.secure_url;
                cloudinaryPublicId = cloudDetails.public_id;
              } catch (cloudinaryErr) {
                console.warn('Cloudinary upload failed, but Firebase upload succeeded:', cloudinaryErr);
              }

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
                uploadedBy,
                uploadedByEmail,
                uploadedByName,
                createdAt: Date.now(),
                updatedAt: Date.now(),
                hash,
                accessibleTo: [],
                ...(cloudinaryUrl ? { cloudinaryUrl, cloudinaryPublicId } : {}),
              };

              try {
                await setDoc(doc(db, FILES_COLLECTION, fileId), storedFile);
              } catch (fsError) {
                console.warn('Firestore write failed, saving in-memory.', fsError);
              }

              // Also cache in local IndexedDB for offline resilience
              try {
                await localFileDb.saveFile(fileId, storedFile, file);
              } catch (idbErr) {
                console.warn('IndexedDB save failed', idbErr);
              }

              // Also keep in memory for instantaneous queries
              IN_MEMORY_FILES.unshift(storedFile);

              resolve({ file: storedFile, url: cloudinaryUrl || downloadUrl });
            } catch (err) {
              console.warn('Finalizing Firebase upload failed, using fallback', err);
              this.uploadFileFallback(file, options, fileId, storagePath, hash, uploadedBy, uploadedByEmail, uploadedByName, onRetry)
                .then(resolve)
                .catch(reject);
            }
          },
        );
      });
    } catch (e) {
      console.warn('Initialization of Firebase upload failed, running fallback', e);
      return this.uploadFileFallback(file, options, fileId, storagePath, hash, uploadedBy, uploadedByEmail, uploadedByName, onRetry);
    }
  },

  async uploadFileFallback(
    file: File,
    options: FileUploadOptions,
    fileId: string,
    storagePath: string,
    hash: string,
    uploadedBy: string,
    uploadedByEmail: string | null,
    uploadedByName: string | null,
    onRetry?: (attempt: number, error: any) => void,
  ): Promise<UploadResult> {
    let finalUrl = URL.createObjectURL(file);
    let cloudinaryUrl: string | undefined;
    let cloudinaryPublicId: string | undefined;

    try {
      const cloudDetails = await MediaService.uploadImageDetails(file, onRetry);
      cloudinaryUrl = cloudDetails.secure_url;
      cloudinaryPublicId = cloudDetails.public_id;
      finalUrl = cloudinaryUrl;
    } catch (e) {
      console.warn('Fallback: Cloudinary upload failed, using local URL', e);
    }

    const storedFile: StoredFile = {
      id: fileId,
      originalName: file.name,
      storagePath: cloudinaryUrl || finalUrl,
      mimeType: file.type,
      size: file.size,
      category: options.category,
      accessScope: options.accessScope ?? 'private',
      patientId: options.patientId,
      studyId: options.studyId,
      uploadedBy,
      uploadedByEmail,
      uploadedByName,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      hash,
      accessibleTo: [],
      ...(cloudinaryUrl ? { cloudinaryUrl, cloudinaryPublicId } : {}),
    };

    // Cache the full file and metadata in local IndexedDB for offline resilience
    try {
      await localFileDb.saveFile(fileId, storedFile, file);
    } catch (idbErr) {
      console.warn('Fallback: IndexedDB save failed', idbErr);
    }

    try {
      await setDoc(doc(db, FILES_COLLECTION, fileId), storedFile);
    } catch (fsError) {
      console.warn('Fallback: Firestore write failed, saving in-memory.', fsError);
    }

    IN_MEMORY_FILES.unshift(storedFile);
    console.log('Fallback StoredFile generated:', storedFile);
    return { file: storedFile, url: finalUrl };
  },

  async getFile(fileId: string): Promise<StoredFile | null> {
    try {
      const snap = await getDoc(doc(db, FILES_COLLECTION, fileId));
      if (snap.exists()) {
        return { id: snap.id, ...snap.data() } as StoredFile;
      }
    } catch (e) {
      console.warn('Firestore getFile failed, checking other storages', e);
    }
    const found = IN_MEMORY_FILES.find((f) => f.id === fileId);
    if (found) return found;

    try {
      const idbRecord = await localFileDb.getFile(fileId);
      if (idbRecord) {
        return idbRecord.meta;
      }
    } catch (e) {
      console.warn('IndexedDB getFile failed', e);
    }
    return null;
  },

  async getFileUrl(fileId: string): Promise<string | null> {
    const file = await this.getFile(fileId);
    if (!file) return null;

    // Check if the actual blob is cached in local IndexedDB first (most reliable/instant)
    try {
      const idbRecord = await localFileDb.getFile(fileId);
      if (idbRecord && idbRecord.blob) {
        return URL.createObjectURL(idbRecord.blob);
      }
    } catch (e) {
      console.warn('Failed to retrieve blob from IndexedDB, trying online', e);
    }

    if (file.cloudinaryUrl) return file.cloudinaryUrl;
    if (file.storagePath.startsWith('blob:') || file.storagePath.startsWith('data:')) {
      return file.storagePath;
    }
    try {
      const storageRef = ref(storage, file.storagePath);
      return await getDownloadURL(storageRef);
    } catch (e) {
      console.warn('getDownloadURL failed, using fallback URL', e);
      return file.cloudinaryUrl || file.storagePath || null;
    }
  },

  async deleteFile(fileId: string): Promise<void> {
    const file = await this.getFile(fileId);
    if (!file) return;

    // Remove from local cache
    const memIndex = IN_MEMORY_FILES.findIndex((f) => f.id === fileId);
    if (memIndex > -1) {
      IN_MEMORY_FILES.splice(memIndex, 1);
    }

    // Delete from local IndexedDB
    try {
      await localFileDb.deleteFile(fileId);
    } catch (idbErr) {
      console.warn('IndexedDB file deletion failed', idbErr);
    }

    try {
      const storageRef = ref(storage, file.storagePath);
      await deleteObject(storageRef);
    } catch (storageErr) {
      console.warn('Firebase storage deletion failed/skipped', storageErr);
    }

    if (file.cloudinaryPublicId) {
      try {
        await fetch('/api/cloudinary/destroy', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ publicId: file.cloudinaryPublicId }),
        });
      } catch (cloudinaryErr) {
        console.warn('Cloudinary destroy failed', cloudinaryErr);
      }
    }

    try {
      await deleteDoc(doc(db, FILES_COLLECTION, fileId));
    } catch (fsErr) {
      console.warn('Firestore doc deletion failed', fsErr);
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
      const dbFiles = snap.docs.map((d) => ({ id: d.id, ...d.data() } as StoredFile));
      
      // Merge with unsaved in-memory files of this category
      const uniqueFiles = [...dbFiles];
      for (const f of IN_MEMORY_FILES) {
        if (f.category === category && !uniqueFiles.some((uf) => uf.id === f.id)) {
          uniqueFiles.push(f);
        }
      }

      try {
        const idbRecords = await localFileDb.getAllFiles();
        for (const record of idbRecords) {
          if (record.meta.category === category && !uniqueFiles.some((uf) => uf.id === record.meta.id)) {
            uniqueFiles.push(record.meta);
          }
        }
      } catch (e) {
        console.warn('Failed to merge IndexedDB files', e);
      }

      return uniqueFiles.slice(0, max);
    } catch (e) {
      console.warn('Firestore listFilesByCategory failed, returning offline files', e);
      const list = IN_MEMORY_FILES.filter((f) => f.category === category);
      try {
        const idbRecords = await localFileDb.getAllFiles();
        for (const record of idbRecords) {
          if (record.meta.category === category && !list.some((uf) => uf.id === record.meta.id)) {
            list.push(record.meta);
          }
        }
      } catch (_) {}
      return list.slice(0, max);
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
      const dbFiles = snap.docs.map((d) => ({ id: d.id, ...d.data() } as StoredFile));
      
      const uniqueFiles = [...dbFiles];
      for (const f of IN_MEMORY_FILES) {
        if (f.patientId === patientId && !uniqueFiles.some((uf) => uf.id === f.id)) {
          uniqueFiles.push(f);
        }
      }

      try {
        const idbRecords = await localFileDb.getAllFiles();
        for (const record of idbRecords) {
          if (record.meta.patientId === patientId && !uniqueFiles.some((uf) => uf.id === record.meta.id)) {
            uniqueFiles.push(record.meta);
          }
        }
      } catch (e) {
        console.warn('Failed to merge IndexedDB files', e);
      }

      return uniqueFiles.slice(0, max);
    } catch (e) {
      console.warn('Firestore listFilesByPatient failed', e);
      const list = IN_MEMORY_FILES.filter((f) => f.patientId === patientId);
      try {
        const idbRecords = await localFileDb.getAllFiles();
        for (const record of idbRecords) {
          if (record.meta.patientId === patientId && !list.some((uf) => uf.id === record.meta.id)) {
            list.push(record.meta);
          }
        }
      } catch (_) {}
      return list.slice(0, max);
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
      const dbFiles = snap.docs.map((d) => ({ id: d.id, ...d.data() } as StoredFile));
      
      const uniqueFiles = [...dbFiles];
      for (const f of IN_MEMORY_FILES) {
        if (f.studyId === studyId && !uniqueFiles.some((uf) => uf.id === f.id)) {
          uniqueFiles.push(f);
        }
      }

      try {
        const idbRecords = await localFileDb.getAllFiles();
        for (const record of idbRecords) {
          if (record.meta.studyId === studyId && !uniqueFiles.some((uf) => uf.id === record.meta.id)) {
            uniqueFiles.push(record.meta);
          }
        }
      } catch (e) {
        console.warn('Failed to merge IndexedDB files', e);
      }

      return uniqueFiles.slice(0, max);
    } catch (e) {
      console.warn('Firestore listFilesByStudy failed', e);
      const list = IN_MEMORY_FILES.filter((f) => f.studyId === studyId);
      try {
        const idbRecords = await localFileDb.getAllFiles();
        for (const record of idbRecords) {
          if (record.meta.studyId === studyId && !list.some((uf) => uf.id === record.meta.id)) {
            list.push(record.meta);
          }
        }
      } catch (_) {}
      return list.slice(0, max);
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
      const dbFiles = snap.docs.map((d) => ({ id: d.id, ...d.data() } as StoredFile));
      
      const uniqueFiles = [...dbFiles];
      for (const f of IN_MEMORY_FILES) {
        if (!uniqueFiles.some((uf) => uf.id === f.id)) {
          uniqueFiles.push(f);
        }
      }

      try {
        const idbRecords = await localFileDb.getAllFiles();
        for (const record of idbRecords) {
          if (!uniqueFiles.some((uf) => uf.id === record.meta.id)) {
            uniqueFiles.push(record.meta);
          }
        }
      } catch (e) {
        console.warn('Failed to merge IndexedDB files', e);
      }

      return uniqueFiles.slice(0, max);
    } catch (e) {
      console.warn('Firestore getAllFiles failed', e);
      const list = [...IN_MEMORY_FILES];
      try {
        const idbRecords = await localFileDb.getAllFiles();
        for (const record of idbRecords) {
          if (!list.some((uf) => uf.id === record.meta.id)) {
            list.push(record.meta);
          }
        }
      } catch (_) {}
      return list.slice(0, max);
    }
  },

  async updateFileAccess(fileId: string, accessibleTo: string[]): Promise<void> {
    try {
      await updateDoc(doc(db, FILES_COLLECTION, fileId), {
        accessibleTo,
        updatedAt: Date.now(),
      });
    } catch (e) {
      console.warn('Firestore updateFileAccess failed', e);
    }
    const found = IN_MEMORY_FILES.find((f) => f.id === fileId);
    if (found) {
      found.accessibleTo = accessibleTo;
      found.updatedAt = Date.now();
    }
  },
};

import {
  ref, uploadBytesResumable, getDownloadURL, deleteObject,
  listAll, getMetadata, type UploadTaskSnapshot,
} from 'firebase/storage';
import {
  collection, doc, getDoc, getDocs, setDoc, updateDoc, deleteDoc,
  query, where, orderBy, limit, serverTimestamp,
} from 'firebase/firestore';
import { storage, db } from '../lib/firebase';
import type { StoredFile, FileCategory, FileUploadOptions, UploadProgress, UploadResult } from '../types/engine';
import { MediaService } from './media.service';

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

    return new Promise((resolve, reject) => {
      const unsub = abortSignal?.addEventListener('abort', () => {
        uploadTask.cancel();
        reject(new Error('Upload aborted'));
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
          reject(error);
        },
        async () => {
          try {
            const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);

            let cloudinaryUrl: string | undefined = undefined;
            let cloudinaryPublicId: string | undefined = undefined;

            if (file.type.startsWith('image/') || options.category === 'patient_image') {
              try {
                const cloudDetails = await MediaService.uploadImageDetails(file);
                cloudinaryUrl = cloudDetails.secure_url;
                cloudinaryPublicId = cloudDetails.public_id;
              } catch (cloudinaryErr) {
                console.warn('Cloudinary upload failed, but Firebase upload succeeded:', cloudinaryErr);
              }
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
              uploadedBy: '',
              uploadedByEmail: null,
              uploadedByName: null,
              createdAt: Date.now(),
              updatedAt: Date.now(),
              hash,
              accessibleTo: [],
              ...(cloudinaryUrl ? { cloudinaryUrl, cloudinaryPublicId } : {}),
            };

            await setDoc(doc(db, FILES_COLLECTION, fileId), storedFile);

            resolve({ file: storedFile, url: cloudinaryUrl || downloadUrl });
          } catch (err) {
            reject(err);
          }
        },
      );
    });
  },

  async getFile(fileId: string): Promise<StoredFile | null> {
    const snap = await getDoc(doc(db, FILES_COLLECTION, fileId));
    if (!snap.exists()) return null;
    return { id: snap.id, ...snap.data() } as StoredFile;
  },

  async getFileUrl(fileId: string): Promise<string | null> {
    const file = await this.getFile(fileId);
    if (!file) return null;
    const storageRef = ref(storage, file.storagePath);
    return getDownloadURL(storageRef);
  },

  async deleteFile(fileId: string): Promise<void> {
    const file = await this.getFile(fileId);
    if (!file) throw new Error(`File ${fileId} not found`);

    // 1. Delete from Firebase Storage (if possible)
    try {
      const storageRef = ref(storage, file.storagePath);
      await deleteObject(storageRef);
    } catch (storageErr) {
      console.warn('Firebase storage file deletion skipped or failed (might already be deleted):', storageErr);
    }

    // 2. Delete from Cloudinary if public ID is present
    if (file.cloudinaryPublicId) {
      try {
        const response = await fetch('/api/cloudinary/destroy', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ publicId: file.cloudinaryPublicId }),
        });
        if (!response.ok) {
          console.warn('Failed to delete Cloudinary image via backend API proxy');
        } else {
          const resData = await response.json();
          console.log('Cloudinary destruction outcome:', resData);
        }
      } catch (cloudinaryErr) {
        console.warn('Error calling Cloudinary destroy proxy:', cloudinaryErr);
      }
    }

    // 3. Delete metadata document from Firestore
    await deleteDoc(doc(db, FILES_COLLECTION, fileId));
  },

  async listFilesByCategory(category: FileCategory, max = 50): Promise<StoredFile[]> {
    const q = query(
      collection(db, FILES_COLLECTION),
      where('category', '==', category),
      orderBy('createdAt', 'desc'),
      limit(max),
    );
    const snap = await getDocs(q);
    return snap.docs.map((d) => ({ id: d.id, ...d.data() } as StoredFile));
  },

  async listFilesByPatient(patientId: string, max = 50): Promise<StoredFile[]> {
    const q = query(
      collection(db, FILES_COLLECTION),
      where('patientId', '==', patientId),
      orderBy('createdAt', 'desc'),
      limit(max),
    );
    const snap = await getDocs(q);
    return snap.docs.map((d) => ({ id: d.id, ...d.data() } as StoredFile));
  },

  async listFilesByStudy(studyId: string, max = 50): Promise<StoredFile[]> {
    const q = query(
      collection(db, FILES_COLLECTION),
      where('studyId', '==', studyId),
      orderBy('createdAt', 'desc'),
      limit(max),
    );
    const snap = await getDocs(q);
    return snap.docs.map((d) => ({ id: d.id, ...d.data() } as StoredFile));
  },

  async getAllFiles(max = 50): Promise<StoredFile[]> {
    const q = query(
      collection(db, FILES_COLLECTION),
      orderBy('createdAt', 'desc'),
      limit(max),
    );
    const snap = await getDocs(q);
    return snap.docs.map((d) => ({ id: d.id, ...d.data() } as StoredFile));
  },

  async updateFileAccess(fileId: string, accessibleTo: string[]): Promise<void> {
    await updateDoc(doc(db, FILES_COLLECTION, fileId), {
      accessibleTo,
      updatedAt: Date.now(),
    });
  },
};

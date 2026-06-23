export type FileCategory =
  | 'patient_image'
  | 'patient_document'
  | 'study_source'
  | 'study_output'
  | 'knowledge'
  | 'report'
  | 'general';

export type FileAccessScope = 'private' | 'shared' | 'public';

export interface StoredFile {
  id: string;
  originalName: string;
  storagePath: string;
  mimeType: string;
  size: number;
  category: FileCategory;
  accessScope: FileAccessScope;
  patientId?: string;
  studyId?: string;
  uploadedBy: string;
  uploadedByEmail: string | null;
  uploadedByName: string | null;
  createdAt: number;
  updatedAt: number;
  hash: string;
  accessibleTo: string[];
}

export interface FileUploadOptions {
  category: FileCategory;
  accessScope?: FileAccessScope;
  patientId?: string;
  studyId?: string;
  allowedMimeTypes?: string[];
  maxSizeBytes?: number;
}

export interface UploadProgress {
  bytesTransferred: number;
  totalBytes: number;
  percentage: number;
}

export interface UploadResult {
  file: StoredFile;
  url: string;
}

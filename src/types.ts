export type ViewState = 'login' | 'dashboard' | 'study' | 'pharma' | 'case' | 'settings' | 'admin' | 'tree';

export type UserRole = 'student' | 'pharmacist' | 'clinician' | 'admin';

export interface UserData {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  role: UserRole;
  institution?: string;
  createdAt: number;
}

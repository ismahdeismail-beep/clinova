export type ViewState = 'login' | 'dashboard' | 'tree' | 'study' | 'pharma' | 'case' | 'settings' | 'admin' | 'patients' | 'new-case' | 'pharmacotherapy' | 'drug-index' | 'knowledge-base';

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

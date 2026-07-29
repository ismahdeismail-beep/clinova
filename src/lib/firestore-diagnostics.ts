import { getBrowserClient } from './supabaseOptimized';

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
  };
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  let userId: string | null = null;
  let email: string | null = null;

  try {
    const client = getBrowserClient();
    // Attempt to read session inline (property exists at runtime on the auth client)
    const auth = client.auth as any;
    userId = auth?.currentSession?.user?.id || null;
    email = auth?.currentSession?.user?.email || null;
  } catch {
    // Supabase client not available — skip auth info
  }

  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: { userId, email },
    operationType,
    path,
  };

  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

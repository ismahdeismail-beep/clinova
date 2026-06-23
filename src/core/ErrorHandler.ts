export type ApiResponse<T = unknown> =
  | { success: true; data: T; error: null }
  | { success: false; data: null; error: ApiError };

export interface ApiError {
  code: string;
  message: string;
  details?: string;
  status?: number;
  timestamp: number;
}

export class ErrorHandler {
  private static instance: ErrorHandler;

  static getInstance(): ErrorHandler {
    if (!ErrorHandler.instance) {
      ErrorHandler.instance = new ErrorHandler();
    }
    return ErrorHandler.instance;
  }

  success<T>(data: T): ApiResponse<T> {
    return { success: true as const, data, error: null };
  }

  error(code: string, message: string, details?: string, status?: number): ApiResponse<null> {
    return {
      success: false as const,
      data: null,
      error: { code, message, details, status, timestamp: Date.now() },
    };
  }

  fromFirebase(err: unknown): ApiError {
    const msg = err instanceof Error ? err.message : String(err);
    if (msg.includes('permission-denied')) {
      return { code: 'PERMISSION_DENIED', message: 'Access denied', details: msg, status: 403, timestamp: Date.now() };
    }
    if (msg.includes('not-found')) {
      return { code: 'NOT_FOUND', message: 'Resource not found', details: msg, status: 404, timestamp: Date.now() };
    }
    if (msg.includes('unauthenticated')) {
      return { code: 'UNAUTHENTICATED', message: 'Not authenticated', details: msg, status: 401, timestamp: Date.now() };
    }
    if (msg.includes('deadline-exceeded')) {
      return { code: 'TIMEOUT', message: 'Request timed out', details: msg, status: 504, timestamp: Date.now() };
    }
    return { code: 'INTERNAL_ERROR', message: 'Internal error', details: msg, status: 500, timestamp: Date.now() };
  }

  wrapServiceCall<T>(fn: () => Promise<T>): Promise<ApiResponse<T>> {
    return fn()
      .then((data) => this.success(data))
      .catch((err) => {
        const apiError = this.fromFirebase(err);
        return { success: false as const, data: null, error: apiError };
      });
  }

  isSuccess<T>(response: ApiResponse<T>): response is { success: true; data: T; error: null } {
    return response.success;
  }
}

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[var(--bg)] flex items-center justify-center p-4">
          <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-8 max-w-md w-full text-center shadow-lg">
            <div className="w-16 h-16 bg-[var(--danger-container)] rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertTriangle size={32} className="text-[var(--danger)]" />
            </div>
            <h1 className="text-xl font-bold text-[var(--text)] mb-2">Something went wrong</h1>
            <p className="text-sm text-[var(--text-muted)] mb-6">
              A critical error occurred in the application. Our team has been notified.
            </p>
            <button 
              onClick={() => window.location.reload()}
              className="flex items-center justify-center gap-2 w-full px-4 py-2.5 bg-[var(--primary)] text-[var(--primary-foreground)] font-medium rounded-xl hover:opacity-90 transition-opacity"
            >
              <RefreshCw size={18} />
              Reload Application
            </button>

          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

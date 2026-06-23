import { Component, type ErrorInfo, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    (this as any).state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    console.error('[ErrorBoundary]', error, info.componentStack);
  }

  render(): ReactNode {
    const self = this as any;
    if (self.state.hasError) {
      return self.props.fallback ?? (
        <div className="h-screen w-screen flex items-center justify-center bg-[#F8FAFC]">
          <div className="bg-white border border-[#E2E8F0] rounded-xl p-8 max-w-md text-center shadow-sm">
            <h2 className="text-xl font-bold text-[#DC2626] mb-2">System Error</h2>
            <p className="text-sm text-[#64748B] mb-4">{self.state.error?.message}</p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={() => self.setState({ hasError: false, error: null })}
                className="px-4 py-2 bg-[#2563EB] text-white rounded-lg font-medium text-sm hover:bg-[#1D4ED8]"
              >
                Retry
              </button>
              <button
                onClick={() => { self.setState({ hasError: false, error: null }); window.location.reload(); }}
                className="px-4 py-2 bg-white border border-[#E2E8F0] text-[#475569] rounded-lg font-medium text-sm hover:bg-[#F8FAFC]"
              >
                Reload App
              </button>
            </div>
          </div>
        </div>
      );
    }
    return self.props.children;
  }
}

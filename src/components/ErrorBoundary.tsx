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
        <div className="h-screen w-screen flex items-center justify-center bg-[#0E0E10] text-[#E0E0E0]">
          <div className="obsidian-card p-8 rounded-xl max-w-md text-center">
            <h2 className="text-xl font-bold text-[#EF4444] mb-2">System Error</h2>
            <p className="text-sm text-[#6B7280] mb-4">{self.state.error?.message}</p>
            <button
              onClick={() => self.setState({ hasError: false, error: null })}
              className="px-4 py-2 bg-[#00E5FF] text-black rounded-lg font-bold text-sm"
            >
              Retry
            </button>
          </div>
        </div>
      );
    }
    return self.props.children;
  }
}

import { useState, useEffect, useCallback } from 'react';
import { OverlayManager, type OverlayInstance } from '../core/OverlayManager';

const manager = OverlayManager.getInstance();

export function OverlayHost() {
  const [stack, setStack] = useState<OverlayInstance[]>([]);

  useEffect(() => {
    const unsub = manager.onChange((s) => setStack([...s]));
    return unsub;
  }, []);

  const dismiss = useCallback((id: string) => {
    manager.dismiss(id);
  }, []);

  if (stack.length === 0) return null;

  const top = stack[stack.length - 1];
  const hasCritical = stack.some((o) => o.priority === 'critical');

  return (
    <div className="fixed inset-0 z-[100] pointer-events-none">
      {stack.map((overlay) => (
        <div key={overlay.id} className="pointer-events-auto">
          {overlay.type === 'loading' && overlay.id === top.id && (
            <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-[101]">
              <div className="bg-[var(--bg-card)] rounded-xl p-8 shadow-2xl border border-[var(--border)] flex flex-col items-center gap-3 min-w-[200px]">
                <div className="w-6 h-6 border-2 border-[var(--primary)] border-t-transparent rounded-full animate-spin" />
                <span className="text-sm text-[var(--text-muted)]">
                  {String(overlay.props?.message ?? 'Loading...')}
                </span>
              </div>
            </div>
          )}

          {overlay.type === 'modal' && overlay.id === top.id && (
            <div
              className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[102]"
              onClick={() => overlay.dismissible && dismiss(overlay.id)}
            >
              <div
                className="bg-[var(--bg-card)] rounded-xl p-6 shadow-2xl border border-[var(--border)] max-w-md w-full mx-4 max-h-[80vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-[var(--text)]">
                    {String(overlay.props?.title ?? '')}
                  </h3>
                  {overlay.dismissible && (
                    <button
                      onClick={() => dismiss(overlay.id)}
                      className="p-1 rounded-lg hover:bg-[var(--bg-hover)] text-[var(--text-muted)]"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M18 6L6 18M6 6l12 12" />
                      </svg>
                    </button>
                  )}
                </div>
                <div className="text-sm text-[var(--text)]">
                  {String(overlay.props?.content ?? '')}
                </div>
                {overlay.props?.actions && (
                  <div className="flex justify-end gap-2 mt-6">
                    {(overlay.props.actions as Array<{ label: string; onClick: () => void; variant?: string }>).map((action, i) => (
                      <button
                        key={i}
                        onClick={action.onClick}
                        className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                          action.variant === 'primary'
                            ? 'bg-[var(--primary)] text-white hover:opacity-90'
                            : 'bg-[var(--bg)] text-[var(--text)] border border-[var(--border)] hover:bg-[var(--bg-hover)]'
                        }`}
                      >
                        {action.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {overlay.type === 'toast' && (
            <div className="fixed bottom-4 right-4 z-[103] animate-in slide-in-from-right">
              <div className={`rounded-lg px-4 py-3 shadow-lg border text-sm max-w-sm ${
                overlay.priority === 'critical'
                  ? 'bg-red-50 dark:bg-red-900/30 border-red-200 dark:border-red-800 text-red-700 dark:text-red-300'
                  : 'bg-[var(--bg-card)] border-[var(--border)] text-[var(--text)]'
              }`}>
                {String(overlay.props?.message ?? '')}
              </div>
            </div>
          )}

          {overlay.type === 'confirm' && overlay.id === top.id && (
            <div
              className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[102]"
              onClick={() => overlay.dismissible && dismiss(overlay.id)}
            >
              <div
                className="bg-[var(--bg-card)] rounded-xl p-6 shadow-2xl border border-[var(--border)] max-w-sm w-full mx-4"
                onClick={(e) => e.stopPropagation()}
              >
                <h3 className="text-lg font-semibold text-[var(--text)] mb-2">
                  {String(overlay.props?.title ?? 'Confirm')}
                </h3>
                <p className="text-sm text-[var(--text-muted)] mb-6">
                  {String(overlay.props?.message ?? '')}
                </p>
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => {
                      (overlay.props?.onCancel as (() => void) | undefined)?.();
                      dismiss(overlay.id);
                    }}
                    className="px-4 py-2 text-sm font-medium rounded-lg bg-[var(--bg)] text-[var(--text)] border border-[var(--border)] hover:bg-[var(--bg-hover)]"
                  >
                    {String(overlay.props?.cancelLabel ?? 'Cancel')}
                  </button>
                  <button
                    onClick={() => {
                      (overlay.props?.onConfirm as (() => void) | undefined)?.();
                      dismiss(overlay.id);
                    }}
                    className="px-4 py-2 text-sm font-medium rounded-lg bg-[var(--primary)] text-white hover:opacity-90"
                  >
                    {String(overlay.props?.confirmLabel ?? 'Confirm')}
                  </button>
                </div>
              </div>
            </div>
          )}

          {overlay.type === 'drawer' && overlay.id === top.id && (
            <div
              className="fixed inset-x-0 top-0 bottom-0 left-auto w-full max-w-md bg-[var(--bg-card)] shadow-2xl border-l border-[var(--border)] z-[102] animate-in slide-in-from-right"
            >
              <div className="flex items-center justify-between p-4 border-b border-[var(--border)]">
                <h3 className="font-semibold text-[var(--text)]">
                  {String(overlay.props?.title ?? '')}
                </h3>
                {overlay.dismissible && (
                  <button onClick={() => dismiss(overlay.id)} className="p-1 rounded-lg hover:bg-[var(--bg-hover)] text-[var(--text-muted)]">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
              <div className="p-4 overflow-y-auto max-h-[calc(100vh-60px)]">
                {String(overlay.props?.content ?? '')}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

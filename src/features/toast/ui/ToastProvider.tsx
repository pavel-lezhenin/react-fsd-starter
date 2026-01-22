import type { ReactNode } from 'react';

import { cn } from '@shared/lib';

import { useToastStore, type Toast } from '../model';

const typeStyles: Record<Toast['type'], string> = {
  success: 'bg-success text-white',
  error: 'bg-error text-white',
  warning: 'bg-warning text-black',
  info: 'bg-primary text-white',
};

function ToastItem({ toast }: { readonly toast: Toast }): JSX.Element {
  const removeToast = useToastStore((state) => state.removeToast);

  return (
    <div
      className={cn(
        'flex items-center justify-between gap-4 rounded-md px-4 py-3 shadow-lg',
        typeStyles[toast.type]
      )}
      role="alert"
      aria-live="polite"
    >
      <p>{toast.message}</p>
      <button
        onClick={() => removeToast(toast.id)}
        className="text-current opacity-70 hover:opacity-100"
        aria-label="Close notification"
      >
        ✕
      </button>
    </div>
  );
}

interface ToastProviderProps {
  readonly children: ReactNode;
}

export function ToastProvider({ children }: ToastProviderProps): JSX.Element {
  const toasts = useToastStore((state) => state.toasts);

  return (
    <>
      {children}
      <div
        className="fixed bottom-4 right-4 z-50 flex flex-col gap-2"
        aria-label="Notifications"
      >
        {toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} />
        ))}
      </div>
    </>
  );
}

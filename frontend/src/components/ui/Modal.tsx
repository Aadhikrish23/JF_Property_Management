import  { type ReactNode, useEffect } from 'react';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  footer?: ReactNode;
}

export function Modal({ isOpen, onClose, title, children, footer }: ModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4 text-center sm:p-0">
        <div className="fixed inset-0 bg-gray-500/75 dark:bg-gray-900/80 transition-opacity" onClick={onClose} />
        
        <div className="relative flex flex-col max-h-[90vh] transform overflow-hidden rounded-xl bg-white dark:bg-gray-800 text-left shadow-xl transition-all w-[95vw] sm:my-8 sm:w-full sm:max-w-lg">
          <div className="px-6 py-5 overflow-y-auto flex-1">
            <div className="flex items-center justify-between mb-5 flex-shrink-0">
              <h3 className="text-lg font-bold leading-6 text-gray-900 dark:text-white">
                {title}
              </h3>
              <button
                type="button"
                className="rounded-lg bg-white dark:bg-gray-800 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onClick={onClose}
              >
                <span className="sr-only">Close</span>
                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
            <div className="mt-2 text-gray-900 dark:text-gray-100">{children}</div>
          </div>
          {footer && (
            <div className="bg-gray-50 dark:bg-gray-900/50 px-6 py-4 flex flex-col-reverse sm:flex-row sm:justify-end gap-3 border-t border-gray-200 dark:border-gray-700 flex-shrink-0 *:w-full sm:*:w-auto">
              {footer}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

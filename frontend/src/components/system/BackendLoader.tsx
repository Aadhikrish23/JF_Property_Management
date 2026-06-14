import { useEffect, useState } from 'react';
import { api } from '../../services/api';

export function BackendLoader({
  children,
}: {
  children: React.ReactNode;
}) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const warmup = async () => {
      let success = false;

      while (!success) {
        try {
          await api.get('/health');

          success = true;
        } catch {
          await new Promise((resolve) =>
            setTimeout(resolve, 3000)
          );
        }
      }

      setReady(true);
    };

    warmup();
  }, []);

  if (!ready) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4" />

          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Starting Backend Service...
          </h2>

          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            Waking up Render backend. This may take up to 30 seconds.
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
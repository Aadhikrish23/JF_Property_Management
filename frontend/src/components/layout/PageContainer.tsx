import React, { ReactNode } from 'react';

export interface PageContainerProps {
  title: string;
  description?: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
}

export function PageContainer({ title, description, action, children, className = '' }: PageContainerProps) {
  return (
    <div className={`py-6 px-4 sm:px-6 lg:px-8 ${className}`}>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            {title}
          </h1>
          {description && (
            <p className="mt-1 text-sm text-gray-500">{description}</p>
          )}
        </div>
        {action && (
          <div className="mt-4 sm:ml-4 sm:mt-0 flex-shrink-0">
            {action}
          </div>
        )}
      </div>
      <div>{children}</div>
    </div>
  );
}

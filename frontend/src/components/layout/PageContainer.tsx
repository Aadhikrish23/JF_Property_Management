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
    <div className={`p-6 min-h-full ${className}`}>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-5">
        <div>
          <h1 className="text-lg font-bold text-gray-900">{title}</h1>
          {description && <p className="text-xs text-gray-500 mt-0.5">{description}</p>}
        </div>
        {action && <div className="mt-3 sm:mt-0 flex-shrink-0">{action}</div>}
      </div>
      <div>{children}</div>
    </div>
  );
}

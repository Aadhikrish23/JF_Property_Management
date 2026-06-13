import React, { type ReactNode } from 'react';

export interface BadgeProps {
  children: ReactNode;
  variant?: 'primary' | 'success' | 'warning' | 'danger' | 'gray' | 'purple';
  className?: string;
}

export function Badge({ children, variant = 'gray', className = '' }: BadgeProps) {
const variants = {
  primary: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
  success: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
  warning: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300',
  danger:  'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300',
  gray:    'bg-gray-100 text-gray-600 dark:bg-gray-900/30 dark:text-gray-300',
  purple:  'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300',
};


  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
}

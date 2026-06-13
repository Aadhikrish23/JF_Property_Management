import React, { InputHTMLAttributes, forwardRef } from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = '', id, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label htmlFor={id} className="block text-xs font-medium text-gray-600 mb-1">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={id}
          className={`block w-full rounded-lg border text-sm px-3 py-2 placeholder-gray-400 shadow-sm transition-colors
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
            ${error
              ? 'border-red-300 focus:border-red-500 focus:ring-red-400'
              : 'border-gray-300'
            } ${className}`}
          {...props}
        />
        {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
      </div>
    );
  }
);
Input.displayName = 'Input';

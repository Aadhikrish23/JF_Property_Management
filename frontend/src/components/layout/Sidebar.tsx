import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export interface SidebarItem {
  name: string;
  href: string;
  icon?: React.ReactNode;
}

export interface SidebarProps {
  items: SidebarItem[];
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export function Sidebar({ items, isOpen, setIsOpen }: SidebarProps) {
  const location = useLocation();

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-20 bg-gray-900/80 lg:hidden" 
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar component */}
      <div
        className={`fixed inset-y-0 left-0 z-30 w-64 transform bg-gray-900 text-white transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-16 items-center justify-between px-6 bg-gray-950">
          <span className="text-lg font-bold">JF Property CRM</span>
          <button 
            className="lg:hidden text-gray-300 hover:text-white"
            onClick={() => setIsOpen(false)}
          >
            <span className="sr-only">Close sidebar</span>
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <nav className="mt-5 px-2 space-y-1">
          {items.map((item) => {
            const isActive = location.pathname === item.href || (item.href !== '/' && location.pathname.startsWith(item.href));
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                  isActive
                    ? 'bg-gray-800 text-white'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
                onClick={() => setIsOpen(false)}
              >
                {item.icon && <span className="mr-3 flex-shrink-0 h-6 w-6">{item.icon}</span>}
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>
    </>
  );
}

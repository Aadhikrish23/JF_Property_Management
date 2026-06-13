import React from 'react';

export function Header() {
  const today = new Date().toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <header className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-4 flex-shrink-0">
      {/* Left: Title + Date */}
      <div className="flex flex-col justify-center min-w-0 mr-4">
        <h1 className="text-sm font-semibold text-gray-900 leading-tight truncate">
          Branch Overview
        </h1>
        <p className="text-xs text-gray-500 leading-tight">{today} · All Staff</p>
      </div>

      {/* Right: nav pills + bell + CTA */}
      <div className="flex items-center gap-2 flex-shrink-0">
        <button className="hidden md:flex items-center text-xs font-medium text-gray-600 hover:text-gray-900 px-2 py-1 rounded hover:bg-gray-100 transition-colors">
          My Workflow
        </button>
        <button className="hidden md:flex items-center text-xs font-medium text-gray-600 hover:text-gray-900 px-2 py-1 rounded hover:bg-gray-100 transition-colors">
          My Branch
        </button>

        <div className="hidden md:flex items-center gap-1 text-xs text-gray-500 px-2">
          <span className="font-medium text-gray-700">BRANCH</span>
          <span className="bg-gray-100 text-gray-700 rounded px-1.5 py-0.5 font-medium">
            Didsbury ▾
          </span>
        </div>

        <div className="hidden md:flex items-center gap-1 text-xs text-gray-500 px-2">
          <span className="font-medium text-gray-700">STAFF</span>
          <span className="bg-gray-100 text-gray-700 rounded px-1.5 py-0.5 font-medium">
            All Staff ▾
          </span>
        </div>

        {/* Notification Bell */}
        <button className="relative w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100 transition-colors">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="w-5 h-5">
            <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 01-3.46 0" />
          </svg>
          <span className="absolute top-1 right-1 w-2 h-2 bg-orange-400 rounded-full border border-white" />
        </button>

        {/* Quick Action CTA */}
        <button className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="w-3.5 h-3.5">
            <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Quick Action
        </button>
      </div>
    </header>
  );
}

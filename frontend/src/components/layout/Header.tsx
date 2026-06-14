
interface HeaderProps {
  onMenuClick: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
  const today = new Date().toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <header className="h-14 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between px-4 flex-shrink-0">

      {/* ── Left: Hamburger (mobile only) + Title + Date ── */}
      <div className="flex items-center gap-2 min-w-0 flex-1 mr-2">
        {/* Hamburger — ONLY on mobile */}
        <button
          id="mobile-menu-btn"
          type="button"
          onClick={onMenuClick}
          aria-label="Open navigation menu"
          className="md:hidden flex-shrink-0 w-9 h-9 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5">
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>

        {/* Title + date */}
        <div className="flex flex-col justify-center min-w-0">
          <h1 className="text-sm font-semibold text-gray-900 dark:text-white leading-tight truncate">
            Branch Overview
          </h1>
          <p className="text-xs text-gray-500 dark:text-gray-400 leading-tight hidden sm:block">
            {today} · All Staff
          </p>
        </div>
      </div>

      {/* ── Right: desktop controls + notification bell ── */}
      <div className="flex items-center gap-2 flex-shrink-0">
        {/* Desktop-only nav pills */}
        <button className="hidden md:flex items-center text-xs font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
          My Workflow
        </button>
        <button className="hidden md:flex items-center text-xs font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
          My Branch
        </button>

        <div className="hidden md:flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 px-2">
          <span className="font-medium text-gray-700 dark:text-gray-300">BRANCH</span>
          <span className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded px-1.5 py-0.5 font-medium">
            Didsbury ▾
          </span>
        </div>

        <div className="hidden md:flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 px-2">
          <span className="font-medium text-gray-700 dark:text-gray-300">STAFF</span>
          <span className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded px-1.5 py-0.5 font-medium">
            All Staff ▾
          </span>
        </div>

        {/* Notification bell — always visible */}
        <button className="relative w-9 h-9 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="w-5 h-5">
            <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 01-3.46 0" />
          </svg>
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-orange-400 rounded-full border border-white dark:border-gray-800" />
        </button>

        {/* Quick Action CTA — hidden on mobile (rendered below header on mobile via layout) */}
        <button className="hidden md:flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="w-3.5 h-3.5">
            <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Quick Action
        </button>
      </div>
    </header>
  );
}

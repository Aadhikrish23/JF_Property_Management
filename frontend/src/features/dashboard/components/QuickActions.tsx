import React from 'react';
import { useNavigate } from 'react-router-dom';

interface QuickAction {
  label: string;
  subtitle: string;
  href?: string;
  color: string;
  icon: React.ReactNode;
}

const QUICK_ACTIONS: QuickAction[] = [
  {
    label: 'Add Property',
    subtitle: 'Register instruction',
    href: '/properties',
    color: 'from-emerald-700 to-emerald-900',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="w-6 h-6">
        <path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z" />
        <path d="M9 21V12h6v9" />
      </svg>
    ),
  },
  {
    label: 'Add Client',
    subtitle: 'Register applicant',
    href: '/clients',
    color: 'from-blue-700 to-blue-900',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="w-6 h-6">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <line x1="19" y1="8" x2="19" y2="14" />
        <line x1="16" y1="11" x2="22" y2="11" />
      </svg>
    ),
  },
  {
    label: 'Book Viewing',
    subtitle: 'Arrange property visit',
    href: '/viewings',
    color: 'from-purple-700 to-purple-900',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="w-6 h-6">
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    ),
  },
  {
    label: 'Search',
    subtitle: 'Find records',
    href: '/search',
    color: 'from-sky-700 to-sky-900',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="w-6 h-6">
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    ),
  },
  {
    label: 'Diary',
    subtitle: 'Scheduled events',
    color: 'from-amber-600 to-amber-800',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="w-6 h-6">
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
        <path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01" />
      </svg>
    ),
  },
];

export function QuickActions() {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-5 gap-3 mb-6">
      {QUICK_ACTIONS.map((action) => (
        <button
          key={action.label}
          onClick={() => action.href && navigate(action.href)}
          className={`group relative flex items-center gap-3 bg-gradient-to-br ${action.color} text-white rounded-xl p-4 text-left hover:brightness-110 transition-all shadow-sm`}
        >
          <div className="flex-shrink-0 text-white/80">{action.icon}</div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold leading-tight">{action.label}</p>
            <p className="text-xs text-white/60 mt-0.5 truncate">{action.subtitle}</p>
          </div>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            className="w-4 h-4 text-white/40 flex-shrink-0 group-hover:translate-x-0.5 transition-transform"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
      ))}
    </div>
  );
}

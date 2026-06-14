import type { Notification } from '../types';

const DOT_COLORS: Record<string, string> = {
  NEW_OFFER:    'bg-blue-500',
  CONFIRMED:    'bg-green-500',
  ESCALATED:    'bg-red-500',
  SIGNED:       'bg-emerald-500',
  LEAD:         'bg-gray-400',
};

function getDotColor(type: string): string {
  const key = Object.keys(DOT_COLORS).find((k) => type.toUpperCase().includes(k));
  return key ? DOT_COLORS[key] : 'bg-gray-400';
}

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins} min ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

export function NotificationsPanel({ notifications }: { notifications: Notification[] }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
        <h2 className="text-xs font-bold text-gray-500 dark:text-white uppercase tracking-wider flex items-center gap-2">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-3.5 h-3.5">
            <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 01-3.46 0" />
          </svg>
          Notifications
          {notifications.filter((n) => !n.isRead).length > 0 && (
            <span className="bg-orange-500 text-white text-xs font-bold rounded-full px-1.5 py-0.5 min-w-[1.1rem] text-center leading-none">
              {notifications.filter((n) => !n.isRead).length}
            </span>
          )}
        </h2>
        <button className="text-xs text-blue-600 hover:underline font-medium">Mark all read</button>
      </div>

      {/* List */}
      {notifications.length === 0 ? (
        <div className="flex flex-1 items-center justify-center py-12">
          <p className="text-xs text-gray-400 dark:text-white">All caught up!</p>
        </div>
      ) : (
        <ul className="flex-1 overflow-y-auto divide-y divide-gray-50">
          {notifications.map((n) => (
            <li key={n.id} className={`flex gap-3 px-4 py-3 hover:bg-gray-50 transition-colors ${!n.isRead ? '' : 'opacity-70'}`}>
              {/* Colored dot */}
              <div className="flex-shrink-0 mt-1">
                <span className={`block w-2 h-2 rounded-full ${getDotColor(n.type)}`} />
              </div>
              {/* Content */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900 dark:text-gray-100  leading-snug">{n.title}</p>
                <p className="text-xs text-gray-500 dark:text-white mt-0.5 leading-snug line-clamp-2">{n.description}</p>
                <p className="text-xs text-gray-400 dark:text-white mt-1">{timeAgo(n.createdAt)}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

import React from 'react';
import type { UpcomingActivity } from '../types';

const STATUS_CONFIG: Record<string, { label: string; className: string }> = {
  CONFIRMED:  { label: 'Confirmed',  className: 'bg-green-100 text-green-700' },
  BOOKED:     { label: 'Booked',     className: 'bg-blue-100 text-blue-700' },
  PENDING:    { label: 'Pending',    className: 'bg-yellow-100 text-yellow-700' },
  DUE_TODAY:  { label: 'Due Today',  className: 'bg-red-100 text-red-700' },
  NEW:        { label: 'New',        className: 'bg-purple-100 text-purple-700' },
  TOMORROW:   { label: 'Tomorrow',   className: 'bg-gray-100 text-gray-600' },
};

function getStatusConfig(status: string) {
  const key = Object.keys(STATUS_CONFIG).find((k) =>
    status.toUpperCase().replace(/[\s-]/g, '_') === k
  );
  return key ? STATUS_CONFIG[key] : { label: status, className: 'bg-gray-100 text-gray-600' };
}

export function UpcomingActivitiesPanel({ activities }: { activities: UpcomingActivity[] }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
        <h2 className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-2">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-3.5 h-3.5">
            <rect x="3" y="4" width="18" height="18" rx="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
          Upcoming Today
        </h2>
        <button className="text-xs text-blue-600 hover:underline font-medium">Full Calendar</button>
      </div>

      {/* List */}
      {activities.length === 0 ? (
        <div className="flex flex-1 items-center justify-center py-12">
          <p className="text-xs text-gray-400">Your schedule is clear.</p>
        </div>
      ) : (
        <ul className="flex-1 overflow-y-auto divide-y divide-gray-50">
          {activities.map((activity) => {
            const dt = new Date(activity.dateTime);
            const month = dt.toLocaleString('en-GB', { month: 'short' }).toUpperCase();
            const day = dt.getDate();
            const time = dt.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
            const statusCfg = getStatusConfig(activity.status);

            return (
              <li key={activity.id} className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors">
                {/* Date block */}
                <div className="flex flex-col items-center justify-center w-9 h-10 flex-shrink-0 bg-gray-50 border border-gray-200 rounded-lg">
                  <span className="text-xs font-semibold text-gray-400 leading-none uppercase">{month}</span>
                  <span className="text-base font-bold text-gray-900 leading-tight">{day}</span>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900 truncate leading-snug">{activity.title}</p>
                  <p className="text-xs text-gray-500 mt-0.5 truncate">{time} · {activity.type}</p>
                </div>

                {/* Status badge */}
                <span className={`flex-shrink-0 text-xs font-semibold px-2 py-0.5 rounded-full ${statusCfg.className}`}>
                  {statusCfg.label}
                </span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

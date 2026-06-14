import  { useState } from 'react';
import {
  PageContainer, Card, Pagination, Select, LoadingSpinner, EmptyState, Button
} from '../../../components';
import { useNotifications, useMarkNotificationAsRead } from '../hooks';

const DOT_COLORS: Record<string, string> = {
  NEW_OFFER:    'bg-blue-500 dark:bg-blue-400',
  CONFIRMED:    'bg-green-500 dark:bg-green-400',
  ESCALATED:    'bg-red-500 dark:bg-red-400',
  SIGNED:       'bg-emerald-500 dark:bg-emerald-400',
  LEAD:         'bg-gray-400 dark:bg-gray-500',
};

function getDotColor(type: string): string {
  const key = Object.keys(DOT_COLORS).find((k) => type.toUpperCase().includes(k));
  return key ? DOT_COLORS[key] : 'bg-gray-400 dark:bg-gray-500';
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

export function NotificationsList() {
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all');

  const { data, isLoading, isError } = useNotifications({
    page,
    limit: 10,
    isRead: filter === 'all' ? undefined : filter === 'read',
  });

  const markAsReadMutation = useMarkNotificationAsRead();

  return (
    <PageContainer title="Notifications" description="Stay updated with your latest alerts">
      <Card>
        {/* Filter Header */}
        <div className="p-4 border-b border-gray-100 dark:border-gray-700 flex flex-wrap items-center justify-between gap-4">
          <div className="w-full sm:w-44">
            <Select
              value={filter}
              onChange={(e) => { setFilter(e.target.value as any); setPage(1); }}
              options={[
                { value: 'all', label: 'All Notifications' },
                { value: 'unread', label: 'Unread' },
                { value: 'read', label: 'Read' },
              ]}
            />
          </div>
          {data?.data.pagination.total ? (
             <span className="text-sm text-gray-500 dark:text-gray-400">
               {data.data.items.filter(n => !n.isRead).length} unread on this page
             </span>
          ) : null}
        </div>

        {/* Content Body */}
        {isLoading ? (
          <div className="py-16 flex justify-center"><LoadingSpinner /></div>
        ) : isError ? (
          <EmptyState title="Failed to load" description="Could not fetch notifications." />
        ) : data?.data.items.length === 0 ? (
          <EmptyState title="All caught up!" description="You have no notifications here." />
        ) : (
          <>
            <ul className="divide-y divide-gray-100 dark:divide-gray-700">
              {data?.data.items.map((n) => (
                <li 
                  key={n.id} 
                  className={`flex items-start gap-4 p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors ${
                    !n.isRead ? '' : 'opacity-60'
                  }`}
                >
                  {/* Status Indicator */}
                  <div className="flex-shrink-0 mt-1">
                    <span className={`block w-2.5 h-2.5 rounded-full ${getDotColor(n.type)} ${n.isRead ? 'opacity-40' : ''}`} />
                  </div>
                  
                  {/* Descriptions */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900 dark:text-white leading-snug">
                      {n.title}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1 leading-relaxed">
                      {n.description}
                    </p>
                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
                      {timeAgo(n.createdAt)}
                    </p>
                  </div>
                  
                  {/* Actions Button */}
                  {!n.isRead && (
                    <Button
                      size="sm"
                      variant="primary"
                      onClick={() => markAsReadMutation.mutate(n.id)}
                      disabled={markAsReadMutation.isPending}
                    >
                      Mark as Read
                    </Button>
                  )}
                </li>
              ))}
            </ul>
            
            {data && data.data.pagination.total > 10 && (
              <Pagination
                currentPage={data.data.pagination.page}
                totalPages={Math.ceil(data.data.pagination.total / data.data.pagination.limit)}
                onPageChange={setPage}
                className="border-t border-gray-100 dark:border-gray-700"
              />
            )}
          </>
        )}
      </Card>
    </PageContainer>
  );
}

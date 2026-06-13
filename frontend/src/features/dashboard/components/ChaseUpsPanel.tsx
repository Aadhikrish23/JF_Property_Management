import React from 'react';
import type { Task } from '../types';

interface ChaseUpCardProps {
  task: Task;
  variant: 'auto' | 'manual' | 'ai';
}

function ChaseUpCard({ task, variant }: ChaseUpCardProps) {
  const variantConfig = {
    auto: { label: 'Auto-Sent', dotColor: 'bg-green-500', labelColor: 'text-green-600 dark:text-green-400' },
    manual: { label: 'Manual Due', dotColor: 'bg-orange-500', labelColor: 'text-orange-600 dark:text-orange-400' },
    ai: { label: 'AI Scheduled', dotColor: 'bg-blue-500', labelColor: 'text-blue-600 dark:text-blue-400' },
  };

  const cfg = variantConfig[variant];

  const initials = task.title
    .split(' ')
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <span className={`w-2 h-2 rounded-full ${cfg.dotColor}`} />
          <span className={`text-xs font-semibold ${cfg.labelColor}`}>{cfg.label}</span>
        </div>
        <span className="text-xs text-gray-400 dark:text-gray-500">
          {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'No date'}
        </span>
      </div>

      <div className="flex items-center gap-2">
        <div className="w-7 h-7 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-xs font-bold text-gray-600 dark:text-gray-300 flex-shrink-0">
          {initials}
        </div>
        <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">{task.title}</p>
      </div>

      <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed line-clamp-2 min-h-[2.5rem]">
        {task.assignedUser ? `Assigned to ${task.assignedUser.name}` : 'No description available.'}
      </p>

      <div className="flex gap-2 mt-auto">
        <button className="flex-1 text-xs font-medium text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg py-1.5 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
          View Lead
        </button>
        {variant === 'manual' ? (
          <button className="flex-1 text-xs font-semibold text-white bg-orange-500 rounded-lg py-1.5 hover:bg-orange-600 dark:bg-orange-600 dark:hover:bg-orange-500 transition-colors">
            Call Now
          </button>
        ) : variant === 'ai' ? (
          <button className="flex-1 text-xs font-semibold text-white bg-gray-900 dark:bg-white dark:text-gray-900 rounded-lg py-1.5 hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors">
            Approve
          </button>
        ) : (
          <button className="flex-1 text-xs font-medium text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg py-1.5 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            Call Now
          </button>
        )}
      </div>
    </div>
  );
}

export function ChaseUpsPanel({ tasks }: { tasks: Task[] }) {
  const variants: Array<'auto' | 'manual' | 'ai'> = ['auto', 'manual', 'ai'];

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <h2 className="text-sm font-semibold text-gray-900 dark:text-white flex items-center gap-1.5">
            🔥 Chase-Ups
          </h2>
          {tasks.length > 0 && (
            <span className="text-xs bg-orange-100 text-orange-700 dark:bg-orange-950/40 dark:text-orange-300 font-semibold px-2 py-0.5 rounded-full">
              {tasks.length} due
            </span>
          )}
          <span className="text-xs bg-green-100 text-green-700 dark:bg-green-950/40 dark:text-green-300 font-semibold px-2 py-0.5 rounded-full flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" /> AI Auto-Chase
          </span>
        </div>
        <button className="text-xs text-blue-600 dark:text-blue-400 hover:underline font-medium">View all</button>
      </div>

      {tasks.length === 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {variants.map((variant) => (
            <div key={variant} className="bg-white dark:bg-gray-800 rounded-xl border border-dashed border-gray-200 dark:border-gray-700 p-4 flex items-center justify-center min-h-[160px]">
              <p className="text-xs text-gray-400 dark:text-gray-500 text-center">
                No {variant === 'auto' ? 'auto-sent' : variant === 'manual' ? 'manual due' : 'AI scheduled'} chase-ups
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {variants.map((variant, i) => {
            const task = tasks[i] || tasks[0];
            return <ChaseUpCard key={variant} task={task} variant={variant} />;
          })}
        </div>
      )}
    </div>
  );
}

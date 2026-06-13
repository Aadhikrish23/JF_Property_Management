import React, { useState } from 'react';
import type { Task } from '../types';

const WORKFLOW_TABS = [
  { id: 'VIEWING', label: 'Viewings to Confirm' },
  { id: 'FEEDBACK', label: 'Feedback Required' },
  { id: 'OFFER', label: 'Offers Received' },
  { id: 'APPRAISAL', label: 'Market Appraisals' },
  { id: 'TODO', label: 'To-Do List (Master)' },
  { id: 'PROGRESSION', label: 'Sales Progression' },
];

const PRIORITY_COLORS: Record<string, string> = {
  URGENT: 'bg-red-100 text-red-700',
  HIGH: 'bg-orange-100 text-orange-700',
  MEDIUM: 'bg-blue-100 text-blue-700',
  LOW: 'bg-gray-100 text-gray-600',
};

const STATUS_COLORS: Record<string, string> = {
  PENDING: 'bg-yellow-100 text-yellow-700',
  IN_PROGRESS: 'bg-blue-100 text-blue-700',
  COMPLETED: 'bg-green-100 text-green-700',
};

const TYPE_COLORS: Record<string, string> = {
  VIEWING: 'bg-purple-100 text-purple-700',
  FEEDBACK: 'bg-blue-100 text-blue-700',
  OFFER: 'bg-green-100 text-green-700',
  APPRAISAL: 'bg-yellow-100 text-yellow-700',
  TODO: 'bg-gray-100 text-gray-700',
  PROGRESSION: 'bg-rose-100 text-rose-700',
};

export function WorkflowCommandCentre({ tasks }: { tasks: Task[] }) {
  const [activeTab, setActiveTab] = useState(WORKFLOW_TABS[0].id);

  const filteredTasks = tasks.filter((task) => task.type === activeTab);

  const tabCounts = WORKFLOW_TABS.reduce<Record<string, number>>((acc, tab) => {
    acc[tab.id] = tasks.filter((t) => t.type === tab.id).length;
    return acc;
  }, {});

  return (
    <div className="bg-white rounded-xl border border-gray-200">
      {/* Header */}
      <div className="flex items-center justify-between px-4 pt-4 pb-0">
        <h2 className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-2">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-3.5 h-3.5">
            <line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" />
            <line x1="8" y1="18" x2="21" y2="18" /><line x1="3" y1="6" x2="3.01" y2="6" />
            <line x1="3" y1="12" x2="3.01" y2="12" /><line x1="3" y1="18" x2="3.01" y2="18" />
          </svg>
          Workflow Command Centre
        </h2>
        <button className="text-xs text-blue-600 hover:underline font-medium flex items-center gap-1">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-3.5 h-3.5">
            <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Add Task
        </button>
      </div>

      {/* Tabs */}
      <div className="overflow-x-auto">
        <div className="flex border-b border-gray-200 px-4 mt-3 gap-0 min-w-max">
          {WORKFLOW_TABS.map((tab) => {
            const isActive = tab.id === activeTab;
            const count = tabCounts[tab.id];
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 px-3 py-2.5 text-xs font-medium border-b-2 whitespace-nowrap transition-colors ${
                  isActive
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
                {count > 0 && (
                  <span
                    className={`text-xs font-bold rounded-full px-1.5 py-0.5 min-w-[1.1rem] text-center leading-none ${
                      isActive ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Task list */}
      {filteredTasks.length === 0 ? (
        <div className="py-10 text-center">
          <p className="text-xs text-gray-400">
            No tasks in {WORKFLOW_TABS.find((t) => t.id === activeTab)?.label}
          </p>
        </div>
      ) : (
        <ul className="divide-y divide-gray-100">
          {filteredTasks.map((task) => (
            <li key={task.id} className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 group">
              {/* Checkbox */}
              <input
                type="checkbox"
                className="w-3.5 h-3.5 rounded border-gray-300 text-blue-600 flex-shrink-0 cursor-pointer"
                readOnly
              />

              {/* Left border accent */}
              <div
                className={`w-0.5 h-5 rounded-full flex-shrink-0 ${
                  task.priority === 'URGENT' ? 'bg-red-500' : task.priority === 'HIGH' ? 'bg-orange-400' : 'bg-gray-300'
                }`}
              />

              {/* Task info */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{task.title}</p>
                <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                  <span className={`text-xs font-medium px-1.5 py-0.5 rounded ${TYPE_COLORS[task.type] ?? 'bg-gray-100 text-gray-600'}`}>
                    {task.type.charAt(0) + task.type.slice(1).toLowerCase()}
                  </span>
                  <span className="text-xs text-gray-400">
                    {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'No date'}
                  </span>
                  {task.assignedUser && (
                    <span className="text-xs text-gray-400 flex items-center gap-1">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-3 h-3">
                        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" />
                      </svg>
                      {task.assignedUser.name}
                    </span>
                  )}
                </div>
              </div>

              {/* Priority + Actions */}
              <div className="flex items-center gap-2 flex-shrink-0">
                <span className={`text-xs font-semibold px-1.5 py-0.5 rounded ${PRIORITY_COLORS[task.priority] ?? 'bg-gray-100 text-gray-600'}`}>
                  {task.priority}
                </span>
                <div className="hidden group-hover:flex items-center gap-1">
                  <button className="text-xs text-blue-600 hover:underline font-medium">View Lead</button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

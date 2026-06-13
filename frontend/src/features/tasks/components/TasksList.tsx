import React, { useState } from 'react';
import {
  PageContainer, Card, Table, TableHead, TableBody, TableRow, TableHeader, TableCell,
  Pagination, Select, LoadingSpinner, EmptyState, Badge
} from '../../../components';
import { useTasks, useUpdateTaskStatus } from '../hooks';
import type { TaskType, TaskStatus, TaskPriority } from '../types';

const PRIORITY_COLORS: Record<string, string> = {
  URGENT: 'bg-red-100 text-red-700',
  HIGH: 'bg-orange-100 text-orange-700',
  MEDIUM: 'bg-blue-100 text-blue-700',
  LOW: 'bg-gray-100 text-gray-600',
};

const TYPE_COLORS: Record<string, string> = {
  VIEWING: 'bg-purple-100 text-purple-700',
  FEEDBACK: 'bg-blue-100 text-blue-700',
  OFFER: 'bg-green-100 text-green-700',
  APPRAISAL: 'bg-yellow-100 text-yellow-700',
  TODO: 'bg-gray-100 text-gray-700',
  PROGRESSION: 'bg-rose-100 text-rose-700',
};

export function TasksList() {
  const [page, setPage] = useState(1);
  const [type, setType] = useState<TaskType | ''>('');
  const [status, setStatus] = useState<TaskStatus | ''>('');
  const [priority, setPriority] = useState<TaskPriority | ''>('');

  const { data, isLoading, isError } = useTasks({
    page,
    limit: 10,
    type: type || undefined,
    status: status || undefined,
    priority: priority || undefined,
  });

  const updateMutation = useUpdateTaskStatus();

  const handleStatusChange = (id: string, newStatus: TaskStatus) => {
    updateMutation.mutate({ id, status: newStatus });
  };

  return (
    <PageContainer title="Tasks" description="Manage your workflow and to-dos">
      <Card>
        {/* Filters */}
        <div className="p-4 flex flex-wrap gap-3 border-b border-gray-100">
          <div className="w-full sm:w-44">
            <Select
              value={type}
              onChange={(e) => { setType(e.target.value as TaskType | ''); setPage(1); }}
              options={[
                { value: '', label: 'All Types' },
                { value: 'VIEWING', label: 'Viewing' },
                { value: 'FEEDBACK', label: 'Feedback' },
                { value: 'OFFER', label: 'Offer' },
                { value: 'APPRAISAL', label: 'Appraisal' },
                { value: 'TODO', label: 'To-Do' },
                { value: 'PROGRESSION', label: 'Progression' },
              ]}
            />
          </div>
          <div className="w-full sm:w-44">
            <Select
              value={status}
              onChange={(e) => { setStatus(e.target.value as TaskStatus | ''); setPage(1); }}
              options={[
                { value: '', label: 'All Statuses' },
                { value: 'PENDING', label: 'Pending' },
                { value: 'IN_PROGRESS', label: 'In Progress' },
                { value: 'COMPLETED', label: 'Completed' },
              ]}
            />
          </div>
          <div className="w-full sm:w-44">
            <Select
              value={priority}
              onChange={(e) => { setPriority(e.target.value as TaskPriority | ''); setPage(1); }}
              options={[
                { value: '', label: 'All Priorities' },
                { value: 'LOW', label: 'Low' },
                { value: 'MEDIUM', label: 'Medium' },
                { value: 'HIGH', label: 'High' },
                { value: 'URGENT', label: 'Urgent' },
              ]}
            />
          </div>
        </div>

        {/* Content */}
        {isLoading ? (
          <div className="py-16 flex justify-center"><LoadingSpinner /></div>
        ) : isError ? (
          <EmptyState title="Failed to load" description="Could not fetch tasks." />
        ) : data?.data.items.length === 0 ? (
          <EmptyState title="No tasks found" description="Try adjusting your filters." />
        ) : (
          <>
            <div className="hidden md:block">
              <Table>
                <TableHead>
                  <TableRow>
                    <TableHeader>Title</TableHeader>
                    <TableHeader>Type</TableHeader>
                    <TableHeader>Priority</TableHeader>
                    <TableHeader>Due Date</TableHeader>
                    <TableHeader>Status / Action</TableHeader>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data!.data.items.map((task) => (
                    <TableRow key={task.id} className="hover:bg-gray-50 transition-colors">
                      <TableCell className="font-semibold text-gray-900">{task.title}</TableCell>
                      <TableCell>
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold ${TYPE_COLORS[task.type] ?? 'bg-gray-100 text-gray-600'}`}>
                          {task.type.charAt(0) + task.type.slice(1).toLowerCase()}
                        </span>
                      </TableCell>
                      <TableCell>
                         <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold ${PRIORITY_COLORS[task.priority] ?? 'bg-gray-100 text-gray-600'}`}>
                          {task.priority}
                        </span>
                      </TableCell>
                      <TableCell className="text-gray-500">
                        {task.dueDate ? new Date(task.dueDate).toLocaleDateString('en-GB') : '—'}
                      </TableCell>
                      <TableCell>
                         <select
                           className="text-sm rounded border-gray-300 py-1 pl-2 pr-6 focus:ring-blue-500 focus:border-blue-500 shadow-sm disabled:opacity-50"
                           value={task.status}
                           onChange={(e) => handleStatusChange(task.id, e.target.value as TaskStatus)}
                           disabled={updateMutation.isPending}
                         >
                           <option value="PENDING">Pending</option>
                           <option value="IN_PROGRESS">In Progress</option>
                           <option value="COMPLETED">Completed</option>
                         </select>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div className="grid grid-cols-1 gap-4 p-4 md:hidden">
              {data!.data.items.map((task) => (
                <div key={task.id} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 shadow-sm flex flex-col gap-2">
                  <div className="flex justify-between items-start">
                    <span className="font-bold text-gray-900 leading-tight">{task.title}</span>
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold ${PRIORITY_COLORS[task.priority] ?? 'bg-gray-100 text-gray-600'}`}>
                      {task.priority}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold ${TYPE_COLORS[task.type] ?? 'bg-gray-100 text-gray-600'}`}>
                      {task.type.charAt(0) + task.type.slice(1).toLowerCase()}
                    </span>
                    <span className="text-xs text-gray-500">
                      Due: {task.dueDate ? new Date(task.dueDate).toLocaleDateString('en-GB') : '—'}
                    </span>
                  </div>
                  <div className="mt-2 border-t border-gray-100 pt-2">
                    <select
                      className="w-full text-sm rounded border-gray-300 py-1 pl-2 pr-6 focus:ring-blue-500 focus:border-blue-500 shadow-sm disabled:opacity-50"
                      value={task.status}
                      onChange={(e) => handleStatusChange(task.id, e.target.value as TaskStatus)}
                      disabled={updateMutation.isPending}
                    >
                      <option value="PENDING">Pending</option>
                      <option value="IN_PROGRESS">In Progress</option>
                      <option value="COMPLETED">Completed</option>
                    </select>
                  </div>
                </div>
              ))}
            </div>
            {data && data.data.pagination.total > 10 && (
              <Pagination
                currentPage={data.data.pagination.page}
                totalPages={Math.ceil(data.data.pagination.total / data.data.pagination.limit)}
                onPageChange={setPage}
                className="border-t border-gray-100"
              />
            )}
          </>
        )}
      </Card>
    </PageContainer>
  );
}

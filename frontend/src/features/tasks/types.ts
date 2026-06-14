import type { PaginatedResponse } from '../../types';

export interface User {
  id: string;
  name: string;
  role: string;
}

export type TaskType = 'VIEWING' | 'FEEDBACK' | 'OFFER' | 'APPRAISAL' | 'TODO' | 'PROGRESSION';
export type TaskStatus = 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';
export type TaskPriority = 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';

export interface Task {
  id: string;
  title: string;
  type: TaskType;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: string | null;
  assignedUser?: User | null;
  createdAt: string;
}

export interface TasksFilter {
  page?: number;
  limit?: number;
  type?: TaskType;
  status?: TaskStatus;
  priority?: TaskPriority;
}

export type TasksResponse = PaginatedResponse<Task>;

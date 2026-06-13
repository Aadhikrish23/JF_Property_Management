import { api } from '../../services';
import type { TasksFilter, TasksResponse, Task } from './types';

export const fetchTasks = async (filters: TasksFilter): Promise<TasksResponse> => {
  const { data } = await api.get<TasksResponse>('/tasks', { params: filters });
  return data;
};

export const updateTaskStatus = async (id: string, status: Task['status']): Promise<{ success: boolean; data: Task }> => {
  const { data } = await api.patch<{ success: boolean; data: Task }>(`/tasks/${id}`, { status });
  return data;
};

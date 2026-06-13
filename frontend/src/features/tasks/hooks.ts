import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchTasks, updateTaskStatus } from './api';
import type { TasksFilter, Task } from './types';

export const useTasks = (filters: TasksFilter) => {
  return useQuery({
    queryKey: ['tasks', filters],
    queryFn: () => fetchTasks(filters),
  });
};

export const useUpdateTaskStatus = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: Task['status'] }) => updateTaskStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
    },
  });
};

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchNotifications, markNotificationAsRead } from './api';
import type { NotificationsFilter } from './types';

export const useNotifications = (filters: NotificationsFilter) => {
  return useQuery({
    queryKey: ['notifications', filters],
    queryFn: () => fetchNotifications(filters),
  });
};

export const useMarkNotificationAsRead = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: markNotificationAsRead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
    },
  });
};

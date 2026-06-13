import { api } from '../../services';
import type { NotificationsFilter, NotificationsResponse } from './types';

export const fetchNotifications = async (filters: NotificationsFilter): Promise<NotificationsResponse> => {
  const { data } = await api.get<NotificationsResponse>('/notifications', { params: filters });
  return data;
};

export const markNotificationAsRead = async (id: string): Promise<{ success: boolean }> => {
  const { data } = await api.patch<{ success: boolean }>(`/notifications/${id}/read`);
  return data;
};

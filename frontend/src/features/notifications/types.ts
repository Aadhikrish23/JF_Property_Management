import type { PaginatedResponse } from '../../types';

export interface Notification {
  id: string;
  title: string;
  description: string;
  type: string;
  isRead: boolean;
  createdAt: string;
}

export interface NotificationsFilter {
  page?: number;
  limit?: number;
  isRead?: boolean;
}

export type NotificationsResponse = PaginatedResponse<Notification>;

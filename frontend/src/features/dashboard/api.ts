import type { DashboardResponse } from './types';
import { api } from '../../services';

export const fetchDashboardData = async (): Promise<DashboardResponse> => {
  const response = await api.get<DashboardResponse>('/dashboard');

  return response.data;
};
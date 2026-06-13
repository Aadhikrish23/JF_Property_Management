import type { DashboardResponse } from './types';

export const fetchDashboardData = async (): Promise<DashboardResponse> => {
  const response = await fetch(
  'http://localhost:5000/api/v1/dashboard'
); 
  if (!response.ok) {
    throw new Error('Failed to fetch dashboard data');
  }
  return response.json();
};

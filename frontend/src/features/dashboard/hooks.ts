import { useQuery } from '@tanstack/react-query';
import { fetchDashboardData } from './api';

export const useDashboardData = () => {
  return useQuery({
    queryKey: ['dashboard'],
    queryFn: fetchDashboardData,
  });
};

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchViewings, createViewing } from './api';
import type { ViewingsFilter, CreateViewingData } from './types';

export const useViewings = (filters: ViewingsFilter) => {
  return useQuery({
    queryKey: ['viewings', filters],
    queryFn: () => fetchViewings(filters),
  });
};

export const useCreateViewing = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: CreateViewingData) => createViewing(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['viewings'] });
    },
  });
};

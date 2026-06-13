import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchProperties, createProperty } from './api';
import type { PropertiesFilter, CreatePropertyData } from './types';

export const useProperties = (filters: PropertiesFilter) => {
  return useQuery({
    queryKey: ['properties', filters],
    queryFn: () => fetchProperties(filters),
  });
};

export const useCreateProperty = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: CreatePropertyData) => createProperty(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['properties'] });
    },
  });
};

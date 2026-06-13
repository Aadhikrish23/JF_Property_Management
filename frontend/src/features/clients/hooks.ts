import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchClients, createClient } from './api';
import type { ClientsFilter, CreateClientData } from './types';

export const useClients = (filters: ClientsFilter) => {
  return useQuery({
    queryKey: ['clients', filters],
    queryFn: () => fetchClients(filters),
  });
};

export const useCreateClient = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: CreateClientData) => createClient(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clients'] });
    },
  });
};

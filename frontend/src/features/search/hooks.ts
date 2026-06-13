import { useQuery } from '@tanstack/react-query';
import { fetchSearchResults } from './api';

export const useSearch = (query: string) => {
  return useQuery({
    queryKey: ['search', query],
    queryFn: () => fetchSearchResults(query),
    enabled: query.length >= 2,
    staleTime: 60000,
  });
};

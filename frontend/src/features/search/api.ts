import { api } from '../../services';
import type { SearchResponse } from './types';

export const fetchSearchResults = async (query: string): Promise<SearchResponse> => {
  const { data } = await api.get<SearchResponse>('/search', { params: { q: query } });
  return data;
};

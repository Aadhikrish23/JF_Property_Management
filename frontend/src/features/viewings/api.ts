import { api } from '../../services';
import type { ViewingsFilter, ViewingsResponse, CreateViewingData, CreateViewingResponse } from './types';

export const fetchViewings = async (filters: ViewingsFilter): Promise<ViewingsResponse> => {
  const { data } = await api.get<ViewingsResponse>('/viewings', { params: filters });
  return data;
};

export const createViewing = async (payload: CreateViewingData): Promise<CreateViewingResponse> => {
  const { data } = await api.post<CreateViewingResponse>('/viewings', payload);
  return data;
};

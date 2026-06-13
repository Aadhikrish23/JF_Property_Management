import { api } from '../../services';
import type { PropertiesFilter, PropertiesResponse, CreatePropertyData, CreatePropertyResponse } from './types';

export const fetchProperties = async (filters: PropertiesFilter): Promise<PropertiesResponse> => {
  const { data } = await api.get<PropertiesResponse>('/properties', { params: filters });
  return data;
};

export const createProperty = async (payload: CreatePropertyData): Promise<CreatePropertyResponse> => {
  const { data } = await api.post<CreatePropertyResponse>('/properties', payload);
  return data;
};

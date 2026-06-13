import { api } from '../../services';
import type { ClientsFilter, ClientsResponse, CreateClientData, CreateClientResponse } from './types';

export const fetchClients = async (filters: ClientsFilter): Promise<ClientsResponse> => {
  const { data } = await api.get<ClientsResponse>('/clients', { params: filters });
  return data;
};

export const createClient = async (payload: CreateClientData): Promise<CreateClientResponse> => {
  const { data } = await api.post<CreateClientResponse>('/clients', payload);
  return data;
};

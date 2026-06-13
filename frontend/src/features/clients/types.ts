import type { PaginatedResponse, ApiResponse } from '../../types';

export interface Client {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ClientsFilter {
  page?: number;
  limit?: number;
  search?: string;
}

export interface CreateClientData {
  name: string;
  email?: string;
  phone?: string;
}

export type ClientsResponse = PaginatedResponse<Client>;
export type CreateClientResponse = ApiResponse<{ id: string }>;

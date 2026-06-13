import type { PaginatedResponse, ApiResponse } from '../../types';

export type PropertyStatus = 'ACTIVE' | 'UNDER_OFFER' | 'SOLD';

export interface Property {
  id: string;
  title: string;
  address: string;
  status: PropertyStatus;
  createdAt: string;
  updatedAt: string;
}

export interface PropertiesFilter {
  page?: number;
  limit?: number;
  status?: PropertyStatus;
  search?: string;
}

export interface CreatePropertyData {
  title: string;
  address: string;
  status?: PropertyStatus;
}

export type PropertiesResponse = PaginatedResponse<Property>;
export type CreatePropertyResponse = ApiResponse<{ id: string }>;

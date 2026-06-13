import type { PaginatedResponse, ApiResponse } from '../../types';

export type ViewingStatus = 'BOOKED' | 'CONFIRMED' | 'COMPLETED';

export interface Viewing {
  id: string;
  propertyId: string;
  clientId: string;
  dateTime: string;
  status: ViewingStatus;
  createdAt: string;
  updatedAt: string;
  property?: { id: string; title: string; address: string; status: string };
  client?: { id: string; name: string; email: string; phone: string };
}

export interface ViewingsFilter {
  page?: number;
  limit?: number;
  status?: ViewingStatus;
}

export interface CreateViewingData {
  propertyId: string;
  clientId: string;
  dateTime: string;
  status?: ViewingStatus;
}

export type ViewingsResponse = PaginatedResponse<Viewing>;
export type CreateViewingResponse = ApiResponse<{ id: string }>;

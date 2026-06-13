import { api } from '../../services/api';
import type { AuthResponse } from './types';

export const login = async (email: string, password: string): Promise<AuthResponse> => {
  const { data } = await api.post<AuthResponse>('/auth/login', { email, password });
  return data;
};

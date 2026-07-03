import API from './api';
import { AuthResponse, LoginPayload, RegisterPayload } from '@/types';

export const login = async (payload: LoginPayload) => {
  const response = await API.post<AuthResponse>('/auth/login', payload);
  return response.data;
};

export const register = async (payload: RegisterPayload) => {
  const response = await API.post<AuthResponse>('/auth/register', payload);
  return response.data;
};

export const refreshToken = async () => {
  const response = await API.post<AuthResponse>('/auth/refresh-token', null);
  return response.data;
};

export const logout = async () => {
  await API.post('/auth/logout');
};

export const getLeads = async () => {
  const response = await API.get('/auth/users/leads');
  return response.data;
};
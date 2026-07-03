import API from './api';
import { RegisterPayload } from '@/types';

export const register = async (payload: RegisterPayload) => {
  const response = await API.post('/auth/register', payload);
  return response.data;
};
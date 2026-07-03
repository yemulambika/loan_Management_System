import API from './api';
import { Payment } from '@/types';

export const getPayments = async (filters?: Record<string, any>) => {
  const response = await API.get('/payment/all', { params: filters });
  return response.data;
};

export const addPayment = async (data: Partial<Payment>) => {
  const response = await API.post('/payment/add', data);
  return response.data;
};
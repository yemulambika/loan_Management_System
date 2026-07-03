import API from './api';
import { DashboardStats } from '@/types';

export const getDashboardStats = async () => {
  const response = await API.get('/dashboard/stats');
  return response.data as DashboardStats;
};
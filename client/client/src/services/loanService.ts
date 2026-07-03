import API from './api';
import { Loan } from '@/types';

export const getLoans = async () => {
  const response = await API.get('/loan');
  return response.data;
};

export const getLoanById = async (id: string) => {
  const response = await API.get(`/loan/${id}`);
  return response.data;
};

export const getPendingLoans = async () => {
  const response = await API.get('/loan/pending');
  return response.data;
};

export const getSanctionedLoans = async () => {
  const response = await API.get('/loan/sanctioned');
  return response.data;
};

export const getDisbursedLoans = async () => {
  const response = await API.get('/loan/disbursed');
  return response.data;
};

export const getFollowUps = async () => {
  const response = await API.get('/loan/followups');
  return response.data;
};

export const updateLoanStatus = async (id: string, status: string) => {
  const response = await API.put(`/loan/${id}/status`, { status });
  return response.data;
};

export const applyLoan = async (data: Partial<Loan>) => {
  const response = await API.post('/loan/apply', data);
  return response.data;
};

export const updateLoan = async (id: string, data: Partial<Loan>) => {
  const response = await API.put(`/loan/${id}`, data);
  return response.data;
};

export const deleteLoan = async (id: string) => {
  const response = await API.delete(`/loan/${id}`);
  return response.data;
};
import axios from 'axios';

// Use Render backend for production, localhost for development
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://loan-management-system-zy9g.onrender.com';

export const API = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  withCredentials: true,
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const response = await axios.post(
          `${API_BASE_URL}/api/auth/refresh-token`,
          null,
          { withCredentials: true }
        );
        if (response.data?.token) {
          localStorage.setItem('token', response.data.token);
          originalRequest.headers.Authorization = `Bearer ${response.data.token}`;
          return API(originalRequest);
        }
      } catch (err) {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
      }
    }
    return Promise.reject(error);
  }
);

export default API;
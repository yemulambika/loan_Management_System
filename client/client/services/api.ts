import axios from "axios";

const defaultApiUrl = "http://localhost:5000";
const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL
  ? `${process.env.NEXT_PUBLIC_API_URL}/api`
  : `${defaultApiUrl}/api`;

const API = axios.create({
  baseURL: apiBaseUrl,
  withCredentials: true,
});

API.interceptors.request.use((config) => {
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      try {
        const refreshResponse = await axios.post(
          `${apiBaseUrl}/auth/refresh-token`,
          null,
          {
            withCredentials: true,
          }
        );

        if (refreshResponse.data?.token) {
          localStorage.setItem("token", refreshResponse.data.token);
          originalRequest.headers.Authorization = `Bearer ${refreshResponse.data.token}`;
          return API(originalRequest);
        }
      } catch {
        if (typeof window !== "undefined") {
          localStorage.removeItem("token");
          localStorage.removeItem("role");
        }
      }
    }

    return Promise.reject(error);
  }
);

export default API;
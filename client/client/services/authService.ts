import { LoginPayload, RegisterPayload } from "@/types";
import API from "@/services/api";

export type AuthResponse = {
  token: string;
  role: string;
  user?: {
    id: string;
    name: string;
    email: string;
    role: string;
    stage: string;
    hasLoan: boolean;
  };
};

const login = async (payload: LoginPayload) => {
  return API.post<AuthResponse>("/auth/login", payload);
};

const register = async (payload: RegisterPayload) => {
  return API.post<AuthResponse>("/auth/register", payload);
};

const refreshSession = async () => {
  return API.post<AuthResponse>("/auth/refresh-token", null);
};

const logout = async () => {
  return API.post("/auth/logout", null);
};

const authService = {
  login,
  register,
  refreshSession,
  logout,
};

export default authService;

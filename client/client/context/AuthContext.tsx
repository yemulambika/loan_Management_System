"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import authService, { AuthResponse } from "@/services/authService";
import { LoginPayload, RegisterPayload, UserProfile } from "@/types";

type AuthContextValue = {
  isAuthenticated: boolean;
  loading: boolean;
  user: UserProfile | null;
  role: string;
  login: (payload: LoginPayload) => Promise<AuthResponse>;
  register: (payload: RegisterPayload) => Promise<AuthResponse>;
  logout: () => Promise<void>;
  refreshSession: () => Promise<AuthResponse>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [role, setRole] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const syncSession = (data: AuthResponse) => {
    if (data.token) {
      localStorage.setItem("token", data.token);
    }
    if (data.role) {
      localStorage.setItem("role", data.role);
      setRole(data.role.toString().toLowerCase());
    }
    if (data.user) {
      setUser(data.user);
    }
    setIsAuthenticated(true);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedRole = localStorage.getItem("role");

    if (token) {
      setIsAuthenticated(true);
      setRole(storedRole?.toString().toLowerCase() || "");
    }

    setLoading(false);
  }, []);

  const login = async (payload: LoginPayload) => {
    const response = await authService.login(payload);
    syncSession(response.data);
    return response.data;
  };

  const register = async (payload: RegisterPayload) => {
    const response = await authService.register(payload);
    syncSession(response.data);
    return response.data;
  };

  const refreshSession = async () => {
    const response = await authService.refreshSession();
    syncSession(response.data);
    return response.data;
  };

  const logout = async () => {
    await authService.logout();
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setIsAuthenticated(false);
    setRole("");
    setUser(null);
    router.push("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        loading,
        user,
        role,
        login,
        register,
        logout,
        refreshSession,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};

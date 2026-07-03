import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '@/services/api';
import { User, AuthResponse } from '@/types';
import { toast } from 'sonner';

interface AuthContextType {
  user: User | null;
  role: string;
  isAuthenticated: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<string>('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedRole = localStorage.getItem('role');
    if (token) {
      setIsAuthenticated(true);
      setRole(storedRole || 'borrower');
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await API.post<AuthResponse>('/auth/login', { email, password });
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        const userRole = response.data.role || 'borrower';
        localStorage.setItem('role', userRole);
        setRole(userRole);
        if (response.data.user) {
          setUser(response.data.user as User);
        }
        setIsAuthenticated(true);
        toast.success('Login successful!');
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Login failed. Please check your credentials.';
      toast.error(errorMessage);
      throw new Error(errorMessage);
    }
  };

  const logout = async () => {
    try {
      await API.post('/auth/logout');
    } catch (error) {
      // ignore
    }
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    setUser(null);
    setRole('');
    setIsAuthenticated(false);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, role, isAuthenticated, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
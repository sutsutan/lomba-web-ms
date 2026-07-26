import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';
import api, { BACKEND_ROOT } from '../lib/api';

interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'user' | 'marketing';
  internal_type?: 'student' | 'teacher' | 'staff' | 'alumni' | 'none';
  is_approved?: boolean;
}

interface AuthContextType {
  user: User | null;
  isAdmin: boolean;
  isMarketing: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await api.get('/me');
        setUser(res.data.user);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    try {
      await axios.get(`${BACKEND_ROOT}/sanctum/csrf-cookie`, {
        withCredentials: true,
      });

      const res = await api.post('/admin', { email, password });

      setUser(res.data.user);
    } catch (error: any) {
      if (error.response?.status === 419) {
        console.error('CSRF Token Mismatch: Periksa SESSION_DOMAIN / SANCTUM_STATEFUL_DOMAINS di .env Laravel!');
      } else if (error.response?.status === 422) {
        console.log('Validasi gagal:', error.response.data.errors);
      }
      throw error;
    }
  };

  const logout = async () => {
    try {
      await api.post('/logout');
    } finally {
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAdmin: user?.role === 'admin',
        isMarketing: user?.role === 'marketing',
        login,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
);
}

export const useAuth = () => useContext(AuthContext);
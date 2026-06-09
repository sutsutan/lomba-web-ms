import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../lib/api';

interface User { 
  id: number; 
  name: string; 
  email: string; 
  role: 'admin' | 'user'; 
}

interface AuthContextType {
  user: User | null;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mengecek sesi user yang sedang login
    api.get('/me')
      .then(res => setUser(res.data))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    try {
      await api.get('/sanctum/csrf-cookie');
      
      const res = await api.post('/admin/login', { email, password });
      
      setUser(res.data.user);
    } catch (error: any) {
      if (error.response?.status === 419) {
        console.error("CSRF Token Mismatch: Periksa SESSION_DOMAIN di .env Laravel!");
      } else if (error.response?.status === 422) {
        console.log("Validasi gagal:", error.response.data.errors);
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
    <AuthContext.Provider value={{ 
      user, 
      isAdmin: user?.role === 'admin',
      login, 
      logout, 
      loading 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
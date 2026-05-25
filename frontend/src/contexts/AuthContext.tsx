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
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/api/me')
      .then(res => setUser(res.data))
      .catch((err) => {
        if (err.response?.status !== 401) {
            console.error("Terjadi error tak terduga:", err);
        }
        setUser(null);
      })
      .finally(() => setLoading(false));
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    try {
      await api.get('/sanctum/csrf-cookie');
      
      const res = await api.post('/api/login', { email, password });
      
      setUser(res.data.user);
    } catch (error) {
      console.error("Login gagal:", error);
      throw error;
    }
  };

  const logout = async () => {
    await api.post('/api/logout');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
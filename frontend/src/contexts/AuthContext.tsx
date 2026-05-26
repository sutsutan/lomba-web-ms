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
  api.get('/api/me')
    .then(res => setUser(res.data))
    .catch((err) => {
      if (err.response?.status !== 401) {
        console.error("Terjadi masalah saat mengecek sesi:", err);
      }
      setUser(null);
    })
    .finally(() => setLoading(false));
}, []);

  const login = async (email: string, password: string): Promise<void> => {
    try {
      console.log("Meminta CSRF cookie...");
      await api.get('/sanctum/csrf-cookie');
      
      console.log("Mengirim request login...");
      const res = await api.post('/api/internal/sekolah/login', { email, password });
      
      setUser(res.data.user);
    } catch (error: any) {
      if (error.response?.status === 419) {
       console.error("CSRF Token Mismatch: Periksa SESSION_DOMAIN di .env Laravel!");
    }
  if (error.response && error.response.status === 422) {
    console.log("Detail Error Validasi:", error.response.data.errors);
    alert("Login gagal: " + JSON.stringify(error.response.data.errors));
  } else {
    console.error("Login gagal:", error);
  }
  throw error;
}
  };

  const logout = async () => {
    await api.post('/api/logout');
    setUser(null);
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
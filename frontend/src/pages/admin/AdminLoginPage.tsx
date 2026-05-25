import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { login } = useAuth(); 
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setError('');
  setIsSubmitting(true);

  try {
    await axios.get('/sanctum/csrf-cookie', {
      baseURL: 'http://localhost:8000',
      withCredentials: true 
    });

    await login(email, password);
    
    navigate('/admin');
  } catch (err: unknown) {
    setError('Email atau password salah. Pastikan data yang dimasukkan benar.');
  } finally {
    setIsSubmitting(false);
  }
};

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-1">Admin Login</h2>
          <p className="text-sm text-gray-500">Masuk untuk mengakses panel konfigurasi sekolah.</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-xl text-xs font-medium mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1.5">Email</label>
            <input 
              type="email" 
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 outline-none transition-all text-sm text-gray-800 bg-white"
              value={email} 
              onChange={e => setEmail(e.target.value)} 
              placeholder="admin@sekolah.sch.id"
              required 
            />
          </div>
          
          {/* Bagian Password dengan Toggle Show/Hide */}
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1.5">Password</label>
            <div className="relative">
              <input 
                type={showPassword ? "text" : "password"} 
                className="w-full px-3.5 py-2.5 pr-10 rounded-xl border border-gray-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 outline-none transition-all text-sm text-gray-800 bg-white"
                value={password} 
                onChange={e => setPassword(e.target.value)} 
                placeholder="••••••••"
                required 
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-medium py-2.5 rounded-xl transition-colors shadow-lg shadow-indigo-100 mt-2"
          >
            {isSubmitting ? 'Memverifikasi...' : 'Masuk ke Dashboard'}
          </button>
        </form>
      </div>
    </div>
  );
}
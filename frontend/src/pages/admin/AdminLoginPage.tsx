import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Lock, Mail } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import logoMetland from '@/assets/metland.png';
import schoolImg from '@/assets/school.jpeg';

interface AdminLoginPageProps {
  onLogin?: (user: { name: string; role: string }) => void;
}

export default function AdminLoginPage({ onLogin }: AdminLoginPageProps) {
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
      await login(email, password);
      
      if (onLogin) {
        onLogin({ name: 'Administrator', role: 'admin' });
      }
      
      navigate('/dashboard'); 
    } catch (err: any) {
      if (err.response?.status === 422) {
        const messages = err.response.data.errors;
        const firstError = Object.values(messages)[0] as string[];
        setError(firstError[0]);
      } else {
        setError('Email atau password salah. Silakan periksa kembali.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div 
  className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-cover bg-center"
  style={{ 
    backgroundImage: `url(${schoolImg})` 
  }}
>
      
      <div 
        className="absolute inset-0 opacity-95 pointer-events-none mix-blend-multiply bg-gradient-to-br from-slate-900 via-[#11606b] to-emerald-950" 
      />

      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="relative w-full max-w-md z-10">
        {/* Header Logo */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-20 h-20 mb-4 p-2 select-none">
             <img src={logoMetland} alt="Logo" className="w-full h-full object-contain" />  
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight drop-shadow-sm">Admin Panel</h1>
          <p className="text-teal-200 text-sm mt-1">Sistem Manajemen Website Sekolah</p>
        </div>

        {/* Card Form Premium (Glassmorphism) */}
        <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-white">Selamat Datang</h2>
            <p className="text-xs text-teal-100/70">Masuk untuk mengakses panel konfigurasi sekolah.</p>
          </div>

          {/* Banner Pesan Error Kompatibel dengan Deteksi 422 */}
          {error && (
            <div className="bg-red-500/20 border border-red-500/30 text-red-200 rounded-xl px-4 py-3 text-xs font-medium mb-5 animate-pulse flex items-center gap-2">
              <span>⚠️</span>
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Input Email */}
            <div>
              <label className="block text-xs font-semibold text-teal-100 uppercase tracking-wider mb-2">
                Email Terdaftar
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-teal-300/60">
                  <Mail className="w-4 h-4" />
                </div>
                <input 
                  type="email" 
                  className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-teal-200/30 focus:outline-none focus:ring-2 focus:ring-[#11606b]/60 focus:border-transparent transition-all text-sm"
                  value={email} 
                  onChange={e => setEmail(e.target.value)} 
                  placeholder="admin@sekolah.sch.id"
                  required 
                />
              </div>
            </div>
            
            {/* Input Password */}
            <div>
              <label className="block text-xs font-semibold text-teal-100 uppercase tracking-wider mb-2">
                Kata Sandi
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-teal-300/60">
                  <Lock className="w-4 h-4" />
                </div>
                <input 
                  type={showPassword ? "text" : "password"} 
                  className="w-full pl-10 pr-10 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-teal-200/30 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-transparent transition-all text-sm"
                  value={password} 
                  onChange={e => setPassword(e.target.value)} 
                  placeholder="••••••••"
                  required 
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-teal-300/60 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Tombol Submit dengan Aksen Warna Brand Teal #11606b */}
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full bg-[#11606b] hover:bg-[#167481] disabled:bg-teal-950/80 text-white font-semibold py-3 rounded-xl transition-all shadow-lg shadow-teal-950/40 mt-6 flex items-center justify-center gap-2 text-sm"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Memverifikasi Akses...</span>
                </>
              ) : (
                'Masuk ke Dashboard'
              )}
            </button>
          </form>
        </div>
        
        {/* Footer */}
        <p className="text-center text-teal-200/40 text-[11px] mt-6 select-none">
          Copyright &copy; {new Date().getFullYear()} — 3SiteDev
        </p>
      </div>
    </div>
  );
}
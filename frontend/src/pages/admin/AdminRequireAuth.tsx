import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext'; // Sesuaikan path jika berbeda

interface AdminRequireAuthProps {
  children: React.ReactNode;
}

export default function AdminRequireAuth({ children }: AdminRequireAuthProps) {
  // Menggunakan 'loading' dan 'user' sesuai dengan AuthContext Anda
  const { user, loading, isAdmin } = useAuth(); 

  // Tunggu sampai pengecekan API /me selesai dilakukan oleh useEffect di Context
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  // Pengaman: Jika user tidak ada ATAU user bukan admin (role !== 'admin')
  // langsung dialihkan ke halaman login admin
  if (!user || !isAdmin) {
    return <Navigate to="/admin/login" replace />;
  }

  // Jika lolos verifikasi, tampilkan halaman admin yang dituju
  return <>{children}</>;
}
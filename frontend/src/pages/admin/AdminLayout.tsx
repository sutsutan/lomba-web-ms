import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext'; // Sesuaikan path context Anda
import { Icon } from '../../components/admin/Icons'; // Pastikan path Icon benar

export default function AdminLayout() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  
  // Mengambil data user dan fungsi logout dari AuthContext, bukan dari props!
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { path: '/admin', label: 'Dashboard', icon: 'dashboard' },
    { path: '/admin/hero', label: 'Hero Background', icon: 'image' },
    { path: '/admin/achievements', label: 'Prestasi', icon: 'trophy' },
    { path: '/admin/partnerships', label: 'Kemitraan', icon: 'handshake' },
    { path: '/admin/testimonies', label: 'Testimoni', icon: 'star' },
    { path: '/admin/majors', label: 'Jurusan', icon: 'book' },
    { path: '/admin/facilities', label: 'Fasilitas', icon: 'building' },
    { path: '/admin/activity-gallery', label: 'Galeri Kegiatan', icon: 'camera' },
    { path: '/admin/student-works', label: 'Karya Siswa', icon: 'palette' },
    { path: '/admin/teachers', label: 'Guru & Staf', icon: 'users' },
    { path: '/admin/extracurriculars', label: 'Ekskul', icon: 'sportball' },
    { path: '/admin/organizations', label: 'Organisasi', icon: 'flag' },
    { path: '/admin/news', label: 'Berita', icon: 'newspaper' },
    { path: '/admin/explore-gallery', label: 'Galeri Eksplorasi', icon: 'camera' },
    { path: '/admin/alumni', label: 'Alumni', icon: 'globe' },
  ];

  const handleLogoutClick = async () => {
    if (confirm('Apakah Anda yakin ingin keluar dari sistem admin?')) {
      await logout();
      navigate('/admin/login');
    }
  };

  const currentLabel = navItems.find(item => item.path === location.pathname)?.label || 'Dashboard';

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar Panel */}
      <aside className={`bg-slate-950 text-slate-300 transition-all duration-300 flex flex-col z-20 ${sidebarCollapsed ? 'w-20' : 'w-64'}`}>
        <div className="h-16 flex items-center justify-between px-4 border-b border-slate-800 bg-slate-900">
          {!sidebarCollapsed && <span className="font-bold text-white tracking-wide">PANEL ADMIN</span>}
          <button onClick={() => setSidebarCollapsed(!sidebarCollapsed)} className="p-1.5 hover:bg-slate-800 rounded-xl">
            <Icon name="menu" className="w-5 h-5 text-white" />
          </button>
        </div>
        
        <nav className="flex-1 overflow-y-auto p-3 space-y-1">
          {navItems.map(item => {
            const isActive = location.pathname === item.path;
            return (
              <Link 
                key={item.path} 
                to={item.path} 
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${isActive ? 'bg-indigo-600 text-white shadow-md' : 'hover:bg-slate-900 hover:text-slate-100'}`}
              >
                <Icon name={item.icon} className="w-5 h-5 flex-shrink-0" />
                {!sidebarCollapsed && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-800 bg-slate-900 flex items-center justify-between">
          {!sidebarCollapsed && (
            <div className="truncate pr-2">
              <p className="text-xs text-slate-400 font-semibold truncate">{user?.name || 'Admin Sekolah'}</p>
              <p className="text-[10px] text-slate-500 truncate">{user?.email || 'admin@sekolah.sch.id'}</p>
            </div>
          )}
          <button onClick={handleLogoutClick} className="p-2 hover:bg-red-900/40 text-slate-400 hover:text-red-400 rounded-xl transition-colors" title="Keluar">
            <Icon name="logout" className="w-5 h-5" />
          </button>
        </div>
      </aside>

      {/* Main Workspace Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-gray-100 px-6 h-16 flex items-center justify-between">
          <div className="text-sm font-semibold text-gray-700">{currentLabel}</div>
          <div className="flex items-center gap-3">
            <div className="text-xs text-gray-400">
              {new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </div>
            <div className="flex items-center gap-2 bg-indigo-50 rounded-xl px-3 py-1.5 text-indigo-600 font-medium text-xs">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Sistem Aktif
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto bg-gray-50/50">
          {/* Outlet inilah yang bertugas merender halaman internal admin seperti Dashboard, Hero, dll */}
          <Outlet />
        </main>
      </div>
    </div>
  );
}
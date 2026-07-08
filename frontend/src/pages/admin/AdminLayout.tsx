import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Icon } from '../../components/admin/Icons';
import metland from '@/assets/metland.png';

export default function AdminLayout() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
  { path: '/dashboard', label: 'Dashboard', icon: 'LayoutDashboard' },
  { path: '/dashboard/hero', label: 'Hero Background', icon: 'Image' },
  { path: '/dashboard/achievements', label: 'Prestasi', icon: 'Trophy' },
  { path: '/dashboard/partnerships', label: 'Kemitraan', icon: 'Handshake' },
  { path: '/dashboard/testimonies', label: 'Testimoni', icon: 'Star' },
  { path: '/dashboard/majors', label: 'Jurusan', icon: 'BookOpen' },
  { path: '/dashboard/facilities', label: 'Fasilitas', icon: 'Building2' },
  { path: '/dashboard/activity-gallery', label: 'Galeri Kegiatan', icon: 'Camera' },
  { path: '/dashboard/student-works', label: 'Karya Siswa', icon: 'Palette' },
  { path: '/dashboard/teachers', label: 'Guru & Staf', icon: 'Users' },
  { path: '/dashboard/extracurriculars', label: 'Ekskul', icon: 'GraduationCap' },
  { path: '/dashboard/organizations', label: 'Organisasi', icon: 'Flag' },
  { path: '/dashboard/news', label: 'Berita', icon: 'Newspaper' },
  { path: '/dashboard/explore-gallery', label: 'Galeri Eksplorasi', icon: 'ImagePlus' },
  { path: '/dashboard/alumni', label: 'Alumni', icon: 'Globe' },
  { path: '/dashboard/manage-user', label: 'Manajemen User', icon: 'UserCog' },
];

  const handleLogoutClick = async () => {
    if (confirm('Apakah Anda yakin ingin keluar dari sistem admin?')) {
      await logout();
      navigate('/admin');
    }
  };

  const currentLabel = navItems.find(item => item.path === location.pathname)?.label || 'Dashboard';
  

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar Panel */}
      <aside className={`bg-teal-950 text-slate-300 transition-all duration-300 flex flex-col z-20 ${sidebarCollapsed ? 'w-20' : 'w-64'}`}>
        <div className="h-16 flex items-center justify-between px-4 border-b border-teal-800 bg-teal-900">
          {!sidebarCollapsed && <span className="font-bold text-white tracking-wide">PANEL ADMIN</span>}
          <img src={metland} alt="Logo Metland" className="w-8 h-8 object-contain" />
          <button onClick={() => setSidebarCollapsed(!sidebarCollapsed)} className="p-1.5 hover:bg-teal-800 rounded-xl">
            <Icon name="Menu" className="w-5 h-5 text-white" />
          </button>
        </div>
        
        <nav className="flex-1 overflow-y-auto p-3 space-y-1">
          {navItems.map(item => {
            const isActive = location.pathname === item.path || 
                            (item.path !== '/dashboard' && location.pathname.startsWith(item.path));
            
            return (
              <Link 
                key={item.path} 
                to={item.path} 
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  isActive ? 'bg-teal-600 text-white shadow-md' : 'hover:bg-teal-800 hover:text-slate-100'
                }`}
              >
                <Icon name={item.icon} className="w-5 h-5 flex-shrink-0" />
                {!sidebarCollapsed && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-b border-teal-800 bg-teal-900 flex items-center justify-between">
          {!sidebarCollapsed && (
            <div className="truncate pr-2">
              <p className="text-xs text-slate-400 font-semibold truncate">{user?.name || 'Admin Sekolah'}</p>
              <p className="text-[10px] text-slate-500 truncate">{user?.email || 'admin@sekolah.sch.id'}</p>
            </div>
          )}
          <button onClick={handleLogoutClick} className="p-2 hover:bg-red-900/40 text-slate-400 hover:text-red-400 rounded-xl transition-colors" title="Keluar">
            <Icon name="LogOut" className="w-5 h-5" />
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
          <Outlet />
        </main>
      </div>
    </div>
  );
}
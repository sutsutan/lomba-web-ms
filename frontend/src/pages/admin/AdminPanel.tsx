import React, { useState } from 'react';

import Sidebar, { ActivePage, navItems } from '@/components/admin/Sidebar';
import AdminLoginPage from '@/pages/admin/AdminLoginPage';
import PlaceholderPage from '@/components/admin/PlaceHolderPage';

import Dashboard from './AdminDashboard';
import HeroPage from './AdminHeroPage';
import AdminAchievementPage from './AdminAchievementPage';
import AdminTeachersPage from './AdminTeachersPage';
import AdminNewsPage from './AdminNewsPage';
import AdminAlumniPage from './AdminAlumniPage';
import AdminPartnershipPage from './AdminPartnershipPage';
import AdminExtracurricularPage from './AdminExtracurricularsPage';
import AdminManageUserPage from './AdminManageUser';

export default function AdminPanel() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({ name: '', role: '' });
  const [activePage, setActivePage] = useState<ActivePage>('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const handleLogin = (userData: { name: string; role: string }) => {
    setUser(userData);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser({ name: '', role: '' });
    setActivePage('dashboard');
  };

  if (!isLoggedIn) {
    return <AdminLoginPage onLogin={handleLogin} />;
  }

  // Fungsi Render Halaman Berdasarkan State Navigasi Aktual
  const renderPage = () => {
    switch (activePage) {
      case 'dashboard': return <Dashboard />;
      case 'hero': return <HeroPage />;
      case 'achievements': return <AdminAchievementPage />;
      case 'teachers': return <AdminTeachersPage />;
      case 'news': return <AdminNewsPage />;
      case 'alumni': return <AdminAlumniPage />;
      case 'partnerships': return <AdminPartnershipPage />;
      case 'extracurriculars': return <AdminExtracurricularPage />;
      case 'manage-user': return <AdminManageUserPage />;
      
      case 'testimonies': 
        return <PlaceholderPage title="Testimoni" description="Kelola testimoni dari siswa, orang tua, dan dunia industri" />;
      case 'majors': 
        return <PlaceholderPage title="Jurusan Keahlian" description="Kelola data kompetensi keahlian sekolah" />;
      case 'facilities': 
        return <PlaceholderPage title="Sarana & Fasilitas" description="Kelola data inventaris fasilitas penunjang belajar siswa" />;
      case 'activity-gallery': 
        return <PlaceholderPage title="Galeri Kegiatan" description="Dokumentasi dokumenter foto kegiatan per bidang keahlian" />;
      case 'student-works': 
        return <PlaceholderPage title="Karya & Inovasi Siswa" description="Portofolio produk kreatifitas siswa ciptaan mandiri" />;
      case 'organizations': 
        return <PlaceholderPage title="Organisasi Siswa" description="Kelola data kepengurusan MPK, OSIS, maupun Dewan Ambalan" />;
      case 'explore-gallery': 
        return <PlaceholderPage title="Galeri Eksplorasi" description="Dokumentasi penjelajahan eksternal siswa" />;
      default: 
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden font-sans antialiased">
      {/* Sidebar Kiri Navigation */}
      <Sidebar
        activePage={activePage}
        onNavigate={setActivePage}
        userName={user.name || 'Admin Sekolah'} // Fallback nama jika string kosong
        onLogout={handleLogout}
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      
      {/* Konten Area Kanan */}
      <main className="flex-1 overflow-y-auto flex flex-col h-full">
        {/* Topbar sticky header */}
        <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-gray-100 px-6 py-3.5 flex items-center justify-between shrink-0">
          <div className="text-sm font-semibold text-gray-700 capitalize">
            {navItems.find(n => n.key === activePage)?.label || 'Dashboard'}
          </div>
          <div className="flex items-center gap-4">
            <div className="text-xs text-gray-400 font-medium">
              {new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </div>
            <div className="flex items-center gap-2 bg-indigo-50 border border-indigo-100 rounded-xl px-3 py-1.5 shadow-sm">
              <div className="w-5 h-5 bg-indigo-600 rounded-full flex items-center justify-center text-white text-[10px] font-bold select-none">
                {user.name ? user.name[0].toUpperCase() : 'A'}
              </div>
              <span className="text-xs font-semibold text-indigo-700">{user.name || 'Admin'}</span>
            </div>
          </div>
        </div>

        {/* View Content Container */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            {renderPage()}
          </div>
        </div>
      </main>
    </div>
  );
}
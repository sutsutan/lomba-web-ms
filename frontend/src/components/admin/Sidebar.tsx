import React from 'react';
import { Icon } from './Icons';

// Ditambahkan tipe 'manage-user' ke dalam ActivePage union
export type ActivePage = 
  | 'dashboard' | 'hero' | 'partnerships' | 'teachers' | 'news' | 'alumni' 
  | 'extracurriculars' | 'testimonies' | 'majors' | 'facilities' | 'activity-gallery' 
  | 'student-works' | 'organizations' | 'explore-gallery' | 'manage-user' | 'achievements';

interface NavItem {
  key: ActivePage;
  label: string;
  icon: string;
}

// Data Array Navigasi Menu (Ditambahkan menu "Manajemen User" di posisi paling bawah)
export const navItems: NavItem[] = [
  { key: 'dashboard', label: 'Dashboard', icon: 'layout-dashboard' },
  { key: 'hero', label: 'Hero Banner', icon: 'image' },
  { key: 'teachers', label: 'Guru & Staf', icon: 'users' },
  { key: 'news', label: 'Berita & Artikel', icon: 'newspaper' },
  { key: 'alumni', label: 'Tracer Alumni', icon: 'graduation-cap' },
  { key: 'achievements', label: 'Prestasi Siswa', icon: 'trophy' },
  { key: 'partnerships', label: 'Mitra Industri', icon: 'briefcase' },
  { key: 'extracurriculars', label: 'Ekstrakurikuler', icon: 'heart' },
  { key: 'testimonies', label: 'Testimoni', icon: 'message-square' },
  { key: 'majors', label: 'Program Keahlian', icon: 'book-open' },
  { key: 'facilities', label: 'Fasilitas Belajar', icon: 'building' },
  { key: 'activity-gallery', label: 'Galeri Kegiatan', icon: 'images' },
  { key: 'student-works', label: 'Karya Siswa', icon: 'folder-heart' },
  { key: 'organizations', label: 'Organisasi Siswa', icon: 'shield' },
  { key: 'explore-gallery', label: 'Jelajah Galeri', icon: 'compass' },
  { key: 'manage-user', label: 'Manajemen User', icon: 'user-cog' }, // <-- PENAMBAHAN MENU BARU
];

interface SidebarProps {
  activePage: ActivePage;
  onNavigate: (page: ActivePage) => void;
  userName: string;
  onLogout: () => void;
  collapsed: boolean;
  onToggle: () => void;
}

export default function Sidebar({ activePage, onNavigate, userName, onLogout, collapsed, onToggle }: SidebarProps) {
  return (
    <aside className={`${collapsed ? 'w-16' : 'w-64'} bg-slate-900 flex flex-col transition-all duration-300 shrink-0 h-screen sticky top-0 z-20`}>
      {/* Sidebar Header Brand */}
      <div className={`flex items-center ${collapsed ? 'justify-center px-0 py-4' : 'justify-between px-5 py-5'} border-b border-slate-800`}>
        {!collapsed && (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-indigo-600 rounded-xl flex items-center justify-center text-sm">🏫</div>
            <div>
              <div className="text-white font-bold text-sm leading-tight">Admin Panel</div>
              <div className="text-slate-400 text-xs">CMS Website</div>
            </div>
          </div>
        )}
        <button onClick={onToggle} className="p-1.5 hover:bg-slate-800 rounded-lg transition-colors text-slate-400 hover:text-white">
          <Icon name="menu" className="w-5 h-5" />
        </button>
      </div>

      {/* Navigasi List Link */}
      <nav className="flex-1 overflow-y-auto py-3 space-y-0.5 px-2 custom-scrollbar">
        {navItems.map(item => (
          <button
            key={item.key}
            onClick={() => onNavigate(item.key)}
            className={`w-full flex items-center ${collapsed ? 'justify-center px-0' : 'gap-3 px-3'} py-2.5 rounded-xl text-sm font-medium transition-all group relative ${activePage === item.key
              ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20'
              : 'text-slate-400 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <Icon name={item.icon} className="w-5 h-5 shrink-0" />
            {!collapsed && <span className="truncate">{item.label}</span>}
            
            {/* Tooltip pas sidebar mengecil */}
            {collapsed && (
              <div className="absolute left-full ml-3 px-3 py-1.5 bg-slate-800 text-white text-xs rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 border border-slate-700">
                {item.label}
              </div>
            )}
          </button>
        ))}
      </nav>

      {/* User Session Footer */}
      <div className="border-t border-slate-800 p-3 bg-slate-950/40">
        <div className="flex items-center justify-between gap-3">
          {!collapsed && (
            <div className="flex-1 min-w-0 px-1">
              <div className="text-white text-sm font-medium truncate">{userName}</div>
              <div className="text-slate-500 text-xs font-normal">Super Admin</div>
            </div>
          )}
          <button onClick={onLogout} className="p-2 hover:bg-red-500/20 rounded-xl transition-colors text-slate-400 hover:text-red-400" title="Keluar Aplikasi">
            <Icon name="logout" className="w-5 h-5" />
          </button>
        </div>
      </div>
    </aside>
  );
}
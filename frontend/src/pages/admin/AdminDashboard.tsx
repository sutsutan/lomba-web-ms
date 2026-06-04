import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../../components/admin/Icons';

const mockStats = {
  teachers: 42, news: 18, alumni: 236, students_works: 54,
  achievements: 31, organizations: 8, extracurriculars: 14, partnerships: 27,
  users: 115,
};

export default function AdminDashboard() {
  const navigate = useNavigate();

  const stats = [
    { label: 'Guru & Staf', value: mockStats.teachers, icon: 'users', color: 'indigo', path: '/dashboard/teachers' },
    { label: 'Berita', value: mockStats.news, icon: 'newspaper', color: 'blue', path: '/dashboard/news' },
    { label: 'Alumni', value: mockStats.alumni, icon: 'globe', color: 'emerald', path: '/dashboard/alumni' },
    { label: 'Karya Siswa', value: mockStats.students_works, icon: 'palette', color: 'violet', path: '/dashboard/student-works' },
    { label: 'Prestasi', value: mockStats.achievements, icon: 'trophy', color: 'amber', path: '/dashboard/achievements' },
    { label: 'Organisasi', value: mockStats.organizations, icon: 'flag', color: 'rose', path: '/dashboard/organizations' },
    { label: 'Ekskul', value: mockStats.extracurriculars, icon: 'sportball', color: 'orange', path: '/dashboard/extracurriculars' },
    { label: 'Mitra', value: mockStats.partnerships, icon: 'handshake', color: 'teal', path: '/dashboard/partnerships' },
    { label: 'Manajemen User', value: mockStats.users, icon: 'users', color: 'cyan', path: '/dashboard/manage-user' },
  ];

  const colorMap: Record<string, string> = {
    indigo: 'bg-indigo-50 text-indigo-600',
    blue: 'bg-blue-50 text-blue-600',
    emerald: 'bg-emerald-50 text-emerald-600',
    violet: 'bg-violet-50 text-violet-600',
    amber: 'bg-amber-50 text-amber-600',
    rose: 'bg-rose-50 text-rose-600',
    orange: 'bg-orange-50 text-orange-600',
    teal: 'bg-teal-50 text-teal-600',
    cyan: 'bg-cyan-50 text-cyan-600',
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Selamat Datang di Admin Panel</h1>
        <p className="text-gray-500 mt-1">Kelola seluruh konten website sekolah dari sini.</p>
      </div>

      {/* Grid Statistik Utama */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mb-8">
        {stats.map(stat => (
          <div key={stat.label} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${colorMap[stat.color]}`}>
              <Icon name={stat.icon} className="w-5 h-5" />
            </div>
            <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
            <div className="text-xs text-gray-500 mt-0.5">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Panel Akses Cepat */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <h3 className="font-bold text-gray-800 mb-4">Akses Cepat</h3>
          <div className="grid grid-cols-2 gap-3">
            {stats.map(item => (
              <button 
                key={item.path} 
                onClick={() => navigate(item.path)} 
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-indigo-50 transition-colors text-left group"
              >
                <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                  <Icon name={item.icon} className="w-4 h-4" />
                </div>
                <span className="text-sm font-medium text-gray-700">{item.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Info Detail Sistem */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <h3 className="font-bold text-gray-800 mb-4">Info Sistem</h3>
          <div className="space-y-3">
            {[
              { label: 'Framework Router', value: 'React Router DOM v6', ok: true },
              { label: 'State Management', value: 'React Context API', ok: true },
              { label: 'Query Handler', value: 'TanStack Query v5', ok: true },
              { label: 'Style Engine', value: 'Tailwind CSS', ok: true },
            ].map(item => (
              <div key={item.label} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                <span className="text-sm text-gray-500">{item.label}</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-700">{item.value}</span>
                  <div className={`w-2 h-2 rounded-full ${item.ok ? 'bg-emerald-400' : 'bg-red-400'}`} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 
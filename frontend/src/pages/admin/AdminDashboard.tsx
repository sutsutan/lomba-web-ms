import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../../components/admin/Icons';
import { getAdminStats, AdminStats } from '@/services/Dashboard';
import { useAuth } from '../../contexts/AuthContext';

const emptyStats: AdminStats = {
  teachers: 0, news: 0, alumni: 0, students_works: 0,
  achievements: 0, organizations: 0, extracurriculars: 0,
  partnerships: 0, users: 0,
};

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { isMarketing } = useAuth();
  const [statsData, setStatsData] = useState<AdminStats>(emptyStats);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    getAdminStats().then(data => {
      if (mounted) {
        setStatsData(data);
        setLoading(false);
      }
    });
    return () => { mounted = false; };
  }, []);

  const allStats = [
    { key: 'teachers', label: 'Guru & Staf', value: statsData.teachers, icon: 'Users', color: 'indigo', path: '/dashboard/teachers', marketingVisible: false },
    { key: 'news', label: 'Berita', value: statsData.news, icon: 'Newspaper', color: 'blue', path: '/dashboard/news', marketingVisible: true },
    { key: 'alumni', label: 'Alumni', value: statsData.alumni, icon: 'Globe', color: 'emerald', path: '/dashboard/alumni', marketingVisible: true },
    { key: 'students_works', label: 'Karya Siswa', value: statsData.students_works, icon: 'Palette', color: 'violet', path: '/dashboard/student-works', marketingVisible: false },
    { key: 'achievements', label: 'Prestasi', value: statsData.achievements, icon: 'Trophy', color: 'amber', path: '/dashboard/achievements', marketingVisible: true },
    { key: 'organizations', label: 'Organisasi', value: statsData.organizations, icon: 'Flag', color: 'rose', path: '/dashboard/organizations', marketingVisible: false },
    { key: 'extracurriculars', label: 'Ekskul', value: statsData.extracurriculars, icon: 'GraduationCap', color: 'orange', path: '/dashboard/extracurriculars', marketingVisible: false },
    { key: 'partnerships', label: 'Mitra', value: statsData.partnerships, icon: 'Handshake', color: 'teal', path: '/dashboard/partnerships', marketingVisible: true },
    { key: 'users', label: 'Manajemen User', value: statsData.users, icon: 'UserCog', color: 'cyan', path: '/dashboard/manage-user', marketingVisible: false },
  ];

  const stats = isMarketing ? allStats.filter(s => s.marketingVisible) : allStats;

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

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mb-8">
        {stats.map(stat => (
          <div key={stat.key} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${colorMap[stat.color]}`}>
              <Icon name={stat.icon} className="w-5 h-5" />
            </div>
            <div className="text-2xl font-bold text-gray-900">
              {loading ? (
                <span className="inline-block h-6 w-10 animate-pulse rounded bg-gray-100" />
              ) : (
                stat.value
              )}
            </div>
            <div className="text-xs text-gray-500 mt-0.5">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
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
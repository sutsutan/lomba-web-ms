import api from '@/lib/api';

export interface AdminStats {
  teachers: number;
  news: number;
  alumni: number;
  students_works: number;
  achievements: number;
  organizations: number;
  extracurriculars: number;
  partnerships: number;
  users: number;
}

const emptyStats: AdminStats = {
  teachers: 0,
  news: 0,
  alumni: 0,
  students_works: 0,
  achievements: 0,
  organizations: 0,
  extracurriculars: 0,
  partnerships: 0,
  users: 0,
};

export const getAdminStats = async (): Promise<AdminStats> => {
  try {
    const response = await api.get('/admin/stats');
    const data = response.data?.data || response.data || {};
    // Merge defensif: field yang tidak dikirim backend tetap fallback ke 0
    return { ...emptyStats, ...data };
  } catch (error) {
    console.error('Gagal mengambil statistik dashboard:', error);
    return emptyStats;
  }
};
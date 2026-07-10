import api from '@/lib/api';

export interface Extracurricular {
  id: number;
  name: string;
  category: string;
  coach_name: string;
  schedule: string;
  intensity: string;
  description: string;
  track_record: string;
  registration_link: string;
  image_url: string;
  is_active: boolean;
}

export const getAdminExtracurriculars = async (): Promise<Extracurricular[]> => {
  try {
    const response = await api.get('/extracurriculars');
    return response.data.data || response.data || [];
  } catch (error) {
    console.error('Gagal mengambil data ekskul (admin):', error);
    throw error;
  }
};

export const getPublicExtracurriculars = async (): Promise<Extracurricular[]> => {
  try {
    const response = await api.get('/api/extracurriculars');
    const data: Extracurricular[] = response.data.data || response.data || [];
    return Array.isArray(data) ? data.filter(item => item.is_active) : [];
  } catch (error) {
    console.error('Gagal mengambil data ekskul (publik):', error);
    return [];
  }
};

export const createExtracurricular = async (data: Omit<Extracurricular, 'id'>) => {
  return await api.post('/api/admin/extracurriculars', data);
};

export const updateExtracurricular = async (id: number, data: Omit<Extracurricular, 'id'>) => {
  return await api.put(`/api/admin/extracurriculars/${id}`, data);
};

export const deleteExtracurricular = async (id: number) => {
  return await api.delete(`/api/admin/extracurriculars/${id}`);
};
import api from '@/lib/api';

export interface AlumniData {
  id: number;
  name: string;
  role: string;
  tags: string;
  grad_year: number;
  location_name: string;
  latitude: string;
  longitude: string;
  testimony: string;
  is_active: boolean;
  profile_picture: string;
}

export const getAdminAlumni = async (): Promise<AlumniData[]> => {
  try {
    const response = await api.get('/api/alumni');
    return response.data.data || response.data || [];
  } catch (error) {
    console.error('Gagal mengambil data alumni (admin):', error);
    throw error;
  }
};

export const getPublicAlumni = async (): Promise<AlumniData[]> => {
  try {
    const response = await api.get('/api/alumni');
    const data: AlumniData[] = response.data.data || response.data || [];
    return Array.isArray(data) ? data.filter(item => item.is_active) : [];
  } catch (error) {
    console.error('Gagal mengambil data alumni (publik):', error);
    return [];
  }
};

export const createAlumni = async (data: FormData | Omit<AlumniData, 'id'>) => {
  return await api.post('/api/internal/sekolah/login/alumni', data);
};

export const updateAlumni = async (id: number, data: FormData | Omit<AlumniData, 'id'>) => {
  return await api.put(`/api/internal/sekolah/login/alumni/${id}`, data);
};

export const deleteAlumni = async (id: number) => {
  return await api.delete(`/api/internal/sekolah/login/alumni/${id}`);
};
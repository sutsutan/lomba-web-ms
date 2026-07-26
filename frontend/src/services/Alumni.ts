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

export type AlumniPayload = Omit<AlumniData, 'id'>;

export const getAdminAlumni = async (): Promise<AlumniData[]> => {
  try {
    const response = await api.get('/admin/alumni');
    return response.data.data || response.data || [];
  } catch (error) {
    console.error('Gagal mengambil data alumni (admin):', error);
    throw error;
  }
};

export const getPublicAlumni = async (): Promise<AlumniData[]> => {
  try {
    const response = await api.get('/alumni');
    const data: AlumniData[] = response.data.data || response.data || [];
    return Array.isArray(data) ? data.filter(item => item.is_active) : [];
  } catch (error) {
    console.error('Gagal mengambil data alumni (publik):', error);
    return [];
  }
};

export const getPublicAlumniYears = async (): Promise<number[]> => {
  try {
    const response = await api.get('/alumni/years');
    const data = response.data || [];
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Gagal mengambil daftar tahun alumni:', error);
    return [];
  }
};

export const createAlumni = async (data: AlumniPayload) => {
  return await api.post('/admin/alumni', data);
};

export const updateAlumni = async (id: number, data: AlumniPayload) => {
  return await api.put(`/admin/alumni/${id}`, data);
};

export const deleteAlumni = async (id: number) => {
  return await api.delete(`/admin/alumni/${id}`);
};
import api from '@/lib/api';

export interface MajorData {
  id: number;
  code: string;
  name: string;
  slug?: string;
  head_of_major: string;
  description: string;
  total_students: number;
  is_active: boolean;
  image_url?: string;
}

export const getAdminMajors = async (): Promise<MajorData[]> => {
  try {
    const response = await api.get('/api/majors');
    return response.data.data || response.data || [];
  } catch (error) {
    console.error('Gagal mengambil data jurusan (admin):', error);
    throw error;
  }
};

export const getPublicMajors = async (): Promise<MajorData[]> => {
  try {
    const response = await api.get('/api/majors');
    const data: MajorData[] = response.data.data || response.data || [];
    return Array.isArray(data) ? data.filter(item => item.is_active) : [];
  } catch (error) {
    console.error('Gagal mengambil data jurusan (publik):', error);
    return [];
  }
};

export const getPublicMajorBySlug = async (slug: string): Promise<MajorData | null> => {
  try {
    const response = await api.get(`/api/majors/${slug}`);
    return response.data.data || response.data || null;
  } catch (error) {
    console.error('Gagal mengambil detail jurusan:', error);
    return null;
  }
};

export const createMajor = async (data: FormData | Omit<MajorData, 'id'>) => {
  return await api.post('/api/internal/sekolah/login/majors', data);
};

export const updateMajor = async (id: number, data: FormData | Omit<MajorData, 'id'>) => {
  return await api.put(`/api/internal/sekolah/login/majors/${id}`, data);
};

export const deleteMajor = async (id: number) => {
  return await api.delete(`/api/internal/sekolah/login/majors/${id}`);
};

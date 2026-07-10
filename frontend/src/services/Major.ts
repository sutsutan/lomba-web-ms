import api from '@/lib/api';

export interface MajorData {
  id: number;
  code: string;
  name: string;
  slug?: string;
  head_of_major: string;
  description: string;
  total_students: number;
  total_partners: number;
  lab_image: string;
  lab_title?: string;
  activity_image: string;
  curriculum_image: string;
  is_active: boolean;
  image_url?: string;
}

export const getAdminMajors = async (): Promise<MajorData[]> => {
  try {
    const response = await api.get('/admin/majors');
    return response.data.data || response.data || [];
  } catch (error) {
    console.error('Gagal mengambil data jurusan (admin):', error);
    throw error;
  }
};

export const getPublicMajors = async (): Promise<MajorData[]> => {
  try {
    const response = await api.get('/majors');
    const data: MajorData[] = response.data.data || response.data || [];
    return Array.isArray(data) ? data.filter(item => item.is_active) : [];
  } catch (error) {
    console.error('Gagal mengambil data jurusan (publik):', error);
    return [];
  }
};

export const getPublicMajorBySlug = async (slug: string): Promise<MajorData | null> => {
  try {
    const response = await api.get(`/majors/${slug}`);
    return response.data.data || response.data || null;
  } catch (error) {
    console.error('Gagal mengambil detail jurusan:', error);
    return null;
  }
};

export const createMajor = async (data: FormData | Omit<MajorData, 'id'>) => {
  return await api.post('/admin/majors', data);
};

export const updateMajor = async (id: number, data: FormData | Omit<MajorData, 'id'>) => {
  return await api.put(`/admin/majors/${id}`, data);
};

export const deleteMajor = async (id: number) => {
  return await api.delete(`/admin/majors/${id}`);
};

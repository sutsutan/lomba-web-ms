import api from '@/lib/api';

export interface StudentWorkData {
  id: number;
  preview_url: string;
  title: string;
  major_code: string;
  creators: string;
  project_url: string;
  description: string;
  is_active: boolean;
}

export const getAdminStudentWorks = async (): Promise<StudentWorkData[]> => {
  try {
    const response = await api.get('/api/student-works');
    return response.data.data || response.data || [];
  } catch (error) {
    console.error('Gagal mengambil data karya siswa (admin):', error);
    throw error;
  }
};

export const getPublicStudentWorks = async (): Promise<StudentWorkData[]> => {
  try {
    const response = await api.get('/api/student-works');
    const data: StudentWorkData[] = response.data.data || response.data || [];
    return Array.isArray(data) ? data.filter(item => item.is_active) : [];
  } catch (error) {
    console.error('Gagal mengambil data karya siswa (publik):', error);
    return [];
  }
};

export const createStudentWork = async (data: FormData | Omit<StudentWorkData, 'id'>) => {
  return await api.post('/api/internal/sekolah/login/student-works', data);
};

export const updateStudentWork = async (id: number, data: FormData | Omit<StudentWorkData, 'id'>) => {
  return await api.put(`/api/internal/sekolah/login/student-works/${id}`, data);
};

export const deleteStudentWork = async (id: number) => {
  return await api.delete(`/api/internal/sekolah/login/student-works/${id}`);
};

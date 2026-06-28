import api from '@/lib/api';

export interface FacilityData {
  id: number;
  image_url: string;
  name: string;
  major_code: string;
  condition: string;
  location: string;
  description: string;
  is_active: boolean;
}

export const getAdminFacilities = async (): Promise<FacilityData[]> => {
  try {
    const response = await api.get('/api/facilities');
    return response.data.data || response.data || [];
  } catch (error) {
    console.error('Gagal mengambil data fasilitas (admin):', error);
    throw error;
  }
};

export const getPublicFacilities = async (): Promise<FacilityData[]> => {
  try {
    const response = await api.get('/api/facilities');
    const data: FacilityData[] = response.data.data || response.data || [];
    return Array.isArray(data) ? data.filter(item => item.is_active) : [];
  } catch (error) {
    console.error('Gagal mengambil data fasilitas (publik):', error);
    return [];
  }
};

export const createFacility = async (data: FormData | Omit<FacilityData, 'id'>) => {
  return await api.post('/api/internal/sekolah/login/facilities', data);
};

export const updateFacility = async (id: number, data: FormData | Omit<FacilityData, 'id'>) => {
  return await api.put(`/api/internal/sekolah/login/facilities/${id}`, data);
};

export const deleteFacility = async (id: number) => {
  return await api.delete(`/api/internal/sekolah/login/facilities/${id}`);
};

import api from '@/lib/api';

export interface FacilityData {
  id: number;
  image_url: string;
  name: string;
  major_id: number | null;
  location: string;
  condition: string;
  description: string;
  is_active: boolean;
  major?: { id: number; code: string; name: string } | null;
}

export type FacilityPayload = Omit<FacilityData, 'id' | 'major'>;

export const getAdminFacilities = async (): Promise<FacilityData[]> => {
  try {
    const response = await api.get('/admin/facilities');
    return response.data.data || response.data || [];
  } catch (error) {
    console.error('Gagal mengambil data fasilitas (admin):', error);
    throw error;
  }
};

export const getPublicFacilities = async (): Promise<FacilityData[]> => {
  try {
    const response = await api.get('/facilities');
    const data: FacilityData[] = response.data.data || response.data || [];
    return Array.isArray(data) ? data.filter(item => item.is_active) : [];
  } catch (error) {
    console.error('Gagal mengambil data fasilitas (publik):', error);
    return [];
  }
};

export const createFacility = async (data: FacilityPayload) => {
  return await api.post('/admin/facilities', data);
};

export const updateFacility = async (id: number, data: FacilityPayload) => {
  return await api.put(`/admin/facilities/${id}`, data);
};

export const deleteFacility = async (id: number) => {
  return await api.delete(`/admin/facilities/${id}`);
};
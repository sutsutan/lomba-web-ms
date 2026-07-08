import api from '@/lib/api';

export interface ActivityGalleryData {
  id: number;
  image_url: string;
  title: string;
  major_code: string;
  activity_date: string;
  description: string;
  is_featured: boolean;
}

export const getAdminActivityGalleries = async (): Promise<ActivityGalleryData[]> => {
  try {
    const response = await api.get('/activity-galleries');
    return response.data.data || response.data || [];
  } catch (error) {
    console.error('Gagal mengambil data galeri kegiatan (admin):', error);
    throw error;
  }
};

export const getPublicActivityGalleries = async (): Promise<ActivityGalleryData[]> => {
  try {
    const response = await api.get('/api/activity-galleries');
    const data: ActivityGalleryData[] = response.data.data || response.data || [];
    return Array.isArray(data) ? data.filter(item => item.is_featured) : [];
  } catch (error) {
    console.error('Gagal mengambil data galeri kegiatan (publik):', error);
    return [];
  }
};

export const createActivityGallery = async (data: FormData | Omit<ActivityGalleryData, 'id'>) => {
  return await api.post('/api/admin/activity-galleries', data);
};

export const updateActivityGallery = async (id: number, data: FormData | Omit<ActivityGalleryData, 'id'>) => {
  return await api.put(`/api/admin/activity-galleries/${id}`, data);
};

export const deleteActivityGallery = async (id: number) => {
  return await api.delete(`/api/admin/activity-galleries/${id}`);
};

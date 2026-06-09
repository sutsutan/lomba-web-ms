import api from '@/lib/api';

export interface ExploreGalleryData {
  id: number;
  image_url: string;
  title: string;
  relation_type: string;
  related_to: string;
  publish_date: string;
  description: string;
  is_active: boolean;
}

export const getAdminExploreGalleries = async (): Promise<ExploreGalleryData[]> => {
  try {
    const response = await api.get('/api/explore-galleries');
    return response.data.data || response.data || [];
  } catch (error) {
    console.error('Gagal mengambil data explore gallery (admin):', error);
    throw error;
  }
};

export const getPublicExploreGalleries = async (): Promise<ExploreGalleryData[]> => {
  try {
    const response = await api.get('/api/explore-galleries');
    const data: ExploreGalleryData[] = response.data.data || response.data || [];
    return Array.isArray(data) ? data.filter(item => item.is_active) : [];
  } catch (error) {
    console.error('Gagal mengambil data explore gallery (publik):', error);
    return [];
  }
};

export const createExploreGallery = async (data: FormData | Omit<ExploreGalleryData, 'id'>) => {
  return await api.post('/api/internal/sekolah/login/explore-galleries', data);
};

export const updateExploreGallery = async (id: number, data: FormData | Omit<ExploreGalleryData, 'id'>) => {
  return await api.put(`/api/internal/sekolah/login/explore-galleries/${id}`, data);
};

export const deleteExploreGallery = async (id: number) => {
  return await api.delete(`/api/internal/sekolah/login/explore-galleries/${id}`);
};

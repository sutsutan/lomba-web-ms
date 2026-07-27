import api from '@/lib/api';

export interface OrganizationRef {
  id: number;
  name: string;
  category: string;
}

export interface ExtracurricularRef {
  id: number;
  name: string;
  category: string;
}

export interface ExploreGalleryData {
  id: number;
  organization_id: number | null;
  extracurricular_id: number | null;
  news_id: number | null;
  event_name: string;
  traits_achievement: string;
  documentation_url: string;
  documentation_urls: string[];
  year: number;
  is_active: boolean;
  organization?: OrganizationRef | null;
  extracurricular?: ExtracurricularRef | null;
  news?: { id: number; title: string } | null;
}

export type ExploreGalleryPayload = Omit<ExploreGalleryData, 'id' | 'documentation_url' | 'organization' | 'extracurricular' | 'news'>;

const extractData = (response: any) => response.data?.data || response.data || [];

export const getAdminExploreGalleries = async (): Promise<ExploreGalleryData[]> => {
  try {
    const response = await api.get('/admin/explore-galleries');
    return extractData(response);
  } catch (error) {
    console.error('Gagal mengambil data explore gallery (admin):', error);
    throw error;
  }
};

export const getPublicExploreGalleries = async (
  params?: { organization_id?: number; extracurricular_id?: number; year?: number }
): Promise<ExploreGalleryData[]> => {
  try {
    const response = await api.get('/explore-galleries', { params });
    const data: ExploreGalleryData[] = extractData(response);
    return Array.isArray(data) ? data.filter(item => item.is_active) : [];
  } catch (error) {
    console.error('Gagal mengambil data explore gallery (publik):', error);
    return [];
  }
};

export const createExploreGallery = async (data: ExploreGalleryPayload) => {
  return await api.post('/admin/explore-galleries', data);
};

export const updateExploreGallery = async (id: number, data: ExploreGalleryPayload) => {
  return await api.put(`/admin/explore-galleries/${id}`, data);
};

export const deleteExploreGallery = async (id: number) => {
  return await api.delete(`/admin/explore-galleries/${id}`);
};
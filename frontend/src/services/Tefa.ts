import api from '@/lib/api';

export interface TefaProjectData {
  id: number;
  preview_url: string;
  student: string;
  class: string;
  title: string;
  title_id: string;
  description: string;
  description_id: string;
  major_code: string;
  is_active: boolean;
  sort_order: number;
}

export interface TefaGalleryData {
  id: number;
  preview_url: string;
  title: string;
  title_id: string;
  subtitle: string;
  subtitle_id: string;
  major_code: string;
  sort_order: number;
  is_active: boolean;
}

export interface TefaCategoryContentData {
  id?: number;
  major_code: string;
  intro: string;
  intro_id: string;
  detail: string;
  detail_id: string;
  closing: string;
  closing_id: string;
}

export interface TefaProgramData {
  id: number;
  major_code: string;
  program_order: number;
  title: string;
  title_id: string;
  description: string;
  description_id: string;
}

// ---- Public ----
export const getPublicTefaProjects = async (majorCode?: string): Promise<TefaProjectData[]> => {
  try {
    const response = await api.get('/tefa-projects', {
      params: { active_only: true, ...(majorCode ? { major_code: majorCode } : {}) },
    });
    const data = response.data.data || response.data || [];
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Gagal mengambil data TeFa projects:', error);
    return [];
  }
};

export const getPublicTefaGalleries = async (majorCode?: string): Promise<TefaGalleryData[]> => {
  try {
    const response = await api.get('/tefa-galleries', {
      params: { active_only: true, ...(majorCode ? { major_code: majorCode } : {}) },
    });
    return Array.isArray(response.data) ? response.data : [];
  } catch (error) {
    console.error('Gagal mengambil data TeFa galleries:', error);
    return [];
  }
};

export const getPublicTefaCategoryContents = async (): Promise<TefaCategoryContentData[]> => {
  try {
    const response = await api.get('/tefa-category-contents');
    return Array.isArray(response.data) ? response.data : [];
  } catch (error) {
    console.error('Gagal mengambil konten kategori TeFa:', error);
    return [];
  }
};

export const getPublicTefaPrograms = async (): Promise<TefaProgramData[]> => {
  try {
    const response = await api.get('/tefa-programs');
    return Array.isArray(response.data) ? response.data : [];
  } catch (error) {
    console.error('Gagal mengambil data program TeFa:', error);
    return [];
  }
};

// ---- Admin: Projects ----
export const getAdminTefaProjects = async (): Promise<TefaProjectData[]> => {
  const response = await api.get('/admin/tefa-projects');
  return response.data.data || response.data || [];
};
export const createTefaProject = (data: Omit<TefaProjectData, 'id'>) => api.post('/admin/tefa-projects', data);
export const updateTefaProject = (id: number, data: Omit<TefaProjectData, 'id'>) => api.put(`/admin/tefa-projects/${id}`, data);
export const deleteTefaProject = (id: number) => api.delete(`/admin/tefa-projects/${id}`);

// ---- Admin: Galleries ----
export const getAdminTefaGalleries = async (): Promise<TefaGalleryData[]> => {
  const response = await api.get('/admin/tefa-galleries');
  return response.data.data || response.data || [];
};
export const createTefaGallery = (data: Omit<TefaGalleryData, 'id'>) => api.post('/admin/tefa-galleries', data);
export const updateTefaGallery = (id: number, data: Omit<TefaGalleryData, 'id'>) => api.put(`/admin/tefa-galleries/${id}`, data);
export const deleteTefaGallery = (id: number) => api.delete(`/admin/tefa-galleries/${id}`);

// ---- Admin: Category Contents ----
export const getAdminTefaCategoryContent = async (majorCode: string): Promise<TefaCategoryContentData> => {
  const response = await api.get(`/admin/tefa-category-contents/${majorCode}`);
  return response.data;
};

export const updateTefaCategoryContent = (majorCode: string, data: Omit<TefaCategoryContentData, 'id' | 'major_code'>) =>
  api.put(`/admin/tefa-category-contents/${majorCode}`, data);

// ---- Admin: Tefa Programs ----
export const getAdminTefaPrograms = async (majorCode?: string): Promise<TefaProgramData[]> => {
  const response = await api.get('/admin/tefa-programs', { params: majorCode ? { major_code: majorCode } : {} });
  return response.data.data || response.data || [];
};

export const createTefaProgram = (data: Omit<TefaProgramData, 'id'>) => api.post('/admin/tefa-programs', data);
export const updateTefaProgram = (id: number, data: Omit<TefaProgramData, 'id'>) => api.put(`/admin/tefa-programs/${id}`, data);
export const deleteTefaProgram = (id: number) => api.delete(`/admin/tefa-programs/${id}`);
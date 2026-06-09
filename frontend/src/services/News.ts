<<<<<<< HEAD
// src/services/News.ts
=======
>>>>>>> a90f98283b16b654638f6630a1d9e472712ca382
import api from '@/lib/api';

export interface NewsData {
  id?: number;
  title_id: string;
  category: string;
  published_date: string;
  is_published: boolean;
  thumbnail: string;
  content_id: string;
  excerpt_id?: string;
  slug?: string;
}

const ADMIN_PATH = '/admin';

// Helper untuk konsistensi data
const extractData = (response: any) => {
  return response.data?.data || response.data;
};

export const newsService = {
  // --- Public Routes ---
  getAll: async (onlyPublished = false): Promise<NewsData[]> => {
    const response = await api.get('/news', {
      params: onlyPublished ? { published: true } : {}
    });
    return extractData(response);
  },

  getById: async (identifier: number | string): Promise<NewsData> => {
    const response = await api.get(`/news/${identifier}`);
    return response.data;
  },

  // --- Admin Routes ---
  create: async (data: NewsData): Promise<NewsData> => {
    const response = await api.post(`${ADMIN_PATH}/news`, data);
    return response.data;
  },

  update: async (id: number | string, data: NewsData): Promise<NewsData> => {
    const response = await api.put(`${ADMIN_PATH}/news/${id}`, data);
    return response.data;
  },

  delete: async (id: number | string): Promise<void> => {
    await api.delete(`${ADMIN_PATH}/news/${id}`);
  },
};
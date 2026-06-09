<<<<<<< HEAD
=======
// src/services/News.ts
>>>>>>> 0a5216d368e8c7e522e29366506d05b340c3cd48
import api from '@/lib/api';

export interface NewsData {
  id: number;
  title_id: string;
  category: string;
  published_date: string;
  is_published: boolean;
  thumbnail: string;
  content_id: string;
  excerpt_id?: string;
  slug: string;
}

<<<<<<< HEAD
// Map backend response item to frontend format
const mapToFrontend = (item: any): NewsData => {
  return {
    id: item.id,
    title: item.title_id || item.title_en || '',
    category: item.category || '',
    published_date: item.published_date || '',
    is_published: !!item.is_published,
    cover_image: item.thumbnail || '',
    content: item.content_id || item.content_en || '',
    excerpt: item.excerpt_id || item.excerpt_en || '',
  };
};

// Map frontend data to backend format for sending
const mapToBackend = (data: NewsData) => {
  return {
    title_id: data.title,
    title_en: data.title, // Duplicate title for English
    excerpt_id: data.excerpt || '',
    excerpt_en: data.excerpt || '', // Duplicate excerpt for English
    content_id: data.content,
    content_en: data.content, // Duplicate content for English
    category: data.category,
    thumbnail: data.cover_image,
    published_date: data.published_date,
    is_published: data.is_published,
  };
};

export const newsService = {
  getAll: async (onlyPublished = false): Promise<NewsData[]> => {
    const response = await api.get('/api/news', {
      params: onlyPublished ? { is_published: true } : {}
    });
    // BaseResourceController returns paginate format which has data array under 'data' property
    const data = response.data.data || response.data;
    return Array.isArray(data) ? data.map(mapToFrontend) : [];
  },

  getById: async (id: number | string): Promise<NewsData> => {
    const response = await api.get(`/api/news/${id}`);
    return mapToFrontend(response.data);
  },

  create: async (data: NewsData): Promise<NewsData> => {
    const payload = mapToBackend(data);
    const response = await api.post('/api/internal/sekolah/login/news', payload);
    return mapToFrontend(response.data);
  },

  update: async (id: number | string, data: NewsData): Promise<NewsData> => {
    const payload = mapToBackend(data);
    const response = await api.put(`/api/internal/sekolah/login/news/${id}`, payload);
    return mapToFrontend(response.data);
  },

  delete: async (id: number | string): Promise<void> => {
    await api.delete(`/api/internal/sekolah/login/news/${id}`);
=======
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
>>>>>>> 0a5216d368e8c7e522e29366506d05b340c3cd48
  },
};
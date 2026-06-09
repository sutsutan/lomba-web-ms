import api from '@/lib/api';

export interface NewsData {
  id?: number;
  title: string;
  category: string;      // 'Achievement', 'Event', 'Partnership', 'Facility'
  published_date: string; // Format: 'YYYY-MM-DD' atau ISO string
  is_published: boolean;
  cover_image: string;    // URL Gambar
  content: string;        // Isi berita lengkap
  excerpt?: string;       // Cuplikan teks pendek
}

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
  },
};
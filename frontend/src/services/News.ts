// src/services/News.ts
import axios from 'axios';

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

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const newsService = {
  // Ambil semua berita (dengan parameter filter untuk publik/admin)
  getAll: async (onlyPublished = false): Promise<NewsData[]> => {
    const response = await axios.get(`${API_URL}/news`, {
      params: onlyPublished ? { published: true } : {}
    });
    return response.data;
  },

  // Ambil detail satu berita berdasarkan ID
  getById: async (id: number | string): Promise<NewsData> => {
    const response = await axios.get(`${API_URL}/news/${id}`);
    return response.data;
  },

  // Tambah berita baru (Admin)
  create: async (data: NewsData): Promise<NewsData> => {
    const response = await axios.post(`${API_URL}/news`, data);
    return response.data;
  },

  // Edit berita lama (Admin)
  update: async (id: number | string, data: NewsData): Promise<NewsData> => {
    const response = await axios.put(`${API_URL}/news/${id}`, data);
    return response.data;
  },

  // Hapus berita (Admin)
  delete: async (id: number | string): Promise<void> => {
    await axios.delete(`${API_URL}/news/${id}`);
  },
};
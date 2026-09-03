// src/services/NewsCategory.ts
import api from '@/lib/api';

export interface NewsCategoryData {
  id: number;
  name: string;
  slug: string;
}

export const newsCategoryService = {
  /**
   * Ambil semua kategori berita (publik). Dipakai untuk dropdown admin
   * dan tombol filter di halaman berita publik.
   */
  getAll: async (): Promise<NewsCategoryData[]> => {
    const response = await api.get('/news-categories');
    return response.data?.data ?? response.data ?? [];
  },

  /**
   * Tambah kategori baru langsung dari form admin berita.
   */
  create: async (name: string): Promise<NewsCategoryData> => {
    const response = await api.post('/admin/news-categories', { name });
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/admin/news-categories/${id}`);
  },
};
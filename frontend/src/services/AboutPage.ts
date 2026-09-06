// src/services/AboutPage.ts
import api from '@/lib/api';

export interface AboutPageData {
  id?: number;
  know_us_title: string;
  know_us_desc1: string;
  know_us_desc2: string;
  know_us_summary: string;
  know_us_image1: string;
  know_us_image2: string;
}

export interface AboutValueData {
  id?: number;
  image: string;
  title: string;
  description: string;
  order?: number;
}

export interface AboutTimelineData {
  id?: number;
  year: string;
  heads: string[];
  beginning: string;
  growing: string;
  image?: string;
  order?: number;
}

// =========================
// GET TO KNOW US (singleton)
// =========================
export const aboutPageService = {
  /**
   * Ambil konten "Get to Know Us" (publik). Dipakai di halaman About
   * dan AboutPreview.tsx (field know_us_summary).
   */
  get: async (): Promise<AboutPageData> => {
    const response = await api.get('/about-page');
    return response.data?.data ?? response.data;
  },

  /**
   * Update konten "Get to Know Us" dari admin panel.
   */
  update: async (data: Partial<AboutPageData>): Promise<AboutPageData> => {
    const response = await api.put('/admin/about-page', data);
    return response.data?.data ?? response.data;
  },
};

// =========================
// VALUES SECTION
// =========================
export const aboutValueService = {
  getAll: async (): Promise<AboutValueData[]> => {
    const response = await api.get('/about-values');
    return response.data?.data ?? response.data ?? [];
  },

  create: async (data: AboutValueData): Promise<AboutValueData> => {
    const response = await api.post('/admin/about-values', data);
    return response.data;
  },

  update: async (id: number, data: AboutValueData): Promise<AboutValueData> => {
    const response = await api.put(`/admin/about-values/${id}`, data);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/admin/about-values/${id}`);
  },
};

// =========================
// OUR JOURNEY (TIMELINE)
// =========================
export const aboutTimelineService = {
  getAll: async (): Promise<AboutTimelineData[]> => {
    const response = await api.get('/about-timelines');
    return response.data?.data ?? response.data ?? [];
  },

  create: async (data: AboutTimelineData): Promise<AboutTimelineData> => {
    const response = await api.post('/admin/about-timelines', data);
    return response.data;
  },

  update: async (id: number, data: AboutTimelineData): Promise<AboutTimelineData> => {
    const response = await api.put(`/admin/about-timelines/${id}`, data);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/admin/about-timelines/${id}`);
  },
};
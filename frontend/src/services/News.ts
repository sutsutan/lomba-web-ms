// src/services/News.ts
import api from "@/lib/api";

export interface NewsData {
  id?: number;
  title_id: string;
  category: string;
  published_date: string;
  is_published: boolean;
  thumbnail: string;
  content_id: string;
  excerpt_id?: string;
  is_headline?: boolean;
  slug?: string;
  gallery_images?: string[];
}

const ADMIN_PATH = "/admin";

// Helper untuk konsistensi response
const extractData = <T>(response: any): T => {
  return response.data?.data ?? response.data;
};

export const newsService = {
  /**
   * Mengambil seluruh berita.
   * @param onlyPublished Jika true hanya mengambil berita yang dipublikasikan.
   */
  getAll: async (onlyPublished = false): Promise<NewsData[]> => {
    const response = await api.get("/news", {
      params: onlyPublished ? { published: true } : {},
    });

    const news = extractData<NewsData[]>(response);

    // Urutkan dari berita terbaru
    return news.sort(
      (a, b) =>
        new Date(b.published_date).getTime() -
        new Date(a.published_date).getTime()
    );
  },

  /**
   * Mengambil berita utama (berita terbaru).
   */
  getFeatured: async (): Promise<NewsData | null> => {
    const news = await newsService.getAll(true);

    if (!news.length) return null;

    return news[0];
  },

  /**
   * Mengambil beberapa berita terbaru.
   */
  getLatest: async (limit = 3): Promise<NewsData[]> => {
    const news = await newsService.getAll(true);

    return news.slice(0, limit);
  },

  /**
   * Mengambil detail berita berdasarkan id atau slug.
   */
  getById: async (
    identifier: number | string
  ): Promise<NewsData> => {
    const response = await api.get(`/news/${identifier}`);

    return extractData<NewsData>(response);
  },

  // =========================
  // ADMIN
  // =========================

  create: async (data: NewsData): Promise<NewsData> => {
    const response = await api.post(`${ADMIN_PATH}/news`, data);

    return extractData<NewsData>(response);
  },

  update: async (
    id: number | string,
    data: NewsData
  ): Promise<NewsData> => {
    const response = await api.put(
      `${ADMIN_PATH}/news/${id}`,
      data
    );

    return extractData<NewsData>(response);
  },

  delete: async (id: number | string): Promise<void> => {
    await api.delete(`${ADMIN_PATH}/news/${id}`);
  },
};
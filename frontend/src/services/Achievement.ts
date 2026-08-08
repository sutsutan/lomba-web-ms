import api from '@/lib/api';

export interface AchievementData {
 id: number;
  image_url: string;
  title: string;
  category: string;
  competition: string;
  level: string;
  organizer: string;
  location: string;
  achievement_date: string;
  holder_name: string;
  description: string;
  content: string;
  year: number;
  medal: string;
  certificate_url?: string | null;
  news_id?: number | null;
  is_active: boolean;
}

// services/Achievement.ts — tambahkan
export interface AchievementSummary {
  total: number;
  international: number;
  national: number;
  categories: number;
}

export const fetchAchievementSummary = async (): Promise<AchievementSummary> => {
  try {
    const response = await api.get('/achievements/summary');
    return response.data;
  } catch (error) {
    console.error('Gagal mengambil ringkasan prestasi:', error);
    return { total: 0, international: 0, national: 0, categories: 0 };
  }
};

export interface MajorData {
  id: number;
  slug: string;
  name: string;
}

export const fetchMajors = async (): Promise<MajorData[]> => {
  try {
    const response = await api.get('/majors');
    const data = response.data.data || response.data;
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Gagal mengambil data jurusan:', error);
    return [];
  }
};

export const fetchPublicAchievements = async (): Promise<AchievementData[]> => {
  try {
    const response = await api.get('/achievements', { params: { per_page: 1000 } });
    const data = response.data.data || response.data || [];
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Gagal mengambil data prestasi:', error);
    return [];
  }
};
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
    const response = await api.get('/achievements');
    const data = response.data.data || response.data;
    
    if (Array.isArray(data)) {
      return data.filter((item: AchievementData) => item.is_active);
    }
    return [];
  } catch (error) {
    console.error('Gagal mengambil data prestasi:', error);
    return [];
  }
};
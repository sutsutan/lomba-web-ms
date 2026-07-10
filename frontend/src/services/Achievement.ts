import api from '@/lib/api';

export interface AchievementData {
  id: number;
  image_url: string;
  category: string;
  holder_name: string;
  description: string;
  year: number;
  is_active: boolean;
  news_id?: number | null;
}

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
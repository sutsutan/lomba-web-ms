import api from '@/lib/api';

export interface HeroData {
  id: number;
  image_url: string;
  title: string;
  subtitle: string;
  order: number;
  is_active: boolean;
}

export const fetchPublicHero = async (): Promise<HeroData[]> => {
  try {
    const response = await api.get('/api/heroes');
    
    return response.data
      .filter((item: HeroData) => item.is_active)
      .sort((a: HeroData, b: HeroData) => a.order - b.order);
  } catch (error) {
    console.error("Gagal memuat data background hero:", error);
    return [];
  }
};
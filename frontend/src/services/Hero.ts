import api from '@/lib/api';

export interface HeroData {
  id: number;
  image_url: string;
  title_id: string;
  title_en?: string | null;
  subtitle_id: string;
  subtitle_en?: string | null;
  category?: string | null;
  order: number;
  is_active: boolean;
}

export const fetchPublicHero = async (): Promise<HeroData[]> => {
  try {
    const response = await api.get('/hero-backgrounds');
    
    const heroes = Array.isArray(response.data) ? response.data : (response.data.data || []);

    return heroes
      .filter((item: HeroData) => item.is_active)
      .sort((a: HeroData, b: HeroData) => a.order - b.order);

  } catch (error) {
    console.error("Gagal memuat data hero:", error);
    return [];
  }
};
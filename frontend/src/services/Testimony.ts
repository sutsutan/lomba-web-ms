import api from '@/lib/api';

export interface TestimonyBackend {
  id: number;
  avatar_url: string;
  role_category: string;
  author_name: string;
  title_suffix: string;
  message: string;
  video_url: string;
  is_active: boolean;
}

export interface TestimonialItem {
  id: number;
  name: string;
  role: string;
  videoUrl: string;
  description: string;
}

export const fetchPublicTestimonies = async (): Promise<Record<string, TestimonialItem[]>> => {
  const defaultYoutube = 'https://www.youtube.com/embed/Ech9a-wIzTM?enablejsapi=1&autoplay=0&controls=0&loop=1&playlist=Ech9a-wIzTM&playsinline=1&rel=0';
  
  const initialStructure: Record<string, TestimonialItem[]> = {
    student: [],
    parents: [],
    teacher: [],
    alumni: [],
    industry: [],
  };

  try {
    const response = await api.get('/api/testimonies');
    const data: TestimonyBackend[] = response.data.data || response.data;

    if (!Array.isArray(data)) return initialStructure;

    return data.reduce((acc, item) => {
      if (!item.is_active) return acc;

      const category = item.role_category === 'parent' ? 'parents' : item.role_category;

      if (acc[category]) {
        acc[category].push({
          id: item.id,
          name: item.author_name,
          role: item.title_suffix,
          videoUrl: item.video_url || defaultYoutube,
          description: item.message,
        });
      }
      return acc;
    }, initialStructure);
  } catch (error) {
    console.error('Gagal memuat data testimoni:', error);
    return initialStructure;
  }
};
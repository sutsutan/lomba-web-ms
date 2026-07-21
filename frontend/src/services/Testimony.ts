import api from '@/lib/api';
import { toYoutubeEmbedUrl } from '@/lib/youtube';

export interface TestimonyBackend {
  id: number;
  from_type: 'student' | 'parents' | 'teacher' | 'alumni' | 'industry';
  name: string;
  alias?: string | null;
  quote: string;
  video_url?: string | null;
  profile_picture?: string | null;
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
    const response = await api.get('/testimonies');
    const data: TestimonyBackend[] = response.data.data || response.data;

    if (!Array.isArray(data)) return initialStructure;

    return data.reduce((acc, item) => {
      if (!item.is_active) return acc;

      const category = item.from_type;
      if (!acc[category]) return acc;

      // Selalu konversi ke format embed, apa pun bentuk URL yang tersimpan
      const safeVideoUrl = toYoutubeEmbedUrl(item.video_url) || defaultYoutube;

      acc[category].push({
        id: item.id,
        name: item.name,
        role: item.alias || '',
        videoUrl: safeVideoUrl,
        description: item.quote,
      });

      return acc;
    }, initialStructure);
  } catch (error) {
    console.error('Gagal memuat data testimoni:', error);
    return initialStructure;
  }
};
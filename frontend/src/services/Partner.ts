import api from '@/lib/api';

export interface PartnerData {
  id: number;
  logo_url: string;
  company_name: string;
  location: string;
  website_url: string;
  is_active: boolean;
}

export const fetchPublicPartners = async (): Promise<PartnerData[]> => {
  try {
    const response = await api.get('/api/partners');
    const data = response.data.data || response.data;
    
    if (Array.isArray(data)) {
      return data.filter((item: PartnerData) => item.is_active);
    }
    return [];
  } catch (error) {
    console.error('Gagal mengambil data mitra:', error);
    return [];
  }
};
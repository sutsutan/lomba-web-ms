import api from '@/lib/api';

export interface PartnerData {
  id: number;
  logo_url: string;
  company_name: string;
  location: string;
  website_url: string;
  is_active: boolean;
}

// PUBLIC
export const fetchPublicPartners = async (): Promise<PartnerData[]> => {
  const res = await api.get('/partnerships');
  return Array.isArray(res.data.data) ? res.data.data : [];
};

// ADMIN
export const fetchAdminPartners = async (): Promise<PartnerData[]> => {
  const res = await api.get('/admin/partnerships');
  return Array.isArray(res.data.data) ? res.data.data : [];
};

export const createPartner = async (
  data: Omit<PartnerData, 'id'>
) => {
  const res = await api.post('/admin/partnerships', data);
  return res.data;
};

export const updatePartner = async (
  id: number,
  data: Omit<PartnerData, 'id'>
) => {
  const res = await api.put(`/admin/partnerships/${id}`, data);
  return res.data;
};

export const deletePartner = async (id: number) => {
  const res = await api.delete(`/admin/partnerships/${id}`);
  return res.data;
};
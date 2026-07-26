import api from '@/lib/api';

export interface UserAccount {
  id: number;
  avatar_url: string | null;
  name: string;
  email: string;
  role: 'admin' | 'user' | 'marketing';
  internal_type: 'student' | 'teacher' | 'staff' | 'alumni' | 'none';
  identity_number: string | null;
  is_approved: boolean;
}

export type UserPayload = Omit<UserAccount, 'id'> & { password?: string };

export interface PaginatedUsers {
  data: UserAccount[];
  current_page: number;
  last_page: number;
}

export const getAdminUsers = async (params?: {
  search?: string;
  role?: string;
  page?: number;
}): Promise<PaginatedUsers> => {
  try {
    const response = await api.get('/admin/users', { params });
    return response.data;
  } catch (error) {
    console.error('Gagal mengambil data user:', error);
    throw error;
  }
};

export const createUser = async (data: UserPayload) => {
  return await api.post('/admin/users', data);
};

export const updateUser = async (id: number, data: Partial<UserPayload>) => {
  return await api.put(`/admin/users/${id}`, data);
};

export const deleteUser = async (id: number) => {
  return await api.delete(`/admin/users/${id}`);
};

export const approveUser = async (id: number) => {
  return await api.post(`/admin/users/${id}/approve`);
};
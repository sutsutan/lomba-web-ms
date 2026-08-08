import api from '@/lib/api';

export interface PpdbSubmissionData {
  id: number;
  parent_name: string;
  student_name: string | null;
  email: string;
  phone: string | null;
  subject: string;
  message: string;
  status: 'new' | 'in_progress' | 'replied' | 'archived';
  reply_message: string | null;
  replied_at: string | null;
  created_at: string;
}

export interface PaginatedPpdb {
  data: PpdbSubmissionData[];
  current_page: number;
  last_page: number;
}

export interface PpdbFormPayload {
  parent_name: string;
  student_name?: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

// PUBLIK — dipanggil dari Contact.tsx
export const submitPpdbForm = async (data: PpdbFormPayload) => {
  const response = await api.post('/ppdb-submissions', data);
  return response.data;
};

// ADMIN/MARKETING
export const getAdminPpdbSubmissions = async (params?: {
  status?: string;
  search?: string;
  page?: number;
}): Promise<PaginatedPpdb> => {
  const response = await api.get('/admin/ppdb-submissions', { params });
  return response.data;
};

export const updatePpdbStatus = async (id: number, status: PpdbSubmissionData['status']) => {
  return await api.patch(`/admin/ppdb-submissions/${id}/status`, { status });
};

export const replyPpdbSubmission = async (id: number, reply_message: string) => {
  return await api.post(`/admin/ppdb-submissions/${id}/reply`, { reply_message });
};

export const deletePpdbSubmission = async (id: number) => {
  return await api.delete(`/admin/ppdb-submissions/${id}`);
};
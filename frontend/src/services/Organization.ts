import api from '@/lib/api';

export interface OrganizationData {
  id?: number;
  logo_url: string;
  name: string;
  category: string;
  leader_name: string;
  advisor_name: string;
  description_id: string;
  description_en?: string;
  is_active: boolean;
}

export interface OrgProjectData {
  id?: number;
  categoryKey: string;
  titleKey: string;
  leader: string;
  period: string;
  descKey: string;
  image: string;
  linkUrl: string;
  achievementsKeys?: string[];
}

const ADMIN_PATH = '/admin';

const extractData = (response: any) => {
  return response.data?.data || response.data || [];
};

export const organizationService = {
  // --- Organisasi ---
  getAll: async (): Promise<OrganizationData[]> => {
    // Tetap ke rute publik
    const response = await api.get('/organizations');
    return extractData(response);
  },

  create: async (data: OrganizationData): Promise<OrganizationData> => {
    // Hasil: http://127.0.0.1:8000/api/admin/organizations
    const response = await api.post(`${ADMIN_PATH}/organizations`, data);
    return response.data;
  },

  update: async (id: number, data: OrganizationData): Promise<OrganizationData> => {
    const response = await api.put(`${ADMIN_PATH}/organizations/${id}`, data);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`${ADMIN_PATH}/organizations/${id}`);
  },

  // --- Projek Organisasi ---
  getAllProjects: async (): Promise<OrgProjectData[]> => {
    const response = await api.get(`${ADMIN_PATH}/organization-projects`);
    return extractData(response);
  },

  createProject: async (data: OrgProjectData): Promise<OrgProjectData> => {
    const response = await api.post(`${ADMIN_PATH}/organization-projects`, data);
    return response.data;
  },

  updateProject: async (id: number, data: OrgProjectData): Promise<OrgProjectData> => {
    const response = await api.put(`${ADMIN_PATH}/organization-projects/${id}`, data);
    return response.data;
  },

  deleteProject: async (id: number): Promise<void> => {
    await api.delete(`${ADMIN_PATH}/organization-projects/${id}`);
  }
};
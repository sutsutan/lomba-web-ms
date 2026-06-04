import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';


export interface OrganizationData {
  id?: number;
  logo_url: string;
  name: string;
  category: string;
  leader_name: string;
  advisor_name: string;
  description: string;
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

export const organizationService = {
  
  // SUB-SERVICE: PROFIL ORGANISASI (Ekskul/OSIS)
  getAll: async (): Promise<OrganizationData[]> => {
    const response = await axios.get(`${API_URL}/organizations`);
    return response.data;
  },

  create: async (data: OrganizationData): Promise<OrganizationData> => {
    const response = await axios.post(`${API_URL}/organizations`, data);
    return response.data;
  },

  update: async (id: number, data: OrganizationData): Promise<OrganizationData> => {
    const response = await axios.put(`${API_URL}/organizations/${id}`, data);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await axios.delete(`${API_URL}/organizations/${id}`);
  },

  // (Digunakan oleh MoreOrg.tsx & Dashboard Admin)
  getAllProjects: async (): Promise<OrgProjectData[]> => {
    const response = await axios.get(`${API_URL}/organization/projects`);
    return response.data;
  },

  createProject: async (data: OrgProjectData): Promise<OrgProjectData> => {
    const response = await axios.post(`${API_URL}/organization/projects`, data);
    return response.data;
  },

  updateProject: async (id: number, data: OrgProjectData): Promise<OrgProjectData> => {
    const response = await axios.put(`${API_URL}/organization/projects/${id}`, data);
    return response.data;
  },

  deleteProject: async (id: number): Promise<void> => {
    await axios.delete(`${API_URL}/organization/projects/${id}`);
  }
};
import api from '@/lib/api';

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

const mapCategoryToBackend = (cat: string): string => {
  if (cat === 'creative') return 'arts';
  if (cat === 'discipline') return 'character';
  if (cat === 'wellness') return 'performance';
  return cat; // 'leadership' -> 'leadership'
};

const mapCategoryToFrontend = (cat: string): string => {
  if (cat === 'arts') return 'creative';
  if (cat === 'character') return 'discipline';
  if (cat === 'performance') return 'wellness';
  return cat; // 'leadership' -> 'leadership'
};

const mapToFrontend = (item: any): OrganizationData => {
  return {
    id: item.id,
    logo_url: item.logo_url || '',
    name: item.name || '',
    category: mapCategoryToFrontend(item.category || ''),
    leader_name: item.role || '',
    advisor_name: item.competencies || '',
    description: item.description || '',
    is_active: !!item.is_active
  };
};

const mapToBackend = (data: OrganizationData) => {
  return {
    logo_url: data.logo_url,
    name: data.name,
    category: mapCategoryToBackend(data.category),
    role: data.leader_name,
    competencies: data.advisor_name,
    description: data.description,
    is_active: data.is_active
  };
};

export const organizationService = {
  
  // SUB-SERVICE: PROFIL ORGANISASI (Ekskul/OSIS)
  getAll: async (): Promise<OrganizationData[]> => {
    const response = await api.get('/api/organizations');
    const data = response.data.data || response.data;
    return Array.isArray(data) ? data.map(mapToFrontend) : [];
  },

  create: async (data: OrganizationData): Promise<OrganizationData> => {
    const payload = mapToBackend(data);
    const response = await api.post('/api/internal/sekolah/login/organizations', payload);
    return mapToFrontend(response.data);
  },

  update: async (id: number, data: OrganizationData): Promise<OrganizationData> => {
    const payload = mapToBackend(data);
    const response = await api.put(`/api/internal/sekolah/login/organizations/${id}`, payload);
    return mapToFrontend(response.data);
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/api/internal/sekolah/login/organizations/${id}`);
  },

  // (Digunakan oleh MoreOrg.tsx & Dashboard Admin)
  getAllProjects: async (): Promise<OrgProjectData[]> => {
    const response = await api.get('/api/organization/projects');
    const data = response.data.data || response.data;
    return data;
  },

  createProject: async (data: OrgProjectData): Promise<OrgProjectData> => {
    const response = await api.post('/api/organization/projects', data);
    return response.data;
  },

  updateProject: async (id: number, data: OrgProjectData): Promise<OrgProjectData> => {
    const response = await api.put(`/api/organization/projects/${id}`, data);
    return response.data;
  },

  deleteProject: async (id: number): Promise<void> => {
    await api.delete(`/api/organization/projects/${id}`);
  }
};
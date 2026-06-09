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

<<<<<<< HEAD
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
=======
const ADMIN_PATH = '/admin';

const extractData = (response: any) => {
  return response.data?.data || response.data || [];
>>>>>>> 0a5216d368e8c7e522e29366506d05b340c3cd48
};

export const organizationService = {
  // --- Organisasi ---
  getAll: async (): Promise<OrganizationData[]> => {
<<<<<<< HEAD
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
=======
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
>>>>>>> 0a5216d368e8c7e522e29366506d05b340c3cd48
  },

  // --- Projek Organisasi ---
  // Pastikan di api.php Anda sudah menambahkan rute ini ke dalam prefix admin
  getAllProjects: async (): Promise<OrgProjectData[]> => {
<<<<<<< HEAD
    const response = await api.get('/api/organization/projects');
    const data = response.data.data || response.data;
    return data;
  },

  createProject: async (data: OrgProjectData): Promise<OrgProjectData> => {
    const response = await api.post('/api/organization/projects', data);
=======
    const response = await api.get(`${ADMIN_PATH}/organization-projects`);
    return extractData(response);
  },

  createProject: async (data: OrgProjectData): Promise<OrgProjectData> => {
    const response = await api.post(`${ADMIN_PATH}/organization-projects`, data);
>>>>>>> 0a5216d368e8c7e522e29366506d05b340c3cd48
    return response.data;
  },

  updateProject: async (id: number, data: OrgProjectData): Promise<OrgProjectData> => {
<<<<<<< HEAD
    const response = await api.put(`/api/organization/projects/${id}`, data);
=======
    const response = await api.put(`${ADMIN_PATH}/organization-projects/${id}`, data);
>>>>>>> 0a5216d368e8c7e522e29366506d05b340c3cd48
    return response.data;
  },

  deleteProject: async (id: number): Promise<void> => {
<<<<<<< HEAD
    await api.delete(`/api/organization/projects/${id}`);
=======
    await api.delete(`${ADMIN_PATH}/organization-projects/${id}`);
>>>>>>> 0a5216d368e8c7e522e29366506d05b340c3cd48
  }
};
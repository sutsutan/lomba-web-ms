import api from '@/lib/api';

export interface BackendTeacher {
  id: number;
  name: string;
  nip: string;
  division: string;
  role: string;
  quote: string;
  competencies_tags: string;
  profile_picture: string;
  is_active: boolean;
}

export interface PublicTeacher {
  name: string;
  subject: string;
  competency: string[];
  image: string;
}

export interface PublicLeader {
  name: string;
  role: string;
  image: string;
  bio: string;
}

const divisionMapping: Record<string, string> = {
  'IT': 'pplg',
  'Culinary': 'culinary',
  'Visual Communication Design': 'dkv',
  'Hospitality': 'hospitality',
  'Accounting': 'accounting',
  'general_subject': 'general',
  'staff': 'staff'
};

const LEADERSHIP_DIVISION_ORDER = ['principal', 'vice_principal'];

const leadershipRoleLabels: Record<string, string> = {
  principal: 'Kepala Sekolah',
  vice_principal: 'Wakil Kepala Sekolah',
};

export const fetchPublicTeachers = async (): Promise<Record<string, PublicTeacher[]> | null> => {
  try {
    const response = await api.get('/teachers');
    const rawData: BackendTeacher[] = response.data.data || response.data;

    if (!Array.isArray(rawData)) return null;

    const activeTeachers = rawData.filter((t) => t.is_active);

    const groupedDepartments: Record<string, PublicTeacher[]> = {
      pplg: [],
      culinary: [],
      hospitality: [],
      dkv: [],
      accounting: [],
      general: [],
      staff: []
    };

    activeTeachers.forEach((teacher) => {
      if (LEADERSHIP_DIVISION_ORDER.includes(teacher.division)) return;

      const publicDeptKey = divisionMapping[teacher.division];

      if (publicDeptKey && groupedDepartments[publicDeptKey] !== undefined) {
        const competencyArray = teacher.competencies_tags
          ? teacher.competencies_tags.split(',').map((tag) => tag.trim()).filter(Boolean)
          : [];

        groupedDepartments[publicDeptKey].push({
          name: teacher.name,
          subject: teacher.role,
          competency: competencyArray,
          image: teacher.profile_picture || ''
        });
      }
    });

    return groupedDepartments;
  } catch (error) {
    console.error("Gagal mengambil data guru publik:", error);
    return null;
  }
};

export const fetchPublicLeadership = async (): Promise<PublicLeader[]> => {
  try {
    const response = await api.get('/teachers');
    const rawData: BackendTeacher[] = response.data.data || response.data;

    if (!Array.isArray(rawData)) return [];

    return rawData
      .filter((t) => t.is_active && LEADERSHIP_DIVISION_ORDER.includes(t.division))
      .sort((a, b) => LEADERSHIP_DIVISION_ORDER.indexOf(a.division) - LEADERSHIP_DIVISION_ORDER.indexOf(b.division))
      .map((t) => ({
        name: t.name,
        role: t.role || leadershipRoleLabels[t.division] || t.division,
        image: t.profile_picture || '',
        bio: t.quote || '',
      }));
  } catch (error) {
    console.error("Gagal mengambil data pimpinan sekolah:", error);
    return [];
  }
};
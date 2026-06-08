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

const divisionMapping: Record<string, string> = {
  'IT': 'pplg',
  'Culinary': 'culinary',
  'Visual Communication Design': 'dkv',
  'Hospitality': 'hospitality',
  'Accounting': 'accounting',
  'general_subject': 'general',
  'staff': 'staff'
};

export const fetchPublicTeachers = async (): Promise<Record<string, PublicTeacher[]> | null> => {
  try {
    const response = await api.get('/api/teachers');
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
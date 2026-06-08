import axios from 'axios';

const API_URL = '/api/alumni';

export interface AlumniData {
  id: number;
  name: string;
  role: string;
  tags: string;
  grad_year: number;
  location_name: string;
  latitude: number;
  longitude: number;
  testimony: string;
  is_active: boolean;
  profile_picture: string;
}

export const alumniService = {
  getAll: async (onlyActive = false) => {
    const { data } = await axios.get(API_URL, { params: { active: onlyActive } });
    return data;
  },
  save: async (data: Partial<AlumniData>) => {
    return data.id 
      ? await axios.put(`${API_URL}/${data.id}`, data)
      : await axios.post(API_URL, data);
  },
  delete: async (id: number) => await axios.delete(`${API_URL}/${id}`)
};
// src/lib/api.ts
import axios from 'axios';

export const BACKEND_ROOT = 'http://localhost:8000';

const api = axios.create({
  baseURL: `${BACKEND_ROOT}/api/`,
  withCredentials: true,
  withXSRFToken: true,
  headers: { 'Accept': 'application/json', 'X-Requested-With': 'XMLHttpRequest' },
});

export default api;
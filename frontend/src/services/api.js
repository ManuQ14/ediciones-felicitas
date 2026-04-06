import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
});

api.interceptors.request.use((config) => {
  const adminToken = sessionStorage.getItem('ef_token');
  const userToken = localStorage.getItem('ef_user_token');
  const token = adminToken || userToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;

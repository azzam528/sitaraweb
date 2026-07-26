import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json'
  }
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('sitara_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('sitara_token');
      // We can't easily use vue-router here directly without passing it in or importing the router instance.
      // Usually, the app redirects when the store auth state changes or via a global event bus.
      // Assuming window.location or router injection is handled elsewhere if needed, 
      // but simple window.location.href works for hard redirects.
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;

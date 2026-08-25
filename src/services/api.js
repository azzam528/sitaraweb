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
      
      // Jangan reload/redirect jika 401 berasal dari endpoint login atau sedang di halaman login
      const isLoginRequest = error.config?.url?.includes('/auth/login');
      const isAlreadyOnLoginPage = window.location.pathname === '/login' || window.location.pathname.includes('/login');

      if (!isLoginRequest && !isAlreadyOnLoginPage) {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;

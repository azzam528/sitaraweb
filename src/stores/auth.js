import { defineStore } from 'pinia';
import { getInitials } from '../utils/helpers';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: null,
    isAuthenticated: false,
    loading: false
  }),
  getters: {
    userFullName: (state) => state.user?.name || '',
    userRole: (state) => state.user?.role || '',
    userInitials: (state) => getInitials(state.user?.name || '')
  },
  actions: {
    setUser(user) {
      this.user = user;
    },
    setToken(token) {
      this.token = token;
      this.isAuthenticated = !!token;
      if (token) {
        localStorage.setItem('sitara_token', token);
      } else {
        localStorage.removeItem('sitara_token');
      }
    },
    async login(credentials) {
      this.loading = true;
      try {
        // Mocking login for now
        // In real app: const res = await authService.login(credentials);
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const mockUser = {
          id: 1,
          name: 'Dr. Ahmad Subarjo',
          email: credentials.email,
          role: 'dokter'
        };
        const mockToken = 'mock-jwt-token-12345';
        
        this.setUser(mockUser);
        this.setToken(mockToken);
        localStorage.setItem('sitara_user', JSON.stringify(mockUser));
        
        return true;
      } catch (error) {
        console.error('Login failed', error);
        throw error;
      } finally {
        this.loading = false;
      }
    },
    logout() {
      this.setUser(null);
      this.setToken(null);
      localStorage.removeItem('sitara_user');
    },
    initAuth() {
      const token = localStorage.getItem('sitara_token');
      const userStr = localStorage.getItem('sitara_user');
      
      if (token && userStr) {
        try {
          const user = JSON.parse(userStr);
          this.setToken(token);
          this.setUser(user);
        } catch (e) {
          this.logout();
        }
      } else {
        this.logout();
      }
    }
  }
});

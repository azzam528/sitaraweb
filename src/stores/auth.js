import { defineStore } from 'pinia';
import { getInitials } from '../utils/helpers';
import authService from '../services/auth.service';

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

      if (user) {
        localStorage.setItem(
          'sitara_user',
          JSON.stringify(user)
        );
      } else {
        localStorage.removeItem('sitara_user');
      }
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
        const response = await authService.login(credentials);

        const data = response.data;

        console.log('LOGIN RESPONSE:', data);

        const token = data.access_token;

        if (!token) {
          throw new Error('Access token tidak ditemukan');
        }

        this.setToken(token);

        // Kalau backend mengembalikan user langsung
        if (data.user) {
          this.setUser(data.user);
        } else {
          // Ambil profile dari backend
          const profileResponse =
            await authService.getProfile();

          this.setUser(profileResponse.data);
        }

        return true;

      } catch (error) {
        console.error(
          'Login failed:',
          error.response?.data || error
        );

        this.logout();

        throw error;

      } finally {
        this.loading = false;
      }
    },

    async logout() {
      try {
        if (this.token) {
          await authService.logout();
        }
      } catch (error) {
        console.error(
          'Logout API failed:',
          error.response?.data || error
        );
      } finally {
        this.setUser(null);
        this.setToken(null);
      }
    },

    async initAuth() {
      const token =
        localStorage.getItem('sitara_token');

      if (!token) {
        this.logout();
        return;
      }

      try {
        this.setToken(token);

        const response =
          await authService.getProfile();

        this.setUser(response.data);

      } catch (error) {
        console.error(
          'Session invalid:',
          error.response?.data || error
        );

        this.logout();
      }
    }
  }
});
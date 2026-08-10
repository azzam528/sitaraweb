import { computed } from 'vue';
import { useAuthStore } from '../stores/auth';

export function useAuth() {
  const authStore = useAuthStore();

  const user = computed(() => authStore.user);
  const isAuthenticated = computed(
    () => authStore.isAuthenticated
  );
  const userFullName = computed(
    () => authStore.userFullName
  );
  const userRole = computed(
    () => authStore.userRole
  );
  const userInitials = computed(
    () => authStore.userInitials
  );

  const login = async (credentials) => {
    return await authStore.login(credentials);
  };

  const logout = () => {
    authStore.logout();
  };

  const checkAuth = () => {
    return authStore.initAuth();
  };

  return {
    user,
    isAuthenticated,
    userFullName,
    userRole,
    userInitials,
    login,
    logout,
    checkAuth
  };
}
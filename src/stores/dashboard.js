import { defineStore } from 'pinia';
import dashboardService from '../services/dashboard.service';

export const useDashboardStore = defineStore('dashboard', {
  state: () => ({
    data: null,
    summary: null,
    risk: null,
    adherenceTrend: [],
    recentActivities: [],
    criticalStock: [],
    loading: false,
    error: null
  }),
  actions: {
    async fetchDashboard() {
      this.loading = true;
      this.error = null;
      try {
        const response = await dashboardService.getDashboard();
        this.data = response.data;
        this.summary = response.data.summary;
        this.risk = response.data.risk;
        this.adherenceTrend = response.data.adherence_trend || [];
        this.recentActivities = response.data.recent_activities || [];
        this.criticalStock = response.data.critical_stock || [];
        return response.data;
      } catch (error) {
        this.error = error;
        console.error('Failed to fetch dashboard data:', error);
        throw error;
      } finally {
        this.loading = false;
      }
    }
  }
});

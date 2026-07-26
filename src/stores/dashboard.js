import { defineStore } from 'pinia';

export const useDashboardStore = defineStore('dashboard', {
  state: () => ({
    statistics: null,
    complianceChart: null,
    treatmentChart: null,
    recentActivities: [],
    pendingVideos: [],
    recentComplaints: [],
    medicineWarnings: [],
    loading: false,
    error: null
  }),
  actions: {
    async fetchStatistics() {
      this.loading = true;
      try {
        // Will be implemented in Tahap 4
        await new Promise(resolve => setTimeout(resolve, 500));
      } catch (error) {
        this.error = error;
      } finally {
        this.loading = false;
      }
    },
    async fetchAll() {
      this.loading = true;
      try {
        // Will be implemented in Tahap 4
        await new Promise(resolve => setTimeout(resolve, 500));
      } catch (error) {
        this.error = error;
      } finally {
        this.loading = false;
      }
    }
  }
});

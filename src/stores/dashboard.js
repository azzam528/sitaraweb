import { defineStore } from 'pinia'
import dashboardService from '../services/dashboard.service'

export const useDashboardStore = defineStore('dashboard', {
  state: () => ({
    dashboard: null,
    loading: false,
    error: null
  }),

  getters: {
    summary: (state) => state.dashboard?.summary || {
      active_patients: 0,
      medication_adherence: 0,
      high_risk_patients: 0,
      today_complaints: 0,
      critical_stock_items: 0
    },

    risk: (state) => state.dashboard?.risk || {
      high: 0,
      medium: 0,
      low: 0
    },

    adherenceTrend: (state) =>
      state.dashboard?.adherence_trend || [],

    recentActivities: (state) =>
      state.dashboard?.recent_activities || [],

    criticalStock: (state) =>
      state.dashboard?.critical_stock || []
  },

  actions: {
    async fetchDashboard() {
      this.loading = true
      this.error = null

      try {
        const response = await dashboardService.getDashboard()

        this.dashboard = response.data

        return response.data
      } catch (error) {
        console.error('Failed to fetch dashboard:', error)

        this.error =
          error.response?.data?.detail ||
          'Gagal mengambil data dashboard'

        throw error
      } finally {
        this.loading = false
      }
    }
  }
})
import { defineStore } from 'pinia'
import dashboardService from '../services/dashboard.service'

export const useDashboardStore = defineStore('dashboard', {
  state: () => ({
    dashboard: null,
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
      this.loading = true
      this.error = null

      try {
        const response = await dashboardService.getDashboard()
        const resData = response.data || {}

        this.dashboard = resData
        this.data = resData
        this.summary = resData.summary || {
          active_patients: 0,
          medication_adherence: null,
          high_risk_patients: 0,
          today_complaints: 0,
          critical_stock_items: 0
        }
        this.risk = resData.risk || {
          high: 0,
          medium: 0,
          low: 0
        }
        this.adherenceTrend = resData.adherence_trend || []
        this.recentActivities = resData.recent_activities || []
        this.criticalStock = resData.critical_stock || []

        return resData
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
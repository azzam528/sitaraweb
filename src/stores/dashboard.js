import { defineStore } from 'pinia'
import dashboardService from '../services/dashboard.service'

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
      try {
        const response = await dashboardService.getStatistics()

        this.statistics = response.data

        return response.data
      } catch (error) {
        console.error('Failed to fetch dashboard statistics:', error)

        this.error =
          error.response?.data?.detail ||
          'Gagal mengambil statistik dashboard'

        throw error
      }
    },

    async fetchComplianceChart() {
      try {
        const response = await dashboardService.getComplianceChart()

        this.complianceChart = response.data

        return response.data
      } catch (error) {
        console.error('Failed to fetch compliance chart:', error)

        throw error
      }
    },

    async fetchTreatmentChart() {
      try {
        const response = await dashboardService.getTreatmentChart()

        this.treatmentChart = response.data

        return response.data
      } catch (error) {
        console.error('Failed to fetch treatment chart:', error)

        throw error
      }
    },

    async fetchRecentActivities() {
      try {
        const response = await dashboardService.getRecentActivities()

        this.recentActivities = response.data

        return response.data
      } catch (error) {
        console.error('Failed to fetch recent activities:', error)

        throw error
      }
    },

    async fetchPendingVideos() {
      try {
        const response = await dashboardService.getPendingVideos()

        this.pendingVideos = response.data

        return response.data
      } catch (error) {
        console.error('Failed to fetch pending videos:', error)

        throw error
      }
    },

    async fetchRecentComplaints() {
      try {
        const response = await dashboardService.getRecentComplaints()

        this.recentComplaints = response.data

        return response.data
      } catch (error) {
        console.error('Failed to fetch recent complaints:', error)

        throw error
      }
    },

    async fetchMedicineWarnings() {
      try {
        const response = await dashboardService.getMedicineWarnings()

        this.medicineWarnings = response.data

        return response.data
      } catch (error) {
        console.error('Failed to fetch medicine warnings:', error)

        throw error
      }
    },

    async fetchAll() {
      this.loading = true
      this.error = null

      try {
        await Promise.all([
          this.fetchStatistics(),
          this.fetchComplianceChart(),
          this.fetchTreatmentChart(),
          this.fetchRecentActivities(),
          this.fetchPendingVideos(),
          this.fetchRecentComplaints(),
          this.fetchMedicineWarnings()
        ])
      } catch (error) {
        console.error('Failed to fetch dashboard:', error)

        this.error =
          error.response?.data?.detail ||
          'Gagal mengambil data dashboard'
      } finally {
        this.loading = false
      }
    }
  }
})
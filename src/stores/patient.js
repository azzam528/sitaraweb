import { defineStore } from 'pinia'
import patientService from '../services/patient.service'

export const usePatientStore = defineStore('patient', {
  state: () => ({
    patients: [],
    selectedPatient: null,
    currentPatient: null,
    totalPatients: 0,

    loading: false,
    detailLoading: false,
    saving: false,
    error: null
  }),

  getters: {
    totalPatientsCount: (state) => state.patients.length,

    activePatients: (state) =>
      state.patients.filter(
        patient => patient.is_active === true
      ).length
  },

  actions: {
    async fetchPatients(params) {
      this.loading = true
      this.error = null

      try {
        const response = await patientService.getAll(params)
        this.patients = Array.isArray(response.data)
          ? response.data
          : (response.data?.items || response.data || [])
        this.totalPatients = this.patients.length
        return this.patients
      } catch (error) {
        console.error('Failed to fetch patients:', error)
        this.error =
          error.response?.data?.detail ||
          'Gagal mengambil data pasien'
        throw error
      } finally {
        this.loading = false
      }
    },

    async fetchPatient(patientId) {
      this.detailLoading = true
      this.loading = true
      this.error = null

      try {
        const response = await patientService.getById(patientId)
        this.selectedPatient = response.data
        this.currentPatient = response.data
        return response.data
      } catch (error) {
        console.error('Failed to fetch patient:', error)
        this.error =
          error.response?.data?.detail ||
          'Gagal mengambil detail pasien'
        throw error
      } finally {
        this.detailLoading = false
        this.loading = false
      }
    },

    async fetchPatientDetail(id) {
      this.detailLoading = true
      this.loading = true
      this.error = null

      try {
        const response = await patientService.getDetail(id)
        this.selectedPatient = response.data
        this.currentPatient = response.data
        return response.data
      } catch (error) {
        console.error(`Failed to fetch patient detail ${id}:`, error)
        this.error =
          error.response?.data?.detail ||
          'Gagal mengambil detail pasien'
        throw error
      } finally {
        this.detailLoading = false
        this.loading = false
      }
    },

    async createPatient(data) {
      this.saving = true
      this.loading = true
      this.error = null

      try {
        const response = await patientService.create(data)
        if (response.data) {
          this.patients.unshift(response.data)
          this.totalPatients = this.patients.length
        }
        return response.data
      } catch (error) {
        console.error('Failed to create patient:', error)
        this.error =
          error.response?.data?.detail ||
          'Gagal menambahkan pasien'
        throw error
      } finally {
        this.saving = false
        this.loading = false
      }
    },

    async updatePatient(patientId, data) {
      this.saving = true
      this.loading = true
      this.error = null

      try {
        const response = await patientService.update(patientId, data)
        const updatedPatient = response.data

        const index = this.patients.findIndex(
          patient => patient.id === patientId
        )

        if (index !== -1) {
          this.patients[index] = updatedPatient
        }

        this.selectedPatient = updatedPatient
        this.currentPatient = updatedPatient

        return updatedPatient
      } catch (error) {
        console.error('Failed to update patient:', error)
        this.error =
          error.response?.data?.detail ||
          'Gagal memperbarui pasien'
        throw error
      } finally {
        this.saving = false
        this.loading = false
      }
    },

    async deletePatient(patientId) {
      this.saving = true
      this.loading = true
      this.error = null

      try {
        const response = await patientService.delete(patientId)
        this.patients = this.patients.filter(
          patient => patient.id !== patientId
        )
        this.totalPatients = this.patients.length
        return response?.data
      } catch (error) {
        console.error('Failed to delete patient:', error)
        this.error =
          error.response?.data?.detail ||
          'Gagal menghapus pasien'
        throw error
      } finally {
        this.saving = false
        this.loading = false
      }
    }
  }
})
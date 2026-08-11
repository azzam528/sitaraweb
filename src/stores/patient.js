import { defineStore } from 'pinia'
import patientService from '../services/patient.service'

export const usePatientStore = defineStore('patient', {
  state: () => ({
    patients: [],
    selectedPatient: null,

    loading: false,
    detailLoading: false,
    saving: false,
    error: null
  }),

  getters: {
    totalPatients: (state) => state.patients.length,

    activePatients: (state) =>
      state.patients.filter(
        patient => patient.is_active === true
      ).length
  },

  actions: {
    async fetchPatients() {
      this.loading = true
      this.error = null

      try {
        const response = await patientService.getAll()

        this.patients = Array.isArray(response.data)
          ? response.data
          : []

        console.log(
          'Patients from backend:',
          this.patients
        )

        return this.patients
      } catch (error) {
        console.error(
          'Failed to fetch patients:',
          error
        )

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
      this.error = null

      try {
        const response =
          await patientService.getById(patientId)

        this.selectedPatient = response.data

        return response.data
      } catch (error) {
        console.error(
          'Failed to fetch patient:',
          error
        )

        this.error =
          error.response?.data?.detail ||
          'Gagal mengambil detail pasien'

        throw error
      } finally {
        this.detailLoading = false
      }
    },

    async createPatient(data) {
      this.saving = true
      this.error = null

      try {
        const response =
          await patientService.create(data)

        this.patients.unshift(response.data)

        return response.data
      } catch (error) {
        console.error(
          'Failed to create patient:',
          error
        )

        this.error =
          error.response?.data?.detail ||
          'Gagal menambahkan pasien'

        throw error
      } finally {
        this.saving = false
      }
    },

    async updatePatient(patientId, data) {
      this.saving = true
      this.error = null

      try {
        const response =
          await patientService.update(
            patientId,
            data
          )

        const updatedPatient = response.data

        const index =
          this.patients.findIndex(
            patient => patient.id === patientId
          )

        if (index !== -1) {
          this.patients[index] =
            updatedPatient
        }

        this.selectedPatient =
          updatedPatient

        return updatedPatient
      } catch (error) {
        console.error(
          'Failed to update patient:',
          error
        )

        this.error =
          error.response?.data?.detail ||
          'Gagal memperbarui pasien'

        throw error
      } finally {
        this.saving = false
      }
    },

    async deletePatient(patientId) {
      this.saving = true
      this.error = null

      try {
        await patientService.remove(patientId)

        this.patients =
          this.patients.filter(
            patient => patient.id !== patientId
          )
      } catch (error) {
        console.error(
          'Failed to delete patient:',
          error
        )

        this.error =
          error.response?.data?.detail ||
          'Gagal menghapus pasien'

        throw error
      } finally {
        this.saving = false
      }
    }
  }
})
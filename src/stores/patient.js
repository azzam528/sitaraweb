import { defineStore } from 'pinia';

export const usePatientStore = defineStore('patient', {
  state: () => ({
    patients: [],
    currentPatient: null,
    totalPatients: 0,
    loading: false,
    error: null
  }),
  actions: {
    async fetchPatients(params) {
      this.loading = true;
      try {
        // Will be implemented in Tahap 5
        await new Promise(resolve => setTimeout(resolve, 500));
      } catch (error) {
        this.error = error;
      } finally {
        this.loading = false;
      }
    },
    async fetchPatient(id) {
      this.loading = true;
      try {
        // Will be implemented in Tahap 5
        await new Promise(resolve => setTimeout(resolve, 500));
      } catch (error) {
        this.error = error;
      } finally {
        this.loading = false;
      }
    },
    async createPatient(data) {
      this.loading = true;
      try {
        // Will be implemented in Tahap 5
        await new Promise(resolve => setTimeout(resolve, 500));
      } catch (error) {
        this.error = error;
        throw error;
      } finally {
        this.loading = false;
      }
    },
    async updatePatient(id, data) {
      this.loading = true;
      try {
        // Will be implemented in Tahap 5
        await new Promise(resolve => setTimeout(resolve, 500));
      } catch (error) {
        this.error = error;
        throw error;
      } finally {
        this.loading = false;
      }
    },
    async deletePatient(id) {
      this.loading = true;
      try {
        // Will be implemented in Tahap 5
        await new Promise(resolve => setTimeout(resolve, 500));
      } catch (error) {
        this.error = error;
        throw error;
      } finally {
        this.loading = false;
      }
    }
  }
});

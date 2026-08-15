import { defineStore } from 'pinia';
import patientService from '../services/patient.service';

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
      this.error = null;
      try {
        const response = await patientService.getAll(params);
        this.patients = response.data || [];
        this.totalPatients = this.patients.length;
        return this.patients;
      } catch (error) {
        this.error = error;
        console.error('Failed to fetch patients:', error);
        throw error;
      } finally {
        this.loading = false;
      }
    },
    async fetchPatient(id) {
      this.loading = true;
      this.error = null;
      try {
        const response = await patientService.getById(id);
        this.currentPatient = response.data;
        return this.currentPatient;
      } catch (error) {
        this.error = error;
        console.error(`Failed to fetch patient ${id}:`, error);
        throw error;
      } finally {
        this.loading = false;
      }
    },
    async fetchPatientDetail(id) {
      this.loading = true;
      this.error = null;
      try {
        const response = await patientService.getDetail(id);
        this.currentPatient = response.data;
        return response.data;
      } catch (error) {
        this.error = error;
        console.error(`Failed to fetch patient detail ${id}:`, error);
        throw error;
      } finally {
        this.loading = false;
      }
    },
    async createPatient(data) {
      this.loading = true;
      this.error = null;
      try {
        const response = await patientService.create(data);
        return response.data;
      } catch (error) {
        this.error = error;
        console.error('Failed to create patient:', error);
        throw error;
      } finally {
        this.loading = false;
      }
    },
    async updatePatient(id, data) {
      this.loading = true;
      this.error = null;
      try {
        const response = await patientService.update(id, data);
        return response.data;
      } catch (error) {
        this.error = error;
        console.error(`Failed to update patient ${id}:`, error);
        throw error;
      } finally {
        this.loading = false;
      }
    },
    async deletePatient(id) {
      this.loading = true;
      this.error = null;
      try {
        const response = await patientService.delete(id);
        this.patients = this.patients.filter(p => p.id !== id);
        this.totalPatients = this.patients.length;
        return response.data;
      } catch (error) {
        this.error = error;
        console.error(`Failed to delete patient ${id}:`, error);
        throw error;
      } finally {
        this.loading = false;
      }
    }
  }
});

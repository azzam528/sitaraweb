import api from './api'

export default {
  getAll() {
    return api.get('/patients')
  },

  getById(patientId) {
    return api.get(`/patients/${patientId}`)
  },

  createPatient(data) {
    return api.post('/patients', data)
  },

  updatePatient(patientId, data) {
    return api.put(`/patients/${patientId}`, data)
  },

  deletePatient(patientId) {
    return api.delete(`/patients/${patientId}`)
  },

  getProfile() {
    return api.get('/patients/profile')
  }
}
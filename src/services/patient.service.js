import api from './api'

export default {
  getAll(params) {
    return api.get('/patients', { params })
  },

  getById(patientId) {
    return api.get(`/patients/${patientId}`)
  },

  getDetail(id) {
    return api.get(`/patients/${id}/detail`)
  },

  create(data) {
    return api.post('/patients', data)
  },

  createPatient(data) {
    return api.post('/patients', data)
  },

  update(id, data) {
    return api.put(`/patients/${id}`, data)
  },

  updatePatient(patientId, data) {
    return api.put(`/patients/${patientId}`, data)
  },

  remove(patientId) {
    return api.delete(`/patients/${patientId}`)
  },

  delete(patientId) {
    return api.delete(`/patients/${patientId}`)
  },

  deletePatient(patientId) {
    return api.delete(`/patients/${patientId}`)
  },

  getProfile() {
    return api.get('/patients/profile')
  }
}
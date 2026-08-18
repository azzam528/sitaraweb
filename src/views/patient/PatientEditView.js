import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import patientService from '@/services/patient.service'

export function usePatientEditView() {
  const route = useRoute()
  const router = useRouter()

  const patientId = route.params.id

  const loading = ref(true)
  const saving = ref(false)
  const error = ref('')
  const success = ref('')
  const treatment = ref(null)

  const patientData = ref({
    id: null,
    medical_record_number: '',
    full_name: '',
    nik: '',
    birth_date: '',
    gender: 'male',
    phone: '',
    address: '',
    occupation: '',
    pmo_name: '',
    pmo_phone: '',
    clinical_note: ''
  })

  const fetchPatient = async () => {
    loading.value = true
    error.value = ''

    try {
      // Try detail endpoint first
      try {
        const detailRes = await patientService.getDetail(patientId)
        if (detailRes.data?.treatment) {
          treatment.value = detailRes.data.treatment
        }
      } catch (dErr) {
        console.warn('Detail endpoint failed, falling back to getById:', dErr)
      }

      const response = await patientService.getById(patientId)
      const patient = response.data || {}

      patientData.value = {
        id: patient.id,
        medical_record_number: patient.medical_record_number || '',
        full_name: patient.full_name || '',
        nik: patient.nik || '',
        birth_date: patient.birth_date ? patient.birth_date.split('T')[0] : '',
        gender: patient.gender || 'male',
        phone: patient.phone || '',
        address: patient.address || '',
        occupation: patient.occupation || '',
        pmo_name: patient.pmo_name || '',
        pmo_phone: patient.pmo_phone || '',
        clinical_note: patient.clinical_note || ''
      }
    } catch (err) {
      console.error('GET PATIENT ERROR:', err)
      error.value = err.response?.data?.detail || 'Gagal memuat data pasien.'
    } finally {
      loading.value = false
    }
  }

  const savePatient = async () => {
    saving.value = true
    error.value = ''
    success.value = ''

    try {
      const payload = {
        full_name: patientData.value.full_name,
        phone: patientData.value.phone,
        address: patientData.value.address,
        occupation: patientData.value.occupation,
        pmo_name: patientData.value.pmo_name,
        pmo_phone: patientData.value.pmo_phone,
        clinical_note: patientData.value.clinical_note
      }

      await patientService.update(patientId, payload)
      success.value = 'Data pasien berhasil diperbarui.'

      setTimeout(() => {
        router.push(`/dashboard/patients/${patientId}`)
      }, 700)
    } catch (err) {
      console.error('UPDATE PATIENT ERROR:', err)
      error.value =
        err.response?.data?.detail ||
        err.response?.data?.message ||
        `Gagal menyimpan perubahan. Status: ${err.response?.status || 'unknown'}`
    } finally {
      saving.value = false
    }
  }

  const cancelEdit = () => {
    router.push(`/dashboard/patients/${patientId}`)
  }

  onMounted(() => {
    fetchPatient()
  })

  return {
    patientData,
    treatment,
    loading,
    saving,
    error,
    success,
    fetchPatient,
    savePatient,
    cancelEdit
  }
}

export default {
  usePatientEditView
}

import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import api from '@/services/api'

export function usePatientEditView() {
  const route = useRoute()
  const router = useRouter()

  const patientId = route.params.id

  const loading = ref(true)
  const saving = ref(false)
  const error = ref('')
  const success = ref('')

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

  // =====================================================
  // FETCH PATIENT
  // =====================================================

  const fetchPatient = async () => {
    loading.value = true
    error.value = ''

    try {
      const response = await api.get(
        `/patients/${patientId}`
      )

      console.log('GET PATIENT:', response.data)

      const patient = response.data

      patientData.value = {
        id: patient.id,
        medical_record_number:
          patient.medical_record_number || '',
        full_name:
          patient.full_name || '',
        nik:
          patient.nik || '',
        birth_date:
          patient.birth_date || '',
        gender:
          patient.gender || 'male',
        phone:
          patient.phone || '',
        address:
          patient.address || '',
        occupation:
          patient.occupation || '',
        pmo_name:
          patient.pmo_name || '',
        pmo_phone:
          patient.pmo_phone || '',
        clinical_note:
          patient.clinical_note || ''
      }

    } catch (err) {
      console.error(
        'GET PATIENT ERROR:',
        err
      )

      error.value =
        err.response?.data?.detail ||
        'Gagal memuat data pasien.'

    } finally {
      loading.value = false
    }
  }

  // =====================================================
  // SAVE PATIENT
  // =====================================================

  const savePatient = async () => {
    saving.value = true
    error.value = ''
    success.value = ''

    try {
      /*
       * Hanya kirim field yang diterima
       * oleh PatientUpdate di backend.
       */
      const payload = {
        full_name:
          patientData.value.full_name,

        phone:
          patientData.value.phone,

        address:
          patientData.value.address,

        occupation:
          patientData.value.occupation,

        pmo_name:
          patientData.value.pmo_name,

        pmo_phone:
          patientData.value.pmo_phone,

        clinical_note:
          patientData.value.clinical_note
      }

      console.log('=== UPDATE PATIENT ===')
      console.log('Patient ID:', patientId)
      console.log('Payload:', payload)

      const response = await api.put(
        `/patients/${patientId}`,
        payload
      )

      console.log(
        'UPDATE RESPONSE:',
        response.data
      )

      success.value =
        'Data pasien berhasil diperbarui.'

      setTimeout(() => {
        router.push(
          `/dashboard/patients/${patientId}`
        )
      }, 700)

    } catch (err) {
      console.error(
        '=== UPDATE PATIENT ERROR ==='
      )

      console.error(
        'Status:',
        err.response?.status
      )

      console.error(
        'Response:',
        err.response?.data
      )

      console.error(
        'Error:',
        err
      )

      error.value =
        err.response?.data?.detail ||
        err.response?.data?.message ||
        `Gagal menyimpan perubahan. Status: ${
          err.response?.status || 'unknown'
        }`

    } finally {
      saving.value = false
    }
  }

  // =====================================================
  // CANCEL
  // =====================================================

  const cancelEdit = () => {
    router.push(
      `/dashboard/patients/${patientId}`
    )
  }

  // =====================================================
  // LOAD
  // =====================================================

  onMounted(() => {
    fetchPatient()
  })

  return {
    patientData,

    loading,
    saving,
    error,
    success,

    fetchPatient,
    savePatient,
    cancelEdit
  }
}
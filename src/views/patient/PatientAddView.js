import { ref } from 'vue'
import { useRouter } from 'vue-router'
import patientService from '../../services/patient.service'

export function usePatientAddView() {
  const router = useRouter()

  // =====================================================
  // FORM DATA
  // =====================================================

  const formData = ref({
    medicalRecordNumber: '',
    name: '',
    nik: '',
    dob: '',
    gender: 'male',
    phone: '',
    address: '',
    job: '',
    pmoName: '',
    pmoPhone: '',
    clinicalNote: ''
  })

  // =====================================================
  // STATE
  // =====================================================

  const isSubmitting = ref(false)
  const showSuccessModal = ref(false)
  const errorMessage = ref('')

  const createdCredentials = ref({
    username: '',
    password: ''
  })

  // =====================================================
  // VALIDATION
  // =====================================================

  const validateForm = () => {
    errorMessage.value = ''

    if (!formData.value.medicalRecordNumber.trim()) {
      errorMessage.value = 'Nomor rekam medis wajib diisi.'
      return false
    }

    if (!formData.value.name.trim()) {
      errorMessage.value = 'Nama lengkap wajib diisi.'
      return false
    }

    if (!/^\d{16}$/.test(formData.value.nik.trim())) {
      errorMessage.value = 'NIK harus terdiri dari 16 digit.'
      return false
    }

    if (!formData.value.dob) {
      errorMessage.value = 'Tanggal lahir wajib diisi.'
      return false
    }

    if (!formData.value.gender) {
      errorMessage.value = 'Jenis kelamin wajib dipilih.'
      return false
    }

    if (!formData.value.phone.trim()) {
      errorMessage.value = 'Nomor telepon wajib diisi.'
      return false
    }

    if (!formData.value.address.trim()) {
      errorMessage.value = 'Alamat wajib diisi.'
      return false
    }

    if (!formData.value.job.trim()) {
      errorMessage.value = 'Pekerjaan wajib diisi.'
      return false
    }

    if (!formData.value.pmoName.trim()) {
      errorMessage.value = 'Nama PMO wajib diisi.'
      return false
    }

    if (!formData.value.pmoPhone.trim()) {
      errorMessage.value = 'Nomor telepon PMO wajib diisi.'
      return false
    }

    return true
  }

  // =====================================================
  // SAVE PATIENT
  // =====================================================

  const savePatient = async () => {
    if (!validateForm()) {
      return
    }

    isSubmitting.value = true
    errorMessage.value = ''

    try {
      const payload = {
        medical_record_number:
          formData.value.medicalRecordNumber.trim(),

        full_name:
          formData.value.name.trim(),

        nik:
          formData.value.nik.trim(),

        birth_date:
          formData.value.dob,

        gender:
          formData.value.gender,

        phone:
          formData.value.phone.trim(),

        address:
          formData.value.address.trim(),

        occupation:
          formData.value.job.trim(),

        pmo_name:
          formData.value.pmoName.trim(),

        pmo_phone:
          formData.value.pmoPhone.trim(),

        clinical_note:
          formData.value.clinicalNote.trim() || null
      }

      console.log('POST /patients:', payload)

      const response = await patientService.createPatient(payload)

      console.log('Patient created:', response.data)

      // Credential dibuat oleh BACKEND
      createdCredentials.value = {
        username: response.data.username,
        password: response.data.temporary_password
      }

      showSuccessModal.value = true

    } catch (error) {
      console.error('Create patient failed:', error)

      const detail = error?.response?.data?.detail

      if (Array.isArray(detail)) {
        errorMessage.value = detail
          .map(item => item.msg)
          .join(', ')
      } else {
        errorMessage.value =
          detail || 'Gagal menambahkan pasien.'
      }

    } finally {
      isSubmitting.value = false
    }
  }

  // =====================================================
  // CANCEL
  // =====================================================

  const cancelAdd = () => {
    if (isSubmitting.value) {
      return
    }

    router.push('/dashboard/patients')
  }

  // =====================================================
  // FINISH
  // =====================================================

  const finishAndRedirect = () => {
    showSuccessModal.value = false

    router.push('/dashboard/patients')
  }

  return {
    router,

    formData,

    isSubmitting,
    showSuccessModal,
    errorMessage,
    createdCredentials,

    validateForm,
    savePatient,
    cancelAdd,
    finishAndRedirect
  }
}
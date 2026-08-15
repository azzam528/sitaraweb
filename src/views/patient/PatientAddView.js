import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import patientService from '@/services/patient.service'

export default defineComponent({
  name: 'PatientAddView',
  setup() {
    const router = useRouter()

    const formData = ref({
      mrn: '',
      nik: '',
      bpjs: '',
      name: '',
      dob: '',
      gender: 'L',
      phone: '',
      job: 'Karyawan Swasta',
      address: '',
      
      tbType: 'TB Paru SO',
      category: 'Kategori 1',
      regimen: '2RHZE/4RH',
      startDate: new Date().toISOString().split('T')[0],
      
      faskes: 'Puskesmas Sukajadi',
      doctor: 'dr. Siti Rahmawati, Sp.P',
      pmoName: '',
      pmoRelation: '',
      pmoPhone: '',
      kader: ''
    })

    const createAccount = ref(true)
    const isSubmitting = ref(false)
    const showSuccessModal = ref(false)
    const createdCredentials = ref({
      username: '',
      password: ''
    })

    const savePatient = async () => {
      // Validate NIK
      if (!formData.value.nik || formData.value.nik.length !== 16) {
        alert('NIK harus berupa 16 digit angka.')
        return
      }

      isSubmitting.value = true
      
      try {
        const randomMrn = `RM-2026-${Math.floor(1000 + Math.random() * 9000)}`
        const payload = {
          medical_record_number: formData.value.mrn.trim() || randomMrn,
          full_name: formData.value.name.trim(),
          nik: formData.value.nik.trim(),
          birth_date: formData.value.dob,
          gender: formData.value.gender === 'P' ? 'female' : 'male',
          phone: formData.value.phone.replace(/[^0-9]/g, '').slice(0, 15) || '081234567890',
          address: formData.value.address.trim(),
          occupation: formData.value.job.trim() || 'Wiraswasta',
          pmo_name: formData.value.pmoName.trim() || 'PMO Mandiri',
          pmo_phone: formData.value.pmoPhone.replace(/[^0-9]/g, '').slice(0, 15) || '081234567891',
          clinical_note: `${formData.value.tbType} (${formData.value.category}). Rejimen: ${formData.value.regimen}`
        }

        const res = await patientService.create(payload)
        const resData = res.data

        createdCredentials.value = {
          username: resData.username || 'TB_USER',
          password: resData.temporary_password || 'password123'
        }

        showSuccessModal.value = true
      } catch (err) {
        console.error('Failed to create patient:', err)
        const detail = err.response?.data?.detail
        if (Array.isArray(detail)) {
          alert('Gagal: ' + detail.map(d => `${d.loc.slice(-1)[0]}: ${d.msg}`).join(', '))
        } else {
          alert('Gagal mendaftarkan pasien: ' + (detail || err.message))
        }
      } finally {
        isSubmitting.value = false
      }
    }

    const finishAndRedirect = () => {
      showSuccessModal.value = false
      router.push('/dashboard/patients')
    }

    const cancelAdd = () => {
      router.push('/dashboard/patients')
    }

    return {
      formData,
      createAccount,
      isSubmitting,
      showSuccessModal,
      createdCredentials,
      savePatient,
      finishAndRedirect,
      cancelAdd
    }
  }
})


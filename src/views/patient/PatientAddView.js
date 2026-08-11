import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'PatientAddView',
  setup() {
    const router = useRouter()

    const formData = ref({
      nik: '',
      bpjs: '',
      name: '',
      dob: '',
      gender: 'L',
      phone: '',
      job: '',
      address: '',
      
      tbType: 'TB Paru SO',
      category: 'Kategori 1',
      regimen: '',
      startDate: '',
      
      faskes: 'Puskesmas Sukajadi',
      doctor: '',
      pmoName: '',
      pmoRelation: '',
      pmoPhone: '',
      kader: ''
    })

    const createAccount = ref(true)
    const isSubmitting = ref(false)
    const showSuccessModal = ref(false)

    const savePatient = () => {
      isSubmitting.value = true
      
      // Simulate API call
      setTimeout(() => {
        isSubmitting.value = false
        showSuccessModal.value = true
      }, 1000)
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
      savePatient,
      finishAndRedirect,
      cancelAdd
    }
  }
})

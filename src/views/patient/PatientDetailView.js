import { defineComponent, ref, computed, onMounted } from 'vue'
import { useRoute, useRouter, RouterLink } from 'vue-router'
import patientService from '@/services/patient.service'

export default defineComponent({
  name: 'PatientDetailView',
  components: {
    RouterLink
  },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const isLoading = ref(true)
    const error = ref(null)

    const patient = ref(null)
    const treatment = ref(null)
    const nextControl = ref(null)
    const refills = ref([])

    const calculateAge = (birthDate) => {
      if (!birthDate) return 35
      const birth = new Date(birthDate)
      const now = new Date()
      let age = now.getFullYear() - birth.getFullYear()
      const m = now.getMonth() - birth.getMonth()
      if (m < 0 || (m === 0 && now.getDate() < birth.getDate())) {
        age--
      }
      return age > 0 ? age : 30
    }

    const formatDate = (dateStr) => {
      if (!dateStr) return '-'
      try {
        const d = new Date(dateStr)
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des']
        return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`
      } catch {
        return dateStr
      }
    }

    const loadPatientDetail = async () => {
      const id = route.params.id
      if (!id) return

      isLoading.value = true
      error.value = null
      try {
        const response = await patientService.getDetail(id)
        const data = response.data
        if (data) {
          patient.value = data.patient
          treatment.value = data.treatment
          nextControl.value = data.next_control
          refills.value = data.refills || []
        }
      } catch (err) {
        console.error('Failed to load patient detail:', err)
        // Fallback to basic getById if detail fails
        try {
          const fallback = await patientService.getById(id)
          patient.value = fallback.data
        } catch (fErr) {
          error.value = 'Data pasien tidak ditemukan.'
        }
      } finally {
        isLoading.value = false
      }
    }

    const initials = computed(() => {
      if (!patient.value?.full_name) return 'TB'
      return patient.value.full_name
        .split(' ')
        .map(n => n[0])
        .join('')
        .substring(0, 2)
        .toUpperCase()
    })

    const age = computed(() => {
      return calculateAge(patient.value?.birth_date)
    })

    const genderText = computed(() => {
      const g = String(patient.value?.gender || '').toLowerCase()
      return g === 'female' || g === 'p' ? 'Perempuan' : 'Laki-laki'
    })

    const contactPatient = () => {
      const phone = patient.value?.phone || patient.value?.pmo_phone
      if (phone) {
        window.open(`https://wa.me/${phone.replace(/[^0-9]/g, '')}`, '_blank')
      } else {
        alert('Nomor telepon pasien belum terdaftar.')
      }
    }

    onMounted(() => {
      loadPatientDetail()
    })

    return {
      route,
      patient,
      treatment,
      nextControl,
      refills,
      isLoading,
      error,
      initials,
      age,
      genderText,
      formatDate,
      contactPatient
    }
  }
})


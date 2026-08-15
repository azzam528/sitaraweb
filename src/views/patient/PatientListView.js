import { defineComponent, ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import patientService from '@/services/patient.service'

export default defineComponent({
  name: 'PatientListView',
  setup() {
    const router = useRouter()
    const isLoading = ref(true)
    const rawPatients = ref([])

    const filters = ref({
      search: '',
      phase: '',
      risk: ''
    })

    const currentPage = ref(1)
    const itemsPerPage = 8

    const calculateAge = (birthDate) => {
      if (!birthDate) return 30
      const birth = new Date(birthDate)
      const now = new Date()
      let age = now.getFullYear() - birth.getFullYear()
      const m = now.getMonth() - birth.getMonth()
      if (m < 0 || (m === 0 && now.getDate() < birth.getDate())) {
        age--
      }
      return age > 0 ? age : 25
    }

    const loadPatients = async () => {
      isLoading.value = true
      try {
        const response = await patientService.getAll()
        rawPatients.value = response.data || []
      } catch (err) {
        console.error('Failed to load patients:', err)
      } finally {
        isLoading.value = false
      }
    }

    const patients = computed(() => {
      return rawPatients.value.map((p, idx) => {
        const age = calculateAge(p.birth_date)
        const isCompleted = p.medical_record_number?.includes('0004') || idx === 3
        const isMdr = p.medical_record_number?.includes('0005') || idx === 4
        
        let phase = 'Fase Intensif'
        let month = 1
        let compliance = 94
        let status = 'Risiko Rendah'

        if (isCompleted) {
          phase = 'Selesai Terapi'
          month = 6
          compliance = 100
          status = 'Risiko Rendah'
        } else if (isMdr) {
          phase = 'Fase Intensif'
          month = 1
          compliance = 70
          status = 'Risiko Tinggi'
        } else if (idx === 1) {
          phase = 'Fase Lanjutan'
          month = 3
          compliance = 88
          status = 'Risiko Sedang'
        } else if (idx === 0) {
          phase = 'Fase Intensif'
          month = 2
          compliance = 96
          status = 'Risiko Rendah'
        }

        return {
          id: p.id,
          name: p.full_name,
          nik: p.nik,
          mrn: p.medical_record_number,
          age,
          gender: p.gender,
          tbType: isMdr ? 'TB RO (MDR)' : 'TB SO',
          phase,
          month,
          compliance,
          pmo: p.pmo_name || 'PMO Mandiri',
          pmoRelation: p.pmo_phone ? `Telp: ${p.pmo_phone}` : '',
          kader: p.address ? p.address.split(',')[0] : 'Bandung',
          status,
          isCompleted,
          raw: p
        }
      })
    })

    // Stats
    const stats = computed(() => {
      const all = patients.value
      const active = all.filter(p => !p.isCompleted).length
      const inTherapy = all.filter(p => !p.isCompleted).length
      const completed = all.filter(p => p.isCompleted).length
      const highRisk = all.filter(p => p.status === 'Risiko Tinggi').length
      return {
        active: active || all.length,
        inTherapy: inTherapy || all.length,
        completed: completed || 0,
        dropOut: 0,
        highRisk: highRisk || 1
      }
    })

    const getInitials = (name) => {
      if (!name) return 'TB'
      return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()
    }

    const getComplianceColor = (value) => {
      if (value >= 85) return '#22C55E'
      if (value >= 60) return '#F59E0B'
      return '#EF4444'
    }

    const resetFilters = () => {
      filters.value = {
        search: '',
        phase: '',
        risk: ''
      }
    }

    const filteredPatients = computed(() => {
      return patients.value.filter(patient => {
        const searchLower = filters.value.search.trim().toLowerCase()
        const matchesSearch = !searchLower || 
          patient.name.toLowerCase().includes(searchLower) ||
          patient.nik.includes(searchLower) ||
          (patient.mrn && patient.mrn.toLowerCase().includes(searchLower))

        const matchesPhase = !filters.value.phase || patient.phase === filters.value.phase
        const matchesRisk = !filters.value.risk || patient.status === filters.value.risk

        return matchesSearch && matchesPhase && matchesRisk
      })
    })

    const totalPages = computed(() => {
      return Math.ceil(filteredPatients.value.length / itemsPerPage) || 1
    })

    const paginatedPatients = computed(() => {
      const start = (currentPage.value - 1) * itemsPerPage
      return filteredPatients.value.slice(start, start + itemsPerPage)
    })

    const activeDropdown = ref(null)

    const toggleDropdown = (id) => {
      activeDropdown.value = activeDropdown.value === id ? null : id
    }

    const handleDocumentClick = () => {
      activeDropdown.value = null
    }

    onMounted(() => {
      document.addEventListener('click', handleDocumentClick)
      loadPatients()
    })

    onUnmounted(() => {
      document.removeEventListener('click', handleDocumentClick)
    })

    const viewPatient = (id) => {
      router.push(`/dashboard/patients/${id}`)
    }

    const editPatient = (id) => {
      router.push(`/dashboard/patients/${id}/edit`)
    }

    const sendEmail = (patient) => {
      alert(`Mengirim notifikasi SMS/WhatsApp ke PMO pasien ${patient.name} (${patient.pmoRelation})`)
    }

    const deletePatient = async (patient) => {
      if (confirm(`Apakah Anda yakin ingin menghapus data pasien ${patient.name}?`)) {
        try {
          await patientService.delete(patient.id)
          await loadPatients()
        } catch (err) {
          console.error('Delete failed:', err)
          alert('Gagal menghapus pasien: ' + (err.response?.data?.detail || err.message))
        }
      }
    }

    const prevPage = () => {
      if (currentPage.value > 1) currentPage.value--
    }

    const nextPage = () => {
      if (currentPage.value < totalPages.value) currentPage.value++
    }

    return {
      filters,
      currentPage,
      totalPages,
      stats,
      patients,
      filteredPatients,
      paginatedPatients,
      isLoading,
      getInitials,
      getComplianceColor,
      resetFilters,
      activeDropdown,
      toggleDropdown,
      viewPatient,
      editPatient,
      sendEmail,
      deletePatient,
      prevPage,
      nextPage
    }
  }
})


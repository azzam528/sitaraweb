import { defineComponent, ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'PatientListView',
  setup() {
    const router = useRouter()

    const filters = ref({
      search: '',
      phase: '',
      risk: ''
    })

    const currentPage = ref(1)
    const totalPages = ref(2)

    const patients = ref([
      {
        id: 1,
        name: 'Ahmad Subarjo',
        nik: '3273102805620001',
        age: 62,
        tbType: 'TB SO',
        phase: 'Fase Lanjutan',
        month: 4,
        compliance: 98,
        pmo: 'Siti Ayu',
        pmoRelation: 'Istri',
        kader: 'Ibu Rahma',
        status: 'Risiko Rendah'
      },
      {
        id: 2,
        name: 'Lina Nuraini',
        nik: '3273104509810003',
        age: 42,
        tbType: 'TB RO',
        phase: 'Fase Awal',
        month: 1,
        compliance: 65,
        pmo: 'Budi Santoso',
        pmoRelation: 'Adik',
        kader: 'Pak Jono',
        status: 'Risiko Tinggi'
      },
      {
        id: 3,
        name: 'Budi Kusuma',
        nik: '3273101112950004',
        age: 28,
        tbType: 'TB SO',
        phase: 'Fase Lanjutan',
        month: 6,
        compliance: 100,
        pmo: 'Mandiri',
        pmoRelation: '',
        kader: 'Ibu Rahma',
        status: 'Risiko Rendah'
      },
      {
        id: 4,
        name: 'Dewi Sartika',
        nik: '3273105506780005',
        age: 45,
        tbType: 'TB SO',
        phase: 'Fase Intensif',
        month: 2,
        compliance: 85,
        pmo: 'Hasan',
        pmoRelation: 'Suami',
        kader: 'Pak Jono',
        status: 'Risiko Sedang'
      },
      {
        id: 5,
        name: 'Rizky Pratama',
        nik: '3273101203000006',
        age: 25,
        tbType: 'TB RO',
        phase: 'Fase Intensif',
        month: 1,
        compliance: 45,
        pmo: 'Ani Pratama',
        pmoRelation: 'Ibu',
        kader: 'Ibu Siti',
        status: 'Risiko Tinggi'
      },
      {
        id: 6,
        name: 'Siti Nurhaliza',
        nik: '3273106608900007',
        age: 33,
        tbType: 'TB SO',
        phase: 'Fase Lanjutan',
        month: 5,
        compliance: 92,
        pmo: 'Rudi',
        pmoRelation: 'Suami',
        kader: 'Pak Ahmad',
        status: 'Risiko Rendah'
      }
    ])

    const getInitials = (name) => {
      return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()
    }

    const getComplianceColor = (value) => {
      if (value >= 80) return '#22C55E'
      if (value >= 50) return '#F59E0B'
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
          patient.nik.includes(searchLower)

        const matchesPhase = !filters.value.phase || patient.phase === filters.value.phase
        const matchesRisk = !filters.value.risk || patient.status === filters.value.risk

        return matchesSearch && matchesPhase && matchesRisk
      })
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
      alert(`Mengirim pesan / email ke ${patient.name}`)
    }

    const deletePatient = (patient) => {
      if (confirm(`Apakah Anda yakin ingin menghapus data pasien ${patient.name}?`)) {
        patients.value = patients.value.filter(p => p.id !== patient.id)
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
      patients,
      getInitials,
      getComplianceColor,
      resetFilters,
      filteredPatients,
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

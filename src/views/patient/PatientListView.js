import {
  ref,
  computed,
  onMounted,
  onUnmounted
} from 'vue'

import { useRouter } from 'vue-router'
import { usePatientStore } from '../../stores/patient'

export function usePatientListView() {
  const router = useRouter()
  const patientStore = usePatientStore()

  // ========================================
  // FILTER
  // ========================================

  const filters = ref({
    search: '',
    gender: ''
  })

  // ========================================
  // PAGINATION
  // ========================================

  const currentPage = ref(1)
  const pageSize = 10

  // ========================================
  // DROPDOWN
  // ========================================

  const activeDropdown = ref(null)

  // ========================================
  // LOAD DATA
  // ========================================

  const loadPatients = async () => {
    try {
      await patientStore.fetchPatients()

      console.log(
        'PATIENT DATA:',
        patientStore.patients
      )
    } catch (error) {
      console.error(error)
    }
  }

  // ========================================
  // FILTERED PATIENTS
  // ========================================

  const filteredPatients = computed(() => {
    const search =
      filters.value.search
        .trim()
        .toLowerCase()

    return patientStore.patients.filter(
      patient => {
        const name =
          patient.full_name
            ?.toLowerCase() || ''

        const nik =
          patient.nik || ''

        const matchesSearch =
          !search ||
          name.includes(search) ||
          nik.includes(search)

        const matchesGender =
          !filters.value.gender ||
          patient.gender ===
            filters.value.gender

        return (
          matchesSearch &&
          matchesGender
        )
      }
    )
  })

  // ========================================
  // PAGINATION
  // ========================================

  const totalPages = computed(() => {
    return Math.max(
      1,
      Math.ceil(
        filteredPatients.value.length /
          pageSize
      )
    )
  })

  const paginatedPatients = computed(() => {
    const start =
      (currentPage.value - 1) *
      pageSize

    return filteredPatients.value.slice(
      start,
      start + pageSize
    )
  })

  // ========================================
  // STATISTICS
  // ========================================

  const totalPatients = computed(() =>
    patientStore.patients.length
  )

  const activePatients = computed(() =>
    patientStore.patients.filter(
      patient =>
        patient.is_active === true
    ).length
  )

  // ========================================
  // HELPERS
  // ========================================

  const getInitials = (name) => {
    if (!name) return '?'

    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .substring(0, 2)
      .toUpperCase()
  }

  const calculateAge = (birthDate) => {
    if (!birthDate) return '-'

    const birth =
      new Date(birthDate)

    const today =
      new Date()

    let age =
      today.getFullYear() -
      birth.getFullYear()

    const month =
      today.getMonth() -
      birth.getMonth()

    if (
      month < 0 ||
      (
        month === 0 &&
        today.getDate() <
          birth.getDate()
      )
    ) {
      age--
    }

    return age
  }

  const formatGender = (gender) => {
    if (gender === 'male') {
      return 'Laki-laki'
    }

    if (gender === 'female') {
      return 'Perempuan'
    }

    return '-'
  }

  // ========================================
  // NAVIGATION
  // ========================================

  const viewPatient = (id) => {
    router.push(
      `/dashboard/patients/${id}`
    )
  }

  const editPatient = (id) => {
    router.push(
      `/dashboard/patients/${id}/edit`
    )
  }

  // ========================================
  // DELETE
  // ========================================

  const deletePatient = async (patient) => {
    const confirmed = confirm(
      `Apakah Anda yakin ingin menghapus data pasien ${patient.full_name}?`
    )

    if (!confirmed) return

    try {
      await patientStore.deletePatient(
        patient.id
      )

      alert(
        'Pasien berhasil dihapus'
      )

      // Pastikan dropdown ditutup
      activeDropdown.value = null

      // Kalau setelah delete halaman
      // menjadi kosong, kembali ke page sebelumnya
      if (
        paginatedPatients.value.length === 0 &&
        currentPage.value > 1
      ) {
        currentPage.value--
      }

    } catch (error) {
      console.error(
        'DELETE PATIENT ERROR:',
        error
      )

      alert(
        error.response?.data?.detail ||
        'Gagal menghapus pasien'
      )
    }
  }

  // ========================================
  // RESET FILTER
  // ========================================

  const resetFilters = () => {
    filters.value = {
      search: '',
      gender: ''
    }

    currentPage.value = 1
  }

  // ========================================
  // DROPDOWN
  // ========================================

  const toggleDropdown = (id) => {
    activeDropdown.value =
      activeDropdown.value === id
        ? null
        : id
  }

  const handleDocumentClick = () => {
    activeDropdown.value = null
  }

  // ========================================
  // PAGINATION
  // ========================================

  const prevPage = () => {
    if (
      currentPage.value > 1
    ) {
      currentPage.value--
    }
  }

  const nextPage = () => {
    if (
      currentPage.value <
      totalPages.value
    ) {
      currentPage.value++
    }
  }

  // ========================================
  // LIFECYCLE
  // ========================================

  onMounted(() => {
    loadPatients()

    document.addEventListener(
      'click',
      handleDocumentClick
    )
  })

  onUnmounted(() => {
    document.removeEventListener(
      'click',
      handleDocumentClick
    )
  })

  return {
    patientStore,

    filters,

    currentPage,
    pageSize,

    activeDropdown,

    totalPatients,
    activePatients,

    filteredPatients,
    totalPages,
    paginatedPatients,

    loadPatients,

    getInitials,
    calculateAge,
    formatGender,

    viewPatient,
    editPatient,
    deletePatient,

    resetFilters,

    toggleDropdown,
    handleDocumentClick,

    prevPage,
    nextPage
  }
}
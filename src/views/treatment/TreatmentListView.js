import { defineComponent, ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import treatmentService from '../../services/treatment.service'

export default defineComponent({
  name: 'TreatmentListView',
  setup() {
    const router = useRouter()

    // Data State
    const treatments = ref([])
    const isLoading = ref(true)
    const isSubmitting = ref(false)

    // Alert Feedback
    const alertMessage = ref('')
    const alertType = ref('success')

    const showAlert = (message, type = 'success') => {
      alertMessage.value = message
      alertType.value = type
      setTimeout(() => {
        alertMessage.value = ''
      }, 4000)
    }

    // Filters & Search
    const searchQuery = ref('')
    const filterStatus = ref('')

    // Pagination
    const currentPage = ref(1)
    const pageSize = 10

    // Dropdown Action
    const activeDropdown = ref(null)

    const toggleDropdown = (id) => {
      activeDropdown.value = activeDropdown.value === id ? null : id
    }

    const handleDocumentClick = () => {
      activeDropdown.value = null
    }

    onMounted(() => {
      document.addEventListener('click', handleDocumentClick)
      loadTreatments()
    })

    onUnmounted(() => {
      document.removeEventListener('click', handleDocumentClick)
    })

    // Fetch Treatments from API
    const loadTreatments = async () => {
      isLoading.value = true
      try {
        const response = await treatmentService.getAll()
        treatments.value = response.data || []
      } catch (error) {
        console.error('Failed to load treatments:', error)
        showAlert('Gagal memuat data pengobatan dari server', 'danger')
      } finally {
        isLoading.value = false
      }
    }

    // Computed Statistics
    const activeCount = computed(() => treatments.value.filter(t => t.status === 'active').length)
    const completedCount = computed(() => treatments.value.filter(t => t.status === 'completed').length)
    const droppedCount = computed(() => treatments.value.filter(t => t.status === 'dropped').length)

    // Filtered & Paginated Treatments
    const filteredTreatments = computed(() => {
      return treatments.value.filter(t => {
        const query = searchQuery.value.toLowerCase().trim()
        const patientName = t.patient?.full_name?.toLowerCase() || ''
        const nik = t.patient?.nik || ''
        const medRecord = t.patient?.medical_record_number?.toLowerCase() || ''

        const matchesSearch = !query || 
          patientName.includes(query) || 
          nik.includes(query) || 
          medRecord.includes(query)

        const matchesStatus = !filterStatus.value || t.status === filterStatus.value

        return matchesSearch && matchesStatus
      })
    })

    const totalPages = computed(() => Math.ceil(filteredTreatments.value.length / pageSize) || 1)

    const paginatedTreatments = computed(() => {
      const start = (currentPage.value - 1) * pageSize
      return filteredTreatments.value.slice(start, start + pageSize)
    })

    // Formatting & Calculations
    const formatStatus = (status) => {
      if (status === 'active') return 'Aktif Pengobatan'
      if (status === 'completed') return 'Selesai (Sembuh)'
      if (status === 'defaulted') return 'Putus Berobat (Mangkir)'
      return status || '-'
    }

    const formatDate = (dateStr) => {
      if (!dateStr) return '-'
      const d = new Date(dateStr)
      return d.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })
    }

    const getInitials = (name) => {
      if (!name) return 'TB'
      return name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase()
    }

    const getAvatarColor = (id) => {
      const colors = ['#0284c7', '#0d9488', '#16a34a', '#d97706', '#dc2626', '#7c3aed']
      return colors[(id || 0) % colors.length]
    }

    const calculateProgress = (treatment) => {
      if (!treatment.start_date || !treatment.estimated_end_date) {
        return { percentage: 0, daysPassed: 0, totalDays: 180 }
      }

      const start = new Date(treatment.start_date).getTime()
      const end = new Date(treatment.estimated_end_date).getTime()
      const now = new Date().getTime()

      const totalDays = Math.max(1, Math.round((end - start) / (1000 * 60 * 60 * 24)))
      const daysPassed = Math.max(0, Math.min(totalDays, Math.round((now - start) / (1000 * 60 * 60 * 24))))
      
      let percentage = Math.round((daysPassed / totalDays) * 100)
      if (treatment.status === 'completed') percentage = 100

      return { percentage: Math.min(100, Math.max(0, percentage)), daysPassed, totalDays }
    }

    const getProgressColor = (treatment) => {
      const { percentage } = calculateProgress(treatment)
      if (treatment.status === 'completed') return '#16a34a'
      if (treatment.status === 'dropped') return '#dc2626'
      if (percentage >= 75) return '#16a34a'
      if (percentage >= 40) return '#0284c7'
      return '#d97706'
    }

    // Actions
    const viewDetail = (id) => {
      router.push(`/dashboard/treatments/${id}`)
    }

    const sendWhatsApp = (treatment) => {
      const phone = treatment.patient?.phone
      if (!phone) {
        showAlert('Nomor telepon pasien tidak tersedia', 'warning')
        return
      }
      const cleanPhone = phone.replace(/^0/, '62').replace(/\D/g, '')
      const msg = encodeURIComponent(`Halo Bpk/Ibu ${treatment.patient?.full_name}, kami dari tim medis SITARA mengingatkan terkait kelanjutan pengobatan TB Anda. Mohon tetap rutin minum obat tepat waktu.`)
      window.open(`https://wa.me/${cleanPhone}?text=${msg}`, '_blank')
    }

    // Modal Update Status
    const showStatusModal = ref(false)
    const selectedTreatment = ref(null)
    const statusForm = ref({
      status: 'active',
      doctor_note: ''
    })

    const openStatusModal = (treatment) => {
      selectedTreatment.value = treatment
      statusForm.value = {
        status: treatment.status || 'active',
        doctor_note: treatment.doctor_note || ''
      }
      showStatusModal.value = true
    }

    const submitUpdateStatus = async () => {
      if (!selectedTreatment.value) return

      isSubmitting.value = true
      try {
        await treatmentService.update(selectedTreatment.value.id, {
          status: statusForm.value.status,
          doctor_note: statusForm.value.doctor_note || null
        })

        showAlert('Status pengobatan berhasil diperbarui!')
        showStatusModal.value = false
        await loadTreatments()
      } catch (error) {
        console.error('Failed to update status:', error)
        showAlert('Gagal memperbarui status pengobatan', 'danger')
      } finally {
        isSubmitting.value = false
      }
    }

    // Confirm Delete
    const confirmDelete = async (treatment) => {
      const name = treatment.patient?.full_name || 'Pasien #' + treatment.patient_id
      if (confirm(`Apakah Anda yakin ingin menghapus rekam pengobatan untuk ${name}?`)) {
        try {
          await treatmentService.delete(treatment.id)
          showAlert('Rekam pengobatan berhasil dihapus!')
          await loadTreatments()
        } catch (error) {
          console.error('Failed to delete treatment:', error)
          showAlert('Gagal menghapus rekam pengobatan', 'danger')
        }
      }
    }

    const resetFilters = () => {
      searchQuery.value = ''
      filterStatus.value = ''
      currentPage.value = 1
    }

    return {
      treatments,
      isLoading,
      isSubmitting,
      alertMessage,
      alertType,
      showAlert,
      searchQuery,
      filterStatus,
      resetFilters,
      currentPage,
      pageSize,
      activeDropdown,
      toggleDropdown,
      activeCount,
      completedCount,
      droppedCount,
      filteredTreatments,
      totalPages,
      paginatedTreatments,
      formatStatus,
      formatDate,
      getInitials,
      getAvatarColor,
      calculateProgress,
      getProgressColor,
      viewDetail,
      sendWhatsApp,
      showStatusModal,
      selectedTreatment,
      statusForm,
      openStatusModal,
      submitUpdateStatus,
      confirmDelete
    }
  }
})

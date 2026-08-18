import { defineComponent, ref, computed, onMounted, onUnmounted } from 'vue'
import refillService from '../../services/refill.service'
import treatmentService from '../../services/treatment.service'
import medicineService from '../../services/medicine.service'

export default defineComponent({
  name: 'RefillRequestView',
  setup() {
    const refills = ref([])
    const availableTreatments = ref([])
    const medicines = ref([])

    const isLoading = ref(true)
    const isSubmitting = ref(false)

    // Alert Toast
    const alertMessage = ref('')
    const alertType = ref('success')

    const showAlert = (msg, type = 'success') => {
      alertMessage.value = msg
      alertType.value = type
      setTimeout(() => {
        alertMessage.value = ''
      }, 4000)
    }

    // Search & Filter
    const searchQuery = ref('')
    const filterStatus = ref('')
    const filterReason = ref('')

    // Pagination
    const currentPage = ref(1)
    const pageSize = 10

    // Dropdown
    const activeDropdown = ref(null)

    const toggleDropdown = (id) => {
      activeDropdown.value = activeDropdown.value === id ? null : id
    }

    const handleDocumentClick = () => {
      activeDropdown.value = null
    }

    onMounted(() => {
      document.addEventListener('click', handleDocumentClick)
      loadRefills()
      loadTreatments()
      loadMedicines()
    })

    onUnmounted(() => {
      document.removeEventListener('click', handleDocumentClick)
    })

    // Load Refills from API
    const loadRefills = async () => {
      isLoading.value = true
      try {
        const res = await refillService.getAll()
        refills.value = res.data || []
      } catch (error) {
        console.error('Failed to load refills:', error)
        showAlert('Gagal memuat daftar permintaan refill obat', 'danger')
      } finally {
        isLoading.value = false
      }
    }

    // Load Treatments & Medicines for Add Modal
    const loadTreatments = async () => {
      try {
        const res = await treatmentService.getAll()
        availableTreatments.value = res.data || []
      } catch (error) {
        console.error('Failed to load treatments:', error)
      }
    }

    const loadMedicines = async () => {
      try {
        const res = await medicineService.getAll()
        medicines.value = res.data || []
      } catch (error) {
        console.error('Failed to load medicines:', error)
      }
    }

    // Computed Statistics
    const pendingCount = computed(() => refills.value.filter(r => r.status === 'pending').length)
    const approvedCount = computed(() => refills.value.filter(r => r.status === 'approved').length)
    const rejectedCount = computed(() => refills.value.filter(r => r.status === 'rejected').length)
    const approvalRate = computed(() => {
      const processed = approvedCount.value + rejectedCount.value
      if (processed === 0) return '100%'
      return Math.round((approvedCount.value / processed) * 100) + '%'
    })

    // Filtered Refills
    const filteredRefills = computed(() => {
      return refills.value.filter(r => {
        const q = searchQuery.value.toLowerCase().trim()
        const pName = r.treatment?.patient?.full_name?.toLowerCase() || ''
        const pNik = r.treatment?.patient?.nik || ''
        const pRm = r.treatment?.patient?.medical_record_number?.toLowerCase() || ''
        const medName = r.medicine?.name?.toLowerCase() || ''
        const medCode = r.medicine?.code?.toLowerCase() || ''
        const reason = r.reason?.toLowerCase() || ''

        const matchSearch = !q || pName.includes(q) || pNik.includes(q) || pRm.includes(q) || medName.includes(q) || medCode.includes(q) || reason.includes(q)
        const matchStatus = !filterStatus.value || r.status === filterStatus.value
        const matchReason = !filterReason.value || r.reason?.toLowerCase().includes(filterReason.value.toLowerCase())

        return matchSearch && matchStatus && matchReason
      })
    })

    const totalPages = computed(() => Math.ceil(filteredRefills.value.length / pageSize) || 1)

    const paginatedRefills = computed(() => {
      const start = (currentPage.value - 1) * pageSize
      return filteredRefills.value.slice(start, start + pageSize)
    })

    // Helpers
    const formatStatus = (status) => {
      if (status === 'pending') return 'Menunggu'
      if (status === 'approved') return 'Disetujui'
      if (status === 'rejected') return 'Ditolak'
      return status || '-'
    }

    const formatDate = (dateStr) => {
      if (!dateStr) return '-'
      const d = new Date(dateStr)
      return d.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })
    }

    const formatTime = (dateStr) => {
      if (!dateStr) return '-'
      const d = new Date(dateStr)
      return d.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
    }

    const truncate = (text, maxLen = 40) => {
      if (!text) return '-'
      return text.length > maxLen ? text.slice(0, maxLen) + '...' : text
    }

    const getInitials = (name) => {
      if (!name) return 'TB'
      return name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase()
    }

    const getAvatarColor = (id) => {
      const colors = ['teal', 'primary', 'orange', 'green', 'purple']
      return colors[id % colors.length]
    }

    // Verification Modal (Approve / Reject)
    const showVerifyModal = ref(false)
    const selectedRefill = ref(null)
    const verifyTargetStatus = ref('approved')
    const verifyNurseNote = ref('')

    const openVerifyModal = (refill, targetStatus) => {
      selectedRefill.value = refill
      verifyTargetStatus.value = targetStatus
      verifyNurseNote.value = refill.nurse_note || ''
      showVerifyModal.value = true
    }

    const submitVerification = async () => {
      if (!selectedRefill.value) return
      isSubmitting.value = true
      try {
        if (verifyTargetStatus.value === 'approved') {
          await refillService.approve(selectedRefill.value.id, verifyNurseNote.value)
          showAlert('Permintaan refill berhasil disetujui!')
        } else {
          await refillService.reject(selectedRefill.value.id, verifyNurseNote.value)
          showAlert('Permintaan refill telah ditolak!')
        }
        showVerifyModal.value = false
        await loadRefills()
      } catch (error) {
        console.error('Failed to verify refill:', error)
        showAlert('Gagal memproses verifikasi refill', 'danger')
      } finally {
        isSubmitting.value = false
      }
    }

    // Detail Modal
    const showDetailModal = ref(false)
    const openDetailModal = (refill) => {
      selectedRefill.value = refill
      showDetailModal.value = true
    }

    // Add Modal
    const showAddModal = ref(false)
    const addForm = ref({
      treatment_id: '',
      medicine_id: '',
      quantity: 28,
      reason: 'Stok Habis',
      description: ''
    })

    const openAddModal = () => {
      addForm.value = {
        treatment_id: availableTreatments.value[0]?.id || '',
        medicine_id: medicines.value[0]?.id || '',
        quantity: 28,
        reason: 'Stok Habis',
        description: ''
      }
      showAddModal.value = true
    }

    const submitAddRefill = async () => {
      if (!addForm.value.treatment_id || !addForm.value.medicine_id) {
        showAlert('Pilih pengobatan dan obat terlebih dahulu', 'warning')
        return
      }
      isSubmitting.value = true
      try {
        await refillService.create({
          treatment_id: Number(addForm.value.treatment_id),
          medicine_id: Number(addForm.value.medicine_id),
          quantity: Number(addForm.value.quantity),
          reason: addForm.value.reason,
          description: addForm.value.description || null
        })
        showAlert('Permintaan refill obat berhasil dibuat!')
        showAddModal.value = false
        await loadRefills()
      } catch (error) {
        console.error('Failed to create refill:', error)
        showAlert('Gagal membuat permintaan refill', 'danger')
      } finally {
        isSubmitting.value = false
      }
    }

    // WhatsApp Helper
    const sendWhatsApp = (refill) => {
      const phone = refill.treatment?.patient?.phone
      if (!phone) {
        showAlert('Nomor WhatsApp pasien tidak tersedia', 'warning')
        return
      }
      const cleanPhone = phone.replace(/^0/, '62').replace(/\D/g, '')
      const msg = encodeURIComponent(`Halo Bpk/Ibu ${refill.treatment?.patient?.full_name}, terkait permintaan refill obat ${refill.medicine?.name} sejumlah ${refill.quantity} ${refill.medicine?.unit || 'Tablet'}: status permintaan Anda saat ini adalah ${formatStatus(refill.status)}. ${refill.nurse_note ? 'Catatan: ' + refill.nurse_note : ''}`)
      window.open(`https://wa.me/${cleanPhone}?text=${msg}`, '_blank')
    }

    // Delete Refill
    const confirmDelete = async (refill) => {
      const name = refill.treatment?.patient?.full_name || 'Pasien'
      if (confirm(`Apakah Anda yakin ingin menghapus permintaan refill obat ${refill.medicine?.name} untuk ${name}?`)) {
        try {
          await refillService.delete(refill.id)
          showAlert('Permintaan refill berhasil dihapus!')
          await loadRefills()
        } catch (error) {
          console.error('Failed to delete refill:', error)
          showAlert('Gagal menghapus permintaan refill', 'danger')
        }
      }
    }

    return {
      refills,
      availableTreatments,
      medicines,
      isLoading,
      isSubmitting,
      alertMessage,
      alertType,
      showAlert,
      searchQuery,
      filterStatus,
      filterReason,
      currentPage,
      pageSize,
      activeDropdown,
      toggleDropdown,
      pendingCount,
      approvedCount,
      rejectedCount,
      approvalRate,
      filteredRefills,
      totalPages,
      paginatedRefills,
      formatStatus,
      formatDate,
      formatTime,
      truncate,
      getInitials,
      getAvatarColor,
      showVerifyModal,
      selectedRefill,
      verifyTargetStatus,
      verifyNurseNote,
      openVerifyModal,
      submitVerification,
      showDetailModal,
      openDetailModal,
      showAddModal,
      addForm,
      openAddModal,
      submitAddRefill,
      sendWhatsApp,
      confirmDelete
    }
  }
})

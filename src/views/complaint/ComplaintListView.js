import { defineComponent, ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import complaintService from '../../services/complaint.service'

export default defineComponent({
  name: 'ComplaintListView',
  setup() {
    const router = useRouter()

    // Data State
    const complaints = ref([])
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
    const filterCategory = ref('')

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
      loadComplaints()
    })

    onUnmounted(() => {
      document.removeEventListener('click', handleDocumentClick)
    })

    // Load Complaints from API
    const loadComplaints = async () => {
      isLoading.value = true
      try {
        const res = await complaintService.getAll()
        complaints.value = res.data || []
      } catch (error) {
        console.error('Failed to load complaints:', error)
        showAlert('Gagal memuat daftar keluhan pasien', 'danger')
      } finally {
        isLoading.value = false
      }
    }

    // Computed Statistics
    const pendingCount = computed(() => complaints.value.filter(c => c.status === 'pending').length)
    const inProgressCount = computed(() => complaints.value.filter(c => c.status === 'in_progress').length)
    const resolvedCount = computed(() => complaints.value.filter(c => c.status === 'resolved').length)
    const resolutionRate = computed(() => {
      if (complaints.value.length === 0) return '100%'
      return Math.round((resolvedCount.value / complaints.value.length) * 100) + '%'
    })

    // Filtered & Paginated
    const filteredComplaints = computed(() => {
      return complaints.value.filter(c => {
        const q = searchQuery.value.toLowerCase().trim()
        const pName = c.treatment?.patient?.full_name?.toLowerCase() || ''
        const pNik = c.treatment?.patient?.nik || ''
        const pRm = c.treatment?.patient?.medical_record_number?.toLowerCase() || ''
        const cat = c.category?.toLowerCase() || ''
        const desc = c.description?.toLowerCase() || ''

        const matchSearch = !q || pName.includes(q) || pNik.includes(q) || pRm.includes(q) || cat.includes(q) || desc.includes(q)
        const matchStatus = !filterStatus.value || c.status === filterStatus.value
        const matchCategory = !filterCategory.value || c.category?.toLowerCase().includes(filterCategory.value.toLowerCase())

        return matchSearch && matchStatus && matchCategory
      })
    })

    const totalPages = computed(() => Math.ceil(filteredComplaints.value.length / pageSize) || 1)

    const paginatedComplaints = computed(() => {
      const start = (currentPage.value - 1) * pageSize
      return filteredComplaints.value.slice(start, start + pageSize)
    })

    // Helpers
    const formatStatus = (status) => {
      if (status === 'pending') return 'Menunggu Respon'
      if (status === 'in_progress') return 'Sedang Diproses'
      if (status === 'resolved') return 'Selesai'
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

    const truncate = (text, maxLen = 60) => {
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

    // Navigation & Actions
    const viewDetail = (id) => {
      router.push(`/dashboard/complaints/${id}`)
    }

    const sendWhatsApp = (comp) => {
      const phone = comp.treatment?.patient?.phone
      if (!phone) {
        showAlert('Nomor WhatsApp pasien tidak tersedia', 'warning')
        return
      }
      const cleanPhone = phone.replace(/^0/, '62').replace(/\D/g, '')
      const msg = encodeURIComponent(`Halo Bpk/Ibu ${comp.treatment?.patient?.full_name}, kami dari tim medis SITARA telah menerima keluhan Anda mengenai "${comp.category}". ${comp.response ? 'Rekomendasi dokter: ' + comp.response : 'Mohon menunggu, tim kami sedang menindaklanjuti keluhan Anda.'}`)
      window.open(`https://wa.me/${cleanPhone}?text=${msg}`, '_blank')
    }

    // Delete Complaint
    const confirmDelete = async (comp) => {
      const name = comp.treatment?.patient?.full_name || 'Pasien'
      if (confirm(`Apakah Anda yakin ingin menghapus keluhan [${comp.category}] dari ${name}?`)) {
        try {
          await complaintService.delete(comp.id)
          showAlert('Keluhan berhasil dihapus!')
          await loadComplaints()
        } catch (error) {
          console.error('Failed to delete complaint:', error)
          showAlert('Gagal menghapus keluhan', 'danger')
        }
      }
    }

    return {
      complaints,
      isLoading,
      isSubmitting,
      alertMessage,
      alertType,
      showAlert,
      searchQuery,
      filterStatus,
      filterCategory,
      currentPage,
      pageSize,
      activeDropdown,
      toggleDropdown,
      pendingCount,
      inProgressCount,
      resolvedCount,
      resolutionRate,
      filteredComplaints,
      totalPages,
      paginatedComplaints,
      formatStatus,
      formatDate,
      formatTime,
      truncate,
      getInitials,
      getAvatarColor,
      viewDetail,
      sendWhatsApp,
      confirmDelete
    }
  }
})

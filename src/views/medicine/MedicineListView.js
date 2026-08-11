import { defineComponent, ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import refillService from '../../services/refill.service'
import medicineService from '../../services/medicine.service'

export default defineComponent({
  name: 'MedicineListView',
  setup() {
    const router = useRouter()
    const activeDropdown = ref(null)

    const requests = ref([])
    const medicines = ref([])
    const isLoading = ref(true)

    // Alert feedback
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
    const filterCategory = ref('')
    const filterStatus = ref('')
    const filterStatusPill = ref('')

    // Pagination
    const currentPage = ref(1)
    const pageSize = 10

    const toggleDropdown = (id) => {
      activeDropdown.value = activeDropdown.value === id ? null : id
    }

    const handleDocumentClick = () => {
      activeDropdown.value = null
    }

    onMounted(() => {
      document.addEventListener('click', handleDocumentClick)
      loadData()
    })

    onUnmounted(() => {
      document.removeEventListener('click', handleDocumentClick)
    })

    const loadData = async () => {
      isLoading.value = true
      try {
        const [rRes, mRes] = await Promise.allSettled([
          refillService.getAll(),
          medicineService.getAll()
        ])
        if (rRes.status === 'fulfilled') requests.value = rRes.value.data || []
        if (mRes.status === 'fulfilled') medicines.value = mRes.value.data || []
      } catch (error) {
        console.error('Failed to load medicine logistik data:', error)
        showAlert('Gagal memuat data logistik OAT', 'danger')
      } finally {
        isLoading.value = false
      }
    }

    // Counts
    const pendingCount = computed(() => requests.value.filter(r => r.status === 'pending').length)
    const approvedCount = computed(() => requests.value.filter(r => r.status === 'approved').length)
    const rejectedCount = computed(() => requests.value.filter(r => r.status === 'rejected').length)

    // Filtered Requests
    const filteredRequests = computed(() => {
      return requests.value.filter(r => {
        const q = searchQuery.value.toLowerCase().trim()
        const pName = r.treatment?.patient?.full_name?.toLowerCase() || ''
        const pNik = r.treatment?.patient?.nik || ''
        const medName = r.medicine?.name?.toLowerCase() || ''
        const matchSearch = !q || pName.includes(q) || pNik.includes(q) || medName.includes(q)

        const matchCat = !filterCategory.value || r.medicine?.category?.toLowerCase().includes(filterCategory.value.toLowerCase())
        
        let matchStat = true
        if (filterStatusPill.value) {
          matchStat = r.status === filterStatusPill.value
        } else if (filterStatus.value) {
          matchStat = r.status === filterStatus.value
        }

        return matchSearch && matchCat && matchStat
      })
    })

    const totalPages = computed(() => Math.ceil(filteredRequests.value.length / pageSize) || 1)

    const paginatedRequests = computed(() => {
      const start = (currentPage.value - 1) * pageSize
      return filteredRequests.value.slice(start, start + pageSize)
    })

    const distributionHistory = computed(() => {
      return requests.value.filter(r => r.status === 'approved' || r.status === 'rejected').slice(0, 5)
    })

    const viewDetail = () => {
      router.push('/dashboard/refill-requests')
    }

    const sendNotify = (req) => {
      const pName = req.treatment?.patient?.full_name || 'Pasien'
      const phone = req.treatment?.patient?.phone
      if (phone) {
        const cleanPhone = phone.replace(/^0/, '62').replace(/\D/g, '')
        const msg = encodeURIComponent(`Halo Bpk/Ibu ${pName}, pengingat dari SITARA mengenai stok obat ${req.medicine?.name || 'OAT'}. Mohon pastikan obat diminum teratur sesuai jadwal.`)
        window.open(`https://wa.me/${cleanPhone}?text=${msg}`, '_blank')
      } else {
        showAlert(`Nomor telepon ${pName} tidak tersedia`, 'warning')
      }
    }

    const deleteRequest = async (req) => {
      const pName = req.treatment?.patient?.full_name || 'Pasien'
      if (confirm(`Apakah Anda yakin ingin menghapus permintaan OAT untuk ${pName}?`)) {
        try {
          await refillService.delete(req.id)
          requests.value = requests.value.filter(r => r.id !== req.id)
          showAlert('Permintaan obat berhasil dihapus!')
        } catch (error) {
          console.error('Failed to delete request:', error)
          showAlert('Gagal menghapus permintaan', 'danger')
        }
      }
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

    const formatStatus = (status) => {
      if (status === 'pending') return 'Menunggu'
      if (status === 'approved') return 'Disetujui'
      if (status === 'rejected') return 'Ditolak'
      return status || '-'
    }

    const getInitials = (name) => {
      if (!name) return 'TB'
      return name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase()
    }

    const getAvatarColor = (id) => {
      const colors = ['teal', 'primary', 'orange', 'green', 'purple']
      return colors[id % colors.length]
    }

    const getTypeClass = (cat) => {
      if (!cat) return 'type-cat-1'
      if (cat.toLowerCase().includes('lini 2')) return 'type-cat-2'
      if (cat.toLowerCase().includes('anak')) return 'type-child'
      return 'type-cat-1'
    }

    const getStatusClass = (status) => {
      if (status === 'approved') return 'status-approved'
      if (status === 'rejected') return 'status-rejected'
      return 'status-pending'
    }

    return {
      requests,
      medicines,
      isLoading,
      alertMessage,
      alertType,
      showAlert,
      searchQuery,
      filterCategory,
      filterStatus,
      filterStatusPill,
      currentPage,
      pageSize,
      totalPages,
      paginatedRequests,
      activeDropdown,
      toggleDropdown,
      pendingCount,
      approvedCount,
      rejectedCount,
      filteredRequests,
      distributionHistory,
      viewDetail,
      sendNotify,
      deleteRequest,
      formatDate,
      formatTime,
      formatStatus,
      getInitials,
      getAvatarColor,
      getTypeClass,
      getStatusClass
    }
  }
})

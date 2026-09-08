import { formatDateTime } from "../../utils/formatter";
import { defineComponent, ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { useRouter, RouterLink } from 'vue-router'
import videoService from '../../services/video.service'
import { useNotificationStore } from '../../stores/notification'

export default defineComponent({
  name: 'VideoListView',
  components: {
    RouterLink
  },
  setup() {
    const router = useRouter()
    const activeDropdown = ref(null)
    const isLoading = ref(true)
    const notificationStore = useNotificationStore()
    const newlyAddedIds = ref(new Set())

    // Filter & Search states
    const searchQuery = ref('')
    const filterStatus = ref('')

    // Pagination states
    const currentPage = ref(1)
    const pageSize = ref(10)

    const toggleDropdown = (id) => {
      activeDropdown.value = activeDropdown.value === id ? null : id
    }

    const handleDocumentClick = () => {
      activeDropdown.value = null
    }

    // Toast Alert
    const alertMessage = ref('')
    const alertType = ref('success')

    const showAlert = (msg, type = 'success') => {
      alertMessage.value = msg
      alertType.value = type
      setTimeout(() => {
        alertMessage.value = ''
      }, 4000)
    }

    const tableData = ref([])

    // Load data from Database via API
    const loadVideos = async (isSilent = false) => {
      if (!isSilent) {
        isLoading.value = true
      }
      try {
        const videoRes = await videoService.getAll()

        const rawList = Array.isArray(videoRes?.data)
          ? videoRes.data
          : Array.isArray(videoRes?.data?.data)
            ? videoRes.data.data
            : []

        const mappedData = rawList.map((item) => {
          const patientName = item.patient?.full_name || 'Pasien TB'
          const nik = item.patient?.nik || '-'
          const rawScore = item.ai_confidence != null
            ? (item.ai_confidence > 1 ? Math.round(item.ai_confidence) : Math.round(item.ai_confidence * 100))
            : (item.status === 'verified' ? 95 : item.status === 'rejected' ? 35 : 65)

          let aiStatus = 'Diverifikasi'
          let reviewStatus = 'Otomatis-Konfirmasi'
          if (item.status === 'pending' || item.status === 'review' || rawScore < 80) {
            aiStatus = 'Kepercayaan Rendah'
            reviewStatus = 'Menunggu Tinjauan'
          }
          if (item.status === 'rejected' || item.status === 'failed' || rawScore < 50) {
            aiStatus = 'Gagal'
            reviewStatus = 'Ditolak'
          }
          if (item.status === 'verified' || item.status === 'approved') {
            aiStatus = 'Diverifikasi'
            reviewStatus = 'Otomatis-Konfirmasi'
          }

          const timeFormatted = formatDateTime(item.created_at || item.verification_date)

          return {
            id: item.id,
            initials: patientName.split(' ').filter(Boolean).map(w => w[0]).slice(0, 2).join('').toUpperCase() || 'TB',
            avatarColor: 'bg-teal',
            name: patientName,
            nik: nik,
            time: timeFormatted,
            aiStatus: aiStatus,
            aiStatusColor: aiStatus === 'Diverifikasi' ? 'success-dot' : 'danger-dot',
            score: rawScore + '%',
            progressColor: rawScore >= 80 ? 'bg-success' : rawScore >= 50 ? 'bg-warning' : 'bg-danger',
            reviewStatus: reviewStatus,
            reviewPillClass: reviewStatus === 'Otomatis-Konfirmasi' ? 'pill-gray' : reviewStatus === 'Menunggu Tinjauan' ? 'pill-yellow' : 'pill-red'
          }
        })

        if (isSilent && tableData.value.length > 0) {
          const oldIds = new Set(tableData.value.map((v) => v.id))
          const newItems = mappedData.filter((v) => v.id && !oldIds.has(v.id))
          if (newItems.length > 0) {
            newItems.forEach((v) => newlyAddedIds.value.add(v.id))
            setTimeout(() => {
              newItems.forEach((v) => newlyAddedIds.value.delete(v.id))
            }, 5000)
          }
        }

        tableData.value = mappedData
      } catch (err) {
        console.error('Failed to load video verifications:', err)
        if (!isSilent) {
          tableData.value = []
          showAlert(err.response?.data?.detail || 'Gagal memuat data verifikasi video dari server', 'danger')
        }
      } finally {
        if (!isSilent) {
          isLoading.value = false
        }
      }
    }

    // Auto-refresh when a new video notification arrives
    watch(
      () => notificationStore.lastVideoEvent,
      (newVal, oldVal) => {
        if (newVal > oldVal) {
          console.log("[SmartPolling] New video notification detected, refreshing videos silently...")
          loadVideos(true)
        }
      }
    )

    const isNewlyAdded = (id) => {
      return newlyAddedIds.value.has(id) || notificationStore.isNewEntity('video', id)
    }

    onMounted(() => {
      document.addEventListener('click', handleDocumentClick)
      loadVideos()
    })

    onUnmounted(() => {
      document.removeEventListener('click', handleDocumentClick)
    })

    const viewDetail = (id) => {
      router.push(`/dashboard/video-verifications/${id}`)
    }

    const sendMessage = (item) => {
      alert(`Mengirim pesan ke ${item.name}`)
    }

    const deleteVerification = async (item) => {
      if (confirm(`Apakah Anda yakin ingin menghapus verifikasi video ${item.name}?`)) {
        try {
          await videoService.delete(item.id)
          tableData.value = tableData.value.filter(v => v.id !== item.id)
          showAlert('Verifikasi video berhasil dihapus!')
        } catch (error) {
          console.error('Failed to delete video verification:', error)
          showAlert(error.response?.data?.detail || 'Gagal menghapus verifikasi video', 'danger')
        }
      }
    }

    // Filter Logic (Search + Status Filter combined)
    const filteredData = computed(() => {
      return tableData.value.filter(item => {
        const q = searchQuery.value.toLowerCase().trim()
        const name = (item.name || '').toLowerCase()
        const nik = (item.nik || '').toLowerCase()

        const matchesSearch = !q || name.includes(q) || nik.includes(q)

        const statusVal = filterStatus.value
        let matchesStatus = true

        if (statusVal) {
          const itemAiStatus = (item.aiStatus || '').toLowerCase()
          const itemReviewStatus = (item.reviewStatus || '').toLowerCase()
          if (statusVal === 'Diverifikasi' && !(itemAiStatus.includes('diverifikasi') || itemReviewStatus.includes('auto verified') || itemReviewStatus.includes('konfirmasi'))) {
            matchesStatus = false
          }
          if (statusVal === 'Menunggu Tinjauan' && !(itemAiStatus.includes('rendah') || itemReviewStatus.includes('needs review') || itemReviewStatus.includes('menunggu'))) {
            matchesStatus = false
          }
          if (statusVal === 'Gagal' && !(itemAiStatus.includes('gagal') || itemReviewStatus.includes('rejected') || itemReviewStatus.includes('ditolak'))) {
            matchesStatus = false
          }
        }

        return matchesSearch && matchesStatus
      })
    })

    // Pagination
    const totalRecords = computed(() => filteredData.value.length)
    const totalPages = computed(() => Math.ceil(totalRecords.value / pageSize.value) || 1)

    const paginatedData = computed(() => {
      const start = (currentPage.value - 1) * pageSize.value
      return filteredData.value.slice(start, start + pageSize.value)
    })

    const displayedPages = computed(() => {
      const total = totalPages.value
      const current = currentPage.value

      if (total <= 7) {
        return Array.from({ length: total }, (_, i) => i + 1)
      }

      // Halaman 1
      if (current === 1) {
        return [1, 2, 3, '...', total - 1, total]
      }

      // Halaman 2
      if (current === 2) {
        return [1, 2, 3, 4, '...', total - 1, total]
      }

      // Halaman 3
      if (current === 3) {
        return [1, 2, 3, 4, '...', total - 1, total]
      }

      // Halaman terakhir (misal 30)
      if (current === total) {
        return [1, 2, '...', total - 2, total - 1, total]
      }

      // Halaman sebelum terakhir (misal 29)
      if (current === total - 1) {
        return [1, 2, '...', total - 2, total - 1, total]
      }

      // Halaman 28
      if (current === total - 2) {
        return [1, 2, '...', total - 3, total - 2, total - 1, total]
      }

      // Halaman tengah (misal 15)
      return [1, '...', current - 1, current, current + 1, '...', total]
    })

    // Pagination actions
    const prevPage = () => {
      if (currentPage.value > 1) {
        currentPage.value--
      }
    }

    const nextPage = () => {
      if (currentPage.value < totalPages.value) {
        currentPage.value++
      }
    }

    const goToPage = (page) => {
      if (page >= 1 && page <= totalPages.value) {
        currentPage.value = page
      }
    }

    const resetFilter = () => {
      searchQuery.value = ''
      filterStatus.value = ''
      currentPage.value = 1
    }

    // Dynamic Statistics
    const uploadedTodayCount = computed(() => tableData.value.length)
    const verifiedCount = computed(() => {
      return tableData.value.filter(v =>
        (v.aiStatus || '').toLowerCase().includes('diverifikasi') ||
        (v.reviewStatus || '').toLowerCase().includes('auto verified') ||
        (v.reviewStatus || '').toLowerCase().includes('konfirmasi')
      ).length
    })
    const manualReviewCount = computed(() => {
      return tableData.value.filter(v =>
        (v.aiStatus || '').toLowerCase().includes('rendah') ||
        (v.reviewStatus || '').toLowerCase().includes('needs review') ||
        (v.reviewStatus || '').toLowerCase().includes('menunggu')
      ).length
    })
    const failedCount = computed(() => {
      return tableData.value.filter(v =>
        (v.aiStatus || '').toLowerCase().includes('gagal') ||
        (v.reviewStatus || '').toLowerCase().includes('rejected') ||
        (v.reviewStatus || '').toLowerCase().includes('ditolak')
      ).length
    })
    const avgConfidence = computed(() => {
      const scoredItems = tableData.value.filter(item => item.score !== '-')
      if (!scoredItems.length) return '-'
      const totalScore = scoredItems.reduce((acc, curr) => {
        const val = parseInt(curr.score) || 0
        return acc + val
      }, 0)
      return (totalScore / scoredItems.length).toFixed(1) + '%'
    })

    const chartData = [
      { label: 'Min 1', success: 85, fail: 15 },
      { label: 'Min 2', success: 92, fail: 8 },
      { label: 'Min 3', success: 78, fail: 22 },
      { label: 'Min 4', success: 95, fail: 5 },
      { label: 'Today', success: 60, fail: 10 }
    ]

    return {
      isNewlyAdded,
      activeDropdown,
      toggleDropdown,
      viewDetail,
      sendMessage,
      deleteVerification,
      searchQuery,
      filterStatus,
      currentPage,
      pageSize,
      totalPages,
      displayedPages,
      filteredData,
      paginatedData,
      prevPage,
      nextPage,
      goToPage,
      resetFilter,
      uploadedTodayCount,
      verifiedCount,
      manualReviewCount,
      failedCount,
      avgConfidence,
      chartData,
      isLoading,
      alertMessage,
      alertType,
      showAlert
    }
  }
})

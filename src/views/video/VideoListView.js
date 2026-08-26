import { defineComponent, ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { useRouter, RouterLink } from 'vue-router'
import videoService from '../../services/video.service'

export default defineComponent({
  name: 'VideoListView',
  components: {
    RouterLink
  },
  setup() {
    const router = useRouter()
    const activeDropdown = ref(null)
    const isLoading = ref(true)

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

    // Default baseline dataset matching relational patient records
    const tableData = ref([
      {
        id: 1,
        initials: 'BP',
        avatarColor: 'bg-teal',
        name: 'Bambang Pamungkas',
        nik: '3201015502940001',
        time: 'Hari ini, 08:45',
        aiStatus: 'Diverifikasi',
        aiStatusColor: 'success-dot',
        score: '98%',
        progressColor: 'bg-success',
        reviewStatus: 'Otomatis-Konfirmasi',
        reviewPillClass: 'pill-gray'
      },
      {
        id: 2,
        initials: 'SM',
        avatarColor: 'bg-orange',
        name: 'Siti Mariam',
        nik: '3201015502940002',
        time: 'Hari ini, 07:12',
        aiStatus: 'Kepercayaan Rendah',
        aiStatusColor: 'danger-dot',
        score: '64%',
        progressColor: 'bg-warning',
        reviewStatus: 'Menunggu Tinjauan',
        reviewPillClass: 'pill-yellow'
      },
      {
        id: 3,
        initials: 'RK',
        avatarColor: 'bg-teal',
        name: 'Rahmat Kurnia',
        nik: '3201015502940003',
        time: 'Hari ini, 06:30',
        aiStatus: 'Diverifikasi',
        aiStatusColor: 'success-dot',
        score: '82%',
        progressColor: 'bg-teal-main',
        reviewStatus: 'Otomatis-Konfirmasi',
        reviewPillClass: 'pill-gray'
      },
      {
        id: 4,
        initials: 'AD',
        avatarColor: 'bg-primary-light',
        name: 'Andi Darmawan',
        nik: '3201015502940004',
        time: 'Kemarin, 18:20',
        aiStatus: 'Diverifikasi',
        aiStatusColor: 'success-dot',
        score: '95%',
        progressColor: 'bg-success',
        reviewStatus: 'Otomatis-Konfirmasi',
        reviewPillClass: 'pill-gray'
      },
      {
        id: 5,
        initials: 'NK',
        avatarColor: 'bg-danger-light',
        name: 'Nita Kusuma',
        nik: '3201015502940005',
        time: 'Kemarin, 16:45',
        aiStatus: 'Gagal',
        aiStatusColor: 'danger-dot',
        score: '32%',
        progressColor: 'bg-danger',
        reviewStatus: 'Ditolak',
        reviewPillClass: 'pill-red'
      },
      {
        id: 6,
        initials: 'AF',
        avatarColor: 'bg-teal',
        name: 'Ahmad Fauzi',
        nik: '3273012304950001',
        time: 'Hari ini, 09:10',
        aiStatus: 'Diverifikasi',
        aiStatusColor: 'success-dot',
        score: '94%',
        progressColor: 'bg-success',
        reviewStatus: 'Otomatis-Konfirmasi',
        reviewPillClass: 'pill-gray'
      },
      {
        id: 7,
        initials: 'DS',
        avatarColor: 'bg-orange',
        name: 'Dewi Sartika',
        nik: '3273014506920002',
        time: 'Hari ini, 08:15',
        aiStatus: 'Kepercayaan Rendah',
        aiStatusColor: 'danger-dot',
        score: '58%',
        progressColor: 'bg-warning',
        reviewStatus: 'Menunggu Tinjauan',
        reviewPillClass: 'pill-yellow'
      },
      {
        id: 8,
        initials: 'HG',
        avatarColor: 'bg-teal',
        name: 'Hendra Gunawan',
        nik: '3273011208880003',
        time: 'Kemarin, 20:30',
        aiStatus: 'Diverifikasi',
        aiStatusColor: 'success-dot',
        score: '88%',
        progressColor: 'bg-teal-main',
        reviewStatus: 'Otomatis-Konfirmasi',
        reviewPillClass: 'pill-gray'
      },
      {
        id: 9,
        initials: 'RS',
        avatarColor: 'bg-danger-light',
        name: 'Ratna Sari',
        nik: '3273016709940004',
        time: 'Kemarin, 19:15',
        aiStatus: 'Gagal',
        aiStatusColor: 'danger-dot',
        score: '28%',
        progressColor: 'bg-danger',
        reviewStatus: 'Ditolak',
        reviewPillClass: 'pill-red'
      },
      {
        id: 10,
        initials: 'BS',
        avatarColor: 'bg-primary-light',
        name: 'Budi Santoso',
        nik: '3273012211900005',
        time: 'Kemarin, 14:20',
        aiStatus: 'Diverifikasi',
        aiStatusColor: 'success-dot',
        score: '91%',
        progressColor: 'bg-success',
        reviewStatus: 'Otomatis-Konfirmasi',
        reviewPillClass: 'pill-gray'
      },
      {
        id: 11,
        initials: 'EP',
        avatarColor: 'bg-teal',
        name: 'Eka Prasetya',
        nik: '3273011503930006',
        time: '2 hari lalu, 08:00',
        aiStatus: 'Diverifikasi',
        aiStatusColor: 'success-dot',
        score: '96%',
        progressColor: 'bg-success',
        reviewStatus: 'Otomatis-Konfirmasi',
        reviewPillClass: 'pill-gray'
      },
      {
        id: 12,
        initials: 'MI',
        avatarColor: 'bg-orange',
        name: 'Maya Indah',
        nik: '3273015407960007',
        time: '2 hari lalu, 07:45',
        aiStatus: 'Kepercayaan Rendah',
        aiStatusColor: 'danger-dot',
        score: '62%',
        progressColor: 'bg-warning',
        reviewStatus: 'Menunggu Tinjauan',
        reviewPillClass: 'pill-yellow'
      }
    ])

    const fallbackPatientList = [
      { full_name: 'Ahmad Fauzi', nik: '3273012304950001' },
      { full_name: 'Dewi Sartika', nik: '3273014506920002' },
      { full_name: 'Bambang Pamungkas', nik: '3201015502940001' },
      { full_name: 'Siti Mariam', nik: '3201015502940002' },
      { full_name: 'Rahmat Kurnia', nik: '3201015502940003' },
      { full_name: 'Andi Darmawan', nik: '3201015502940004' },
      { full_name: 'Nita Kusuma', nik: '3201015502940005' },
      { full_name: 'Hendra Gunawan', nik: '3273011208880003' },
      { full_name: 'Ratna Sari', nik: '3273016709940004' },
      { full_name: 'Budi Santoso', nik: '3273012211900005' },
      { full_name: 'Eka Prasetya', nik: '3273011503930006' },
      { full_name: 'Maya Indah', nik: '3273015407960007' }
    ]

    // Load data from Database via API
    const loadVideos = async () => {
      isLoading.value = true
      try {
        const [videoRes, patientRes] = await Promise.allSettled([
          videoService.getAll(),
          import('../../services/patient.service').then(m => m.default.getAll())
        ])

        const patients = (patientRes.status === 'fulfilled' && patientRes.value?.data && Array.isArray(patientRes.value.data)) ? patientRes.value.data : []
        const patientMap = new Map()
        patients.forEach(p => patientMap.set(p.id, p))

        if (videoRes.status === 'fulfilled' && videoRes.value?.data && Array.isArray(videoRes.value.data) && videoRes.value.data.length > 0) {
          tableData.value = videoRes.value.data.map((item, idx) => {
            const pObj = item.patient || 
                         patientMap.get(item.patient_id) || 
                         patientMap.get(item.medicine_schedule_id) || 
                         (patients.length ? patients[idx % patients.length] : null) || 
                         fallbackPatientList[idx % fallbackPatientList.length]

            const patientName = pObj?.full_name || pObj?.name || fallbackPatientList[idx % fallbackPatientList.length].full_name
            const nik = pObj?.nik || fallbackPatientList[idx % fallbackPatientList.length].nik
            const rawScore = item.ai_confidence ? (item.ai_confidence > 1 ? Math.round(item.ai_confidence) : Math.round(item.ai_confidence * 100)) : (item.overall_score || 0)
            
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

            const dateObj = new Date(item.created_at || item.verification_date || Date.now())
            const timeFormatted = dateObj.toLocaleDateString('id-ID', {
              day: 'numeric',
              month: 'short',
              hour: '2-digit',
              minute: '2-digit'
            })

            return {
              id: item.id,
              initials: patientName.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase(),
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
        }
      } catch (err) {
        console.warn('API video fetch fallback to dataset:', err.message)
      } finally {
        isLoading.value = false
      }
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
        tableData.value = tableData.value.filter(v => v.id !== item.id)
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

          if (statusVal === 'Diverifikasi' || statusVal === 'verified') {
            matchesStatus = itemAiStatus.includes('diverifikasi') || itemReviewStatus.includes('konfirmasi') || itemReviewStatus.includes('otomatis')
          } else if (statusVal === 'Menunggu Tinjauan' || statusVal === 'pending') {
            matchesStatus = itemAiStatus.includes('rendah') || itemReviewStatus.includes('menunggu') || itemReviewStatus.includes('tinjauan')
          } else if (statusVal === 'Gagal' || statusVal === 'rejected') {
            matchesStatus = itemAiStatus.includes('gagal') || itemReviewStatus.includes('ditolak') || itemReviewStatus.includes('gagal')
          } else {
            matchesStatus = itemAiStatus === statusVal.toLowerCase() || itemReviewStatus === statusVal.toLowerCase()
          }
        }

        return matchesSearch && matchesStatus
      })
    })

    // Auto-reset page to 1 on filter or search change
    watch([searchQuery, filterStatus], () => {
      currentPage.value = 1
    })

    // Pagination computations
    const totalPages = computed(() => {
      return Math.ceil(filteredData.value.length / pageSize.value) || 1
    })

    const paginatedData = computed(() => {
      const start = (currentPage.value - 1) * pageSize.value
      return filteredData.value.slice(start, start + pageSize.value)
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
        (v.reviewStatus || '').toLowerCase().includes('konfirmasi')
      ).length
    })
    const manualReviewCount = computed(() => {
      return tableData.value.filter(v => 
        (v.aiStatus || '').toLowerCase().includes('rendah') || 
        (v.reviewStatus || '').toLowerCase().includes('menunggu')
      ).length
    })
    const failedCount = computed(() => {
      return tableData.value.filter(v => 
        (v.aiStatus || '').toLowerCase().includes('gagal') || 
        (v.reviewStatus || '').toLowerCase().includes('ditolak')
      ).length
    })
    const avgConfidence = computed(() => {
      if (!tableData.value.length) return '0%'
      const totalScore = tableData.value.reduce((acc, curr) => {
        const val = parseInt(curr.score) || 0
        return acc + val
      }, 0)
      return (totalScore / tableData.value.length).toFixed(1) + '%'
    })

    const chartData = [
      { label: 'Min 1', success: 85, fail: 15 },
      { label: 'Min 2', success: 92, fail: 8 },
      { label: 'Min 3', success: 78, fail: 22 },
      { label: 'Min 4', success: 95, fail: 5 },
      { label: 'Today', success: 60, fail: 10 }
    ]

    return {
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
      isLoading
    }
  }
})

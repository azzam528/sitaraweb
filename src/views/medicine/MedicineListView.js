import { defineComponent, ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import refillService from '../../services/refill.service'
import medicineService from '../../services/medicine.service'
import medicineScheduleService from '../../services/medicine-schedule.service'

export default defineComponent({
  name: 'MedicineListView',
  setup() {
    const router = useRouter()
    const activeDropdown = ref(null)

    const requests = ref([])
    const medicines = ref([])
    const schedules = ref([])
    const isLoading = ref(true)

    const searchQuery = ref('')
    const filterCategory = ref('')
    const filterStatus = ref('')
    const filterStatusPill = ref('')

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
        const [rRes, mRes, sRes] = await Promise.allSettled([
          refillService.getAll(),
          medicineService.getAll(),
          medicineScheduleService.getAll()
        ])
        if (rRes.status === 'fulfilled') requests.value = rRes.value.data || []
        if (mRes.status === 'fulfilled') medicines.value = mRes.value.data || []
        if (sRes.status === 'fulfilled') schedules.value = sRes.value.data || []
      } catch (error) {
        console.error('Failed to load medicine logistik data:', error)
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

    const distributionHistory = computed(() => {
      return requests.value.filter(r => r.status === 'approved' || r.status === 'rejected').slice(0, 5)
    })

    // Dynamic Stock Level based on real medicines & schedules in DB
    const stocks = computed(() => {
      if (medicines.value.length > 0) {
        return medicines.value.map(m => {
          // Aggregate real schedule data for this medicine
          const assignedSchedules = schedules.value.filter(s => s.medicine_id === m.id)
          const totalInitial = assignedSchedules.reduce((acc, s) => acc + (s.quantity_initial || 0), 0)
          const totalRemaining = assignedSchedules.reduce((acc, s) => acc + (s.quantity_remaining || 0), 0)

          let percentage = 100
          let status = 'Aman'
          let badgeClass = 'badge-safe'
          let color = '#22C55E'
          let subtext = `${m.strength} • ${m.unit}`

          if (totalInitial > 0) {
            percentage = Math.round((totalRemaining / totalInitial) * 100)
            percentage = Math.max(0, Math.min(100, percentage))
            subtext = `${totalRemaining.toLocaleString('id-ID')} / ${totalInitial.toLocaleString('id-ID')} ${m.unit}`

            if (percentage <= 20) {
              status = 'Kritis'
              badgeClass = 'badge-critical'
              color = '#EF4444'
            } else if (percentage <= 50) {
              status = 'Menipis'
              badgeClass = 'badge-thinning'
              color = '#F59E0B'
            } else {
              status = 'Aman'
              badgeClass = 'badge-safe'
              color = '#22C55E'
            }
          } else {
            subtext = `Stok Aktif • Sediaan ${m.strength}`
          }

          return {
            id: m.id,
            name: m.name + (m.code ? ` (${m.code})` : ''),
            status,
            badgeClass,
            percentage,
            color,
            subtext
          }
        })
      }
      return []
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
        alert(`Mengirim notifikasi pengingat stok ke ${pName}`)
      }
    }

    const deleteRequest = async (req) => {
      const pName = req.treatment?.patient?.full_name || 'Pasien'
      if (confirm(`Apakah Anda yakin ingin menghapus permintaan OAT ${pName}?`)) {
        try {
          await refillService.delete(req.id)
          requests.value = requests.value.filter(r => r.id !== req.id)
        } catch (error) {
          console.error('Failed to delete request:', error)
          alert('Gagal menghapus permintaan')
        }
      }
    }

    const formatDate = (dateStr) => {
      if (!dateStr) return '-'
      const d = new Date(dateStr)
      return d.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })
    }

    const formatStatus = (status) => {
      if (status === 'pending') return 'Pending'
      if (status === 'approved') return 'Disetujui'
      if (status === 'rejected') return 'Ditolak'
      return status || '-'
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
      schedules,
      isLoading,
      searchQuery,
      filterCategory,
      filterStatus,
      filterStatusPill,
      activeDropdown,
      toggleDropdown,
      pendingCount,
      approvedCount,
      rejectedCount,
      filteredRequests,
      distributionHistory,
      stocks,
      viewDetail,
      sendNotify,
      deleteRequest,
      formatDate,
      formatStatus,
      getTypeClass,
      getStatusClass
    }
  }
})

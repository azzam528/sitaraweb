import { defineComponent, ref, computed, onMounted } from 'vue'
import treatmentService from '../../services/treatment.service'
import refillService from '../../services/refill.service'
import complaintService from '../../services/complaint.service'

export default defineComponent({
  name: 'ReportView',
  setup() {
    const selectedReportType = ref('treatment')
    const selectedPeriod = ref('all')
    const filterTreatmentStatus = ref('')
    const facilityName = ref('Puskesmas Sukajadi')
    const reportCity = ref('Bandung')
    const currentOfficerName = ref('Ns. Siti Fatimah, S.Kep')

    const isLoading = ref(true)

    // Data State
    const treatments = ref([])
    const refills = ref([])
    const complaints = ref([])

    onMounted(async () => {
      await loadAllData()
      loadUserInfo()
    })

    const loadAllData = async () => {
      isLoading.value = true
      try {
        const [tRes, rRes, cRes] = await Promise.allSettled([
          treatmentService.getAll(),
          refillService.getAll(),
          complaintService.getAll()
        ])

        if (tRes.status === 'fulfilled') treatments.value = tRes.value.data || []
        if (rRes.status === 'fulfilled') refills.value = rRes.value.data || []
        if (cRes.status === 'fulfilled') complaints.value = cRes.value.data || []
      } catch (error) {
        console.error('Failed to load report data:', error)
      } finally {
        isLoading.value = false
      }
    }

    const loadUserInfo = () => {
      try {
        const userStr = localStorage.getItem('sitara_user')
        if (userStr) {
          const u = JSON.parse(userStr)
          if (u.name) currentOfficerName.value = u.name
        }
      } catch (e) { }
    }

    // Period Filter Helper
    const filterByPeriod = (dateStr) => {
      if (selectedPeriod.value === 'all') return true
      if (!dateStr) return false

      const itemDate = new Date(dateStr)
      const now = new Date()

      if (selectedPeriod.value === 'this_month') {
        return itemDate.getMonth() === now.getMonth() && itemDate.getFullYear() === now.getFullYear()
      }
      if (selectedPeriod.value === 'last_3_months') {
        const threeMonthsAgo = new Date()
        threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3)
        return itemDate >= threeMonthsAgo
      }
      if (selectedPeriod.value === 'this_year') {
        return itemDate.getFullYear() === now.getFullYear()
      }
      return true
    }

    // Filtered Lists
    const filteredTreatments = computed(() => {
      return treatments.value.filter(t => {
        const matchStatus = !filterTreatmentStatus.value || t.status === filterTreatmentStatus.value
        const matchPeriod = filterByPeriod(t.start_date || t.created_at)
        return matchStatus && matchPeriod
      })
    })

    const filteredRefills = computed(() => {
      return refills.value.filter(r => filterByPeriod(r.created_at))
    })

    const filteredComplaints = computed(() => {
      return complaints.value.filter(c => filterByPeriod(c.created_at))
    })

    const filteredData = computed(() => {
      if (selectedReportType.value === 'treatment') return filteredTreatments.value
      if (selectedReportType.value === 'refill') return filteredRefills.value
      return filteredComplaints.value
    })

    // KPI Counts
    const treatmentActiveCount = computed(() => treatments.value.filter(t => t.status === 'active').length)
    const treatmentCompletedCount = computed(() => treatments.value.filter(t => t.status === 'completed').length)
    const treatmentDefaultedCount = computed(() => treatments.value.filter(t => t.status === 'defaulted').length)

    const refillPendingCount = computed(() => refills.value.filter(r => r.status === 'pending').length)
    const refillApprovedCount = computed(() => refills.value.filter(r => r.status === 'approved').length)
    const refillRejectedCount = computed(() => refills.value.filter(r => r.status === 'rejected').length)

    const complaintPendingCount = computed(() => complaints.value.filter(c => c.status === 'pending').length)
    const complaintInProgressCount = computed(() => complaints.value.filter(c => c.status === 'in_progress').length)
    const complaintResolvedCount = computed(() => complaints.value.filter(c => c.status === 'resolved').length)

    // Date Helpers
    const currentDateFormatted = computed(() => {
      return new Date().toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      })
    })

    const currentMonthName = computed(() => {
      return new Date().toLocaleDateString('id-ID', { month: 'long', year: 'numeric' })
    })

    const getReportTitle = () => {
      if (selectedReportType.value === 'treatment') return 'REKAPITULASI EVALUASI PENGOBATAN PASIEN TB'
      if (selectedReportType.value === 'refill') return 'REKAPITULASI LOGISTIK PERMINTAAN REFILL OBAT OAT'
      return 'REKAPITULASI KELUHAN KLINIS & EFEK SAMPING OBAT (ESO)'
    }

    const getPeriodLabel = () => {
      if (selectedPeriod.value === 'this_month') return `Bulan ${currentMonthName.value}`
      if (selectedPeriod.value === 'last_3_months') return 'Triwulan Terakhir'
      if (selectedPeriod.value === 'this_year') return 'Tahun 2026'
      return 'Seluruh Periode'
    }

    // Formatters
    const formatDate = (dateStr) => {
      if (!dateStr) return '-'
      const d = new Date(dateStr)
      return d.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })
    }

    const formatPhase = (phase) => {
      if (phase === 'intensive') return 'Intensif'
      if (phase === 'continuation') return 'Lanjutan'
      return phase || '-'
    }

    const formatRegimen = (regimen) => {
      if (regimen === 'category_1') return 'Kategori 1 (FDC)'
      if (regimen === 'category_2') return 'Kategori 2'
      if (regimen === 'mdr') return 'TB-RO (Resistan Obat)'
      return regimen || '-'
    }

    const formatTreatmentStatus = (status) => {
      if (status === 'active') return 'Aktif'
      if (status === 'completed') return 'Selesai (Sembuh)'
      if (status === 'defaulted') return 'Putus Berobat'
      return status || '-'
    }

    const formatRefillStatus = (status) => {
      if (status === 'pending') return 'Menunggu'
      if (status === 'approved') return 'Disetujui'
      if (status === 'rejected') return 'Ditolak'
      return status || '-'
    }

    const formatComplaintStatus = (status) => {
      if (status === 'pending') return 'Menunggu Tanggapan'
      if (status === 'resolved' || status === 'in_progress') return 'Selesai'
      return 'Menunggu Tanggapan'
    }

    // Actions
    const printReport = () => {
      window.print()
    }

    const exportCSV = () => {
      let csvContent = 'data:text/csv;charset=utf-8,'
      let filename = `laporan_${selectedReportType.value}_${Date.now()}.csv`

      if (selectedReportType.value === 'treatment') {
        csvContent += 'No,NIK,Nama Pasien,No RM,Tanggal Mulai,Tanggal Target Selesai,Status\r\n'
        filteredTreatments.value.forEach((t, i) => {
          const row = [
            i + 1,
            `"${t.patient?.nik || ''}"`,
            `"${t.patient?.full_name || ''}"`,
            `"${t.patient?.medical_record_number || ''}"`,
            `"${formatDate(t.start_date)}"`,
            `"${formatDate(t.end_date)}"`,
            `"${formatTreatmentStatus(t.status)}"`
          ]
          csvContent += row.join(',') + '\r\n'
        })
      } else if (selectedReportType.value === 'refill') {
        csvContent += 'No,Nama Pasien,NIK,No RM,Sisa Obat,Tanggal Pengajuan,Status Permintaan\r\n'
        filteredRefills.value.forEach((r, i) => {
          const row = [
            i + 1,
            `"${r.treatment?.patient?.full_name || ''}"`,
            `"${r.treatment?.patient?.nik || ''}"`,
            `"${r.treatment?.patient?.medical_record_number || ''}"`,
            `"${r.remaining_days || 0} Hari"`,
            `"${formatDate(r.request_date)}"`,
            `"${formatRefillStatus(r.status)}"`
          ]
          csvContent += row.join(',') + '\r\n'
        })
      } else {
        csvContent += 'No,Nama Pasien,NIK,Kategori Keluhan,Deskripsi,Waktu Laporan,Tanggapan Medis,Status\r\n'
        filteredComplaints.value.forEach((c, i) => {
          const row = [
            i + 1,
            `"${c.treatment?.patient?.full_name || ''}"`,
            `"${c.treatment?.patient?.nik || ''}"`,
            `"${c.category}"`,
            `"${(c.description || '').replace(/"/g, '""')}"`,
            `"${formatDate(c.created_at)}"`,
            `"${(c.response || '').replace(/"/g, '""')}"`,
            `"${formatComplaintStatus(c.status)}"`
          ]
          csvContent += row.join(',') + '\r\n'
        })
      }

      const encodedUri = encodeURI(csvContent)
      const link = document.createElement('a')
      link.setAttribute('href', encodedUri)
      link.setAttribute('download', filename)
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }

    return {
      selectedReportType,
      selectedPeriod,
      filterTreatmentStatus,
      facilityName,
      reportCity,
      currentOfficerName,
      isLoading,
      treatments,
      refills,
      complaints,
      filteredTreatments,
      filteredRefills,
      filteredComplaints,
      filteredData,
      treatmentActiveCount,
      treatmentCompletedCount,
      treatmentDefaultedCount,
      refillPendingCount,
      refillApprovedCount,
      refillRejectedCount,
      complaintPendingCount,
      complaintInProgressCount,
      complaintResolvedCount,
      currentDateFormatted,
      currentMonthName,
      getReportTitle,
      getPeriodLabel,
      formatDate,
      formatPhase,
      formatRegimen,
      formatTreatmentStatus,
      formatRefillStatus,
      formatComplaintStatus,
      printReport,
      exportCSV
    }
  }
})

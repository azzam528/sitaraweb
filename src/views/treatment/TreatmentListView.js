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
    const filterPhase = ref('')
    const filterStatus = ref('')
    const filterRegimen = ref('')

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

    const fallbackPatientList = [
      { id: 1, full_name: 'Ahmad Fauzi', nik: '3273012304950001', medical_record_number: 'RM-TB-2026-0001' },
      { id: 2, full_name: 'Dewi Sartika', nik: '3273014506920002', medical_record_number: 'RM-TB-2026-0002' },
      { id: 3, full_name: 'Bambang Pamungkas', nik: '3201015502940001', medical_record_number: 'RM-2026-0042' },
      { id: 4, full_name: 'Siti Mariam', nik: '3201015502940002', medical_record_number: 'RM-2026-0089' },
      { id: 5, full_name: 'Rahmat Kurnia', nik: '3201015502940003', medical_record_number: 'RM-2026-0112' },
      { id: 6, full_name: 'Andi Darmawan', nik: '3201015502940004', medical_record_number: 'RM-2026-0150' },
      { id: 7, full_name: 'Nita Kusuma', nik: '3201015502940005', medical_record_number: 'RM-2026-0188' },
      { id: 8, full_name: 'Hendra Gunawan', nik: '3273011208880003', medical_record_number: 'RM-TB-2026-0003' },
      { id: 9, full_name: 'Ratna Sari', nik: '3273016709940004', medical_record_number: 'RM-TB-2026-0004' },
      { id: 10, full_name: 'Budi Santoso', nik: '3273012211900005', medical_record_number: 'RM-TB-2026-0005' },
      { id: 11, full_name: 'Eka Prasetya', nik: '3273011503930006', medical_record_number: 'RM-TB-2026-0006' },
      { id: 12, full_name: 'Maya Indah', nik: '3273015407960007', medical_record_number: 'RM-TB-2026-0007' }
    ]

    // Fetch Treatments from API
    const loadTreatments = async () => {
      isLoading.value = true
      try {
        const [treatmentRes, patientRes] = await Promise.allSettled([
          treatmentService.getAll(),
          import('../../services/patient.service').then(m => m.default.getAll())
        ])

        const patients = (patientRes.status === 'fulfilled' && patientRes.value?.data && Array.isArray(patientRes.value.data)) ? patientRes.value.data : []
        const patientMap = new Map()
        patients.forEach(p => patientMap.set(p.id, p))

        const rawTreatments = (treatmentRes.status === 'fulfilled' && treatmentRes.value?.data) ? treatmentRes.value.data : []
        treatments.value = rawTreatments.map((t, idx) => {
          const p = t.patient || patientMap.get(t.patient_id) || (patients.length ? patients[idx % patients.length] : null) || fallbackPatientList[idx % fallbackPatientList.length]
          return {
            ...t,
            patient: p
          }
        })
      } catch (error) {
        console.error('Failed to load treatments:', error)
        showAlert('Gagal memuat data pengobatan dari server', 'danger')
      } finally {
        isLoading.value = false
      }
    }

    // Computed Statistics
    const activeCount = computed(() => treatments.value.filter(t => t.status === 'active').length)
    const intensiveCount = computed(() => treatments.value.filter(t => t.phase === 'intensive' && t.status === 'active').length)
    const continuationCount = computed(() => treatments.value.filter(t => t.phase === 'continuation' && t.status === 'active').length)
    const completedCount = computed(() => treatments.value.filter(t => t.status === 'completed').length)
    const droppedCount = computed(() => treatments.value.filter(t => t.status === 'dropped').length)

    // Filtered & Paginated Treatments
    const filteredTreatments = computed(() => {
      return treatments.value.filter(t => {
        const query = searchQuery.value.toLowerCase().trim()
        const patientName = t.patient?.full_name?.toLowerCase() || ''
        const nik = t.patient?.nik || ''
        const medRecord = t.patient?.medical_record_number?.toLowerCase() || ''
        const doctor = t.doctor_name?.toLowerCase() || ''

        const matchesSearch = !query || 
          patientName.includes(query) || 
          nik.includes(query) || 
          medRecord.includes(query) || 
          doctor.includes(query)

        const matchesPhase = !filterPhase.value || t.phase === filterPhase.value
        const matchesStatus = !filterStatus.value || t.status === filterStatus.value
        const matchesRegimen = !filterRegimen.value || t.regimen === filterRegimen.value

        return matchesSearch && matchesPhase && matchesStatus && matchesRegimen
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

    const formatPhase = (phase) => {
      if (phase === 'intensive') return 'Fase Intensif'
      if (phase === 'continuation') return 'Fase Lanjutan'
      return phase || '-'
    }

    const formatRegimen = (regimen) => {
      if (regimen === 'category_1') return 'Kategori 1 (2RHZE / 4RH)'
      if (regimen === 'category_2') return 'Kategori 2 (2RHZES / 1RHZE / 5RHE)'
      if (regimen === 'mdr') return 'TB-RO / Resistan Obat'
      return regimen || '-'
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
      const colors = ['teal', 'primary', 'orange', 'green', 'purple']
      return colors[id % colors.length]
    }

    const calculateProgress = (treatment) => {
      if (!treatment.therapy_start_date || !treatment.therapy_end_date) {
        return { percentage: 0, daysPassed: 0, totalDays: 180 }
      }
      const start = new Date(treatment.therapy_start_date).getTime()
      const end = new Date(treatment.therapy_end_date).getTime()
      const now = new Date().getTime()

      const totalDays = Math.max(1, Math.round((end - start) / (1000 * 60 * 60 * 24)))
      const daysPassed = Math.max(0, Math.round((now - start) / (1000 * 60 * 60 * 24)))
      const percentage = Math.min(100, Math.round((daysPassed / totalDays) * 100))

      return {
        percentage,
        daysPassed: Math.min(daysPassed, totalDays),
        totalDays
      }
    }

    const getProgressColor = (treatment) => {
      if (treatment.status === 'dropped' || treatment.status === 'defaulted') return '#DC2626'
      if (treatment.status === 'completed') return '#16A34A'
      const pct = calculateProgress(treatment).percentage
      if (pct >= 100) return '#16A34A' // 100% Hijau Sempurna
      if (pct >= 75) return '#10B981'  // 75%-99% Hijau Emerald
      if (pct >= 50) return '#0D9488'  // 50%-74% Tosca / Hijau Kebiruan
      if (pct >= 25) return '#0284C7'  // 25%-49% Biru
      return '#38BDF8'                 // 0%-24% Biru Muda (Awal)
    }

    const getProgressColorClass = (treatment) => {
      if (treatment.status === 'completed') return 'bg-success'
      if (treatment.status === 'dropped' || treatment.status === 'defaulted') return 'bg-danger'
      const pct = calculateProgress(treatment).percentage
      if (pct >= 80) return 'bg-success'
      if (pct >= 40) return 'bg-primary'
      return 'bg-teal'
    }

    // Navigation & Interaction
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
      const msg = encodeURIComponent(`Halo Bpk/Ibu ${treatment.patient?.full_name}, kami dari tim medis SITARA mengingatkan terkait kelanjutan pengobatan TB Anda (${formatPhase(treatment.phase)}). Mohon tetap rutin minum obat tepat waktu.`)
      window.open(`https://wa.me/${cleanPhone}?text=${msg}`, '_blank')
    }

    // Modal Update Status
    const showStatusModal = ref(false)
    const selectedTreatment = ref(null)
    const statusForm = ref({
      status: 'active',
      phase: 'intensive',
      doctor_note: ''
    })

    const openStatusModal = (treatment) => {
      selectedTreatment.value = treatment
      statusForm.value = {
        status: treatment.status || 'active',
        phase: treatment.phase || 'intensive',
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
          phase: statusForm.value.phase,
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

    return {
      treatments,
      isLoading,
      isSubmitting,
      alertMessage,
      alertType,
      showAlert,
      searchQuery,
      filterPhase,
      filterStatus,
      filterRegimen,
      currentPage,
      pageSize,
      activeDropdown,
      toggleDropdown,
      activeCount,
      intensiveCount,
      continuationCount,
      completedCount,
      droppedCount,
      filteredTreatments,
      totalPages,
      paginatedTreatments,
      formatStatus,
      formatPhase,
      formatRegimen,
      formatDate,
      getInitials,
      getAvatarColor,
      calculateProgress,
      getProgressColor,
      getProgressColorClass,
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

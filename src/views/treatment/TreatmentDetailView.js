import { defineComponent, ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import treatmentService from '../../services/treatment.service'
import medicineScheduleService from '../../services/medicine-schedule.service'
import scheduleService from '../../services/schedule.service'
import medicineService from '../../services/medicine.service'
import DetailHeader from '@/components/common/DetailHeader.vue'

export default defineComponent({
  name: 'TreatmentDetailView',
  components: {
    DetailHeader
  },
  setup() {
    const route = useRoute()
    const router = useRouter()

    const treatment = ref(null)
    const isLoading = ref(true)
    const isSubmitting = ref(false)

    // Tabs: 'treatment' | 'medicines' | 'controls'
    const activeTab = ref(route.query.tab || 'treatment')

    const switchTab = (tab) => {
      activeTab.value = tab
      router.replace({ query: { ...route.query, tab } })
    }

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

    // ==========================================
    // MEDICINE SCHEDULES STATE
    // ==========================================
    const medicineSchedules = ref([])
    const medicinesList = ref([])
    const loadingMedicines = ref(false)
    const submittingMedicine = ref(false)
    const showMedicineModal = ref(false)
    const isEditingMedicine = ref(false)
    const editingMedicineId = ref(null)
    const medicineForm = ref({
      medicine_id: '',
      dosage: '',
      drink_time: '08:00',
      quantity_initial: 30,
      quantity_remaining: 30
    })

    // ==========================================
    // CONTROL SCHEDULES STATE
    // ==========================================
    const controlSchedules = ref([])
    const loadingControls = ref(false)
    const submittingControl = ref(false)
    const showControlModal = ref(false)
    const isEditingControl = ref(false)
    const editingControlId = ref(null)
    const controlForm = ref({
      control_date: '',
      control_time: '09:00',
      doctor_note: '',
      status: 'pending'
    })

    // ==========================================
    // DATA FETCHERS
    // ==========================================
    const loadTreatmentDetail = async () => {
      isLoading.value = true
      try {
        const id = route.params.id
        const response = await treatmentService.getById(id)
        if (response && response.data) {
          treatment.value = response.data
        }
      } catch (error) {
        console.error('Failed to load treatment detail:', error)
        showAlert('Gagal memuat rincian pengobatan', 'danger')
      } finally {
        isLoading.value = false
      }
    }

    const loadMedicinesList = async () => {
      try {
        const response = await medicineService.getAll()
        medicinesList.value = response.data || []
      } catch (error) {
        console.warn('Failed to load medicines master list:', error)
      }
    }

    const loadMedicineSchedules = async () => {
      if (!treatment.value?.id) return
      loadingMedicines.value = true
      try {
        const response = await medicineScheduleService.getAll()
        const all = response.data || []
        medicineSchedules.value = all.filter(
          s => Number(s.treatment_id) === Number(treatment.value.id)
        )
      } catch (error) {
        console.error('Failed to load medicine schedules:', error)
      } finally {
        loadingMedicines.value = false
      }
    }

    const loadControlSchedules = async () => {
      if (!treatment.value?.id) return
      loadingControls.value = true
      try {
        const response = await scheduleService.getAll()
        const all = response.data || []
        controlSchedules.value = all.filter(
          s => Number(s.treatment_id) === Number(treatment.value.id)
        )
      } catch (error) {
        console.error('Failed to load control schedules:', error)
      } finally {
        loadingControls.value = false
      }
    }

    // ==========================================
    // MEDICINE SCHEDULE ACTIONS
    // ==========================================
    const openAddMedicineModal = () => {
      isEditingMedicine.value = false
      editingMedicineId.value = null
      medicineForm.value = {
        medicine_id: medicinesList.value[0]?.id || '',
        dosage: '1 tablet',
        drink_time: '08:00',
        quantity_initial: 30,
        quantity_remaining: 30
      }
      showMedicineModal.value = true
    }

    const openEditMedicineModal = (schedule) => {
      isEditingMedicine.value = true
      editingMedicineId.value = schedule.id
      medicineForm.value = {
        medicine_id: schedule.medicine_id,
        dosage: schedule.dosage || '',
        drink_time: schedule.drink_time ? schedule.drink_time.substring(0, 5) : '08:00',
        quantity_initial: schedule.quantity_initial,
        quantity_remaining: schedule.quantity_remaining
      }
      showMedicineModal.value = true
    }

    const submitMedicineSchedule = async () => {
      if (!medicineForm.value.medicine_id) {
        showAlert('Silakan pilih obat terlebih dahulu', 'warning')
        return
      }
      if (!medicineForm.value.dosage) {
        showAlert('Dosis obat wajib diisi', 'warning')
        return
      }

      submittingMedicine.value = true
      try {
        let formattedTime = medicineForm.value.drink_time || '08:00'
        if (formattedTime.length === 5) {
          formattedTime += ':00'
        }

        if (isEditingMedicine.value) {
          await medicineScheduleService.update(editingMedicineId.value, {
            dosage: medicineForm.value.dosage,
            quantity_initial: Number(medicineForm.value.quantity_initial),
            quantity_remaining: Number(medicineForm.value.quantity_remaining),
            drink_time: formattedTime
          })
          showAlert('Jadwal obat berhasil diperbarui!')
        } else {
          await medicineScheduleService.create({
            treatment_id: Number(treatment.value.id),
            medicine_id: Number(medicineForm.value.medicine_id),
            dosage: medicineForm.value.dosage,
            quantity_initial: Number(medicineForm.value.quantity_initial),
            quantity_remaining: Number(medicineForm.value.quantity_remaining),
            drink_time: formattedTime
          })
          showAlert('Jadwal obat berhasil ditambahkan!')
        }

        showMedicineModal.value = false
        await loadMedicineSchedules()
      } catch (error) {
        console.error('Failed to save medicine schedule:', error)
        showAlert(
          error.response?.data?.detail || 'Gagal menyimpan jadwal obat',
          'danger'
        )
      } finally {
        submittingMedicine.value = false
      }
    }

    const confirmDeleteMedicineSchedule = async (schedule) => {
      const medName = getMedicineName(schedule.medicine_id)
      if (confirm(`Apakah Anda yakin ingin menghapus jadwal obat "${medName}"?`)) {
        try {
          await medicineScheduleService.delete(schedule.id)
          showAlert('Jadwal obat berhasil dihapus!')
          await loadMedicineSchedules()
        } catch (error) {
          console.error('Failed to delete medicine schedule:', error)
          showAlert(
            error.response?.data?.detail || 'Gagal menghapus jadwal obat',
            'danger'
          )
        }
      }
    }

    const getMedicineName = (medId) => {
      const found = medicinesList.value.find(m => m.id === medId)
      if (found) {
        return found.name + (found.strength ? ` (${found.strength})` : '')
      }
      return 'Obat #' + medId
    }

    // ==========================================
    // CONTROL SCHEDULE ACTIONS
    // ==========================================
    const openAddControlModal = () => {
      isEditingControl.value = false
      editingControlId.value = null
      
      const tomorrow = new Date()
      tomorrow.setDate(tomorrow.getDate() + 7)
      const defaultDateStr = tomorrow.toISOString().split('T')[0]

      controlForm.value = {
        control_date: defaultDateStr,
        control_time: '09:00',
        doctor_note: '',
        status: 'pending'
      }
      showControlModal.value = true
    }

    const openEditControlModal = (schedule) => {
      isEditingControl.value = true
      editingControlId.value = schedule.id
      controlForm.value = {
        control_date: schedule.control_date,
        control_time: schedule.control_time ? schedule.control_time.substring(0, 5) : '09:00',
        doctor_note: schedule.doctor_note || '',
        status: schedule.status || 'pending'
      }
      showControlModal.value = true
    }

    const submitControlSchedule = async () => {
      if (!controlForm.value.control_date) {
        showAlert('Tanggal kontrol wajib diisi', 'warning')
        return
      }

      submittingControl.value = true
      try {
        let formattedTime = controlForm.value.control_time || '09:00'
        if (formattedTime.length === 5) {
          formattedTime += ':00'
        }

        if (isEditingControl.value) {
          await scheduleService.update(editingControlId.value, {
            control_date: controlForm.value.control_date,
            control_time: formattedTime,
            doctor_note: controlForm.value.doctor_note || null,
            status: controlForm.value.status
          })
          showAlert('Jadwal kontrol berhasil diperbarui!')
        } else {
          await scheduleService.create({
            treatment_id: Number(treatment.value.id),
            control_date: controlForm.value.control_date,
            control_time: formattedTime,
            doctor_note: controlForm.value.doctor_note || null
          })
          showAlert('Jadwal kontrol berhasil ditambahkan!')
        }

        showControlModal.value = false
        await loadControlSchedules()
      } catch (error) {
        console.error('Failed to save control schedule:', error)
        showAlert(
          error.response?.data?.detail || 'Gagal menyimpan jadwal kontrol',
          'danger'
        )
      } finally {
        submittingControl.value = false
      }
    }

    const confirmDeleteControlSchedule = async (schedule) => {
      if (confirm(`Apakah Anda yakin ingin menghapus jadwal kontrol tanggal ${formatDate(schedule.control_date)}?`)) {
        try {
          await scheduleService.delete(schedule.id)
          showAlert('Jadwal kontrol berhasil dihapus!')
          await loadControlSchedules()
        } catch (error) {
          console.error('Failed to delete control schedule:', error)
          showAlert(
            error.response?.data?.detail || 'Gagal menghapus jadwal kontrol',
            'danger'
          )
        }
      }
    }

    // ==========================================
    // TREATMENT STATUS MODAL
    // ==========================================
    const showStatusModal = ref(false)
    const statusForm = ref({
      status: 'active',
      doctor_note: ''
    })

    const openStatusModal = () => {
      if (!treatment.value) return
      statusForm.value = {
        status: treatment.value.status || 'active',
        doctor_note: treatment.value.doctor_note || ''
      }
      showStatusModal.value = true
    }

    const submitUpdateStatus = async () => {
      if (!treatment.value) return
      isSubmitting.value = true
      try {
        await treatmentService.update(treatment.value.id, {
          diagnosis_date: treatment.value.diagnosis_date,
          therapy_start_date: treatment.value.therapy_start_date,
          therapy_end_date: treatment.value.therapy_end_date,
          phase: treatment.value.phase,
          regimen: treatment.value.regimen,
          doctor_name: treatment.value.doctor_name,
          status: statusForm.value.status,
          doctor_note: statusForm.value.doctor_note || null
        })

        showAlert('Status pengobatan berhasil diperbarui!')
        showStatusModal.value = false
        await loadTreatmentDetail()
      } catch (error) {
        console.error('Failed to update treatment:', error)
        showAlert(
          error.response?.data?.detail || 'Gagal memperbarui status pengobatan',
          'danger'
        )
      } finally {
        isSubmitting.value = false
      }
    }

    // ==========================================
    // PROGRESS & HELPERS
    // ==========================================
    const progressData = computed(() => {
      if (!treatment.value?.therapy_start_date || !treatment.value?.therapy_end_date) {
        return { daysPassed: 0, totalDays: 180, percentage: 0 }
      }

      const start = new Date(treatment.value.therapy_start_date)
      const end = new Date(treatment.value.therapy_end_date)
      const now = new Date()

      const totalDays = Math.max(1, Math.round((end - start) / (1000 * 60 * 60 * 24)))
      const daysPassed = Math.max(0, Math.min(totalDays, Math.round((now - start) / (1000 * 60 * 60 * 24))))
      const percentage = Math.min(100, Math.round((daysPassed / totalDays) * 100))

      return { daysPassed, totalDays, percentage }
    })

    const getProgressColor = (t) => {
      if (t?.status === 'dropped' || t?.status === 'defaulted') return '#DC2626'
      if (t?.status === 'completed') return '#16A34A'
      const pct = progressData.value?.percentage || 0
      if (pct >= 100) return '#16A34A'
      if (pct >= 75) return '#10B981'
      if (pct >= 50) return '#0D9488'
      if (pct >= 25) return '#0284C7'
      return '#38BDF8'
    }

    const getProgressColorClass = (t) => {
      if (t?.status === 'completed') return 'bg-success'
      if (t?.status === 'dropped') return 'bg-danger'
      return 'bg-primary'
    }

    const formatPhase = (phase) => {
      if (phase === 'intensive') return 'Fase Intensif (2 Bulan)'
      if (phase === 'continuation') return 'Fase Lanjutan (4 Bulan)'
      return phase || '-'
    }

    const formatRegimen = (regimen) => {
      if (regimen === 'category_1') return 'Kategori 1 (2HRZE / 4H3R3)'
      if (regimen === 'category_2') return 'Kategori 2 (2HRZES / 1HRZE / 5H3R3E3)'
      if (regimen === 'mdr') return 'TB-RO (MDR)'
      return regimen || '-'
    }

    const formatStatus = (status) => {
      if (status === 'active') return 'Aktif'
      if (status === 'completed') return 'Selesai'
      if (status === 'dropped') return 'Putus Obat'
      return status || '-'
    }

    const formatControlStatus = (status) => {
      if (status === 'pending') return 'Terjadwal'
      if (status === 'completed') return 'Selesai'
      if (status === 'missed') return 'Terlewat'
      if (status === 'cancelled') return 'Dibatalkan'
      return status || '-'
    }

    const getControlBadgeClass = (status) => {
      if (status === 'completed') return 'status-completed'
      if (status === 'pending') return 'status-active'
      if (status === 'missed') return 'status-dropped'
      if (status === 'cancelled') return 'status-dropped'
      return 'status-active'
    }

    const formatDate = (dateStr) => {
      if (!dateStr) return '-'
      const d = new Date(dateStr)
      return d.toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      })
    }

    const formatTime = (timeStr) => {
      if (!timeStr) return '-'
      return timeStr.substring(0, 5) + ' WIB'
    }

    const getInitials = (name) => {
      if (!name) return 'TB'
      return name
        .split(' ')
        .map(n => n[0])
        .slice(0, 2)
        .join('')
        .toUpperCase()
    }

    const goBack = () => {
      router.push('/dashboard/treatments')
    }

    const sendWhatsApp = (phone, recipientName, roleLabel) => {
      if (!phone) {
        showAlert(`Nomor telepon ${roleLabel} tidak tersedia`, 'warning')
        return
      }
      const cleanPhone = phone.replace(/^0/, '62').replace(/\D/g, '')
      const msg = encodeURIComponent(
        `Halo Bpk/Ibu ${recipientName || ''} (${roleLabel}), kami dari tim SITARA ingin menginformasikan perkembangan pengobatan TB pasien ${treatment.value?.patient?.full_name || ''}. Mohon pastikan kepatuhan minum obat tetap terjaga. Terima kasih!`
      )
      window.open(`https://wa.me/${cleanPhone}?text=${msg}`, '_blank')
    }

    const confirmDelete = async () => {
      if (!treatment.value) return
      const name =
        treatment.value.patient?.full_name ||
        'Pasien #' + treatment.value.patient_id
      if (
        confirm(
          `Apakah Anda yakin ingin menghapus rekam pengobatan untuk ${name}?`
        )
      ) {
        try {
          await treatmentService.delete(treatment.value.id)
          alert('Rekam pengobatan berhasil dihapus!')
          router.push('/dashboard/treatments')
        } catch (error) {
          console.error('Failed to delete treatment:', error)
          showAlert('Gagal menghapus rekam pengobatan', 'danger')
        }
      }
    }

    onMounted(async () => {
      await loadTreatmentDetail()
      await loadMedicinesList()
      await loadMedicineSchedules()
      await loadControlSchedules()
    })

    return {
      treatment,
      isLoading,
      isSubmitting,
      activeTab,
      switchTab,
      alertMessage,
      alertType,
      showAlert,
      progressData,
      getProgressColor,
      getProgressColorClass,
      formatPhase,
      formatRegimen,
      formatStatus,
      formatControlStatus,
      getControlBadgeClass,
      formatDate,
      formatTime,
      getInitials,
      goBack,
      sendWhatsApp,
      showStatusModal,
      statusForm,
      openStatusModal,
      submitUpdateStatus,
      confirmDelete,

      // Medicine Schedules
      medicineSchedules,
      medicinesList,
      loadingMedicines,
      submittingMedicine,
      showMedicineModal,
      isEditingMedicine,
      medicineForm,
      loadMedicineSchedules,
      openAddMedicineModal,
      openEditMedicineModal,
      submitMedicineSchedule,
      confirmDeleteMedicineSchedule,
      getMedicineName,

      // Control Schedules
      controlSchedules,
      loadingControls,
      submittingControl,
      showControlModal,
      isEditingControl,
      controlForm,
      loadControlSchedules,
      openAddControlModal,
      openEditControlModal,
      submitControlSchedule,
      confirmDeleteControlSchedule
    }
  }
})

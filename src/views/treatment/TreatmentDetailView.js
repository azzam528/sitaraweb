import { defineComponent, ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import treatmentService from '../../services/treatment.service'
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

    onMounted(() => {
      loadTreatmentDetail()
    })

    const loadTreatmentDetail = async () => {
      isLoading.value = true
      try {
        const id = route.params.id
        const response = await treatmentService.getById(id)
        treatment.value = response.data
      } catch (error) {
        console.error('Failed to load treatment detail:', error)
        showAlert('Gagal memuat rincian pengobatan', 'danger')
      } finally {
        isLoading.value = false
      }
    }

    // Progress calculation
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
      if (pct >= 100) return '#16A34A' // 100% Hijau Sempurna
      if (pct >= 75) return '#10B981'  // 75%-99% Hijau Emerald
      if (pct >= 50) return '#0D9488'  // 50%-74% Tosca / Hijau Kebiruan
      if (pct >= 25) return '#0284C7'  // 25%-49% Biru
      return '#38BDF8'                 // 0%-24% Biru Muda (Awal)
    }

    const getProgressColorClass = (t) => {
      if (t?.status === 'completed') return 'bg-success'
      if (t?.status === 'dropped') return 'bg-danger'
      return 'bg-primary'
    }

    // Formatting helpers
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

    const formatDate = (dateStr) => {
      if (!dateStr) return '-'
      const d = new Date(dateStr)
      return d.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
    }

    const getInitials = (name) => {
      if (!name) return 'TB'
      return name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase()
    }

    const goBack = () => {
      router.push('/dashboard/treatments')
    }

    // WhatsApp Helper
    const sendWhatsApp = (phone, recipientName, roleLabel) => {
      if (!phone) {
        showAlert(`Nomor telepon ${roleLabel} tidak tersedia`, 'warning')
        return
      }
      const cleanPhone = phone.replace(/^0/, '62').replace(/\D/g, '')
      const msg = encodeURIComponent(`Halo Bpk/Ibu ${recipientName || ''} (${roleLabel}), kami dari tim SITARA ingin menginformasikan perkembangan pengobatan TB pasien ${treatment.value?.patient?.full_name || ''}. Mohon pastikan kepatuhan minum obat tetap terjaga. Terima kasih!`)
      window.open(`https://wa.me/${cleanPhone}?text=${msg}`, '_blank')
    }

    // Modal Update Status & Phase
    const showStatusModal = ref(false)
    const statusForm = ref({
      status: 'active',
      phase: 'intensive',
      regimen: 'category_1',
      doctor_note: ''
    })

    const openStatusModal = () => {
      if (!treatment.value) return
      statusForm.value = {
        status: treatment.value.status || 'active',
        phase: treatment.value.phase || 'intensive',
        regimen: treatment.value.regimen || 'category_1',
        doctor_note: treatment.value.doctor_note || ''
      }
      showStatusModal.value = true
    }

    const submitUpdateStatus = async () => {
      if (!treatment.value) return
      isSubmitting.value = true
      try {
        await treatmentService.update(treatment.value.id, {
          status: statusForm.value.status,
          phase: statusForm.value.phase,
          regimen: statusForm.value.regimen,
          doctor_note: statusForm.value.doctor_note || null
        })

        showAlert('Status dan fase terapi berhasil diperbarui!')
        showStatusModal.value = false
        await loadTreatmentDetail()
      } catch (error) {
        console.error('Failed to update treatment:', error)
        showAlert('Gagal memperbarui status pengobatan', 'danger')
      } finally {
        isSubmitting.value = false
      }
    }

    // Delete
    const confirmDelete = async () => {
      if (!treatment.value) return
      const name = treatment.value.patient?.full_name || 'Pasien #' + treatment.value.patient_id
      if (confirm(`Apakah Anda yakin ingin menghapus rekam pengobatan untuk ${name}?`)) {
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

    return {
      treatment,
      isLoading,
      isSubmitting,
      alertMessage,
      alertType,
      showAlert,
      progressData,
      getProgressColor,
      getProgressColorClass,
      formatPhase,
      formatRegimen,
      formatStatus,
      formatDate,
      getInitials,
      goBack,
      sendWhatsApp,
      showStatusModal,
      statusForm,
      openStatusModal,
      submitUpdateStatus,
      confirmDelete
    }
  }
})

import { defineComponent, ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import complaintService from '../../services/complaint.service'

export default defineComponent({
  name: 'ComplaintDetailView',
  setup() {
    const route = useRoute()
    const router = useRouter()

    const complaint = ref(null)
    const isLoading = ref(true)
    const isSubmitting = ref(false)

    const alertMessage = ref('')
    const alertType = ref('success')

    const showAlert = (msg, type = 'success') => {
      alertMessage.value = msg
      alertType.value = type
      setTimeout(() => {
        alertMessage.value = ''
      }, 4000)
    }

    const responseForm = ref({
      status: 'in_progress',
      response: ''
    })

    onMounted(() => {
      loadComplaintDetail()
    })

    const loadComplaintDetail = async () => {
      isLoading.value = true
      try {
        const id = route.params.id
        const res = await complaintService.getById(id)
        complaint.value = res.data
        responseForm.value = {
          status: res.data.status || 'in_progress',
          response: res.data.response || ''
        }
      } catch (error) {
        console.error('Failed to load complaint detail:', error)
        showAlert('Gagal memuat rincian keluhan', 'danger')
      } finally {
        isLoading.value = false
      }
    }

    const submitUpdateStatus = async () => {
      if (!complaint.value) return
      isSubmitting.value = true
      try {
        await complaintService.update(complaint.value.id, {
          status: responseForm.value.status,
          response: responseForm.value.response || null
        })
        showAlert('Tanggapan dan status penanganan keluhan berhasil diperbarui!')
        await loadComplaintDetail()
      } catch (error) {
        console.error('Failed to update complaint:', error)
        showAlert('Gagal memperbarui status keluhan', 'danger')
      } finally {
        isSubmitting.value = false
      }
    }

    const confirmDelete = async () => {
      if (!complaint.value) return
      if (confirm(`Apakah Anda yakin ingin menghapus laporan keluhan "${complaint.value.category}" ini?`)) {
        try {
          await complaintService.delete(complaint.value.id)
          alert('Keluhan berhasil dihapus!')
          router.push('/dashboard/complaints')
        } catch (error) {
          console.error('Failed to delete complaint:', error)
          showAlert('Gagal menghapus laporan keluhan', 'danger')
        }
      }
    }

    const sendWhatsApp = (phone, recipientName, roleLabel) => {
      if (!phone) {
        showAlert(`Nomor telepon ${roleLabel} tidak tersedia`, 'warning')
        return
      }
      const cleanPhone = phone.replace(/^0/, '62').replace(/\D/g, '')
      const msg = encodeURIComponent(`Halo Bpk/Ibu ${recipientName || ''} (${roleLabel}), terkait keluhan "${complaint.value?.category}" yang dilaporkan: ${responseForm.value.response || 'Tim kami sedang memproses dan menyiapkan rekomendasi.'}`)
      window.open(`https://wa.me/${cleanPhone}?text=${msg}`, '_blank')
    }

    // Helpers
    const formatStatus = (status) => {
      if (status === 'pending') return 'Menunggu Respon'
      if (status === 'in_progress') return 'Sedang Diproses'
      if (status === 'resolved') return 'Selesai'
      return status || '-'
    }

    const formatPhase = (phase) => {
      if (phase === 'intensive') return 'Fase Intensif'
      if (phase === 'continuation') return 'Fase Lanjutan'
      return phase || '-'
    }

    const formatRegimen = (regimen) => {
      if (regimen === 'category_1') return 'Kategori 1'
      if (regimen === 'category_2') return 'Kategori 2'
      if (regimen === 'mdr') return 'TB-RO'
      return regimen || '-'
    }

    const formatDate = (dateStr) => {
      if (!dateStr) return '-'
      const d = new Date(dateStr)
      return d.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
    }

    const formatTime = (dateStr) => {
      if (!dateStr) return '-'
      const d = new Date(dateStr)
      return d.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
    }

    const getInitials = (name) => {
      if (!name) return 'TB'
      return name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase()
    }

    const formatCategory = (cat) => {
      const map = {
        nausea: 'Mual / Muntah',
        rash: 'Gatal / Ruam Kulit',
        joint_pain: 'Nyeri Sendi',
        vision: 'Gangguan Penglihatan',
        urine_color: 'Warna Urin Merah',
        hearing: 'Gangguan Pendengaran',
        other: 'Keluhan Lainnya'
      }
      return map[cat] || cat || 'Efek Samping Obat'
    }

    const formatSeverity = (sev) => {
      const map = {
        mild: 'Ringan (Mild)',
        moderate: 'Sedang (Moderate)',
        severe: 'Berat (Severe)'
      }
      return map[sev] || sev || 'Ringan'
    }

    const goBack = () => {
      router.push('/dashboard/complaints')
    }

    return {
      complaint,
      isLoading,
      isSubmitting,
      alertMessage,
      alertType,
      showAlert,
      responseForm,
      submitUpdateStatus,
      confirmDelete,
      sendWhatsApp,
      formatStatus,
      formatPhase,
      formatRegimen,
      formatCategory,
      formatSeverity,
      formatDate,
      formatTime,
      getInitials,
      goBack
    }
  }
})


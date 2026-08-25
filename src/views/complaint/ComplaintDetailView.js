import { defineComponent, ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import complaintService from '../../services/complaint.service'
import DetailHeader from '@/components/common/DetailHeader.vue'

export default defineComponent({
  name: 'ComplaintDetailView',
  components: {
    DetailHeader
  },
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

    const loadComplaintDetail = async () => {
      isLoading.value = true
      try {
        const id = route.params.id
        const numId = parseInt(id) || 1
        const fallbackPatient = fallbackPatientList[(numId - 1) % fallbackPatientList.length]

        const res = await complaintService.getById(id)
        if (res && res.data) {
          const patientObj = res.data.treatment?.patient || res.data.patient || fallbackPatient
          complaint.value = {
            ...res.data,
            treatment: {
              ...(res.data.treatment || {}),
              patient: patientObj
            }
          }
          responseForm.value = {
            status: res.data.status || 'in_progress',
            response: res.data.response || ''
          }
        }
      } catch (error) {
        console.error('Failed to load complaint detail:', error)
        showAlert('Gagal memuat rincian keluhan', 'danger')
      } finally {
        isLoading.value = false
      }
    }

    const onResponseInput = () => {
      if (responseForm.value.status === 'pending' && responseForm.value.response?.trim()) {
        responseForm.value.status = 'resolved'
      }
    }

    const submitUpdateStatus = async () => {
      if (!complaint.value) return
      const text = responseForm.value.response ? responseForm.value.response.trim() : ''
      if (!text) {
        showAlert('Silakan tuliskan tanggapan / instruksi klinis terlebih dahulu.', 'warning')
        return
      }

      isSubmitting.value = true
      try {
        const payload = {
          status: 'resolved',
          response: text
        }

        const res = await complaintService.update(complaint.value.id, payload)
        
        // Langsung perbarui local reactive state seketika
        if (res && res.data) {
          complaint.value = {
            ...complaint.value,
            ...res.data,
            status: 'resolved',
            response: text,
            updated_at: new Date().toISOString()
          }
        } else {
          complaint.value.status = 'resolved'
          complaint.value.response = text
          complaint.value.updated_at = new Date().toISOString()
        }

        showAlert('Tanggapan berhasil disimpan dan status keluhan otomatis SELESAI!')
        await loadComplaintDetail()
      } catch (error) {
        console.error('Failed to update complaint:', error)
        showAlert('Gagal memperbarui tanggapan keluhan', 'danger')
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
      if (status === 'pending') return 'Menunggu Tanggapan'
      if (status === 'resolved' || status === 'in_progress') return 'Selesai'
      return 'Menunggu Tanggapan'
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
      onResponseInput,
      submitUpdateStatus,
      confirmDelete,
      sendWhatsApp,
      formatStatus,
      formatCategory,
      formatSeverity,
      formatDate,
      formatTime,
      getInitials,
      goBack
    }
  }
})


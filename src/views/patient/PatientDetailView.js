import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import patientService from '@/services/patient.service'

export function usePatientDetailView() {
  const route = useRoute()

  const patient = ref(null)
  const treatment = ref(null)
  const nextControl = ref(null)
  const refills = ref([])

  const loading = ref(false)
  const error = ref(null)

  const patientId = route.params.id

  const fetchPatientDetail = async () => {
    loading.value = true
    error.value = null

    try {
      const response = await patientService.getDetail(patientId)
      const data = response.data || {}

      patient.value = data.patient || null
      treatment.value = data.treatment || null
      nextControl.value = data.next_control || null
      refills.value = Array.isArray(data.refills) ? data.refills : []
    } catch (err) {
      console.warn('Gagal mengambil detail pasien, mencoba getById fallback:', err)
      try {
        const fallbackRes = await patientService.getById(patientId)
        patient.value = fallbackRes.data || null
      } catch (fErr) {
        error.value = err.response?.data?.detail || 'Gagal mengambil data pasien.'
      }
    } finally {
      loading.value = false
    }
  }

  const formatDate = (dateValue) => {
    if (!dateValue) return '-'
    const date = new Date(dateValue)
    if (Number.isNaN(date.getTime())) return String(dateValue)
    return new Intl.DateTimeFormat('id-ID', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    }).format(date)
  }

  const formatDateTime = (dateValue) => {
    if (!dateValue) return '-'
    const date = new Date(dateValue)
    if (Number.isNaN(date.getTime())) return '-'
    return new Intl.DateTimeFormat('id-ID', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date)
  }

  const calculateAge = (birthDate) => {
    if (!birthDate) return '-'
    const birth = new Date(birthDate)
    if (Number.isNaN(birth.getTime())) return '-'
    const today = new Date()
    let age = today.getFullYear() - birth.getFullYear()
    const monthDiff = today.getMonth() - birth.getMonth()
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--
    }
    return age > 0 ? age : 0
  }

  const formatGender = (gender) => {
    if (!gender) return '-'
    const g = String(gender).toLowerCase()
    return g === 'female' || g === 'p' || g === 'perempuan' ? 'Perempuan' : 'Laki-laki'
  }

  const formatStatus = (status) => {
    if (!status) return '-'
    const statusMap = {
      active: 'Aktif Pengobatan',
      completed: 'Selesai',
      dropped: 'Putus Berobat'
    }
    return statusMap[status] || status
  }

  const formatRefillStatus = (status) => {
    if (!status) return '-'
    const statusMap = {
      pending: 'Menunggu',
      approved: 'Disetujui',
      rejected: 'Ditolak'
    }
    return statusMap[status] || status
  }

  const getRefillBadgeClass = (status) => {
    if (status === 'approved') return 'badge-success'
    if (status === 'rejected') return 'badge-danger'
    return 'badge-warning'
  }

  const getInitials = (name) => {
    if (!name) return '?'
    const parts = name.trim().split(' ')
    if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase()
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
  }

  const contactPatient = (phone) => {
    if (!phone) return
    const cleanPhone = phone.replace(/[^0-9]/g, '')
    const formattedPhone = cleanPhone.startsWith('0') ? '62' + cleanPhone.substring(1) : cleanPhone
    window.open(`https://wa.me/${formattedPhone}`, '_blank')
  }

  const callNumber = (phone) => {
    if (!phone) return
    window.open(`tel:${phone}`, '_self')
  }

  const showPatientMenu = () => {
    // Actions menu trigger
  }

  const addNote = () => {
    // Add medical note action
  }

  const rescheduleControl = (controlId) => {
    // Reschedule control
  }

  const shareSchedule = (controlId) => {
    // Share schedule via WhatsApp
    const text = `Jadwal kontrol pasien ${patient.value?.full_name || ''}: ${formatDate(nextControl.value.control_date)} pukul ${nextControl.value.control_time || '-'} WIB`
    if (navigator.share) {
      navigator.share({ title: 'Jadwal Kontrol', text }).catch(() => {})
    } else {
      navigator.clipboard?.writeText(text)
      alert('Informasi jadwal berhasil disalin.')
    }
  }

  onMounted(() => {
    if (!patientId) {
      error.value = 'ID pasien tidak ditemukan.'
      return
    }
    fetchPatientDetail()
  })

  return {
    patient,
    treatment,
    nextControl,
    refills,
    loading,
    error,
    formatDate,
    formatDateTime,
    calculateAge,
    formatGender,
    formatPhase,
    formatRegimen,
    formatTreatmentStatus,
    formatRefillStatus,
    getRefillBadgeClass,
    getInitials,
    contactPatient,
    callNumber,
    showPatientMenu,
    addNote,
    rescheduleControl,
    shareSchedule
  }
}

export default {
  usePatientDetailView
}

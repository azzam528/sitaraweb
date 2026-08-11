import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import api from '@/services/api'

export function usePatientDetailView() {
  const route = useRoute()

  const patient = ref(null)
  const treatment = ref(null)
  const nextControl = ref(null)
  const refills = ref([])

  const loading = ref(false)
  const error = ref(null)

  const patientId = route.params.id

  // =====================================================
  // FETCH DETAIL PASIEN
  // =====================================================

  const fetchPatientDetail = async () => {
    loading.value = true
    error.value = null

    try {
      const response = await api.get(
        `/patients/${patientId}/detail`
      )

      const data = response.data

      patient.value = data.patient || null
      treatment.value = data.treatment || null
      nextControl.value = data.next_control || null

      refills.value = Array.isArray(data.refills)
        ? data.refills
        : []

    } catch (err) {
      console.error(
        'Gagal mengambil detail pasien:',
        err
      )

      error.value =
        err.response?.data?.detail ||
        'Gagal mengambil data pasien.'

    } finally {
      loading.value = false
    }
  }

  // =====================================================
  // FORMAT DATA
  // =====================================================

  const formatDate = (dateValue) => {
    if (!dateValue) {
      return '-'
    }

    const date = new Date(dateValue)

    if (Number.isNaN(date.getTime())) {
      return '-'
    }

    return new Intl.DateTimeFormat(
      'id-ID',
      {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      }
    ).format(date)
  }

  const formatDateTime = (dateValue) => {
    if (!dateValue) {
      return '-'
    }

    const date = new Date(dateValue)

    if (Number.isNaN(date.getTime())) {
      return '-'
    }

    return new Intl.DateTimeFormat(
      'id-ID',
      {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }
    ).format(date)
  }

  const calculateAge = (birthDate) => {
    if (!birthDate) {
      return '-'
    }

    const birth = new Date(birthDate)

    if (Number.isNaN(birth.getTime())) {
      return '-'
    }

    const today = new Date()

    let age =
      today.getFullYear() -
      birth.getFullYear()

    const monthDifference =
      today.getMonth() -
      birth.getMonth()

    if (
      monthDifference < 0 ||
      (
        monthDifference === 0 &&
        today.getDate() < birth.getDate()
      )
    ) {
      age--
    }

    return age
  }

  const formatGender = (gender) => {
    if (!gender) {
      return '-'
    }

    const genderMap = {
      male: 'Laki-laki',
      female: 'Perempuan'
    }

    return genderMap[gender] || gender
  }

  const formatPhase = (phase) => {
    if (!phase) {
      return '-'
    }

    const phaseMap = {
      intensive: 'Fase Intensif',
      continuation: 'Fase Lanjutan'
    }

    return phaseMap[phase] || phase
  }

  const formatRegimen = (regimen) => {
    if (!regimen) {
      return '-'
    }

    const regimenMap = {
      category_1: 'Kategori 1',
      category_2: 'Kategori 2',
      mdr: 'MDR'
    }

    return regimenMap[regimen] || regimen
  }

  const formatTreatmentStatus = (status) => {
    if (!status) {
      return '-'
    }

    const statusMap = {
      active: 'Aktif Pengobatan',
      completed: 'Selesai',
      dropped: 'Putus Berobat'
    }

    return statusMap[status] || status
  }

  const formatRefillStatus = (status) => {
    if (!status) {
      return '-'
    }

    const statusMap = {
      pending: 'Menunggu',
      approved: 'Disetujui',
      rejected: 'Ditolak'
    }

    return statusMap[status] || status
  }

  const getRefillBadgeClass = (status) => {
    if (status === 'approved') {
      return 'badge-success'
    }

    if (status === 'rejected') {
      return 'badge-danger'
    }

    return ''
  }

  // =====================================================
  // INITIALS
  // =====================================================

  const getInitials = (name) => {
    if (!name) {
      return '-'
    }

    const words = name
      .trim()
      .split(/\s+/)
      .filter(Boolean)

    if (words.length === 1) {
      return words[0]
        .substring(0, 2)
        .toUpperCase()
    }

    return (
      words[0][0] +
      words[words.length - 1][0]
    ).toUpperCase()
  }

  // =====================================================
  // ACTIONS
  // =====================================================

  const contactPatient = () => {
    if (!patient.value?.phone) {
      alert('Nomor telepon pasien belum tersedia.')
      return
    }

    callNumber(patient.value.phone)
  }

  const callNumber = (phone) => {
    if (!phone) {
      alert('Nomor telepon belum tersedia.')
      return
    }

    window.location.href = `tel:${phone}`
  }

  const showPatientMenu = () => {
    console.log(
      'Patient menu:',
      patient.value
    )
  }

  const addNote = () => {
    alert(
      'Fitur tambah catatan akan dihubungkan setelah endpoint catatan tersedia.'
    )
  }

  const rescheduleControl = () => {
    if (!nextControl.value) {
      alert(
        'Belum ada jadwal kontrol yang bisa dijadwalkan ulang.'
      )

      return
    }

    console.log(
      'Reschedule:',
      nextControl.value
    )
  }

  const shareSchedule = () => {
    if (!nextControl.value) {
      alert('Belum ada jadwal kontrol.')
      return
    }

    const text =
      `Jadwal kontrol pasien ${patient.value?.full_name || ''}: ` +
      `${formatDate(nextControl.value.control_date)} ` +
      `pukul ${nextControl.value.control_time || '-'} WIB`

    if (navigator.share) {
      navigator.share({
        title: 'Jadwal Kontrol',
        text
      }).catch(() => {})
    } else {
      navigator.clipboard
        ?.writeText(text)

      alert(
        'Informasi jadwal berhasil disalin.'
      )
    }
  }

  // =====================================================
  // LOAD
  // =====================================================

  onMounted(() => {
    if (!patientId) {
      error.value =
        'ID pasien tidak ditemukan.'

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
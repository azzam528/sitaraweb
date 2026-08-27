import { defineComponent, ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import videoService from '../../services/video.service'
import DetailHeader from '@/components/common/DetailHeader.vue'

export default defineComponent({
  name: 'VideoDetailView',
  components: {
    DetailHeader
  },
  setup() {
    const route = useRoute()
    const router = useRouter()

    const videoId = computed(() => route.params.id)
    const videoData = ref(null)
    const isLoading = ref(true)
    const isSubmitting = ref(false)
    const notes = ref('')

    // Toast Alert
    const alertMessage = ref('')
    const alertType = ref('success')

    const showAlert = (message, type = 'success') => {
      alertMessage.value = message
      alertType.value = type
      setTimeout(() => {
        alertMessage.value = ''
      }, 4000)
    }

    // Mock dataset matching VideoListView for graceful fallback
    const mockVideos = {
      '1': {
        id: 1,
        patient_id: 101,
        patient: {
          full_name: 'Bambang Pamungkas',
          nik: '3201015502940001',
          medical_record_number: 'RM-2026-0042',
          phone: '081234567890',
          address: 'Jl. Merdeka No. 12, Kel. Sukajadi',
          pmo_name: 'Ibu Ratna',
          pmo_phone: '081298765432'
        },
        treatment: {
          phase: 'intensive',
          regimen: 'category_1'
        },
        video_url: '',
        recorded_at: new Date().toISOString(),
        created_at: new Date().toISOString(),
        duration_seconds: 45,
        resolution: '720p HD (1280x720)',
        fps: 30,
        file_size: '4.8 MB',
        status: 'verified', // 'verified' | 'pending' | 'rejected'
        overall_score: 98,
        ai_details: {
          face_match: { status: 'MATCH', score: 99.4, label: 'Wajah Terdaftar Sesuai Data Pasien' },
          pill_detected: { status: 'VERIFIED', score: 96.8, label: 'Kombinasi Obat 4FDC Terdeteksi' },
          swallowing_detected: { status: 'DETECTED', score: 97.5, label: 'Gerakan Menelan Air & Obat Terkonfirmasi' },
          video_quality: { status: 'CLEAR', score: 95.0, label: 'Pencahayaan & Ketajaman Memenuhi Syarat' },
          tampering_check: { status: 'NO TAMPERING', score: 99.9, label: 'Video Otentik, Tidak Ada Rekaman Ulang' }
        },
        timeline: [
          { day: 'Hari Ini', date: '25 Agu', time: '08:45 WIB', status: 'verified', label: 'Terverifikasi Otomatis' },
          { day: 'Kemarin', date: '24 Agu', time: '08:30 WIB', status: 'verified', label: 'Terverifikasi Otomatis' },
          { day: '23 Agu', date: '23 Agu', time: '08:15 WIB', status: 'verified', label: 'Terverifikasi Otomatis' },
          { day: '22 Agu', date: '22 Agu', time: '09:00 WIB', status: 'warning', label: 'Review Manual Nakes' },
          { day: '21 Agu', date: '21 Agu', time: '08:30 WIB', status: 'verified', label: 'Terverifikasi Otomatis' },
          { day: '20 Agu', date: '20 Agu', time: '08:40 WIB', status: 'verified', label: 'Terverifikasi Otomatis' },
          { day: '19 Agu', date: '19 Agu', time: '08:20 WIB', status: 'verified', label: 'Terverifikasi Otomatis' }
        ],
        notes: 'Pasien meminum 3 tablet FDC tepat waktu dengan segelas air mineral.'
      },
      '2': {
        id: 2,
        patient_id: 102,
        patient: {
          full_name: 'Siti Mariam',
          nik: '3201015502940002',
          medical_record_number: 'RM-2026-0089',
          phone: '081345678901',
          address: 'Kp. Babakan RT 02/05, Desa Cikembar',
          pmo_name: 'Bpk. Hendra',
          pmo_phone: '081398765431'
        },
        treatment: {
          phase: 'continuation',
          regimen: 'category_1'
        },
        video_url: '',
        recorded_at: new Date().toISOString(),
        created_at: new Date().toISOString(),
        duration_seconds: 38,
        resolution: '720p HD (1280x720)',
        fps: 25,
        file_size: '3.9 MB',
        status: 'pending',
        overall_score: 64,
        ai_details: {
          face_match: { status: 'MATCH', score: 88.2, label: 'Wajah Terdeteksi Sebagian (Pencahayaan Redup)' },
          pill_detected: { status: 'UNCERTAIN', score: 62.5, label: 'Bentuk Tablet Kurang Jelas' },
          swallowing_detected: { status: 'DETECTED', score: 78.0, label: 'Gerakan Menelan Terdeteksi' },
          video_quality: { status: 'LOW_LIGHT', score: 58.0, label: 'Pencahayaan Terlalu Gelap' },
          tampering_check: { status: 'PASSED', score: 96.0, label: 'Tidak Terindikasi Manipulasi' }
        },
        timeline: [
          { day: 'Hari Ini', date: '25 Agu', time: '07:12 WIB', status: 'pending', label: 'Menunggu Tinjauan' },
          { day: 'Kemarin', date: '24 Agu', time: '07:30 WIB', status: 'verified', label: 'Terverifikasi' },
          { day: '23 Agu', date: '23 Agu', time: '07:05 WIB', status: 'verified', label: 'Terverifikasi' },
          { day: '22 Agu', date: '22 Agu', time: '07:45 WIB', status: 'verified', label: 'Terverifikasi' },
          { day: '21 Agu', date: '21 Agu', time: '08:00 WIB', status: 'warning', label: 'Review Manual' },
          { day: '20 Agu', date: '20 Agu', time: '07:20 WIB', status: 'verified', label: 'Terverifikasi' },
          { day: '19 Agu', date: '19 Agu', time: '07:15 WIB', status: 'verified', label: 'Terverifikasi' }
        ],
        notes: ''
      },
      '3': {
        id: 3,
        patient_id: 103,
        patient: {
          full_name: 'Rahmat Kurnia',
          nik: '3201015502940003',
          medical_record_number: 'RM-2026-0112',
          phone: '081456789012',
          address: 'Jl. Ahmad Yani No. 55',
          pmo_name: 'Ibu Kusuma',
          pmo_phone: '081498765430'
        },
        treatment: {
          phase: 'intensive',
          regimen: 'category_1'
        },
        video_url: '',
        recorded_at: new Date().toISOString(),
        created_at: new Date().toISOString(),
        duration_seconds: 52,
        resolution: '720p HD (1280x720)',
        fps: 30,
        file_size: '5.2 MB',
        status: 'verified',
        overall_score: 82,
        ai_details: {
          face_match: { status: 'MATCH', score: 94.0, label: 'Wajah Pasien Sesuai' },
          pill_detected: { status: 'VERIFIED', score: 85.0, label: 'Tablet Obat Terlihat Jelas' },
          swallowing_detected: { status: 'DETECTED', score: 88.0, label: 'Gerakan Menelan Valid' },
          video_quality: { status: 'CLEAR', score: 89.0, label: 'Kualitas Video Baik' },
          tampering_check: { status: 'NO TAMPERING', score: 98.0, label: 'Validitas File Terverifikasi' }
        },
        timeline: [
          { day: 'Hari Ini', date: '25 Agu', time: '06:30 WIB', status: 'verified', label: 'Terverifikasi' },
          { day: 'Kemarin', date: '24 Agu', time: '06:40 WIB', status: 'verified', label: 'Terverifikasi' },
          { day: '23 Agu', date: '23 Agu', time: '06:35 WIB', status: 'verified', label: 'Terverifikasi' },
          { day: '22 Agu', date: '22 Agu', time: '06:50 WIB', status: 'verified', label: 'Terverifikasi' },
          { day: '21 Agu', date: '21 Agu', time: '06:30 WIB', status: 'verified', label: 'Terverifikasi' },
          { day: '20 Agu', date: '20 Agu', time: '07:00 WIB', status: 'verified', label: 'Terverifikasi' },
          { day: '19 Agu', date: '19 Agu', time: '06:45 WIB', status: 'verified', label: 'Terverifikasi' }
        ],
        notes: ''
      },
      '4': {
        id: 4,
        patient_id: 104,
        patient: {
          full_name: 'Andi Darmawan',
          nik: '3201015502940004',
          medical_record_number: 'RM-2026-0150',
          phone: '081567890123',
          address: 'Jl. Riau No. 8',
          pmo_name: 'Ibu Siti',
          pmo_phone: '081598765439'
        },
        treatment: {
          phase: 'continuation',
          regimen: 'category_1'
        },
        video_url: '',
        recorded_at: new Date().toISOString(),
        created_at: new Date().toISOString(),
        duration_seconds: 40,
        resolution: '720p HD (1280x720)',
        fps: 30,
        file_size: '4.1 MB',
        status: 'verified',
        overall_score: 95,
        ai_details: {
          face_match: { status: 'MATCH', score: 98.0, label: 'Wajah Pasien Sesuai' },
          pill_detected: { status: 'VERIFIED', score: 96.0, label: 'Obat Teridentifikasi' },
          swallowing_detected: { status: 'DETECTED', score: 94.0, label: 'Menelan Obat Terverifikasi' },
          video_quality: { status: 'CLEAR', score: 92.0, label: 'Kualitas Video Bagus' },
          tampering_check: { status: 'NO TAMPERING', score: 99.0, label: 'Otentik' }
        },
        timeline: [
          { day: 'Hari Ini', date: '25 Agu', time: '08:00 WIB', status: 'verified', label: 'Terverifikasi' },
          { day: 'Kemarin', date: '24 Agu', time: '18:20 WIB', status: 'verified', label: 'Terverifikasi' },
          { day: '23 Agu', date: '23 Agu', time: '18:15 WIB', status: 'verified', label: 'Terverifikasi' },
          { day: '22 Agu', date: '22 Agu', time: '18:30 WIB', status: 'verified', label: 'Terverifikasi' },
          { day: '21 Agu', date: '21 Agu', time: '18:00 WIB', status: 'verified', label: 'Terverifikasi' },
          { day: '20 Agu', date: '20 Agu', time: '18:45 WIB', status: 'verified', label: 'Terverifikasi' },
          { day: '19 Agu', date: '19 Agu', time: '18:10 WIB', status: 'verified', label: 'Terverifikasi' }
        ],
        notes: ''
      },
      '5': {
        id: 5,
        patient_id: 105,
        patient: {
          full_name: 'Nita Kusuma',
          nik: '3201015502940005',
          medical_record_number: 'RM-2026-0188',
          phone: '081678901234',
          address: 'Perum Grand Mutiara Blok C2 No. 10',
          pmo_name: 'Bpk. Joko',
          pmo_phone: '081698765438'
        },
        treatment: {
          phase: 'intensive',
          regimen: 'category_1'
        },
        video_url: '',
        recorded_at: new Date().toISOString(),
        created_at: new Date().toISOString(),
        duration_seconds: 30,
        resolution: '480p SD (854x480)',
        fps: 20,
        file_size: '2.5 MB',
        status: 'rejected',
        overall_score: 32,
        ai_details: {
          face_match: { status: 'MISMATCH', score: 35.0, label: 'Wajah Berbeda / Terhalang Objek' },
          pill_detected: { status: 'NOT_FOUND', score: 28.0, label: 'Tablet Obat Tidak Terlihat Masuk Mulut' },
          swallowing_detected: { status: 'NOT_DETECTED', score: 30.0, label: 'Gerakan Menelan Tidak Terdeteksi' },
          video_quality: { status: 'BLURRY', score: 45.0, label: 'Video Buram & Goyang' },
          tampering_check: { status: 'SUSPICIOUS', score: 40.0, label: 'Terindikasi Rekaman Layar Ulang' }
        },
        timeline: [
          { day: 'Hari Ini', date: '25 Agu', time: '09:15 WIB', status: 'rejected', label: 'Verifikasi Ditolak' },
          { day: 'Kemarin', date: '24 Agu', time: '16:45 WIB', status: 'rejected', label: 'Verifikasi Ditolak' },
          { day: '23 Agu', date: '23 Agu', time: '16:30 WIB', status: 'verified', label: 'Terverifikasi' },
          { day: '22 Agu', date: '22 Agu', time: '17:00 WIB', status: 'verified', label: 'Terverifikasi' },
          { day: '21 Agu', date: '21 Agu', time: '16:50 WIB', status: 'warning', label: 'Review Manual' },
          { day: '20 Agu', date: '20 Agu', time: '16:30 WIB', status: 'verified', label: 'Terverifikasi' },
          { day: '19 Agu', date: '19 Agu', time: '16:40 WIB', status: 'verified', label: 'Terverifikasi' }
        ],
        notes: 'Wajah tertutup masker dan obat tidak diperlihatkan ke kamera.'
      },
      '6': {
        id: 6,
        patient_id: 106,
        patient: {
          full_name: 'Ahmad Fauzi',
          nik: '3273012304950001',
          medical_record_number: 'RM-TB-2026-0001',
          phone: '081223344556',
          address: 'Jl. Dago No. 45, Bandung',
          pmo_name: 'Siti Aminah',
          pmo_phone: '081298765430'
        },
        treatment: {
          phase: 'intensive',
          regimen: 'category_1'
        },
        video_url: '',
        recorded_at: new Date().toISOString(),
        created_at: new Date().toISOString(),
        duration_seconds: 42,
        resolution: '720p HD (1280x720)',
        fps: 30,
        file_size: '4.5 MB',
        status: 'verified',
        overall_score: 94,
        ai_details: {
          face_match: { status: 'MATCH', score: 98.2, label: 'Wajah Terverifikasi Sesuai Data' },
          pill_detected: { status: 'VERIFIED', score: 95.0, label: 'Tablet OAT Terlihat Jelas' },
          swallowing_detected: { status: 'DETECTED', score: 96.0, label: 'Gerakan Menelan Terdeteksi' },
          video_quality: { status: 'CLEAR', score: 94.0, label: 'Kualitas Rekaman Jelas' },
          tampering_check: { status: 'NO TAMPERING', score: 99.5, label: 'Video Asli' }
        },
        timeline: [
          { day: 'Hari Ini', date: '25 Agu', time: '09:10 WIB', status: 'verified', label: 'Terverifikasi' },
          { day: 'Kemarin', date: '24 Agu', time: '09:00 WIB', status: 'verified', label: 'Terverifikasi' }
        ],
        notes: 'Minum obat teratur di depan PMO.'
      },
      '7': {
        id: 7,
        patient_id: 107,
        patient: {
          full_name: 'Dewi Sartika',
          nik: '3273014506920002',
          medical_record_number: 'RM-TB-2026-0002',
          phone: '081334455667',
          address: 'Jl. Dipatiukur No. 12, Bandung',
          pmo_name: 'Budi Santoso',
          pmo_phone: '081398765431'
        },
        treatment: {
          phase: 'continuation',
          regimen: 'category_1'
        },
        video_url: '',
        recorded_at: new Date().toISOString(),
        created_at: new Date().toISOString(),
        duration_seconds: 35,
        resolution: '720p HD (1280x720)',
        fps: 30,
        file_size: '3.8 MB',
        status: 'pending',
        overall_score: 58,
        ai_details: {
          face_match: { status: 'MATCH', score: 85.0, label: 'Wajah Cukup Sesuai' },
          pill_detected: { status: 'UNCERTAIN', score: 55.0, label: 'Tablet Obat Kurang Terlihat Jelas' },
          swallowing_detected: { status: 'DETECTED', score: 60.0, label: 'Menelan Air Terlihat' },
          video_quality: { status: 'FAIR', score: 65.0, label: 'Pencahayaan Kurang Terang' },
          tampering_check: { status: 'NO TAMPERING', score: 98.0, label: 'Video Asli' }
        },
        timeline: [
          { day: 'Hari Ini', date: '25 Agu', time: '08:15 WIB', status: 'warning', label: 'Menunggu Review Manual' }
        ],
        notes: 'Pencahayaan ruangan redup, perlu konfirmasi visual nakes.'
      }
    }

    const fallbackPatientList = [
      { full_name: 'Ahmad Fauzi', nik: '3273012304950001', medical_record_number: 'RM-TB-2026-0001', phone: '081223344556', address: 'Jl. Dago No. 45, Bandung', pmo_name: 'Siti Aminah', pmo_phone: '081298765430' },
      { full_name: 'Dewi Sartika', nik: '3273014506920002', medical_record_number: 'RM-TB-2026-0002', phone: '081334455667', address: 'Jl. Dipatiukur No. 12, Bandung', pmo_name: 'Budi Santoso', pmo_phone: '081398765431' },
      { full_name: 'Bambang Pamungkas', nik: '3201015502940001', medical_record_number: 'RM-2026-0042', phone: '081234567890', address: 'Jl. Merdeka No. 12, Kel. Sukajadi', pmo_name: 'Ibu Ratna', pmo_phone: '081298765432' },
      { full_name: 'Siti Mariam', nik: '3201015502940002', medical_record_number: 'RM-2026-0089', phone: '081345678901', address: 'Kp. Babakan RT 02/05, Desa Cikembar', pmo_name: 'Bpk. Hendra', pmo_phone: '081398765431' },
      { full_name: 'Rahmat Kurnia', nik: '3201015502940003', medical_record_number: 'RM-2026-0112', phone: '081456789012', address: 'Jl. Cihampelas No. 101, Coblong', pmo_name: 'Ibu Euis', pmo_phone: '081498765430' },
      { full_name: 'Andi Darmawan', nik: '3201015502940004', medical_record_number: 'RM-2026-0150', phone: '081567890123', address: 'Jl. Riau No. 8', pmo_name: 'Ibu Siti', pmo_phone: '081598765439' },
      { full_name: 'Nita Kusuma', nik: '3201015502940005', medical_record_number: 'RM-2026-0188', phone: '081678901234', address: 'Perum Grand Mutiara Blok C2 No. 10', pmo_name: 'Bpk. Joko', pmo_phone: '081698765438' },
      { full_name: 'Hendra Gunawan', nik: '3273011208880003', medical_record_number: 'RM-TB-2026-0003', phone: '081789012345', address: 'Jl. Buah Batu No. 20, Bandung', pmo_name: 'Rina Gunawan', pmo_phone: '081798765437' },
      { full_name: 'Ratna Sari', nik: '3273016709940004', medical_record_number: 'RM-TB-2026-0004', phone: '081890123456', address: 'Jl. Soekarno Hatta No. 112, Bandung', pmo_name: 'Dedi Kusnadi', pmo_phone: '081898765436' },
      { full_name: 'Budi Santoso', nik: '3273012211900005', medical_record_number: 'RM-TB-2026-0005', phone: '081901234567', address: 'Jl. Setiabudhi No. 88, Bandung', pmo_name: 'Tati Mulyati', pmo_phone: '081998765435' },
      { full_name: 'Eka Prasetya', nik: '3273011503930006', medical_record_number: 'RM-TB-2026-0006', phone: '082112345678', address: 'Jl. Sukajadi No. 55, Bandung', pmo_name: 'Agus Prasetya', pmo_phone: '082198765434' },
      { full_name: 'Maya Indah', nik: '3273015407960007', medical_record_number: 'RM-TB-2026-0007', phone: '082223456789', address: 'Jl. Pasirkaliki No. 72, Bandung', pmo_name: 'Wawan Hermawan', pmo_phone: '082298765433' }
    ]

    const loadVideoDetail = async () => {
      isLoading.value = true
      try {
        const id = String(route.params.id || '1')
        const numId = parseInt(id) || 1
        const fallbackPatient = fallbackPatientList[(numId - 1) % fallbackPatientList.length]

        try {
          const res = await videoService.getById(id)
          if (res && res.data) {
            videoData.value = {
              ...mockVideos[id] || mockVideos['1'],
              ...res.data,
              patient: res.data.patient || (mockVideos[id]?.patient) || fallbackPatient
            }
            notes.value = videoData.value.notes || ''
            return
          }
        } catch (apiErr) {
          // If API fails or mock environment, fallback to structured mock item
          console.warn('API video fetch fallback to mock:', apiErr.message)
        }

        // Fallback to mock item based on ID
        const matched = mockVideos[id] || {
          ...mockVideos['1'],
          id: numId,
          patient: fallbackPatient
        }
        videoData.value = matched
        notes.value = matched.notes || ''
      } catch (error) {
        console.error('Failed to load video verification detail:', error)
        showAlert('Gagal memuat rincian verifikasi video', 'danger')
      } finally {
        isLoading.value = false
      }
    }

    onMounted(() => {
      loadVideoDetail()
    })

    // Action Handlers
    const handleApprove = async () => {
      if (!videoData.value) return
      isSubmitting.value = true
      try {
        const response = await videoService.approve(videoData.value.id, {
          review_note: notes.value?.trim() || null,
        })
        if (response?.data) {
          videoData.value = {
            ...videoData.value,
            ...response.data,
          }
        } else {
          videoData.value.status = 'verified'
        }
        showAlert('Verifikasi video berhasil DISETUJUI!')
      } catch (error) {
        console.error('Failed to approve video:', error)
        showAlert(
          error.response?.data?.detail || 'Gagal menyetujui verifikasi video',
          'danger',
        )
      } finally {
        isSubmitting.value = false
      }
    }

    const handleReject = async () => {
      if (!videoData.value) return
      if (!confirm('Apakah Anda yakin ingin menolak hasil verifikasi video ini?')) return

      isSubmitting.value = true
      try {
        const response = await videoService.reject(videoData.value.id, {
          review_note: notes.value?.trim() || null,
        })
        if (response?.data) {
          videoData.value = {
            ...videoData.value,
            ...response.data,
          }
        } else {
          videoData.value.status = 'rejected'
        }
        showAlert('Verifikasi video telah DITOLAK.', 'warning')
      } catch (error) {
        console.error('Failed to reject video:', error)
        showAlert(
          error.response?.data?.detail || 'Gagal menolak verifikasi video',
          'danger',
        )
      } finally {
        isSubmitting.value = false
      }
    }

    const handleReview = async () => {
      if (!videoData.value) return
      isSubmitting.value = true
      try {
        videoData.value.status = 'pending'
        showAlert('Status video diperbarui: Menunggu Tinjauan Ulang Nakes.', 'info')
      } catch (error) {
        showAlert('Gagal memperbarui status review', 'danger')
      } finally {
        isSubmitting.value = false
      }
    }

    const sendWhatsApp = (phone, name) => {
      if (!phone) {
        showAlert('Nomor WhatsApp pasien tidak tersedia', 'warning')
        return
      }
      const cleanPhone = phone.replace(/^0/, '62').replace(/\D/g, '')
      const msg = encodeURIComponent(
        `Halo Bpk/Ibu ${name || ''}, kami dari tim medis SITARA Puskesmas mengonfirmasi status video kepatuhan minum obat Anda. ${notes.value ? 'Catatan: ' + notes.value : 'Terima kasih atas kedisiplinannya meminum obat.'}`
      )
      window.open(`https://wa.me/${cleanPhone}?text=${msg}`, '_blank')
    }

    const goBack = () => {
      router.push('/dashboard/video-verifications')
    }

    // Formatting & Design Helpers
    const getInitials = (name) => {
      if (!name) return 'TB'
      return name
        .split(' ')
        .map((n) => n[0])
        .slice(0, 2)
        .join('')
        .toUpperCase()
    }

    const formatStatus = (status) => {
      if (status === 'verified' || status === 'Diverifikasi' || status === 'approved') return 'Terverifikasi AI'
      if (status === 'pending' || status === 'Menunggu Tinjauan' || status === 'review') return 'Menunggu Tinjauan'
      if (status === 'rejected' || status === 'Gagal' || status === 'Ditolak') return 'Verifikasi Ditolak'
      return status || 'Belum Terverifikasi'
    }

    const getStatusBadgeClass = (status) => {
      if (status === 'verified' || status === 'Diverifikasi' || status === 'approved') return 'status-verified'
      if (status === 'pending' || status === 'Menunggu Tinjauan' || status === 'review') return 'status-pending'
      if (status === 'rejected' || status === 'Gagal' || status === 'Ditolak') return 'status-rejected'
      return 'status-pending'
    }

    const getScoreBadgeClass = (score) => {
      const num = typeof score === 'number' ? score : parseInt(score) || 0
      if (num >= 85) return 'score-high'
      if (num >= 60) return 'score-medium'
      return 'score-low'
    }

    const formatDate = (dateStr) => {
      if (!dateStr) return '-'
      const d = new Date(dateStr)
      return d.toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      })
    }

    const formatTime = (dateStr) => {
      if (!dateStr) return '-'
      const d = new Date(dateStr)
      return d.toLocaleTimeString('id-ID', {
        hour: '2-digit',
        minute: '2-digit'
      })
    }

    return {
      videoId,
      videoData,
      isLoading,
      isSubmitting,
      notes,
      alertMessage,
      alertType,
      showAlert,
      handleApprove,
      handleReject,
      handleReview,
      sendWhatsApp,
      goBack,
      getInitials,
      formatStatus,
      getStatusBadgeClass,
      getScoreBadgeClass,
      formatDate,
      formatTime
    }
  }
})

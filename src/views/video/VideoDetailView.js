import { formatDate, formatTime } from "../../utils/formatter";
import { defineComponent, ref, computed, onMounted, onBeforeUnmount } from 'vue'
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

    // Video Stream State
    const videoBlobUrl = ref('')
    const isVideoLoading = ref(true)
    const videoError = ref('')

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

    const loadVideoStream = async (id) => {
      isVideoLoading.value = true
      videoError.value = ''
      if (videoBlobUrl.value) {
        URL.revokeObjectURL(videoBlobUrl.value)
        videoBlobUrl.value = ''
      }
      try {
        const streamRes = await videoService.streamVideo(id)
        const blob = new Blob([streamRes.data], { type: 'video/mp4' })
        videoBlobUrl.value = URL.createObjectURL(blob)
      } catch (err) {
        console.error('Failed to stream video:', err)
        videoError.value = 'Video evidence tidak dapat dimuat dari server.'
      } finally {
        isVideoLoading.value = false
      }
    }

    const loadVideoDetail = async () => {
      isLoading.value = true
      try {
        const id = String(route.params.id || '1')

        try {
          const res = await videoService.getById(id)
          if (res && res.data) {
            const item = res.data

            // Strict contract: confidence must come directly from real ai_confidence, no fake fallback
            const hasAiConfidence = item.ai_confidence != null
            const overallScore = hasAiConfidence
              ? (item.ai_confidence > 1 ? Math.round(item.ai_confidence) : Math.round(item.ai_confidence * 100))
              : null

            const formattedFileSize = item.file_size
              ? `${(item.file_size / (1024 * 1024)).toFixed(1)} MB`
              : '4.8 MB'

            // 1. Deteksi Wajah Pasien
            const faceVerif = item.face_verification || null
            let faceStatus = 'DATA BELUM TERSEDIA'
            let faceLabel = 'Data belum tersedia'
            let faceScore = null

            if (item.ai_details?.face_match?.status) {
              const raw = String(item.ai_details.face_match.status).toUpperCase()
              if (raw === 'TERKONFIRMASI' || raw === 'MATCH' || raw === 'VERIFIED') {
                faceStatus = 'TERKONFIRMASI'
              } else if (raw === 'TIDAK TERKONFIRMASI' || raw === 'MISMATCH' || raw === 'FAILED') {
                faceStatus = 'TIDAK TERKONFIRMASI'
              }
              faceLabel = item.ai_details.face_match.label || (faceStatus === 'TERKONFIRMASI' ? 'Wajah Terverifikasi Sesuai Data Pasien' : 'Wajah Tidak Sesuai / Terhalang')
              faceScore = item.ai_details.face_match.score
            } else if (faceVerif) {
              if (faceVerif.status === 'verified') {
                faceStatus = 'TERKONFIRMASI'
                faceLabel = 'Wajah Terverifikasi Sesuai Data Pasien'
              } else if (faceVerif.status === 'failed') {
                faceStatus = 'TIDAK TERKONFIRMASI'
                faceLabel = 'Wajah Tidak Sesuai / Terhalang'
              }
              if (faceVerif.similarity_score != null) {
                faceScore = +(faceVerif.similarity_score * 100).toFixed(1)
              }
            } else if (item.face_verification_id != null) {
              if (item.status === 'verified' || item.status === 'approved') {
                faceStatus = 'TERKONFIRMASI'
                faceLabel = 'Wajah Terverifikasi Sesuai Data Pasien'
              } else if (item.status === 'rejected') {
                faceStatus = 'TIDAK TERKONFIRMASI'
                faceLabel = 'Verifikasi Wajah Ditolak'
              } else {
                faceStatus = 'TERKONFIRMASI'
                faceLabel = 'Wajah Terverifikasi Sesuai Data Pasien'
              }
            }

            // 2. Identifikasi Tablet Obat
            const medVerif = item.medicine_detection || item.medication_verification || null
            let medStatus = 'DATA BELUM TERSEDIA'
            let medLabel = 'Data belum tersedia'
            let medScore = null

            if (item.ai_details?.pill_detected?.status) {
              const raw = String(item.ai_details.pill_detected.status).toUpperCase()
              if (raw === 'TERKONFIRMASI' || raw === 'VERIFIED' || raw === 'DETECTED' || raw === 'MATCH') {
                medStatus = 'TERKONFIRMASI'
              } else if (raw === 'TIDAK TERKONFIRMASI' || raw === 'UNCERTAIN' || raw === 'FAILED' || raw === 'MISMATCH') {
                medStatus = 'TIDAK TERKONFIRMASI'
              }
              medLabel = item.ai_details.pill_detected.label || (medStatus === 'TERKONFIRMASI' ? 'Kombinasi Tablet Obat Teridentifikasi' : 'Bentuk Obat Kurang Terlihat Jelas')
              medScore = item.ai_details.pill_detected.score
            } else if (medVerif) {
              if (medVerif.medicine_match === true || medVerif.status === 'verified') {
                medStatus = 'TERKONFIRMASI'
                medLabel = 'Kombinasi Tablet Obat Teridentifikasi'
              } else if (medVerif.medicine_match === false || medVerif.status === 'failed') {
                medStatus = 'TIDAK TERKONFIRMASI'
                medLabel = 'Bentuk Obat Kurang Terlihat Jelas'
              }
              if (medVerif.confidence != null) {
                medScore = +(medVerif.confidence * 100).toFixed(1)
              }
            } else if (item.medicine_schedule_id != null && (item.status === 'verified' || item.status === 'approved')) {
              medStatus = 'TERKONFIRMASI'
              medLabel = 'Kombinasi Tablet Obat Teridentifikasi'
            } else if (item.medicine_schedule_id != null && item.status === 'rejected') {
              medStatus = 'TIDAK TERKONFIRMASI'
              medLabel = 'Identifikasi Tablet Obat Tidak Sesuai'
            }

            // 3. Gerakan Minum & Menelan
            let drinkingStatus = 'DATA BELUM TERSEDIA'
            let drinkingLabel = 'Data belum tersedia'

            if (item.ai_details?.swallowing_detected?.status) {
              const raw = String(item.ai_details.swallowing_detected.status).toUpperCase()
              if (raw === 'TERKONFIRMASI' || raw === 'DETECTED' || raw === 'VERIFIED') {
                drinkingStatus = 'TERKONFIRMASI'
              } else if (raw === 'TIDAK TERKONFIRMASI' || raw === 'UNCERTAIN' || raw === 'FAILED' || raw === 'PERLU TINJAUAN') {
                drinkingStatus = 'TIDAK TERKONFIRMASI'
              }
              drinkingLabel = item.ai_details.swallowing_detected.label || (drinkingStatus === 'TERKONFIRMASI' ? 'Gerakan Minum & Menelan Terkonfirmasi' : 'Gerakan Menelan Kurang Terlihat')
            } else if (item.status === 'verified' || item.status === 'approved' || item.max_drinking_stage === 'completed') {
              drinkingStatus = 'TERKONFIRMASI'
              drinkingLabel = 'Gerakan Minum & Menelan Terkonfirmasi'
            } else if (item.status === 'rejected') {
              drinkingStatus = 'TIDAK TERKONFIRMASI'
              drinkingLabel = 'Gerakan Menelan Tidak Terpenuhi'
            } else if (item.max_drinking_stage != null) {
              drinkingStatus = 'TIDAK TERKONFIRMASI'
              drinkingLabel = 'Proses Minum Belum Lengkap'
            }

            // Ringkasan Hasil Analisis AI (Hasil Keseluruhan)
            const allAiStatuses = [faceStatus, medStatus, drinkingStatus]
            let aiSummary = {
              text: 'DATA VERIFIKASI BELUM LENGKAP',
              badgeClass: 'badge-subtle',
              type: 'incomplete',
            }

            if (allAiStatuses.every((s) => s === 'TERKONFIRMASI')) {
              aiSummary = {
                text: 'VERIFIKASI BERHASIL',
                badgeClass: 'badge-success',
                type: 'success',
              }
            } else if (allAiStatuses.some((s) => s === 'TIDAK TERKONFIRMASI')) {
              aiSummary = {
                text: 'PERLU PEMERIKSAAN ADMIN',
                badgeClass: 'badge-warning',
                type: 'warning',
              }
            } else {
              aiSummary = {
                text: 'DATA VERIFIKASI BELUM LENGKAP',
                badgeClass: 'badge-subtle',
                type: 'incomplete',
              }
            }

            const aiDetails = {
              face_match: {
                has_data: faceStatus !== 'DATA BELUM TERSEDIA',
                status: faceStatus,
                score: faceScore,
                label: faceLabel,
              },
              pill_detected: {
                has_data: medStatus !== 'DATA BELUM TERSEDIA',
                status: medStatus,
                score: medScore,
                label: medLabel,
              },
              swallowing_detected: {
                has_data: drinkingStatus !== 'DATA BELUM TERSEDIA',
                status: drinkingStatus,
                label: drinkingLabel,
              },
            }

            videoData.value = {
              id: item.id,
              patient: item.patient || {
                full_name: 'Pasien TB',
                nik: '-',
                medical_record_number: '-',
                phone: '-',
                address: '-',
                pmo_name: '-',
                pmo_phone: '-',
              },
              treatment: item.treatment || {
                phase: 'intensive',
                regimen: 'category_1',
              },
              video_url: item.video_path || '',
              recorded_at: item.created_at || item.verification_date || new Date().toISOString(),
              created_at: item.created_at || item.verification_date || new Date().toISOString(),
              duration_seconds: item.duration_seconds || 45,
              resolution: item.resolution || '720p HD (1280x720)',
              fps: item.fps || 30,
              file_size: formattedFileSize,
              status: item.status || 'pending',
              overall_score: overallScore,
              ai_details: aiDetails,
              ai_summary: aiSummary,
              timeline: item.timeline || [
                {
                  day: 'Hari Ini',
                  date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short' }),
                  time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB',
                  status: item.status,
                  label: (item.status === 'verified' || item.status === 'approved' || item.status === 'automatic_confirmed' || item.status === 'manual_confirmed') ? 'Terkonfirmasi' : item.status === 'rejected' ? 'Ditolak' : 'Menunggu Tinjauan'
                }
              ],
              notes: item.review_note || '',
              review_note: item.review_note || '',
            }
            notes.value = videoData.value.notes || ''

            // Load protected video stream
            await loadVideoStream(item.id)
            return
          }
        } catch (apiErr) {
          console.error('API video fetch error:', apiErr)
          showAlert(apiErr.response?.data?.detail || 'Gagal memuat rincian verifikasi video dari server', 'danger')
        }
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

    onBeforeUnmount(() => {
      if (videoBlobUrl.value) {
        URL.revokeObjectURL(videoBlobUrl.value)
        videoBlobUrl.value = ''
      }
    })

    const downloadVideoBlob = () => {
      if (!videoBlobUrl.value) {
        showAlert('Video belum siap untuk diunduh.', 'warning')
        return
      }
      const a = document.createElement('a')
      a.href = videoBlobUrl.value
      a.download = `video_evidence_${videoData.value?.id || 'vot'}.mp4`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      showAlert('Video evidence berhasil diunduh.', 'success')
    }

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
        const response = await videoService.update(videoData.value.id, {
          status: 'pending',
          review_note: notes.value?.trim() || null,
        })
        if (response?.data) {
          videoData.value = {
            ...videoData.value,
            ...response.data,
            notes: response.data.review_note || notes.value,
            review_note: response.data.review_note || notes.value,
          }
        }
        showAlert('Catatan tinjauan berhasil disimpan. Status verifikasi tetap menunggu keputusan Nakes.', 'info')
      } catch (error) {
        console.error('Failed to save review note:', error)
        showAlert(
          error.response?.data?.detail || 'Gagal menyimpan catatan tinjauan. Silakan coba lagi.',
          'danger',
        )
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
      if (
        status === 'verified' ||
        status === 'Diverifikasi' ||
        status === 'approved' ||
        status === 'automatic_confirmed' ||
        status === 'manual_confirmed' ||
        status === 'Otomatis-Konfirmasi' ||
        status === 'Manual-Konfirmasi' ||
        status === 'AUTO VERIFIED' ||
        status === 'Terkonfirmasi'
      ) return 'Terkonfirmasi'
      if (status === 'pending' || status === 'Menunggu Tinjauan' || status === 'review' || status === 'needs_review' || status === 'NEEDS REVIEW') return 'Menunggu Tinjauan'
      if (status === 'rejected' || status === 'Gagal' || status === 'Ditolak' || status === 'REJECTED') return 'Ditolak'
      return status || 'Menunggu Tinjauan'
    }

    const getStatusBadgeClass = (status) => {
      if (
        status === 'verified' ||
        status === 'Diverifikasi' ||
        status === 'approved' ||
        status === 'automatic_confirmed' ||
        status === 'manual_confirmed' ||
        status === 'Otomatis-Konfirmasi' ||
        status === 'Manual-Konfirmasi' ||
        status === 'AUTO VERIFIED' ||
        status === 'Terkonfirmasi'
      ) return 'status-verified'
      if (status === 'pending' || status === 'Menunggu Tinjauan' || status === 'review' || status === 'needs_review' || status === 'NEEDS REVIEW') return 'status-pending'
      if (status === 'rejected' || status === 'Gagal' || status === 'Ditolak' || status === 'REJECTED') return 'status-rejected'
      return 'status-pending'
    }

    const getAiStatusBadgeClass = (status) => {
      if (status === 'TERKONFIRMASI') return 'badge-success'
      if (status === 'TIDAK TERKONFIRMASI') return 'badge-danger'
      return 'badge-subtle'
    }

    const getScoreBadgeClass = (score) => {
      if (score == null) return 'score-low'
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
      videoBlobUrl,
      isVideoLoading,
      videoError,
      loadVideoStream,
      downloadVideoBlob,
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
      getAiStatusBadgeClass,
      formatDate,
      formatTime
    }
  }
})

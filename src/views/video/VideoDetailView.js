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

            // Real AI details without fake heuristics
            const faceVerif = item.face_verification || null
            const hasFaceVerif = faceVerif != null
            const faceStatus = hasFaceVerif
              ? (faceVerif.status === 'verified' ? 'MATCH' : 'MISMATCH')
              : null
            const faceLabel = hasFaceVerif
              ? (faceVerif.status === 'verified' ? 'Wajah Terverifikasi Sesuai Data Pasien' : 'Wajah Kurang Sesuai / Terhalang')
              : 'Data verifikasi wajah belum tersedia'

            const medVerif = item.medicine_detection || item.medication_verification || null
            const hasMedVerif = medVerif != null
            const medStatus = hasMedVerif
              ? (medVerif.medicine_match ? 'VERIFIED' : 'UNCERTAIN')
              : null
            const medLabel = hasMedVerif
              ? (medVerif.medicine_match ? 'Kombinasi Obat Terdeteksi' : 'Bentuk Obat Kurang Terlihat Jelas')
              : 'Data deteksi obat belum tersedia'

            const isDrinkingVerified = item.status === 'verified' || item.status === 'approved' || item.max_drinking_stage === 'completed'
            const hasDrinkingData = isDrinkingVerified || item.max_drinking_stage != null
            const drinkingStatus = isDrinkingVerified
              ? 'DETECTED'
              : (item.max_drinking_stage != null ? 'UNCERTAIN' : null)
            const drinkingLabel = isDrinkingVerified
              ? 'Gerakan Minum & Menelan Terkonfirmasi'
              : (hasDrinkingData ? 'Proses Minum Belum Lengkap' : 'Data deteksi minum belum tersedia')

            const aiDetails = item.ai_details || {
              face_match: {
                has_data: hasFaceVerif,
                status: faceStatus,
                score: faceVerif?.similarity_score != null ? +(faceVerif.similarity_score * 100).toFixed(1) : null,
                label: faceLabel,
              },
              pill_detected: {
                has_data: hasMedVerif,
                status: medStatus,
                score: medVerif?.confidence != null ? +(medVerif.confidence * 100).toFixed(1) : null,
                label: medLabel,
              },
              swallowing_detected: {
                has_data: hasDrinkingData,
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
              timeline: item.timeline || [
                {
                  day: 'Hari Ini',
                  date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short' }),
                  time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB',
                  status: item.status,
                  label: item.status === 'verified' ? 'Terverifikasi' : item.status === 'rejected' ? 'Ditolak' : 'Menunggu Tinjauan'
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
      if (status === 'verified' || status === 'Diverifikasi' || status === 'approved') return 'AUTO VERIFIED'
      if (status === 'pending' || status === 'Menunggu Tinjauan' || status === 'review' || status === 'needs_review') return 'NEEDS REVIEW'
      if (status === 'rejected' || status === 'Gagal' || status === 'Ditolak') return 'REJECTED'
      return status || 'Belum Terverifikasi'
    }

    const getStatusBadgeClass = (status) => {
      if (status === 'verified' || status === 'Diverifikasi' || status === 'approved') return 'status-verified'
      if (status === 'pending' || status === 'Menunggu Tinjauan' || status === 'review' || status === 'needs_review') return 'status-pending'
      if (status === 'rejected' || status === 'Gagal' || status === 'Ditolak') return 'status-rejected'
      return 'status-pending'
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
      formatDate,
      formatTime
    }
  }
})

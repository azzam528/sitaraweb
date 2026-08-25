<template>
  <div class="video-detail-view">
    <!-- 1. Header Navigation -->
    <div class="header-nav mb-3">
      <button @click="goBack" class="back-link">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <line x1="19" y1="12" x2="5" y2="12"></line>
          <polyline points="12 19 5 12 12 5"></polyline>
        </svg>
        Kembali ke Daftar Verifikasi Video
      </button>
    </div>

    <!-- Toast Alert Message -->
    <div
      v-if="alertMessage"
      class="toast-alert"
      :class="'toast-' + alertType"
    >
      <span>{{ alertMessage }}</span>
      <button class="btn-close-toast" @click="alertMessage = ''">
        &times;
      </button>
    </div>

    <!-- Loading State -->
    <div v-if="isLoading" class="loading-state card">
      <div class="spinner"></div>
      <p>Memuat rincian verifikasi video...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="!videoData" class="error-state card">
      <h3>Data Verifikasi Tidak Ditemukan</h3>
      <p>Data verifikasi video ID #{{ videoId }} tidak tersedia atau telah dihapus.</p>
      <button class="btn btn-primary mt-3" @click="goBack">
        Kembali ke Daftar
      </button>
    </div>

    <!-- Main Content -->
    <div v-else class="detail-container">
      <!-- 2. Patient Identity Banner Card -->
      <div class="card patient-header">
        <div class="patient-info-left">
          <div class="patient-avatar">
            {{ getInitials(videoData.patient?.full_name || "TB") }}
          </div>
          <div class="patient-bio">
            <div class="flex-row items-center gap-2">
              <h2 class="patient-name">
                {{ videoData.patient?.full_name || "Pasien #" + videoData.id }}
              </h2>
              <span
                class="status-badge"
                :class="getStatusBadgeClass(videoData.status)"
              >
                {{ formatStatus(videoData.status) }}
              </span>
            </div>
            <p class="patient-sub">
              NIK: {{ videoData.patient?.nik || "-" }} &bull; No. RM:
              {{ videoData.patient?.medical_record_number || "-" }} &bull;
              Rekaman: {{ formatDate(videoData.recorded_at) }}, {{ formatTime(videoData.recorded_at) }} WIB
            </p>
          </div>
        </div>

        <div class="patient-meta-right">
          <div class="score-card-mini">
            <span class="score-label">SKOR KEYAKINAN AI</span>
            <span class="score-value font-bold" :class="getScoreBadgeClass(videoData.overall_score)">
              {{ videoData.overall_score }}%
            </span>
          </div>
        </div>
      </div>

      <!-- 3. Two-Column Main Layout Grid -->
      <div class="row-grid">
        <!-- Left Column: Video Player & Timeline -->
        <div class="col-main">
          <!-- Video Player Card -->
          <div class="card video-card">
            <div class="video-container">
              <!-- Real Video Player or Visual Mockup Frame -->
              <video
                v-if="videoData.video_url"
                :src="videoData.video_url"
                controls
                class="video-element"
                playsinline
              ></video>
              <div v-else class="video-mockup-frame">
                <!-- AI Face Detection Box Overlay -->
                <div class="face-detection-box">
                  <div class="detection-label">
                    FACE_MATCH {{ videoData.ai_details?.face_match?.score || 99.4 }}%
                  </div>
                </div>

                <div class="video-center-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="48"
                    height="48"
                    viewBox="0 0 24 24"
                    fill="rgba(255,255,255,0.85)"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>

                <!-- Resolution Overlay Badge -->
                <div class="resolution-tag">
                  {{ videoData.resolution || "720p HD" }}
                </div>
              </div>

              <!-- Video Controls Bar -->
              <div class="video-controls">
                <div class="controls-left">
                  <button class="control-btn play-btn" title="Putar Video">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </button>
                  <button class="control-btn" title="Audio">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                      <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                    </svg>
                  </button>
                  <span class="time-display">00:{{ videoData.duration_seconds || "45" }} / 01:00</span>
                </div>
                <div class="controls-right">
                  <span class="badge hd-badge">{{ videoData.resolution ? videoData.resolution.split(' ')[0] : '720P HD' }}</span>
                  <button class="control-btn" title="Fullscreen">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            <!-- Video Info & Download Footer -->
            <div class="video-footer">
              <span class="recording-time">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
                Waktu Rekam: {{ formatDate(videoData.recorded_at) }}, {{ formatTime(videoData.recorded_at) }} WIB
              </span>
              <a href="#" class="download-link" @click.prevent="showAlert('Fitur unduh berkas video sedang disiapkan.', 'info')">
                Unduh Video Asli ↓
              </a>
            </div>
          </div>

          <!-- Timeline Kepatuhan Card (7 Hari Terakhir) -->
          <div class="card timeline-card">
            <div class="card-header-row">
              <div class="card-title-with-icon">
                <svg xmlns="http://www.w3.org/2000/svg" class="title-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
                <h3 class="section-title">Timeline Kepatuhan Minum Obat (7 Hari Terakhir)</h3>
              </div>
              <span class="badge badge-subtle">Riwayat Pasien</span>
            </div>

            <div class="timeline-container">
              <div class="timeline-line"></div>
              <div class="timeline-nodes">
                <div
                  v-for="(item, idx) in (videoData.timeline || [])"
                  :key="idx"
                  class="timeline-node"
                >
                  <div
                    class="node-icon"
                    :class="item.status === 'verified' ? 'success' : item.status === 'warning' ? 'warning' : item.status === 'pending' ? 'pending' : 'danger'"
                  >
                    <!-- Verified Check -->
                    <svg v-if="item.status === 'verified'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <!-- Pending / Warning Clock -->
                    <svg v-else-if="item.status === 'warning' || item.status === 'pending'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <polyline points="12 6 12 12 16 14"></polyline>
                    </svg>
                    <!-- Danger / Missed Cross -->
                    <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </div>
                  <div class="node-date font-semibold">{{ item.day }}</div>
                  <div class="node-time">{{ item.time || item.date }}</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Metadata Teknis Video -->
          <div class="card">
            <h3 class="section-title">Informasi Berkas Rekaman</h3>
            <div class="detail-list">
              <div class="detail-row">
                <span class="detail-label">Resolusi & FPS:</span>
                <span class="detail-val font-semibold">{{ videoData.resolution || "720p HD (1280x720)" }} &bull; {{ videoData.fps || 30 }} FPS</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Ukuran Berkas:</span>
                <span class="detail-val">{{ videoData.file_size || "4.8 MB" }}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Durasi Rekaman:</span>
                <span class="detail-val">{{ videoData.duration_seconds || 45 }} Detik</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Column: AI Analysis & Action Area -->
        <div class="col-side">
          <!-- Hasil Analisis AI Card -->
          <div class="card analysis-card">
            <div class="card-header-row mb-3">
              <div class="card-title-with-icon">
                <svg xmlns="http://www.w3.org/2000/svg" class="title-icon text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"></path>
                </svg>
                <h3 class="side-title">Hasil Analisis Model AI</h3>
              </div>
              <span class="confidence-pill" :class="getScoreBadgeClass(videoData.overall_score)">
                {{ videoData.overall_score }}% Confidence
              </span>
            </div>

            <!-- Score Progress Bar -->
            <div class="ai-score-bar-wrapper mb-4">
              <div class="score-progress-track">
                <div
                  class="score-progress-fill"
                  :style="{
                    width: (videoData.overall_score || 80) + '%',
                    backgroundColor: videoData.overall_score >= 85 ? '#16A34A' : videoData.overall_score >= 60 ? '#F59E0B' : '#DC2626'
                  }"
                ></div>
              </div>
            </div>

            <!-- Analysis Detail List -->
            <div class="analysis-list">
              <!-- Deteksi Wajah -->
              <div class="analysis-item">
                <div class="analysis-left">
                  <div class="analysis-icon-box">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                      <circle cx="8.5" cy="8.5" r="1.5"></circle>
                      <polyline points="21 15 16 10 5 21"></polyline>
                    </svg>
                  </div>
                  <div class="analysis-text-group">
                    <span class="analysis-title">Deteksi Wajah Pasien</span>
                    <span class="analysis-desc">{{ videoData.ai_details?.face_match?.label || 'Wajah sesuai data pasien' }}</span>
                  </div>
                </div>
                <span
                  class="badge"
                  :class="videoData.ai_details?.face_match?.status === 'MATCH' ? 'badge-success' : 'badge-danger'"
                >
                  {{ videoData.ai_details?.face_match?.status || 'MATCH' }} ({{ videoData.ai_details?.face_match?.score || 99 }}%)
                </span>
              </div>

              <!-- Deteksi Obat -->
              <div class="analysis-item">
                <div class="analysis-left">
                  <div class="analysis-icon-box">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <rect x="2" y="7" width="20" height="10" rx="5" ry="5"></rect>
                      <line x1="12" y1="7" x2="12" y2="17"></line>
                    </svg>
                  </div>
                  <div class="analysis-text-group">
                    <span class="analysis-title">Identifikasi Tablet Obat</span>
                    <span class="analysis-desc">{{ videoData.ai_details?.pill_detected?.label || 'Tablet obat terdeteksi' }}</span>
                  </div>
                </div>
                <span
                  class="badge"
                  :class="videoData.ai_details?.pill_detected?.status === 'VERIFIED' ? 'badge-success' : 'badge-warning'"
                >
                  {{ videoData.ai_details?.pill_detected?.status || 'VERIFIED' }}
                </span>
              </div>

              <!-- Gerakan Menelan -->
              <div class="analysis-item">
                <div class="analysis-left">
                  <div class="analysis-icon-box">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path>
                      <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                      <line x1="12" y1="19" x2="12" y2="22"></line>
                    </svg>
                  </div>
                  <div class="analysis-text-group">
                    <span class="analysis-title">Gerakan Menelan (Swallowing)</span>
                    <span class="analysis-desc">{{ videoData.ai_details?.swallowing_detected?.label || 'Aktivitas menelan terdeteksi' }}</span>
                  </div>
                </div>
                <span
                  class="badge"
                  :class="videoData.ai_details?.swallowing_detected?.status === 'DETECTED' ? 'badge-success' : 'badge-danger'"
                >
                  {{ videoData.ai_details?.swallowing_detected?.status || 'DETECTED' }}
                </span>
              </div>

              <!-- Kualitas Video -->
              <div class="analysis-item">
                <div class="analysis-left">
                  <div class="analysis-icon-box">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"></rect>
                      <line x1="7" y1="2" x2="7" y2="22"></line>
                      <line x1="17" y1="2" x2="17" y2="22"></line>
                      <line x1="2" y1="12" x2="22" y2="12"></line>
                    </svg>
                  </div>
                  <div class="analysis-text-group">
                    <span class="analysis-title">Kualitas & Pencahayaan</span>
                    <span class="analysis-desc">{{ videoData.ai_details?.video_quality?.label || 'Pencahayaan jelas' }}</span>
                  </div>
                </div>
                <span class="badge badge-info">
                  {{ videoData.ai_details?.video_quality?.status || '720P CLEAR' }}
                </span>
              </div>

              <!-- Keamanan & Anti-Tampering -->
              <div class="analysis-item">
                <div class="analysis-left">
                  <div class="analysis-icon-box">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                    </svg>
                  </div>
                  <div class="analysis-text-group">
                    <span class="analysis-title">Integritas Berkas (Anti-Spoofing)</span>
                    <span class="analysis-desc">{{ videoData.ai_details?.tampering_check?.label || 'Video asli' }}</span>
                  </div>
                </div>
                <span class="badge badge-success">
                  {{ videoData.ai_details?.tampering_check?.status || 'NO TAMPERING' }}
                </span>
              </div>
            </div>
          </div>

          <!-- Catatan Tenaga Kesehatan Card -->
          <div class="card notes-card">
            <h3 class="side-title mb-2">Catatan Tenaga Kesehatan / Reviewer</h3>
            <textarea
              v-model="notes"
              class="notes-textarea"
              placeholder="Tambahkan catatan hasil verifikasi manual klinis..."
              rows="3"
            ></textarea>
          </div>

          <!-- Action Buttons Area -->
          <div class="card action-card">
            <h3 class="side-title mb-3">Tindakan Verifikasi</h3>
            <div class="action-buttons">
              <!-- Primary: Setujui -->
              <button
                class="btn btn-primary btn-block btn-approve"
                @click="handleApprove"
                :disabled="isSubmitting"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                Setujui Verifikasi
              </button>

              <!-- Secondary Actions Row -->
              <div class="secondary-actions">
                <button
                  class="btn btn-outline-warning"
                  @click="handleReview"
                  :disabled="isSubmitting"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
                  Tinjau Ulang
                </button>
                <button
                  class="btn btn-outline-danger"
                  @click="handleReject"
                  :disabled="isSubmitting"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                  Tolak
                </button>
              </div>

              <!-- Hubungi Pasien via WhatsApp -->
              <button
                v-if="videoData.patient?.phone"
                class="btn btn-outline-success btn-block mt-2"
                @click="sendWhatsApp(videoData.patient.phone, videoData.patient.full_name)"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="btn-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path
                    d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
                  ></path>
                </svg>
                Hubungi Pasien (WA)
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./VideoDetailView.js"></script>

<style scoped src="./VideoDetailView.css"></style>

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
      <DetailHeader
        :title="videoData.patient?.full_name || 'Pasien #' + videoData.id"
        :initials="getInitials(videoData.patient?.full_name || 'TB')"
      >
        <template #status>
          <span
            class="status-badge"
            :class="getStatusBadgeClass(videoData.status)"
          >
            {{ formatStatus(videoData.status) }}
          </span>
        </template>

        <template #metadata>
          <span class="meta-item">
            <strong>NIK:</strong> {{ videoData.patient?.nik || "-" }}
          </span>
          <span class="meta-dot">&bull;</span>
          <span class="meta-item">
            <strong>No. RM:</strong> {{ videoData.patient?.medical_record_number || "-" }}
          </span>
          <span class="meta-dot">&bull;</span>
          <span class="meta-item">
            <strong>Waktu Rekam:</strong> {{ formatDate(videoData.recorded_at) }}, {{ formatTime(videoData.recorded_at) }} WIB
          </span>
        </template>

        <template #extra>
          <div class="score-card-mini">
            <span class="score-label">SKOR KEYAKINAN AI</span>
            <span class="score-value font-bold" :class="getScoreBadgeClass(videoData.overall_score)">
              {{ videoData.overall_score }}%
            </span>
          </div>
        </template>
      </DetailHeader>

      <!-- 3. Upper Grid: Video Player + AI Analysis -->
      <div class="row-grid mb-4">
        <!-- Left: Video Player Card -->
        <div class="card video-card">
          <div class="card-header-row mb-3">
            <div class="card-title-with-icon">
              <svg xmlns="http://www.w3.org/2000/svg" class="title-icon text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polygon points="23 7 16 12 23 17 23 7"></polygon>
                <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
              </svg>
              <h3 class="section-title">Bukti Rekaman Video (AI VOT)</h3>
            </div>
            <span class="badge badge-subtle">
              {{ videoData.resolution || "720p HD" }}
            </span>
          </div>

          <!-- Video Player Box (Adaptive Portrait Frame) -->
          <div class="video-container">
            <!-- Loading Video State -->
            <div v-if="isVideoLoading" class="video-overlay-state">
              <div class="spinner-small"></div>
              <span>Memuat berkas video evidence...</span>
            </div>

            <!-- Error Video State -->
            <div v-else-if="videoError" class="video-overlay-state error-box">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
              <span class="text-danger mt-2">{{ videoError }}</span>
              <button class="btn btn-outline-primary btn-sm mt-3" @click="loadVideoStream(videoData.id)">
                Coba Muat Ulang
              </button>
            </div>

            <!-- Native Clean Single Video Player -->
            <video
              v-else-if="videoBlobUrl"
              :src="videoBlobUrl"
              controls
              class="video-element"
              playsinline
            ></video>
          </div>

          <!-- Video Footer with Metadata & Download Action -->
          <div class="video-footer mt-3">
            <div class="video-meta-info">
              <span class="meta-tag">{{ videoData.resolution || "720p HD (1280x720)" }}</span>
              <span class="meta-tag">{{ videoData.file_size || "4.8 MB" }}</span>
              <span class="meta-tag">{{ videoData.duration_seconds || 45 }} Detik</span>
            </div>
            <button
              class="btn btn-sm btn-outline-primary download-btn"
              @click="downloadVideoBlob"
              :disabled="!videoBlobUrl"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
              Unduh Video
            </button>
          </div>
        </div>

        <!-- Right: AI Analysis Card -->
        <div class="card analysis-card">
          <div class="card-header-row mb-3">
            <div class="card-title-with-icon">
              <svg xmlns="http://www.w3.org/2000/svg" class="title-icon text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"></path>
              </svg>
              <h3 class="section-title">Hasil Analisis Model AI</h3>
            </div>
            <span class="confidence-pill" :class="getScoreBadgeClass(videoData.overall_score)">
              {{ videoData.overall_score }}% Confidence
            </span>
          </div>

          <!-- Score Progress Bar -->
          <div class="ai-score-bar-wrapper mb-3">
            <div class="progress-track">
              <div
                class="progress-fill"
                :class="getScoreBadgeClass(videoData.overall_score)"
                :style="{ width: videoData.overall_score + '%' }"
              ></div>
            </div>
          </div>

          <!-- 5 Verification Points Breakdown -->
          <div class="analysis-list">
            <!-- 1. Deteksi Wajah -->
            <div class="analysis-item">
              <div class="analysis-left">
                <div class="analysis-icon-box">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
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
                {{ videoData.ai_details?.face_match?.status || 'MATCH' }}
              </span>
            </div>

            <!-- 2. Identifikasi Obat -->
            <div class="analysis-item">
              <div class="analysis-left">
                <div class="analysis-icon-box">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                  </svg>
                </div>
                <div class="analysis-text-group">
                  <span class="analysis-title">Identifikasi Tablet Obat</span>
                  <span class="analysis-desc">{{ videoData.ai_details?.pill_detected?.label || 'Obat teridentifikasi' }}</span>
                </div>
              </div>
              <span
                class="badge"
                :class="videoData.ai_details?.pill_detected?.status === 'VERIFIED' ? 'badge-success' : 'badge-warning'"
              >
                {{ videoData.ai_details?.pill_detected?.status || 'VERIFIED' }}
              </span>
            </div>

            <!-- 3. Gerakan Menelan -->
            <div class="analysis-item">
              <div class="analysis-left">
                <div class="analysis-icon-box">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 14 14"></polyline>
                  </svg>
                </div>
                <div class="analysis-text-group">
                  <span class="analysis-title">Gerakan Minum & Menelan</span>
                  <span class="analysis-desc">{{ videoData.ai_details?.swallowing_detected?.label || 'Gerakan minum terkonfirmasi' }}</span>
                </div>
              </div>
              <span
                class="badge"
                :class="videoData.ai_details?.swallowing_detected?.status === 'DETECTED' ? 'badge-success' : 'badge-warning'"
              >
                {{ videoData.ai_details?.swallowing_detected?.status || 'DETECTED' }}
              </span>
            </div>

            <!-- 4. Kualitas & Pencahayaan -->
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
                {{ videoData.ai_details?.video_quality?.status || 'CLEAR' }}
              </span>
            </div>

            <!-- 5. Keamanan & Anti-Tampering -->
            <div class="analysis-item">
              <div class="analysis-left">
                <div class="analysis-icon-box">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                  </svg>
                </div>
                <div class="analysis-text-group">
                  <span class="analysis-title">Integritas Berkas (Anti-Spoof)</span>
                  <span class="analysis-desc">{{ videoData.ai_details?.tampering_check?.label || 'Video asli' }}</span>
                </div>
              </div>
              <span class="badge badge-success">
                {{ videoData.ai_details?.tampering_check?.status || 'NO TAMPERING' }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- 4. Timeline Kepatuhan (Full Width) -->
      <div class="card timeline-card mb-4">
        <div class="card-header-row mb-3">
          <div class="card-title-with-icon">
            <svg xmlns="http://www.w3.org/2000/svg" class="title-icon text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
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

      <!-- 5. Bottom Grid: Notes + Verification Actions -->
      <div class="row-grid-bottom">
        <!-- Notes Card -->
        <div class="card notes-card">
          <div class="card-title-with-icon mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="title-icon text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
            </svg>
            <h3 class="section-title">Catatan Tenaga Kesehatan / Reviewer</h3>
          </div>
          <textarea
            v-model="notes"
            class="notes-textarea"
            placeholder="Tambahkan catatan hasil verifikasi manual klinis..."
            rows="4"
          ></textarea>
        </div>

        <!-- Verification Actions Card -->
        <div class="card action-card">
          <div class="card-title-with-icon mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" class="title-icon text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
            <h3 class="section-title">Tindakan Verifikasi</h3>
          </div>

          <!-- Pending / Needs Review Actions -->
          <div
            v-if="videoData.status === 'pending' || videoData.status === 'Menunggu Tinjauan' || videoData.status === 'review' || videoData.status === 'needs_review'"
            class="action-buttons-wrapper"
          >
            <!-- 1. Primary: Setujui Verifikasi -->
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

            <!-- 2. Secondary Row: Tinjau Ulang & Tolak -->
            <div class="secondary-actions-row">
              <button
                class="btn btn-outline-warning btn-flex"
                @click="handleReview"
                :disabled="isSubmitting"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
                  <polyline points="17 21 17 13 7 13 7 21"></polyline>
                  <polyline points="7 3 7 8 15 8"></polyline>
                </svg>
                Simpan Catatan Tinjauan
              </button>
              <button
                class="btn btn-outline-danger btn-flex"
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

            <!-- WhatsApp CTA -->
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
              Hubungi Pasien via WhatsApp
            </button>
          </div>

          <!-- Final Status State -->
          <div v-else class="verified-status-info">
            <div
              class="status-pill-large"
              :class="getStatusBadgeClass(videoData.status)"
            >
              <span class="status-dot"></span>
              <span>{{ formatStatus(videoData.status) }}</span>
            </div>
            <p class="status-helper-text">
              Verifikasi video ini telah selesai diproses dengan status <strong>{{ formatStatus(videoData.status) }}</strong>.
            </p>

            <button
              v-if="videoData.patient?.phone"
              class="btn btn-outline-success btn-block mt-3"
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
              Hubungi Pasien via WhatsApp
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./VideoDetailView.js"></script>

<style scoped src="./VideoDetailView.css"></style>

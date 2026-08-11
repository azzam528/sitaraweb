<template>
  <div class="video-detail-view">
    <!-- Main Layout -->
    <div class="layout-grid">
      <!-- Left Column (60%) -->
      <div class="left-column">
        <!-- Video Player Card -->
        <div class="card video-card">
          <div class="video-container">
            <div class="video-mockup">
              <!-- Face Detection Overlay -->
              <div class="face-detection-box">
                <div class="detection-label">FACE_MATCH 99.4%</div>
              </div>
            </div>
            
            <!-- Video Controls -->
            <div class="video-controls">
              <div class="controls-left">
                <button class="control-btn play-btn">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                </button>
                <button class="control-btn">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>
                </button>
                <span class="time-display">00:45 / 01:12</span>
              </div>
              <div class="controls-right">
                <span class="badge hd-badge">HD 720P</span>
                <button class="control-btn">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
                </button>
                <button class="control-btn">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path></svg>
                </button>
              </div>
            </div>
          </div>
          <div class="video-footer">
            <span class="recording-time">Recording: 28 Jul 2026, 08:15 AM</span>
            <a href="#" class="download-link">Unduh Video ↓</a>
          </div>
        </div>

        <!-- Timeline Kepatuhan Card -->
        <div class="card timeline-card">
          <div class="card-header">
            <div class="header-title">
              <svg xmlns="http://www.w3.org/2000/svg" class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
              <h3>Timeline Kepatuhan</h3>
            </div>
            <div class="filter-pill">
              <svg xmlns="http://www.w3.org/2000/svg" class="icon-small" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
              7 Hari Terakhir
            </div>
          </div>
          
          <div class="timeline-container">
            <div class="timeline-line"></div>
            <div class="timeline-nodes">
              <!-- Node 1 -->
              <div class="timeline-node">
                <div class="node-icon success">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                </div>
                <div class="node-date">Hari Ini</div>
                <div class="node-time">08:15 AM</div>
              </div>
              
              <!-- Node 2 -->
              <div class="timeline-node">
                <div class="node-icon success">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                </div>
                <div class="node-date">Kemarin</div>
                <div class="node-time">08:20 AM</div>
              </div>

              <!-- Node 3 -->
              <div class="timeline-node">
                <div class="node-icon success">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                </div>
                <div class="node-date">23 Okt</div>
                <div class="node-time">08:10 AM</div>
              </div>

              <!-- Node 4 -->
              <div class="timeline-node">
                <div class="node-icon warning">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
                </div>
                <div class="node-date">22 Okt</div>
                <div class="node-time manual-review-text">Manual Review</div>
              </div>

              <!-- Node 5 -->
              <div class="timeline-node">
                <div class="node-icon success">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                </div>
                <div class="node-date">21 Okt</div>
                <div class="node-time">08:30 AM</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Column (40%) -->
      <div class="right-column">
        <!-- Patient Info Card -->
        <div class="card patient-card">
          <div class="patient-header">
            <div class="avatar-placeholder"></div>
            <h2 class="patient-name">Ahmad Subarjo</h2>
            <div class="badge phase-badge">FASE INTENSIF</div>
            <div class="patient-id">ID: 8826-2911-3321</div>
          </div>
          
          <div class="divider"></div>
          
          <div class="patient-meta">
            <div class="meta-column">
              <div class="meta-label">PMO PENDAMPING</div>
              <div class="meta-user">
                <div class="meta-avatar avatar-teal">SA</div>
                <span class="meta-name">Ibu Surya</span>
              </div>
            </div>
            <div class="meta-column">
              <div class="meta-label">KADER</div>
              <div class="meta-user">
                <div class="meta-avatar avatar-gray">KW</div>
                <span class="meta-name">Kusuma Wardhana</span>
              </div>
            </div>
          </div>
          
          <div class="patient-stats">
            <div class="stat-box">
              <div class="stat-label">KEPATUHAN</div>
              <div class="stat-value">
                98%
                <svg xmlns="http://www.w3.org/2000/svg" class="trend-icon up" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>
              </div>
            </div>
            <div class="stat-box">
              <div class="stat-label">RISIKO PUTUS OBAT</div>
              <div class="badge risk-badge">LOW RISK</div>
            </div>
          </div>
        </div>

        <!-- Hasil Analisis AI Card -->
        <div class="card analysis-card">
          <div class="section-title">
            <svg xmlns="http://www.w3.org/2000/svg" class="icon-small" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
            HASIL ANALISIS AI
          </div>
          <div class="analysis-list">
            <div class="analysis-item">
              <div class="analysis-label">
                <svg xmlns="http://www.w3.org/2000/svg" class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
                Deteksi Wajah
              </div>
              <div class="badge success-badge">MATCH (99.4%)</div>
            </div>
            
            <div class="analysis-item">
              <div class="analysis-label">
                <svg xmlns="http://www.w3.org/2000/svg" class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="10" rx="5" ry="5"></rect><line x1="12" y1="7" x2="12" y2="17"></line></svg>
                Deteksi Obat
              </div>
              <div class="badge success-badge">VERIFIED</div>
            </div>

            <div class="analysis-item">
              <div class="analysis-label">
                <svg xmlns="http://www.w3.org/2000/svg" class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="22"></line></svg>
                Gerakan Menelan
              </div>
              <div class="badge success-badge">DETECTED</div>
            </div>

            <div class="analysis-item">
              <div class="analysis-label">
                <svg xmlns="http://www.w3.org/2000/svg" class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"></rect><line x1="7" y1="2" x2="7" y2="22"></line><line x1="17" y1="2" x2="17" y2="22"></line><line x1="2" y1="12" x2="22" y2="12"></line><line x1="2" y1="7" x2="7" y2="7"></line><line x1="2" y1="17" x2="7" y2="17"></line><line x1="17" y1="17" x2="22" y2="17"></line><line x1="17" y1="7" x2="22" y2="7"></line></svg>
                Kualitas Video
              </div>
              <div class="badge gray-badge">720P - CLEAR</div>
            </div>

            <div class="analysis-item">
              <div class="analysis-label">
                <svg xmlns="http://www.w3.org/2000/svg" class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                Status Keamanan
              </div>
              <div class="badge success-badge">NO TAMPERING</div>
            </div>
          </div>
        </div>

        <!-- Catatan Tenaga Kesehatan Card -->
        <div class="card notes-card">
          <div class="section-title">
            <svg xmlns="http://www.w3.org/2000/svg" class="icon-small" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
            CATATAN TENAGA KESEHATAN
          </div>
          <textarea class="notes-textarea" placeholder="Tambahkan catatan hasil verifikasi..."></textarea>
        </div>

        <!-- Action Buttons -->
        <div class="action-buttons">
          <button class="btn btn-approve">
            <svg xmlns="http://www.w3.org/2000/svg" class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
            SETUJUI VERIFIKASI
          </button>
          
          <div class="secondary-actions">
            <button class="btn btn-review">
              <svg xmlns="http://www.w3.org/2000/svg" class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12h4l2-9 5 18 2-9h5"></path></svg>
              REVIEW
            </button>
            <button class="btn btn-reject">
              <svg xmlns="http://www.w3.org/2000/svg" class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              TOLAK
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute, RouterLink } from 'vue-router'

// Get video ID from route params
const route = useRoute()
const videoId = route.params.id || '123'
</script>

<style scoped src="./VideoDetailView.css"></style>

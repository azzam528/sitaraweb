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
            <span class="recording-time">Recording: 25 Oct 2024, 08:15 AM</span>
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

<style scoped>
/* Base Variables & Typography */
.video-detail-view {
  --primary: #006591;
  --accent: #6DF5E1;
  --success: #22C55E;
  --warning: #F59E0B;
  --danger: #EF4444;
  --bg-color: #F8FAFC;
  --card-bg: #FFFFFF;
  --text-main: #1E293B;
  --text-muted: #64748B;
  --border-color: #E2E8F0;
  --border-radius: 12px;
  --shadow-soft: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);
  
  font-family: 'Inter', sans-serif;
  color: var(--text-main);
  background-color: var(--bg-color);
  min-height: 100vh;
  padding: 24px;
}

/* Icons */
.icon {
  width: 20px;
  height: 20px;
}
.icon-small {
  width: 16px;
  height: 16px;
}

/* Header */
.page-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 24px;
  font-size: 14px;
  font-weight: 500;
}
.back-link {
  display: flex;
  align-items: center;
  gap: 6px;
  color: var(--text-muted);
  text-decoration: none;
  transition: color 0.2s;
}
.back-link:hover {
  color: var(--primary);
}
.breadcrumb-separator {
  color: var(--text-muted);
}
.breadcrumb-current {
  color: var(--text-main);
  font-weight: 600;
}

/* Layout Grid */
.layout-grid {
  display: grid;
  grid-template-columns: 60% 1fr;
  gap: 24px;
  align-items: start;
}
@media (max-width: 1024px) {
  .layout-grid {
    grid-template-columns: 1fr;
  }
}

/* Cards Shared */
.card {
  background: var(--card-bg);
  border-radius: var(--border-radius);
  box-shadow: var(--shadow-soft);
  padding: 20px;
  margin-bottom: 24px;
  border: 1px solid var(--border-color);
}

/* --- Left Column: Video Player --- */
.video-card {
  padding: 16px;
  background-color: #0F172A; /* Dark background for video wrapper */
  border-color: #1E293B;
}
.video-container {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  background: linear-gradient(135deg, #1E293B 0%, #020617 100%);
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
.video-mockup {
  flex-grow: 1;
  position: relative;
}
.face-detection-box {
  position: absolute;
  top: 15%;
  left: 30%;
  width: 25%;
  height: 40%;
  border: 2px solid var(--success);
  border-radius: 8px;
}
.detection-label {
  position: absolute;
  bottom: -12px;
  left: -2px;
  background-color: var(--success);
  color: white;
  font-size: 10px;
  font-weight: 700;
  padding: 2px 6px;
  border-radius: 4px;
}
.video-controls {
  background-color: rgba(15, 23, 42, 0.9);
  padding: 12px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid rgba(255,255,255,0.1);
}
.controls-left, .controls-right {
  display: flex;
  align-items: center;
  gap: 16px;
}
.control-btn {
  background: none;
  border: none;
  color: #F8FAFC;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
  transition: opacity 0.2s;
}
.control-btn:hover {
  opacity: 0.8;
}
.control-btn svg {
  width: 20px;
  height: 20px;
}
.play-btn svg {
  width: 24px;
  height: 24px;
}
.time-display {
  color: #CBD5E1;
  font-size: 13px;
  font-family: monospace;
}
.badge.hd-badge {
  background-color: #334155;
  color: #F8FAFC;
  font-size: 11px;
}
.video-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 16px;
  padding: 0 4px;
}
.recording-time {
  color: #94A3B8;
  font-size: 13px;
}
.download-link {
  color: var(--accent);
  text-decoration: none;
  font-size: 14px;
  font-weight: 600;
}
.download-link:hover {
  text-decoration: underline;
}

/* --- Left Column: Timeline --- */
.timeline-card {
  /* Inherits card styles */
}
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}
.header-title {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--text-main);
}
.header-title h3 {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
}
.filter-pill {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  background-color: #F1F5F9;
  border-radius: 20px;
  font-size: 12px;
  color: var(--text-muted);
  font-weight: 500;
}
.timeline-container {
  position: relative;
  padding: 20px 0 10px 0;
}
.timeline-line {
  position: absolute;
  top: 44px; /* Center of nodes */
  left: 10%;
  right: 10%;
  height: 2px;
  background-color: #E2E8F0;
  z-index: 1;
}
.timeline-nodes {
  display: flex;
  justify-content: space-between;
  position: relative;
  z-index: 2;
}
.timeline-node {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  flex: 1;
  text-align: center;
}
.node-icon {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #FFFFFF;
}
.node-icon.success {
  border: 2px solid var(--success);
  color: var(--success);
}
.node-icon.warning {
  border: 2px solid var(--warning);
  color: var(--warning);
}
.node-icon svg {
  width: 24px;
  height: 24px;
}
.node-date {
  font-size: 13px;
  font-weight: 600;
  color: var(--text-main);
}
.node-time {
  font-size: 12px;
  color: var(--text-muted);
}
.manual-review-text {
  color: var(--danger);
  font-weight: 600;
}


/* --- Right Column: Patient Info --- */
.patient-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-bottom: 16px;
}
.avatar-placeholder {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: #E2E8F0;
  margin-bottom: 12px;
}
.patient-name {
  margin: 0 0 8px 0;
  font-size: 20px;
  font-weight: 700;
}
.badge {
  display: inline-flex;
  align-items: center;
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
}
.phase-badge {
  background-color: rgba(109, 245, 225, 0.2);
  color: #0D9488;
  margin-bottom: 8px;
}
.patient-id {
  font-size: 13px;
  color: var(--text-muted);
  font-family: monospace;
}
.divider {
  height: 1px;
  background-color: var(--border-color);
  margin: 16px 0;
}
.patient-meta {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}
.meta-column {
  flex: 1;
}
.meta-label {
  font-size: 11px;
  color: var(--text-muted);
  margin-bottom: 8px;
  font-weight: 600;
}
.meta-user {
  display: flex;
  align-items: center;
  gap: 8px;
}
.meta-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 600;
  color: white;
}
.avatar-teal {
  background-color: var(--primary);
}
.avatar-gray {
  background-color: #94A3B8;
}
.meta-name {
  font-size: 13px;
  font-weight: 500;
}
.patient-stats {
  display: flex;
  justify-content: space-between;
  background-color: #F8FAFC;
  padding: 12px 16px;
  border-radius: 8px;
}
.stat-box {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.stat-label {
  font-size: 11px;
  color: var(--text-muted);
  font-weight: 600;
}
.stat-value {
  font-size: 20px;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 4px;
}
.trend-icon {
  width: 16px;
  height: 16px;
}
.trend-icon.up {
  color: var(--success);
}
.risk-badge {
  background-color: rgba(34, 197, 94, 0.1);
  color: var(--success);
  align-self: flex-start;
  margin-top: 4px;
}

/* --- Right Column: Analysis Card --- */
.section-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  font-weight: 700;
  color: var(--text-muted);
  margin-bottom: 16px;
  letter-spacing: 0.5px;
}
.analysis-list {
  display: flex;
  flex-direction: column;
}
.analysis-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid var(--border-color);
}
.analysis-item:last-child {
  border-bottom: none;
  padding-bottom: 0;
}
.analysis-label {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 14px;
  font-weight: 500;
}
.analysis-label svg {
  color: var(--text-muted);
}
.success-badge {
  background-color: rgba(34, 197, 94, 0.1);
  color: var(--success);
}
.gray-badge {
  background-color: #F1F5F9;
  color: var(--text-muted);
}

/* --- Right Column: Notes Card --- */
.notes-textarea {
  width: 100%;
  min-height: 100px;
  padding: 12px;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  resize: vertical;
  font-family: inherit;
  font-size: 14px;
  outline: none;
  transition: border-color 0.2s;
  box-sizing: border-box;
}
.notes-textarea:focus {
  border-color: var(--primary);
}

/* --- Right Column: Action Buttons --- */
.action-buttons {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
}
.btn-icon {
  width: 18px;
  height: 18px;
}
.btn-approve {
  background: linear-gradient(135deg, var(--primary) 0%, #004D70 100%);
  color: white;
  width: 100%;
  padding: 16px;
  font-size: 16px;
  box-shadow: 0 4px 12px rgba(0, 101, 145, 0.2);
}
.btn-approve:hover {
  box-shadow: 0 6px 16px rgba(0, 101, 145, 0.3);
  transform: translateY(-1px);
}
.secondary-actions {
  display: flex;
  gap: 12px;
}
.btn-review {
  flex: 1;
  background-color: transparent;
  border: 2px solid var(--warning);
  color: var(--warning);
}
.btn-review:hover {
  background-color: rgba(245, 158, 11, 0.05);
}
.btn-reject {
  flex: 1;
  background-color: transparent;
  border: 2px solid var(--danger);
  color: var(--danger);
}
.btn-reject:hover {
  background-color: rgba(239, 68, 68, 0.05);
}

</style>

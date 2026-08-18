<template>
  <div class="video-list-view">
    <header class="page-header">
      <h1 class="page-title">AI Video Verification List</h1>
      <p class="page-subtitle">Kelola dan verifikasi video minum obat pasien dengan bantuan AI.</p>
    </header>

    <!-- 1. Statistic Cards Row -->
    <div class="stats-row">
      <!-- Card 1 -->
      <div class="stat-card">
        <div class="stat-icon-wrapper teal">
          <svg class="stat-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <polyline points="17 8 12 3 7 8"></polyline>
            <line x1="12" y1="3" x2="12" y2="15"></line>
          </svg>
        </div>
        <div class="stat-info">
          <span class="stat-label">VIDEO DIUNGGAH HARI INI</span>
          <span class="stat-value">18</span>
        </div>
      </div>

      <!-- Card 2 -->
      <div class="stat-card">
        <div class="stat-icon-wrapper success">
          <svg class="stat-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
        </div>
        <div class="stat-info">
          <span class="stat-label">BERHASIL DIVERIFIKASI AI</span>
          <span class="stat-value">15</span>
        </div>
      </div>

      <!-- Card 3 -->
      <div class="stat-card">
        <div class="stat-icon-wrapper primary">
          <svg class="stat-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
            <line x1="8" y1="21" x2="16" y2="21"></line>
            <line x1="12" y1="17" x2="12" y2="21"></line>
          </svg>
        </div>
        <div class="stat-info">
          <span class="stat-label">REVIEW MANUAL</span>
          <span class="stat-value">2</span>
        </div>
      </div>

      <!-- Card 4 -->
      <div class="stat-card">
        <div class="stat-icon-wrapper danger">
          <svg class="stat-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
            <line x1="12" y1="9" x2="12" y2="13"></line>
            <line x1="12" y1="17" x2="12.01" y2="17"></line>
          </svg>
        </div>
        <div class="stat-info">
          <span class="stat-label">GAGAL VERIFIKASI</span>
          <span class="stat-value">1</span>
        </div>
      </div>

      <!-- Card 5 -->
      <div class="stat-card">
        <div class="stat-icon-wrapper teal">
          <svg class="stat-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="20" x2="18" y2="10"></line>
            <line x1="12" y1="20" x2="12" y2="4"></line>
            <line x1="6" y1="20" x2="6" y2="14"></line>
          </svg>
        </div>
        <div class="stat-info">
          <span class="stat-label">RATA-RATA KEPERCAYAAN</span>
          <span class="stat-value">94.5%</span>
        </div>
      </div>
    </div>

    <!-- 2. Filter Section -->
    <section class="filter-section card">
      <div class="filter-header">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
        </svg>
        <h2>Filter Verifikasi Video AI</h2>
      </div>

      <div class="filter-grid-simple">
        <!-- 1. Search Name / NIK -->
        <div class="form-group">
          <label>Pencarian</label>
          <input 
            type="text" 
            placeholder="Cari Nama / NIK Pasien..." 
            class="form-control"
          />
        </div>

        <!-- 2. Status Verifikasi AI -->
        <div class="form-group">
          <label>Status Verifikasi AI</label>
          <select class="form-control">
            <option value="">Semua Status AI</option>
            <option value="Diverifikasi">Diverifikasi (Sukses)</option>
            <option value="Menunggu Tinjauan">Menunggu Tinjauan</option>
            <option value="Gagal">Gagal Verifikasi</option>
          </select>
        </div>
      </div>
    </section>

    <!-- 3. Verification Table -->
    <div class="table-card card">
      <div class="table-responsive">
        <table class="verification-table">
          <thead>
            <tr>
              <th>Pasien</th>
              <th>Waktu Unggah</th>
              <th>Skor AI</th>
              <th>Status Verifikasi</th>
              <th class="text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in tableData" :key="index">
              <td>
                <div class="patient-info">
                  <div class="avatar">{{ item.initials }}</div>
                  <span class="patient-name">{{ item.name }}</span>
                </div>
              </td>
              <td class="text-secondary">{{ item.time }}</td>
              <td>
                <div class="compliance-info">
                  <span class="compliance-text" :style="{ color: parseInt(item.score) >= 80 ? '#16A34A' : parseInt(item.score) >= 50 ? '#D97706' : '#DC2626' }">
                    {{ item.score }}
                  </span>
                  <div class="progress-bar-bg">
                    <div class="progress-bar-fill" :style="{ width: item.score, backgroundColor: parseInt(item.score) >= 80 ? '#16A34A' : parseInt(item.score) >= 50 ? '#D97706' : '#DC2626' }"></div>
                  </div>
                </div>
              </td>
              <td>
                <span class="status-badge" :class="{
                  'status-active': item.reviewStatus === 'Otomatis-Konfirmasi',
                  'status-dropped': item.reviewStatus === 'Ditolak',
                  'status-intensive': item.reviewStatus === 'Menunggu Tinjauan'
                }">
                  {{ item.reviewStatus }}
                </span>
              </td>
              <td class="actions relative text-center">
                <div class="action-dropdown-wrapper">
                  <button class="btn-more-actions" @click.stop="toggleDropdown(item.id)" title="Aksi">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <circle cx="12" cy="12" r="1"></circle>
                      <circle cx="19" cy="12" r="1"></circle>
                      <circle cx="5" cy="12" r="1"></circle>
                    </svg>
                  </button>
                  
                  <div v-if="activeDropdown === item.id" class="dropdown-menu-floating" @click.stop>
                    <button class="dropdown-item" @click="viewDetail(item.id); activeDropdown = null">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                      </svg>
                      <span>Lihat Detail</span>
                    </button>

                    <button class="dropdown-item" @click="sendMessage(item); activeDropdown = null">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                        <polyline points="22,6 12,13 2,6"></polyline>
                      </svg>
                      <span>Kirim Pesan</span>
                    </button>

                    <button class="dropdown-item text-danger" @click="deleteVerification(item); activeDropdown = null">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="3 6 5 6 21 6"></polyline>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                      </svg>
                      <span>Hapus</span>
                    </button>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <!-- 4. Pagination -->
      <div class="pagination-section">
        <span class="pagination-info">Menampilkan 1-10 dari 20 entri</span>
        <div class="pagination-controls">
          <button class="btn-page" disabled>Prev</button>
          <button class="btn-page active">1</button>
          <button class="btn-page">2</button>
          <button class="btn-page">Next</button>
        </div>
      </div>
    </div>

    <!-- 5. Bottom Section: Statistik Verifikasi AI -->
    <div class="stats-chart-section">
      <div class="stats-chart-card card">
        <div class="card-header">
          <div>
            <h2 class="card-title">Statistik Verifikasi AI (30 Hari Terakhir)</h2>
            <p class="card-subtitle">Perbandingan jumlah video verifikasi yang berhasil vs gagal per periode.</p>
          </div>
          <div class="stat-header-right">
            <div class="stat-big-num">18 <span class="stat-unit">Total Verifikasi</span></div>
            <div class="trend-badge">
              <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="18 15 12 9 6 15"></polyline>
              </svg>
              <span>+15.2% bulan ini</span>
            </div>
          </div>
        </div>

        <div class="css-bar-chart">
          <div class="chart-y-axis">
            <span>100%</span>
            <span>75%</span>
            <span>50%</span>
            <span>25%</span>
            <span>0%</span>
          </div>
          <div class="chart-area">
            <div class="grid-lines">
              <div class="grid-line"></div>
              <div class="grid-line"></div>
              <div class="grid-line"></div>
              <div class="grid-line"></div>
              <div class="grid-line"></div>
            </div>
            <div class="bar-group" v-for="(group, idx) in chartData" :key="idx">
              <div class="bars">
                <div class="bar-col bar-success" :style="{ height: group.success + '%' }" :title="'Berhasil: ' + group.success + '%'">
                  <span class="bar-val">{{ group.success }}%</span>
                </div>
                <div class="bar-col bar-fail" :style="{ height: group.fail + '%' }" :title="'Gagal: ' + group.fail + '%'">
                  <span class="bar-val">{{ group.fail }}%</span>
                </div>
              </div>
              <div class="bar-label">{{ group.label }}</div>
            </div>
          </div>
        </div>

        <div class="chart-legend">
          <span class="legend-item">
            <span class="legend-dot dot-success"></span> 
            Berhasil Verifikasi
          </span>
          <span class="legend-item">
            <span class="legend-dot dot-fail"></span> 
            Gagal Verifikasi
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./VideoListView.js"></script>

<style scoped src="./VideoListView.css"></style>

<template>
  <div class="treatment-list-page">
    <!-- 1. Page Header -->
    <header class="page-header">
      <div class="header-content">
        <h1 class="page-title">Pemantauan Obat</h1>
        <p class="page-subtitle">Pemantauan kepatuhan minum obat (PMO) pasien TB secara real-time.</p>
      </div>
    </header>

    <!-- 2. Statistic Cards Row -->
    <section class="stats-grid">
      <div class="stat-card" v-for="(stat, index) in statistics" :key="index">
        <div class="stat-icon-wrapper" :class="stat.circleClass" v-html="stat.icon"></div>
        <div class="stat-info">
          <span class="stat-label">{{ stat.title }}</span>
          <span class="stat-value">{{ stat.value }}</span>
        </div>
      </div>
    </section>

    <!-- 3. Filter Section -->
    <section class="filter-section card">
      <div class="filter-header">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
        </svg>
        <h2>Filter Pemantauan Pasien</h2>
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

        <!-- 2. Fase Pengobatan -->
        <div class="form-group">
          <label>Fase Pengobatan</label>
          <select class="form-control">
            <option value="">Semua Fase</option>
            <option value="Fase Awal">Fase Awal</option>
            <option value="Fase Intensif">Fase Intensif</option>
            <option value="Fase Lanjutan">Fase Lanjutan</option>
          </select>
        </div>

        <!-- 3. Status AI Risk -->
        <div class="form-group">
          <label>Status AI Risk</label>
          <select class="form-control">
            <option value="">Semua Status Risk</option>
            <option value="Risiko Tinggi">Risiko Tinggi</option>
            <option value="Risiko Sedang">Risiko Sedang</option>
            <option value="Risiko Rendah">Risiko Rendah</option>
          </select>
        </div>
      </div>
    </section>

    <!-- 4. Treatment Monitoring Table -->
    <div class="table-card card">
      <div class="table-responsive">
        <table class="data-table">
          <thead>
            <tr>
              <th>Nama Pasien</th>
              <th>Hari Perawatan</th>
              <th>Jadwal Hari ini</th>
              <th>Status Kepatuhan</th>
              <th>Progress Kepatuhan</th>
              <th>Tingkat Risiko</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="patient in patients" :key="patient.id">
              <td>
                <div class="patient-info">
                  <div class="avatar" :class="'avatar-' + patient.avatarColor">{{ patient.initials }}</div>
                  <div>
                    <div class="patient-name">{{ patient.name }}</div>
                    <div class="patient-kader">Kader: {{ patient.kader }}</div>
                  </div>
                </div>
              </td>
              <td>
                <div class="treatment-day">Hari {{ patient.day }}/180</div>
                <div class="treatment-phase">{{ patient.phase }}</div>
              </td>
              <td>
                <span class="schedule-pill">{{ patient.schedule }} WIB</span>
              </td>
              <td>
                <div class="status-indicator">
                  <span class="status-dot" :class="'bg-' + patient.statusColor"></span>
                  {{ patient.status }}
                </div>
              </td>
              <td>
                <div class="progress-wrapper">
                  <div class="progress-bar-container">
                    <div class="progress-bar" :class="'bg-' + patient.statusColor" :style="{ width: patient.progressPercentage + '%' }"></div>
                  </div>
                  <div class="progress-text">
                    <span :class="'text-' + patient.statusColor">{{ patient.progressPercentage }}%</span>
                    <span class="progress-days">{{ patient.progressDays }}/{{ patient.day }} hari</span>
                  </div>
                </div>
              </td>
              <td>
                <span class="status-badge" :class="getRiskBadgeClass(patient.risk)">{{ patient.risk }}</span>
              </td>
              <td class="text-center">
                <div class="action-dropdown-wrapper">
                  <button class="btn-more-actions" @click.stop="toggleDropdown(patient.id)" title="Aksi">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <circle cx="12" cy="12" r="1"></circle>
                      <circle cx="19" cy="12" r="1"></circle>
                      <circle cx="5" cy="12" r="1"></circle>
                    </svg>
                  </button>

                  <div v-if="activeDropdown === patient.id" class="dropdown-menu-floating" @click.stop>
                    <button class="dropdown-item" @click="viewDetail(patient.id); activeDropdown = null">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                      </svg>
                      <span>Lihat Detail</span>
                    </button>

                    <button class="dropdown-item" @click="sendMessage(patient); activeDropdown = null">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                        <polyline points="22,6 12,13 2,6"></polyline>
                      </svg>
                      <span>Kirim Pesan</span>
                    </button>

                    <button class="dropdown-item text-danger" @click="deleteRecord(patient); activeDropdown = null">
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

      <!-- 5. Pagination -->
      <div class="pagination-wrapper">
        <div class="pagination-info">Menampilkan 1-10 dari 20 pasien</div>
        <div class="pagination-controls">
          <button class="btn-page" disabled>Prev</button>
          <button class="btn-page active">1</button>
          <button class="btn-page">2</button>
          <button class="btn-page">Next</button>
        </div>
      </div>
    </div>

    <!-- 5. Visualizations Row (Tren Kepatuhan & Log Aktivitas Terbaru) -->
    <div class="bottom-row">
      <!-- Left: Tren Kepatuhan Mingguan -->
      <div class="chart-section card">
        <div class="chart-header flex justify-between items-start mb-4">
          <div>
            <h3 class="section-title mb-1">Tren Kepatuhan Mingguan</h3>
            <p class="section-subtitle">Persentase kepatuhan minum obat pasien TB dalam 7 hari terakhir.</p>
          </div>
          <div class="text-right">
            <div class="text-2xl font-bold" style="color: #1E293B;">87.8% <span class="text-xs font-normal" style="color: #64748B;">Rata-rata</span></div>
            <div class="text-xs font-semibold flex items-center justify-end gap-1 mt-0.5" style="color: #22C55E;">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"></polyline></svg>
              <span>+3.2% minggu ini</span>
            </div>
          </div>
        </div>
        
        <div class="area-chart-container flex">
          <div class="y-axis text-xs text-secondary flex flex-col justify-between pr-2">
            <span>100%</span>
            <span>75%</span>
            <span>50%</span>
            <span>25%</span>
            <span>0%</span>
          </div>
          <div class="chart-area-wrapper flex-1 relative">
            <div class="chart-grid-lines absolute inset-0 flex flex-col justify-between pointer-events-none">
              <div class="grid-line border-b border-dashed border-gray-200"></div>
              <div class="grid-line border-b border-dashed border-gray-200"></div>
              <div class="grid-line border-b border-dashed border-gray-200"></div>
              <div class="grid-line border-b border-dashed border-gray-200"></div>
              <div class="grid-line border-b border-dashed border-gray-200"></div>
            </div>
            
            <svg viewBox="0 0 480 160" class="w-full h-full relative z-10 overflow-visible">
              <defs>
                <linearGradient id="treatComplianceGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stop-color="#006591" stop-opacity="0.38" />
                  <stop offset="100%" stop-color="#006591" stop-opacity="0.02" />
                </linearGradient>
              </defs>
              
              <!-- Area fill under curve -->
              <path d="M 30 24 C 65 24, 65 36, 100 36 C 135 36, 135 12, 170 12 C 205 12, 205 48, 240 48 C 275 48, 275 24, 310 24 C 345 24, 345 16, 380 16 C 415 16, 415 8, 450 8 L 450 160 L 30 160 Z" fill="url(#treatComplianceGradient)" />
              
              <!-- Smooth Curve Line -->
              <path d="M 30 24 C 65 24, 65 36, 100 36 C 135 36, 135 12, 170 12 C 205 12, 205 48, 240 48 C 275 48, 275 24, 310 24 C 345 24, 345 16, 380 16 C 415 16, 415 8, 450 8" fill="none" stroke="#006591" stroke-width="3" stroke-linecap="round" />
              
              <!-- Points -->
              <g class="chart-point-group" v-for="(pt, i) in [
                {x: 30, y: 24, val: 85},
                {x: 100, y: 36, val: 78},
                {x: 170, y: 12, val: 92},
                {x: 240, y: 48, val: 70},
                {x: 310, y: 24, val: 85},
                {x: 380, y: 16, val: 90},
                {x: 450, y: 8, val: 95, active: true}
              ]" :key="i">
                <circle :cx="pt.x" :cy="pt.y" r="5" fill="#FFFFFF" stroke="#006591" stroke-width="3" class="chart-point cursor-pointer transition-transform hover:scale-125" />
                <circle v-if="pt.active" :cx="pt.x" :cy="pt.y" r="8" fill="none" stroke="#6DF5E1" stroke-width="2.5" class="animate-pulse" />
              </g>
            </svg>

            <!-- X Axis Labels -->
            <div class="x-axis-row flex justify-between px-4 mt-2 text-xs text-secondary font-medium" style="margin-left: 20px; margin-right: 15px;">
              <span v-for="pt in ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min']" :key="pt" :class="{ 'text-primary font-bold': pt === 'Min' }">{{ pt }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Right: Log Aktivitas Terbaru & Peringatan -->
      <div class="alerts-section card">
        <div class="alerts-header mb-3">
           <h3 class="section-title mb-1">Log Aktivitas Terbaru</h3>
           <p class="section-subtitle mb-0">Aktivitas dan intervensi pasien terkini:</p>
        </div>
        
        <div class="alerts-list">
          <div v-for="alert in alerts" :key="alert.id" class="alert-item" :class="'alert-' + alert.type">
            <div class="alert-icon-wrapper">
              <svg v-if="alert.type === 'danger'" class="icon alert-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
              <svg v-else class="icon alert-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                <line x1="12" y1="9" x2="12" y2="13"></line>
                <line x1="12" y1="17" x2="12.01" y2="17"></line>
              </svg>
            </div>
            <div class="alert-content">
              <div class="alert-name">{{ alert.name }}</div>
              <div class="alert-desc">{{ alert.desc }}</div>
            </div>
            <button class="btn-action-text" :class="'text-' + alert.type">{{ alert.action }}</button>
          </div>
        </div>
        
        <button class="btn btn-outline btn-block mt-4">Tampilkan Semua Log (8)</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter, RouterLink } from 'vue-router'

const router = useRouter();
const activeDropdown = ref(null);

const toggleDropdown = (id) => {
  activeDropdown.value = activeDropdown.value === id ? null : id;
};

const handleDocumentClick = () => {
  activeDropdown.value = null;
};

onMounted(() => {
  document.addEventListener('click', handleDocumentClick);
});

onUnmounted(() => {
  document.removeEventListener('click', handleDocumentClick);
});

const viewDetail = (id) => {
  router.push(`/dashboard/treatments/${id}`);
};

const sendMessage = (patient) => {
  alert(`Mengirim pesan / pengingat ke ${patient.name}`);
};

const deleteRecord = (patient) => {
  if (confirm(`Apakah Anda yakin ingin menghapus record pemantauan ${patient.name}?`)) {
    patients.value = patients.value.filter(p => p.id !== patient.id);
  }
};

const statistics = ref([
  {
    title: 'TERKONFIRMASI HARI INI',
    value: '18',
    circleClass: 'teal-circle',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>`
  },
  {
    title: 'MENUNGGU KONFIRMASI',
    value: '2',
    circleClass: 'orange-circle',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>`
  },
  {
    title: 'DOSIS TERLAMBAT',
    value: '1',
    circleClass: 'red-circle',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>`
  },
  {
    title: 'KEPATUHAN MINGGUAN',
    value: '94.2%',
    circleClass: 'green-circle',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect></svg>`
  },
  {
    title: 'RISIKO TINGGI',
    value: '1',
    circleClass: 'red-circle',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>`
  }
])

const getRiskBadgeClass = (risk) => {
  if (!risk) return 'status-low';
  const r = risk.toLowerCase();
  if (r.includes('tinggi')) return 'status-high';
  if (r.includes('sedang')) return 'status-medium';
  return 'status-low';
};

const patients = ref([
  {
    id: 1, initials: 'BS', avatarColor: 'teal', name: 'Bambang Sugiyono', kader: 'Siti Ayu',
    day: 45, phase: 'Fase Intensif', schedule: '08:00',
    status: 'Dikonfirmasi', statusColor: 'success',
    progressPercentage: 92, progressDays: 42,
    risk: 'Risiko Rendah'
  },
  {
    id: 2, initials: 'RM', avatarColor: 'gray', name: 'Ratna Mutia', kader: 'Agus Pratama',
    day: 12, phase: 'Fase Intensif', schedule: '07:00',
    status: 'Telat', statusColor: 'warning',
    progressPercentage: 75, progressDays: 9,
    risk: 'Risiko Sedang'
  },
  {
    id: 3, initials: 'DW', avatarColor: 'danger', name: 'Dedi Wijaya', kader: 'Siti Ayu',
    day: 88, phase: 'Fase Lanjutan', schedule: '19:00',
    status: 'Ketinggalan', statusColor: 'danger',
    progressPercentage: 45, progressDays: 40,
    risk: 'Risiko Tinggi'
  },
  {
    id: 4, initials: 'AS', avatarColor: 'primary', name: 'Ani Sulastri', kader: 'Agus Pratama',
    day: 156, phase: 'Fase Lanjutan', schedule: '08:00',
    status: 'Dikonfirmasi', statusColor: 'success',
    progressPercentage: 98, progressDays: 153,
    risk: 'Risiko Rendah'
  }
])

const chartData = ref([
  { label: 'Sen', value: 92 },
  { label: 'Sel', value: 94 },
  { label: 'Rab', value: 95 },
  { label: 'Kam', value: 90 },
  { label: 'Jum', value: 85 },
  { label: 'Sab', value: 98 },
  { label: 'Min', value: 96 }
])

const alerts = ref([
  { id: 1, type: 'danger', name: 'Dedi Wijaya', desc: 'Terlewat 3 dosis berturut-turut', action: 'TELEPON KADER' },
  { id: 2, type: 'danger', name: 'Mulyono Santoso', desc: 'Efek samping yang dilaporkan: Muntah', action: 'ATUR KONSULTASI' },
  { id: 3, type: 'warning', name: 'Siti Khotimah', desc: 'Dosis terlambat terdeteksi (4 jam)', action: 'CEK STATUS' }
])
</script>

<style scoped>
/* Colors */
:root {
  --primary: #006591;
  --accent: #6DF5E1;
  --success: #22C55E;
  --warning: #F59E0B;
  --danger: #EF4444;
  --bg-color: #F8FAFC;
  --card-bg: #FFFFFF;
  --text-dark: #1E293B;
  --text-muted: #64748B;
  --border-color: #E2E8F0;
}

.treatment-list-page {
  font-family: 'Inter', sans-serif;
  color: #1E293B; /* text-dark */
  background-color: #F8FAFC;
  min-height: 100vh;
  padding: 1.5rem;
}

/* Base Styles */
.card {
  background: #FFFFFF;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05), 0 1px 2px rgba(0,0,0,0.03);
  padding: 1.25rem;
  margin-bottom: 1.5rem;
  border: 1px solid #E2E8F0;
}

.icon {
  width: 1.25rem;
  height: 1.25rem;
  display: inline-block;
  vertical-align: middle;
}

/* Utilities */
.text-success { color: #22C55E; }
.text-warning { color: #F59E0B; }
.text-danger { color: #EF4444; }
.text-dark { color: #1E293B; }
.bg-success { background-color: #22C55E; }
.bg-warning { background-color: #F59E0B; }
.bg-danger { background-color: #EF4444; }

/* Header */
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}
.page-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0 0 0.25rem;
}
.page-subtitle {
  color: #64748B;
  margin: 0;
  font-size: 0.875rem;
}
.header-actions {
  display: flex;
  gap: 0.75rem;
}

/* Buttons */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-weight: 500;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s;
  border: 1px solid transparent;
}
.btn-primary {
  background-color: #006591;
  color: white;
}
.btn-primary:hover { background-color: #005378; }
.btn-outline {
  background-color: white;
  border-color: #E2E8F0;
  color: #1E293B;
}
.btn-outline:hover { background-color: #F8FAFC; }
.btn-icon { padding: 0.5rem; }
.btn-block { width: 100%; }

/* Stats Grid */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  margin-bottom: 1.5rem;
}
.stat-card {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 16px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
}
.stat-icon-wrapper {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.teal-circle { background-color: #E0F2FE; color: #0284C7; }
.green-circle { background-color: #DCFCE7; color: #16A34A; }
.orange-circle { background-color: #FEF3C7; color: #D97706; }
.red-circle { background-color: #FEE2E2; color: #DC2626; }

.stat-info {
  display: flex;
  flex-direction: column;
}
.stat-label {
  font-size: 11px;
  font-weight: 600;
  color: #64748b;
  margin-bottom: 4px;
  text-transform: uppercase;
}
.stat-value {
  font-size: 24px;
  font-weight: 700;
  color: #0f172a;
}

/* Filters */
.filter-section {
  padding: 20px;
}
.filter-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
  color: #334155;
}
.filter-header h2 {
  font-size: 16px;
  font-weight: 600;
  margin: 0;
}
.filter-grid-simple {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}
@media (max-width: 768px) {
  .filter-grid-simple { grid-template-columns: 1fr; }
}
.form-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.form-group label {
  font-size: 13px;
  font-weight: 500;
  color: #475569;
}
.form-control {
  padding: 8px 12px;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  font-size: 14px;
  outline: none;
  transition: border-color 0.2s;
  background-color: #fff;
  color: #334155;
}
.form-control:focus {
  border-color: #006591;
}

/* Table */
.table-card { padding: 0; overflow: hidden; }
.table-responsive { overflow-x: auto; }
.data-table {
  width: 100%;
  border-collapse: collapse;
}
.data-table th {
  background-color: #F8FAFC;
  color: #64748B;
  font-size: 0.75rem;
  font-weight: 600;
  text-align: left;
  padding: 0.75rem 1.25rem;
  border-bottom: 1px solid #E2E8F0;
  text-transform: uppercase;
}
.data-table td {
  padding: 1rem 1.25rem;
  border-bottom: 1px solid #E2E8F0;
  vertical-align: middle;
}
.patient-info {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}
.action-dropdown-wrapper {
  position: relative;
  display: inline-block;
}

.btn-more-actions {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 8px;
  background-color: #F1F5F9;
  color: #334155;
  border: 1px solid #E2E8F0;
  cursor: pointer;
  transition: all 0.15s ease;
}

.btn-more-actions:hover {
  background-color: #E2E8F0;
  color: #0F172A;
  border-color: #CBD5E1;
}

.dropdown-menu-floating {
  position: absolute;
  right: 0;
  top: 100%;
  margin-top: 6px;
  min-width: 160px;
  background-color: #0F172A;
  border: 1px solid #334155;
  border-radius: 10px;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.3), 0 8px 10px -6px rgba(0, 0, 0, 0.3);
  padding: 6px;
  z-index: 100;
  text-align: left;
}

.dropdown-item {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  padding: 8px 12px;
  border-radius: 6px;
  background: transparent;
  border: none;
  color: #F8FAFC;
  font-size: 0.8125rem;
  font-weight: 500;
  font-family: inherit;
  cursor: pointer;
  transition: background-color 0.15s ease;
}

.dropdown-item:hover {
  background-color: rgba(255, 255, 255, 0.1);
  color: #FFFFFF;
}

.dropdown-item.text-danger {
  color: #F87171;
}

.dropdown-item.text-danger:hover {
  background-color: rgba(239, 68, 68, 0.15);
  color: #EF4444;
}
.avatar-teal { background-color: #14B8A6; }
.avatar-gray { background-color: #94A3B8; }
.avatar-danger { background-color: #EF4444; }
.avatar-primary { background-color: #006591; }
.patient-name { font-weight: 600; font-size: 0.875rem; }
.patient-kader { font-size: 0.75rem; color: #64748B; margin-top: 0.125rem; }
.treatment-day { font-weight: 500; font-size: 0.875rem; }
.treatment-phase { font-size: 0.75rem; color: #64748B; }
.schedule-pill {
  display: inline-block;
  padding: 0.25rem 0.5rem;
  background-color: #F1F5F9;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 500;
  color: #475569;
}
.status-indicator {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
}
.status-dot {
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
}
.progress-wrapper { display: flex; flex-direction: column; gap: 0.25rem; }
.progress-bar-container {
  height: 0.5rem;
  background-color: #F1F5F9;
  border-radius: 9999px;
  overflow: hidden;
}
.progress-bar { height: 100%; border-radius: 9999px; }
.progress-text {
  display: flex;
  justify-content: space-between;
  font-size: 0.75rem;
  font-weight: 600;
}
.progress-days { color: #64748B; font-weight: 400; }
.status-badge {
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 600;
  display: inline-block;
}
.status-high {
  background-color: #FEE2E2;
  color: #DC2626;
}
.status-medium {
  background-color: #FEF3C7;
  color: #D97706;
}
.status-low {
  background-color: #DCFCE7;
  color: #16A34A;
}

.text-center {
  text-align: center;
}
.action-dropdown-wrapper {
  position: relative;
  display: inline-block;
}
.btn-more-actions {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 8px;
  background-color: #F1F5F9;
  color: #334155;
  border: 1px solid #E2E8F0;
  cursor: pointer;
  transition: all 0.15s ease;
}
.btn-more-actions:hover {
  background-color: #E2E8F0;
  color: #0F172A;
  border-color: #CBD5E1;
}
.dropdown-menu-floating {
  position: absolute;
  right: 0;
  top: 100%;
  margin-top: 6px;
  min-width: 160px;
  background-color: #0F172A;
  border: 1px solid #334155;
  border-radius: 10px;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.3), 0 8px 10px -6px rgba(0, 0, 0, 0.3);
  padding: 6px;
  z-index: 100;
  text-align: left;
}

.risk-text { font-size: 0.75rem; font-weight: 700; }
.btn-action {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 1px solid #e2e8f0;
  background: white;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: #64748b;
  text-decoration: none;
  transition: all 0.2s;
}
.btn-action:hover {
  background: #f8fafc;
  color: #006591;
  border-color: #cbd5e1;
}

/* Pagination */
.pagination-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.25rem;
  background: white;
  border-top: 1px solid #E2E8F0;
  flex-wrap: wrap;
  gap: 16px;
}
.pagination-info { font-size: 0.875rem; color: #64748B; }
.pagination-controls { display: flex; gap: 6px; align-items: center; }
.btn-page {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 38px;
  height: 38px;
  padding: 0 14px;
  border: 1px solid #E2E8F0;
  background-color: #FFFFFF;
  color: #006591;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s ease;
}
.btn-page:hover:not(:disabled):not(.active) {
  background-color: #F8FAFC;
  border-color: #CBD5E1;
}
.btn-page:disabled {
  color: #94A3B8;
  border-color: #E2E8F0;
  background-color: #FFFFFF;
  cursor: not-allowed;
  opacity: 0.75;
}
.btn-page.active {
  background-color: #006591;
  color: #FFFFFF;
  border-color: #006591;
  font-weight: 600;
}
.page-ellipsis {
  color: #006591;
  font-size: 14px;
  font-weight: 500;
  padding: 0 6px;
}

/* Bottom Row */
.bottom-row {
  display: flex;
  gap: 1.5rem;
}
.chart-section { flex: 0 0 55%; margin-bottom: 0; }
.alerts-section { flex: 0 0 calc(45% - 1.5rem); margin-bottom: 0; }
.section-title { font-size: 1.125rem; font-weight: 600; margin: 0 0 1.25rem 0; }
.section-subtitle { font-size: 0.875rem; color: #64748B; margin: -1rem 0 1rem 0; }

/* Area Chart */
.area-chart-container {
  height: 220px;
}
.area-chart-container .y-axis {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-bottom: 24px;
  color: #64748B;
  font-size: 0.75rem;
  width: 36px;
}
.chart-area {
  flex-grow: 1;
  position: relative;
}
.grid-lines {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.grid-line {
  border-top: 1px dashed #E2E8F0;
  width: 100%;
}
.bars {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  display: flex;
  justify-content: space-around;
  padding: 0 1rem;
}
.bar-group {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  position: relative;
}
.bar-wrapper {
  flex-grow: 1;
  width: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding-bottom: 25px; /* space for x-label */
}
.bar {
  width: 32px;
  background: linear-gradient(to top, #006591, #0087c2);
  border-radius: 4px 4px 0 0;
  position: relative;
  transition: height 0.3s ease;
}
.bar:hover .bar-tooltip { opacity: 1; }
.bar-tooltip {
  position: absolute;
  top: -28px;
  left: 50%;
  transform: translateX(-50%);
  background: #1E293B;
  color: white;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 0.75rem;
  opacity: 0;
  transition: opacity 0.2s;
  pointer-events: none;
}
.x-label {
  position: absolute;
  bottom: 0;
  font-size: 0.75rem;
  color: #64748B;
}

/* Alerts */
.alerts-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}
.alert-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  border-radius: 8px;
}
.alert-danger { background-color: #FEF2F2; }
.alert-warning { background-color: #FFFBEB; }
.alert-icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
}
.alert-danger .alert-icon { color: #EF4444; }
.alert-warning .alert-icon { color: #F59E0B; }
.alert-content { flex-grow: 1; }
.alert-name { font-weight: 600; font-size: 0.875rem; margin-bottom: 0.125rem; }
.alert-desc { font-size: 0.75rem; color: #64748B; }
.btn-action-text {
  background: transparent;
  border: none;
  font-weight: 700;
  font-size: 0.75rem;
  cursor: pointer;
  white-space: nowrap;
}
.btn-action-text:hover { text-decoration: underline; }

/* Responsive adjustments */
@media (max-width: 1200px) {
  .stats-grid { grid-template-columns: repeat(3, 1fr); }
  .filter-grid { grid-template-columns: 1fr 1fr; }
  .bottom-row { flex-direction: column; }
}
@media (max-width: 768px) {
  .stats-grid { grid-template-columns: 1fr; }
  .filter-grid { grid-template-columns: 1fr; }
  .page-header { flex-direction: column; align-items: flex-start; gap: 1rem; }
}
</style>

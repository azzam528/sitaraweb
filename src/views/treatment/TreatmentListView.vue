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

<style scoped src="./TreatmentListView.css"></style>

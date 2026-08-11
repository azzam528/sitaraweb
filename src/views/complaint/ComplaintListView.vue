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
  router.push(`/dashboard/complaints/${id}`);
};

const sendReply = (item) => {
  alert(`Kirim pesan balasan keluhan ke ${item.patientName}`);
};

const deleteComplaint = (item) => {
  if (confirm(`Apakah Anda yakin ingin menghapus laporan keluhan ${item.complaintName}?`)) {
    complaints.value = complaints.value.filter(c => c.id !== item.id);
  }
};

// Dummy Data
const stats = ref([
  { id: 1, label: 'KELUHAN HARI INI', value: 3, icon: 'chat-bubble', circleClass: 'teal-circle' },
  { id: 2, label: 'BELUM DITINDAK', value: 1, icon: 'exclamation', circleClass: 'red-circle' },
  { id: 3, label: 'PRIORITAS TINGGI', value: 1, icon: 'alert-triangle', circleClass: 'orange-circle' },
  { id: 4, label: 'SEDANG DIPROSES', value: 1, icon: 'refresh', circleClass: 'teal-circle' },
  { id: 5, label: 'SELESAI', value: 1, icon: 'check-circle', circleClass: 'green-circle' }
])

const complaints = ref([
  {
    id: 1,
    patientName: 'Budi Kusuma',
    initials: 'BK',
    avatarColor: '#f87171',
    nik: '327504***',
    time: '08:15 WIB, 28 Jul 2026',
    complaintName: 'Sesak Napas Berat',
    severity: 'BERAT',
    status: 'Urgent'
  },
  {
    id: 2,
    patientName: 'Surya Ardi',
    initials: 'SA',
    avatarColor: '#14b8a6',
    nik: '327508***',
    time: '09:45 WIB, 28 Jul 2026',
    complaintName: 'Mual & Muntah',
    severity: 'SEDANG',
    status: 'Normal'
  },
  {
    id: 3,
    patientName: 'Rudi Prasetyo',
    initials: 'RP',
    avatarColor: '#9ca3af',
    nik: '327501***',
    time: '11:20 WIB, 27 Jul 2026',
    complaintName: 'Demam Ringan',
    severity: 'RINGAN',
    status: 'Diproses'
  },
  {
    id: 4,
    patientName: 'Ahmad Fauzi',
    initials: 'AF',
    avatarColor: '#14b8a6',
    nik: '327503***',
    time: '13:00 WIB, 27 Jul 2026',
    complaintName: 'Ruam Kulit',
    severity: 'SEDANG',
    status: 'Normal'
  },
  {
    id: 5,
    patientName: 'Dewi Lestari',
    initials: 'DL',
    avatarColor: '#f87171',
    nik: '327507***',
    time: '14:30 WIB, 26 Jul 2026',
    complaintName: 'Pusing Berkepanjangan',
    severity: 'BERAT',
    status: 'Urgent'
  }
])

const chartData = ref([
  { day: 'Sen', height: 40, count: 8, active: false },
  { day: 'Sel', height: 60, count: 12, active: false },
  { day: 'Rab', height: 30, count: 6, active: false },
  { day: 'Kam', height: 85, count: 17, active: true },
  { day: 'Jum', height: 50, count: 10, active: false },
  { day: 'Sab', height: 20, count: 4, active: false },
  { day: 'Min', height: 10, count: 2, active: false }
])

const distributionData = ref([
  { label: 'Efek Samping Obat (ESO)', percent: 65, color: '#006591' },
  { label: 'Kondisi Klinis (Penyakit)', percent: 25, color: '#006591' },
  { label: 'Logistik / Stok Obat', percent: 10, color: '#ef4444' }
])
</script>

<template>
  <div class="complaint-list">
    <!-- Header -->
    <header class="page-header">
      <h1>Daftar Keluhan Pasien</h1>
      <p>Monitoring keluhan klinis real-time untuk penanganan TB terintegrasi.</p>
    </header>

    <!-- Stats -->
    <div class="stats-row">
      <div v-for="stat in stats" :key="stat.id" class="stat-card">
        <div class="stat-icon-wrapper" :class="stat.circleClass">
          <!-- Icons -->
          <svg v-if="stat.icon === 'chat-bubble'" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
          <svg v-if="stat.icon === 'exclamation'" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
          <svg v-if="stat.icon === 'alert-triangle'" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
          <svg v-if="stat.icon === 'refresh'" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 4 23 10 17 10"></polyline><polyline points="1 20 1 14 7 14"></polyline><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path></svg>
          <svg v-if="stat.icon === 'check-circle'" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
        </div>
        <div class="stat-info">
          <span class="stat-label">{{ stat.label }}</span>
          <span class="stat-value">{{ stat.value }}</span>
        </div>
      </div>
    </div>

    <!-- Filter Section -->
    <section class="filter-section card">
      <div class="filter-header">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
        </svg>
        <h2>Filter Keluhan Pasien</h2>
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

        <!-- 2. Kategori Keluhan -->
        <div class="form-group">
          <label>Kategori Keluhan</label>
          <select class="form-control">
            <option value="">Semua Kategori</option>
            <option value="eso">Efek Samping Obat (ESO)</option>
            <option value="klinis">Kondisi Klinis</option>
            <option value="logistik">Logistik / Stok Obat</option>
          </select>
        </div>

        <!-- 3. Tingkat Keparahan -->
        <div class="form-group">
          <label>Tingkat Keparahan</label>
          <select class="form-control">
            <option value="">Semua Keparahan</option>
            <option value="BERAT">BERAT (Urgent)</option>
            <option value="SEDANG">SEDANG (Normal)</option>
            <option value="RINGAN">RINGAN (Diproses)</option>
          </select>
        </div>
      </div>
    </section>

    <!-- Table -->
    <div class="table-card card">
      <h2 class="card-title">Monitoring Real-Time</h2>
      <div class="table-responsive">
        <table class="complaint-table">
          <thead>
            <tr>
              <th>PASIEN</th>
              <th>WAKTU</th>
              <th>JENIS KELUHAN</th>
              <th>STATUS</th>
              <th>AKSI</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in complaints" :key="item.id">
              <td>
                <div class="patient-cell">
                  <div class="avatar" :style="{ backgroundColor: item.avatarColor }">
                    {{ item.initials }}
                  </div>
                  <div class="patient-info">
                    <span class="patient-name">{{ item.patientName }}</span>
                    <span class="patient-nik">NIK: {{ item.nik }}</span>
                  </div>
                </div>
              </td>
              <td><span class="time-text">{{ item.time }}</span></td>
              <td>
                <div class="complaint-cell">
                  <span class="complaint-name">{{ item.complaintName }}</span>
                  <span class="badge" :class="'badge-' + item.severity.toLowerCase()">
                    {{ item.severity }}
                  </span>
                </div>
              </td>
              <td>
                <span class="status-pill" :class="'status-' + item.status.toLowerCase()">
                  <span class="status-dot"></span>
                  {{ item.status }}
                </span>
              </td>
              <td class="text-center relative">
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

                    <button class="dropdown-item" @click="sendReply(item); activeDropdown = null">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                        <polyline points="22,6 12,13 2,6"></polyline>
                      </svg>
                      <span>Kirim Balasan</span>
                    </button>

                    <button class="dropdown-item text-danger" @click="deleteComplaint(item); activeDropdown = null">
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

      <!-- Pagination -->
      <div class="pagination-container">
        <span class="pagination-info">Menampilkan 1-5 dari 5 entri</span>
        <div class="pagination-controls">
          <button class="btn-page" disabled>Prev</button>
          <button class="btn-page active">1</button>
          <button class="btn-page">Next</button>
        </div>
      </div>
    </div>

    <!-- Bottom Row -->
    <div class="bottom-row">
      <!-- Chart Card -->
      <div class="chart-card card">
        <div class="chart-header flex justify-between items-start mb-4">
          <div>
            <h3 class="card-title">Tren Keluhan Mingguan</h3>
            <p class="text-xs text-secondary mt-1">Jumlah laporan keluhan pasien per hari</p>
          </div>
          <div class="text-right">
            <div class="text-2xl font-bold" style="color: #1E293B;">59 <span class="text-xs font-normal" style="color: #64748B;">Laporan Keluhan</span></div>
            <div class="text-xs font-semibold flex items-center justify-end gap-1 mt-0.5" style="color: #22C55E;">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"></polyline></svg>
              <span>+12.5% minggu ini</span>
            </div>
          </div>
        </div>
        
        <div class="area-chart-container">
          <div class="y-axis text-xs text-secondary flex flex-col justify-between pr-2">
            <span>20</span>
            <span>15</span>
            <span>10</span>
            <span>5</span>
            <span>0</span>
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
                <linearGradient id="complaintAreaGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stop-color="#006591" stop-opacity="0.4" />
                  <stop offset="100%" stop-color="#006591" stop-opacity="0.02" />
                </linearGradient>
              </defs>
              
              <!-- Area fill under curve -->
              <path d="M 30 100 C 65 100, 65 68, 100 68 C 135 68, 135 116, 170 116 C 205 116, 205 28, 240 28 C 275 28, 275 84, 310 84 C 345 84, 345 132, 380 132 C 415 132, 415 148, 450 148 L 450 160 L 30 160 Z" fill="url(#complaintAreaGradient)" />
              
              <!-- Smooth Curve Line -->
              <path d="M 30 100 C 65 100, 65 68, 100 68 C 135 68, 135 116, 170 116 C 205 116, 205 28, 240 28 C 275 28, 275 84, 310 84 C 345 84, 345 132, 380 132 C 415 132, 415 148, 450 148" fill="none" stroke="#006591" stroke-width="3" stroke-linecap="round" />
              
              <!-- Data Points with Tooltips -->
              <g class="chart-point-group" v-for="(pt, i) in [
                {x: 30, y: 100, day: 'Sen', val: 8},
                {x: 100, y: 68, day: 'Sel', val: 12},
                {x: 170, y: 116, day: 'Rab', val: 6},
                {x: 240, y: 28, day: 'Kam', val: 17, active: true},
                {x: 310, y: 84, day: 'Jum', val: 10},
                {x: 380, y: 132, day: 'Sab', val: 4},
                {x: 450, y: 148, day: 'Min', val: 2}
              ]" :key="i">
                <circle :cx="pt.x" :cy="pt.y" r="5" fill="#FFFFFF" stroke="#006591" stroke-width="3" class="chart-point cursor-pointer transition-transform hover:scale-125" />
                <circle v-if="pt.active" :cx="pt.x" :cy="pt.y" r="8" fill="none" stroke="#6DF5E1" stroke-width="2.5" class="animate-pulse" />
              </g>
            </svg>

            <!-- X Axis Labels -->
            <div class="x-axis-row flex justify-between px-4 mt-2 text-xs text-secondary font-medium" style="margin-left: 20px; margin-right: 15px;">
              <span v-for="pt in ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min']" :key="pt" :class="{ 'text-primary font-bold': pt === 'Kam' }">{{ pt }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Distribution Card -->
      <div class="distribution-card card">
        <h3 class="card-title">Distribusi Keluhan</h3>
        <div class="distribution-list">
          <div v-for="(item, index) in distributionData" :key="index" class="dist-item">
            <div class="dist-header">
              <span class="dist-label">{{ item.label }}</span>
              <span class="dist-percent">{{ item.percent }}%</span>
            </div>
            <div class="dist-progress-bg">
              <div class="dist-progress-fill" :style="{ width: item.percent + '%', backgroundColor: item.color }"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped src="./ComplaintListView.css"></style>

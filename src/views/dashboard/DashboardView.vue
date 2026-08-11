<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import mobiledoctorIMG from '@/assets/images/mobile-doctor.png';

const router = useRouter();

const goToPatients = () => router.push('/dashboard/patients');
const goToNewPatient = () => router.push('/dashboard/patients/add');
const goToReports = () => router.push('/dashboard/reports');
const goToMedicines = () => router.push('/dashboard/medicines');
const goToPatientDetail = (id) => router.push(`/dashboard/patients/${id}`);

const patientStats = ref([
  {
    label: 'Pasien Aktif',
    value: '20',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>`,
    color: '#006591',
    bgColor: '#e6f0f4'
  },
  {
    label: 'Kepatuhan Obat',
    value: '94.2%',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect><polyline points="9 14 11 16 15 11"></polyline></svg>`,
    color: '#22C55E',
    bgColor: '#dcfce7'
  },
  {
    label: 'Risiko Tinggi',
    value: '1',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>`,
    color: '#EF4444',
    bgColor: '#fee2e2'
  },
  {
    label: 'Keluhan Hari Ini',
    value: '8',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>`,
    color: '#F59E0B',
    bgColor: '#fef3c7'
  },
  {
    label: 'Stok OAT Kritis',
    value: '3 Items',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="16.5" y1="9.4" x2="7.5" y2="4.21"></line><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>`,
    color: '#EF4444',
    bgColor: '#fee2e2'
  }
]);

const riskPatients = ref([
  { id: 1, name: 'Sumardi', level: 'Risiko Tinggi', reason: 'Mangkir >3 hari', levelColor: 'danger' },
  { id: 2, name: 'Budi Santoso', level: 'Risiko Sedang', reason: 'Efek Samping Berat', levelColor: 'warning' },
  { id: 3, name: 'Agus Salim', level: 'Risiko Tinggi', reason: 'Lokasi Tidak Terdeteksi', levelColor: 'danger' }
]);

const aiVerificationRecent = ref([
  { id: 1, name: 'Indra W.', time: '09:42', status: '96% Match', statusClass: 'success' },
  { id: 2, name: 'Ratna Sari', time: '09:35', status: '95% Match', statusClass: 'success' },
  { id: 3, name: 'Dwi Cahyo', time: '09:12', status: 'Verifying...', statusClass: 'primary' }
]);

const complianceTrend = ref([
  { day: 'Sen', height: 75 },
  { day: 'Sel', height: 85 },
  { day: 'Rab', height: 95 },
  { day: 'Kam', height: 60 },
  { day: 'Jum', height: 80 },
  { day: 'Sab', height: 90 },
  { day: 'Min', height: 98 }
]);

const recentActivities = ref([
  { id: 1, text: 'Ahmad Subarjo berhasil verifikasi dosis pagi.', time: '2 menit yang lalu', type: 'primary' },
  { id: 2, text: 'Surya melaporkan efek samping pusing.', time: '15 menit yang lalu', type: 'danger' },
  { id: 3, text: 'Stok Rifampisin 150mg diperbarui.', time: '45 menit yang lalu', type: 'success' }
]);

const oatStocks = ref([
  { name: 'Rifampisin', status: 'Aman 85%', percent: 85, colorClass: 'bg-success', subtext: '1,200 / 1,410 Tablet' },
  { name: 'Isoniazid', status: 'Menipis 42%', percent: 42, colorClass: 'bg-warning', subtext: '580 / 1,380 Tablet' },
  { name: 'Pirazinamid', status: 'Kritis 15%', percent: 15, colorClass: 'bg-danger', subtext: '165 / 1,100 Tablet' }
]);
</script>

<template>
  <div class="dashboard-container">
    <!-- 1. Hero Welcome Banner -->
    <div class="hero-banner">
      <div class="hero-content">
        <h1 class="hero-title">Selamat Datang, Admin</h1>
        <h2 class="hero-subtitle">Puskesmas Sukajadi</h2>
        <p class="hero-desc">
          Pantau perkembangan kesehatan pasien TB secara real-time dan pastikan ketersediaan obat tercukupi untuk wilayah Anda.
        </p>
        <div class="hero-actions">
          <button class="btn btn-primary-inv" @click="goToNewPatient">Kelola Pasien Baru</button>
          <button class="btn btn-outline-white" @click="goToReports">Lihat Laporan Bulanan</button>
        </div>
      </div>
      <div class="hero-image-wrapper">
        <img :src="mobiledoctorIMG" alt="Healthcare Team" class="hero-image" />
      </div>
    </div>

    <!-- 2. Statistic Cards Row -->
    <div class="stats-grid">
      <div v-for="(stat, index) in patientStats" :key="index" class="stat-card">
        <div class="stat-icon-wrapper" :style="{ backgroundColor: stat.bgColor, color: stat.color }" v-html="stat.icon"></div>
        <div class="stat-info">
          <div class="stat-label">{{ stat.label }}</div>
          <div class="stat-value">{{ stat.value }}</div>
        </div>
      </div>
    </div>

    <!-- 3. Middle Row -->
    <div class="middle-row">
      <!-- Left: Pasien Berisiko -->
      <div class="card risk-card">
        <div class="card-header">
          <div class="card-title">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
            Pasien Berisiko Putus Obat
          </div>
          <a href="#" class="link-view-all" @click.prevent="goToPatients">Lihat Semua</a>
        </div>
        
        <div class="risk-content">
          <div class="risk-chart-section">
            <div class="donut-chart-container">
              <div class="donut-chart">
                <div class="donut-inner-text">
                  <span class="donut-percent">20</span>
                  <span class="donut-label">TOTAL PASIEN</span>
                </div>
              </div>
            </div>
            <div class="risk-legend">
              <div class="legend-item"><span class="dot dot-danger"></span>Tinggi: 1 (5%)</div>
              <div class="legend-item"><span class="dot dot-warning"></span>Sedang: 3 (15%)</div>
              <div class="legend-item"><span class="dot dot-primary"></span>Rendah: 16 (80%)</div>
            </div>
          </div>

          <div class="risk-list">
            <div v-for="patient in riskPatients" :key="patient.id" class="risk-item cursor-pointer" @click="goToPatientDetail(patient.id)">
              <div class="risk-avatar">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
              </div>
              <div class="risk-info">
                <div class="risk-name">{{ patient.name }}</div>
                <div class="risk-reason">{{ patient.reason }}</div>
              </div>
              <div class="risk-badge" :class="'badge-' + patient.levelColor">
                {{ patient.level }}
              </div>
              <button class="btn-phone" @click.stop="alert('Menghubungi ' + patient.name)">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
              </button>
            </div>
          </div>
        </div>
      </div>

    </div>

    <!-- 4. Bottom Row -->
    <div class="bottom-row">
      <!-- Left: Tren Kepatuhan -->
      <div class="card chart-card">
        <div class="chart-header flex justify-between items-start mb-4">
          <div>
            <div class="card-title">Tren Kepatuhan Pasien</div>
            <p class="chart-subtitle text-xs text-secondary mt-1">Persentase kepatuhan harian (7 Hari Terakhir)</p>
          </div>
          <div class="text-right">
            <div class="text-2xl font-bold" style="color: #1E293B;">80.4% <span class="text-xs font-normal" style="color: #64748B;">Rata-rata</span></div>
            <div class="text-xs font-semibold flex items-center justify-end gap-1 mt-0.5" style="color: #22C55E;">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"></polyline></svg>
              <span>+2.4% minggu ini</span>
            </div>
          </div>
        </div>
        
        <div class="area-chart-container">
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
                <linearGradient id="dashComplianceGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stop-color="#006591" stop-opacity="0.38" />
                  <stop offset="100%" stop-color="#006591" stop-opacity="0.02" />
                </linearGradient>
              </defs>
              
              <!-- Area fill under curve -->
              <path d="M 30 45 C 65 45, 65 27, 100 27 C 135 27, 135 9, 170 9 C 205 9, 205 72, 240 72 C 275 72, 275 36, 310 36 C 345 36, 345 18, 380 18 C 415 18, 415 3.6, 450 3.6 L 450 160 L 30 160 Z" fill="url(#dashComplianceGradient)" />
              
              <!-- Smooth Curve Line -->
              <path d="M 30 45 C 65 45, 65 27, 100 27 C 135 27, 135 9, 170 9 C 205 9, 205 72, 240 72 C 275 72, 275 36, 310 36 C 345 36, 345 18, 380 18 C 415 18, 415 3.6, 450 3.6" fill="none" stroke="#006591" stroke-width="3" stroke-linecap="round" />
              
              <!-- Points -->
              <g class="chart-point-group" v-for="(pt, i) in [
                {x: 30, y: 45, val: 75},
                {x: 100, y: 27, val: 85},
                {x: 170, y: 9, val: 95},
                {x: 240, y: 72, val: 60},
                {x: 310, y: 36, val: 80},
                {x: 380, y: 18, val: 90},
                {x: 450, y: 3.6, val: 98, active: true}
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

      <!-- Center: Aktivitas Terbaru -->
      <div class="card timeline-card">
        <div class="card-title mb-4">Aktivitas Terbaru</div>
        <div class="timeline">
          <div v-for="act in recentActivities" :key="act.id" class="timeline-item">
            <div class="timeline-dot" :class="'bg-' + act.type"></div>
            <div class="timeline-content">
              <p class="timeline-text">{{ act.text }}</p>
              <span class="timeline-time">{{ act.time }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Right: Stok OAT -->
      <div class="card stock-card">
        <div class="card-title mb-4">Stok OAT</div>
        <div class="stock-list">
          <div v-for="(stock, index) in oatStocks" :key="index" class="stock-item">
            <div class="stock-header">
              <span class="stock-name">{{ stock.name }}</span>
              <span class="stock-status" :class="'text-' + stock.colorClass.replace('bg-', '')">{{ stock.status }}</span>
            </div>
            <div class="progress-bar-bg">
              <div class="progress-bar" :class="stock.colorClass" :style="{ width: stock.percent + '%' }"></div>
            </div>
            <div class="text-xs text-secondary flex justify-between mt-0.5 font-medium">
              <span>{{ stock.subtext }}</span>
              <span>{{ stock.percent }}%</span>
            </div>
          </div>
        </div>
        <button class="btn btn-primary btn-full mt-auto" @click="goToMedicines">Permintaan Restock OAT</button>
      </div>
    </div>
  </div>
</template>

<style scoped src="./DashboardView.css"></style>

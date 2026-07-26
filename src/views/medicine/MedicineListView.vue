<template>
  <div class="page-container">
    <div class="page-header">
      <h1 class="page-title">Logistik OAT - SITARA TB</h1>
      <p class="page-subtitle">Manajemen stok dan permintaan obat anti-tuberkulosis.</p>
    </div>

    <!-- Statistic Cards Row -->
    <div class="stats-grid">
      <div class="stat-card">
        <h3 class="stat-title">Total Stock OAT</h3>
        <p class="stat-value">2,450 <span class="stat-unit">Tabs</span></p>
      </div>
      <div class="stat-card">
        <h3 class="stat-title">Today's Requests</h3>
        <p class="stat-value">12</p>
      </div>
      <div class="stat-card">
        <h3 class="stat-title">Pending Approval</h3>
        <p class="stat-value text-warning">5</p>
      </div>
      <div class="stat-card">
        <h3 class="stat-title">Approved</h3>
        <p class="stat-value text-success">7</p>
      </div>
      <div class="stat-card">
        <h3 class="stat-title">Rejected</h3>
        <p class="stat-value text-danger">0</p>
      </div>
    </div>

    <!-- Main Table Section -->
    <div class="card table-card">
      <div class="card-header flex-between">
        <h2 class="card-title">Permintaan Pengambilan OAT</h2>
        <div class="pill-buttons">
          <button class="pill-btn active">Semua</button>
          <button class="pill-btn">Baru</button>
        </div>
      </div>
      <div class="table-responsive">
        <table class="data-table">
          <thead>
            <tr>
              <th>Nama Pasien</th>
              <th>Nama PMO</th>
              <th>Tipe Obat</th>
              <th>Alasan</th>
              <th>Tgl Permintaan</th>
              <th>Status</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="req in requests" :key="req.id">
              <td>
                <div class="font-medium">{{ req.pasien }}</div>
                <div class="text-xs text-muted">{{ req.pasienId }}</div>
              </td>
              <td>{{ req.pmo }}</td>
              <td><span :class="['type-pill', req.typeClass]">{{ req.tipeObat }}</span></td>
              <td>{{ req.alasan }}</td>
              <td>{{ req.tglPermintaan }}</td>
              <td>
                <span :class="['status-pill', req.statusClass]">
                  <span class="status-dot"></span>
                  {{ req.status }}
                </span>
              </td>
              <td class="actions">
                <RouterLink to="/dashboard/refill-requests" class="btn-action" title="Lihat Detail">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                </RouterLink>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Bottom Row -->
    <div class="bottom-grid">
      <!-- Level Stok OAT -->
      <div class="card">
        <h2 class="card-title mb-4">Level Stok OAT</h2>
        <div class="stock-list">
          <div v-for="stock in stocks" :key="stock.name" class="stock-item">
            <div class="stock-header">
              <span class="stock-name">{{ stock.name }}</span>
              <span :class="['stock-badge', stock.badgeClass]">{{ stock.status }}</span>
            </div>
            <div class="progress-bar-bg">
              <div class="progress-bar" :style="{ width: stock.percentage + '%', backgroundColor: stock.color }"></div>
            </div>
            <div class="stock-footer">
              <span class="stock-subtext">{{ stock.subtext }}</span>
              <span class="stock-percentage">{{ stock.percentage }}%</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Riwayat Distribusi -->
      <div class="card">
        <h2 class="card-title mb-4">Riwayat Distribusi</h2>
        <div class="table-responsive">
          <table class="data-table">
            <thead>
              <tr>
                <th>Tanggal</th>
                <th>Pasien</th>
                <th>Tipe Obat</th>
                <th>Jumlah</th>
                <th>Petugas</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="hist in histories" :key="hist.id">
                <td class="whitespace-nowrap">{{ hist.tanggal }}</td>
                <td>{{ hist.pasien }}</td>
                <td>{{ hist.tipeObat }}</td>
                <td>{{ hist.jumlah }}</td>
                <td>{{ hist.petugas }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const requests = ref([
  {
    id: 1,
    pasien: 'Budi Santoso',
    pasienId: 'ID: TB-2023-089',
    pmo: 'Surya',
    tipeObat: 'Kategori I',
    typeClass: 'type-cat-1',
    alasan: 'Stok Habis',
    tglPermintaan: '12 Oct 2023',
    status: 'Pending',
    statusClass: 'status-pending'
  },
  {
    id: 2,
    pasien: 'Ratna Sari',
    pasienId: 'ID: TB-2023-112',
    pmo: 'Andi Wijaya',
    tipeObat: 'Kategori II',
    typeClass: 'type-cat-2',
    alasan: 'Kontrol Rutin',
    tglPermintaan: '12 Oct 2023',
    status: 'Disetujui',
    statusClass: 'status-approved'
  },
  {
    id: 3,
    pasien: 'Dedi Kurniawan',
    pasienId: 'ID: TB-2023-045',
    pmo: 'Lina Marlina',
    tipeObat: 'Kategori I',
    typeClass: 'type-cat-1',
    alasan: 'Stok Habis',
    tglPermintaan: '11 Oct 2023',
    status: 'Disetujui',
    statusClass: 'status-approved'
  },
  {
    id: 4,
    pasien: 'Ahmad Faisal',
    pasienId: 'ID: TB-2023-156',
    pmo: 'Rudi Hermawan',
    tipeObat: 'Anak',
    typeClass: 'type-child',
    alasan: 'Kontrol Rutin',
    tglPermintaan: '11 Oct 2023',
    status: 'Ditolak',
    statusClass: 'status-rejected'
  }
]);

const stocks = ref([
  {
    name: 'Rifampisin',
    status: 'Safe',
    badgeClass: 'badge-safe',
    percentage: 85,
    color: '#22C55E',
    subtext: '1,200 / 1,410 Tablet'
  },
  {
    name: 'Isoniazid',
    status: 'Thinning',
    badgeClass: 'badge-thinning',
    percentage: 42,
    color: '#F59E0B',
    subtext: '580 / 1,380 Tablet'
  },
  {
    name: 'Pirazinamid',
    status: 'Critical',
    badgeClass: 'badge-critical',
    percentage: 15,
    color: '#EF4444',
    subtext: '165 / 1,100 Tablet'
  }
]);

const histories = ref([
  { id: 1, tanggal: '12 Oct, 10:15', pasien: 'Ratna Sari', tipeObat: 'Kategori II', jumlah: '28 Tablet', petugas: 'Ns. Hendra' },
  { id: 2, tanggal: '11 Oct, 14:30', pasien: 'Dedi Kurniawan', tipeObat: 'Kategori I', jumlah: '56 Tablet', petugas: 'Ns. Hendra' },
  { id: 3, tanggal: '11 Oct, 09:20', pasien: 'Slamet Riyadi', tipeObat: 'Kategori I', jumlah: '56 Tablet', petugas: 'Dr. Anisa' },
  { id: 4, tanggal: '10 Oct, 16:45', pasien: 'Maya Putri', tipeObat: 'Anak', jumlah: '14 Tablet', petugas: 'Ns. Hendra' }
]);
</script>

<style scoped>
.page-container {
  padding: 1.5rem;
  background-color: #F8FAFC;
  min-height: 100vh;
  font-family: 'Inter', sans-serif;
  color: #334155;
}

.page-header {
  margin-bottom: 2rem;
}

.page-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #0F172A;
  margin: 0 0 0.5rem 0;
}

.page-subtitle {
  font-size: 0.875rem;
  color: #64748B;
  margin: 0;
}

/* Stats */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1rem;
  margin-bottom: 2rem;
}

.stat-card {
  background-color: #FFFFFF;
  border-radius: 12px;
  padding: 1.25rem;
  border: 1px solid #E2E8F0;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
}

.stat-title {
  font-size: 0.875rem;
  font-weight: 500;
  color: #64748B;
  margin: 0 0 0.5rem 0;
}

.stat-value {
  font-size: 1.5rem;
  font-weight: 700;
  color: #0F172A;
  margin: 0;
}

.stat-unit {
  font-size: 0.875rem;
  font-weight: 500;
  color: #94A3B8;
}

.text-warning { color: #F59E0B; }
.text-success { color: #22C55E; }
.text-danger { color: #EF4444; }

/* Cards */
.card {
  background-color: #FFFFFF;
  border-radius: 12px;
  border: 1px solid #E2E8F0;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
  padding: 1.25rem;
  margin-bottom: 2rem;
}

.card-header {
  margin-bottom: 1rem;
}

.card-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: #0F172A;
  margin: 0;
}

.mb-4 { margin-bottom: 1rem; }
.flex-between {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.pill-buttons {
  display: flex;
  gap: 0.5rem;
  background-color: #F1F5F9;
  padding: 0.25rem;
  border-radius: 20px;
}

.pill-btn {
  border: none;
  background: transparent;
  padding: 0.375rem 1rem;
  border-radius: 16px;
  font-size: 0.875rem;
  font-weight: 500;
  color: #64748B;
  cursor: pointer;
  transition: all 0.2s;
}

.pill-btn.active {
  background-color: #FFFFFF;
  color: #006591;
  box-shadow: 0 1px 2px rgba(0,0,0,0.1);
}

/* Table */
.table-responsive {
  overflow-x: auto;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
}

.data-table th {
  text-align: left;
  padding: 0.75rem 1rem;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  color: #64748B;
  border-bottom: 1px solid #E2E8F0;
  background-color: #F8FAFC;
}

.data-table td {
  padding: 1rem;
  font-size: 0.875rem;
  border-bottom: 1px solid #E2E8F0;
  vertical-align: middle;
}

.data-table tbody tr:last-child td {
  border-bottom: none;
}

.font-medium { font-weight: 500; color: #0F172A; }
.text-xs { font-size: 0.75rem; }
.text-muted { color: #64748B; }
.whitespace-nowrap { white-space: nowrap; }

/* Pills & Badges */
.type-pill, .status-pill, .stock-badge {
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.625rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 500;
}

.type-cat-1 { color: #006591; background-color: #E0F2FE; }
.type-cat-2 { color: #7E22CE; background-color: #F3E8FF; }
.type-child { color: #EA580C; background-color: #FFEDD5; }

.status-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  margin-right: 0.375rem;
}

.status-pending { color: #B45309; background-color: #FEF3C7; }
.status-pending .status-dot { background-color: #F59E0B; }

.status-approved { color: #15803D; background-color: #DCFCE7; }
.status-approved .status-dot { background-color: #22C55E; }

.status-rejected { color: #B91C1C; background-color: #FEE2E2; }
.status-rejected .status-dot { background-color: #EF4444; }

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

/* Bottom Grid */
.bottom-grid {
  display: grid;
  grid-template-columns: 4fr 6fr;
  gap: 1.5rem;
}

/* Stock List */
.stock-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.stock-item {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.stock-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.stock-name {
  font-weight: 500;
  color: #0F172A;
  font-size: 0.875rem;
}

.badge-safe { color: #15803D; background-color: #DCFCE7; }
.badge-thinning { color: #B45309; background-color: #FEF3C7; }
.badge-critical { color: #B91C1C; background-color: #FEE2E2; }

.progress-bar-bg {
  width: 100%;
  height: 8px;
  background-color: #F1F5F9;
  border-radius: 4px;
  overflow: hidden;
}

.progress-bar {
  height: 100%;
  border-radius: 4px;
}

.stock-footer {
  display: flex;
  justify-content: space-between;
  font-size: 0.75rem;
}

.stock-subtext {
  color: #64748B;
}

.stock-percentage {
  font-weight: 600;
  color: #334155;
}
</style>

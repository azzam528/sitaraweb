<template>
  <div class="page-container">
    <div class="page-header">
      <h1 class="page-title">Logistik OAT - SITARA TB</h1>
      <p class="page-subtitle">Manajemen stok dan permintaan obat anti-tuberkulosis.</p>
    </div>

    <!-- Statistic Cards Row -->
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-icon-wrapper teal-circle">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="16.5" y1="9.4" x2="7.5" y2="4.21"></line><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
        </div>
        <div class="stat-info">
          <span class="stat-label">TOTAL STOK OAT</span>
          <span class="stat-value">2,450 <span class="stat-unit">Tabs</span></span>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon-wrapper teal-circle">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line></svg>
        </div>
        <div class="stat-info">
          <span class="stat-label">PERMINTAAN HARI INI</span>
          <span class="stat-value">4</span>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon-wrapper orange-circle">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
        </div>
        <div class="stat-info">
          <span class="stat-label">MENUNGGU SETUJU</span>
          <span class="stat-value">1</span>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon-wrapper green-circle">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
        </div>
        <div class="stat-info">
          <span class="stat-label">DISETUJUI</span>
          <span class="stat-value">3</span>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon-wrapper red-circle">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>
        </div>
        <div class="stat-info">
          <span class="stat-label">DITOLAK</span>
          <span class="stat-value">0</span>
        </div>
      </div>
    </div>

    <!-- Filter Section -->
    <section class="filter-section card mb-6">
      <div class="filter-header">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
        </svg>
        <h2>Filter Permintaan Obat</h2>
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

        <!-- 2. Tipe Obat -->
        <div class="form-group">
          <label>Tipe Obat OAT</label>
          <select class="form-control">
            <option value="">Semua Tipe Obat</option>
            <option value="Kategori I">Kategori I</option>
            <option value="Kategori II">Kategori II</option>
            <option value="Anak">Anak</option>
          </select>
        </div>

        <!-- 3. Status Permintaan -->
        <div class="form-group">
          <label>Status Permintaan</label>
          <select class="form-control">
            <option value="">Semua Status</option>
            <option value="Pending">Pending (Menunggu)</option>
            <option value="Disetujui">Disetujui</option>
            <option value="Ditolak">Ditolak</option>
          </select>
        </div>
      </div>
    </section>

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
              <td class="actions relative text-center">
                <div class="action-dropdown-wrapper">
                  <button class="btn-more-actions" @click.stop="toggleDropdown(req.id)" title="Aksi">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <circle cx="12" cy="12" r="1"></circle>
                      <circle cx="19" cy="12" r="1"></circle>
                      <circle cx="5" cy="12" r="1"></circle>
                    </svg>
                  </button>
                  
                  <div v-if="activeDropdown === req.id" class="dropdown-menu-floating" @click.stop>
                    <button class="dropdown-item" @click="viewDetail(); activeDropdown = null">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                      </svg>
                      <span>Lihat Detail</span>
                    </button>

                    <button class="dropdown-item" @click="sendNotify(req); activeDropdown = null">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                        <polyline points="22,6 12,13 2,6"></polyline>
                      </svg>
                      <span>Kirim Notifikasi</span>
                    </button>

                    <button class="dropdown-item text-danger" @click="deleteRequest(req); activeDropdown = null">
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
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter, RouterLink } from 'vue-router';

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

const viewDetail = () => {
  router.push('/dashboard/refill-requests');
};

const sendNotify = (req) => {
  alert(`Mengirim notifikasi pengingat stok ke ${req.pasien}`);
};

const deleteRequest = (req) => {
  if (confirm(`Apakah Anda yakin ingin menghapus permintaan OAT ${req.pasien}?`)) {
    requests.value = requests.value.filter(r => r.id !== req.id);
  }
};

const requests = ref([
  {
    id: 1,
    pasien: 'Budi Santoso',
    pasienId: 'ID: TB-2026-089',
    pmo: 'Surya',
    tipeObat: 'Kategori I',
    typeClass: 'type-cat-1',
    alasan: 'Stok Habis',
    tglPermintaan: '28 Jul 2026',
    status: 'Pending',
    statusClass: 'status-pending'
  },
  {
    id: 2,
    pasien: 'Ratna Sari',
    pasienId: 'ID: TB-2026-112',
    pmo: 'Andi Wijaya',
    tipeObat: 'Kategori II',
    typeClass: 'type-cat-2',
    alasan: 'Kontrol Rutin',
    tglPermintaan: '28 Jul 2026',
    status: 'Disetujui',
    statusClass: 'status-approved'
  },
  {
    id: 3,
    pasien: 'Dedi Kurniawan',
    pasienId: 'ID: TB-2026-045',
    pmo: 'Lina Marlina',
    tipeObat: 'Kategori I',
    typeClass: 'type-cat-1',
    alasan: 'Stok Habis',
    tglPermintaan: '27 Jul 2026',
    status: 'Disetujui',
    statusClass: 'status-approved'
  },
  {
    id: 4,
    pasien: 'Ahmad Faisal',
    pasienId: 'ID: TB-2026-156',
    pmo: 'Rudi Hermawan',
    tipeObat: 'Anak',
    typeClass: 'type-child',
    alasan: 'Kontrol Rutin',
    tglPermintaan: '27 Jul 2026',
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
  { id: 1, tanggal: '28 Jul, 10:15', pasien: 'Ratna Sari', tipeObat: 'Kategori II', jumlah: '28 Tablet', petugas: 'Ns. Hendra' },
  { id: 2, tanggal: '27 Jul, 14:30', pasien: 'Dedi Kurniawan', tipeObat: 'Kategori I', jumlah: '56 Tablet', petugas: 'Ns. Hendra' },
  { id: 3, tanggal: '27 Jul, 09:20', pasien: 'Slamet Riyadi', tipeObat: 'Kategori I', jumlah: '56 Tablet', petugas: 'Dr. Anisa' },
  { id: 4, tanggal: '26 Jul, 16:45', pasien: 'Maya Putri', tipeObat: 'Anak', jumlah: '14 Tablet', petugas: 'Ns. Hendra' }
]);
</script>

<style scoped src="./MedicineListView.css"></style>

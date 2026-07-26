<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

// Router setup
const router = useRouter();

// Filter State
const filters = ref({
  search: '',
  phase: '',
  type: '',
  risk: '',
  pmo: '',
  kader: '',
  kelurahan: ''
});

// Pagination State
const currentPage = ref(1);
const totalPages = ref(129);

// Dummy Data
const patients = ref([
  {
    id: 1,
    name: 'Ahmad Subarjo',
    nik: '3273102805620001',
    age: 62,
    tbType: 'TB SO',
    phase: 'Fase Lanjutan',
    month: 4,
    compliance: 98,
    pmo: 'Siti Aminah',
    pmoRelation: 'Istri',
    kader: 'Ibu Rahma',
    status: 'AKTIF'
  },
  {
    id: 2,
    name: 'Lina Nuraini',
    nik: '3273104509810003',
    age: 42,
    tbType: 'TB RO',
    phase: 'Fase Awal',
    month: 1,
    compliance: 65,
    pmo: 'Budi Santoso',
    pmoRelation: 'Adik',
    kader: 'Pak Jono',
    status: 'RISIKO TINGGI'
  },
  {
    id: 3,
    name: 'Budi Kusuma',
    nik: '3273101112950004',
    age: 28,
    tbType: 'TB SO',
    phase: 'Fase Lanjutan',
    month: 6,
    compliance: 100,
    pmo: 'Mandiri',
    pmoRelation: '',
    kader: 'Ibu Rahma',
    status: 'SELESAI TERAPI'
  },
  {
    id: 4,
    name: 'Dewi Sartika',
    nik: '3273105506780005',
    age: 45,
    tbType: 'TB SO',
    phase: 'Fase Intensif',
    month: 2,
    compliance: 85,
    pmo: 'Hasan',
    pmoRelation: 'Suami',
    kader: 'Pak Jono',
    status: 'AKTIF'
  },
  {
    id: 5,
    name: 'Rizky Pratama',
    nik: '3273101203000006',
    age: 25,
    tbType: 'TB RO',
    phase: 'Fase Intensif',
    month: 1,
    compliance: 45,
    pmo: 'Ani Pratama',
    pmoRelation: 'Ibu',
    kader: 'Ibu Siti',
    status: 'RISIKO TINGGI'
  },
  {
    id: 6,
    name: 'Siti Nurhaliza',
    nik: '3273106608900007',
    age: 33,
    tbType: 'TB SO',
    phase: 'Fase Lanjutan',
    month: 5,
    compliance: 92,
    pmo: 'Rudi',
    pmoRelation: 'Suami',
    kader: 'Pak Ahmad',
    status: 'AKTIF'
  }
]);

// Helper Functions
const getInitials = (name) => {
  return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
};

const getComplianceColor = (value) => {
  if (value >= 80) return '#22C55E';
  if (value >= 50) return '#F59E0B';
  return '#EF4444';
};

const resetFilters = () => {
  filters.value = {
    search: '',
    phase: '',
    type: '',
    risk: '',
    pmo: '',
    kader: '',
    kelurahan: ''
  };
};

const applyFilters = () => {
  console.log('Applying filters:', filters.value);
};

const viewPatient = (id) => {
  router.push(`/dashboard/patients/${id}`);
};

const editPatient = (id) => {
  router.push(`/dashboard/patients/${id}/edit`);
};

const prevPage = () => {
  if (currentPage.value > 1) currentPage.value--;
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) currentPage.value++;
};
</script>

<template>
  <div class="patient-list-page">
    <!-- 1. Page Header -->
    <header class="page-header">
      <div class="header-content">
        <h1 class="page-title">Manajemen Pasien</h1>
        <p class="page-subtitle">Kelola data pasien TB dan monitor kepatuhan pengobatan.</p>
      </div>
      <router-link to="/dashboard/patients/add" class="btn-add">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon-plus">
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
        Tambah Pasien Baru
      </router-link>
    </header>

    <!-- 2. Statistic Cards -->
    <section class="stats-grid">
      <div class="stat-card">
        <div class="stat-icon-wrapper teal-circle">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
            <circle cx="9" cy="7" r="4"></circle>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
          </svg>
        </div>
        <div class="stat-info">
          <span class="stat-label">PASIEN AKTIF</span>
          <span class="stat-value">1,284</span>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon-wrapper teal-circle">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
            <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
          </svg>
        </div>
        <div class="stat-info">
          <span class="stat-label">SEDANG TERAPI</span>
          <span class="stat-value">942</span>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon-wrapper green-circle">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
        </div>
        <div class="stat-info">
          <span class="stat-label">SELESAI TERAPI</span>
          <span class="stat-value">312</span>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon-wrapper orange-circle">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="15" y1="9" x2="9" y2="15"></line>
            <line x1="9" y1="9" x2="15" y2="15"></line>
          </svg>
        </div>
        <div class="stat-info">
          <span class="stat-label">PUTUS OBAT</span>
          <span class="stat-value">12</span>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon-wrapper red-circle">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
            <line x1="12" y1="9" x2="12" y2="13"></line>
            <line x1="12" y1="17" x2="12.01" y2="17"></line>
          </svg>
        </div>
        <div class="stat-info">
          <span class="stat-label">RISIKO TINGGI</span>
          <span class="stat-value">28</span>
        </div>
      </div>
    </section>

    <!-- 3. Filter Section -->
    <section class="filter-section card">
      <div class="filter-header">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
        </svg>
        <h2>Filter Pencarian Pasien</h2>
      </div>
      
      <div class="filter-grid">
        <!-- Row 1 -->
        <div class="form-group">
          <label>Nama atau NIK</label>
          <input type="text" v-model="filters.search" placeholder="Cari nama atau NIK..." class="form-control" />
        </div>
        <div class="form-group">
          <label>Fase Pengobatan</label>
          <select v-model="filters.phase" class="form-control">
            <option value="">Semua Fase</option>
            <option value="Fase Intensif">Fase Intensif</option>
            <option value="Fase Lanjutan">Fase Lanjutan</option>
          </select>
        </div>
        <div class="form-group">
          <label>Tipe TB</label>
          <select v-model="filters.type" class="form-control">
            <option value="">Semua Tipe</option>
            <option value="TB Paru BTA+">TB Paru BTA+</option>
            <option value="TB Paru BTA-">TB Paru BTA-</option>
            <option value="TB Ekstra Paru">TB Ekstra Paru</option>
          </select>
        </div>
        <div class="form-group">
          <label>Status AI Risk</label>
          <select v-model="filters.risk" class="form-control">
            <option value="">Semua Status</option>
            <option value="Risiko Tinggi">Risiko Tinggi</option>
            <option value="Risiko Sedang">Risiko Sedang</option>
            <option value="Risiko Rendah">Risiko Rendah</option>
          </select>
        </div>
        
        <!-- Row 2 -->
        <div class="form-group">
          <label>PMO / Pengawas</label>
          <input type="text" v-model="filters.pmo" placeholder="Nama PMO..." class="form-control" />
        </div>
        <div class="form-group">
          <label>Kader</label>
          <input type="text" v-model="filters.kader" placeholder="Nama Kader..." class="form-control" />
        </div>
        <div class="form-group">
          <label>Domisili Kelurahan</label>
          <select v-model="filters.kelurahan" class="form-control">
            <option value="">Pilih Kelurahan</option>
            <option value="Kelurahan A">Kelurahan A</option>
            <option value="Kelurahan B">Kelurahan B</option>
            <option value="Kelurahan C">Kelurahan C</option>
          </select>
        </div>
        <div class="filter-actions form-group">
          <label class="hidden-label">&nbsp;</label>
          <div class="action-buttons">
            <button class="btn-primary" @click="applyFilters">Terapkan Filter</button>
            <button class="btn-icon-reset" @click="resetFilters" title="Reset Filters">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
                <path d="M3 3v5h5"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- 4. Patient Table -->
    <section class="table-section card">
      <div class="table-responsive">
        <table class="custom-table">
          <thead>
            <tr>
              <th>PASIEN & NIK</th>
              <th>INFO TB</th>
              <th>KEPATUHAN</th>
              <th>PMO / KADER</th>
              <th>STATUS</th>
              <th class="text-center">AKSI</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="patient in patients" :key="patient.id">
              <!-- PASIEN & NIK -->
              <td>
                <div class="patient-profile">
                  <div class="avatar">{{ getInitials(patient.name) }}</div>
                  <div class="patient-details">
                    <span class="patient-name">{{ patient.name }}</span>
                    <span class="patient-nik">{{ patient.nik }}</span>
                    <span class="patient-age">{{ patient.age }} Thn</span>
                  </div>
                </div>
              </td>
              
              <!-- INFO TB -->
              <td>
                <div class="tb-info">
                  <span class="badge" :class="patient.tbType === 'TB SO' ? 'badge-green' : 'badge-red'">
                    {{ patient.tbType }}
                  </span>
                  <span class="phase-text">{{ patient.phase }}</span>
                  <span class="month-text">(Bln {{ patient.month }})</span>
                </div>
              </td>
              
              <!-- KEPATUHAN -->
              <td>
                <div class="compliance-info">
                  <span class="compliance-text" :style="{ color: getComplianceColor(patient.compliance) }">
                    {{ patient.compliance }}%
                  </span>
                  <div class="progress-bar-bg">
                    <div class="progress-bar-fill" :style="{ width: `${patient.compliance}%`, backgroundColor: getComplianceColor(patient.compliance) }"></div>
                  </div>
                </div>
              </td>
              
              <!-- PMO / KADER -->
              <td>
                <div class="pmo-info">
                  <span class="pmo-name">
                    {{ patient.pmo }} 
                    <span v-if="patient.pmoRelation" class="pmo-relation">({{ patient.pmoRelation }})</span>
                  </span>
                  <span class="kader-name">{{ patient.kader }}</span>
                </div>
              </td>
              
              <!-- STATUS -->
              <td>
                <span class="status-badge" :class="{
                  'status-active': patient.status === 'AKTIF',
                  'status-risk': patient.status === 'RISIKO TINGGI',
                  'status-done': patient.status === 'SELESAI TERAPI'
                }">
                  {{ patient.status }}
                </span>
              </td>
              
              <!-- AKSI -->
              <td class="text-center">
                <div class="action-buttons-table">
                  <button class="btn-action" @click="viewPatient(patient.id)" title="View">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                  </button>
                  <button class="btn-action" @click="editPatient(patient.id)" title="Edit">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                    </svg>
                  </button>
                  <button class="btn-action" title="More">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <circle cx="12" cy="12" r="1"></circle>
                      <circle cx="19" cy="12" r="1"></circle>
                      <circle cx="5" cy="12" r="1"></circle>
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- 5. Pagination -->
      <div class="pagination-section">
        <div class="pagination-info">
          Menampilkan 1-10 dari 1,284 pasien
        </div>
        <div class="pagination-controls">
          <button class="btn-page" @click="prevPage" :disabled="currentPage === 1">Prev</button>
          
          <button v-for="page in [1, 2, 3]" :key="page" 
                  class="btn-page" 
                  :class="{ 'active': currentPage === page }"
                  @click="currentPage = page">
            {{ page }}
          </button>
          
          <span class="page-ellipsis">...</span>
          
          <button class="btn-page" 
                  :class="{ 'active': currentPage === totalPages }"
                  @click="currentPage = totalPages">
            {{ totalPages }}
          </button>
          
          <button class="btn-page" @click="nextPage" :disabled="currentPage === totalPages">Next</button>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
/* Page Layout */
.patient-list-page {
  display: flex;
  flex-direction: column;
  gap: 24px;
  font-family: 'Inter', sans-serif;
  color: #334155;
  padding: 24px;
  background-color: #F8FAFC;
  min-height: 100vh;
}

/* 1. Header */
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 16px;
}
.page-title {
  font-size: 24px;
  font-weight: 700;
  color: #0f172a;
  margin: 0 0 8px 0;
}
.page-subtitle {
  font-size: 14px;
  color: #64748b;
  margin: 0;
}
.btn-add {
  display: flex;
  align-items: center;
  gap: 8px;
  background-color: #002B3F;
  color: #ffffff;
  padding: 10px 16px;
  border-radius: 8px;
  font-weight: 500;
  font-size: 14px;
  text-decoration: none;
  transition: opacity 0.2s;
}
.btn-add:hover {
  opacity: 0.9;
}

/* 2. Stats Cards */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
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
}
.stat-value {
  font-size: 24px;
  font-weight: 700;
  color: #0f172a;
}

/* Shared Card Style */
.card {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
  overflow: hidden;
}

/* 3. Filter Section */
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
.filter-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}
@media (max-width: 1024px) {
  .filter-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 640px) {
  .filter-grid { grid-template-columns: 1fr; }
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
.hidden-label {
  visibility: hidden;
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
.action-buttons {
  display: flex;
  gap: 8px;
}
.btn-primary {
  flex: 1;
  background-color: #002B3F;
  color: #fff;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: opacity 0.2s;
}
.btn-primary:hover {
  opacity: 0.9;
}
.btn-icon-reset {
  width: 38px;
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f1f5f9;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  color: #64748b;
  cursor: pointer;
  transition: all 0.2s;
}
.btn-icon-reset:hover {
  background-color: #e2e8f0;
  color: #334155;
}

/* 4. Table Section */
.table-responsive {
  width: 100%;
  overflow-x: auto;
}
.custom-table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
  min-width: 800px;
}
.custom-table th {
  background-color: #f8fafc;
  padding: 12px 16px;
  font-size: 12px;
  font-weight: 600;
  color: #64748b;
  border-bottom: 1px solid #e2e8f0;
}
.custom-table td {
  padding: 16px;
  border-bottom: 1px solid #f1f5f9;
  vertical-align: middle;
}
.custom-table tbody tr {
  transition: background-color 0.15s;
}
.custom-table tbody tr:hover {
  background-color: #f8fafc;
}

/* Table Cells Details */
.patient-profile {
  display: flex;
  align-items: center;
  gap: 12px;
}
.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, #006591 0%, #6DF5E1 100%);
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 14px;
  flex-shrink: 0;
}
.patient-details {
  display: flex;
  flex-direction: column;
}
.patient-name {
  font-weight: 600;
  color: #0f172a;
  font-size: 14px;
}
.patient-nik {
  font-size: 12px;
  color: #64748b;
  margin-top: 2px;
}
.patient-age {
  font-size: 12px;
  color: #94a3b8;
}

.tb-info {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
}
.badge {
  padding: 2px 8px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 600;
}
.badge-green {
  background-color: #DCFCE7;
  color: #16A34A;
}
.badge-red {
  background-color: #FEE2E2;
  color: #DC2626;
}
.phase-text {
  font-size: 13px;
  color: #334155;
}
.month-text {
  font-size: 12px;
  color: #64748b;
}

.compliance-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.compliance-text {
  font-size: 13px;
  font-weight: 600;
}
.progress-bar-bg {
  width: 120px;
  height: 6px;
  background-color: #e2e8f0;
  border-radius: 999px;
  overflow: hidden;
}
.progress-bar-fill {
  height: 100%;
  border-radius: 999px;
}

.pmo-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.pmo-name {
  font-size: 13px;
  font-weight: 500;
  color: #334155;
}
.pmo-relation {
  color: #64748b;
  font-weight: 400;
}
.kader-name {
  font-size: 12px;
  color: #64748b;
}

.status-badge {
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 600;
  display: inline-block;
}
.status-active {
  background-color: #DCFCE7;
  color: #16A34A;
}
.status-risk {
  background-color: #FEE2E2;
  color: #DC2626;
}
.status-done {
  background-color: #E0F2FE;
  color: #0284C7;
}

.text-center {
  text-align: center;
}
.action-buttons-table {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}
.btn-action {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 1px solid #e2e8f0;
  background-color: #ffffff;
  color: #64748b;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
}
.btn-action:hover {
  border-color: #cbd5e1;
  background-color: #f8fafc;
  color: #006591;
}

/* 5. Pagination */
.pagination-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  border-top: 1px solid #e2e8f0;
  flex-wrap: wrap;
  gap: 16px;
}
.pagination-info {
  font-size: 14px;
  color: #64748b;
}
.pagination-controls {
  display: flex;
  align-items: center;
  gap: 4px;
}
.btn-page {
  padding: 6px 12px;
  border: 1px solid #e2e8f0;
  background-color: #ffffff;
  color: #334155;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}
.btn-page:hover:not(:disabled) {
  background-color: #f1f5f9;
}
.btn-page:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
.btn-page.active {
  background-color: #002B3F;
  color: #ffffff;
  border-color: #002B3F;
}
.page-ellipsis {
  color: #64748b;
  padding: 0 4px;
}
</style>

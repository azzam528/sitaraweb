<template>
  <div class="medicine-page">
    <!-- 1. Header -->
    <header class="page-header">
      <div class="header-content">
        <h1 class="page-title">Obat & Jadwal Minum Obat (OAT)</h1>
        <p class="page-subtitle">Kelola master data obat anti-tuberkulosis dan jadwal minum obat harian pasien TB.</p>
      </div>
      <div class="header-actions">
        <button v-if="activeTab === 'medicines'" class="btn btn-primary" @click="openAddMedicineModal">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          Tambah Obat Baru
        </button>
        <button v-else class="btn btn-primary" @click="openAddScheduleModal">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          Atur Jadwal Minum Obat
        </button>
      </div>
    </header>

    <!-- Toast Alert -->
    <div v-if="alertMessage" class="toast-alert" :class="'toast-' + alertType">
      <span>{{ alertMessage }}</span>
      <button class="btn-close-toast" @click="alertMessage = ''">&times;</button>
    </div>

    <!-- 2. Tab Navigation Switcher -->
    <div class="tab-switcher-wrapper mb-4">
      <div class="tab-switcher">
        <button 
          class="tab-btn" 
          :class="{ active: activeTab === 'medicines' }"
          @click="activeTab = 'medicines'"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M10.5 20.5l10-10a4.95 4.95 0 10-7-7l-10 10a4.95 4.95 0 107 7z"></path>
            <path d="M8.5 8.5l7 7"></path>
          </svg>
          <span>Master Data Obat OAT ({{ medicines.length }})</span>
        </button>

        <button 
          class="tab-btn" 
          :class="{ active: activeTab === 'schedules' }"
          @click="activeTab = 'schedules'"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <polyline points="12 6 12 12 16 14"></polyline>
          </svg>
          <span>Jadwal Minum Obat Pasien ({{ schedules.length }})</span>
        </button>
      </div>
    </div>

    <!-- ========================================================================= -->
    <!-- TAB 1: MASTER DATA OBAT OAT -->
    <!-- ========================================================================= -->
    <div v-if="activeTab === 'medicines'">
      <!-- Stats Cards Row -->
      <section class="stats-grid">
        <div class="stat-card">
          <div class="stat-icon-wrapper teal-circle">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M10.5 20.5l10-10a4.95 4.95 0 10-7-7l-10 10a4.95 4.95 0 107 7z"></path>
              <path d="M8.5 8.5l7 7"></path>
            </svg>
          </div>
          <div class="stat-info">
            <span class="stat-label">TOTAL JENIS OBAT</span>
            <span class="stat-value">{{ medicines.length }}</span>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon-wrapper blue-circle">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
            </svg>
          </div>
          <div class="stat-info">
            <span class="stat-label">OAT LINI 1 (FDC / TUNGGAL)</span>
            <span class="stat-value">{{ oatLini1Count }}</span>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon-wrapper orange-circle">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
            </svg>
          </div>
          <div class="stat-info">
            <span class="stat-label">OAT LINI 2 / TB-RO</span>
            <span class="stat-value">{{ oatLini2Count }}</span>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon-wrapper green-circle">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
          </div>
          <div class="stat-info">
            <span class="stat-label">OBAT AKTIF</span>
            <span class="stat-value">{{ activeMedicinesCount }}</span>
          </div>
        </div>
      </section>

      <!-- Filter Section -->
      <section class="filter-section card">
        <div class="filter-header">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
          </svg>
          <h2>Filter Master Obat</h2>
        </div>

        <div class="filter-grid-2">
          <div class="form-group">
            <label>Pencarian</label>
            <input 
              type="text" 
              v-model="medSearchQuery" 
              placeholder="Cari Kode, Nama Obat, atau Deskripsi..." 
              class="form-control"
            />
          </div>

          <div class="form-group">
            <label>Kategori Obat</label>
            <select v-model="medFilterCategory" class="form-control">
              <option value="">Semua Kategori</option>
              <option value="Lini 1">Lini 1 (Utama)</option>
              <option value="Lini 2">Lini 2 (TB-RO)</option>
              <option value="FDC">Kombinasi Dosis Tetap (FDC)</option>
              <option value="Tunggal">Obat Tunggal</option>
              <option value="Anak">Pediatrik / Anak</option>
            </select>
          </div>
        </div>
      </section>

      <!-- Table Card -->
      <div class="table-card card">
        <div v-if="isLoadingMedicines" class="loading-state">
          <div class="spinner"></div>
          <p>Memuat data obat...</p>
        </div>

        <div v-else-if="filteredMedicines.length === 0" class="empty-state">
          <div class="empty-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M10.5 20.5l10-10a4.95 4.95 0 10-7-7l-10 10a4.95 4.95 0 107 7z"></path>
              <path d="M8.5 8.5l7 7"></path>
            </svg>
          </div>
          <h3>Belum Ada Data Obat</h3>
          <p>Tambahkan master data obat OAT yang digunakan untuk terapi pasien TB.</p>
          <button class="btn btn-primary mt-3" @click="openAddMedicineModal">
            + Tambah Obat Baru
          </button>
        </div>

        <div v-else class="table-responsive">
          <table class="data-table">
            <thead>
              <tr>
                <th>Kode Obat</th>
                <th>Nama Obat</th>
                <th>Kategori</th>
                <th>Kekuatan / Dosis</th>
                <th>Satuan</th>
                <th>Keterangan</th>
                <th class="text-center">Aksi</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="med in filteredMedicines" :key="med.id">
                <td>
                  <span class="code-badge font-mono font-bold">{{ med.code }}</span>
                </td>
                <td>
                  <div class="font-semibold text-dark">{{ med.name }}</div>
                </td>
                <td>
                  <span class="category-pill">{{ med.category }}</span>
                </td>
                <td>
                  <span class="font-medium">{{ med.strength }}</span>
                </td>
                <td>
                  <span class="unit-badge">{{ med.unit }}</span>
                </td>
                <td>
                  <span class="text-sm text-muted">{{ med.description || '-' }}</span>
                </td>
                <td class="text-center">
                  <div class="table-actions">
                    <button class="btn-action-icon" title="Edit Obat" @click="openEditMedicineModal(med)">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                      </svg>
                    </button>
                    <button class="btn-action-icon text-danger" title="Hapus Obat" @click="confirmDeleteMedicine(med)">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="3 6 5 6 21 6"></polyline>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- ========================================================================= -->
    <!-- TAB 2: JADWAL MINUM OBAT PASIEN -->
    <!-- ========================================================================= -->
    <div v-else>
      <!-- Stats Cards Row -->
      <section class="stats-grid">
        <div class="stat-card">
          <div class="stat-icon-wrapper teal-circle">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
          </div>
          <div class="stat-info">
            <span class="stat-label">TOTAL JADWAL AKTIF</span>
            <span class="stat-value">{{ schedules.length }}</span>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon-wrapper blue-circle">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="5"></circle>
              <line x1="12" y1="1" x2="12" y2="3"></line>
              <line x1="12" y1="21" x2="12" y2="23"></line>
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
            </svg>
          </div>
          <div class="stat-info">
            <span class="stat-label">JADWAL PAGI HARI</span>
            <span class="stat-value">{{ morningSchedulesCount }}</span>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon-wrapper orange-circle">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="4"></circle>
              <path d="M12 2v2"></path>
              <path d="M12 20v2"></path>
            </svg>
          </div>
          <div class="stat-info">
            <span class="stat-label">JADWAL SIANG / SORE</span>
            <span class="stat-value">{{ afternoonSchedulesCount }}</span>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon-wrapper purple-circle">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </svg>
          </div>
          <div class="stat-info">
            <span class="stat-label">JADWAL MALAM HARI</span>
            <span class="stat-value">{{ nightSchedulesCount }}</span>
          </div>
        </div>
      </section>

      <!-- Filter Section -->
      <section class="filter-section card">
        <div class="filter-header">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
          </svg>
          <h2>Filter Jadwal Minum Obat</h2>
        </div>

        <div class="filter-grid-2">
          <div class="form-group">
            <label>Pencarian</label>
            <input 
              type="text" 
              v-model="schedSearchQuery" 
              placeholder="Cari Nama Pasien, NIK, No RM, atau Nama Obat..." 
              class="form-control"
            />
          </div>

          <div class="form-group">
            <label>Filter Waktu Minum</label>
            <select v-model="schedFilterTime" class="form-control">
              <option value="">Semua Waktu</option>
              <option value="morning">Pagi (05:00 - 11:59)</option>
              <option value="afternoon">Siang / Sore (12:00 - 17:59)</option>
              <option value="night">Malam (18:00 - 23:59)</option>
            </select>
          </div>
        </div>
      </section>

      <!-- Table Card -->
      <div class="table-card card">
        <div v-if="isLoadingSchedules" class="loading-state">
          <div class="spinner"></div>
          <p>Memuat jadwal minum obat...</p>
        </div>

        <div v-else-if="filteredSchedules.length === 0" class="empty-state">
          <div class="empty-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
          </div>
          <h3>Belum Ada Jadwal Minum Obat</h3>
          <p>Atur jadwal minum obat harian untuk pasien yang sedang dalam masa pengobatan TB.</p>
          <button class="btn btn-primary mt-3" @click="openAddScheduleModal">
            + Atur Jadwal Minum Obat
          </button>
        </div>

        <div v-else class="table-responsive">
          <table class="data-table">
            <thead>
              <tr>
                <th>Pasien</th>
                <th>Obat Terjadwal</th>
                <th>Dosis & Aturan</th>
                <th>Jam Minum</th>
                <th>Sisa / Diberikan</th>
                <th>Progres Sisa</th>
                <th class="text-center">Aksi</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="sched in filteredSchedules" :key="sched.id">
                <td>
                  <div class="patient-cell">
                    <div class="patient-name font-semibold text-dark">
                      {{ sched.treatment?.patient?.full_name || 'Pengobatan #' + sched.treatment_id }}
                    </div>
                    <div class="patient-meta text-xs text-muted">
                      NIK: {{ sched.treatment?.patient?.nik || '-' }} | RM: {{ sched.treatment?.patient?.medical_record_number || '-' }}
                    </div>
                  </div>
                </td>
                <td>
                  <div class="med-cell">
                    <span class="med-name font-medium">{{ sched.medicine?.name || 'Obat #' + sched.medicine_id }}</span>
                    <span class="med-code text-xs text-muted">({{ sched.medicine?.code || '-' }})</span>
                  </div>
                </td>
                <td>
                  <span class="dosage-badge font-semibold">{{ sched.dosage }}</span>
                </td>
                <td>
                  <span class="time-pill">
                    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <polyline points="12 6 12 12 16 14"></polyline>
                    </svg>
                    {{ formatTime(sched.drink_time) }} WIB
                  </span>
                </td>
                <td>
                  <div class="quantity-cell">
                    <span class="qty-num font-bold" :class="getQtyColor(sched)">
                      {{ sched.quantity_remaining }}
                    </span>
                    <span class="text-muted text-xs">/ {{ sched.quantity_initial }} {{ sched.medicine?.unit || 'Tab' }}</span>
                  </div>
                </td>
                <td>
                  <div class="progress-wrapper">
                    <div class="progress-bar-container">
                      <div 
                        class="progress-bar" 
                        :class="getQtyBarClass(sched)" 
                        :style="{ width: calculateRemainingPercentage(sched) + '%' }"
                      ></div>
                    </div>
                    <div class="progress-text text-xs">
                      <span>{{ calculateRemainingPercentage(sched) }}% tersisa</span>
                    </div>
                  </div>
                </td>
                <td class="text-center">
                  <div class="table-actions">
                    <button class="btn-action-icon" title="Edit Jadwal" @click="openEditScheduleModal(sched)">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                      </svg>
                    </button>
                    <button class="btn-action-icon text-danger" title="Hapus Jadwal" @click="confirmDeleteSchedule(sched)">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="3 6 5 6 21 6"></polyline>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- ========================================================================= -->
    <!-- MODAL: TAMBAH / EDIT MASTER OBAT -->
    <!-- ========================================================================= -->
    <div v-if="showMedicineModal" class="modal-backdrop" @click="showMedicineModal = false">
      <div class="modal-dialog" @click.stop>
        <div class="modal-header">
          <h3>{{ isEditingMedicine ? 'Edit Master Obat OAT' : 'Tambah Master Obat OAT' }}</h3>
          <button class="modal-close" @click="showMedicineModal = false">&times;</button>
        </div>

        <form @submit.prevent="submitMedicineForm">
          <div class="modal-body">
            <div class="grid-2-cols mb-3">
              <div class="form-group">
                <label>Kode Obat <span class="text-danger">*</span></label>
                <input 
                  type="text" 
                  v-model="medForm.code" 
                  placeholder="Contoh: R-450, FDC-1" 
                  class="form-control" 
                  required 
                />
              </div>

              <div class="form-group">
                <label>Kategori Obat <span class="text-danger">*</span></label>
                <select v-model="medForm.category" class="form-control" required>
                  <option value="Lini 1">Lini 1 (Utama)</option>
                  <option value="Lini 2">Lini 2 (TB-RO)</option>
                  <option value="FDC">Kombinasi FDC</option>
                  <option value="Tunggal">Obat Tunggal</option>
                  <option value="Anak">Pediatrik / Anak</option>
                  <option value="Lainnya">Lainnya</option>
                </select>
              </div>
            </div>

            <div class="form-group mb-3">
              <label>Nama Obat Lengkap <span class="text-danger">*</span></label>
              <input 
                type="text" 
                v-model="medForm.name" 
                placeholder="Contoh: Rifampisin, FDC Kategori 1 (4FDC)" 
                class="form-control" 
                required 
              />
            </div>

            <div class="grid-2-cols mb-3">
              <div class="form-group">
                <label>Kekuatan / Sediaan <span class="text-danger">*</span></label>
                <input 
                  type="text" 
                  v-model="medForm.strength" 
                  placeholder="Contoh: 450 mg, 150/75/400/275 mg" 
                  class="form-control" 
                  required 
                />
              </div>

              <div class="form-group">
                <label>Satuan <span class="text-danger">*</span></label>
                <input 
                  type="text" 
                  v-model="medForm.unit" 
                  placeholder="Contoh: Tablet, Kapsul, Botol" 
                  class="form-control" 
                  required 
                />
              </div>
            </div>

            <div class="form-group">
              <label>Keterangan / Aturan Khusus</label>
              <textarea 
                v-model="medForm.description" 
                rows="2" 
                placeholder="Instruksi konsumsi, efek samping umum, atau penyimpanan..."
                class="form-control"
              ></textarea>
            </div>
          </div>

          <div class="modal-footer">
            <button type="button" class="btn btn-outline" @click="showMedicineModal = false">Batal</button>
            <button type="submit" class="btn btn-primary" :disabled="isSubmitting">
              <span v-if="isSubmitting" class="spinner-sm"></span>
              <span v-else>{{ isEditingMedicine ? 'Simpan Perubahan' : 'Tambah Obat' }}</span>
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- ========================================================================= -->
    <!-- MODAL: ATUR / EDIT JADWAL MINUM OBAT -->
    <!-- ========================================================================= -->
    <div v-if="showScheduleModal" class="modal-backdrop" @click="showScheduleModal = false">
      <div class="modal-dialog" @click.stop>
        <div class="modal-header">
          <h3>{{ isEditingSchedule ? 'Edit Jadwal Minum Obat' : 'Atur Jadwal Minum Obat Pasien' }}</h3>
          <button class="modal-close" @click="showScheduleModal = false">&times;</button>
        </div>

        <form @submit.prevent="submitScheduleForm">
          <div class="modal-body">
            <!-- Pilih Pengobatan Pasien (hanya jika mode tambah) -->
            <div class="form-group mb-3" v-if="!isEditingSchedule">
              <label>Pilih Pengobatan Pasien <span class="text-danger">*</span></label>
              <select v-model="schedForm.treatment_id" class="form-control" required>
                <option value="" disabled>-- Pilih Pasien & Pengobatan Aktif --</option>
                <option v-for="t in availableTreatments" :key="t.id" :value="t.id">
                  {{ t.patient?.full_name || 'Pasien #' + t.patient_id }} (NIK: {{ t.patient?.nik || '-' }} | {{ formatPhase(t.phase) }})
                </option>
              </select>
              <small v-if="availableTreatments.length === 0" class="text-muted">
                Belum ada data pengobatan aktif.
              </small>
            </div>

            <!-- Pilih Obat (hanya jika mode tambah) -->
            <div class="form-group mb-3" v-if="!isEditingSchedule">
              <label>Pilih Obat OAT <span class="text-danger">*</span></label>
              <select v-model="schedForm.medicine_id" class="form-control" required>
                <option value="" disabled>-- Pilih Obat OAT --</option>
                <option v-for="m in medicines" :key="m.id" :value="m.id">
                  [{{ m.code }}] {{ m.name }} - {{ m.strength }} ({{ m.unit }})
                </option>
              </select>
            </div>

            <div class="grid-2-cols mb-3">
              <div class="form-group">
                <label>Dosis / Aturan Minum <span class="text-danger">*</span></label>
                <input 
                  type="text" 
                  v-model="schedForm.dosage" 
                  placeholder="Contoh: 3 Tablet, 1 Kapsul" 
                  class="form-control" 
                  required 
                />
              </div>

              <div class="form-group">
                <label>Jam Minum Obat <span class="text-danger">*</span></label>
                <input 
                  type="time" 
                  v-model="schedForm.drink_time" 
                  class="form-control" 
                  required 
                />
              </div>
            </div>

            <div class="grid-2-cols">
              <div class="form-group">
                <label>Jumlah Obat Awal Diberikan <span class="text-danger">*</span></label>
                <input 
                  type="number" 
                  v-model.number="schedForm.quantity_initial" 
                  placeholder="Contoh: 60" 
                  min="1" 
                  class="form-control" 
                  required 
                />
              </div>

              <div class="form-group">
                <label>Jumlah Obat Tersisa <span class="text-danger">*</span></label>
                <input 
                  type="number" 
                  v-model.number="schedForm.quantity_remaining" 
                  placeholder="Contoh: 60" 
                  min="0" 
                  class="form-control" 
                  required 
                />
              </div>
            </div>
          </div>

          <div class="modal-footer">
            <button type="button" class="btn btn-outline" @click="showScheduleModal = false">Batal</button>
            <button type="submit" class="btn btn-primary" :disabled="isSubmitting">
              <span v-if="isSubmitting" class="spinner-sm"></span>
              <span v-else>{{ isEditingSchedule ? 'Simpan Jadwal' : 'Buat Jadwal' }}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import medicineService from '../../services/medicine.service'
import medicineScheduleService from '../../services/medicine-schedule.service'
import treatmentService from '../../services/treatment.service'

// Active Tab
const activeTab = ref('medicines')

// Data State
const medicines = ref([])
const schedules = ref([])
const availableTreatments = ref([])

const isLoadingMedicines = ref(true)
const isLoadingSchedules = ref(true)
const isSubmitting = ref(false)

// Alert Toast
const alertMessage = ref('')
const alertType = ref('success')

const showAlert = (msg, type = 'success') => {
  alertMessage.value = msg
  alertType.value = type
  setTimeout(() => {
    alertMessage.value = ''
  }, 4000)
}

// Filters - Medicines
const medSearchQuery = ref('')
const medFilterCategory = ref('')

// Filters - Schedules
const schedSearchQuery = ref('')
const schedFilterTime = ref('')

onMounted(() => {
  loadMedicines()
  loadSchedules()
  loadTreatments()
})

// Load Master Medicines
const loadMedicines = async () => {
  isLoadingMedicines.value = true
  try {
    const res = await medicineService.getAll()
    medicines.value = res.data || []
  } catch (error) {
    console.error('Failed to load medicines:', error)
    showAlert('Gagal memuat master data obat', 'danger')
  } finally {
    isLoadingMedicines.value = false
  }
}

// Load Medicine Schedules
const loadSchedules = async () => {
  isLoadingSchedules.value = true
  try {
    const res = await medicineScheduleService.getAll()
    schedules.value = res.data || []
  } catch (error) {
    console.error('Failed to load medicine schedules:', error)
    showAlert('Gagal memuat jadwal minum obat', 'danger')
  } finally {
    isLoadingSchedules.value = false
  }
}

// Load Treatments for Schedule Setup
const loadTreatments = async () => {
  try {
    const res = await treatmentService.getAll()
    availableTreatments.value = res.data || []
  } catch (error) {
    console.error('Failed to load treatments for schedules:', error)
  }
}

// ==========================================
// MEDICINES COMPUTED & METHODS
// ==========================================
const oatLini1Count = computed(() => {
  return medicines.value.filter(m => m.category?.toLowerCase().includes('lini 1') || m.category?.toLowerCase().includes('fdc')).length
})

const oatLini2Count = computed(() => {
  return medicines.value.filter(m => m.category?.toLowerCase().includes('lini 2') || m.category?.toLowerCase().includes('tb-ro')).length
})

const activeMedicinesCount = computed(() => {
  return medicines.value.filter(m => m.is_active !== false).length
})

const filteredMedicines = computed(() => {
  return medicines.value.filter(m => {
    const q = medSearchQuery.value.toLowerCase().trim()
    const matchSearch = !q || m.code?.toLowerCase().includes(q) || m.name?.toLowerCase().includes(q) || m.description?.toLowerCase().includes(q)
    const matchCat = !medFilterCategory.value || m.category?.toLowerCase().includes(medFilterCategory.value.toLowerCase())
    return matchSearch && matchCat
  })
})

// Medicine Modal
const showMedicineModal = ref(false)
const isEditingMedicine = ref(false)
const selectedMedicineId = ref(null)

const medForm = ref({
  code: '',
  name: '',
  category: 'Lini 1',
  strength: '',
  unit: 'Tablet',
  description: ''
})

const openAddMedicineModal = () => {
  isEditingMedicine.value = false
  selectedMedicineId.value = null
  medForm.value = {
    code: '',
    name: '',
    category: 'Lini 1',
    strength: '',
    unit: 'Tablet',
    description: ''
  }
  showMedicineModal.value = true
}

const openEditMedicineModal = (med) => {
  isEditingMedicine.value = true
  selectedMedicineId.value = med.id
  medForm.value = {
    code: med.code,
    name: med.name,
    category: med.category,
    strength: med.strength,
    unit: med.unit,
    description: med.description || ''
  }
  showMedicineModal.value = true
}

const submitMedicineForm = async () => {
  isSubmitting.value = true
  try {
    if (isEditingMedicine.value) {
      await medicineService.update(selectedMedicineId.value, medForm.value)
      showAlert('Master data obat berhasil diperbarui!')
    } else {
      await medicineService.create(medForm.value)
      showAlert('Obat baru berhasil ditambahkan!')
    }
    showMedicineModal.value = false
    await loadMedicines()
  } catch (error) {
    console.error('Failed to save medicine:', error)
    const detail = error.response?.data?.detail || 'Gagal menyimpan obat'
    showAlert(detail, 'danger')
  } finally {
    isSubmitting.value = false
  }
}

const confirmDeleteMedicine = async (med) => {
  if (confirm(`Apakah Anda yakin ingin menghapus master obat [${med.code}] ${med.name}?`)) {
    try {
      await medicineService.delete(med.id)
      showAlert('Obat berhasil dihapus!')
      await loadMedicines()
    } catch (error) {
      console.error('Failed to delete medicine:', error)
      showAlert('Gagal menghapus obat', 'danger')
    }
  }
}

// ==========================================
// SCHEDULES COMPUTED & METHODS
// ==========================================
const morningSchedulesCount = computed(() => {
  return schedules.value.filter(s => {
    const h = parseInt((s.drink_time || '').split(':')[0], 10)
    return h >= 5 && h < 12
  }).length
})

const afternoonSchedulesCount = computed(() => {
  return schedules.value.filter(s => {
    const h = parseInt((s.drink_time || '').split(':')[0], 10)
    return h >= 12 && h < 18
  }).length
})

const nightSchedulesCount = computed(() => {
  return schedules.value.filter(s => {
    const h = parseInt((s.drink_time || '').split(':')[0], 10)
    return h >= 18 || h < 5
  }).length
})

const filteredSchedules = computed(() => {
  return schedules.value.filter(s => {
    const q = schedSearchQuery.value.toLowerCase().trim()
    const patientName = s.treatment?.patient?.full_name?.toLowerCase() || ''
    const patientNik = s.treatment?.patient?.nik || ''
    const patientRm = s.treatment?.patient?.medical_record_number?.toLowerCase() || ''
    const medName = s.medicine?.name?.toLowerCase() || ''
    const medCode = s.medicine?.code?.toLowerCase() || ''

    const matchSearch = !q || patientName.includes(q) || patientNik.includes(q) || patientRm.includes(q) || medName.includes(q) || medCode.includes(q)

    let matchTime = true
    if (schedFilterTime.value) {
      const h = parseInt((s.drink_time || '').split(':')[0], 10)
      if (schedFilterTime.value === 'morning') matchTime = h >= 5 && h < 12
      else if (schedFilterTime.value === 'afternoon') matchTime = h >= 12 && h < 18
      else if (schedFilterTime.value === 'night') matchTime = h >= 18 || h < 5
    }

    return matchSearch && matchTime
  })
})

const formatTime = (timeStr) => {
  if (!timeStr) return '-'
  return timeStr.slice(0, 5) // "08:00:00" -> "08:00"
}

const formatPhase = (phase) => {
  if (phase === 'intensive') return 'Fase Intensif'
  if (phase === 'continuation') return 'Fase Lanjutan'
  return phase || '-'
}

const calculateRemainingPercentage = (sched) => {
  if (!sched.quantity_initial || sched.quantity_initial <= 0) return 0
  const pct = Math.round((sched.quantity_remaining / sched.quantity_initial) * 100)
  return Math.max(0, Math.min(100, pct))
}

const getQtyColor = (sched) => {
  const pct = calculateRemainingPercentage(sched)
  if (pct <= 20) return 'text-danger'
  if (pct <= 40) return 'text-warning'
  return 'text-success'
}

const getQtyBarClass = (sched) => {
  const pct = calculateRemainingPercentage(sched)
  if (pct <= 20) return 'bg-danger'
  if (pct <= 40) return 'bg-warning'
  return 'bg-success'
}

// Schedule Modal
const showScheduleModal = ref(false)
const isEditingSchedule = ref(false)
const selectedScheduleId = ref(null)

const schedForm = ref({
  treatment_id: '',
  medicine_id: '',
  dosage: '3 Tablet Sekaligus',
  quantity_initial: 60,
  quantity_remaining: 60,
  drink_time: '08:00'
})

const openAddScheduleModal = () => {
  isEditingSchedule.value = false
  selectedScheduleId.value = null
  schedForm.value = {
    treatment_id: availableTreatments.value[0]?.id || '',
    medicine_id: medicines.value[0]?.id || '',
    dosage: '3 Tablet Sekaligus',
    quantity_initial: 60,
    quantity_remaining: 60,
    drink_time: '08:00'
  }
  showScheduleModal.value = true
}

const openEditScheduleModal = (sched) => {
  isEditingSchedule.value = true
  selectedScheduleId.value = sched.id
  schedForm.value = {
    treatment_id: sched.treatment_id,
    medicine_id: sched.medicine_id,
    dosage: sched.dosage,
    quantity_initial: sched.quantity_initial,
    quantity_remaining: sched.quantity_remaining,
    drink_time: formatTime(sched.drink_time)
  }
  showScheduleModal.value = true
}

const submitScheduleForm = async () => {
  isSubmitting.value = true
  try {
    // Format drink_time with seconds for backend Time type
    const formattedTime = schedForm.value.drink_time.length === 5 ? `${schedForm.value.drink_time}:00` : schedForm.value.drink_time

    if (isEditingSchedule.value) {
      await medicineScheduleService.update(selectedScheduleId.value, {
        dosage: schedForm.value.dosage,
        quantity_initial: schedForm.value.quantity_initial,
        quantity_remaining: schedForm.value.quantity_remaining,
        drink_time: formattedTime
      })
      showAlert('Jadwal minum obat berhasil diperbarui!')
    } else {
      await medicineScheduleService.create({
        treatment_id: Number(schedForm.value.treatment_id),
        medicine_id: Number(schedForm.value.medicine_id),
        dosage: schedForm.value.dosage,
        quantity_initial: Number(schedForm.value.quantity_initial),
        quantity_remaining: Number(schedForm.value.quantity_remaining),
        drink_time: formattedTime
      })
      showAlert('Jadwal minum obat berhasil dibuat!')
    }
    showScheduleModal.value = false
    await loadSchedules()
  } catch (error) {
    console.error('Failed to save schedule:', error)
    const detail = error.response?.data?.detail || 'Gagal menyimpan jadwal minum obat'
    showAlert(detail, 'danger')
  } finally {
    isSubmitting.value = false
  }
}

const confirmDeleteSchedule = async (sched) => {
  const patient = sched.treatment?.patient?.full_name || 'Pasien'
  const med = sched.medicine?.name || 'Obat'
  if (confirm(`Apakah Anda yakin ingin menghapus jadwal obat [${med}] untuk ${patient}?`)) {
    try {
      await medicineScheduleService.delete(sched.id)
      showAlert('Jadwal minum obat berhasil dihapus!')
      await loadSchedules()
    } catch (error) {
      console.error('Failed to delete schedule:', error)
      showAlert('Gagal menghapus jadwal', 'danger')
    }
  }
}
</script>

<style scoped src="./MedicineListView.css"></style>

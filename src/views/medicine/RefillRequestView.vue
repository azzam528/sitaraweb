<template>
  <div class="refill-page">
    <!-- Header -->
    <header class="page-header">
      <div class="header-content">
        <h1 class="page-title">Verifikasi Permintaan Refill OAT</h1>
        <p class="page-subtitle">Verifikasi dan persetujuan permohonan isi ulang / pengambilan obat anti-tuberkulosis.</p>
      </div>
      <div class="header-actions">
        <button class="btn btn-primary" @click="openAddModal">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          Buat Permintaan Refill
        </button>
      </div>
    </header>

    <!-- Toast Alert -->
    <div v-if="alertMessage" class="toast-alert" :class="'toast-' + alertType">
      <span>{{ alertMessage }}</span>
      <button class="btn-close-toast" @click="alertMessage = ''">&times;</button>
    </div>

    <!-- Stats Row -->
    <section class="stats-grid">
      <div class="stat-card">
        <div class="stat-icon-wrapper teal-circle">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
            <line x1="16" y1="13" x2="8" y2="13"></line>
            <line x1="16" y1="17" x2="8" y2="17"></line>
          </svg>
        </div>
        <div class="stat-info">
          <span class="stat-label">TOTAL PERMINTAAN</span>
          <span class="stat-value">{{ refills.length }}</span>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon-wrapper orange-circle">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <polyline points="12 6 12 12 16 14"></polyline>
          </svg>
        </div>
        <div class="stat-info">
          <span class="stat-label">MENUNGGU VERIFIKASI</span>
          <span class="stat-value text-warning">{{ pendingCount }}</span>
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
          <span class="stat-label">DISETUJUI</span>
          <span class="stat-value text-success">{{ approvedCount }}</span>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon-wrapper red-circle">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="15" y1="9" x2="9" y2="15"></line>
            <line x1="9" y1="9" x2="15" y2="15"></line>
          </svg>
        </div>
        <div class="stat-info">
          <span class="stat-label">DITOLAK</span>
          <span class="stat-value text-danger">{{ rejectedCount }}</span>
        </div>
      </div>
    </section>

    <!-- Filter Section -->
    <section class="filter-section card">
      <div class="filter-header">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
        </svg>
        <h2>Filter Permintaan Refill</h2>
      </div>

      <div class="filter-grid-3">
        <!-- 1. Search Name / NIK / Medicine -->
        <div class="form-group">
          <label>Pencarian</label>
          <input 
            type="text" 
            v-model="searchQuery" 
            placeholder="Cari Nama Pasien, NIK, No RM, atau Obat..." 
            class="form-control"
          />
        </div>

        <!-- 2. Filter Status -->
        <div class="form-group">
          <label>Status Permintaan</label>
          <select v-model="filterStatus" class="form-control">
            <option value="">Semua Status</option>
            <option value="pending">Menunggu (Pending)</option>
            <option value="approved">Disetujui (Approved)</option>
            <option value="rejected">Ditolak (Rejected)</option>
          </select>
        </div>

        <!-- 3. Filter Alasan -->
        <div class="form-group">
          <label>Alasan Refill</label>
          <select v-model="filterReason" class="form-control">
            <option value="">Semua Alasan</option>
            <option value="Stok Habis">Stok Habis / Menipis</option>
            <option value="Kontrol Rutin">Jadwal Kontrol Rutin</option>
            <option value="Obat Hilang">Obat Hilang / Rusak</option>
            <option value="Lainnya">Lainnya</option>
          </select>
        </div>
      </div>
    </section>

    <!-- Table Card -->
    <div class="table-card card">
      <div v-if="isLoading" class="loading-state">
        <div class="spinner"></div>
        <p>Memuat permintaan refill obat...</p>
      </div>

      <div v-else-if="filteredRefills.length === 0" class="empty-state">
        <div class="empty-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
          </svg>
        </div>
        <h3>Belum Ada Permintaan Refill</h3>
        <p v-if="searchQuery || filterStatus || filterReason">
          Tidak ditemukan permintaan refill yang cocok dengan filter yang dipilih.
        </p>
        <p v-else>
          Belum ada riwayat permohonan isi ulang obat. Permintaan baru dapat dicatat melalui tombol di atas.
        </p>
        <button class="btn btn-primary mt-3" @click="openAddModal">
          + Buat Permintaan Refill
        </button>
      </div>

      <div v-else class="table-responsive">
        <table class="data-table">
          <thead>
            <tr>
              <th>Pasien</th>
              <th>Obat Diminta</th>
              <th>Jumlah</th>
              <th>Alasan & Catatan</th>
              <th>Tgl Permintaan</th>
              <th>Status</th>
              <th class="text-center">Aksi Verifikasi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="refill in paginatedRefills" :key="refill.id">
              <td>
                <div class="patient-info">
                  <div class="avatar" :class="'avatar-' + getAvatarColor(refill.id)">
                    {{ getInitials(refill.treatment?.patient?.full_name || 'TB') }}
                  </div>
                  <div>
                    <div class="patient-name font-semibold text-dark">
                      {{ refill.treatment?.patient?.full_name || 'Pengobatan #' + refill.treatment_id }}
                    </div>
                    <div class="patient-meta text-xs text-muted">
                      NIK: {{ refill.treatment?.patient?.nik || '-' }} | PMO: {{ refill.treatment?.patient?.pmo_name || '-' }}
                    </div>
                  </div>
                </div>
              </td>
              <td>
                <div class="med-info">
                  <span class="font-medium text-dark">{{ refill.medicine?.name || 'Obat #' + refill.medicine_id }}</span>
                  <span class="text-xs text-muted block">{{ refill.medicine?.strength }} ({{ refill.medicine?.category }})</span>
                </div>
              </td>
              <td>
                <span class="qty-pill font-bold">
                  {{ refill.quantity }} {{ refill.medicine?.unit || 'Tablet' }}
                </span>
              </td>
              <td>
                <div class="reason-cell">
                  <span class="reason-badge">{{ refill.reason }}</span>
                  <p v-if="refill.description" class="desc-text text-xs text-muted mt-1" :title="refill.description">
                    {{ truncate(refill.description, 40) }}
                  </p>
                </div>
              </td>
              <td>
                <div class="date-text text-sm font-medium">
                  {{ formatDate(refill.created_at) }}
                </div>
                <div class="time-text text-xs text-muted">
                  {{ formatTime(refill.created_at) }} WIB
                </div>
              </td>
              <td>
                <span class="status-badge" :class="'status-' + refill.status">
                  {{ formatStatus(refill.status) }}
                </span>
                <div v-if="refill.nurse_note" class="nurse-note-text text-xs text-muted mt-1" :title="refill.nurse_note">
                  Ket: {{ truncate(refill.nurse_note, 25) }}
                </div>
              </td>
              <td class="text-center">
                <!-- Action Buttons for Pending Requests -->
                <div v-if="refill.status === 'pending'" class="quick-actions">
                  <button 
                    class="btn-icon-approve" 
                    title="Setujui Permintaan" 
                    @click="openVerifyModal(refill, 'approved')"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    Setujui
                  </button>

                  <button 
                    class="btn-icon-reject" 
                    title="Tolak Permintaan" 
                    @click="openVerifyModal(refill, 'rejected')"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                    Tolak
                  </button>

                  <button 
                    class="btn-more-actions" 
                    @click.stop="toggleDropdown(refill.id)"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <circle cx="12" cy="12" r="1"></circle>
                      <circle cx="19" cy="12" r="1"></circle>
                      <circle cx="5" cy="12" r="1"></circle>
                    </svg>
                  </button>

                  <!-- Dropdown Menu -->
                  <div v-if="activeDropdown === refill.id" class="dropdown-menu-floating" @click.stop>
                    <button class="dropdown-item" @click="openDetailModal(refill); activeDropdown = null">
                      <span>Lihat Rincian</span>
                    </button>
                    <button 
                      v-if="refill.treatment?.patient?.phone" 
                      class="dropdown-item" 
                      @click="sendWhatsApp(refill); activeDropdown = null"
                    >
                      <span>Hubungi Pasien (WA)</span>
                    </button>
                    <button class="dropdown-item text-danger" @click="confirmDelete(refill); activeDropdown = null">
                      <span>Hapus Permintaan</span>
                    </button>
                  </div>
                </div>

                <!-- Action Dropdown for Processed Requests -->
                <div v-else class="action-dropdown-wrapper">
                  <button class="btn btn-sm btn-outline" @click="openDetailModal(refill)">
                    Lihat Rincian
                  </button>
                  <button 
                    class="btn-more-actions" 
                    @click.stop="toggleDropdown(refill.id)"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <circle cx="12" cy="12" r="1"></circle>
                      <circle cx="19" cy="12" r="1"></circle>
                      <circle cx="5" cy="12" r="1"></circle>
                    </svg>
                  </button>

                  <div v-if="activeDropdown === refill.id" class="dropdown-menu-floating" @click.stop>
                    <button 
                      v-if="refill.treatment?.patient?.phone" 
                      class="dropdown-item" 
                      @click="sendWhatsApp(refill); activeDropdown = null"
                    >
                      <span>Hubungi Pasien (WA)</span>
                    </button>
                    <button class="dropdown-item text-danger" @click="confirmDelete(refill); activeDropdown = null">
                      <span>Hapus Permintaan</span>
                    </button>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div v-if="filteredRefills.length > 0" class="pagination-wrapper">
        <div class="pagination-info">
          Menampilkan {{ (currentPage - 1) * pageSize + 1 }} - {{ Math.min(currentPage * pageSize, filteredRefills.length) }} dari {{ filteredRefills.length }} permintaan
        </div>
        <div class="pagination-controls">
          <button class="btn-page" :disabled="currentPage === 1" @click="currentPage--">Prev</button>
          <button 
            v-for="page in totalPages" 
            :key="page" 
            class="btn-page" 
            :class="{ active: currentPage === page }"
            @click="currentPage = page"
          >
            {{ page }}
          </button>
          <button class="btn-page" :disabled="currentPage === totalPages || totalPages === 0" @click="currentPage++">Next</button>
        </div>
      </div>
    </div>

    <!-- MODAL: Verifikasi Refill (Approve / Reject) -->
    <div v-if="showVerifyModal" class="modal-backdrop" @click="showVerifyModal = false">
      <div class="modal-dialog modal-sm" @click.stop>
        <div class="modal-header">
          <h3>{{ verifyTargetStatus === 'approved' ? 'Setujui Permintaan Refill' : 'Tolak Permintaan Refill' }}</h3>
          <button class="modal-close" @click="showVerifyModal = false">&times;</button>
        </div>

        <form @submit.prevent="submitVerification">
          <div class="modal-body">
            <div class="refill-summary-box mb-3">
              <div class="font-semibold text-dark">
                {{ selectedRefill?.treatment?.patient?.full_name || 'Pasien' }}
              </div>
              <div class="text-sm mt-1">
                Obat: <strong>{{ selectedRefill?.medicine?.name }}</strong> ({{ selectedRefill?.quantity }} {{ selectedRefill?.medicine?.unit || 'Tablet' }})
              </div>
              <div class="text-xs text-muted mt-0.5">
                Alasan: {{ selectedRefill?.reason }}
              </div>
            </div>

            <div class="form-group">
              <label>Catatan Tenaga Kesehatan / Alasan</label>
              <textarea 
                v-model="verifyNurseNote" 
                rows="3" 
                :placeholder="verifyTargetStatus === 'approved' ? 'Contoh: Disetujui untuk pengambilan 28 tablet di farmasi puskesmas...' : 'Contoh: Ditolak karena jadwal kontrol belum tiba atau dosis masih mencukupi...'"
                class="form-control"
              ></textarea>
            </div>
          </div>

          <div class="modal-footer">
            <button type="button" class="btn btn-outline" @click="showVerifyModal = false">Batal</button>
            <button 
              type="submit" 
              class="btn" 
              :class="verifyTargetStatus === 'approved' ? 'btn-success' : 'btn-danger'"
              :disabled="isSubmitting"
            >
              <span v-if="isSubmitting" class="spinner-sm"></span>
              <span v-else>{{ verifyTargetStatus === 'approved' ? 'Konfirmasi Setujui' : 'Konfirmasi Tolak' }}</span>
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- MODAL: Rincian Lengkap Permintaan -->
    <div v-if="showDetailModal" class="modal-backdrop" @click="showDetailModal = false">
      <div class="modal-dialog" @click.stop>
        <div class="modal-header">
          <h3>Rincian Permintaan Refill OAT</h3>
          <button class="modal-close" @click="showDetailModal = false">&times;</button>
        </div>

        <div class="modal-body">
          <div class="detail-section mb-3">
            <h4 class="detail-sec-title">Informasi Pasien</h4>
            <div class="detail-list">
              <div class="detail-row">
                <span class="detail-label">Nama Pasien:</span>
                <span class="detail-val font-semibold">{{ selectedRefill?.treatment?.patient?.full_name }}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">NIK / No. RM:</span>
                <span class="detail-val">{{ selectedRefill?.treatment?.patient?.nik }} / {{ selectedRefill?.treatment?.patient?.medical_record_number }}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Dokter PJ:</span>
                <span class="detail-val">{{ selectedRefill?.treatment?.doctor_name }}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">PMO:</span>
                <span class="detail-val">{{ selectedRefill?.treatment?.patient?.pmo_name }} ({{ selectedRefill?.treatment?.patient?.pmo_phone || '-' }})</span>
              </div>
            </div>
          </div>

          <div class="detail-section mb-3">
            <h4 class="detail-sec-title">Rincian Obat & Permintaan</h4>
            <div class="detail-list">
              <div class="detail-row">
                <span class="detail-label">Nama Obat:</span>
                <span class="detail-val font-semibold">{{ selectedRefill?.medicine?.name }} ({{ selectedRefill?.medicine?.code }})</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Jumlah Diminta:</span>
                <span class="detail-val font-bold text-primary">{{ selectedRefill?.quantity }} {{ selectedRefill?.medicine?.unit || 'Tablet' }}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Alasan Permintaan:</span>
                <span class="detail-val">{{ selectedRefill?.reason }}</span>
              </div>
              <div class="detail-row" v-if="selectedRefill?.description">
                <span class="detail-label">Catatan Pasien:</span>
                <span class="detail-val italic">"{{ selectedRefill?.description }}"</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Waktu Pengajuan:</span>
                <span class="detail-val">{{ formatDate(selectedRefill?.created_at) }}, {{ formatTime(selectedRefill?.created_at) }} WIB</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Status Saat Ini:</span>
                <span class="detail-val">
                  <span class="status-badge" :class="'status-' + selectedRefill?.status">
                    {{ formatStatus(selectedRefill?.status) }}
                  </span>
                </span>
              </div>
              <div class="detail-row" v-if="selectedRefill?.nurse_note">
                <span class="detail-label">Catatan Nakes:</span>
                <span class="detail-val font-medium text-dark">{{ selectedRefill?.nurse_note }}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="modal-footer">
          <button type="button" class="btn btn-outline" @click="showDetailModal = false">Tutup</button>
          <button 
            v-if="selectedRefill?.treatment?.patient?.phone" 
            type="button" 
            class="btn btn-outline-success" 
            @click="sendWhatsApp(selectedRefill)"
          >
            Hubungi Pasien (WA)
          </button>
        </div>
      </div>
    </div>

    <!-- MODAL: Buat Permintaan Refill Baru -->
    <div v-if="showAddModal" class="modal-backdrop" @click="showAddModal = false">
      <div class="modal-dialog" @click.stop>
        <div class="modal-header">
          <h3>Buat Permintaan Refill Obat Baru</h3>
          <button class="modal-close" @click="showAddModal = false">&times;</button>
        </div>

        <form @submit.prevent="submitAddRefill">
          <div class="modal-body">
            <!-- Pilih Pengobatan Pasien -->
            <div class="form-group mb-3">
              <label>Pilih Pasien Pengobatan <span class="text-danger">*</span></label>
              <select v-model="addForm.treatment_id" class="form-control" required>
                <option value="" disabled>-- Pilih Pasien Terdaftar --</option>
                <option v-for="t in availableTreatments" :key="t.id" :value="t.id">
                  {{ t.patient?.full_name || 'Pasien #' + t.patient_id }} (NIK: {{ t.patient?.nik || '-' }} | RM: {{ t.patient?.medical_record_number || '-' }})
                </option>
              </select>
            </div>

            <!-- Pilih Obat OAT -->
            <div class="form-group mb-3">
              <label>Pilih Obat OAT <span class="text-danger">*</span></label>
              <select v-model="addForm.medicine_id" class="form-control" required>
                <option value="" disabled>-- Pilih Obat OAT --</option>
                <option v-for="m in medicines" :key="m.id" :value="m.id">
                  [{{ m.code }}] {{ m.name }} - {{ m.strength }} ({{ m.unit }})
                </option>
              </select>
            </div>

            <div class="grid-2-cols mb-3">
              <div class="form-group">
                <label>Jumlah Obat (Sediaan) <span class="text-danger">*</span></label>
                <input 
                  type="number" 
                  v-model.number="addForm.quantity" 
                  placeholder="Contoh: 28" 
                  min="1" 
                  class="form-control" 
                  required 
                />
              </div>

              <div class="form-group">
                <label>Alasan Permintaan <span class="text-danger">*</span></label>
                <select v-model="addForm.reason" class="form-control" required>
                  <option value="Stok Habis">Stok Habis / Menipis</option>
                  <option value="Kontrol Rutin">Jadwal Kontrol Rutin</option>
                  <option value="Obat Hilang">Obat Hilang / Rusak</option>
                  <option value="Lainnya">Lainnya</option>
                </select>
              </div>
            </div>

            <div class="form-group">
              <label>Keterangan Tambahan / Catatan</label>
              <textarea 
                v-model="addForm.description" 
                rows="3" 
                placeholder="Keterangan kondisi pasien, riwayat kepatuhan, atau kebutuhan obat tambahan..."
                class="form-control"
              ></textarea>
            </div>
          </div>

          <div class="modal-footer">
            <button type="button" class="btn btn-outline" @click="showAddModal = false">Batal</button>
            <button type="submit" class="btn btn-primary" :disabled="isSubmitting">
              <span v-if="isSubmitting" class="spinner-sm"></span>
              <span v-else>Simpan Permintaan Refill</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import refillService from '../../services/refill.service'
import treatmentService from '../../services/treatment.service'
import medicineService from '../../services/medicine.service'

const refills = ref([])
const availableTreatments = ref([])
const medicines = ref([])

const isLoading = ref(true)
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

// Search & Filter
const searchQuery = ref('')
const filterStatus = ref('')
const filterReason = ref('')

// Pagination
const currentPage = ref(1)
const pageSize = 10

// Dropdown
const activeDropdown = ref(null)

const toggleDropdown = (id) => {
  activeDropdown.value = activeDropdown.value === id ? null : id
}

const handleDocumentClick = () => {
  activeDropdown.value = null
}

onMounted(() => {
  document.addEventListener('click', handleDocumentClick)
  loadRefills()
  loadTreatments()
  loadMedicines()
})

onUnmounted(() => {
  document.removeEventListener('click', handleDocumentClick)
})

// Load Refills from API
const loadRefills = async () => {
  isLoading.value = true
  try {
    const res = await refillService.getAll()
    refills.value = res.data || []
  } catch (error) {
    console.error('Failed to load refills:', error)
    showAlert('Gagal memuat daftar permintaan refill obat', 'danger')
  } finally {
    isLoading.value = false
  }
}

// Load Treatments & Medicines for Add Modal
const loadTreatments = async () => {
  try {
    const res = await treatmentService.getAll()
    availableTreatments.value = res.data || []
  } catch (error) {
    console.error('Failed to load treatments:', error)
  }
}

const loadMedicines = async () => {
  try {
    const res = await medicineService.getAll()
    medicines.value = res.data || []
  } catch (error) {
    console.error('Failed to load medicines:', error)
  }
}

// Computed Statistics
const pendingCount = computed(() => refills.value.filter(r => r.status === 'pending').length)
const approvedCount = computed(() => refills.value.filter(r => r.status === 'approved').length)
const rejectedCount = computed(() => refills.value.filter(r => r.status === 'rejected').length)

// Filtered Refills
const filteredRefills = computed(() => {
  return refills.value.filter(r => {
    const q = searchQuery.value.toLowerCase().trim()
    const pName = r.treatment?.patient?.full_name?.toLowerCase() || ''
    const pNik = r.treatment?.patient?.nik || ''
    const pRm = r.treatment?.patient?.medical_record_number?.toLowerCase() || ''
    const medName = r.medicine?.name?.toLowerCase() || ''
    const medCode = r.medicine?.code?.toLowerCase() || ''
    const reason = r.reason?.toLowerCase() || ''

    const matchSearch = !q || pName.includes(q) || pNik.includes(q) || pRm.includes(q) || medName.includes(q) || medCode.includes(q) || reason.includes(q)
    const matchStatus = !filterStatus.value || r.status === filterStatus.value
    const matchReason = !filterReason.value || r.reason?.toLowerCase().includes(filterReason.value.toLowerCase())

    return matchSearch && matchStatus && matchReason
  })
})

const totalPages = computed(() => Math.ceil(filteredRefills.value.length / pageSize) || 1)

const paginatedRefills = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  return filteredRefills.value.slice(start, start + pageSize)
})

// Helpers
const formatStatus = (status) => {
  if (status === 'pending') return 'Menunggu'
  if (status === 'approved') return 'Disetujui'
  if (status === 'rejected') return 'Ditolak'
  return status || '-'
}

const formatDate = (dateStr) => {
  if (!dateStr) return '-'
  const d = new Date(dateStr)
  return d.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })
}

const formatTime = (dateStr) => {
  if (!dateStr) return '-'
  const d = new Date(dateStr)
  return d.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
}

const truncate = (text, maxLen = 40) => {
  if (!text) return '-'
  return text.length > maxLen ? text.slice(0, maxLen) + '...' : text
}

const getInitials = (name) => {
  if (!name) return 'TB'
  return name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase()
}

const getAvatarColor = (id) => {
  const colors = ['teal', 'primary', 'orange', 'green', 'purple']
  return colors[id % colors.length]
}

// Verification Modal (Approve / Reject)
const showVerifyModal = ref(false)
const selectedRefill = ref(null)
const verifyTargetStatus = ref('approved')
const verifyNurseNote = ref('')

const openVerifyModal = (refill, targetStatus) => {
  selectedRefill.value = refill
  verifyTargetStatus.value = targetStatus
  verifyNurseNote.value = refill.nurse_note || ''
  showVerifyModal.value = true
}

const submitVerification = async () => {
  if (!selectedRefill.value) return
  isSubmitting.value = true
  try {
    if (verifyTargetStatus.value === 'approved') {
      await refillService.approve(selectedRefill.value.id, verifyNurseNote.value)
      showAlert('Permintaan refill berhasil disetujui!')
    } else {
      await refillService.reject(selectedRefill.value.id, verifyNurseNote.value)
      showAlert('Permintaan refill telah ditolak!')
    }
    showVerifyModal.value = false
    await loadRefills()
  } catch (error) {
    console.error('Failed to verify refill:', error)
    showAlert('Gagal memproses verifikasi refill', 'danger')
  } finally {
    isSubmitting.value = false
  }
}

// Detail Modal
const showDetailModal = ref(false)
const openDetailModal = (refill) => {
  selectedRefill.value = refill
  showDetailModal.value = true
}

// Add Modal
const showAddModal = ref(false)
const addForm = ref({
  treatment_id: '',
  medicine_id: '',
  quantity: 28,
  reason: 'Stok Habis',
  description: ''
})

const openAddModal = () => {
  addForm.value = {
    treatment_id: availableTreatments.value[0]?.id || '',
    medicine_id: medicines.value[0]?.id || '',
    quantity: 28,
    reason: 'Stok Habis',
    description: ''
  }
  showAddModal.value = true
}

const submitAddRefill = async () => {
  if (!addForm.value.treatment_id || !addForm.value.medicine_id) {
    showAlert('Pilih pengobatan dan obat terlebih dahulu', 'warning')
    return
  }
  isSubmitting.value = true
  try {
    await refillService.create({
      treatment_id: Number(addForm.value.treatment_id),
      medicine_id: Number(addForm.value.medicine_id),
      quantity: Number(addForm.value.quantity),
      reason: addForm.value.reason,
      description: addForm.value.description || null
    })
    showAlert('Permintaan refill obat berhasil dibuat!')
    showAddModal.value = false
    await loadRefills()
  } catch (error) {
    console.error('Failed to create refill:', error)
    showAlert('Gagal membuat permintaan refill', 'danger')
  } finally {
    isSubmitting.value = false
  }
}

// WhatsApp Helper
const sendWhatsApp = (refill) => {
  const phone = refill.treatment?.patient?.phone
  if (!phone) {
    showAlert('Nomor WhatsApp pasien tidak tersedia', 'warning')
    return
  }
  const cleanPhone = phone.replace(/^0/, '62').replace(/\D/g, '')
  const msg = encodeURIComponent(`Halo Bpk/Ibu ${refill.treatment?.patient?.full_name}, terkait permintaan refill obat ${refill.medicine?.name} sejumlah ${refill.quantity} ${refill.medicine?.unit || 'Tablet'}: status permintaan Anda saat ini adalah ${formatStatus(refill.status)}. ${refill.nurse_note ? 'Catatan: ' + refill.nurse_note : ''}`)
  window.open(`https://wa.me/${cleanPhone}?text=${msg}`, '_blank')
}

// Delete Refill
const confirmDelete = async (refill) => {
  const name = refill.treatment?.patient?.full_name || 'Pasien'
  if (confirm(`Apakah Anda yakin ingin menghapus permintaan refill obat ${refill.medicine?.name} untuk ${name}?`)) {
    try {
      await refillService.delete(refill.id)
      showAlert('Permintaan refill berhasil dihapus!')
      await loadRefills()
    } catch (error) {
      console.error('Failed to delete refill:', error)
      showAlert('Gagal menghapus permintaan refill', 'danger')
    }
  }
}
</script>

<style scoped src="./RefillRequestView.css"></style>

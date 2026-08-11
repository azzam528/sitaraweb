<template>
  <div class="complaint-list-page">
    <!-- Header -->
    <header class="page-header">
      <div class="header-content">
        <h1 class="page-title">Laporan Keluhan & Efek Samping (ESO)</h1>
        <p class="page-subtitle">Monitoring dan penanganan keluhan klinis pasien TB secara cepat dan tepat.</p>
      </div>
      <div class="header-actions">
        <button class="btn btn-primary" @click="openAddModal">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          Catat Keluhan Baru
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
        <div class="stat-icon-wrapper blue-circle">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
        </div>
        <div class="stat-info">
          <span class="stat-label">TOTAL KELUHAN</span>
          <span class="stat-value">{{ complaints.length }}</span>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon-wrapper red-circle">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
        </div>
        <div class="stat-info">
          <span class="stat-label">MENUNGGU RESPON</span>
          <span class="stat-value text-danger">{{ pendingCount }}</span>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon-wrapper teal-circle">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="23 4 23 10 17 10"></polyline>
            <polyline points="1 20 1 14 7 14"></polyline>
            <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
          </svg>
        </div>
        <div class="stat-info">
          <span class="stat-label">SEDANG DIPROSES</span>
          <span class="stat-value">{{ inProgressCount }}</span>
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
          <span class="stat-label">SELESAI / TERATASI</span>
          <span class="stat-value text-success">{{ resolvedCount }}</span>
        </div>
      </div>
    </section>

    <!-- Filter Section -->
    <section class="filter-section card">
      <div class="filter-header">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
        </svg>
        <h2>Filter Laporan Keluhan</h2>
      </div>

      <div class="filter-grid-3">
        <!-- 1. Search Name / NIK / Category / Description -->
        <div class="form-group">
          <label>Pencarian</label>
          <input 
            type="text" 
            v-model="searchQuery" 
            placeholder="Cari Nama Pasien, NIK, Kategori, atau Deskripsi..." 
            class="form-control"
          />
        </div>

        <!-- 2. Filter Status -->
        <div class="form-group">
          <label>Status Penanganan</label>
          <select v-model="filterStatus" class="form-control">
            <option value="">Semua Status</option>
            <option value="pending">Menunggu Respon (Pending)</option>
            <option value="in_progress">Sedang Diproses (In Progress)</option>
            <option value="resolved">Selesai (Resolved)</option>
          </select>
        </div>

        <!-- 3. Filter Category -->
        <div class="form-group">
          <label>Kategori Keluhan</label>
          <select v-model="filterCategory" class="form-control">
            <option value="">Semua Kategori</option>
            <option value="Mual & Muntah">Mual & Muntah</option>
            <option value="Pusing & Sakit Kepala">Pusing & Sakit Kepala</option>
            <option value="Gatal & Ruam Kulit">Gatal & Ruam Kulit</option>
            <option value="Nyeri Sendi">Nyeri Sendi</option>
            <option value="Mata / Kulit Kuning">Mata / Kulit Kuning (Hepatotoksik)</option>
            <option value="Gangguan Penglihatan">Gangguan Penglihatan</option>
            <option value="Efek Samping Obat">Efek Samping Obat (ESO)</option>
            <option value="Lainnya">Lainnya</option>
          </select>
        </div>
      </div>
    </section>

    <!-- Table Card -->
    <div class="table-card card">
      <div v-if="isLoading" class="loading-state">
        <div class="spinner"></div>
        <p>Memuat laporan keluhan...</p>
      </div>

      <div v-else-if="filteredComplaints.length === 0" class="empty-state">
        <div class="empty-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
        </div>
        <h3>Belum Ada Laporan Keluhan</h3>
        <p v-if="searchQuery || filterStatus || filterCategory">
          Tidak ditemukan keluhan yang cocok dengan kriteria filter yang dipilih.
        </p>
        <p v-else>
          Belum ada laporan keluhan atau efek samping dari pasien. Keluhan baru dapat dicatat melalui tombol di atas.
        </p>
        <button class="btn btn-primary mt-3" @click="openAddModal">
          + Catat Keluhan Baru
        </button>
      </div>

      <div v-else class="table-responsive">
        <table class="data-table">
          <thead>
            <tr>
              <th>Pasien</th>
              <th>Kategori Keluhan</th>
              <th>Deskripsi Keluhan</th>
              <th>Waktu Laporan</th>
              <th>Status</th>
              <th>Tanggapan Medis</th>
              <th class="text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="comp in paginatedComplaints" :key="comp.id">
              <td>
                <div class="patient-info">
                  <div class="avatar" :class="'avatar-' + getAvatarColor(comp.id)">
                    {{ getInitials(comp.treatment?.patient?.full_name || 'TB') }}
                  </div>
                  <div>
                    <div class="patient-name font-semibold text-dark">
                      {{ comp.treatment?.patient?.full_name || 'Pengobatan #' + comp.treatment_id }}
                    </div>
                    <div class="patient-meta text-xs text-muted">
                      NIK: {{ comp.treatment?.patient?.nik || '-' }} | RM: {{ comp.treatment?.patient?.medical_record_number || '-' }}
                    </div>
                  </div>
                </div>
              </td>
              <td>
                <span class="category-badge">{{ comp.category }}</span>
              </td>
              <td>
                <div class="desc-text" :title="comp.description">
                  {{ truncate(comp.description, 60) }}
                </div>
              </td>
              <td>
                <div class="date-text text-sm">
                  {{ formatDate(comp.created_at) }}
                </div>
                <div class="time-text text-xs text-muted">
                  {{ formatTime(comp.created_at) }} WIB
                </div>
              </td>
              <td>
                <span class="status-badge" :class="'status-' + comp.status">
                  {{ formatStatus(comp.status) }}
                </span>
              </td>
              <td>
                <div v-if="comp.response" class="response-text" :title="comp.response">
                  <span class="response-icon">✓</span>
                  {{ truncate(comp.response, 45) }}
                </div>
                <div v-else class="text-xs text-muted italic">
                  Belum ada tanggapan
                </div>
              </td>
              <td class="text-center">
                <div class="action-dropdown-wrapper">
                  <button 
                    class="btn-more-actions" 
                    @click.stop="toggleDropdown(comp.id)" 
                    title="Menu Aksi"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <circle cx="12" cy="12" r="1"></circle>
                      <circle cx="19" cy="12" r="1"></circle>
                      <circle cx="5" cy="12" r="1"></circle>
                    </svg>
                  </button>

                  <div v-if="activeDropdown === comp.id" class="dropdown-menu-floating" @click.stop>
                    <button class="dropdown-item" @click="viewDetail(comp.id); activeDropdown = null">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                      </svg>
                      <span>Lihat Detail</span>
                    </button>

                    <button class="dropdown-item" @click="openResponseModal(comp); activeDropdown = null">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                      </svg>
                      <span>Beri Tanggapan / Update</span>
                    </button>

                    <button 
                      v-if="comp.treatment?.patient?.phone" 
                      class="dropdown-item" 
                      @click="sendWhatsApp(comp); activeDropdown = null"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                      </svg>
                      <span>Hubungi Pasien (WA)</span>
                    </button>

                    <button class="dropdown-item text-danger" @click="confirmDelete(comp); activeDropdown = null">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="3 6 5 6 21 6"></polyline>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                      </svg>
                      <span>Hapus Keluhan</span>
                    </button>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div v-if="filteredComplaints.length > 0" class="pagination-wrapper">
        <div class="pagination-info">
          Menampilkan {{ (currentPage - 1) * pageSize + 1 }} - {{ Math.min(currentPage * pageSize, filteredComplaints.length) }} dari {{ filteredComplaints.length }} keluhan
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

    <!-- MODAL: Catat Keluhan Baru -->
    <div v-if="showAddModal" class="modal-backdrop" @click="showAddModal = false">
      <div class="modal-dialog" @click.stop>
        <div class="modal-header">
          <h3>Catat Keluhan Pasien Baru</h3>
          <button class="modal-close" @click="showAddModal = false">&times;</button>
        </div>

        <form @submit.prevent="submitAddComplaint">
          <div class="modal-body">
            <div class="form-group mb-3">
              <label>Pilih Pasien / Pengobatan <span class="text-danger">*</span></label>
              <select v-model="addForm.treatment_id" class="form-control" required>
                <option value="" disabled>-- Pilih Pasien & Pengobatan Terdaftar --</option>
                <option v-for="t in availableTreatments" :key="t.id" :value="t.id">
                  {{ t.patient?.full_name || 'Pasien #' + t.patient_id }} (NIK: {{ t.patient?.nik || '-' }} | RM: {{ t.patient?.medical_record_number || '-' }})
                </option>
              </select>
              <small v-if="availableTreatments.length === 0" class="text-muted">
                Belum ada data pengobatan aktif.
              </small>
            </div>

            <div class="form-group mb-3">
              <label>Kategori Keluhan / Gejala <span class="text-danger">*</span></label>
              <select v-model="addForm.category" class="form-control" required>
                <option value="Mual & Muntah">Mual & Muntah</option>
                <option value="Pusing & Sakit Kepala">Pusing & Sakit Kepala</option>
                <option value="Gatal & Ruam Kulit">Gatal & Ruam Kulit</option>
                <option value="Nyeri Sendi">Nyeri Sendi</option>
                <option value="Mata / Kulit Kuning">Mata / Kulit Kuning (Hepatotoksik)</option>
                <option value="Gangguan Penglihatan">Gangguan Penglihatan</option>
                <option value="Efek Samping Obat">Efek Samping Obat (ESO Lainnya)</option>
                <option value="Kondisi Klinis TB">Kondisi Klinis TB (Batuk Darah/Sesak)</option>
                <option value="Lainnya">Keluhan Lainnya</option>
              </select>
            </div>

            <div class="form-group">
              <label>Deskripsi Keluhan Pasien <span class="text-danger">*</span></label>
              <textarea 
                v-model="addForm.description" 
                rows="4" 
                placeholder="Jelaskan secara detail gejala yang dirasakan pasien, durasi keluhan, dan faktor yang memperberat..."
                class="form-control"
                required
              ></textarea>
            </div>
          </div>

          <div class="modal-footer">
            <button type="button" class="btn btn-outline" @click="showAddModal = false">Batal</button>
            <button type="submit" class="btn btn-primary" :disabled="isSubmitting">
              <span v-if="isSubmitting" class="spinner-sm"></span>
              <span v-else>Simpan Keluhan</span>
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- MODAL: Beri Tanggapan / Update Status -->
    <div v-if="showResponseModal" class="modal-backdrop" @click="showResponseModal = false">
      <div class="modal-dialog" @click.stop>
        <div class="modal-header">
          <h3>Tanggapan Medis & Update Status</h3>
          <button class="modal-close" @click="showResponseModal = false">&times;</button>
        </div>

        <form @submit.prevent="submitResponseForm">
          <div class="modal-body">
            <div class="complaint-summary mb-3">
              <div class="text-xs font-bold text-muted">KELUHAN PASIEN:</div>
              <div class="font-semibold text-dark">{{ selectedComplaint?.treatment?.patient?.full_name || 'Pasien' }}</div>
              <div class="text-sm text-muted mt-1 italic">"{{ selectedComplaint?.description }}"</div>
            </div>

            <div class="form-group mb-3">
              <label>Status Penanganan <span class="text-danger">*</span></label>
              <select v-model="responseForm.status" class="form-control" required>
                <option value="pending">Menunggu Respon (Pending)</option>
                <option value="in_progress">Sedang Diproses / Observasi (In Progress)</option>
                <option value="resolved">Selesai / Teratasi (Resolved)</option>
              </select>
            </div>

            <div class="form-group">
              <label>Tanggapan Medis / Rekomendasi Klinis</label>
              <textarea 
                v-model="responseForm.response" 
                rows="4" 
                placeholder="Tuliskan instruksi penanganan, resep simtomatis, atau anjuran kontrol ke faskes..."
                class="form-control"
              ></textarea>
            </div>
          </div>

          <div class="modal-footer">
            <button type="button" class="btn btn-outline" @click="showResponseModal = false">Batal</button>
            <button type="submit" class="btn btn-primary" :disabled="isSubmitting">
              <span v-if="isSubmitting" class="spinner-sm"></span>
              <span v-else>Simpan Tanggapan</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import complaintService from '../../services/complaint.service'
import treatmentService from '../../services/treatment.service'

const router = useRouter()

// Data State
const complaints = ref([])
const availableTreatments = ref([])
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
const filterCategory = ref('')

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
  loadComplaints()
  loadTreatments()
})

onUnmounted(() => {
  document.removeEventListener('click', handleDocumentClick)
})

// Load Complaints from API
const loadComplaints = async () => {
  isLoading.value = true
  try {
    const res = await complaintService.getAll()
    complaints.value = res.data || []
  } catch (error) {
    console.error('Failed to load complaints:', error)
    showAlert('Gagal memuat daftar keluhan pasien', 'danger')
  } finally {
    isLoading.value = false
  }
}

// Load Treatments for Selector
const loadTreatments = async () => {
  try {
    const res = await treatmentService.getAll()
    availableTreatments.value = res.data || []
  } catch (error) {
    console.error('Failed to load treatments:', error)
  }
}

// Computed Statistics
const pendingCount = computed(() => complaints.value.filter(c => c.status === 'pending').length)
const inProgressCount = computed(() => complaints.value.filter(c => c.status === 'in_progress').length)
const resolvedCount = computed(() => complaints.value.filter(c => c.status === 'resolved').length)

// Filtered & Paginated
const filteredComplaints = computed(() => {
  return complaints.value.filter(c => {
    const q = searchQuery.value.toLowerCase().trim()
    const pName = c.treatment?.patient?.full_name?.toLowerCase() || ''
    const pNik = c.treatment?.patient?.nik || ''
    const pRm = c.treatment?.patient?.medical_record_number?.toLowerCase() || ''
    const cat = c.category?.toLowerCase() || ''
    const desc = c.description?.toLowerCase() || ''

    const matchSearch = !q || pName.includes(q) || pNik.includes(q) || pRm.includes(q) || cat.includes(q) || desc.includes(q)
    const matchStatus = !filterStatus.value || c.status === filterStatus.value
    const matchCategory = !filterCategory.value || c.category?.toLowerCase().includes(filterCategory.value.toLowerCase())

    return matchSearch && matchStatus && matchCategory
  })
})

const totalPages = computed(() => Math.ceil(filteredComplaints.value.length / pageSize) || 1)

const paginatedComplaints = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  return filteredComplaints.value.slice(start, start + pageSize)
})

// Helpers
const formatStatus = (status) => {
  if (status === 'pending') return 'Menunggu Respon'
  if (status === 'in_progress') return 'Sedang Diproses'
  if (status === 'resolved') return 'Selesai'
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

const truncate = (text, maxLen = 60) => {
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

// Navigation & Actions
const viewDetail = (id) => {
  router.push(`/dashboard/complaints/${id}`)
}

const sendWhatsApp = (comp) => {
  const phone = comp.treatment?.patient?.phone
  if (!phone) {
    showAlert('Nomor WhatsApp pasien tidak tersedia', 'warning')
    return
  }
  const cleanPhone = phone.replace(/^0/, '62').replace(/\D/g, '')
  const msg = encodeURIComponent(`Halo Bpk/Ibu ${comp.treatment?.patient?.full_name}, kami dari tim medis SITARA telah menerima keluhan Anda mengenai "${comp.category}". ${comp.response ? 'Rekomendasi dokter: ' + comp.response : 'Mohon menunggu, tim kami sedang menindaklanjuti keluhan Anda.'}`)
  window.open(`https://wa.me/${cleanPhone}?text=${msg}`, '_blank')
}

// Modal Add Complaint
const showAddModal = ref(false)
const addForm = ref({
  treatment_id: '',
  category: 'Mual & Muntah',
  description: ''
})

const openAddModal = () => {
  addForm.value = {
    treatment_id: availableTreatments.value[0]?.id || '',
    category: 'Mual & Muntah',
    description: ''
  }
  showAddModal.value = true
}

const submitAddComplaint = async () => {
  if (!addForm.value.treatment_id) {
    showAlert('Pilih pasien pengobatan terlebih dahulu', 'warning')
    return
  }
  isSubmitting.value = true
  try {
    await complaintService.create({
      treatment_id: Number(addForm.value.treatment_id),
      category: addForm.value.category,
      description: addForm.value.description
    })
    showAlert('Keluhan pasien berhasil dicatat!')
    showAddModal.value = false
    await loadComplaints()
  } catch (error) {
    console.error('Failed to create complaint:', error)
    showAlert('Gagal mencatat keluhan baru', 'danger')
  } finally {
    isSubmitting.value = false
  }
}

// Modal Response
const showResponseModal = ref(false)
const selectedComplaint = ref(null)
const responseForm = ref({
  status: 'in_progress',
  response: ''
})

const openResponseModal = (comp) => {
  selectedComplaint.value = comp
  responseForm.value = {
    status: comp.status || 'in_progress',
    response: comp.response || ''
  }
  showResponseModal.value = true
}

const submitResponseForm = async () => {
  if (!selectedComplaint.value) return
  isSubmitting.value = true
  try {
    await complaintService.update(selectedComplaint.value.id, {
      status: responseForm.value.status,
      response: responseForm.value.response || null
    })
    showAlert('Tanggapan keluhan berhasil disimpan!')
    showResponseModal.value = false
    await loadComplaints()
  } catch (error) {
    console.error('Failed to update complaint response:', error)
    showAlert('Gagal memperbarui tanggapan keluhan', 'danger')
  } finally {
    isSubmitting.value = false
  }
}

// Delete Complaint
const confirmDelete = async (comp) => {
  const name = comp.treatment?.patient?.full_name || 'Pasien'
  if (confirm(`Apakah Anda yakin ingin menghapus keluhan [${comp.category}] dari ${name}?`)) {
    try {
      await complaintService.delete(comp.id)
      showAlert('Keluhan berhasil dihapus!')
      await loadComplaints()
    } catch (error) {
      console.error('Failed to delete complaint:', error)
      showAlert('Gagal menghapus keluhan', 'danger')
    }
  }
}
</script>

<style scoped src="./ComplaintListView.css"></style>

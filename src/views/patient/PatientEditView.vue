<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import api from '@/services/api'

const route = useRoute()
const router = useRouter()

const patientId = route.params.id

const loading = ref(true)
const saving = ref(false)
const error = ref('')
const success = ref('')

const patientData = ref({
  id: null,
  medical_record_number: '',
  full_name: '',
  nik: '',
  birth_date: '',
  gender: 'male',
  phone: '',
  address: '',
  occupation: '',
  pmo_name: '',
  pmo_phone: '',
  clinical_note: ''
})

/**
 * Ambil data pasien dari backend
 */
const fetchPatient = async () => {
  loading.value = true
  error.value = ''

  try {
    const response = await api.get(`/patients/${patientId}`)

    console.log('GET PATIENT:', response.data)

    const patient = response.data

    patientData.value = {
      id: patient.id,
      medical_record_number: patient.medical_record_number || '',
      full_name: patient.full_name || '',
      nik: patient.nik || '',
      birth_date: patient.birth_date || '',
      gender: patient.gender || 'male',
      phone: patient.phone || '',
      address: patient.address || '',
      occupation: patient.occupation || '',
      pmo_name: patient.pmo_name || '',
      pmo_phone: patient.pmo_phone || '',
      clinical_note: patient.clinical_note || ''
    }

  } catch (err) {
    console.error('GET PATIENT ERROR:', err)

    error.value =
      err.response?.data?.detail ||
      'Gagal memuat data pasien.'
  } finally {
    loading.value = false
  }
}

/**
 * Simpan perubahan pasien
 */
const savePatient = async () => {
  saving.value = true
  error.value = ''
  success.value = ''

  try {
    /**
     * Hanya kirim field yang memang diterima
     * oleh PatientUpdate di FastAPI.
     */
    const payload = {
      full_name: patientData.value.full_name,
      phone: patientData.value.phone,
      address: patientData.value.address,
      occupation: patientData.value.occupation,
      pmo_name: patientData.value.pmo_name,
      pmo_phone: patientData.value.pmo_phone,
      clinical_note: patientData.value.clinical_note
    }

    console.log('=== UPDATE PATIENT ===')
    console.log('Patient ID:', patientId)
    console.log('Payload:', payload)

    const response = await api.put(
      `/patients/${patientId}`,
      payload
    )

    console.log('UPDATE RESPONSE:', response.data)

    success.value = 'Data pasien berhasil diperbarui.'

    /**
     * Tunggu sebentar supaya pesan sukses
     * sempat terlihat.
     */
    setTimeout(() => {
      router.push(`/dashboard/patients/${patientId}`)
    }, 700)

  } catch (err) {
    console.error('=== UPDATE PATIENT ERROR ===')
    console.error('Status:', err.response?.status)
    console.error('Response:', err.response?.data)
    console.error('Error:', err)

    error.value =
      err.response?.data?.detail ||
      err.response?.data?.message ||
      `Gagal menyimpan perubahan. Status: ${err.response?.status || 'unknown'}`
  } finally {
    saving.value = false
  }
}

/**
 * Batal edit
 */
const cancelEdit = () => {
  router.push(`/dashboard/patients/${patientId}`)
}

onMounted(() => {
  fetchPatient()
})
</script>

<template>
  <div class="patient-edit-page">

    <!-- ============================================= -->
    <!-- Header Navigation -->
    <!-- ============================================= -->

    <div class="header-nav">
      <button
        type="button"
        @click="cancelEdit"
        class="back-link"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <line
            x1="19"
            y1="12"
            x2="5"
            y2="12"
          ></line>

          <polyline
            points="12 19 5 12 12 5"
          ></polyline>
        </svg>

        Batal & Kembali
      </button>
    </div>


    <!-- ============================================= -->
    <!-- Page Header -->
    <!-- ============================================= -->

    <div class="page-header">
      <h1 class="page-title">
        Edit Data Pasien
      </h1>

      <p class="subtitle">
        Perbarui informasi personal dan data pendamping pasien.
      </p>
    </div>


    <!-- ============================================= -->
    <!-- Loading -->
    <!-- ============================================= -->

    <div
      v-if="loading"
      class="card form-card"
    >
      <div class="loading-state">
        Memuat data pasien...
      </div>
    </div>


    <!-- ============================================= -->
    <!-- Error -->
    <!-- ============================================= -->

    <div
      v-else-if="error && !patientData.id"
      class="card form-card"
    >
      <div class="error-state">
        <strong>Gagal memuat data pasien</strong>

        <p>
          {{ error }}
        </p>

        <button
          type="button"
          class="btn btn-primary"
          @click="fetchPatient"
        >
          Coba Lagi
        </button>
      </div>
    </div>


    <!-- ============================================= -->
    <!-- Form -->
    <!-- ============================================= -->

    <form
      v-else
      @submit.prevent="savePatient"
      class="edit-form"
    >

      <!-- =========================================== -->
      <!-- Success Message -->
      <!-- =========================================== -->

      <div
        v-if="success"
        class="success-message"
      >
        {{ success }}
      </div>


      <!-- =========================================== -->
      <!-- Error Message -->
      <!-- =========================================== -->

      <div
        v-if="error"
        class="error-message"
      >
        {{ error }}
      </div>


      <!-- =========================================== -->
      <!-- Main Grid -->
      <!-- =========================================== -->

      <div class="grid-layout">


        <!-- ========================================= -->
        <!-- KOLOM KIRI -->
        <!-- ========================================= -->

        <div class="left-col">

          <!-- ======================================= -->
          <!-- Identitas Lengkap -->
          <!-- ======================================= -->

          <div class="card form-card">

            <h3 class="card-title">
              Identitas Lengkap
            </h3>


            <!-- Nomor Rekam Medis -->

            <div class="form-group">

              <label>
                Nomor Rekam Medis
              </label>

              <input
                type="text"
                v-model="patientData.medical_record_number"
                class="form-control"
                disabled
              />

              <small class="form-help">
                Nomor rekam medis tidak dapat diubah.
              </small>

            </div>


            <!-- Nama Lengkap -->

            <div class="form-group">

              <label>
                Nama Lengkap
                <span class="required">*</span>
              </label>

              <input
                type="text"
                v-model="patientData.full_name"
                class="form-control"
                placeholder="Nama lengkap pasien"
                required
              />

            </div>


            <!-- NIK -->

            <div class="form-group">

              <label>
                NIK
              </label>

              <input
                type="text"
                v-model="patientData.nik"
                class="form-control"
                disabled
              />

              <small class="form-help">
                NIK tidak dapat diubah melalui form ini.
              </small>

            </div>


            <!-- Tanggal Lahir + Gender -->

            <div class="form-row">

              <div class="form-group half">

                <label>
                  Tanggal Lahir
                </label>

                <input
                  type="date"
                  v-model="patientData.birth_date"
                  class="form-control"
                  disabled
                />

              </div>


              <div class="form-group half">

                <label>
                  Jenis Kelamin
                </label>

                <select
                  v-model="patientData.gender"
                  class="form-select"
                  disabled
                >

                  <option value="male">
                    Laki-laki
                  </option>

                  <option value="female">
                    Perempuan
                  </option>

                </select>

              </div>

            </div>


            <!-- Telepon + Pekerjaan -->

            <div class="form-row">

              <div class="form-group half">

                <label>
                  Nomor Telepon
                  <span class="required">*</span>
                </label>

                <input
                  type="tel"
                  v-model="patientData.phone"
                  class="form-control"
                  placeholder="08xxxxxxxxxx"
                  required
                />

              </div>


              <div class="form-group half">

                <label>
                  Pekerjaan
                </label>

                <input
                  type="text"
                  v-model="patientData.occupation"
                  class="form-control"
                  placeholder="Pekerjaan pasien"
                />

              </div>

            </div>


            <!-- Alamat -->

            <div class="form-group">

              <label>
                Alamat Lengkap
                <span class="required">*</span>
              </label>

              <textarea
                v-model="patientData.address"
                class="form-control"
                rows="3"
                placeholder="Alamat lengkap pasien"
                required
              ></textarea>

            </div>


            <!-- Catatan Klinis -->

            <div class="form-group">

              <label>
                Catatan Klinis
              </label>

              <textarea
                v-model="patientData.clinical_note"
                class="form-control"
                rows="4"
                placeholder="Catatan tambahan mengenai pasien"
              ></textarea>

            </div>

          </div>


        </div>


        <!-- ========================================= -->
        <!-- KOLOM KANAN -->
        <!-- ========================================= -->

        <div class="right-col">


          <!-- ======================================= -->
          <!-- Informasi PMO -->
          <!-- ======================================= -->

          <div class="card form-card">

            <h3 class="card-title">
              Tim Kesehatan & PMO
            </h3>


            <p class="card-description">
              Informasi pendamping minum obat pasien.
            </p>


            <!-- Nama PMO -->

            <div class="form-group">

              <label>
                Nama PMO
                <span class="required">*</span>
              </label>

              <input
                type="text"
                v-model="patientData.pmo_name"
                class="form-control"
                placeholder="Nama PMO"
                required
              />

            </div>


            <!-- Nomor PMO -->

            <div class="form-group">

              <label>
                Nomor Telepon PMO
                <span class="required">*</span>
              </label>

              <input
                type="tel"
                v-model="patientData.pmo_phone"
                class="form-control"
                placeholder="08xxxxxxxxxx"
                required
              />

            </div>

          </div>


          <!-- ======================================= -->
          <!-- Informasi Medis -->
          <!-- ======================================= -->

          <div class="card form-card">

            <h3 class="card-title">
              Informasi Medis
            </h3>


            <p class="card-description">
              Data diagnosis dan pengobatan pasien dikelola
              melalui modul Treatment.
            </p>


            <!-- Fase -->

            <div class="form-group">

              <label>
                Fase Pengobatan
              </label>

              <input
                type="text"
                :value="
                  treatment?.phase === 'intensive'
                    ? 'Fase Intensif'
                    : treatment?.phase === 'continuation'
                      ? 'Fase Lanjutan'
                      : '-'
                "
                class="form-control"
                disabled
              />

            </div>


            <!-- Diagnosis -->

            <div class="form-group">

              <label>
                Tanggal Diagnosis
              </label>

              <input
                type="date"
                :value="treatment?.diagnosis_date || ''"
                class="form-control"
                disabled
              />

            </div>


            <!-- Mulai Terapi -->

            <div class="form-group">

              <label>
                Tanggal Mulai Terapi
              </label>

              <input
                type="date"
                :value="treatment?.therapy_start_date || ''"
                class="form-control"
                disabled
              />

            </div>


            <!-- Selesai Terapi -->

            <div class="form-group">

              <label>
                Tanggal Selesai Terapi
              </label>

              <input
                type="date"
                :value="treatment?.therapy_end_date || ''"
                class="form-control"
                disabled
              />

            </div>


            <!-- Regimen -->

            <div class="form-group">

              <label>
                Regimen
              </label>

              <input
                type="text"
                :value="
                  treatment?.regimen === 'category_1'
                    ? 'Kategori 1'
                    : treatment?.regimen === 'category_2'
                      ? 'Kategori 2'
                      : treatment?.regimen === 'mdr'
                        ? 'MDR'
                        : '-'
                "
                class="form-control"
                disabled
              />

            </div>


            <!-- Status -->

            <div class="form-group">

              <label>
                Status Pengobatan
              </label>

              <input
                type="text"
                :value="
                  treatment?.status === 'active'
                    ? 'Aktif'
                    : treatment?.status === 'completed'
                      ? 'Selesai'
                      : treatment?.status === 'dropped'
                        ? 'Putus Berobat'
                        : '-'
                "
                class="form-control"
                disabled
              />

            </div>


            <!-- Dokter -->

            <div class="form-group">

              <label>
                Dokter Penanggung Jawab
              </label>

              <input
                type="text"
                :value="treatment?.doctor_name || '-'"
                class="form-control"
                disabled
              />

            </div>


            <div
              v-if="treatment"
              class="medical-info-note"
            >
              Untuk mengubah data pengobatan, gunakan modul
              <strong>Monitoring Pengobatan</strong>.
            </div>


            <div
              v-else
              class="medical-info-note"
            >
              Pasien ini belum memiliki data treatment aktif.

            </div>

          </div>


        </div>

      </div>


      <!-- =========================================== -->
      <!-- Footer Actions -->
      <!-- =========================================== -->

      <div class="form-actions">

        <button
          type="button"
          @click="cancelEdit"
          class="btn btn-outline btn-lg"
          :disabled="saving"
        >
          Batal
        </button>


        <button
          type="submit"
          class="btn btn-primary btn-lg"
          :disabled="saving"
        >

          <span v-if="saving">
            Menyimpan...
          </span>

          <span v-else>
            Simpan Perubahan
          </span>

        </button>

      </div>

    </form>

  </div>
</template>

<style scoped src="./PatientEditView.css"></style>

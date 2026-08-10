<script setup>
import { ref } from 'vue'

const profileData = ref({
  name: 'Admin Puskesmas',
  role: 'Administrator',
  facility: 'Puskesmas Sukajadi',
  nip: '19850212 201001 2 003',
  email: 'admin.sukajadi@sitaratb.id',
  phone: '081234567890'
})

const isEditing = ref(false)

const saveProfile = () => {
  isEditing.value = false
  // Dummy save
}
</script>

<template>
  <div class="profile-page">
    <div class="page-header">
      <h1 class="page-title">Profil Pengguna</h1>
    </div>

    <div class="profile-container">
      <!-- Left Column: Avatar & Quick Info -->
      <div class="card profile-card">
        <div class="avatar-section">
          <div class="avatar-lg">
            <span>AP</span>
          </div>
          <button class="btn btn-outline btn-sm change-photo-btn">Ubah Foto</button>
        </div>
        <div class="info-section">
          <h2 class="profile-name">{{ profileData.name }}</h2>
          <span class="badge badge-primary role-badge">{{ profileData.role }}</span>
          <p class="facility-text">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
            {{ profileData.facility }}
          </p>
        </div>
      </div>

      <!-- Right Column: Details & Edit Form -->
      <div class="card details-card">
        <div class="card-header">
          <h3>Informasi Personal</h3>
          <button v-if="!isEditing" class="btn btn-outline" @click="isEditing = true">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
            Edit Profil
          </button>
        </div>

        <form @submit.prevent="saveProfile" class="profile-form">
          <div class="form-group">
            <label>Nama Lengkap</label>
            <input type="text" v-model="profileData.name" class="form-control" :disabled="!isEditing">
          </div>
          
          <div class="form-group">
            <label>NIP / ID Pegawai</label>
            <input type="text" v-model="profileData.nip" class="form-control" :disabled="!isEditing">
          </div>

          <div class="form-row">
            <div class="form-group half">
              <label>Email</label>
              <input type="email" v-model="profileData.email" class="form-control" :disabled="!isEditing">
            </div>
            <div class="form-group half">
              <label>Nomor Telepon</label>
              <input type="tel" v-model="profileData.phone" class="form-control" :disabled="!isEditing">
            </div>
          </div>

          <div class="form-group">
            <label>Instansi / Fasilitas Kesehatan</label>
            <input type="text" v-model="profileData.facility" class="form-control" disabled>
            <small class="form-help">Hubungi super admin untuk mengubah fasilitas kesehatan.</small>
          </div>

          <div class="form-actions" v-if="isEditing">
            <button type="button" class="btn btn-outline" @click="isEditing = false">Batal</button>
            <button type="submit" class="btn btn-primary">Simpan Perubahan</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.profile-page {
  padding: 24px;
  background-color: #F8FAFC;
  min-height: 100vh;
  font-family: 'Inter', sans-serif;
  color: #1e293b;
}

.page-header {
  margin-bottom: 24px;
}

.page-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #0f172a;
  margin: 0;
}

.profile-container {
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 24px;
  align-items: start;
}

.card {
  background: white;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  padding: 24px;
}

/* Left Column */
.profile-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.avatar-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
}

.avatar-lg {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: linear-gradient(135deg, #006591, #6DF5E1);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5rem;
  font-weight: 700;
  box-shadow: 0 4px 12px rgba(0, 101, 145, 0.2);
}

.change-photo-btn {
  font-size: 0.75rem;
  padding: 6px 12px;
}

.info-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.profile-name {
  font-size: 1.25rem;
  font-weight: 700;
  margin: 0;
}

.badge {
  padding: 4px 12px;
  border-radius: 16px;
  font-size: 0.75rem;
  font-weight: 600;
}

.badge-primary {
  background-color: #F0F9FF;
  color: #006591;
}

.facility-text {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #64748b;
  font-size: 0.875rem;
  margin: 0;
}

.icon {
  width: 16px;
  height: 16px;
}

/* Right Column */
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid #e2e8f0;
}

.card-header h3 {
  font-size: 1.125rem;
  font-weight: 600;
  margin: 0;
}

.profile-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-row {
  display: flex;
  gap: 16px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-group.half {
  flex: 1;
}

label {
  font-size: 0.875rem;
  font-weight: 500;
  color: #475569;
}

.form-control {
  padding: 10px 14px;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  font-size: 0.875rem;
  font-family: inherit;
  transition: border-color 0.2s;
}

.form-control:focus {
  outline: none;
  border-color: #006591;
}

.form-control:disabled {
  background-color: #f8fafc;
  color: #64748b;
  cursor: not-allowed;
  border-color: #e2e8f0;
}

.form-help {
  font-size: 0.75rem;
  color: #94a3b8;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 12px;
  padding-top: 24px;
  border-top: 1px solid #e2e8f0;
}

/* Buttons */
.btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
  font-family: inherit;
}

.btn-sm {
  padding: 6px 12px;
}

.btn-primary {
  background-color: #006591;
  color: white;
}

.btn-primary:hover {
  background-color: #005378;
}

.btn-outline {
  background-color: white;
  border: 1px solid #e2e8f0;
  color: #64748b;
}

.btn-outline:hover {
  background-color: #f1f5f9;
  color: #0f172a;
}
</style>

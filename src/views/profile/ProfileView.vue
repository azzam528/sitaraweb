<script src="./ProfileView.js"></script>

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

<style scoped src="./ProfileView.css"></style>

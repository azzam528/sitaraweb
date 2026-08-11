<script src="./PrivacyView.js"></script>

<template>
  <div class="legal-page">
    <div class="legal-container card">
      <header class="legal-header">
        <RouterLink to="/register" class="back-link">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
          Kembali
        </RouterLink>
        <h1 class="page-title">Kebijakan Privasi</h1>
        <p class="last-updated">Terakhir diperbarui: 25 Juli 2026</p>
      </header>

      <div class="legal-content">
        <h2>1. Pengumpulan Data Informasi</h2>
        <p>Aplikasi SITARA mengumpulkan informasi pribadi yang dapat diidentifikasi secara unik, termasuk namun tidak terbatas pada:</p>
        <ul>
          <li>Nama lengkap, NIK, usia, dan data demografis dasar.</li>
          <li>Riwayat rekam medis TB, regimen pengobatan, dan jadwal kontrol pasien.</li>
          <li>Video, foto, dan audio yang diunggah untuk keperluan verifikasi AI minum obat (VOT).</li>
          <li>Data analitik interaksi aplikasi secara anonim.</li>
        </ul>
        
        <h2>2. Penggunaan Informasi</h2>
        <p>Data Anda hanya digunakan secara eksklusif untuk:</p>
        <ul>
          <li>Memantau kepatuhan minum obat Anti Tuberkulosis (OAT).</li>
          <li>Memungkinkan dokter dan perawat untuk memberikan intervensi medis secara tepat waktu apabila terjadi efek samping.</li>
          <li>Melatih algoritma kecerdasan buatan (AI) kami secara internal dan tertutup, yang di-anonimisasi (tidak dapat dilacak balik ke identitas Anda).</li>
        </ul>

        <h2>3. Perlindungan & Keamanan Data</h2>
        <p>SITARA menggunakan enkripsi ujung-ke-ujung (End-to-End Encryption) dan standar keamanan server rekam medis (HIPAA Compliant / Standar Kemenkes RI) untuk melindungi data pasien. Video verifikasi akan dihapus dari server setelah masa peninjauan oleh tenaga medis selesai.</p>

        <h2>4. Pembagian Data ke Pihak Ketiga</h2>
        <p>Kami menjamin bahwa <strong>TIDAK ADA</strong> data pribadi atau medis yang dijual atau dibagikan ke pihak ketiga mana pun untuk tujuan komersial. Data hanya akan disinkronisasi ke sistem rekam medis elektronik resmi pemerintah atas persetujuan Fasilitas Kesehatan yang menaungi Anda.</p>

        <h2>5. Kontak Bantuan</h2>
        <p>Jika Anda memiliki kekhawatiran tentang data privasi Anda, Anda dapat menghubungi Petugas Program TB atau admin Fasilitas Kesehatan yang mendaftarkan Anda pada platform SITARA.</p>
      </div>

      <div class="legal-footer">
        <RouterLink to="/register" class="btn btn-primary btn-block">Saya Setuju</RouterLink>
      </div>
    </div>
  </div>
</template>

<style scoped src="./PrivacyView.css"></style>

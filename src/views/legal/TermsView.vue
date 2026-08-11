<template>
  <div class="legal-page">
    <div class="legal-container card">
      <header class="legal-header">
        <RouterLink to="/register" class="back-link">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
          Kembali
        </RouterLink>
        <h1 class="page-title">Syarat dan Ketentuan</h1>
        <p class="last-updated">Terakhir diperbarui: 25 Juli 2026</p>
      </header>

      <div class="legal-content">
        <h2>1. Ketentuan Umum</h2>
        <p>Dengan mendaftar dan menggunakan aplikasi SITARA (Sistem Informasi Tuberkulosis Terpadu), Anda setuju untuk terikat oleh syarat dan ketentuan ini. Aplikasi ini ditujukan untuk tenaga kesehatan dan pasien TB guna memonitor kepatuhan minum obat dan efektivitas pengobatan.</p>
        
        <h2>2. Kewajiban Pengguna</h2>
        <p>Sebagai Pengguna (Tenaga Medis/Pasien/PMO), Anda diwajibkan untuk:</p>
        <ul>
          <li>Memberikan informasi medis dan pribadi yang akurat dan jujur.</li>
          <li>Menjaga kerahasiaan kredensial akun Anda.</li>
          <li>Tidak menyalahgunakan fitur aplikasi (termasuk verifikasi AI) dengan mengunggah video palsu atau tidak pantas.</li>
        </ul>

        <h2>3. Privasi & Kerahasiaan Medis</h2>
        <p>Data medis yang Anda masukkan ke dalam sistem dilindungi oleh hukum kerahasiaan pasien yang berlaku di Indonesia. Informasi lengkap terkait pengelolaan data dapat dilihat pada halaman Kebijakan Privasi kami.</p>

        <h2>4. Fitur Verifikasi AI</h2>
        <p>SITARA menggunakan kecerdasan buatan untuk membantu verifikasi video konsumsi obat (OAT). Keputusan akhir dari analisis AI tetap akan diverifikasi secara manual oleh tenaga medis (dokter atau petugas TB). Kegagalan sistem AI bukan merupakan diagnosis klinis final.</p>

        <h2>5. Perubahan Syarat & Ketentuan</h2>
        <p>Kementerian Kesehatan / Faskes yang menaungi berhak mengubah syarat dan ketentuan ini kapan saja. Kami akan memberikan pemberitahuan melalui sistem jika terdapat perubahan mayor.</p>
      </div>

      <div class="legal-footer">
        <RouterLink to="/register" class="btn btn-primary btn-block">Saya Mengerti</RouterLink>
      </div>
    </div>
  </div>
</template>

<style scoped src="./TermsView.css"></style>

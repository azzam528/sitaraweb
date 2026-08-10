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

<style scoped>
.legal-page {
  min-height: 100vh;
  background-color: #F8FAFC;
  padding: 40px 20px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  font-family: 'Inter', sans-serif;
  color: #1e293b;
}

.legal-container {
  background: white;
  border-radius: 16px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
  max-width: 720px;
  width: 100%;
  padding: 40px;
}

.legal-header {
  border-bottom: 1px solid #e2e8f0;
  padding-bottom: 24px;
  margin-bottom: 24px;
}

.back-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: #64748b;
  text-decoration: none;
  font-weight: 500;
  font-size: 0.875rem;
  margin-bottom: 24px;
}

.back-link:hover {
  color: #006591;
}

.page-title {
  font-size: 2rem;
  font-weight: 700;
  color: #0f172a;
  margin: 0 0 8px 0;
}

.last-updated {
  color: #64748b;
  font-size: 0.875rem;
  margin: 0;
}

.legal-content h2 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #0f172a;
  margin: 32px 0 16px 0;
}

.legal-content p {
  line-height: 1.6;
  color: #334155;
  margin-bottom: 16px;
}

.legal-content ul {
  padding-left: 24px;
  margin-bottom: 24px;
}

.legal-content li {
  line-height: 1.6;
  color: #334155;
  margin-bottom: 8px;
}

.legal-footer {
  margin-top: 40px;
  padding-top: 24px;
  border-top: 1px solid #e2e8f0;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  border: none;
  text-decoration: none;
  transition: background-color 0.2s;
}

.btn-primary {
  background-color: #006591;
  color: white;
}

.btn-primary:hover {
  background-color: #005378;
}

.btn-block {
  width: 100%;
}
</style>

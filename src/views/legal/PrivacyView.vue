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

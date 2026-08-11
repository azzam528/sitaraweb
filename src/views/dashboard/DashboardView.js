import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import mobiledoctorIMG from '@/assets/images/mobile-doctor.png'

export default defineComponent({
  name: 'DashboardView',
  setup() {
    const router = useRouter()

    const goToPatients = () => router.push('/dashboard/patients')
    const goToNewPatient = () => router.push('/dashboard/patients/add')
    const goToReports = () => router.push('/dashboard/reports')
    const goToMedicines = () => router.push('/dashboard/medicines')
    const goToPatientDetail = (id) => router.push(`/dashboard/patients/${id}`)

    const patientStats = ref([
      {
        label: 'Pasien Aktif',
        value: '20',
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>`,
        color: '#006591',
        bgColor: '#e6f0f4'
      },
      {
        label: 'Kepatuhan Obat',
        value: '94.2%',
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect><polyline points="9 14 11 16 15 11"></polyline></svg>`,
        color: '#22C55E',
        bgColor: '#dcfce7'
      },
      {
        label: 'Risiko Tinggi',
        value: '1',
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>`,
        color: '#EF4444',
        bgColor: '#fee2e2'
      },
      {
        label: 'Keluhan Hari Ini',
        value: '8',
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>`,
        color: '#F59E0B',
        bgColor: '#fef3c7'
      },
      {
        label: 'Stok OAT Kritis',
        value: '3 Items',
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="16.5" y1="9.4" x2="7.5" y2="4.21"></line><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>`,
        color: '#EF4444',
        bgColor: '#fee2e2'
      }
    ])

    const riskPatients = ref([
      { id: 1, name: 'Sumardi', level: 'Risiko Tinggi', reason: 'Mangkir >3 hari', levelColor: 'danger' },
      { id: 2, name: 'Budi Santoso', level: 'Risiko Sedang', reason: 'Efek Samping Berat', levelColor: 'warning' },
      { id: 3, name: 'Agus Salim', level: 'Risiko Tinggi', reason: 'Lokasi Tidak Terdeteksi', levelColor: 'danger' }
    ])

    const aiVerificationRecent = ref([
      { id: 1, name: 'Indra W.', time: '09:42', status: '96% Match', statusClass: 'success' },
      { id: 2, name: 'Ratna Sari', time: '09:35', status: '95% Match', statusClass: 'success' },
      { id: 3, name: 'Dwi Cahyo', time: '09:12', status: 'Verifying...', statusClass: 'primary' }
    ])

    const complianceTrend = ref([
      { day: 'Sen', height: 75 },
      { day: 'Sel', height: 85 },
      { day: 'Rab', height: 95 },
      { day: 'Kam', height: 60 },
      { day: 'Jum', height: 80 },
      { day: 'Sab', height: 90 },
      { day: 'Min', height: 98 }
    ])

    const recentActivities = ref([
      { id: 1, text: 'Ahmad Subarjo berhasil verifikasi dosis pagi.', time: '2 menit yang lalu', type: 'primary' },
      { id: 2, text: 'Surya melaporkan efek samping pusing.', time: '15 menit yang lalu', type: 'danger' },
      { id: 3, text: 'Stok Rifampisin 150mg diperbarui.', time: '45 menit yang lalu', type: 'success' }
    ])

    const oatStocks = ref([
      { name: 'Rifampisin', status: 'Aman 85%', percent: 85, colorClass: 'bg-success', subtext: '1,200 / 1,410 Tablet' },
      { name: 'Isoniazid', status: 'Menipis 42%', percent: 42, colorClass: 'bg-warning', subtext: '580 / 1,380 Tablet' },
      { name: 'Pirazinamid', status: 'Kritis 15%', percent: 15, colorClass: 'bg-danger', subtext: '165 / 1,100 Tablet' }
    ])

    return {
      mobiledoctorIMG,
      goToPatients,
      goToNewPatient,
      goToReports,
      goToMedicines,
      goToPatientDetail,
      patientStats,
      riskPatients,
      aiVerificationRecent,
      complianceTrend,
      recentActivities,
      oatStocks
    }
  }
})

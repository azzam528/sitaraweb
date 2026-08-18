import { defineComponent, ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import mobiledoctorIMG from '@/assets/images/mobile-doctor.png'
import dashboardService from '@/services/dashboard.service'
import patientService from '@/services/patient.service'

export default defineComponent({
  name: 'DashboardView',
  setup() {
    const router = useRouter()
    const isLoading = ref(true)

    const goToPatients = () => router.push('/dashboard/patients')
    const goToNewPatient = () => router.push('/dashboard/patients/add')
    const goToReports = () => router.push('/dashboard/reports')
    const goToPatientDetail = (id) => router.push(`/dashboard/patients/${id}`)

    const summary = ref({
      active_patients: 6,
      medication_adherence: 95.0,
      tb_ro_patients: 1,
      today_complaints: 0
    })

    const phaseData = ref({
      intensive: 3,
      continuation: 2,
      completed: 1
    })

    const patientStats = computed(() => [
      {
        label: 'Pasien Aktif',
        value: String(summary.value.active_patients),
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>`,
        color: '#006591',
        bgColor: '#e6f0f4'
      },
      {
        label: 'Kepatuhan Obat',
        value: `${summary.value.medication_adherence}%`,
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect><polyline points="9 14 11 16 15 11"></polyline></svg>`,
        color: '#22C55E',
        bgColor: '#dcfce7'
      },
      {
        label: 'TB Resistan (RO)',
        value: String(summary.value.tb_ro_patients),
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>`,
        color: '#0284c7',
        bgColor: '#e0f2fe'
      },
      {
        label: 'Keluhan Hari Ini',
        value: String(summary.value.today_complaints),
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>`,
        color: '#F59E0B',
        bgColor: '#fef3c7'
      }
    ])

    const monitoredPatients = ref([
      { id: 2, name: 'Dewi Lestari', reason: 'Fase Intensif - Bulan ke-2 (4FDC)', badge: 'Fase Intensif', badgeColor: 'primary' },
      { id: 1, name: 'Ahmad Fauzi', reason: 'Fase Lanjutan - Bulan ke-3 (2FDC)', badge: 'Fase Lanjutan', badgeColor: 'teal' },
      { id: 5, name: 'Bambang Pratama', reason: 'Selesai Terapi - Pengobatan Tuntas', badge: 'Selesai Terapi', badgeColor: 'success' }
    ])

    const adherencePoints = ref([
      { x: 30, y: 35, val: 92, day: 'Sen' },
      { x: 100, y: 45, val: 88, day: 'Sel' },
      { x: 170, y: 20, val: 96, day: 'Rab' },
      { x: 240, y: 28, val: 94, day: 'Kam' },
      { x: 310, y: 40, val: 90, day: 'Jum' },
      { x: 380, y: 15, val: 97, day: 'Sab' },
      { x: 450, y: 25, val: 95, day: 'Min', active: true }
    ])

    const recentActivities = ref([
      { id: 1, text: 'Verifikasi video Ahmad Fauzi berhasil diverifikasi.', time: 'Baru saja', type: 'primary' },
      { id: 2, text: 'Dewi Lestari melaporkan keluhan Gatal & Ruam Kulit.', time: '1 jam lalu', type: 'danger' },
      { id: 3, text: 'Pengajuan Refill 2FDC oleh Dewi Lestari masuk ke sistem.', time: '3 jam lalu', type: 'success' }
    ])

    const loadDashboardData = async () => {
      isLoading.value = true
      try {
        const [dashRes, patRes] = await Promise.allSettled([
          dashboardService.getDashboard(),
          patientService.getAll()
        ])

        if (dashRes.status === 'fulfilled' && dashRes.value?.data) {
          const d = dashRes.value.data
          if (d.summary) summary.value = d.summary

          if (d.recent_activities && d.recent_activities.length > 0) {
            recentActivities.value = d.recent_activities.slice(0, 3).map((act, index) => ({
              id: index + 1,
              text: `${act.title}: ${act.description}`,
              time: act.created_at || 'Hari ini',
              type: act.type === 'complaint' ? 'danger' : act.type === 'refill' ? 'primary' : 'success'
            }))
          }
        }

        if (patRes.status === 'fulfilled' && patRes.value?.data && patRes.value.data.length > 0) {
          const patients = patRes.value.data
          monitoredPatients.value = patients.slice(0, 3).map((p, idx) => ({
            id: p.id,
            name: p.full_name,
            reason: p.clinical_note ? p.clinical_note.slice(0, 45) + '...' : (idx === 0 ? 'Fase Intensif - Bulan ke-2' : idx === 1 ? 'Fase Lanjutan - Bulan ke-3' : 'Selesai Terapi - Pengobatan Tuntas'),
            badge: idx === 0 ? 'Fase Intensif' : idx === 1 ? 'Fase Lanjutan' : 'Selesai Terapi',
            badgeColor: idx === 0 ? 'primary' : idx === 1 ? 'teal' : 'success'
          }))
        }
      } catch (err) {
        console.error('Error loading dashboard:', err)
      } finally {
        isLoading.value = false
      }
    }

    onMounted(() => {
      loadDashboardData()
    })

    return {
      mobiledoctorIMG,
      goToPatients,
      goToNewPatient,
      goToReports,
      goToPatientDetail,
      patientStats,
      summary,
      phaseData,
      monitoredPatients,
      adherencePoints,
      recentActivities,
      isLoading
    }
  }
})



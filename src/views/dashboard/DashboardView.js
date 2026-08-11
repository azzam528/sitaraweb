import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'

import { useDashboardStore } from '@/stores/dashboard'
import { useAuthStore } from '@/stores/auth'

import mobiledoctorIMG from '@/assets/images/mobile-doctor.png'

export function useDashboardView() {
  const router = useRouter()

  const dashboardStore = useDashboardStore()
  const authStore = useAuthStore()

  // ========================================
  // Navigation
  // ========================================

  const goToPatients = () => {
    router.push('/dashboard/patients')
  }

  const goToNewPatient = () => {
    router.push('/dashboard/patients/add')
  }

  const goToReports = () => {
    router.push('/dashboard/reports')
  }

  const goToMedicines = () => {
    router.push('/dashboard/medicines')
  }

  const goToPatientDetail = (id) => {
    router.push(`/dashboard/patients/${id}`)
  }

  // ========================================
  // Dashboard Data
  // ========================================

  const summary = computed(() => {
    return dashboardStore.dashboard?.summary || {
      active_patients: 0,
      medication_adherence: 0,
      high_risk_patients: 0,
      today_complaints: 0,
      critical_stock_items: 0
    }
  })

  const risk = computed(() => {
    return dashboardStore.dashboard?.risk || {
      high: 0,
      medium: 0,
      low: 0
    }
  })

  const adherenceTrend = computed(() => {
    return dashboardStore.dashboard?.adherence_trend || []
  })

  const recentActivities = computed(() => {
    return dashboardStore.dashboard?.recent_activities || []
  })

  const criticalStock = computed(() => {
    return dashboardStore.dashboard?.critical_stock || []
  })

  // ========================================
  // Statistics Cards
  // ========================================

  const patientStats = computed(() => {
    return [
      {
        label: 'Pasien Aktif',
        value: summary.value.active_patients,

        icon: `
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
            <circle cx="9" cy="7" r="4"></circle>
            <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
          </svg>
        `,

        color: '#006591',
        bgColor: '#e6f0f4'
      },

      {
        label: 'Kepatuhan Obat',
        value: `${summary.value.medication_adherence}%`,

        icon: `
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
            <rect x="8" y="2" width="8" height="4" rx="1"></rect>
            <polyline points="9 14 11 16 15 11"></polyline>
          </svg>
        `,

        color: '#22C55E',
        bgColor: '#dcfce7'
      },

      {
        label: 'Risiko Tinggi',
        value: summary.value.high_risk_patients,

        icon: `
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
            <line x1="12" y1="9" x2="12" y2="13"></line>
            <line x1="12" y1="17" x2="12.01" y2="17"></line>
          </svg>
        `,

        color: '#EF4444',
        bgColor: '#fee2e2'
      },

      {
        label: 'Keluhan Hari Ini',
        value: summary.value.today_complaints,

        icon: `
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
          </svg>
        `,

        color: '#F59E0B',
        bgColor: '#fef3c7'
      },

      {
        label: 'Stok OAT Kritis',
        value: `${summary.value.critical_stock_items} Items`,

        icon: `
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <line x1="16.5" y1="9.4" x2="7.5" y2="4.21"></line>
            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
            <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
            <line x1="12" y1="22.08" x2="12" y2="12"></line>
          </svg>
        `,

        color: '#EF4444',
        bgColor: '#fee2e2'
      }
    ]
  })

  // ========================================
  // Risk Patients
  // ========================================

  const riskPatients = computed(() => {
    return dashboardStore.dashboard?.risk_patients || []
  })

  // ========================================
  // Loading
  // ========================================

  const isLoading = computed(() => {
    return dashboardStore.loading
  })

  // ========================================
  // Current User
  // ========================================

  const currentUserName = computed(() => {
    return (
      authStore.user?.name ||
      authStore.user?.username ||
      'Nakes'
    )
  })

  // ========================================
  // Compliance
  // ========================================

  const complianceAverage = computed(() => {
    return summary.value.medication_adherence ?? 0
  })

  // ========================================
  // Helper - Get trend value
  // ========================================

  const getTrendValue = (item) => {
    if (typeof item === 'number') {
      return item
    }

    return (
      item?.value ??
      item?.adherence ??
      item?.medication_adherence ??
      item?.percentage ??
      0
    )
  }

  // ========================================
  // Helper - Get trend label
  // ========================================

  const getTrendLabel = (item, index) => {
    if (item?.label) {
      return item.label
    }

    if (item?.date) {
      const date = new Date(item.date)

      if (!Number.isNaN(date.getTime())) {
        return date.toLocaleDateString('id-ID', {
          weekday: 'short'
        })
      }
    }

    const labels = [
      'Sen',
      'Sel',
      'Rab',
      'Kam',
      'Jum',
      'Sab',
      'Min'
    ]

    return labels[index] || ''
  }

  // ========================================
  // Fetch Dashboard
  // ========================================

  onMounted(async () => {
    try {
      await dashboardStore.fetchDashboard()
    } catch (error) {
      console.error('Dashboard loading failed:', error)
    }
  })

  return {
    router,
    dashboardStore,
    authStore,
    mobiledoctorIMG,

    goToPatients,
    goToNewPatient,
    goToReports,
    goToMedicines,
    goToPatientDetail,

    summary,
    risk,
    adherenceTrend,
    recentActivities,
    criticalStock,
    patientStats,
    riskPatients,

    isLoading,
    currentUserName,
    complianceAverage,

    getTrendValue,
    getTrendLabel
  }
}
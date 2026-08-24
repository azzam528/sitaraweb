import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";

import { useDashboardStore } from "@/stores/dashboard";
import { useAuthStore } from "@/stores/auth";
import patientService from "@/services/patient.service";

import mobiledoctorIMG from "@/assets/images/mobile-doctor.png";

export function useDashboardView() {
  const router = useRouter();
  const dashboardStore = useDashboardStore();
  const authStore = useAuthStore();

  const monitoredPatients = ref([]);
  const phaseData = ref({
    intensive: 0,
    continuation: 0,
    completed: 0,
  });

  // Navigation
  const goToPatients = () => router.push("/dashboard/patients");
  const goToNewPatient = () => router.push("/dashboard/patients/add");
  const goToReports = () => router.push("/dashboard/reports");
  const goToMedicines = () => router.push("/dashboard/medicines");
  const goToPatientDetail = (id) => router.push(`/dashboard/patients/${id}`);

  // Current User
  const currentUserName = computed(() => {
    return authStore.user?.name || authStore.user?.username || "Nakes";
  });

  // Dashboard Data from Store
  const summary = computed(() => {
    return (
      dashboardStore.summary || {
        active_patients: 0,
        medication_adherence: 0,
        tb_ro_patients: 0,
        high_risk_patients: 0,
        today_complaints: 0,
        critical_stock_items: 0,
      }
    );
  });

  const risk = computed(() => {
    return (
      dashboardStore.risk || {
        high: 0,
        medium: 0,
        low: 0,
      }
    );
  });

  const adherenceTrend = computed(() => {
    return dashboardStore.adherenceTrend || [];
  });

  const recentActivities = computed(() => {
    return dashboardStore.recentActivities || [];
  });

  const criticalStock = computed(() => {
    return dashboardStore.criticalStock || [];
  });

  const riskPatients = computed(() => {
    if (monitoredPatients.value.length > 0) {
      return monitoredPatients.value;
    }
    return dashboardStore.dashboard?.risk_patients || [];
  });

  const isLoading = computed(() => dashboardStore.loading);

  const complianceAverage = computed(() => {
    return summary.value.medication_adherence ?? 0;
  });

  // Stats
  const patientStats = computed(() => [
    {
      label: "Pasien Aktif",
      value: String(summary.value.active_patients ?? 0),
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>`,
      color: "#006591",
      bgColor: "#e6f0f4",
    },
    {
      label: "Kepatuhan Obat",
      value: `${summary.value.medication_adherence ?? 0}%`,
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect><polyline points="9 14 11 16 15 11"></polyline></svg>`,
      color: "#22C55E",
      bgColor: "#dcfce7",
    },
    {
      label: "Risiko / TB RO",
      value: String(
        summary.value.tb_ro_patients ?? summary.value.high_risk_patients ?? 0,
      ),
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>`,
      color: "#EF4444",
      bgColor: "#fee2e2",
    },
    {
      label: "Keluhan Hari Ini",
      value: String(summary.value.today_complaints ?? 0),
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>`,
      color: "#F59E0B",
      bgColor: "#fef3c7",
    },
  ]);

  // Trend helpers
  const getTrendValue = (item) => {
    if (typeof item === "number") return item;
    return (
      item?.value ??
      item?.adherence ??
      item?.medication_adherence ??
      item?.percentage ??
      0
    );
  };

  const getTrendLabel = (item, index) => {
    if (item?.label) return item.label;
    if (item?.date) {
      const date = new Date(item.date);
      if (!Number.isNaN(date.getTime())) {
        return date.toLocaleDateString("id-ID", { weekday: "short" });
      }
    }
    const labels = ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"];
    return labels[index] || "";
  };

  // Lifecycle
  onMounted(async () => {
    try {
      await dashboardStore.fetchDashboard();
    } catch (e) {
      console.warn("Dashboard store fetch error:", e);
    }

    try {
      const patRes = await patientService.getAll();
      if (patRes.data && patRes.data.length > 0) {
        const patients = patRes.data;
        let intens = 0;
        let cont = 0;
        let comp = 0;

        monitoredPatients.value = patients.slice(0, 4).map((p, idx) => {
          const isIntensive = idx % 2 === 0;
          if (isIntensive) intens++;
          else cont++;
          return {
            id: p.id,
            name: p.full_name || p.name,
            reason: p.clinical_note
              ? p.clinical_note.slice(0, 45) + "..."
              : isIntensive
                ? "Fase Intensif - Kepatuhan Obat"
                : "Fase Lanjutan - Kontrol Rutin",
            level: isIntensive ? "Fase Intensif" : "Fase Lanjutan",
            badge: isIntensive ? "Fase Intensif" : "Fase Lanjutan",
            levelColor: isIntensive ? "primary" : "teal",
            badgeColor: isIntensive ? "primary" : "teal",
            phone: p.phone,
          };
        });

        phaseData.value = {
          intensive: intens || 1,
          continuation: cont || 1,
          completed: comp,
        };
      }
    } catch (e) {
      console.warn("Patient fetch for dashboard error:", e);
    }
  });

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
    phaseData,
    monitoredPatients,
    adherenceTrend,
    recentActivities,
    criticalStock,
    patientStats,
    riskPatients,

    isLoading,
    currentUserName,
    complianceAverage,

    getTrendValue,
    getTrendLabel,
  };
}

export default {
  useDashboardView,
};

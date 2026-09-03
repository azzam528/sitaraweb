import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";

import { useDashboardStore } from "@/stores/dashboard";
import { useAuthStore } from "@/stores/auth";
import patientService from "@/services/patient.service";
import treatmentService from "@/services/treatment.service";

import mobiledoctorIMG from "@/assets/images/mobile-doctor.png";

export function useDashboardView() {
  const router = useRouter();
  const dashboardStore = useDashboardStore();
  const authStore = useAuthStore();

  const monitoredPatients = ref([]);

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
        active_treatments: 0,
        completed_treatments: 0,
        medication_adherence: null,
        today_verifications: 0,
        today_complaints: 0,
        critical_stock_items: 0,
        high_risk_patients: 0,
        tb_ro_patients: 0,
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

  // Treatment Status Distribution from Database
  const statusData = computed(() => ({
    active: summary.value.active_treatments ?? 0,
    completed: summary.value.completed_treatments ?? 0,
  }));

  // Dynamic Donut Gradient
  const donutGradient = computed(() => {
    const active = statusData.value.active;
    const completed = statusData.value.completed;
    const total = active + completed;
    if (total === 0) {
      return "conic-gradient(#e2e8f0 0% 100%)";
    }
    if (completed === 0) {
      return "conic-gradient(#006591 0% 100%)";
    }
    if (active === 0) {
      return "conic-gradient(#16a34a 0% 100%)";
    }
    const activePct = Math.round((active / total) * 100);
    return `conic-gradient(#006591 0% ${activePct}%, #16a34a ${activePct}% 100%)`;
  });

  // Tren Kepatuhan (7 Hari dari Database - Single Source of Truth)
  const adherenceTrend = computed(() => {
    return dashboardStore.adherenceTrend || [];
  });

  const hasTrendData = computed(() => {
    return adherenceTrend.value.some(
      (item) => item && item.percentage !== null && item.percentage !== undefined
    );
  });

  // Aktivitas Terbaru (Maksimal 5, Real-time dari Database)
  const recentActivities = computed(() => {
    return (dashboardStore.recentActivities || []).slice(0, 5);
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
    if (summary.value.medication_adherence !== null && summary.value.medication_adherence !== undefined) {
      return summary.value.medication_adherence;
    }
    const validTrends = adherenceTrend.value.filter(
      (item) => item && item.percentage !== null && item.percentage !== undefined && !isNaN(item.percentage)
    );
    if (validTrends.length > 0) {
      const sum = validTrends.reduce((acc, item) => acc + item.percentage, 0);
      return Math.round((sum / validTrends.length) * 10) / 10;
    }
    return null;
  });

  // Stats KPI Cards
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
      value: complianceAverage.value !== null ? `${complianceAverage.value}%` : "Belum ada data konsumsi",
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect><polyline points="9 14 11 16 15 11"></polyline></svg>`,
      color: "#22C55E",
      bgColor: "#dcfce7",
    },
    {
      label: "Verifikasi Hari Ini",
      value: String(summary.value.today_verifications ?? 0),
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m22 8-6 4 6 4V8Z"/><rect width="14" height="12" x="2" y="6" rx="2"/><path d="m7 12 2 2 4-4"/></svg>`,
      color: "#8B5CF6",
      bgColor: "#ede9fe",
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

  const getInitials = (name) => {
    if (!name) return "P";
    const parts = name.trim().split(/\s+/);
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  // Format activity timestamp (e.g. "26 Agu 2026 • 17:04 WIB")
  const formatActivityDate = (dateStr) => {
    if (!dateStr) return "Baru saja";
    const d = new Date(dateStr);
    if (Number.isNaN(d.getTime())) return dateStr;

    const day = d.getDate();
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "Mei",
      "Jun",
      "Jul",
      "Agu",
      "Sep",
      "Okt",
      "Nov",
      "Des",
    ];
    const month = months[d.getMonth()];
    const year = d.getFullYear();
    const hours = String(d.getHours()).padStart(2, "0");
    const minutes = String(d.getMinutes()).padStart(2, "0");

    return `${day} ${month} ${year} • ${hours}:${minutes} WIB`;
  };

  // Lifecycle
  onMounted(async () => {
    try {
      await dashboardStore.fetchDashboard();
    } catch (e) {
      console.warn("Dashboard store fetch error:", e);
    }

    // Fetch real patient & treatment data for monitoring list
    try {
      const [patRes, treatRes] = await Promise.allSettled([
        patientService.getAll(),
        treatmentService.getAll(),
      ]);

      const patients =
        patRes.status === "fulfilled" && Array.isArray(patRes.value.data)
          ? patRes.value.data
          : [];
      const treatments =
        treatRes.status === "fulfilled" && Array.isArray(treatRes.value.data)
          ? treatRes.value.data
          : [];

      monitoredPatients.value = patients.slice(0, 4).map((p) => {
        const t = treatments.find((item) => Number(item.patient_id) === Number(p.id));
        let daysLeft = 0;
        if (t && t.therapy_end_date) {
          const end = new Date(t.therapy_end_date);
          const now = new Date();
          daysLeft = Math.max(0, Math.ceil((end - now) / (1000 * 60 * 60 * 24)));
        }
        return {
          id: p.id,
          name: p.full_name || p.name || "Pasien",
          nik: p.nik || "-",
          daysLeft: daysLeft,
          phone: p.phone,
        };
      });
    } catch (e) {
      console.warn("Dashboard monitoring fetch error:", e);
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
    statusData,
    donutGradient,
    monitoredPatients,
    adherenceTrend,
    recentActivities,
    criticalStock,
    patientStats,
    riskPatients,

    isLoading,
    currentUserName,
    complianceAverage,
    hasTrendData,

    getTrendValue,
    getTrendLabel,
    getInitials,
    formatActivityDate,
  };
}

export default {
  useDashboardView,
};

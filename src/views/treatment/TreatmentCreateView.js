import { ref, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

import patientService from "@/services/patient.service";
import treatmentService from "@/services/treatment.service";

export function useTreatmentCreateView() {
  const route = useRoute();
  const router = useRouter();

  const patient = ref(null);
  const existingTreatment = ref(null);

  const loading = ref(false);
  const submitting = ref(false);
  const error = ref(null);

  const patientId = route.params.id;

  const todayStr = new Date().toISOString().split("T")[0];
  const defaultEnd = new Date();
  defaultEnd.setMonth(defaultEnd.getMonth() + 6);
  const defaultEndStr = defaultEnd.toISOString().split("T")[0];

  const form = ref({
    diagnosis_date: todayStr,
    therapy_start_date: todayStr,
    therapy_end_date: defaultEndStr,
    phase: "intensive",
    regimen: "category_1",
    status: "active",
    doctor_note: "",
  });

  const hasActiveTreatment = computed(() => {
    return (
      !!existingTreatment.value &&
      existingTreatment.value.status === "active" &&
      existingTreatment.value.is_active !== false
    );
  });

  const onStartDateChange = () => {
    if (form.value.therapy_start_date) {
      const start = new Date(form.value.therapy_start_date);
      start.setMonth(start.getMonth() + 6);
      form.value.therapy_end_date = start.toISOString().split("T")[0];
    }
  };

  const formatPhase = (phase) => {
    if (phase === "intensive") return "Fase Intensif";
    if (phase === "continuation") return "Fase Lanjutan";
    return phase || "-";
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "-";
    const d = new Date(dateStr);
    return d.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  // ==========================================
  // GET PATIENT & EXISTING TREATMENT
  // ==========================================

  const fetchPatient = async () => {
    loading.value = true;
    error.value = null;

    try {
      const response = await patientService.getDetail(patientId);

      const data = response.data || {};

      patient.value = data.patient || data;
      existingTreatment.value = data.treatment || null;
    } catch (err) {
      console.warn(
        "Gagal mengambil detail pasien, mencoba getById fallback:",
        err,
      );

      try {
        const response = await patientService.getById(patientId);

        patient.value = response.data || null;
      } catch (fallbackError) {
        console.error(fallbackError);

        error.value =
          fallbackError.response?.data?.detail ||
          "Gagal mengambil data pasien.";
      }
    } finally {
      loading.value = false;
    }
  };

  // ==========================================
  // CREATE TREATMENT
  // ==========================================

  const submitTreatment = async () => {
    if (!patient.value) {
      error.value = "Data pasien tidak ditemukan.";
      return;
    }

    if (hasActiveTreatment.value) {
      error.value =
        "Pasien sudah memiliki pengobatan aktif. Selesaikan atau nonaktifkan pengobatan yang sedang berjalan sebelum membuat pengobatan baru.";
      return;
    }

    submitting.value = true;
    error.value = null;

    try {
      let defaultEndDate = form.value.therapy_end_date;
      if (!defaultEndDate && form.value.therapy_start_date) {
        const start = new Date(form.value.therapy_start_date);
        start.setMonth(start.getMonth() + 6);
        defaultEndDate = start.toISOString().split("T")[0];
      }

      const payload = {
        patient_id: Number(patientId),
        diagnosis_date: form.value.diagnosis_date,
        therapy_start_date: form.value.therapy_start_date,
        therapy_end_date: defaultEndDate || form.value.therapy_start_date,
        phase: form.value.phase || "intensive",
        regimen: form.value.regimen || "category_1",
        status: form.value.status || "active",
        doctor_name: "Tim Medis Faskes",
        doctor_note: form.value.doctor_note?.trim() || null,
      };

      console.log("Create treatment payload:", payload);

      const response = await treatmentService.create(payload);

      const treatment = response.data;

      console.log("Treatment berhasil dibuat:", treatment);

      // Redirect ke detail treatment
      router.push(`/dashboard/treatments/${treatment.id}`);
    } catch (err) {
      console.error("Gagal membuat treatment:", err);

      const backendDetail = err.response?.data?.detail;
      if (
        typeof backendDetail === "string" &&
        backendDetail.toLowerCase().includes("already has an active treatment")
      ) {
        error.value =
          "Pasien ini masih memiliki rekam pengobatan aktif. Selesaikan atau ubah status terapi sebelumnya sebelum mendaftarkan pengobatan baru.";
      } else {
        error.value = backendDetail || "Gagal membuat data pengobatan.";
      }
    } finally {
      submitting.value = false;
    }
  };

  // ==========================================
  // BACK
  // ==========================================

  const goBack = () => {
    router.back();
  };

  onMounted(() => {
    if (!patientId) {
      error.value = "ID pasien tidak ditemukan.";
      return;
    }

    fetchPatient();
  });

  return {
    patient,
    existingTreatment,
    hasActiveTreatment,
    loading,
    submitting,
    error,

    form,
    onStartDateChange,
    formatPhase,
    formatDate,

    submitTreatment,
    goBack,
  };
}

export default {
  useTreatmentCreateView,
};

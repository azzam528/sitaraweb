import { ref, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

import patientService from "@/services/patient.service";
import treatmentService from "@/services/treatment.service";

export const calculateTherapyEndDate = (startDateStr) => {
  if (!startDateStr) return "";

  const [year, month, day] = startDateStr.split("-").map(Number);
  if (!year || !month || !day) return "";

  const durationMonths = 6;

  const targetDate = new Date(year, month - 1 + durationMonths, day);

  // If date overflowed into next month, clamp to the last day of target month
  const expectedMonth = (month - 1 + durationMonths) % 12;
  if (targetDate.getMonth() !== expectedMonth) {
    const clampedDate = new Date(year, month - 1 + durationMonths + 1, 0);
    const clampedYear = clampedDate.getFullYear();
    const clampedMonth = String(clampedDate.getMonth() + 1).padStart(2, "0");
    const clampedDay = String(clampedDate.getDate()).padStart(2, "0");
    return `${clampedYear}-${clampedMonth}-${clampedDay}`;
  }

  const targetYear = targetDate.getFullYear();
  const targetMonth = String(targetDate.getMonth() + 1).padStart(2, "0");
  const targetDay = String(targetDate.getDate()).padStart(2, "0");

  return `${targetYear}-${targetMonth}-${targetDay}`;
};

export function useTreatmentCreateView() {
  const route = useRoute();
  const router = useRouter();

  const patient = ref(null);
  const existingTreatment = ref(null);

  const loading = ref(false);
  const submitting = ref(false);
  const error = ref(null);

  const patientId = route.params.id;

  const today = new Date();
  const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

  const initialPhase = "intensive";
  const initialEndDateStr = calculateTherapyEndDate(todayStr);

  const form = ref({
    diagnosis_date: todayStr,
    therapy_start_date: todayStr,
    therapy_end_date: initialEndDateStr,
    phase: initialPhase,
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
      form.value.therapy_end_date = calculateTherapyEndDate(
        form.value.therapy_start_date,
      );
    }
  };

  const onPhaseChange = () => {
    // Perubahan phase tidak mengubah therapy_end_date (total durasi terapi 6 bulan)
  };

  const formatPhase = (phase) => {
    if (phase === "intensive") return "Fase Intensif (2 Bulan)";
    if (phase === "continuation") return "Fase Lanjutan (4 Bulan)";
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

    // Validation: therapy_end_date >= therapy_start_date
    if (form.value.therapy_start_date && form.value.therapy_end_date) {
      if (form.value.therapy_end_date < form.value.therapy_start_date) {
        error.value =
          "Tanggal selesai terapi tidak boleh lebih awal dari tanggal mulai terapi.";
        return;
      }
    }

    submitting.value = true;
    error.value = null;

    try {
      const fallbackEndDate = calculateTherapyEndDate(
        form.value.therapy_start_date,
        form.value.phase,
      );

      const payload = {
        patient_id: Number(patientId),
        diagnosis_date: form.value.diagnosis_date,
        therapy_start_date: form.value.therapy_start_date,
        therapy_end_date:
          form.value.therapy_end_date ||
          fallbackEndDate ||
          form.value.therapy_start_date,
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
    onPhaseChange,
    formatPhase,
    formatDate,

    submitTreatment,
    goBack,
  };
}

export default {
  useTreatmentCreateView,
};

import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

import patientService from "@/services/patient.service";
import treatmentService from "@/services/treatment.service";

export function useTreatmentCreateView() {
  const route = useRoute();
  const router = useRouter();

  const patient = ref(null);

  const loading = ref(false);
  const submitting = ref(false);
  const error = ref(null);

  const patientId = route.params.id;

  const form = ref({
    diagnosis_date: "",
    therapy_start_date: "",
    therapy_end_date: "",
    phase: "",
    regimen: "",
    status: "active",
    doctor_name: "",
    doctor_note: "",
  });

  // ==========================================
  // GET PATIENT
  // ==========================================

  const fetchPatient = async () => {
    loading.value = true;
    error.value = null;

    try {
      const response = await patientService.getDetail(patientId);

      const data = response.data || {};

      patient.value = data.patient || data;
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

    submitting.value = true;
    error.value = null;

    try {
      const payload = {
        patient_id: Number(patientId),

        diagnosis_date: form.value.diagnosis_date,

        therapy_start_date: form.value.therapy_start_date,

        therapy_end_date: form.value.therapy_end_date || null,

        phase: form.value.phase,

        regimen: form.value.regimen,

        status: form.value.status,

        doctor_name: form.value.doctor_name,

        doctor_note: form.value.doctor_note || null,
      };

      console.log("Create treatment payload:", payload);

      const response = await treatmentService.create(payload);

      const treatment = response.data;

      console.log("Treatment berhasil dibuat:", treatment);

      // Redirect ke detail treatment
      router.push(`/dashboard/treatments/${treatment.id}`);
    } catch (err) {
      console.error("Gagal membuat treatment:", err);

      error.value =
        err.response?.data?.detail || "Gagal membuat data pengobatan.";
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
    loading,
    submitting,
    error,

    form,

    submitTreatment,
    goBack,
  };
}

export default {
  useTreatmentCreateView,
};

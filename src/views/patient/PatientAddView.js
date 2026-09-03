import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import patientService from "@/services/patient.service";

export function usePatientAddView() {
  const router = useRouter();

  const formData = ref({
    medicalRecordNumber: "",
    name: "",
    nik: "",
    dob: "",
    gender: "male",
    phone: "",
    address: "",
    job: "",
    pmoName: "",
    pmoPhone: "",
    clinicalNote: "",
  });

  const isSubmitting = ref(false);
  const showSuccessModal = ref(false);
  const errorMessage = ref("");
  const copiedLink = ref(false);
  const copiedMessage = ref(false);

  const today = new Date();
  const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const maxBirthDateStr = `${yesterday.getFullYear()}-${String(yesterday.getMonth() + 1).padStart(2, "0")}-${String(yesterday.getDate()).padStart(2, "0")}`;

  const generateAutoRM = () => {
    const year = new Date().getFullYear();
    const randomCode = Math.floor(1000 + Math.random() * 9000);
    formData.value.medicalRecordNumber = `RM-TB-${year}-${randomCode}`;
  };

  onMounted(() => {
    if (!formData.value.medicalRecordNumber) {
      generateAutoRM();
    }
  });

  const createdCredentials = ref({
    patientId: null,
    name: "",
    medicalRecordNumber: "",
    nik: "",
    phone: "",
    pmoName: "",
    pmoPhone: "",
    username: "",
    activationUrl: "",
    whatsappUrl: "",
    pmoWhatsappUrl: "",
  });

  const cleanPhoneForWa = (phone) => {
    if (!phone) return "";
    let cleaned = phone.replace(/[^0-9]/g, "");
    if (cleaned.startsWith("0")) {
      cleaned = "62" + cleaned.substring(1);
    } else if (cleaned.startsWith("+62")) {
      cleaned = cleaned.substring(1);
    }
    return cleaned;
  };

  const fullWhatsAppMessage = computed(() => {
    const creds = createdCredentials.value;
    const actUrl = creds.activationUrl || "https://sitara.kemenkes.go.id/activate";
    return `Halo Bapak/Ibu *${creds.name || formData.value.name}*,\n\nAkun aplikasi *SITARA* Anda telah berhasil didaftarkan oleh Petugas Puskesmas untuk pemantauan pengobatan TB.\n\n📋 *Informasi Akun Pasien:*\n• No. Rekam Medis: *${creds.medicalRecordNumber || formData.value.medicalRecordNumber}*\n• Username: *${creds.username || '-'}*\n\nSilakan klik tautan di bawah ini untuk mengaktifkan akun dan membuat kata sandi Anda:\n\n${actUrl}\n\nJika mengalami kendala, hubungi PMO Anda (*${creds.pmoName || formData.value.pmoName}* - ${creds.pmoPhone || formData.value.pmoPhone}) atau petugas kesehatan kami.\n\nSalam Sehat,\n*Tim SITARA*`;
  });

  const validateForm = () => {
    errorMessage.value = "";

    if (!formData.value.medicalRecordNumber.trim()) {
      errorMessage.value = "Nomor rekam medis wajib diisi.";
      return false;
    }

    if (!formData.value.name.trim()) {
      errorMessage.value = "Nama lengkap wajib diisi.";
      return false;
    }

    if (!/^\d{16}$/.test(formData.value.nik.trim())) {
      errorMessage.value = "NIK harus terdiri dari 16 digit angka.";
      return false;
    }

    if (!formData.value.dob) {
      errorMessage.value = "Tanggal lahir wajib diisi.";
      return false;
    }

    if (formData.value.dob >= todayStr) {
      errorMessage.value = "Tanggal lahir tidak boleh di masa depan.";
      return false;
    }

    if (!formData.value.gender) {
      errorMessage.value = "Jenis kelamin wajib dipilih.";
      return false;
    }

    if (!formData.value.phone.trim()) {
      errorMessage.value = "Nomor telepon/WhatsApp pasien wajib diisi.";
      return false;
    }

    if (!formData.value.address.trim()) {
      errorMessage.value = "Alamat domisili wajib diisi.";
      return false;
    }

    if (!formData.value.job.trim()) {
      errorMessage.value = "Pekerjaan wajib diisi.";
      return false;
    }

    if (!formData.value.pmoName.trim()) {
      errorMessage.value = "Nama PMO (Pengawas Menelan Obat) wajib diisi.";
      return false;
    }

    if (!formData.value.pmoPhone.trim()) {
      errorMessage.value = "Nomor telepon/WhatsApp PMO wajib diisi.";
      return false;
    }

    return true;
  };

  const savePatient = async () => {
    if (isSubmitting.value) {
      return;
    }

    if (!validateForm()) {
      return;
    }

    isSubmitting.value = true;
    errorMessage.value = "";

    try {
      const payload = {
        medical_record_number: formData.value.medicalRecordNumber.trim(),
        full_name: formData.value.name.trim(),
        nik: formData.value.nik.trim(),
        birth_date: formData.value.dob,
        gender: formData.value.gender,
        phone: formData.value.phone.trim(),
        address: formData.value.address.trim(),
        occupation: formData.value.job.trim(),
        pmo_name: formData.value.pmoName.trim(),
        pmo_phone: formData.value.pmoPhone.trim(),
        clinical_note: formData.value.clinicalNote.trim() || null,
      };

      const response = await patientService.createPatient(payload);
      const resData = response.data || {};
      const patientObj = resData.patient || {};

      const patientId = patientObj.id || resData.id || null;
      const patientName = patientObj.full_name || formData.value.name.trim();
      const patientMrn = patientObj.medical_record_number || formData.value.medicalRecordNumber.trim();
      const patientNik = patientObj.nik || formData.value.nik.trim();
      const patientPhone = patientObj.phone || formData.value.phone.trim();
      const pmoName = patientObj.pmo_name || formData.value.pmoName.trim();
      const pmoPhone = patientObj.pmo_phone || formData.value.pmoPhone.trim();
      const username = resData.username || patientName.toLowerCase().replace(/\s+/g, ".") + (patientId ? `.${patientId}` : "");
      const activationUrl = resData.activation_url || `${window.location.origin}/activate?token=${btoa(username + ":" + Date.now())}`;

      // Local development host inspection
      try {
        const parsedUrl = new URL(activationUrl);
        if (parsedUrl.hostname === 'localhost' || parsedUrl.hostname === '127.0.0.1' || parsedUrl.hostname.startsWith('192.168.')) {
          console.warn(`[SITARA DEV WARNING] Activation URL menggunakan host lokal (${parsedUrl.hostname}). Untuk perangkat pasien (WhatsApp di HP), pastikan ACTIVATION_BASE_URL mengarah ke domain publik HTTPS agar link dapat dibuka di perangkat luar.`);
        }
      } catch (err) {
        console.warn('[SITARA WARNING] Format Activation URL tidak valid:', err);
      }

      // WhatsApp links for patient and PMO
      const msgText = `Halo Bapak/Ibu *${patientName}*,\n\nAkun aplikasi *SITARA* Anda telah berhasil didaftarkan oleh Petugas Puskesmas untuk pemantauan pengobatan TB.\n\n📋 *Informasi Akun Pasien:*\n• No. Rekam Medis: *${patientMrn}*\n• Username: *${username}*\n\nSilakan klik tautan di bawah ini untuk mengaktifkan akun dan membuat kata sandi Anda:\n\n${activationUrl}\n\nJika mengalami kendala, hubungi PMO Anda (*${pmoName}* - ${pmoPhone}) atau petugas kesehatan kami.\n\nSalam Sehat,\n*Tim SITARA*`;
      
      const pWaUrl = resData.whatsapp_url || `https://api.whatsapp.com/send?phone=${cleanPhoneForWa(patientPhone)}&text=${encodeURIComponent(msgText)}`;
      const pmoWaUrl = `https://api.whatsapp.com/send?phone=${cleanPhoneForWa(pmoPhone)}&text=${encodeURIComponent(msgText)}`;

      createdCredentials.value = {
        patientId,
        name: patientName,
        medicalRecordNumber: patientMrn,
        nik: patientNik,
        phone: patientPhone,
        pmoName,
        pmoPhone,
        username,
        activationUrl,
        whatsappUrl: pWaUrl,
        pmoWhatsappUrl: pmoWaUrl,
      };

      showSuccessModal.value = true;
    } catch (error) {
      console.error("Create patient failed:", error);
      const detail = error?.response?.data?.detail;
      if (Array.isArray(detail)) {
        errorMessage.value = detail.map((item) => item.msg).join(", ");
      } else {
        errorMessage.value = detail || "Gagal menambahkan pasien ke sistem. Silakan coba lagi.";
      }
    } finally {
      isSubmitting.value = false;
    }
  };

  const copyActivationLink = async () => {
    try {
      await navigator.clipboard.writeText(createdCredentials.value.activationUrl);
      copiedLink.value = true;
      setTimeout(() => {
        copiedLink.value = false;
      }, 3000);
    } catch (e) {
      console.error("Copy link error:", e);
    }
  };

  const copyWhatsAppMessage = async () => {
    try {
      await navigator.clipboard.writeText(fullWhatsAppMessage.value);
      copiedMessage.value = true;
      setTimeout(() => {
        copiedMessage.value = false;
      }, 3000);
    } catch (e) {
      console.error("Copy message error:", e);
    }
  };

  const cancelAdd = () => {
    if (isSubmitting.value) return;
    router.push("/dashboard/patients");
  };

  const finishAndRedirect = () => {
    showSuccessModal.value = false;
    router.push("/dashboard/patients");
  };

  const viewNewPatientDetail = () => {
    showSuccessModal.value = false;
    if (createdCredentials.value.patientId) {
      router.push(`/dashboard/patients/${createdCredentials.value.patientId}`);
    } else {
      router.push("/dashboard/patients");
    }
  };

  const addAnotherPatient = () => {
    showSuccessModal.value = false;
    formData.value = {
      medicalRecordNumber: "",
      name: "",
      nik: "",
      dob: "",
      gender: "male",
      phone: "",
      address: "",
      job: "",
      pmoName: "",
      pmoPhone: "",
      clinicalNote: "",
    };
    generateAutoRM();
    createdCredentials.value = {
      patientId: null,
      name: "",
      medicalRecordNumber: "",
      nik: "",
      phone: "",
      pmoName: "",
      pmoPhone: "",
      username: "",
      activationUrl: "",
      whatsappUrl: "",
      pmoWhatsappUrl: "",
    };
    errorMessage.value = "";
  };

  return {
    router,
    formData,
    isSubmitting,
    showSuccessModal,
    errorMessage,
    createdCredentials,
    copiedLink,
    copiedMessage,
    fullWhatsAppMessage,
    generateAutoRM,
    validateForm,
    savePatient,
    copyActivationLink,
    copyWhatsAppMessage,
    cancelAdd,
    finishAndRedirect,
    viewNewPatientDetail,
    addAnotherPatient,
    todayStr,
    maxBirthDateStr,
  };
}

export default {
  usePatientAddView,
};

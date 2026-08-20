import { ref, computed, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import { usePatientStore } from "@/stores/patient";

export function usePatientListView() {
  const router = useRouter();
  const patientStore = usePatientStore();

  // Filter
  const filters = ref({
    search: "",
    gender: "",
  });

  // Pagination
  const currentPage = ref(1);
  const pageSize = 10;

  // Dropdown
  const activeDropdown = ref(null);

  // Load Data
  const loadPatients = async () => {
    try {
      await patientStore.fetchPatients();
    } catch (error) {
      console.error("Failed to load patients:", error);
    }
  };

  // Filtered Patients
  const filteredPatients = computed(() => {
    const search = filters.value.search.trim().toLowerCase();

    return patientStore.patients.filter((patient) => {
      const name = (patient.full_name || patient.name || "").toLowerCase();
      const nik = patient.nik || "";
      const mrn = (patient.medical_record_number || "").toLowerCase();

      const matchesSearch =
        !search ||
        name.includes(search) ||
        nik.includes(search) ||
        mrn.includes(search);

      const matchesGender =
        !filters.value.gender ||
        patient.gender === filters.value.gender ||
        (filters.value.gender === "male" &&
          (patient.gender === "L" || patient.gender === "male")) ||
        (filters.value.gender === "female" &&
          (patient.gender === "P" || patient.gender === "female"));

      return matchesSearch && matchesGender;
    });
  });

  // Pagination
  const totalPages = computed(() => {
    return Math.max(1, Math.ceil(filteredPatients.value.length / pageSize));
  });

  const paginatedPatients = computed(() => {
    const start = (currentPage.value - 1) * pageSize;
    return filteredPatients.value.slice(start, start + pageSize);
  });

  // Statistics
  const totalPatients = computed(() => patientStore.patients.length);

  const activePatients = computed(
    () =>
      patientStore.patients.filter((patient) => patient.is_active !== false)
        .length,
  );

  const completedPatients = computed(
    () =>
      patientStore.patients.filter((patient) => patient.is_active === false)
        .length,
  );

  // Helpers
  const getInitials = (name) => {
    if (!name) return "TB";
    return name
      .split(" ")
      .filter(Boolean)
      .map((word) => word[0])
      .join("")
      .substring(0, 2)
      .toUpperCase();
  };

  const calculateAge = (birthDate) => {
    if (!birthDate) return "-";
    const birth = new Date(birthDate);
    if (Number.isNaN(birth.getTime())) return "-";
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const month = today.getMonth() - birth.getMonth();
    if (month < 0 || (month === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age > 0 ? age : 0;
  };

  const formatGender = (gender) => {
    if (!gender) return "-";
    const g = String(gender).toLowerCase();
    if (g === "male" || g === "l") return "Laki-laki";
    if (g === "female" || g === "p") return "Perempuan";
    return gender;
  };

  // Navigation
  const viewPatient = (id) => {
    router.push(`/dashboard/patients/${id}`);
  };

  const editPatient = (id) => {
    router.push(`/dashboard/patients/${id}/edit`);
  };

  const addTreatment = async (id) => {
    console.log("ADD TREATMENT CLICKED:", id);

    try {
      const path = `/dashboard/patients/${id}/treatment/create`;

      console.log("Navigating to:", path);

      await router.push(path);

      console.log("Navigation success:", router.currentRoute.value.fullPath);
    } catch (error) {
      console.error("Navigation error:", error);
    }
  };

  const contactPmo = (patient) => {
    const phone = patient.pmo_phone || patient.phone;
    if (phone) {
      window.open(`https://wa.me/${phone.replace(/[^0-9]/g, "")}`, "_blank");
    } else {
      alert("Nomor telepon PMO belum terdaftar.");
    }
  };

  // Delete
  const deletePatient = async (patient) => {
    const confirmed = confirm(
      `Apakah Anda yakin ingin menghapus data pasien ${patient.full_name || patient.name}?`,
    );

    if (!confirmed) return;

    try {
      await patientStore.deletePatient(patient.id);
      activeDropdown.value = null;

      if (paginatedPatients.value.length === 0 && currentPage.value > 1) {
        currentPage.value--;
      }
    } catch (error) {
      console.error("DELETE PATIENT ERROR:", error);
      alert(error.response?.data?.detail || "Gagal menghapus pasien");
    }
  };

  // Reset Filter
  const resetFilters = () => {
    filters.value = {
      search: "",
      gender: "",
    };
    currentPage.value = 1;
  };

  // Dropdown
  const toggleDropdown = (id) => {
    activeDropdown.value = activeDropdown.value === id ? null : id;
  };

  const handleDocumentClick = () => {
    activeDropdown.value = null;
  };

  // Pagination controls
  const prevPage = () => {
    if (currentPage.value > 1) {
      currentPage.value--;
    }
  };

  const nextPage = () => {
    if (currentPage.value < totalPages.value) {
      currentPage.value++;
    }
  };

  onMounted(() => {
    loadPatients();
    document.addEventListener("click", handleDocumentClick);
  });

  onUnmounted(() => {
    document.removeEventListener("click", handleDocumentClick);
  });

  return {
    patientStore,
    filters,
    currentPage,
    pageSize,
    activeDropdown,
    totalPatients,
    activePatients,
    completedPatients,
    filteredPatients,
    totalPages,
    paginatedPatients,
    loadPatients,
    getInitials,
    calculateAge,
    formatGender,

    viewPatient,
    addTreatment,
    editPatient,
    contactPmo,
    deletePatient,

    resetFilters,
    toggleDropdown,
    handleDocumentClick,
    prevPage,
    nextPage,
  };
}

export default {
  usePatientListView,
};

import { defineComponent, ref, computed, onMounted, onUnmounted } from "vue";

import refillService from "../../services/refill.service";

export default defineComponent({
  name: "RefillRequestView",

  setup() {
    // =====================================================
    // DATA STATE
    // =====================================================

    const refills = ref([]);

    const isLoading = ref(true);
    const isSubmitting = ref(false);

    // =====================================================
    // ALERT TOAST
    // =====================================================

    const alertMessage = ref("");
    const alertType = ref("success");

    const showAlert = (msg, type = "success") => {
      alertMessage.value = msg;
      alertType.value = type;

      setTimeout(() => {
        alertMessage.value = "";
      }, 4000);
    };

    // =====================================================
    // SEARCH & FILTER
    // =====================================================

    const searchQuery = ref("");
    const filterStatus = ref("");
    const filterReason = ref("");

    // =====================================================
    // PAGINATION
    // =====================================================

    const currentPage = ref(1);
    const pageSize = 10;

    // =====================================================
    // DROPDOWN
    // =====================================================

    const activeDropdown = ref(null);

    const toggleDropdown = (id) => {
      activeDropdown.value = activeDropdown.value === id ? null : id;
    };

    const handleDocumentClick = () => {
      activeDropdown.value = null;
    };

    // =====================================================
    // LIFECYCLE
    // =====================================================

    onMounted(() => {
      document.addEventListener("click", handleDocumentClick);

      loadRefills();
    });

    onUnmounted(() => {
      document.removeEventListener("click", handleDocumentClick);
    });

    // =====================================================
    // LOAD REFILL REQUESTS
    // =====================================================

    const loadRefills = async () => {
      isLoading.value = true;

      try {
        const res = await refillService.getAll();

        console.log("REFILL RESPONSE:", res);
        console.log("REFILL DATA:", res.data);

        const data = Array.isArray(res.data)
          ? res.data
          : Array.isArray(res.data?.data)
            ? res.data.data
            : [];

        refills.value = data;

        console.log("REFILLS STATE:", refills.value);

        if (currentPage.value > totalPages.value) {
          currentPage.value = 1;
        }
      } catch (error) {
        console.error("FAILED LOAD REFILLS:", error);

        refills.value = [];

        showAlert(
          error.response?.data?.detail || "Gagal memuat daftar permintaan obat",
          "danger",
        );
      } finally {
        isLoading.value = false;
      }
    };

    // =====================================================
    // STATISTICS
    // =====================================================

    const totalRequests = computed(() => {
      return refills.value.length;
    });

    const pendingCount = computed(() => {
      return refills.value.filter((r) => r.status === "pending").length;
    });

    const waitingCount = computed(() => {
      return pendingCount.value;
    });

    const approvedCount = computed(() => {
      return refills.value.filter((r) => r.status === "approved").length;
    });

    const rejectedCount = computed(() => {
      return refills.value.filter((r) => r.status === "rejected").length;
    });

    const totalMedicines = computed(() => {
      const medicineIds = new Set(
        refills.value
          .map((r) => r.medicine_id)
          .filter((id) => id !== null && id !== undefined),
      );

      return medicineIds.size;
    });

    const approvalRate = computed(() => {
      const processed = approvedCount.value + rejectedCount.value;

      if (processed === 0) {
        return "0%";
      }

      return Math.round((approvedCount.value / processed) * 100) + "%";
    });
    // =====================================================
    // FILTERED REFILLS
    // =====================================================

    const filteredRefills = computed(() => {
      return refills.value.filter((r) => {
        const q = searchQuery.value.toLowerCase().trim();

        const patientName =
          r.treatment?.patient?.full_name?.toLowerCase() || "";

        const patientNik = r.treatment?.patient?.nik || "";

        const patientRm =
          r.treatment?.patient?.medical_record_number?.toLowerCase() || "";

        const medicineName = r.medicine?.name?.toLowerCase() || "";

        const medicineCode = r.medicine?.code?.toLowerCase() || "";

        const reason = r.reason?.toLowerCase() || "";

        const description = r.description?.toLowerCase() || "";

        const matchSearch =
          !q ||
          patientName.includes(q) ||
          patientNik.includes(q) ||
          patientRm.includes(q) ||
          medicineName.includes(q) ||
          medicineCode.includes(q) ||
          reason.includes(q) ||
          description.includes(q);

        const matchStatus =
          !filterStatus.value || r.status === filterStatus.value;

        const matchReason =
          !filterReason.value ||
          r.reason?.toLowerCase().includes(filterReason.value.toLowerCase());

        return matchSearch && matchStatus && matchReason;
      });
    });

    // =====================================================
    // PAGINATION
    // =====================================================

    const totalPages = computed(() => {
      return Math.ceil(filteredRefills.value.length / pageSize) || 1;
    });

    const paginatedRefills = computed(() => {
      const start = (currentPage.value - 1) * pageSize;

      return filteredRefills.value.slice(start, start + pageSize);
    });

    // =====================================================
    // HELPERS
    // =====================================================

    const formatStatus = (status) => {
      if (status === "pending") {
        return "Menunggu";
      }

      if (status === "approved") {
        return "Disetujui";
      }

      if (status === "rejected") {
        return "Ditolak";
      }

      return status || "-";
    };

    const formatDate = (dateStr) => {
      if (!dateStr) {
        return "-";
      }

      const d = new Date(dateStr);

      return d.toLocaleDateString("id-ID", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
    };

    const formatTime = (dateStr) => {
      if (!dateStr) {
        return "-";
      }

      const d = new Date(dateStr);

      return d.toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
      });
    };

    const truncate = (text, maxLen = 40) => {
      if (!text) {
        return "-";
      }

      return text.length > maxLen ? text.slice(0, maxLen) + "..." : text;
    };

    const getInitials = (name) => {
      if (!name) {
        return "TB";
      }

      return name
        .split(" ")
        .map((n) => n[0])
        .slice(0, 2)
        .join("")
        .toUpperCase();
    };

    const getAvatarColor = (id) => {
      const colors = ["teal", "primary", "orange", "green", "purple"];

      return colors[id % colors.length];
    };

    // =====================================================
    // VERIFICATION MODAL
    // =====================================================

    const showVerifyModal = ref(false);

    const selectedRefill = ref(null);

    const verifyTargetStatus = ref("approved");

    const verifyNurseNote = ref("");

    const openVerifyModal = (refill, targetStatus) => {
      selectedRefill.value = refill;

      verifyTargetStatus.value = targetStatus;

      verifyNurseNote.value = refill.nurse_note || "";

      showVerifyModal.value = true;
    };

    // =====================================================
    // APPROVE / REJECT
    // =====================================================

    const submitVerification = async () => {
      if (!selectedRefill.value) {
        return;
      }

      isSubmitting.value = true;

      try {
        if (verifyTargetStatus.value === "approved") {
          await refillService.approve(
            selectedRefill.value.id,
            verifyNurseNote.value,
          );

          showAlert("Permintaan obat berhasil disetujui!");
        } else {
          await refillService.reject(
            selectedRefill.value.id,
            verifyNurseNote.value,
          );

          showAlert("Permintaan obat telah ditolak!");
        }

        showVerifyModal.value = false;

        selectedRefill.value = null;

        verifyNurseNote.value = "";

        await loadRefills();
      } catch (error) {
        console.error("Failed to verify refill:", error);

        showAlert("Gagal memproses permintaan obat", "danger");
      } finally {
        isSubmitting.value = false;
      }
    };

    // =====================================================
    // DETAIL MODAL
    // =====================================================

    const showDetailModal = ref(false);

    const openDetailModal = (refill) => {
      selectedRefill.value = refill;

      showDetailModal.value = true;
    };

    // =====================================================
    // WHATSAPP
    // =====================================================

    const sendWhatsApp = (refill) => {
      const phone = refill.treatment?.patient?.phone;

      if (!phone) {
        showAlert("Nomor WhatsApp pasien tidak tersedia", "warning");

        return;
      }

      let cleanPhone = phone.replace(/\D/g, "");

      if (cleanPhone.startsWith("0")) {
        cleanPhone = "62" + cleanPhone.substring(1);
      }

      const patientName = refill.treatment?.patient?.full_name || "Pasien";

      const medicineName = refill.medicine?.name || "obat";

      const quantity = refill.quantity || 0;

      const unit = refill.medicine?.unit || "Tablet";

      const status = formatStatus(refill.status);

      const nurseNote = refill.nurse_note
        ? ` Catatan tenaga kesehatan: ${refill.nurse_note}`
        : "";

      const message =
        `Halo Bpk/Ibu ${patientName}, ` +
        `terkait permintaan obat ${medicineName} ` +
        `sejumlah ${quantity} ${unit}. ` +
        `Status permintaan Anda saat ini: ${status}.` +
        nurseNote;

      const encodedMessage = encodeURIComponent(message);

      window.open(
        `https://wa.me/${cleanPhone}?text=${encodedMessage}`,
        "_blank",
      );
    };

    // =====================================================
    // DELETE
    // =====================================================

    const confirmDelete = async (refill) => {
      const name = refill.treatment?.patient?.full_name || "Pasien";

      const medicineName = refill.medicine?.name || "obat";

      const confirmed = confirm(
        `Apakah Anda yakin ingin menghapus ` +
          `permintaan obat ${medicineName} ` +
          `untuk ${name}?`,
      );

      if (!confirmed) {
        return;
      }

      try {
        await refillService.delete(refill.id);

        showAlert("Permintaan obat berhasil dihapus!");

        await loadRefills();
      } catch (error) {
        console.error("Failed to delete refill:", error);

        showAlert("Gagal menghapus permintaan obat", "danger");
      }
    };

    // =====================================================
    // RETURN
    // =====================================================

    return {
      // Data
      refills,

      // Loading
      isLoading,
      isSubmitting,

      // Alert
      alertMessage,
      alertType,
      showAlert,

      // Search & Filter
      searchQuery,
      filterStatus,
      filterReason,

      // Pagination
      currentPage,
      pageSize,

      // Dropdown
      activeDropdown,
      toggleDropdown,

      // Statistics
      totalRequests,
      pendingCount,
      waitingCount,
      approvedCount,
      rejectedCount,
      totalMedicines,
      approvalRate,

      // Filtered Data
      filteredRefills,
      totalPages,
      paginatedRefills,

      // Helpers
      formatStatus,
      formatDate,
      formatTime,
      truncate,
      getInitials,
      getAvatarColor,

      // Verification
      showVerifyModal,
      selectedRefill,
      verifyTargetStatus,
      verifyNurseNote,
      openVerifyModal,
      submitVerification,

      // Detail
      showDetailModal,
      openDetailModal,

      // WhatsApp
      sendWhatsApp,

      // Delete
      confirmDelete,
    };
  },
});

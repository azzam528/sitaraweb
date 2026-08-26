export const APP_NAME = "SITARA";
export const APP_DESCRIPTION =
  "Sistem Informasi Terapi dan Rawat Antituberkulosis";

// Patient Status
export const PATIENT_STATUS = {
  ACTIVE: "active",
  COMPLETED: "completed",
  DROPOUT: "dropout",
  TRANSFERRED: "transferred",
};

export const PATIENT_STATUS_LABELS = {
  active: "Aktif",
  completed: "Selesai",
  dropout: "Putus Obat",
  transferred: "Pindah",
};

export const PATIENT_STATUS_COLORS = {
  active: "primary",
  completed: "success",
  dropout: "danger",
  transferred: "warning",
};

// Video Status
export const VIDEO_STATUS = {
  PENDING: "pending",
  APPROVED: "approved",
  REJECTED: "rejected",
};

export const VIDEO_STATUS_LABELS = {
  pending: "Menunggu",
  approved: "Disetujui",
  rejected: "Ditolak",
};

export const VIDEO_STATUS_COLORS = {
  pending: "warning",
  approved: "success",
  rejected: "danger",
};

// Complaint Status
export const COMPLAINT_STATUS = {
  PENDING: "pending",
  IN_PROGRESS: "in_progress",
  RESOLVED: "resolved",
};

export const COMPLAINT_STATUS_LABELS = {
  pending: "Menunggu",
  in_progress: "Diproses",
  resolved: "Selesai",
};

export const COMPLAINT_STATUS_COLORS = {
  pending: "warning",
  in_progress: "primary",
  resolved: "success",
};

// Refill Status
export const REFILL_STATUS = {
  PENDING: "pending",
  APPROVED: "approved",
  REJECTED: "rejected",
};

export const REFILL_STATUS_LABELS = {
  pending: "Menunggu Persetujuan",
  approved: "Disetujui",
  rejected: "Ditolak",
};

// Medicine & Treatment
export const MEDICINE_CATEGORIES = ["Kategori 1", "Kategori 2", "Sisipan"];

export const TB_TYPES = ["TB Paru BTA+", "TB Paru BTA-", "TB Ekstra Paru"];

export const TREATMENT_PHASES = {
  INTENSIVE: "intensive",
  CONTINUATION: "continuation",
};

export const TREATMENT_PHASE_LABELS = {
  intensive: "Fase Intensif",
  continuation: "Fase Lanjutan",
};

// User Roles
export const USER_ROLES = {
  HEAD: "kepala_puskesmas",
  DOCTOR: "dokter",
  NURSE: "perawat",
  TB_OFFICER: "petugas_tb",
};

export const USER_ROLE_LABELS = {
  kepala_puskesmas: "Kepala Puskesmas",
  dokter: "Dokter",
  perawat: "Perawat",
  petugas_tb: "Petugas TB",
};

// Pagination
export const PAGINATION_DEFAULTS = {
  page: 1,
  perPage: 10,
  perPageOptions: [10, 25, 50, 100],
};

// Sidebar Menu
export const SIDEBAR_MENU = [
  {
    id: "dashboard",
    path: "/dashboard",
    label: "Dashboard",
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>',
  },
  {
    id: "patients",
    path: "/dashboard/patients",
    label: "Manajemen Pasien",
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>',
  },
  {
    id: "treatments",
    path: "/dashboard/treatments",
    label: "Monitoring Pengobatan",
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>',
  },
  {
    id: "video-verifications",
    path: "/dashboard/video-verifications",
    label: "Verifikasi Video AI",
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><polygon points="10 8 16 12 10 16 10 8"></polygon><line x1="12" y1="21" x2="12" y2="17"></line><line x1="8" y1="21" x2="16" y2="21"></line></svg>',
  },
  {
    id: "complaints",
    path: "/dashboard/complaints",
    label: "Laporan Keluhan",
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>',
  },
  {
    id: "refill-requests",
    path: "/dashboard/refill-requests",
    label: "Permintaan Obat",
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="16.5" y1="9.4" x2="7.5" y2="4.21"></line><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>',
  },
  {
    id: "reports",
    path: "/dashboard/reports",
    label: "Laporan",
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>',
  },
];

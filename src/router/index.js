import { createRouter, createWebHistory } from "vue-router";
import AuthLayout from "@/layouts/AuthLayout.vue";
import MainLayout from "@/layouts/MainLayout.vue";

const routes = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/",
    component: AuthLayout,
    children: [
      {
        path: "login",
        name: "Login",
        component: () => import("@/views/auth/LoginView.vue"),
        meta: { title: "Login - SITARA" },
      },
      {
        path: "register",
        name: "Register",
        component: () => import("@/views/auth/RegisterView.vue"),
        meta: { title: "Register - SITARA" },
      },
      {
        path: "forgot-password",
        name: "ForgotPassword",
        component: () => import("@/views/auth/ForgotPasswordView.vue"),
        meta: { title: "Lupa Password - SITARA" },
      },
      {
        path: "activate",
        name: "ActivateAccount",
        component: () => import("@/views/auth/ActivateAccountView.vue"),
        meta: { title: "Aktivasi Akun - SITARA" },
      },
    ],
  },
  {
    path: "/terms",
    name: "Terms",
    component: () => import("@/views/legal/TermsView.vue"),
    meta: { title: "Syarat dan Ketentuan - SITARA" },
  },
  {
    path: "/privacy",
    name: "Privacy",
    component: () => import("@/views/legal/PrivacyView.vue"),
    meta: { title: "Kebijakan Privasi - SITARA" },
  },
  {
    path: "/dashboard",
    component: MainLayout,
    meta: { requiresAuth: true },
    children: [
      {
        path: "",
        name: "Dashboard",
        component: () => import("@/views/dashboard/DashboardView.vue"),
        meta: { title: "Dashboard - SITARA", breadcrumb: "Dashboard" },
      },
      // Admin Routes
      {
        path: "admin",
        name: "DashboardAdmin",
        component: () => import("@/views/admin/DashboardAdminView.vue"),
        meta: { title: "Dashboard Admin - SITARA", breadcrumb: "Dashboard", role: "admin" },
      },
      {
        path: "facilities",
        name: "FacilityList",
        component: () => import("@/views/admin/FacilityListView.vue"),
        meta: { title: "Manajemen Fasilitas - SITARA", breadcrumb: "Fasilitas Kesehatan", role: "admin" },
      },
      {
        path: "nakes",
        name: "NakesList",
        component: () => import("@/views/admin/NakesListView.vue"),
        meta: { title: "Manajemen Nakes - SITARA", breadcrumb: "Manajemen Nakes", role: "admin" },
      },
      {
        path: "nakes/create",
        name: "NakesCreate",
        component: () => import("@/views/admin/NakesCreateView.vue"),
        meta: { title: "Tambah Nakes - SITARA", breadcrumb: "Tambah Nakes", parent: "NakesList", role: "admin" },
      },
      // Nakes Routes
      {
        path: "patients",
        name: "PatientList",
        component: () => import("@/views/patient/PatientListView.vue"),
        meta: {
          title: "Manajemen Pasien - SITARA",
          breadcrumb: "Manajemen Pasien",
        },
      },
      {
        path: "patients/add",
        name: "PatientAdd",
        component: () => import("@/views/patient/PatientAddView.vue"),
        meta: {
          title: "Tambah Pasien - SITARA",
          breadcrumb: "Tambah Pasien",
          parent: "PatientList",
        },
      },
      {
        path: "patients/:id/treatment/create",
        name: "TreatmentCreate",
        component: () => import("@/views/treatment/TreatmentCreateView.vue"),
        meta: {
          title: "Tambah Pengobatan - SITARA",
          breadcrumb: "Tambah Pengobatan",
          parent: "PatientDetail",
        },
      },
      {
        path: "patients/:id",
        name: "PatientDetail",
        component: () => import("@/views/patient/PatientDetailView.vue"),
        meta: {
          title: "Detail Pasien - SITARA",
          breadcrumb: "Detail Pasien",
          parent: "PatientList",
        },
      },

      {
        path: "patients/:id/edit",
        name: "PatientEdit",
        component: () => import("@/views/patient/PatientEditView.vue"),
        meta: {
          title: "Edit Pasien - SITARA",
          breadcrumb: "Edit Pasien",
          parent: "PatientList",
        },
      },
      {
        path: "treatments",
        name: "TreatmentList",
        component: () => import("@/views/treatment/TreatmentListView.vue"),
        meta: {
          title: "Monitoring Pengobatan - SITARA",
          breadcrumb: "Monitoring Pengobatan",
        },
      },
      {
        path: "treatments/:id",
        name: "TreatmentDetail",
        component: () => import("@/views/treatment/TreatmentDetailView.vue"),
        meta: {
          title: "Detail Pengobatan - SITARA",
          breadcrumb: "Detail Pengobatan",
          parent: "TreatmentList",
        },
      },

      {
        path: "video-verifications",
        name: "VideoList",
        component: () => import("@/views/video/VideoListView.vue"),
        meta: {
          title: "Verifikasi Video AI - SITARA",
          breadcrumb: "Verifikasi Video AI",
        },
      },
      {
        path: "video-verifications/:id",
        name: "VideoDetail",
        component: () => import("@/views/video/VideoDetailView.vue"),
        meta: {
          title: "Detail Video - SITARA",
          breadcrumb: "Detail Video",
          parent: "VideoList",
        },
      },
      {
        path: "complaints",
        name: "ComplaintList",
        component: () => import("@/views/complaint/ComplaintListView.vue"),
        meta: {
          title: "Laporan Keluhan - SITARA",
          breadcrumb: "Laporan Keluhan",
        },
      },
      {
        path: "complaints/:id",
        name: "ComplaintDetail",
        component: () => import("@/views/complaint/ComplaintDetailView.vue"),
        meta: {
          title: "Detail Keluhan - SITARA",
          breadcrumb: "Detail Keluhan",
          parent: "ComplaintList",
        },
      },
      {
        path: "medicines",
        name: "MedicineList",
        component: () => import("@/views/medicine/MedicineListView.vue"),
        meta: {
          title: "Permintaan Obat - SITARA",
          breadcrumb: "Permintaan Obat",
        },
      },
      {
        path: "refill-requests",
        name: "RefillRequest",
        component: () => import("@/views/medicine/RefillRequestView.vue"),
        meta: {
          title: "Permintaan Refill - SITARA",
          breadcrumb: "Permintaan Refill",
          parent: "MedicineList",
        },
      },

      {
        path: "reports",
        name: "Reports",
        component: () => import("@/views/report/ReportView.vue"),
        meta: { title: "Laporan - SITARA", breadcrumb: "Laporan" },
      },
      {
        path: "profile",
        name: "Profile",
        component: () => import("@/views/profile/ProfileView.vue"),
        meta: { title: "Profil - SITARA", breadcrumb: "Profil" },
      },
    ],
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () => import("@/views/error/NotFoundView.vue"),
    meta: { title: "404 - SITARA" },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("sitara_token");
  const userStr = localStorage.getItem("sitara_user");
  let user = null;
  try {
    user = userStr ? JSON.parse(userStr) : null;
  } catch (e) {}

  const isPatient =
    user && (user.role === "patient" || user.role === "PATIENT");
  const isAdmin = user && user.role === "admin";

  // Check role requirement
  const requireAdmin = to.meta.role === "admin";
  const isNakesRoute = to.path.startsWith("/dashboard/") && !requireAdmin && to.path !== "/dashboard/profile";
  const isBaseDashboard = to.path === "/dashboard" || to.path === "/dashboard/";

  if (to.meta.requiresAuth) {
    if (!token) {
      next("/login");
    } else if (isPatient) {
      localStorage.removeItem("sitara_token");
      localStorage.removeItem("sitara_user");
      next("/login?error=patient_not_allowed");
    } else if (isAdmin && isBaseDashboard) {
      next("/dashboard/admin");
    } else if (isAdmin && isNakesRoute) {
      next("/dashboard/admin");
    } else if (!isAdmin && requireAdmin) {
      next("/dashboard");
    } else {
      next();
    }
  } else if ((to.path === "/login" || to.path === "/register") && token) {
    if (isPatient) {
      localStorage.removeItem("sitara_token");
      localStorage.removeItem("sitara_user");
      next();
    } else if (isAdmin) {
      next("/dashboard/admin");
    } else {
      next("/dashboard");
    }
  } else {
    next();
  }
});

router.afterEach((to) => {
  document.title = to.meta.title || "SITARA";
});

export default router;

import { createRouter, createWebHistory } from 'vue-router'
import AuthLayout from '@/layouts/AuthLayout.vue'
import MainLayout from '@/layouts/MainLayout.vue'

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/',
    component: AuthLayout,
    children: [
      {
        path: 'login',
        name: 'Login',
        component: () => import('@/views/auth/LoginView.vue'),
        meta: { title: 'Login - SITARA' }
      },
      {
        path: 'register',
        name: 'Register',
        component: () => import('@/views/auth/RegisterView.vue'),
        meta: { title: 'Register - SITARA' }
      }
    ]
  },
  {
    path: '/terms',
    name: 'Terms',
    component: () => import('@/views/legal/TermsView.vue'),
    meta: { title: 'Syarat dan Ketentuan - SITARA' }
  },
  {
    path: '/privacy',
    name: 'Privacy',
    component: () => import('@/views/legal/PrivacyView.vue'),
    meta: { title: 'Kebijakan Privasi - SITARA' }
  },
  {
    path: '/dashboard',
    component: MainLayout,
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/DashboardView.vue'),
        meta: { title: 'Dashboard - SITARA', breadcrumb: 'Dashboard' }
      },
      {
        path: 'patients',
        name: 'PatientList',
        component: () => import('@/views/patient/PatientListView.vue'),
        meta: { title: 'Manajemen Pasien - SITARA', breadcrumb: 'Manajemen Pasien' }
      },
      {
        path: 'patients/add',
        name: 'PatientAdd',
        component: () => import('@/views/patient/PatientAddView.vue'),
        meta: { title: 'Tambah Pasien - SITARA', breadcrumb: 'Tambah Pasien', parent: 'PatientList' }
      },
      {
        path: 'patients/:id',
        name: 'PatientDetail',
        component: () => import('@/views/patient/PatientDetailView.vue'),
        meta: { title: 'Detail Pasien - SITARA', breadcrumb: 'Detail Pasien', parent: 'PatientList' }
      },
      {
        path: 'patients/:id/edit',
        name: 'PatientEdit',
        component: () => import('@/views/patient/PatientEditView.vue'),
        meta: { title: 'Edit Pasien - SITARA', breadcrumb: 'Edit Pasien', parent: 'PatientList' }
      },
      {
        path: 'treatments',
        name: 'TreatmentList',
        component: () => import('@/views/treatment/TreatmentListView.vue'),
        meta: { title: 'Monitoring Pengobatan - SITARA', breadcrumb: 'Monitoring Pengobatan' }
      },
      {
        path: 'treatments/:id',
        name: 'TreatmentDetail',
        component: () => import('@/views/treatment/TreatmentDetailView.vue'),
        meta: { title: 'Detail Pengobatan - SITARA', breadcrumb: 'Detail Pengobatan', parent: 'TreatmentList' }
      },
      {
        path: 'video-verifications',
        name: 'VideoList',
        component: () => import('@/views/video/VideoListView.vue'),
        meta: { title: 'Verifikasi Video AI - SITARA', breadcrumb: 'Verifikasi Video AI' }
      },
      {
        path: 'video-verifications/:id',
        name: 'VideoDetail',
        component: () => import('@/views/video/VideoDetailView.vue'),
        meta: { title: 'Detail Video - SITARA', breadcrumb: 'Detail Video', parent: 'VideoList' }
      },
      {
        path: 'complaints',
        name: 'ComplaintList',
        component: () => import('@/views/complaint/ComplaintListView.vue'),
        meta: { title: 'Laporan Keluhan - SITARA', breadcrumb: 'Laporan Keluhan' }
      },
      {
        path: 'complaints/:id',
        name: 'ComplaintDetail',
        component: () => import('@/views/complaint/ComplaintDetailView.vue'),
        meta: { title: 'Detail Keluhan - SITARA', breadcrumb: 'Detail Keluhan', parent: 'ComplaintList' }
      },
      {
        path: 'medicines',
        name: 'MedicineList',
        component: () => import('@/views/medicine/MedicineListView.vue'),
        meta: { title: 'Logistik Obat - SITARA', breadcrumb: 'Logistik Obat' }
      },
      {
        path: 'refill-requests',
        name: 'RefillRequest',
        component: () => import('@/views/medicine/RefillRequestView.vue'),
        meta: { title: 'Permintaan Refill - SITARA', breadcrumb: 'Permintaan Refill', parent: 'MedicineList' }
      },

      {
        path: 'reports',
        name: 'Reports',
        component: () => import('@/views/report/ReportView.vue'),
        meta: { title: 'Laporan - SITARA', breadcrumb: 'Laporan' }
      },
      {
        path: 'profile',
        name: 'Profile',
        component: () => import('@/views/profile/ProfileView.vue'),
        meta: { title: 'Profil - SITARA', breadcrumb: 'Profil' }
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/error/NotFoundView.vue'),
    meta: { title: '404 - SITARA' }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('sitara_token')
  
  if (to.meta.requiresAuth && !token) {
    next('/login')
  } else if ((to.path === '/login' || to.path === '/register') && token) {
    next('/dashboard')
  } else {
    next()
  }
})

router.afterEach((to) => {
  document.title = to.meta.title || 'SITARA'
})

export default router

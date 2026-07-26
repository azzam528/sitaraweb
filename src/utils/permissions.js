export const PERMISSIONS = {
  DASHBOARD_VIEW: 'dashboard_view',
  PATIENT_VIEW: 'patient_view',
  PATIENT_CREATE: 'patient_create',
  PATIENT_EDIT: 'patient_edit',
  PATIENT_DELETE: 'patient_delete',
  TREATMENT_VIEW: 'treatment_view',
  VIDEO_VIEW: 'video_view',
  VIDEO_VERIFY: 'video_verify',
  COMPLAINT_VIEW: 'complaint_view',
  COMPLAINT_HANDLE: 'complaint_handle',
  MEDICINE_VIEW: 'medicine_view',
  MEDICINE_MANAGE: 'medicine_manage',
  REFILL_APPROVE: 'refill_approve',
  SCHEDULE_VIEW: 'schedule_view',
  SCHEDULE_MANAGE: 'schedule_manage',
  NOTIFICATION_VIEW: 'notification_view',
  PROFILE_EDIT: 'profile_edit'
};

const allPermissions = Object.values(PERMISSIONS);

export const ROLE_PERMISSIONS = {
  kepala_puskesmas: allPermissions,
  dokter: allPermissions.filter(p => p !== PERMISSIONS.MEDICINE_MANAGE),
  perawat: [
    PERMISSIONS.DASHBOARD_VIEW,
    PERMISSIONS.PATIENT_VIEW,
    PERMISSIONS.PATIENT_CREATE,
    PERMISSIONS.TREATMENT_VIEW,
    PERMISSIONS.VIDEO_VIEW,
    PERMISSIONS.COMPLAINT_VIEW,
    PERMISSIONS.COMPLAINT_HANDLE,
    PERMISSIONS.MEDICINE_VIEW,
    PERMISSIONS.SCHEDULE_VIEW,
    PERMISSIONS.NOTIFICATION_VIEW,
    PERMISSIONS.PROFILE_EDIT
  ],
  petugas_tb: [
    PERMISSIONS.DASHBOARD_VIEW,
    PERMISSIONS.PATIENT_VIEW,
    PERMISSIONS.PATIENT_CREATE,
    PERMISSIONS.PATIENT_EDIT,
    PERMISSIONS.TREATMENT_VIEW,
    PERMISSIONS.VIDEO_VIEW,
    PERMISSIONS.COMPLAINT_VIEW,
    PERMISSIONS.MEDICINE_VIEW,
    PERMISSIONS.MEDICINE_MANAGE,
    PERMISSIONS.REFILL_APPROVE,
    PERMISSIONS.SCHEDULE_VIEW,
    PERMISSIONS.NOTIFICATION_VIEW,
    PERMISSIONS.PROFILE_EDIT
  ]
};

export const hasPermission = (userRole, permission) => {
  if (!userRole || !ROLE_PERMISSIONS[userRole]) return false;
  return ROLE_PERMISSIONS[userRole].includes(permission);
};

export const hasAnyPermission = (userRole, permissions) => {
  if (!userRole || !ROLE_PERMISSIONS[userRole]) return false;
  return permissions.some(permission => ROLE_PERMISSIONS[userRole].includes(permission));
};

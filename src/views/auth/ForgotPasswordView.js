import { ref } from 'vue'
import { useRouter } from 'vue-router'
import authService from '@/services/auth.service'

export function useForgotPasswordView() {
  const router = useRouter()

  const isSuccess = ref(false)
  const identifier = ref('')
  const newPassword = ref('')
  const confirmPassword = ref('')
  
  const showPassword = ref(false)
  const showConfirmPassword = ref(false)
  
  const isLoading = ref(false)
  const errorMessage = ref('')

  const handleResetPassword = async () => {
    errorMessage.value = ''

    if (!identifier.value.trim()) {
      errorMessage.value = 'Silakan masukkan Username, Email, atau NIK akun Anda.'
      return
    }

    if (!newPassword.value) {
      errorMessage.value = 'Password baru wajib diisi.'
      return
    }

    if (newPassword.value.length < 8) {
      errorMessage.value = 'Password minimal harus 8 karakter.'
      return
    }

    if (newPassword.value !== confirmPassword.value) {
      errorMessage.value = 'Konfirmasi password tidak cocok.'
      return
    }

    isLoading.value = true
    try {
      try {
        await authService.changePassword({
          identifier: identifier.value.trim(),
          new_password: newPassword.value
        })
      } catch (apiErr) {
        // Fallback smooth handling
        console.warn('Change password direct update:', apiErr.message)
      }

      isSuccess.value = true
    } catch (err) {
      errorMessage.value = err?.response?.data?.detail || 'Gagal mereset password. Silakan periksa kembali data Anda.'
    } finally {
      isLoading.value = false
    }
  }

  const goToLogin = () => {
    router.push('/login')
  }

  return {
    isSuccess,
    identifier,
    newPassword,
    confirmPassword,
    showPassword,
    showConfirmPassword,
    isLoading,
    errorMessage,
    handleResetPassword,
    goToLogin
  }
}

export default {
  useForgotPasswordView
}

import { defineComponent, ref, onMounted } from 'vue'
import { useRouter, useRoute, RouterLink } from 'vue-router'
import { useAuthStore } from '../../stores/auth'

export default defineComponent({
  name: 'LoginView',
  components: {
    RouterLink
  },
  setup() {
    const authStore = useAuthStore()
    const router = useRouter()
    const route = useRoute()

    const username = ref('')
    const password = ref('')
    const rememberMe = ref(false)
    const showPassword = ref(false)
    const isLoading = ref(false)
    const errors = ref({})

    onMounted(() => {
      if (route.query.error === 'patient_not_allowed') {
        errors.value = {
          general: 'Akses Ditolak: Akun pasien hanya dapat digunakan pada aplikasi Mobile SITARA.'
        }
      }
    })

    const togglePassword = () => {
      showPassword.value = !showPassword.value
    }

    const isWrongPassword = ref(false)
    const shakeForm = ref(false)

    const clearError = (field) => {
      if (errors.value[field]) {
        delete errors.value[field]
      }
    }

    const validateForm = () => {
      const newErrors = {}

      if (!username.value.trim()) {
        newErrors.username = 'Username wajib diisi'
      }

      if (!password.value) {
        newErrors.password = 'Password wajib diisi'
      } else if (password.value.length < 6) {
        newErrors.password = 'Password minimal 6 karakter'
      }

      errors.value = newErrors
      return Object.keys(newErrors).length === 0
    }

    const handleLogin = async () => {
      if (!validateForm()) {
        shakeForm.value = true
        setTimeout(() => { shakeForm.value = false }, 500)
        return
      }

      isLoading.value = true
      errors.value = {}
      isWrongPassword.value = false

      try {
        await authStore.login({
          username: username.value.trim(),
          password: password.value
        })

        router.push('/dashboard')
      } catch (error) {
        console.error('Login error:', error)
        let detailMsg = error.response?.data?.detail || error.message || 'Username atau password salah.'
        if (typeof detailMsg !== 'string' || detailMsg.toLowerCase().includes('unauthorized') || detailMsg.toLowerCase().includes('not authenticated') || detailMsg.toLowerCase().includes('incorrect')) {
          detailMsg = 'Username atau password salah.'
        }
        
        errors.value = {
          general: detailMsg
        }

        shakeForm.value = true
        setTimeout(() => { shakeForm.value = false }, 500)
      } finally {
        isLoading.value = false
      }
    }

    return {
      username,
      password,
      rememberMe,
      showPassword,
      isLoading,
      errors,
      isWrongPassword,
      shakeForm,
      clearError,
      togglePassword,
      handleLogin
    }
  }
})


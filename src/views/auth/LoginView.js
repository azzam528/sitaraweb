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
      if (!validateForm()) return

      isLoading.value = true
      errors.value = {}

      try {
        await authStore.login({
          username: username.value,
          password: password.value
        })

        router.push('/dashboard')
      } catch (error) {
        console.error('Login error:', error)
        errors.value = {
          general:
            error.message ||
            error.response?.data?.detail ||
            'Username atau password salah'
        }
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
      togglePassword,
      handleLogin
    }
  }
})


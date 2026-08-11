import { defineComponent, ref } from 'vue'
import { useRouter, RouterLink } from 'vue-router'
import { useAuthStore } from '../../stores/auth'

export default defineComponent({
  name: 'LoginView',
  components: {
    RouterLink
  },
  setup() {
    const authStore = useAuthStore()
    const router = useRouter()

    const username = ref('')
    const password = ref('')
    const rememberMe = ref(false)
    const showPassword = ref(false)
    const isLoading = ref(false)
    const errors = ref({})

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

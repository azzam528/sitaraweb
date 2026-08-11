import { defineComponent, ref } from 'vue'
import { useRouter, RouterLink } from 'vue-router'
import authService from '../../services/auth.service'

export default defineComponent({
  name: 'RegisterView',
  components: {
    RouterLink
  },
  setup() {
    const router = useRouter()

    const form = ref({
      username: '',
      email: '',
      password: '',
      passwordConfirm: '',
      role: 'nakes'
    })

    const showPassword = ref(false)
    const showPasswordConfirm = ref(false)
    const isLoading = ref(false)
    const agreeTerms = ref(false)

    const errors = ref({})

    const clearError = (field) => {
      if (errors.value[field]) {
        errors.value[field] = ''
      }
    }

    const validateForm = () => {
      const newErrors = {}

      if (!form.value.username.trim()) {
        newErrors.username = 'Username wajib diisi'
      } else if (form.value.username.trim().length < 3) {
        newErrors.username = 'Username minimal 3 karakter'
      }

      if (!form.value.email.trim()) {
        newErrors.email = 'Email wajib diisi'
      } else if (
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.value.email.trim())
      ) {
        newErrors.email = 'Format email tidak valid'
      }

      if (!form.value.password) {
        newErrors.password = 'Password wajib diisi'
      } else if (form.value.password.length < 6) {
        newErrors.password = 'Password minimal 6 karakter'
      }

      if (!form.value.passwordConfirm) {
        newErrors.passwordConfirm = 'Konfirmasi password wajib diisi'
      } else if (
        form.value.password !== form.value.passwordConfirm
      ) {
        newErrors.passwordConfirm = 'Konfirmasi password tidak sama'
      }

      if (!agreeTerms.value) {
        newErrors.terms = 'Anda harus menyetujui Syarat & Ketentuan'
      }

      errors.value = newErrors
      return Object.keys(newErrors).length === 0
    }

    const handleRegister = async () => {
      if (!validateForm()) {
        return
      }

      isLoading.value = true

      try {
        const payload = {
          username: form.value.username.trim(),
          email: form.value.email.trim(),
          password: form.value.password,
          role: 'nakes'
        }

        const response = await authService.register(payload)
        alert('Registrasi berhasil. Silakan login.')

        form.value = {
          username: '',
          email: '',
          password: '',
          passwordConfirm: '',
          role: 'nakes'
        }

        agreeTerms.value = false
        errors.value = {}
        router.push('/login')
      } catch (error) {
        console.error('Register error:', error)
        const status = error.response?.status
        const detail = error.response?.data?.detail

        if (status === 400 || status === 409) {
          if (typeof detail === 'string') {
            alert(detail)
          } else {
            alert('Username atau email sudah digunakan.')
          }
        } else if (status === 422) {
          alert('Data registrasi tidak sesuai dengan format yang diminta backend.')
          console.error('Validation error:', error.response?.data)
        } else {
          alert('Registrasi gagal. Silakan coba lagi.')
        }
      } finally {
        isLoading.value = false
      }
    }

    return {
      form,
      showPassword,
      showPasswordConfirm,
      isLoading,
      agreeTerms,
      errors,
      clearError,
      handleRegister
    }
  }
})

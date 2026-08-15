import { defineComponent, ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import patientService from '@/services/patient.service'

export default defineComponent({
  name: 'PatientEditView',
  setup() {
    const route = useRoute()
    const router = useRouter()
    const isLoading = ref(true)
    const isSaving = ref(false)

    const patientData = ref({
      id: '',
      nik: '',
      bpjs: '',
      name: '',
      dob: '',
      gender: 'L',
      phone: '',
      job: '',
      address: '',
      
      tbType: 'TB Paru SO',
      category: 'Kategori 1',
      regimen: '2RHZE/4RH',
      startDate: '',
      status: 'active',
      
      faskes: 'Puskesmas Sukajadi',
      doctor: 'dr. Siti Rahmawati, Sp.P',
      pmoName: '',
      pmoRelation: '',
      pmoPhone: '',
      kader: ''
    })

    const loadPatient = async () => {
      const id = route.params.id
      if (!id) return

      isLoading.value = true
      try {
        const res = await patientService.getById(id)
        const p = res.data
        if (p) {
          patientData.value = {
            id: p.id,
            nik: p.nik || '',
            bpjs: '',
            name: p.full_name || '',
            dob: p.birth_date ? p.birth_date.split('T')[0] : '',
            gender: String(p.gender).toLowerCase() === 'female' || String(p.gender).toLowerCase() === 'p' ? 'P' : 'L',
            phone: p.phone || '',
            job: p.occupation || '',
            address: p.address || '',
            
            tbType: 'TB Paru SO',
            category: 'Kategori 1',
            regimen: '2RHZE/4RH',
            startDate: p.created_at ? p.created_at.split('T')[0] : '',
            status: p.is_active ? 'active' : 'completed',
            
            faskes: 'Puskesmas Sukajadi',
            doctor: 'dr. Siti Rahmawati, Sp.P',
            pmoName: p.pmo_name || '',
            pmoRelation: '',
            pmoPhone: p.pmo_phone || '',
            kader: ''
          }
        }
      } catch (err) {
        console.error('Failed to load patient for editing:', err)
        alert('Gagal memuat data pasien: ' + (err.response?.data?.detail || err.message))
      } finally {
        isLoading.value = false
      }
    }

    const savePatient = async () => {
      const id = route.params.id
      isSaving.value = true

      try {
        const payload = {
          full_name: patientData.value.name,
          phone: patientData.value.phone,
          address: patientData.value.address,
          occupation: patientData.value.job,
          pmo_name: patientData.value.pmoName,
          pmo_phone: patientData.value.pmoPhone,
          clinical_note: `${patientData.value.tbType} (${patientData.value.category}). Rejimen: ${patientData.value.regimen}`
        }

        await patientService.update(id, payload)
        alert('Perubahan data pasien berhasil disimpan!')
        router.push(`/dashboard/patients/${id}`)
      } catch (err) {
        console.error('Update patient failed:', err)
        alert('Gagal menyimpan perubahan: ' + (err.response?.data?.detail || err.message))
      } finally {
        isSaving.value = false
      }
    }

    const cancelEdit = () => {
      const id = route.params.id
      router.push(`/dashboard/patients/${id}`)
    }

    onMounted(() => {
      loadPatient()
    })

    return {
      patientData,
      isLoading,
      isSaving,
      savePatient,
      cancelEdit
    }
  }
})


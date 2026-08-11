import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'PatientEditView',
  setup() {
    const router = useRouter()

    const patientData = ref({
      id: 'TB-2026-089',
      nik: '3273619263040005',
      bpjs: '0001234567890',
      name: 'Bpk. Ahmad Subarjo',
      dob: '1960-05-15',
      gender: 'L',
      phone: '0812-3456-7890',
      job: 'Pensiunan',
      address: 'Jl. Sukajadi No. 12, Sukajadi, Kota Bandung, Jawa Barat 40162',
      
      tbType: 'TB Paru SO',
      category: 'Kategori 1',
      regimen: '2RHZE/4RH',
      startDate: '2026-01-12',
      status: 'active',
      
      faskes: 'Puskesmas Sukajadi',
      doctor: 'dr. Heru Prasetyo',
      pmoName: 'Surya',
      pmoRelation: 'Anak',
      pmoPhone: '0812-9876-5432',
      kader: 'Agus Salim'
    })

    const savePatient = () => {
      // Mock save
      router.push('/dashboard/patients/1')
    }

    const cancelEdit = () => {
      router.push('/dashboard/patients/1')
    }

    return {
      patientData,
      savePatient,
      cancelEdit
    }
  }
})

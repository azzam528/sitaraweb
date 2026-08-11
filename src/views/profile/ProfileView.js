import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'ProfileView',
  setup() {
    const profileData = ref({
      name: 'Admin Puskesmas',
      role: 'Administrator',
      facility: 'Puskesmas Sukajadi',
      nip: '19850212 201001 2 003',
      email: 'admin.sukajadi@sitaratb.id',
      phone: '081234567890'
    })

    const isEditing = ref(false)

    const saveProfile = () => {
      isEditing.value = false
      // Dummy save
    }

    return {
      profileData,
      isEditing,
      saveProfile
    }
  }
})

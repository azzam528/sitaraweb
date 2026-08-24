import { defineComponent, ref, onMounted, onUnmounted } from 'vue'
import { useRouter, RouterLink } from 'vue-router'

export default defineComponent({
  name: 'VideoListView',
  components: {
    RouterLink
  },
  setup() {
    const router = useRouter()
    const activeDropdown = ref(null)

    const toggleDropdown = (id) => {
      activeDropdown.value = activeDropdown.value === id ? null : id
    }

    const handleDocumentClick = () => {
      activeDropdown.value = null
    }

    onMounted(() => {
      document.addEventListener('click', handleDocumentClick)
    })

    onUnmounted(() => {
      document.removeEventListener('click', handleDocumentClick)
    })

    const viewDetail = (id) => {
      router.push(`/dashboard/video-verifications/${id}`)
    }

    const sendMessage = (item) => {
      alert(`Mengirim pesan ke ${item.name}`)
    }

    const deleteVerification = (item) => {
      if (confirm(`Apakah Anda yakin ingin menghapus verifikasi video ${item.name}?`)) {
        tableData.value = tableData.value.filter(v => v.id !== item.id)
      }
    }

    const tableData = ref([
      {
        id: 1,
        initials: 'BP',
        avatarColor: 'bg-teal',
        name: 'Bambang Pamungkas',
        nik: '3201015502940001',
        time: 'Hari ini, 08:45',
        aiStatus: 'Diverifikasi',
        aiStatusColor: 'success-dot',
        score: '98%',
        progressColor: 'bg-success',
        reviewStatus: 'Otomatis-Konfirmasi',
        reviewPillClass: 'pill-gray'
      },
      {
        id: 2,
        initials: 'SM',
        avatarColor: 'bg-orange',
        name: 'Siti Mariam',
        nik: '3201015502940002',
        time: 'Hari ini, 07:12',
        aiStatus: 'Kepercayaan Rendah',
        aiStatusColor: 'danger-dot',
        score: '64%',
        progressColor: 'bg-warning',
        reviewStatus: 'Menunggu Tinjauan',
        reviewPillClass: 'pill-yellow'
      },
      {
        id: 3,
        initials: 'RK',
        avatarColor: 'bg-teal',
        name: 'Rahmat Kurnia',
        nik: '3201015502940003',
        time: 'Hari ini, 06:30',
        aiStatus: 'Diverifikasi',
        aiStatusColor: 'success-dot',
        score: '82%',
        progressColor: 'bg-teal-main',
        reviewStatus: 'Otomatis-Konfirmasi',
        reviewPillClass: 'pill-gray'
      },
      {
        id: 4,
        initials: 'AD',
        avatarColor: 'bg-primary-light',
        name: 'Andi Darmawan',
        nik: '3201015502940004',
        time: 'Kemarin, 18:20',
        aiStatus: 'Diverifikasi',
        aiStatusColor: 'success-dot',
        score: '95%',
        progressColor: 'bg-success',
        reviewStatus: 'Otomatis-Konfirmasi',
        reviewPillClass: 'pill-gray'
      },
      {
        id: 5,
        initials: 'NK',
        avatarColor: 'bg-danger-light',
        name: 'Nita Kusuma',
        nik: '3201015502940005',
        time: 'Kemarin, 16:45',
        aiStatus: 'Gagal',
        aiStatusColor: 'danger-dot',
        score: '32%',
        progressColor: 'bg-danger',
        reviewStatus: 'Ditolak',
        reviewPillClass: 'pill-red'
      }
    ])

    const chartData = [
      { label: 'Min 1', success: 85, fail: 15 },
      { label: 'Min 2', success: 92, fail: 8 },
      { label: 'Min 3', success: 78, fail: 22 },
      { label: 'Min 4', success: 95, fail: 5 },
      { label: 'Today', success: 60, fail: 10 }
    ]

    return {
      activeDropdown,
      toggleDropdown,
      viewDetail,
      sendMessage,
      deleteVerification,
      tableData,
      chartData
    }
  }
})

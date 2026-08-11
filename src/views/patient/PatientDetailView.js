import { defineComponent } from 'vue'
import { useRoute, RouterLink } from 'vue-router'

export default defineComponent({
  name: 'PatientDetailView',
  components: {
    RouterLink
  },
  setup() {
    const route = useRoute()
    return {
      route
    }
  }
})

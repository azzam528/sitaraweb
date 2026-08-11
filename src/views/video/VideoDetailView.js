import { defineComponent } from 'vue'
import { useRoute, RouterLink } from 'vue-router'

export default defineComponent({
  name: 'VideoDetailView',
  components: {
    RouterLink
  },
  setup() {
    const route = useRoute()
    const videoId = route.params.id || '123'

    return {
      videoId
    }
  }
})

// composables/useTopRowAnalytics.js
import { ref } from 'vue'

const analyticsData = ref({
  created: 0,
  completed: 0,
})

export function useTopRowAnalytics() {
  const updateAnalytics = (data) => {
    analyticsData.value = data
  }

  return {
    analyticsData,
    updateAnalytics,
  }
}

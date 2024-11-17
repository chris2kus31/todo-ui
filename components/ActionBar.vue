<template>
  <div class="actions-bar">
    <!-- Date Picker for selecting range -->
    <VueDatePicker v-model="dateRange" range multi-calendars />
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import { useTopRowAnalytics } from '~/composables/useTopRowAnalytics'


const dateRange = ref([])
const { updateAnalytics } = useTopRowAnalytics()


watch(dateRange, async (newRange) => {
  if (newRange && newRange.length === 2) {
    const [start, end] = newRange
    const analyticsData = await fetchAnalytics(start, end)
    updateAnalytics(analyticsData) 
  }
})


async function fetchAnalytics(startDate, endDate) {
  console.log(`Fetching analytics from ${startDate} to ${endDate}`)
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ created: Math.floor(Math.random() * 10), completed: Math.floor(Math.random() * 10) })
    }, 500)
  })
}


const formatDate = (date) => {
  return date ? date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : ''
}
</script>

<style scoped>
.actions-bar {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.date-display {
  margin-left: 10px;
}

.date-range-text {
  background-color: #3d4552;
  color: white;
  padding: 5px 10px;
  border-radius: 4px;
}
</style>

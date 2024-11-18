<template>
  <div class="analytics-card">
    <h2 class="card-title">Task Completion and Creation Analytics</h2>
    <BarChart :chartData="chartData" :options="chartOptions" />
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useTopRowAnalytics } from "~/composables/useTopRowAnalytics";
import BarChart from "~/components/BarChart.vue";
import {
  createAnalyticsDTO,
  createChartOptionsDTO,
} from "~/composables/dto/Analytics.dto";

const { analyticsData } = useTopRowAnalytics();
const chartData = computed(() => createAnalyticsDTO(analyticsData.value)); 
const chartOptions = createChartOptionsDTO();

</script>

<style scoped>
.analytics-card {
  background-color: #4b5563;
  padding: 20px;
  border-radius: 8px;
  color: white;
  text-align: center;
}

.card-title {
  font-size: 1.5em;
  margin-bottom: 10px;
}
</style>

<template>
  <!-- Analytics card wrapper with a title and embedded bar chart -->
  <div class="analytics-card">
    <h2 class="card-title">Task Completion and Creation Analytics</h2>
    <!-- BarChart component receives processed data and configured options for display -->
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

// Destructure analytics data from custom composable to handle analytics data efficiently
const { analyticsData } = useTopRowAnalytics();

/**
 * Computed property `chartData`:
 * Uses the `createAnalyticsDTO` function to transform raw analytics data into the format
 * required by the BarChart component. This separation improves modularity and
 * facilitates future changes in data processing logic, as well as testing.
 */
const chartData = computed(() => createAnalyticsDTO(analyticsData.value));

/**
 * `chartOptions` object:
 * Generated using `createChartOptionsDTO` to encapsulate chart configuration and
 * customization. This function allows chart options to be modular, making it easy
 * to update styles, titles, or themes across different parts of the app in a consistent way.
 */
const chartOptions = createChartOptionsDTO();
</script>

<style scoped>
.analytics-card {
  background-color: #4b5563; /* Dark background to match app theme */
  padding: 20px;
  border-radius: 8px;
  color: white;
  text-align: center; /* Center-align content within card */
}

/* Style for the analytics card title */
.card-title {
  font-size: 1.5em;
  margin-bottom: 10px; /* Spacing to separate title from the chart */
}
</style>

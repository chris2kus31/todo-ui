<template>
  <div class="analytics-card">
    <h2 class="card-title">Graph Analytics</h2>
    <BarChart :chartData="chartData" :options="options" />
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useTopRowAnalytics } from "~/composables/useTopRowAnalytics";
import BarChart from "~/components/BarChart.vue";

const { analyticsData } = useTopRowAnalytics();

const chartData = computed(() => ({
  labels: ["Created", "Completed"],
  datasets: [
    {
      label: "Tasks",
      backgroundColor: ["#B2D198", "#F26B5E"],
      data: [analyticsData.value.created, analyticsData.value.completed],
    },
  ],
}));

const options = {
  responsive: true,
  plugins: {
    legend: {
      display: true,
      position: "top",
    },
    title: {
      display: true,
      text: "Task Analytics",
    },
  },
};
</script>

<style scoped>
.analytics-card {
  background-color: #3d4552;
  padding: 20px;
  border-radius: 8px;
  color: white;
  text-align: center;
}

.card-title {
  font-size: 1.2em;
}
</style>

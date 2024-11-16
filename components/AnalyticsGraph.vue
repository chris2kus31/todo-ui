<!-- components/AnalyticsGraph.vue -->
<template>
  <div class="analytics-card">
    <h2 class="card-title">Graph Analytics</h2>
    <BarChart :chartData="data" :options="options" />
  </div>
</template>

<script setup>
import { ref } from "vue";
import BarChart from "~/components/BarChart.vue";

const data = ref({
  labels: ["Jan", "Feb", "Mar", "Apr", "May"],
  datasets: [
    {
      label: "Tasks Completed",
      backgroundColor: "#B2D198",
      data: [10, 20, 30, 40, 50],
    },
  ],
});

const options = ref({
  responsive: true,
  plugins: {
    legend: {
      display: true,
      position: "top",
    },
    title: {
      display: true,
      text: "Task Completion Over Time",
    },
  },
});
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

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

const { analyticsData } = useTopRowAnalytics();

const chartData = computed(() => ({
  labels: ["Created Tasks", "Completed Tasks"],
  datasets: [
    {
      label: "Number of Tasks",
      backgroundColor: ["#B2D198", "#F26B5E"],
      data: [analyticsData.value.created, analyticsData.value.completed],
    },
  ],
}));

const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: true,
      position: "top",
      labels: {
        color: "#E5E7EB", // Light gray for readability
      },
    },
    title: {
      display: true,
      text: "Overview of Completed and Created Tasks",
      color: "#FFFFFF", // White color for better readability
      font: {
        size: 16,
        weight: "bold",
      },
    },
  },
  scales: {
    x: {
      title: {
        display: true,
        text: "Task Status",
        color: "#E5E7EB", // Light gray for readability
        font: {
          size: 14,
        },
      },
      ticks: {
        color: "#E5E7EB", // Ensures readability of x-axis labels
      },
    },
    y: {
      title: {
        display: true,
        text: "Number of Tasks",
        color: "#E5E7EB",
        font: {
          size: 14,
        },
      },
      ticks: {
        color: "#E5E7EB",
        beginAtZero: true, // Ensures y-axis starts at 0
      },
    },
  },
};

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

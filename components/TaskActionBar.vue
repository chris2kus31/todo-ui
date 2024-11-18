<template>
  <div class="actions-bar">
    <label for="date-range-picker" class="date-range-label"
      >Select Date Range:</label
    >
    <VueDatePicker
      v-model="dateRange"
      range
      multi-calendars
      id="date-range-picker"
      :dark-mode="true"
      :placeholder="placeholderText"
    />
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import { useTopRowAnalytics } from "~/composables/useTopRowAnalytics";

const { fetchAnalyticsData } = useTopRowAnalytics();
const dateRange = ref([
  new Date(),
  new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
]); // initial 7-day range
const placeholderText = "Click to select a date range"; // guiding text for date picker

// Watch for changes in date range and fetch data
watch(
  dateRange,
  ([start, end]) => {
    if (start && end) {
      fetchAnalyticsData(start, end);
    }
  },
  { immediate: true }
);
</script>

<style scoped>
.actions-bar {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  background-color: #4b5563; /* Dark background for dark mode */
  padding: 10px 20px;
  border-radius: 8px;
}

.date-range-label {
  color: #f0f0f0; /* Light color for dark mode readability */
  margin-right: 10px;
  font-size: 1em;
  font-weight: bold;
}
</style>

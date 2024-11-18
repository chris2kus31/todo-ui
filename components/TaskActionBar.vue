<template>
  <div class="actions-bar">
    <!-- Date Picker for selecting range -->
    <VueDatePicker v-model="dateRange" range multi-calendars />
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import { useTopRowAnalytics } from "~/composables/useTopRowAnalytics";
import { useAxios } from "~/composables/useAxios";

const { fetchAnalyticsData } = useTopRowAnalytics();
const axios = useAxios();

const startDate = new Date();
const endDate = new Date();
endDate.setDate(startDate.getDate() + 7);
const dateRange = ref([startDate, endDate]);

watch(
  dateRange,
  ([start, end]) => {
    if (start && end) {
      fetchAnalyticsData(start, end);
    }
  },
  { immediate: true }
);

const formatDate = (date) => {
  return date
    ? date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "";
};
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

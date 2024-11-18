<!-- components/TopRowAnalytics.vue -->
<template>
  <div class="top-row" v-if="isDataLoaded">
    <TopCard
      icon="CheckCircleIcon"
      title="Completed"
      :value="analyticsData.completed"
    />
    <TopCard
      icon="DocumentPlusIcon"
      title="Created"
      :value="analyticsData.created"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useTopRowAnalytics } from "~/composables/useTopRowAnalytics";
import TopCard from "~/components/TopCard.vue";
import { createAnalyticsDataDTO } from "~/composables/dto/AnalyticsData.dto"; // DTO for structured and validated data handling

// Destructure analytics data from composable function for better data management and maintainability
const { analyticsData } = useTopRowAnalytics();

// Flag to indicate when data has loaded; triggers conditional rendering of TopRow
const isDataLoaded = ref(false);

// Computed property to structure analytics data using the DTO pattern, ensuring consistency and validation
const structuredAnalyticsData = computed(() =>
  createAnalyticsDataDTO(analyticsData.value)
);

// Lifecycle hook to set data load status after component is mounted
onMounted(() => {
  isDataLoaded.value = true;
});
</script>

<style scoped>
.top-row {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}
</style>

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
import { createAnalyticsDataDTO } from "~/composables/dto/AnalyticsData.dto"; // Import DTO for structured data


const { analyticsData } = useTopRowAnalytics();
const isDataLoaded = ref(false);
const structuredAnalyticsData = computed(() => createAnalyticsDataDTO(analyticsData.value));

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

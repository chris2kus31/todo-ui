<!-- components/TopRowAnalytics.vue -->
<template>
  <div class="top-row" v-if="isLoaded">
    <div class="top-card">
      <div class="card-content">
        <CheckCircleIcon class="card-icon" />
        <div class="card-info">
          <h2 class="card-title">Completed</h2>
          <span class="card-number">{{ analyticsData.completed }}</span>
        </div>
      </div>
    </div>
    <div class="top-card">
      <div class="card-content">
        <DocumentPlusIcon class="card-icon" />
        <div class="card-info">
          <h2 class="card-title">Created</h2>
          <span class="card-number">{{ analyticsData.created }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { CheckCircleIcon, DocumentPlusIcon } from "@heroicons/vue/24/solid";
import { useTopRowAnalytics } from "~/composables/useTopRowAnalytics";

const { analyticsData } = useTopRowAnalytics();
const isLoaded = ref(false);

onMounted(() => {
  isLoaded.value = true;
});

</script>

<style scoped>
.top-row {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}
.top-card {
  background-color: #4B5563;
  padding: 15px;
  border-radius: 8px;
  flex: 1;
  display: flex;
  align-items: center;
}
.card-title {
  font-size: 1em;
  color: white;
  margin: 0;
}
.card-content {
  display: flex;
  align-items: center;
  justify-content: space-between; /* Space between icon and card-info */
  width: 100%; /* Ensure content takes full width for spacing */
}
.card-icon {
  width: 32px;
  height: 32px;
  color: #f26b5e;
}
.card-info {
  display: flex;
  flex-direction: column;
  align-items: flex-end; /* Align text to the right */
}
.card-number {
  font-size: 1.5em;
  font-weight: bold;
  color: white;
}
</style>

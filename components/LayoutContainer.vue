<template>
  <div class="layout-container">
    <!-- Left Column with TodoCard -->
    <TodoCard />

    <!-- Right Column with Analytics components -->
    <div class="analytics-container">
      <ActionBar />
      <TopRowAnalytics />
      <AnalyticsGraph />
    </div>
  </div>
</template>

<script setup>
import TodoCard from "~/components/TodoCard.vue";
import TopRowAnalytics from "~/components/TopRowAnalytics.vue";
import ActionBar from "~/components/ActionBar.vue";
import AnalyticsGraph from "~/components/AnalyticsGraph.vue";
</script>

<style scoped>
.layout-container {
  display: flex;
  gap: 20px; /* Space between TodoCard and Analytics Container */

}

.analytics-container {
  display: flex;
  flex-direction: column;
  gap: 20px; /* Space between TopRowAnalytics, ActionBar, and AnalyticsGraph */
  flex: 1;
  background-color: #3D4552;
  width: 600px;
}
</style>

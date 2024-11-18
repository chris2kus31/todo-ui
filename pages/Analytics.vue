<template>
  <div class="page-wrapper">
    <div class="analytics-container">
      <!-- Include TopRowAnalytics, ActionBar, and AnalyticsGraph components -->
      <TaskActionBar />
      <AnalyticsOverview />
      <AnalyticsGraph />
      <!-- Button to go back to To-do page -->
      <router-link to="/" class="todo-button">To-do</router-link>
    </div>
  </div>
</template>

<script setup>
import AnalyticsOverview from "~/components/AnalyticsOverview.vue";
import TaskActionBar from "~/components/TaskActionBar.vue";
import AnalyticsGraph from "~/components/AnalyticsGraph.vue";
</script>

<style scoped>
.page-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

.analytics-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 800px;
  max-width: 100%;
  background-color: #3d4552;
  position: relative;
}
.todo-button {
  position: absolute;
  bottom: 10px;
  right: 20px;
  background-color: #f26b5e;
  color: white;
  padding: 8px 12px;
  border-radius: 4px;
  text-decoration: none;
  font-size: 0.9em;
  cursor: pointer;
}

.todo-button:hover {
  opacity: 0.9;
}
</style>

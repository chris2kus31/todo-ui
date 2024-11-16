<template>
  <div class="page-wrapper">
    <div class="todo-container">
      <!-- New actions bar -->
      <ActionBar />
      <!-- Row with two cards -->
      <TopRowAnalytics />
      <!-- Row with todo-card -->
      <TodoCard />
      <!-- Row with Graph -->
      <AnalyticsGraph />
    </div>
  </div>
</template>

<script setup>
import ActionBar from "~/components/ActionBar.vue";
import TopRowAnalytics from "~/components/TopRowAnalytics.vue";
import TodoCard from "~/components/TodoCard.vue";
import AnalyticsGraph from "~/components/AnalyticsGraph.vue";
import { AdjustmentsHorizontalIcon } from "@heroicons/vue/24/solid";
</script>

<style scoped>
.page-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}
.todo-container {
  background-color: #313743;
  border-radius: 12px;
  padding: 20px; /* Padding creates space around the content */
  width: 500px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 20px;
  box-sizing: border-box; /* Ensures padding is included in total width */
}
.card-title {
  font-size: 1.2em;
  color: white;
}
</style>

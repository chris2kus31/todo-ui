<!-- components/TopRowAnalytics.vue -->
<template>
  <div class="top-row">
    <div class="top-card">
      <h2 class="card-title">Completed</h2>
      <div class="card-content">
        <CheckCircleIcon class="card-icon" />
        <span class="card-number">42</span>
      </div>
    </div>
    <div class="top-card">
      <h2 class="card-title">Created</h2>
      <div class="card-content">
        <PlusCircleIcon class="card-icon" />
        <span class="card-number">58</span>
      </div>
    </div>
  </div>
</template>

<script>
import { CheckCircleIcon, PlusCircleIcon } from "@heroicons/vue/24/solid";
</script>

<style scoped>
.top-row {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}
.top-card {
  background-color: #3d4552;
  padding: 10px;
  border-radius: 8px;
  flex: 1;
  text-align: center;
}
.card-title {
  font-size: 1.2em;
  color: white;
}

.card-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
}

.card-icon {
  width: 32px;
  height: 32px;
  color: #f26b5e; /* Highlight color for icons */
}

.card-number {
  font-size: 2em;
  font-weight: bold;
  color: white;
}
</style>

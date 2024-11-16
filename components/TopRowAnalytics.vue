<!-- components/TopRowAnalytics.vue -->
<template>
    <div class="top-row">
      <div class="top-card">
        <h2 class="card-title">Completed</h2>
      </div>
      <div class="top-card">
        <h2 class="card-title">Created</h2>
      </div>
    </div>
  </template>
  
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
  </style>
  